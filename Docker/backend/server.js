import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello Connect",
  });
});

app.get("/api/data", (req, res) => {
  const data = {
    id: 1,
    name: "Anil",
    age: 20,
  };
  res.status(200).json(data);
});

app.get("/home", (req, res) => {
  res.send("hello word");
});

app.listen(3000, () => {
  console.log("server is connected");
});
