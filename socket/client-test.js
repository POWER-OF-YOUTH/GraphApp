const ioClient = require("socket.io-client");

let client = null;

module.exports.connect = () => {
    client = ioClient.connect("http://localhost:99");
}

module.exports.disconnect = () => {
    client.emit("disconnect");
}