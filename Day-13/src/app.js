const express = require("express");
const app = express();
const authRouter = require("../src/routes/auth.routes");
const cookie = require("cookie-parser");

app.use(express.json());
app.use(cookie());
app.use("/api/auth", authRouter);

module.exports = app;
