//@ts-check

const crypto = require("crypto");
const tokenSalt = 'power_of_youth';
const passwordSalt = 'htuoy';

/**
 * 
 * @param {any} query 
 * @param {Array<string>} requiredParameters
 */
function checkFilling(query, requiredParameters) {
    return new Promise(
        (resolve, reject) => {
            let hasUndefinedKeys = false;
            let requireParam = [];
            let obj = {};
            for (let i = 0; i < requiredParameters.length; i++) {
                let key = requiredParameters[i];
                if (query[key] == undefined) {
                    requireParam.push(key);
                    hasUndefinedKeys = true;
                }
                else {
                    obj[key] = query[key];
                }
            }
            if(hasUndefinedKeys)
                reject({requireParam: requireParam});
            else
                resolve(obj);
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

class ApiReport {
    /**
     * 
     * @param {string} status 
     * @param {number} code 
     * @param {string} message 
     * @param {any} data
     */
    constructor(status, code, message, data = undefined)
    {
        this.status = status;
        this.code = code;
        this.message = message;
        if(data != undefined)
            this.data = data;
    }
}

class PasswordHasher {
    /**
     * 
     * @param {string} password 
     */
    getHash = (password) => {
        if(password == undefined)
            return undefined;
        return crypto.createHash('sha256').update(password + passwordSalt).digest('hex');
    }
}

module.exports = {
    TokenGenerator,
    PasswordHasher,
    ApiReport,
    checkFilling
};
