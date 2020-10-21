const user = require("./api/user");
const driver = require('./driver');

function clearDatabase(callback) { // Здесь коллбеку п
    driver.session().run('MATCH (n) DETACH DELETE n')
        .then(response => callback(response, null), err => callback(null, err));
}

function initialize(callback) {
    const session = driver.session();
    session.run('CREATE INDEX ON :User(login)')
        .then(response => callback(response, null), err => callback(null, err))
    session.run('CREATE INDEX ON :User(token)')
        .then(response => callback(response, null), err => callback(null, err))
}

module.exports.user = user;
module.exports.initialize = initialize;
module.exports.clearDatabase = clearDatabase;