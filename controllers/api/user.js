const express = require("express");
const db = require("../../database/");
const objects = require("../../database/objects");

module.exports.login = (req, res) => { //Тестовая функция возврающая данные обратно пользователю.
    res.send(req.query);
};

module.exports.register = (req, res) => {
    let userInfo = new objects.UserInfo(
        req.query.login, 
        req.query.mail, 
        req.query.password, 
        req.query.name, req.query.surname, 
        req.query.patronymic);
    db.user.createUser(userInfo, (data, err) => {
        if(!err)
            console.log(data);
        else 
            throw err;
    });
};