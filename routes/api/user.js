const express = require("express");
const router = express.Router();

const api = require("../../controllers/api");

router.get("/login", api.user.login);
router.get("/register", api.user.register);
router.get("/data", api.user.data);

module.exports = router;