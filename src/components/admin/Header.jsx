import React, { useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useLocation } from 'react-router-dom'
import { userContext } from '../ContextWrapper'
import { Link } from 'react-router-dom'
function Header({show,setShow}) {
  const {user} = useContext(userContext)
  const location = useLocation()
  const toggleMenu = () => {
    setShow(!show)
  }
  return (
    <>
    
    <header className="w-full items-center bg-white py-3   px-6 flex ">
            <GiHamburgerMenu  size={25} color='gray' className='mr-5 lg:hidden' onClick={toggleMenu}/>
            <div className="w-1/2 text-gray-900 font-semibold">{location.pathname}</div>
            <div className="relative w-1/2 flex justify-end">
              <Link
                            to="/scc/profil"
                            className="font-semibold text-gray-700 cursor-pointer"
                          >
                          
                           {user.name}     <img className="object-cover w-8 h-8 rounded-full inline" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt=""/>
              
              
                          </Link>
            </div>
        </header>
    </>
  )
}

export default Header