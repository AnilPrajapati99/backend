import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes,setNotes] = useState([
    {
      "title":"i am PoverMan",
      "desc":"Kyu re "
    },
    {
      "title":"i am Patlu",
      "desc":"Kyu re "
    },
    {
      "title":"i am Shaktiman",
      "desc":"Kyu re "
    },
    {
      "title":"i am Dog",
      "desc":"Kyu re "
    },
  ])

  axios.get('http://localhost:3000/api/notes').then((res)=>{
    setNotes(res.data.notes)
  })


  return (
    <div className='container'>

      {notes.map((elem,idx)=>{
        const {title,desc} = elem
        return (
        <div key={idx} className="notes">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
        )
      })}

    </div>
  )
}

export default App
