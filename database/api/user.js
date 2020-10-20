const { driver } = require('../driver');

async function createUser(userInfo) {
    await driver.session().run('CREATE (n:User) SET n = {user}', { user: userInfo })
        .catch(err => console.log(err));
}

module.exports = {
    createUser
}
