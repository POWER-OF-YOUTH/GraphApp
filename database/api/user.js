//@ts-check

const driver = require('../driver');

/**
 * 
 * @param {any} data 
 * @param {string} token 
 */
function createUser(data, token) {
    data.token = token;
    return driver
        .session()
        .run('CREATE (n:User) SET n = {user}', { user: data });
}

function getBy(by, value) {
    return driver
        .session()
        .run(`MATCH (n:User {${by}: {value}}) RETURN n`, { value })
            .then(response => response.records);
};

async function isTokenExists(token) {
    let response = await driver
                        .session()
                        .run(`MATCH (n) WHERE n.token="${token}" RETURN n`);
    return response.records.length > 0;
}

module.exports = {
    createUser,
    getBy,
    isTokenExists
}