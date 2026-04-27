import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children})=> {
const [song, setsong] = useState(
{
  "url": "https://ik.imagekit.io/g3308pgs8g/cohort-2/moodify/songs/unknown_dvSjJ7Htv.mp3",
  "posterUrl": "https://ik.imagekit.io/g3308pgs8g/default.png?updatedAt=1776416587719",
  "title": "Labon Ko - Bhool Bhulaiyaa (128 kbps).mp3",
  "mood": "sad",
}
)

const [loading, setloading] = useState(false)
const [ playlist , setPlaylist] = useState([])
const [mood, setMood] = useState("")
const [currentSong,setCorrentSong] = useState(null)
const [songUrl, setSongUrl] = useState(null)

    return (
        <SongContext.Provider value={{song,songUrl,setSongUrl,currentSong,setCorrentSong,setMood,mood,playlist,setPlaylist,setloading,setsong,loading}}>
            {children}
        </SongContext.Provider>
    )

}