const user = require("./api/user");
const driver = require('./driver');

function clearDatabase(callback) {
    driver.session().run('MATCH (n) DETACH DELETE n')
        .then(response => callback(response, null), err => callback(null, err));
}

function initialize(callback) {
    let session = driver.session();
    let response = [];
    session.run('CREATE INDEX ON :User(login)')
        .then(res => {
            response.push(res);
            session.run('CREATE INDEX ON :User(token)')
                .then(res => {response.push(res); callback(response, null)}, err => callback(null, err));
        }, err => null);
}

module.exports.user = user;
module.exports.initialize = initialize;
module.exports.clearDatabase = clearDatabase;