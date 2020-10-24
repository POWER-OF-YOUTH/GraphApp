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

/**
 * 
 * @param {string} login 
 */
function getByLogin(login) {
    return getBy('login', login).then(response => {
        if(response.records.length == 0)
            throw new objects.ApiReport("error", 1, "Missing login!");
        else
            return response.records[0]._fields[0].properties;
    });
}

/**
 * 
 * @param {string} token 
 */
function getByToken(token) {
    return getBy('token', token).then(response => { 
        if(response.records.length == 0) 
            throw new objects.ApiReport("error", 3, "Missing token!");
        else
            return response.records[0]._fields[0].properties;
    });
}

function getBy(by, value) {
    return driver
        .session()
        .run(`MATCH (n:User {${by}: {value}}) RETURN n`, { value });
};

module.exports = {
    createUser,
    getByLogin,
    getByToken
}
