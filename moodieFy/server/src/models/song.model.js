import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["sad", "happy", "suprised"],
    },
  },
});

export const songModel = mongoose.model("song", songSchema);
