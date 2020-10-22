const driver = require('./driver');

function clearDatabase(callback) {
    driver.session()
        .run('MATCH (n) DETACH DELETE n')
        .then(response => callback(response, null), err => callback(null, err));
}

function initialize(callback) {
    driver.session()
        .run('CREATE INDEX ON :User(login)')
        .then(response => callback(response, null), err => callback(null, err))
    driver.session()
        .run('CREATE INDEX ON :User(token)')
        .then(response => callback(response, null), err => callback(null, err))
}

module.exports.initialize = initialize;
module.exports.clearDatabase = clearDatabase;