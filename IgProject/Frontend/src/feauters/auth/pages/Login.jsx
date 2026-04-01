import React, { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const Login = () => {

      const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    const {handleLogin,loding,user}= useAuth()

    if(loding){
        return (
            <h1>Loading...</h1>
        )
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
      await handleLogin(username,password).then(res=>{
             console.log("Login Successfuly",user)
             navigate("/feed")
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
