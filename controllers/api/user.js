//@ts-check

const express = require("express");
const db = require("../../database/");
const objects = require("../../database/objects");
const { ApiReport } = require("../../database/objects");
const tokenGenerator = new objects.TokenGenerator();
const passwordHasher = new objects.PasswordHasher();

function sendReport(res, apiReport)
{
    res.send(apiReport);
}

module.exports.login = (req, res) => {
    db.user.getByLogin(req.query.login)
        .then(response => {
            if(passwordHasher.getHash(req.query.password) != response.password)
                throw new ApiReport("error", 2, "Missing password!");
            sendReport(res, new objects.ApiReport("ok", 0, "Succesful Login!", {token: response.token}));
        })
        .catch(errReport => sendReport(res, errReport));
};  

module.exports.register = (req, res) => {
    let userInfo = new objects.UserInfo(
        req.query.login,
        req.query.name,
        req.query.surname,
        req.query.mail,
        passwordHasher.getHash(req.query.password));
    let token = tokenGenerator.generateFrom(userInfo.login, userInfo.password);
    objects
        .checkFilling(userInfo)
        .then(() => {
            db.user.createUser(userInfo, token)
                .then(response => sendReport(res, new objects.ApiReport("ok", 0, "Succesful registration!")))
                .catch(errReport => sendReport(res, errReport));
            })
            .catch(unfilledData => sendReport(res, new objects.ApiReport("error", 4, "Not enough data!", unfilledData)));      
};

module.exports.data = (req, res) => {
    db.user.getByToken(req.query.token)
        .then(response => {
            response.password = undefined
            sendReport(res, new objects.ApiReport("ok", 0, undefined, response))
        }) //?
        .catch(errReport => sendReport(res, errReport));
};