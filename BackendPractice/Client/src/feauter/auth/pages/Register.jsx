import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {
  const {handleRegister} = useAuth()
  const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        name:"",
        email:"",
        age:"",
        add:"",
        password:"",

    })

   

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = await handleRegister(formdata)
        if(data){
          navigate("/login")
        }
        console.log(data)
        setFormdata({
        name:"",
        email:"",
        age:"",
        add:"",
        password:"",

    })
    }
    const  handleChange = (e)=>{
        console.log(e.target.name)
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

  return (
    <div>
      <h1>Register User</h1> 

      <form onSubmit={handleSubmit}>
        <input 
        name="name"
        value={formdata.name}
        onChange={handleChange}
        type="text" placeholder='Enter Name' />
        <input 
        name="email"
        value={formdata.email}
        onChange={handleChange}
        type="email" placeholder='email' />
        <input 
        name="age"
        value={formdata.age}
        onChange={handleChange}
        type="text" placeholder='Age' />
        <input 
        name="add"
        value={formdata.add}
        onChange={handleChange}
        type="text" placeholder='Addrese' />
        <input 
        name="password"
        value={formdata.password}
        onChange={handleChange}
        type="text" placeholder='Password' />
        <button type='submit'>Register</button>
      </form>

    </div>
  )
}

export default Register
