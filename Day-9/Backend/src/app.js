const express = require("express");
const app = express();
const noteModel = require("./models/note.model");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));
// const notes = [];

// app.post("/api/notes", (req, res) => {
//   notes.push(req.body);

//   res.status(201).json({
//     message: "notes Created",
//   });
// });

// app.get("/api/notes", (req, res) => {
//   res.status(200).json({
//     notes: notes,
//   });
// });

app.post("/api/notes", async (req, res) => {
  const { title, desc } = req.body;
  const notes = await noteModel.create({
    title,
    desc,
  });

  res.status(201).json({
    message: "Notes Created SuccessFully",
    notes,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes Fetch Succcesfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Delete SuccessFully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { desc, title } = req.body;
  await noteModel.findByIdAndUpdate(id, {
    desc,
    title,
  });

  res.status(200).json({
    message: "UPdate Succcesfully",
  });
});

module.exports = app;
