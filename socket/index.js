const socket = require("socket.io")();

var clients = [];

socket.on("connection", client => {
    clients.push(client);
    client.on("disconnect", () => {
        clients.splice(clients.indexOf(client), 1);
        console.log("Disconnected!");
    });

    client.on("update", data => {

    });
    console.log("New connection!");
});

socket.listen(7532);

module.exports.socket = socket;
module.exports.getClients = () => clients;