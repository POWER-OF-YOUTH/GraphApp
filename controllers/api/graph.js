//@ts-check

const express = require("express");
const db = require("../../database/");

module.exports.createMark = (req, res) => {
    console.log(req);
    res.json({kok: 'kek'});
};
