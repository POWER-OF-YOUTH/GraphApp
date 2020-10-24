//@ts-check

const express = require("express");
const db = require("../../database/");
const objects = require("../../database/objects");
const tokenGenerator = new objects.TokenGenerator();
const passwordHasher = new objects.PasswordHasher();

function sendReport(res, apiReport) {
    res.send(apiReport);
}

module.exports.login = (req, res) => {
    let requiredParameters = ["login", "password"];
    objects.checkFilling(req.query, requiredParameters)
        .then((obj) => {
            db.user.getByLogin(obj.login)
                .then(response => {
                    if(passwordHasher.getHash(obj.password) != response.password)
                        throw new objects.ApiReport("error", 2, "Missing password!");
                    sendReport(res, new objects.ApiReport("ok", 0, "Succesful Login!", {token: response.token}))})
                .catch(errReport => sendReport(res, errReport))})
        .catch(unfilledData => sendReport(res, new objects.ApiReport("error", 4, "Not enough data!", unfilledData)));
};  

module.exports.register = (req, res) => {
    let requiredParameters = ["login", "password", "mail", "name", "surname"];
    objects.checkFilling(req.query, requiredParameters)
        .then((obj) => {
            let token = tokenGenerator.generateFrom(req.query.login, req.query.password);
            obj.password = passwordHasher.getHash(obj.password);
            db.user.createUser(obj, token)
                .then(response => sendReport(res, new objects.ApiReport("ok", 0, "Succesful registration!")))
                .catch(errReport => sendReport(res, errReport))})
        .catch(unfilledData => sendReport(res, new objects.ApiReport("error", 4, "Not enough data!", unfilledData)));      
};

module.exports.data = (req, res) => {
    let requiredParameters = ["token"];
    objects.checkFilling(req.query, requiredParameters)
        .then((obj) => {
            db.user.getByToken(req.query.token)
                .then(response => {
                    response.password = undefined
                    sendReport(res, new objects.ApiReport("ok", 0, undefined, response))})
                .catch(errReport => sendReport(res, errReport))})
        .catch(unfilledData => sendReport(res, new objects.ApiReport("error", 4, "Not enough data!", unfilledData)));
};