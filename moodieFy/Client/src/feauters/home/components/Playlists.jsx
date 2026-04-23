import React, { useEffect } from 'react'
import { useSong } from '../hooks/useSong'
import { useContext } from 'react'
import './playlists.scss'
import { SongContext } from '../Song.context'

const Playlists = () => {
    const {loading,playlist,handleAllSongs} = useSong()
    const {mood,setsong} = useContext(SongContext)

  useEffect(() => {
  if (mood !== undefined) {
    handleAllSongs({ mood });
  }
}, [mood]);

const handleSongs = (song) => {
setsong(song)
}

  return (
    
    <div className='playlists-container'>
      <span>{mood ? mood : "All Song"}</span>
      {loading && playlist ? (
        <p>Loading...</p>
      ) : (
        playlist.map((song, index) => (
          <div key={index} className='playlist-card' onClick={()=>handleSongs(song)}>
            <img src={song.posterUrl} alt={song.title} className='poster' />
            <div className='card-content'>
              <h3 className='title'>{song.title}</h3>
              <p className='mood'>{song.mood}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Playlists
