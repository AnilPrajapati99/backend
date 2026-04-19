import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../Song.context";

export const useSong = () => {
  const { song, setloading, setsong, loading } = useContext(SongContext);

  async function handleGetSong({ mood }) {
    console.log(mood);
    setloading(true);
    const data = await getSong({ mood });
    setsong(data.song);
    setloading(false);
  }

  return { loading, song, handleGetSong };
};
