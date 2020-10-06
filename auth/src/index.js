const express = require("express");
const { connectDb } = require("./helpers/db");
const { port, host, db } = require("./configuration");

const app = express();

app.get("/", (req, res) => {
    res.send("Auth. Hello World");
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`AUTH server is started on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`MONGO is started on host: ${db}`);
    });
};

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);
