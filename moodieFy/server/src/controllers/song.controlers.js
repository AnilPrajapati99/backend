import { songModel } from "../models/song.model.js";
import id3 from "node-id3";
import uploadFile from "../service/storage.service.js";

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const tags = id3.read(songBuffer);
  const { mood } = req.body;

  console.log(mood);

  const songFile = await uploadFile({
    buffer: songBuffer,
    filename: (tags.title || "unknown") + ".mp3",
    folder: "/cohort-2/moodify/songs",
  });

  const title = tags.title || req.file.originalname || "unknown";

  const DEFAULT_POSTER =
    "https://ik.imagekit.io/g3308pgs8g/default.png?updatedAt=1776416587719";

  let posterUrl = DEFAULT_POSTER;

  if (tags.image?.imageBuffer) {
    const posterFile = await uploadFile({
      buffer: tags.image.imageBuffer,
      filename: (title || "poster") + ".jpeg",
      folder: "/cohort-2/moodify/posters",
    });

    posterUrl = posterFile.url;
  }

  const song = await songModel.create({
    title: title,
    url: songFile.url,
    posterUrl: posterUrl,
    mood: mood,
  });

  res.status(201).json({
    message: "Song Create Succefully",
    song,
  });
}

export async function getSong(req, res) {
  const { mood } = req.query;

  const song = await songModel.findOne({ mood });

  res.status(200).json({
    message: "Song Fetched Successfully",
    song,
  });
}

export default uploadSong;
