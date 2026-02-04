const express = require("express");
const noteModel = require("./models/note.model");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.post("/api/notes", async (req, res) => {
  const { title, desc } = req.body;
  const note = await noteModel.create({
    title,
    desc,
  });

  res.status(201).json({
    message: "Note Created Succcesfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    msg: "Notes Fetch SucsessFully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  console.log(id);

  res.status(200).json({
    msg: "delete",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { desc } = req.body;

  await noteModel.findByIdAndUpdate(id, { desc });

  res.status(200).json({
    msg: "Update SucsessFully",
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
