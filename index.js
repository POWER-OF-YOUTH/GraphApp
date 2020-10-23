const express = require("express");
const app = express();
const appConfig = require('./configs/app.json');

const api = require("./routes/api");
const db = require("./database");

app.use("/api/", api);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

/*
db.initialize((res, err) => {
    if(err)
        console.log(err);
});

db.clearDatabase((res, err) => {
    if(err)
        console.log(err);
});
*/


app.listen(appConfig.port, appConfig.hostname, () => { 
    console.log(`Server is running on ${appConfig.hostname}:${appConfig.port}`);
});