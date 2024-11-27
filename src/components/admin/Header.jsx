import React from 'react'
import { FaUser } from 'react-icons/fa'

function Header() {
  return (
    <>
    
    <header className="w-full items-center bg-white py-1 px-6 hidden sm:flex">
            <div className="w-1/2 text-gray-900 font-semibold">Admin</div>
            <div x className="relative w-1/2 flex justify-end">
                <button  className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-200 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                    <FaUser className='text-blue-900 w-full h-auto'/>
                </button>
            </div>
        </header>
    </>
  )
}

export default Header