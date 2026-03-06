const express = require("express");
const cookie = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes");
const postRoutes = require("../src/routes/post.routes");

const app = express();

app.use(express.json());

app.use(cookie());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
