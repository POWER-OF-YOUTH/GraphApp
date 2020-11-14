//@ts-check

const ApiReport = require("./ApiReport");
const crypto = require("crypto");
const tokenSalt = 'power_of_youth';
const passwordSalt = 'htuoy';


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

/**
 * 
 * @param {any} res 
 * @param {ApiReport} apiReport 
 */ 
function sendReport(res, apiReport) {
    res.send(apiReport);
}

module.exports.sendReport = sendReport;

/**
 * 
 * @param {Array<string>} requiredParameters 
 * @param {any} body 
 */
module.exports.parameterizedHandler = (requiredParameters, body) => {
    return (req, res) => checkFilling(req.query, requiredParameters)
        .then(obj => body(obj, req, res))
        .catch(unfilledData => sendReport(res, new ApiReport("error", 4, "Not enough data!", unfilledData)));
}

module.exports.generateTokenFrom = (login, password) => {
    return crypto.createHash('md5').update(login + password + tokenSalt).digest('hex');
};

module.exports.getPasswordHash = (password) => {
    if(password == undefined)
        return undefined;
    return crypto.createHash('sha256').update(password + passwordSalt).digest('hex');
}

