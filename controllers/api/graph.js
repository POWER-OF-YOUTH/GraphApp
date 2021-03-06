//@ts-check

const express = require("express");
const db = require("../../database/");
const server = require("../../socket");
const apiTools = require("../../lib/apiTools");
const ApiReport = require("../../lib/ApiReport");
const DatabaseWorker = require("../../database/DatabaseWorker");
const driver = require("../../database/driver");
const { Record } = require("neo4j-driver");

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
    let markID = result.records[0].get("identity");
    for(let i = 0; i < data.properties.length; i++) {
        let obj;
        try {
            obj = await apiTools.checkFilling(data.properties[i], ["propertyName", "require", "default"]);
        }
        catch(requireParam) {
            apiTools.sendReport(res, new ApiReport("error", 999, requireParam));
            return;
        }
        let propertyID = (await db.graph.createNode(["Property"], obj)).records[0].get("identity");
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

    let result = await driver
        .session()
        .run(`match (f),(t) where ID(f)=${obj.from} and ID(t)=${obj.to} merge (f)-[rel:${obj.name}]->(t) return rel as relation`);

    apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!", result.records[0].get("relation")));
});

module.exports.deleteNode = apiTools.parameterizedHandler(["token", "id"], async function body(obj, req, res) {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 999, "Wrong token!"));
        return;
    }

    driver
        .session()
        .run(`MATCH (n:Display) WHERE id(n)=${obj.id} DETACH DELETE n`);

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
        let id = marks.records[0].get("n")["identity"];
        let relatedNodes = await db.graph.getRelatedNodes(id, "property");

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

module.exports.getMarkInfo = apiTools.parameterizedHandler(["token", "type"], async (obj, req, res) => {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 1, "Wrong token!"));
        return;
    }

    let isTypeExists = false;
    let properties = [];
    driver
        .session()
        .run(`MATCH (n:Mark)-[:property]->(m) WHERE n.type="${obj.type}" RETURN n AS mark, m AS property`)
        .subscribe({
            onNext: record => {
                if(!isTypeExists)
                    isTypeExists = true;
                properties.push(record.get("property"));
            },
            onCompleted: () => {
                if(!isTypeExists) 
                    apiTools.sendReport(res, new ApiReport("error", 2, "Type not found!"))
                else 
                    apiTools.sendReport(res, new ApiReport("error", 0, "Successful!", {response: properties}));
            }
        });
});

module.exports.createNode = apiTools.parameterizedHandler(["token", "mark"], async (obj, req, res) => {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 1, "Wrong token!"));
        return;
    }

    let nodeData = {};

    let marks = obj.mark.split(" ");
    try {
        let properties = await driver
                .session()
                .run(`MATCH (m:Mark)-[:property]->(p:Property) WHERE m.type IN ${JSON.stringify(marks)} RETURN properties(p) AS property`);

        for (let i = 0; i < properties.records.length; i++)
        {
            let property = properties.records[i].get("property");
            nodeData[property["propertyName"]] = property["default"];
        }

        let result = await driver
                .session()
                .run(`CREATE (n:Display:${marks.join(":")}) SET n = {data} RETURN ID(n) as identity`, { data: nodeData })

        apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!", {identity: result.records[0].get("identity")}));
    }
    catch (error) {
        apiTools.sendReport(res, new ApiReport("error", -1, "Unexpected error!", error));
        throw error;
    }
});

module.exports.getNode = apiTools.parameterizedHandler(["token", "id"], async (obj, req, res) =>{
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 1, "Wrong token!"));
        return;
    }

    try {
        let a = [];
        let response = await driver.session().run(`MATCH (n:Display) WHERE ID(n)=${obj.id} RETURN n AS node`);
        if(response.records.length > 0) {
            let node = response.records[0].get("node");
            node.labels.splice(node.labels.findIndex((value, index) => value === "Display"), 1);
            apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!", { response: node }));
        }
        else 
            apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!"));
    }
    catch (error) {
        apiTools.sendReport(res, new ApiReport("error", -1, "Unexpected error!", error));
        throw error;
    }
});

module.exports.getNodes = apiTools.parameterizedHandler(["token"], async (obj, req, res) => {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 1, "Wrong token!"));
        return;
    }

    let response = [];
    driver
        .session()
        .run("MATCH (n:Display) RETURN n AS node")
        .subscribe({
            onNext: record => {
                let node = record.get("node");
                node.labels.splice(node.labels.findIndex((value, index) => value === "Display"), 1);
                response.push(node);
            },
            onCompleted: () => {
                apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!", {response: response}));
            }
    })
});

module.exports.getRelations = apiTools.parameterizedHandler(["token"], async (obj, req, res) => {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 1, "Wrong token!"));
        return;
    }

    let response = [];

    let result = driver.session().run(`MATCH (:Display)-[rel]->(:Display) RETURN rel AS relation`).subscribe(
        {
            onNext: (record) => response.push(record.get("relation")),
            onCompleted: () => apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!", response))
        });
});

module.exports.editNode = apiTools.parameterizedHandler(["token", "id", "name", "value"], async (obj, req, res) => {
    if(!(await db.user.isTokenExists(obj.token)))
    {
        apiTools.sendReport(res, new ApiReport("error", 1, "Wrong token!"));
        return;
    }

    let result = await driver
        .session()
        .run(`MATCH (n:Display) WHERE id(n)=${obj.id} AND exists(n.${obj.name}) SET n.${obj.name}="${obj.value}" RETURN n AS node`);

    if(result.records.length != 0)
        apiTools.sendReport(res, new ApiReport("ok", 0, "Successful!"));
    else
        apiTools.sendReport(res, new ApiReport("error", -1, "Unexpected error!"));
});
