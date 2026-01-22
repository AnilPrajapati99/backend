const express = require("express");

const app = express(); //server instance call

app.listen(3000); //server styart

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/home", (req, res) => {
  res.send("Hello Home");
});

app.get("/about", (req, res) => {
  res.send("Hello About");
});
