import React, { useEffect, useContext } from 'react'
import { userContext } from '../components/ContextWrapper'
import { useLocation, useNavigate } from 'react-router-dom'

function MatchRoleSCC({children}) {
    const {user} = useContext(userContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(user.role !== 'scc'){
            navigate('/login')
        }
    }, [])
  return (
    <>
        {children}
    </> 
  )
}

export default MatchRoleSCC