const { driver } = require('./driver');

function clearDatabase() {
    driver.session().run('MATCH (n) DETACH DELETE n')
    .catch((err) => console.log(err));
}
