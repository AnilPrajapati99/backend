// server ko strt kkrn
// db se coonect krn

const express = require("express");
const noteModel = require("./models/notes.model");
const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, desc, age } = req.body;
  const note = await noteModel.create({
    title,
    desc,
    age,
  });

  console.log(note);

  res.status(201).json({
    message: "Notes Create Successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "NOtes Fatch Successfully",
    notes,
  });
});

module.exports = app;
