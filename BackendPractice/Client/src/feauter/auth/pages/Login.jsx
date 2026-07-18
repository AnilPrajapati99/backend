import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const {handleLogin} = useAuth()
    const navigate = useNavigate()
    console.log(email)

    const handleSubmit =  async (e)=>{
        e.preventDefault()
        const rejult = await handleLogin({email,password})
        if(rejult){
          navigate("/")
        }
        console.log("Done")
        setemail("")
    }

  return (
    <div>
        <h1>Login</h1>
       <form onSubmit={handleSubmit}>
        <input
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        type="text" placeholder='Enter Your Email'/> <br />
        <input
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
        type="text" placeholder='Enter Your PassWord'/> <br />
        <button type='submit'>Login</button> <br />
       </form>
    </div>
  )
}

export default Login
