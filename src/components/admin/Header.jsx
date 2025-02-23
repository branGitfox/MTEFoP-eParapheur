import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
function Header() {

  const location = useLocation()
  return (
    <>
    
    <header className="w-full items-center bg-white py-1 px-6 flex">
            <div className="w-1/2 text-gray-900 font-semibold">{location.pathname}</div>
            <div className="relative w-1/2 flex justify-end">
                <button  className="realtive z-10 w-10 h-10 rounded-full overflow-hidden border-4 border-gray-200 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                    <FaUser className='text-blue-900 w-full h-auto'/>
                </button>
            </div>
        </header>
    </>
  )
}

export default Header