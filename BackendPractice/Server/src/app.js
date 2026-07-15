import express from "express";
const app = express();

app.use(express.json());

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
