const express = require("express");
const router = express.Router();

const api = require("../../controllers/api");

router.get("/login", api.user.login);

module.exports = router;