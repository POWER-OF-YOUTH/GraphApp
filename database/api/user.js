//@ts-check

const driver = require('../driver');
const objects = require('../objects');

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

module.exports = {
    createUser,
    getBy
}
