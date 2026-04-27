import React from 'react'
import { SongContext } from '../../home/Song.context'
import { useContext } from 'react'
import { FaFaceSadCry, FaFaceSmile, FaFaceSurprise, FaRegFaceSurprise } from "react-icons/fa6";
import { TbMoodAnnoyed2 } from "react-icons/tb";
import { IconContext } from "react-icons";
import "./expression.scss"

const Expresion = () => {
const {mood} = useContext(SongContext)
const moodMap = {
  "happy":{
    text:"Happy",
    icon:<FaFaceSmile />,
    color:"pink",
  } ,
  "sad": {
    text:"Sad",
    icon:<FaFaceSadCry />,
    color:"red",
  },
  "suprised": {
    text:"Surprised",
    icon:<FaRegFaceSurprise />,
    color:"pink",
  }
}

const fallbackTexts = [
  "Dil toh hai par mood offline hai 💔",
  "Select a mood warna random gaane bajenge 😏",
  "Aaj ka mood kya hai boss? 🤔",
  "Lagta hai life buffering me hai ⏳"
];

const randomText = fallbackTexts[Math.floor(Math.random()*fallbackTexts.length)]

  return (
    <IconContext.Provider value={{size:"70px",color:"red"}}>
        <div className='expresion-container' style={{backgroundColor: moodMap[mood]?.color || "#000000"}}>
      <span>{moodMap[mood]?.icon || <TbMoodAnnoyed2 /> }</span>
      <h2>{moodMap[mood]?.text || randomText }</h2>
    </div>
    </IconContext.Provider>
  )
}

export default Expresion
