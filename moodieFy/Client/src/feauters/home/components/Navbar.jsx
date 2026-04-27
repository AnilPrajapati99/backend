import React from 'react'
import "../components/styles/home.scss"
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/use.auth'

const Navbar = () => {

  const {user,handleLogout} = useAuth()
  console.log(user)

  return (
    <div className='navbar-container'>
        <Link to={"/"}><h1><span>Mood</span>Beats</h1></Link>
        <div>
            <Link to={"/"}>Home</Link>
            <Link to={"/player"}>Player</Link>
        </div>
        <div className='login-div'>
          { user ? ( 
           <>
            <div className='profile'>
              <h3>{user.username[0].toUpperCase()}</h3>
            </div>
          <div className="logout">
          <div>
            <p>{user?.username}</p>
          <p>{user?.email}</p>
          </div>
          <button onClick={handleLogout} className='button'>Logout</button>
        </div>
           </>
           ) : (
            <div className="login">
              <Link to={"/login"}>Login</Link>
            </div>
           )}
        </div>
    </div>
  )
}

export default Navbar
