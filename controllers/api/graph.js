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

module.exports.createRelation = apiTools.parameterizedHandler(["from", "to", "name"], (obj, req, res) => {
    db.graph.createRelation(obj.from, obj.to, obj.name);
});
