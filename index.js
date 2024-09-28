const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Seja bem vindo a Aura!");
});

// Exporta o app como uma função
module.exports = app;
