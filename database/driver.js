const dbConfig = require('../configs/database.json');

const neo4j = require('neo4j-driver');
const driver = neo4j.driver(dbConfig.host, neo4j.auth.basic(dbConfig.user, dbConfig.password));

module.exports = {
    driver
};
