const { driver } = require('./driver');
const { UserInfo } = require('./objects');

async function clearDatabase() {
    await driver.session().run('MATCH (n) DETACH DELETE n')
        .catch((err) => console.log(err));
}

async function initialize() {
    const session = driver.session();
    await session.run('CREATE INDEX ON :User(nickname)')
        .catch(err => console.log(err));
    await session.run('CREATE INDEX ON :User(token)')
        .catch(err => console.log(err));
}

initialize();

require('./examples');
