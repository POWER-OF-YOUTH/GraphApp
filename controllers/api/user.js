//@ts-check

const express = require("express");
const db = require("../../database/");
const objects = require("../../database/objects");
const errors = require("../../database/errors");
const tokenGenerator = new objects.TokenGenerator();
const passwordHasher = new objects.PasswordHasher();

/**
 * 
 * @param {any} response 
 * @param {Error} error 
 */
function reportError(response, error)
{
    response.send({message: error.message});
}

module.exports.login = (req, res) => {
    db.user.getByLogin(req.query.login)
        .then(response => {
            if(passwordHasher.getHash(req.query.password) != response.password)
                throw errors.missingPassword;
            res.send({token: response.token});
        })
        .catch(err => reportError(res, err));
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
                .then(response => res.send({message: "Succesful registration!"}))
                .catch(err => reportError(res, err));
            },
        unfilledData => res.send(unfilledData));       
};

module.exports.data = (req, res) => {
    db.user.getByToken(req.query.token)
        .then(response => res.send(response))
        .catch(err => reportError(res, err));
};