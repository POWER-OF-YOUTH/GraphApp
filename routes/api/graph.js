const express = require("express");
const router = express.Router();

const api = require("../../controllers/api");

router.get("/createMark", api.graph.createMark);
router.get("/createRelation", api.graph.createRelation);
router.get("/deleteNode", api.graph.deleteNode);
router.get("/deleteRelation", api.graph.deleteRelation);
router.get("/getMarksInfo", api.graph.getMarksInfo);
router.get("/getMarkInfo", api.graph.getMarkInfo);
router.get("/createNode", api.graph.createNode);
router.get("/getNode", api.graph.getNode);
router.get("/getNodes", api.graph.getNodes);

module.exports = router;
