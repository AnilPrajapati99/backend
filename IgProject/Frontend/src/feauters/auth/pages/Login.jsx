import React, { useState } from 'react'
import "../styles/form.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
      const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    async function handleFormSubmit(e) {
        e.preventDefault()
        axios.post("http://localhost:3000/api/auth/login",{
            username,
            password
        },{withCredentials:true}).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (

    
   
     <main>
            <div className="form-container">
                <h1>Login Form</h1>
                <form onSubmit={handleFormSubmit}>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type="text" name='username' placeholder='Enter Username' />
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="text" name='password' placeholder='Enter password' />
                    <button>Login</button>
                </form>
                <span>Already Have an Account ? <Link className='toggleAuth' to="/register">Register</Link> </span>
            </div>
     </main>
  
  )
}

export default Login
