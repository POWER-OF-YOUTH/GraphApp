const driver = require('../driver');
const errors = require('../errors');

/**
 * 
 * @param {UserInfo} userInfo 
 * @param {string} token 
 * @param {(response, err) => any} callback 
 */
function createUser(userInfo, token) {
    userInfo.token = token;
    return driver
        .session()
        .run('CREATE (n:User) SET n = {user}', { user: userInfo });
}

/**
 * 
 * @param {string} login 
 * @param {(response, err) => any} callback 
 */
function getByLogin(login) {
    return getBy('login', login).then(response => {
        if(response.records.length == 0)
            throw errors.missingLogin;
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
            throw errors.noResults;
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
