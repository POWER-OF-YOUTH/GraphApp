//@ts-check

const express = require("express");
const db = require("../../database/");
const driver = require("../../database/driver")

const apiTools = require("../../lib/apiTools");
const ApiReport = require("../../lib/ApiReport");

/**
 * 
 * @param {string} mail 
 */
async function isMailExists(mail) {
    let query = `
        OPTIONAL MATCH (n) 
        WHERE n.mail="${mail}" 
        RETURN (n IS NOT null) AS exists LIMIT 1
    `
    let exists = (await driver.session().run(query))
        .records[0]
        .get("exists");
    
    return exists;
}

/**
 * 
 * @param {string} login 
 */
async function isLoginExists(login) {
    let query = `
        OPTIONAL MATCH (n) 
        WHERE n.login="${login}" 
        RETURN (n IS NOT null) AS exists LIMIT 1
    `
    let exists = (await driver.session().run(query))
        .records[0]
        .get("exists");
    
    return exists;
}

module.exports.register = apiTools.parameterizedHandler(["login", "password", "mail", "name", "surname"], (obj, req, res) => {
        Promise.all([isLoginExists(obj.login), isMailExists(obj.mail)]).then(results => {
            if(results[0]) {
                apiTools.sendReport(res, new ApiReport("error", 5, "Login already exists!"));
                return;
            }

            if(results[1]) {
                apiTools.sendReport(res, new ApiReport("error", 6, "Mail already exists!"));
                return;
            }
            
            let token = apiTools.generateTokenFrom(req.query.login, req.query.password);
            obj.password = apiTools.getPasswordHash(obj.password);
            db.user.createUser(obj, token)
                .then(response => apiTools.sendReport(res, new ApiReport("ok", 0, "Successful registration!")))
                .catch(errReport => apiTools.sendReport(res, errReport)) 
        });
});

module.exports.login = apiTools.parameterizedHandler(["login", "password"], (obj, req, res) => {
        db.user.getBy("login", obj.login)
            .then(records => {
                if(records.length == 0)
                    throw new ApiReport("error", 1, "Missing login!");
                else
                    //@ts-ignore
                    return records[0]._fields[0].properties; })
            .then(properties => {
                if(apiTools.getPasswordHash(obj.password) != properties.password)
                    throw new ApiReport("error", 2, "Missing password!");
                apiTools.sendReport(res, new ApiReport("ok", 0, "Successful Login!", {token: properties.token}))})
            .catch(errReport => apiTools.sendReport(res, errReport))
});


module.exports.data = apiTools.parameterizedHandler(["token"], (obj, req, res) => {
        db.user.getBy("token", obj.token)
            .then(records => { 
                if(records.length == 0) 
                    throw new ApiReport("error", 3, "Missing token!");
                else
                    //@ts-ignore
                    return records[0]._fields[0].properties})
            .then(properties => {
                properties.password = undefined
                apiTools.sendReport(res, new ApiReport("ok", 0, undefined, properties))})
            .catch(errReport => apiTools.sendReport(res, errReport));
});