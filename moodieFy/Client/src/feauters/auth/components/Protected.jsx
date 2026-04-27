import React from 'react'
import { useAuth } from '../hooks/use.auth'
import { Navigate, useNavigate } from 'react-router-dom'
import MainHome from '../../home/pages/MainHome'

const Protected = ({children}) => {
    const {user,loading} = useAuth()
    const navigate = useNavigate()


       if(loading){
        return <MainHome/>
    }


    if(!user){
       return  <Navigate to="/login"/>
    }

 

  return children
}

export default Protected
