import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'


const Register = () => {
    const {handleRegister,loding,user} = useAuth()

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    console.log(user)

    if(loding){
        return <main>Loading...</main>
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
       await handleRegister(username,email,password)
        console.log("Register Successfuly",user)
       navigate("/")
    }

    // useEffect(()=>{
    //     console.log("Register Successfuly",user)
    // },[user])

  return (
    <main>
            <div className="form-container">
                <h1>Register Form</h1>
                <form onSubmit={handleFormSubmit}>
                    <input required
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type="text" name='username' placeholder='Enter Username' />
                    <input required
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
