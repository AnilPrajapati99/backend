//  - server create karna
//  server ko config krna

const express = require("express");
const app = express();
app.use(express.json());

const notes = [
  {
    title: "Title 1",
    desc: "This is first desc",
  },
];

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.post("/notes", (req, res) => {
  console.log(req);
  res.send("note create");
  notes.push(req.body);
  console.log(notes);
});

// Delete / notes

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("Notes delete successfully..");
  console.log(req.params.index);
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].desc = req.body.desc;
  res.send("Modified successfully");
});

module.exports = app;
