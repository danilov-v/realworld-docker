const express = require("express");
const axios = require("axios");
const { connectDb } = require("./helpers/db");
const { port, host, db, apiUrl } = require("./configuration");

const app = express();

app.get("/", (req, res) => {
    res.send("Auth. Hello World");
});

app.get("/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "some_usr@gmail.com",
    });
});

app.get("/testWithApiData", async (req, res) => {
    const { data } = await axios.get(`${apiUrl}/testApiData`);
    res.json({
        apiData: data,
    });
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
