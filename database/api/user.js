const driver = require('../driver');
const objects = require('../objects');
const errors = require('../errors');

/**
 * 
 * @param {UserInfo} userInfo 
 * @param {string} token 
 * @param {(response, err) => any} callback 
 */
function createUser(userInfo, token, callback) {
    userInfo.token = token;
    let data = driver
        .session()
        .run('CREATE (n:User) SET n = {user}', { user: userInfo })
        .then(data => callback(data, null), err => callback(null, err));
}

/**
 * 
 * @param {string} login 
 * @param {(response, err) => any} callback 
 */
function getByLogin(login, callback) {
    getBy('login', login, (response, err) => {
        if(err)
            callback(null, err); 
        else if(response.records.length == 0)
            callback(null, errors.usersNotFound);
        else
        {
            response = response.records[0]._fields[0].properties;
            callback(response, null);
        }
    });
}

/**
 * 
 * @param {string} token 
 * @param {(response, err) => any} callback 
 */
function getByToken(token, callback) {
    getBy('token', token, callback);
}

// Private
function getBy(by, value, callback) {
    let user = driver
        .session()
        .run(`MATCH (n:User {${by}: {value}}) RETURN n`, { value })
        .then(data => callback(data, null), err => callback(null, err));
};

module.exports = {
    createUser,
    getByLogin,
    getByToken
}
