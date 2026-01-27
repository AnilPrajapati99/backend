const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());

const notes = [
  {
    title: "Anil",
    desc: "HEy i am anil",
  },
];

app.post("/post", (req, res) => {
  notes.push(req.body);
  console.log(notes);

  res.status(200).json({
    message: "Notes Created Successfully",
  });
});

app.get("/post", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

app.delete("/post/:index", (req, res) => {
  delete notes[req.params.index];
  res.status(200).json({
    message: "Delete Successfully",
  });
});

app.patch("/post/:index", (req, res) => {
  notes[req.params.index].desc = req.body.desc;

  res.status(200).json({
    message: "Change Succesfully",
  });
});

module.exports = app;
