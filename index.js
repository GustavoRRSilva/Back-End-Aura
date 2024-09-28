const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
});

// Exporta o app como uma função
module.exports = app;
