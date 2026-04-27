import React from 'react'
import { useState } from 'react'
import "../styles/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/use.auth'
import { AuthContext } from '../Auth.context'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const {handleRegister} = useAuth()

  const [username, setUsername] = useState("")
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate("/player")
    // await handleRegister({username,email,password})
  }
  


  return (
     <main className='Login-Form'>

    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup 
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        label="Username" placeholder="Enter Username"/>
        <FormGroup
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        label="Email" placeholder="Enter your email" />
        <FormGroup 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        label="Password" placeholder="Enter your password" />
    <button className='button' type='submit'>Register</button>
      </form>
      <p>Already have a account ? <Link to="/login">Login Here</Link></p>
    </div>

  </main>
  )
}

export default Register
