const express = require("express");
const router = express.Router();

const api = require("../../controllers/api");

router.get("/createMark", api.graph.createMark);

module.exports = router;
