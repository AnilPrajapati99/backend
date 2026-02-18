const express = require("express");
const userRoouterAuth = require("../src/routes/user.auth");
const cookie = require("cookie-parser");

const app = express();

app.use(cookie());

app.use(express.json());
app.use("/api/auth", userRoouterAuth);

module.exports = app;
