import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiTransferAlt, BiX } from 'react-icons/bi'
import { BeatLoader } from 'react-spinners'
import { FaArrowRight } from 'react-icons/fa'
import {FaUnlockKeyhole } from 'react-icons/fa6'



function Aside({toggleMenu,menu, logout, loading, user}) {
    const location = useLocation() //hooks pour recuperer le path de la page actuel
  return (
    <>
            <aside
        className="z-20 hidden w-64 overflow-y-auto bg-[#191970] relative  md:block flex-shrink-0 rounded-r-xl shadow-xl"
      >
        <div className="py-4 text-white">
          <img src="/mtefp_logo.jpeg " className='w-10 h-10 rounded-full inline ml-5' alt="" />
          <a
            className="ml-6 text-lg font-bold text-white "
            href="#"
          >
            e-Parapheur
          </a>
          <ul className="mt-6">
       
          </ul>
          <ul>
            <li className="relative px-6 py-3 ">
                {
                    location.pathname ==='/sp'?(   <span
                className="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
         
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
        
              to='/sp'              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
                <span className="ml-4">Liste de Courriers</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
            {
                    location.pathname ==='/sp/ListTrans'?(   <span
                className="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
             
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/sp/ListTrans'
              >
                <BiTransferAlt size={20}/>
                <span className="ml-4">Liste de Transferts</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
            {
                    location.pathname ==='/sp/ListTraite'?(   <span
                className="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
             
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/sp/ListTraite'
              >
                <BiTransferAlt size={20}/>
                <span className="ml-4">Liste Traite</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
            {
                    location.pathname ==='/sp/stats'?(   <span
                className="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/sp/stats'
            

              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  ></path>
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                <span className="ml-4">Statistiques</span>
              </Link>
            </li>
            {user.role=='admin'? (            <li className="relative px-6 py-3">

              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/admin'
              >
                <FaUnlockKeyhole/>
                <span className="ml-4">Administrateur</span>
              </Link>
            </li>):''}
             </ul>
          <div className="px-6 my-6 absolute bottom-0">
            <button
            onClick={logout}
              className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
             {loading?(<BeatLoader size={15} color='yellow'/>):'Se Deconnecter'}
              <FaArrowRight className='ml-[4rem]'/>
            </button>
          </div>
        </div>
      </aside>

      {/* Side bar  pour mobile */}
      {menu &&       <aside
        className="z-20  w-64 overflow-y-auto absolute h-screen bg-[#191970]  md:block flex-shrink-0 rounded-r-xl"
      >

        <div className="py-4 text-white relative">
        <BiX className="text-gray-200 md:hidden z-50 absolute right-2" onClick={toggleMenu} size={20} cursor={'pointer'}/>
        <img src="/mtefp_logo.jpeg " className='w-10 h-10 rounded-full inline ml-5' alt="" />

          <a
            className="ml-6 text-lg font-bold text-white "
            href="#"
          >
            e-Parapheur
          </a>
          <ul className="mt-6">
       
          </ul>
          <ul>
            <li className="relative px-6 py-3 ">
                {
                    location.pathname ==='/scc'?(   <span
                className="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
         
              <Link
              onClick={toggleMenu}

                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc'              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
                <span className="ml-4">Courriers</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
            {
                    location.pathname ==='/scc/register'?(   <span
                className="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
              onClick={toggleMenu}

                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc/register'
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <span className="ml-4">Enregistrements</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
            {
                    location.pathname ==='/scc/stats'?(   <span
                className="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
              onClick={toggleMenu}

                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc/stats'
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  ></path>
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                <span className="ml-4">Statistiques</span>
              </Link>
            </li>
             </ul>
        </div>
          <div className="px-6 my-6 absolute bottom-0">
            <button
            onClick={logout}
              className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
             {loading?(<BeatLoader size={15} color='yellow'/>):'Se Deconnecter'}
             <FaArrowRight   className='ml-[4rem]'/>
            </button>
          </div>
      </aside>}

    </>
  )
}

export default Aside