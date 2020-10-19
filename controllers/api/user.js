const express = require("express");
const db = require("../../database");
const objects = require("../../database/objects");

module.exports.login = (req, res) => { //Тестовая функция возврающая данные обратно пользователю.
    res.send(req.query);
};

module.exports.register = (req, res) => {
    let userInfo = new objects.UserInfo(req.query.nickname, req.query.name, req.query.surname);
    db.addUser(userInfo, (err) => {
        if(!err)
            res.send("Ok!");
        else
            throw err;
    });
};