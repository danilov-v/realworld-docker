const express = require("express");
const axios = require("axios");
const { connectDb } = require("./helpers/db");
const { port, host, db, authApiUrl } = require("./configuration");

const app = express();

app.get("/", (req, res) => {
    res.send("API. Hello World");
});

app.get("/testWithCurrentUser", async (req, res) => {
    const { data } = await axios.get(`${authApiUrl}/currentUser`);

    res.json({
        testWithAuth: true,
        currentUserFromAuth: data,
    });
});

app.get("/testApiData", (req, res) => {
    res.json({
        testApiData: true,
    });
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`API is started on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`MONGO is started on host: ${db}`);
    });
};

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);
