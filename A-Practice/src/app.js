const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const notes = [
  {
    user: "Anil",
    role: "Frontend Developer",
    compony: "Amazon",
  },
];

app.post("/notes", (req, res) => {
  res.send("Notes Created");
  notes.push(req.body);
  console.log("🚀 ~ notes:", notes);
});

app.get("/notes", (req, res) => {
  console.log(notes);
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
  res.send(`Delete successfully, ${notes[req.params.index].user}`);
  delete notes[req.params.index];
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].compony = req.body.compony;
  res.send("successful modified");
});

app.put("/notes/:index", (req, res) => {
  notes[req.params.index] = req.body;
  res.send("Sucessfuly Change");
});

module.exports = app;
