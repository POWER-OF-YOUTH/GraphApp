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

module.exports = {
    createNode,
    createRelation
}