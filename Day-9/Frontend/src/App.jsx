import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes,setNotes] = useState([])

  function getNotes(){
  axios.get("http://localhost:3000/api/notes").then((res)=>{
    setNotes(res.data.notes)
  })
  }

  useEffect(()=>{
    getNotes()
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const {title,desc} = e.target.elements
    console.log(title.value,desc.value)

    axios.post('http://localhost:3000/api/notes',({
      title:title.value,
      desc:desc.value
    })).then((res)=>{
     getNotes()
      console.log(res.data)
    })
    title.value = ""
    desc.value = ""

  }

  function deleteNote(noteId){
    console.log(noteId)
    axios.delete("http://localhost:3000/api/notes/"+noteId).then((res)=>{
      console.log(res.data)
      getNotes()
    })
  }

  console.log(notes)
  
  return (
    <div className='container'>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder='Type Title' /> 
          <input type="text" name="desc" id=""  placeholder='Enter Desc..'/>
          <button>Submit</button>
        </form>
      </div>

      {/* Notes Card */}
  <div   className="notes-cont">
       {notes && (notes.map((item,idx)=>{
      const {title,desc} = item
      return(
         
          <div key={idx} className="notes-card">
        <div className='card-inside'>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        <button onClick={()=>{deleteNote(item._id)}}>Delete</button>
      </div>
      )
     }))}
  </div>
    </div>
  )
}

export default App
