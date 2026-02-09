import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes,setNotes] = useState([])
  const [isTrue,setTrue] = useState(false)
  const [id,setId] = useState(null)
console.log(id)
  function getNotes(){
  axios.get("https://backend-1-cdse.onrender.com/api/notes").then((res)=>{
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

    axios.post('https://backend-1-cdse.onrender.com/api/notes',({
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
    axios.delete("https://backend-1-cdse.onrender.com/api/notes/"+noteId).then((res)=>{
      console.log(res.data)
      getNotes()
    })
  }



  console.log(notes)
const handleUpdate = (id)=>{
  setTrue(!isTrue)
  setId(id)
}
  const handleSubmitUpdate = (e)=>{
    e.preventDefault()
    const {title,desc} = e.target.elements
    console.log(title.value)
      axios.patch('https://backend-1-cdse.onrender.com/api/notes/'+id,{
    title:title.value,
    desc:desc.value
  }).then((res)=>{
    getNotes()
    console.log(res.data)
  })
  title.value = ""
  desc.value= ""
  setTrue(false)
  }
  


  return (
    <div className='container'>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder='Type Title' required /> 
          <input type="text" name="desc" id=""  placeholder='Enter Desc..' required />
          <button>Submit</button>
        </form>
      </div>

      {/* Notes Card */}
  <div   className="notes-cont">
       {(notes.map((item,idx)=>{
      const {title,desc} = item
      return(
         
          <div key={idx} className="notes-card">
        <div className='card-inside'>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        <div className="btn-cont">
        <button className='update' onClick={()=>{handleUpdate(item._id)}}>Update</button>
        <button onClick={()=>{deleteNote(item._id)}}>Delete</button>
        </div>
      </div>
      )
     }))}
  </div>

  {isTrue && (
    <div className="update-from">
    <form onSubmit={handleSubmitUpdate} action="">
      <h3>Update Form</h3>
      <div>
        <input type="text" name='title' placeholder='Update Title' />
        <input type="text" name='desc' placeholder='Update Desc' />
      </div>
      <button>Done</button>
    </form>
  </div>
  )}
    </div>
  )
}

export default App
