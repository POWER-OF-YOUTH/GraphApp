const express = require("express");
const router = express.Router();

const user = require("./user");
const graph = require('./graph');

router.use("/user/", user);
router.use('/graph/', graph);

module.exports = router;