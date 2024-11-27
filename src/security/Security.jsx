
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, } from 'react';
function Security({children}) {
const navigation = useNavigate()
const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))

//securisation
const protect = () => {
  if(localStorage.getItem('ACCESS_TOKEN') == null){  
    navigation('/login')
  }
}

useEffect(() => {
  protect()
}, [token])
  return (
    <>
    {children}
    </>
  )
}

export default Security