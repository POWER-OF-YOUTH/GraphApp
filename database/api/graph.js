const driver = require('../driver');

function createNode(callback) {
    driver.session()
        .run('CREATE (n:BaseNode {subject: {sub}})')
        .then(data => callback(data, null), err => callback(null, data));
}

module.exports = {
    createNode
}