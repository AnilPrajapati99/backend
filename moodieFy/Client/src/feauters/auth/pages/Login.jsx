import { useState } from 'react'
import "../styles/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/use.auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {loading,user,handleGetme,handleLogin,handleLogout,handleRegister} = useAuth()

  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")



  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({email,password})
    navigate("/player")
  }

  return (
  <main className='Login-Form'>

    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        label="Email" placeholder="Enter your email" />
        <FormGroup
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        label="Password" placeholder="Enter your password" />
    <button className='button' type='submit'>Login</button>
      </form>
      <p>Don't have an account ? <Link to="/register">Register Here</Link></p>
    </div>

  </main>
  )
}

export default Login
