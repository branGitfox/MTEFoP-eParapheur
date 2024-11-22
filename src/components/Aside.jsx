import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
function Aside({menu}) {
    const location = useLocation()
  return (
    <>
            <aside
        class="z-20 hidden w-64 overflow-y-auto bg-[#191970]  md:block flex-shrink-0"
      >
        <div class="py-4 text-white ">
          <a
            class="ml-6 text-lg font-bold text-white "
            href="#"
          >
            MTFoP
          </a>
          <ul class="mt-6">
       
          </ul>
          <ul>
            <li class="relative px-6 py-3 ">
                {
                    location.pathname ==='/scc'?(   <span
                class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
         
              <Link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc'              >
                <svg
                  class="w-5 h-5"
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
                <span class="ml-4">Suivis</span>
              </Link>
            </li>
            <li class="relative px-6 py-3">
            {
                    location.pathname ==='/scc/register'?(   <span
                class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc/register'
              >
                <svg
                  class="w-5 h-5"
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
                <span class="ml-4">Enregistrements</span>
              </Link>
            </li>
            <li class="relative px-6 py-3">
            {
                    location.pathname ==='/scc/stats'?(   <span
                class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc/stats'
              >
                <svg
                  class="w-5 h-5"
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
                <span class="ml-4">Statistiques</span>
              </Link>
            </li>
             </ul>
          <div class="px-6 my-6">
            <button
              class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Se Deconnecter
              <FaArrowRight/>
            </button>
          </div>
        </div>
      </aside>
      {menu &&       <aside
        class="z-20  w-64 overflow-y-auto bg-[#191970]  md:block flex-shrink-0"
      >
        <div class="py-4 text-white ">
          <a
            class="ml-6 text-lg font-bold text-white "
            href="#"
          >
            MTFoP
          </a>
          <ul class="mt-6">
       
          </ul>
          <ul>
            <li class="relative px-6 py-3 ">
                {
                    location.pathname ==='/scc'?(   <span
                class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
         
              <Link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc'              >
                <svg
                  class="w-5 h-5"
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
                <span class="ml-4">Suivis</span>
              </Link>
            </li>
            <li class="relative px-6 py-3">
            {
                    location.pathname ==='/scc/register'?(   <span
                class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc/register'
              >
                <svg
                  class="w-5 h-5"
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
                <span class="ml-4">Enregistrements</span>
              </Link>
            </li>
            <li class="relative px-6 py-3">
            {
                    location.pathname ==='/scc/stats'?(   <span
                class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>):''
                }
              <Link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                to='/scc/stats'
              >
                <svg
                  class="w-5 h-5"
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
                <span class="ml-4">Statistiques</span>
              </Link>
            </li>
             </ul>
          <div class="px-6 my-6">
            <button
              class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Se Deconnecter
              <FaArrowRight/>
            </button>
          </div>
        </div>
      </aside>}

    </>
  )
}

export default Aside