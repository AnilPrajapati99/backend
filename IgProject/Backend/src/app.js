const express = require("express");
const cookie = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cookie());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

// Require Routes
const authRoutes = require("../src/routes/auth.routes");
const postRoutes = require("../src/routes/post.routes");
const userRoutes = require("./routes/user.route");

// using Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/users/", userRoutes);

module.exports = app;
