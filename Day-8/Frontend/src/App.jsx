import React from 'react'
import { useState , useEffect} from 'react'

import axios from 'axios'

const App = () => {
  const [notes,setNotes] = useState([])

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes').then((res)=>{
    setNotes(res.data.notes)
  })
  }

  useEffect(()=>{
     fetchNotes()
  },[])
 
  
  function handleSubmit(e){
    e.preventDefault()

    const {title,desc} = e.target.elements
    console.log(title.value,desc.value)

    axios.post('http://localhost:3000/api/notes',{
      title:title.value,
      desc:desc.value
    }).then((res)=>{
      console.log(res.data)
      fetchNotes()

      desc.value =''
      title.value=''
    })
  }

function handleDelete(noteId){
console.log(noteId)
axios.delete(`http://localhost:3000/api/notes/`+noteId).then((res)=>{
  console.log(res.data)
  fetchNotes()
})
}

  console.log("Render")

  return (
    <div className='container'>

      <form  onSubmit={handleSubmit} className='note-create-form'>
        <input type="text" name="title" id=""  placeholder='Enter Title..'/>
        <input type="text" name="desc" id=""  placeholder='Enter Desc..'/>
        <button>Create Notes</button>
      </form>

      <div className="notes-container">
        {notes.map((elem,idx)=>{
        const {title,desc} = elem
        return (
        <div key={idx} className="notes">
        <h3>{title}</h3>
        <p>{desc}</p>
        <button onClick={()=>{handleDelete(elem._id)}}>Delete</button>
      </div>
        )
      })}
      </div>

    </div>
  )
}

export default App
