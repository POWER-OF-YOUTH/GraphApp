const express = require("express");

module.exports.login = (req, res) => { //Тестовая функция возврающая данные обратно пользователю.
    res.send(req.query);
};