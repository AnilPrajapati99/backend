import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    async function handleFormSubmit(e) {
        e.preventDefault()
        axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password
        },{withCredentials:true}).then((res)=>{
            console.log(res.data)
        })
    }

    console.log(username)

  return (
    <main>
            <div className="form-container">
                <h1>Register Form</h1>
                <form onSubmit={handleFormSubmit}>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type="text" name='username' placeholder='Enter Username' />
                    <input
                    onChange={(e)=>{setEmail(e.target.value)}}
                    
                    type="text" name='email' placeholder='Enter Email' />
                    <input
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="text" name='password' placeholder='Enter password' />
                    <button>Register</button>
                </form>
                <span>Already Have an Account ? <Link className='toggleAuth' to="/login">Login</Link> </span>
            </div>
     </main>
  )
}

export default Register
