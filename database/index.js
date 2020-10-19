const fs = require("fs");

module.exports.addUser = (userInfo, callback) => {
    fs.appendFile("./output.txt", userInfo.name + "\n", callback);
};