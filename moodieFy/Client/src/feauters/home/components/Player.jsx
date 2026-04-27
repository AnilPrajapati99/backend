import React, { useState, useRef, useEffect, useContext } from 'react'
import { SongContext } from '../Song.context'
import {useSong} from '../hooks/useSong'
import { RiPlayFill, RiPauseFill, RiReplay10Line, RiForward10Line } from "react-icons/ri";


import './player.scss'

const Player = () => {
  const { song,mood } = useSong()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // const [currentTime, setCurrentTime] = useState(0)
  const progressRef = useRef(null);
  const [uiTime, setUiTime] = useState(0);
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const {currentSong,setfuntion,songUrl} = useContext(SongContext)
const currentTimeRef = useRef(0);

const updateTime = () => {
  const audio = audioRef.current;
  if (!audio || !progressRef.current) return;

  const time = audio.currentTime;

  currentTimeRef.current = time;      // 🔥 IMPORTANT
  progressRef.current.value = time;   // slider update
};

useEffect(() => {
  const interval = setInterval(() => {
    setUiTime(currentTimeRef.current);
  }, 200);

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

useEffect(() => {
  if (!audioRef.current || !songUrl) return;

  const audio = audioRef.current;

  // Stop current song
  audio.pause();

  // Change song
  audio.src = songUrl;

  // Wait until audio is ready
  const handleCanPlay = () => {
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.log("Autoplay blocked:", err);
        setIsPlaying(false);
      });
  };

  audio.addEventListener("canplay", handleCanPlay);

  audio.load();

  return () => {
    audio.removeEventListener("canplay", handleCanPlay);
  };

}, [songUrl, mood]);

useEffect(() => {
  console.log("rendered once on mount");
}, []);

 const togglePlay = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(prev => !prev); // better
};

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
    }
  }

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10)
    }
  }

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value)
    setSpeed(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  const handleProgressChange = (e) => {
  const newTime = parseFloat(e.target.value);

  if (audioRef.current) {
    audioRef.current.currentTime = newTime; // 🔥 actual seek
  }
};

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className='player-container'>
      <audio ref={audioRef} src={song?.url || songUrl} />
      
      <div className='player-card'>
        {/* Song Poster */}
        <div className='player-poster'>
          <img src={song?.posterUrl} alt='Song Poster' />
          <div className={`play-indicator ${isPlaying ? 'playing' : ''}`}></div>
        </div>

        {/* Right Side Content */}
        <div className='player-content'>
          {/* Song Info */}
          <div className='song-info'>
            <h2 className='song-title'>{song?.title.slice(0,30)+". mp3" || 'No song playing'}</h2>
            <p className='song-mood'>{song?.mood || 'unknown'}</p>
          </div>

          {/* Progress Bar */}
          <div className='progress-section'>
            <input
              type='range'
              min='0'
              max={duration || 0}
             value={uiTime}
              ref={progressRef}
              onChange={handleProgressChange}
              className='progress-bar'
            />
            <div className='time-display'>
              <span className='current-time'>{formatTime(uiTime)}</span>
              <span className='duration'>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className='controls-section'>
            {/* Playback Buttons */}
            <div className='playback-buttons'>
              <button
                className='control-btn backward-btn'
                onClick={handleBackward}
                title='Skip backward 10 seconds'
              >
                <span><RiReplay10Line size={20} style={{color:"white"}} /></span>
              </button>

              <button
                className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                <span>{isPlaying ? <RiPauseFill size={20} style={{color:"white"}}/> : <RiPlayFill size={20} style={{color:"white"}} />}</span>
              </button>

              <button
                className='control-btn forward-btn'
                onClick={handleForward}
                title='Skip forward 10 seconds'
              >
                <span><RiForward10Line size={20} style={{color:"white"}} /></span>
              </button>

            </div>

            {/* Speed Control */}
            <div className='speed-control'>
              <label htmlFor='speed-select'>Speed:</label>
              <select
                id='speed-select'
                value={speed}
                onChange={handleSpeedChange}
                className='speed-select'
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
