import React from 'react'
import  { createContext, useState} from 'react'
export const userContext = createContext({
    user:{},
    setUser:() => null
  })
function ContextWrapper({children}) {
    const [user, setUser] = useState({})
  return (
    <>
    <userContext.Provider value={{user, setUser}}>
        {children}
    </userContext.Provider>
    </>
  )
}

export default ContextWrapper