import express from "express";
import cookie from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookie());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send(names);
});

const names = ["Anil", "lion", "Tiger"];

app.post("/data", (req, res) => {
  const { name } = req.body;
  names.push(name);

  res.status(200).json({
    message: "Done Push",
    data: names,
  });
});

// Auth Routes prefix
import authRouter from "./Routes/authRoutes.js";

app.use("/api/auth", authRouter);

export default app;
