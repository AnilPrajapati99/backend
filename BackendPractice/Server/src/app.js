import express from "express";
import authRouter from "./Routes/auth.routes.js";
import cookie from "cookie-parser";
import morgan from "morgan";

const app = express();

// middleware
app.use(express.json());
app.use(cookie());
app.use(morgan("dev"));

//Api Routes

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Home");
});

export default app;
