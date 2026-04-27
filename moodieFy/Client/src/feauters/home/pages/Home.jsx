import React from 'react'
import FaceExpression from '../../expression/components/FaceExpressions'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import Playlists from '../components/Playlists'
import Expresion from '../../expression/components/Expresion'

const Home = () => {
  const {handleGetSong,handleAllSongs} = useSong()
  return (
    <div className='main-container'>
       <div className="left">
         <FaceExpression onClick={(expression)=>{handleGetSong({mood:expression})}} />
        <Player/>
       </div>
       <div className="right">
        <Playlists/>
       </div>
    </div>
  )
}

export default Home
