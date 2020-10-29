//@ts-check

const express = require("express");
const db = require("../../database/");
const { ApiReport } = require("../../database/objects");
const objects = require("../../database/objects");
const tokenGenerator = new objects.TokenGenerator();
const passwordHasher = new objects.PasswordHasher();

function sendReport(res, apiReport) {
    res.send(apiReport);
}

/**
 * 
 * @param {string} mail 
 */
function isMailExists(mail) {
    return db.user.getBy('mail', mail)
        .then(records => records.length > 0 ? true : false, err => { throw err; });
}

/**
 * 
 * @param {string} login 
 */
function isLoginExists(login) {
    return db.user.getBy('login', login)
        .then(records => records.length > 0 ? true : false, err => { throw err; });
}

function parameterizedHandler(requiredParameters, req, res, body) {
    return objects.checkFilling(req.query, requiredParameters)
        .then((obj) => body(obj, req, res))
        .catch(unfilledData => sendReport(res, new objects.ApiReport("error", 4, "Not enough data!", unfilledData)));  
}

module.exports.register = (req, res) => 
    parameterizedHandler(["login", "password", "mail", "name", "surname"], req, res, (obj, req, res) => {
        Promise.all([isLoginExists(obj.login), isMailExists(obj.mail)]).then(results => {
            if(results[0]) {
                sendReport(res, new ApiReport("error", 5, "Login already exists!"));
                return;
            }

            if(results[1]) {
                sendReport(res, new ApiReport("error", 6, "Mail already exists!"));
                return;
            }
            
            let token = tokenGenerator.generateFrom(req.query.login, req.query.password);
            obj.password = passwordHasher.getHash(obj.password);
            db.user.createUser(obj, token)
                .then(response => sendReport(res, new objects.ApiReport("ok", 0, "Succesful registration!")))
                .catch(errReport => sendReport(res, errReport)) 
        });
});

module.exports.login = (req, res) => 
    parameterizedHandler(["login", "password"], req, res, (obj, req, res) => {
        db.user.getBy("login", obj.login)
            .then(records => {
                if(records.length == 0)
                    throw new objects.ApiReport("error", 1, "Missing login!");
                else 
                    return records[0]._fields[0].properties; })
            .then(properties => {
                if(passwordHasher.getHash(obj.password) != properties.password)
                    throw new objects.ApiReport("error", 2, "Missing password!");
                sendReport(res, new objects.ApiReport("ok", 0, "Succesful Login!", {token: properties.token}))})
            .catch(errReport => sendReport(res, errReport))
});


module.exports.data = (req, res) => 
    parameterizedHandler(["token"], req, res, (obj, req, res) => {
        db.user.getBy("token", obj.token)
            .then(records => { 
                if(records.length == 0) 
                    throw new objects.ApiReport("error", 3, "Missing token!");
                else
                    return records[0]._fields[0].properties})
            .then(properties => {
                properties.password = undefined
                sendReport(res, new objects.ApiReport("ok", 0, undefined, properties))})
            .catch(errReport => sendReport(res, errReport));
});