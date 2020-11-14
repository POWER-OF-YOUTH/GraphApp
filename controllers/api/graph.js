//@ts-check


const express = require("express");
const db = require("../../database/");
const server = require("../../socket");
const apiTools = require("../../lib/apiTools");
const ApiReport = require("../../lib/ApiReport");

/**
 * 
 * @param {any} req 
 * @param {any} res 
 *//*
module.exports.createMark = (req, res) => apiTools.parameterizedHandler(["type"], req, res, (obj, req, res) => {
    db.graph.createNode(["Mark"], obj)
        .then()
        .catch();
    console.log([1, 2, 3] instanceof Array);
});*/
/*
{
    type: "type_name",
    properties: 
    [
        {
            propertyName: "prop1"
            require: true | false
            default: "str" | number
        },
        {
            propertyName: "prop2"
            require: true | false
            default: "str" | number
        }
    ]
}
*/

module.exports.createMark = apiTools.parameterizedHandler(["data"], async function body(obj, req, res) {
    let data = JSON.parse(obj.data);
    let result = await db.graph.createNode(["Mark"], {type: data.type});
    let markID = result.records[0]._fields[0].low;
    for(let i = 0; i < data.properties.length; i++) {
        let propertyID = (await db.graph.createNode(["Property"], data.properties[i])).records[0]._fields[0].low;
        await db.graph.createRelation(markID, propertyID, "property");
    }
    apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!"));
}); 

module.exports.createRelation = apiTools.parameterizedHandler(["from", "to", "name"], (obj, req, res) => {
    db.graph.createRelation(obj.from, obj.to, obj.name);
});
