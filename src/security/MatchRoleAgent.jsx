import React, { useEffect, useContext } from 'react'
import { userContext } from '../components/ContextWrapper'
import { useLocation, useNavigate } from 'react-router-dom'

function MatchRoleAgent({children}) {
    const {user} = useContext(userContext)
    const navigate = useNavigate()
    
    //protection parole
    useEffect(() => {
        if(user.role !== 'agent'){
            navigate('/login')
        }
    }, [])
  return (
    <>
        {children}
    </> 
  )
}

export default MatchRoleAgent