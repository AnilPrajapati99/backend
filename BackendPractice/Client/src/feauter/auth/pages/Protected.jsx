import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'

const Protected = ({children}) => {
    const {user,loading} = useSelector(state=>state.auth)
    console.log(user)
    const navigate = useNavigate()
console.log(loading)
    if(loading){
        return <h1>Loading...</h1>
    }

        if(!user){
          return <Navigate to="/login" replace />
        }
  return children
}

export default Protected
