import React from 'react'
import  { createContext, useState} from 'react'
export const userContext = createContext({
    user:{},
    setUser:() => null,
    token:'',
    setToken:() => null
  })
function ContextWrapper({children}) {
    const [user, setUser] = useState({})
    const [token, setToken] = useState({})
  return (
    <>
    <userContext.Provider value={{user, setUser, token, setToken}}>
        {children}
    </userContext.Provider>
    </>
  )
}

export default ContextWrapper