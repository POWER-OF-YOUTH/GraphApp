const express = require("express");
const app = express();
const hostname = "localhost";
const port = 80;

const api = require("./routes/api");

app.use("/api/", api);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, hostname, () => { 
    console.log(`Server is running on ${hostname}:${port}`);
});