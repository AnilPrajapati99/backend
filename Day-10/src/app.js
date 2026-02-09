const express = require("express");
const userModel = require("./model/user.model");
const authRouter = require("../src/routes/auth.routes");
const cookie = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookie());
// ?AuthRouter

app.use("/api/auth", authRouter);

// app.post("/api/user", async (req, res) => {
//   const { name, email, password } = req.body;
//   const data = await userModel.create({
//     name,
//     email,
//     password,
//   });
//   res.status(201).json({
//     message: "Data Create Sucessfully",
//     data,
//   });
// });

// app.get("/api/user", async (req, res) => {
//   const data = await userModel.find();
//   res.status(200).json({
//     message: "Data Fatch Sucessfully",
//     data,
//   });
// });

module.exports = app;
