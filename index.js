const express = require("express");
const app = express();
const appConfig = require('./configs/app.json');

const api = require("./routes/api");

app.use("/api/", api);

app.get("/", (req, res) => {
    res.send("Hello, World!");
    // TODO: Отправка react приложения
});

app.listen(appConfig.port, appConfig.hostname, () => { 
    console.log(`Server is running on ${appConfig.hostname}:${appConfig.port}`);
});