import React, { useContext, useEffect } from 'react'
import { userContext } from '../ContextWrapper'
import { useNavigate} from 'react-router-dom'
/**
 *Protection de la page admin
 *
 * @return {*} 
 */
function AdminProtection({children}) {
    const {user} = useContext(userContext) //recuperer l'utilisateur connectee
    console.log(user);
    
    const navigation = useNavigate()
    useEffect(() => {
        if(user.role !== 'admin') { navigation('/login')} //si le role de l'utilisateur courrrant n'est pas admin il redirigee vers la page dediee
    }, [user])
  return (
    <>
        {children}
    </>
  )
}

export default AdminProtection