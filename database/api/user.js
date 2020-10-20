const { driver } = require('../driver');

async function createUser(userInfo) {
    await driver.session().run('CREATE (n:User) SET n = {user}', { user: userInfo })
        .catch(err => console.log(err));
}

async function getByNick(nickname) {
    return await getBy('nickname', nickname.toLowerCase());
}

async function getByToken(token) {
    return await getBy('token', token);
}

// Private
async function getBy(by, value) {
    const user = await driver.session().run(`MATCH (n:User {${by}: {value}}) RETURN n`, { value })
        .catch(err => console.log(err));
    return user.records[0] && user.records[0].get('n').properties;
}

module.exports = {
    createUser,
    getByNick,
    getByToken
}
