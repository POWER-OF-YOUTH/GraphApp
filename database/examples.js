const user = require('./api/user');

async function getExample() {
    console.log(await user.getByNick("aZx"));
    console.log(await user.getByNick("Evgeniy"));
}

getExample();
