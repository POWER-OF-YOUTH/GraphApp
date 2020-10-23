//@ts-check

const crypto = require("crypto");
const tokenSalt = 'power_of_youth';
const passwordSalt = 'htuoy';
// Объекты эквиваленты объектам из базы данных

class UserInfo {
    constructor(login, name, surname, mail, password)
    {
        this.login = login;
        this.mail = mail;
        this.name = name;
        this.surname = surname;
        this.password = password;
    };   
}

/**
 * 
 * @param {UserInfo} userInfo 
 */
function checkFilling(userInfo) {
    return new Promise(
        (resolve, reject) => {
            let hasUndefinedKeys = false;
            let requireParam = [];
            for (let key in userInfo) {
                if (userInfo[key] == undefined) {
                    requireParam.push(key);
                    hasUndefinedKeys = true;
                }
            }
            if(hasUndefinedKeys)
                reject({requireParam: requireParam});
            else
                resolve();
    });
} 

class TokenGenerator {
    /**
     * 
     * @param {string} login 
     * @param {string} password 
     * @return {string} md5
     */
    generateFrom = (login, password) => {
        return crypto.createHash('md5').update(login + password + tokenSalt).digest('hex');
    };
}

class PasswordHasher {
    /**
     * 
     * @param {string} password 
     */
    getHash = (password) => {
        if(password == undefined)
            return undefined;
        return crypto.createHash('md5').update(password + passwordSalt).digest('hex');
    }
}

module.exports = {
    UserInfo,
    TokenGenerator,
    PasswordHasher,
    checkFilling
};
