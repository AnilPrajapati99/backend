import { getAllSong, getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../Song.context";

export const useSong = () => {
  const {
    song,
    setloading,
    setsong,
    loading,
    playlist,
    setPlaylist,
    mood,
    setMood,
  } = useContext(SongContext);

  async function handleGetSong({ mood }) {
    setloading(true);
    const data = await getSong({ mood });
    setsong(data.song);
    setloading(false);
  }

  async function handleAllSongs({ mood }) {
    setloading(true);
    const data = await getAllSong({ mood });
    setPlaylist(data.allSong);
    setloading(false);
  }

  return {
    loading,
    song,
    handleGetSong,
    playlist,
    setPlaylist,
    handleAllSongs,
    setMood,
    mood,
  };
};
