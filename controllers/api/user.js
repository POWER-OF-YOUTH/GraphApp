//@ts-check

const express = require("express");
const db = require("../../database/");
const objects = require("../../database/objects");
const tokenGenerator = new objects.TokenGenerator();
const passwordHasher = new objects.PasswordHasher();
const errors = require("../../database/errors");

/**
 * 
 * @param {any} response 
 * @param {Error} error 
 */
function reportError(response, error)
{
    response.send({message: error.message});
}

module.exports.login = (req, res) => { //Тестовая функция возврающая данные обратно пользователю.
    let tokenStruct = {};
    db.user.getByLogin(req.query.login, (response, err) => {
        if(err)
            reportError(res, err);
        else
        {
            if(passwordHasher.getHash(req.query.password) == response.password)
            {
                tokenStruct["token"] = response.token;
                res.send(tokenStruct);
            }
            else
                reportError(res, errors.missingPassword);
        }
    });
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
            db.user.createUser(userInfo, token, (response, err) => { 
                if(err)
                {
                    throw err;
                } 
                else
                {
                    res.send({message: "Succesful registration!"});
                }
            });
    },
    (unfilledData) => res.send(unfilledData));       
};

module.exports.data =(req, res) => {
    db.user.getByToken(req.query.token, (response, err) => {
        if(err)
            reportError(res, err);
        else
            res.send(response);
    });
};