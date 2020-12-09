const driver = require('../driver');

/**
 * 
 * @param {Array<string>} labels 
 * @param {any} data 
 */
function createNode(labels, data) {
    return driver
        .session()
        .run(`CREATE (n:${labels.join(":")}) SET n = {data} RETURN ID(n)`, { data: data });
}

/**
 * 
 * @param {number} fromID 
 * @param {number} toID 
 * @param {string} relationName 
 */
function createRelation(fromID, toID, relationName) {
    return driver
        .session()
        .run(`match (f),(t) where ID(f)=${fromID} and ID(t)=${toID} merge (f)-[:${relationName}]->(t)`);
}

/**
 * 
 * @param {number} id
 */
function deleteNode(id) {
    return driver
        .session()
        .run(`MATCH (n:Display) WHERE ID(n)=${id} DETACH DELETE n`);
}

/**
 * 
 * @param {number} from 
 * @param {number} to 
 * @param {string} relationName 
 */
function deleteRelation(from, to, relationName) {
    return driver
        .session()
        .run(`MATCH (n)-[rel:${relationName}]->(m) WHERE ID(n)=${from} AND ID(m)=${to} DELETE rel`);
}

/**
 * 
 * @param {number} id 
 */
function getNode(id) {
    return driver
        .session()
        .run(`MATCH (n) WHERE ID(n)=${id} return n`);
}

/**
 * 
 * @param {string} label 
 */
function getNodes(label) {
    return driver
        .session()
        .run(`MATCH (n:${label}) RETURN n`);
}

/**
 * 
 * @param {id} id 
 * @param {string} relationName 
 */
function getRelatedNodes(id, relationName = undefined) {
    if(relationName == undefined)
        return driver
            .session()
            .run(`MATCH (n)-[]->(m) WHERE ID(n)=${id} RETURN m`);
    return driver
        .session()
        .run(`MATCH (n)-[:${relationName}]->(m) WHERE ID(n)=${id} RETURN m`)
}

module.exports = {
    createNode,
    createRelation,
    deleteNode,
    deleteRelation,
    getNode,
    getRelatedNodes,
    getNodes
}