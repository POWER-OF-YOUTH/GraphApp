const driver = require('../driver');

function createUser(userInfo, callback) {
    let data = driver
        .session()
        .run('CREATE (n:User) SET n = {user}', { user: userInfo })
        .then(data => callback(data, null), err => callback(null, err));
}

function getByLogin(login, callback) {
    getBy('nickname', login, callback);
}

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
