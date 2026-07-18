import React from 'react'
import { useSelector } from 'react-redux'


const Home = () => {
    const {user,loading} = useSelector(state=>state.auth)
    const {name,email,age,add}=user.data
  return (
    <div>
      <h1>hey {name}</h1>
      <p>{age}</p>
      <p>{email}</p>
      <p>{add}</p>
    </div>
  )
}

export default Home
