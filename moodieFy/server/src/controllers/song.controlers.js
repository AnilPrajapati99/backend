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
  try {
    const { mood } = req.query;

    // 👇 dynamic match
    const matchStage = mood ? { mood } : {};

    const songs = await songModel.aggregate([
      { $match: matchStage },
      { $sample: { size: 1 } },
    ]);

    const song = songs[0];

    if (!song) {
      return res.status(404).json({
        message: "No song found",
      });
    }

    res.status(200).json({
      message: "Song Fetched Successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getAllSong(req, res) {
  const { mood } = req.query;

  try {
    if (mood) {
      const songs = await songModel.find({ mood });
      return res.status(200).json({
        message: "Song Fetched Successfully",
        allSong: songs,
      });
    }
    const allSong = await songModel.find();

    res.status(200).json({
      message: "All Song Fetched Succesfully",
      allSong,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default uploadSong;
