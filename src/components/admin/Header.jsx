import React from 'react'

function Header() {
  return (
    <>
    
    <header className="w-full items-center bg-white py-1 px-6 hidden sm:flex">
            <div className="w-1/2"></div>
            <div x-data="{ isOpen: false }" className="relative w-1/2 flex justify-end">
                <button  className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                    <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"/>
                </button>
                
            </div>
        </header>
    </>
  )
}

export default Header