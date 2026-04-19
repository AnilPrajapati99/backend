import React from 'react'
import FaceExpression from '../../expression/components/FaceExpressions'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'

const Home = () => {
  const {handleGetSong} = useSong()
  return (
    <div>
        <FaceExpression onClick={(expression)=>{handleGetSong({mood:expression})}} />
        <Player/>
    </div>
  )
}

export default Home
