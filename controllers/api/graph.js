//@ts-check


const express = require("express");
const db = require("../../database/");
const server = require("../../socket");
const apiTools = require("../../lib/apiTools");
const ApiReport = require("../../lib/ApiReport");

module.exports.createMark = apiTools.parameterizedHandler(["token", "data"], async function body(obj, req, res) {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 999, "Wrong token!"));
        return;
    }

    let data;

    try {
        data = JSON.parse(obj.data);
    } 
    catch(err) {
        apiTools.sendReport(res, new ApiReport("error", 999, "JSON format error!"));
        return;
    }
    
    if(data.type == undefined) {
        apiTools.sendReport(res, new ApiReport("error", 999, "Wrong mark type!"));
        return;
    }

    if(data.properties == undefined) {
        apiTools.sendReport(res, new ApiReport("error", 999, "Properties is undefined!"));
        return;
    }

    let result = await db.graph.createNode(["Mark"], {type: data.type});
    let markID = result.records[0]._fields[0].low;
    for(let i = 0; i < data.properties.length; i++) {
        let obj;
        try {
            obj = await apiTools.checkFilling(data.properties[i], ["propertyName", "require", "default"]);
        }
        catch(requireParam) {
            apiTools.sendReport(res, new ApiReport("error", 999, requireParam));
            return;
        }
        let propertyID = (await db.graph.createNode(["Property"], obj)).records[0]._fields[0].low;
        await db.graph.createRelation(markID, propertyID, "property")
    }
    apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!"));
}); 

module.exports.createRelation = apiTools.parameterizedHandler(["token", "from", "to", "name"], async function body(obj, req, res) {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 999, "Wrong token!"));
        return;
    }

    db.graph.createRelation(obj.from, obj.to, obj.name);
    apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!"));
});
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> master

module.exports.deleteNode = apiTools.parameterizedHandler(["token", "id"], async function body(obj, req, res) {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 999, "Wrong token!"));
        return;
    }

    db.graph.deleteNode(obj.id);
    apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!"));
});

module.exports.deleteRelation = apiTools.parameterizedHandler(["token", "from", "to", "name"], async function body(obj, req, res) {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 999, "Wrong token!"));
        return;
    }

    db.graph.deleteRelation(obj.from, obj.to, obj.name);
    apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!"));
});

module.exports.getMarksInfo = apiTools.parameterizedHandler(["token"], async function body(obj, req, res) {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 999, "Wrong token!"));
        return;
    }

    let response = [];
    let marks = await db.graph.getNodes("Mark");
    for (let i = 0; i < marks.records.length; i++)
    {
<<<<<<< HEAD
        let relatedNodes = await getRelatedNodes(marks.records[i]["_fields"][0]["identity"]["low"], "property");
=======
        let relatedNodes = await db.graph.getRelatedNodes(marks.records[i]["_fields"][0]["identity"]["low"], "property");
>>>>>>> master

        let mark = {};
        mark["type"] = marks.records[i]["_fields"][0]["properties"]["type"];
        mark["properties"] = [];

        for (let j = 0; j < relatedNodes.records.length; j++)
        {
            mark["properties"].push(relatedNodes.records[0]["_fields"][0]["properties"]);
        }

        response.push(mark);
    }

    apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!", {response: response}));
});

<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> master
