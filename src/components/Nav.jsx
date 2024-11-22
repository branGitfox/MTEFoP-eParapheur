import React, { useState } from 'react'
import { BiX } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function Nav() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu= () => {
    setShowMenu(!showMenu)
  }
  return (
    <>
    

    <nav id="header" class="fixed w-full z-30 top-0 text-white ">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
      <div class="pl-4 flex items-center">
        <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
      
          <img src="/mtefp_logo.jpeg" className='w-[50px] rounded-full mr-3 h-[50px] inline
          ' alt="logo de MTEFoP" />
          MTEFoP
        </a>
      </div>
      <div class="block lg:hidden pr-4">
        {showMenu===false?    <button id="nav-toggle" onClick={toggleMenu} class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>:    <button id="nav-toggle" onClick={toggleMenu} class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <BiX size={30}/>
        </button>}
      </div>
      <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <a class="inline-block py-2 px-4 text-gray-100 font-bold no-underline" href="#">Accueil</a>
          </li>
          <li class="mr-3">
            <a class="inline-block text-gray-100 no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#infos">Infos</a>
          </li>
          <li class="mr-3">
            <a class="inline-block text-gray-100 no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#contact">Contact</a>
          </li>
        </ul>
        <Link
          id="navAction"
          to={'/scc'}
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Mon Dossier
        </Link>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
  {showMenu &&       <div className="absolute top-[4.2rem] z-20 bg-blue-900 w-full flex flex-col items-center justify-center p-3 gap-1">
      <li class="list-none">
            <a class="inline-block py-2 px-4 text-gray-100 font-bold no-underline" href="#">Accueil</a>
          </li>

          <li class="list-none">
            <a class="inline-block  no-underline text-gray-100 hover:text-gray-800 hover:text-underline py-2 px-4" href="#">Infos</a>
          </li>
          <li class="list-none">
            <a class="inline-block text-gray-100 no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">Contact</a>
          </li>
          <Link
          id="navAction"
          to={'/scc'}
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Mon Dossier
        </Link>
      </div>}

  </>
  )
}

export default Nav