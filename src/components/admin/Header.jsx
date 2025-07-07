import React, { useContext, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

import {BeatLoader} from "react-spinners";
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import { userContext } from '../ContextWrapper'
import { Link } from 'react-router-dom'
function Header({show,setShow}) {
  const {user} = useContext(userContext)
   const [isLoading, setIsLoading] = useState(false);
      // const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
      const [dropMenu, setDropMenu] = useState(false)
  
      const toggleDropMenu = () => {
          setDropMenu(!dropMenu)
      }
  const location = useLocation()
  const toggleMenu = () => {
    setShow(!show)
  }
   //fonction de deconnexion
    const logout = async () => {
      setIsLoading(true);
      try{
        await axios
              .post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                    "Access-Control-Allow-Origin": "http://127.0.0.1:8000/api",
                  },
                }
              )
              .then(({ data }) => console.log(data.message))
              .then(() => localStorage.removeItem("ACCESS_TOKEN"))
              .then(() => setIsLoading(false))
              .then(() => window.location.reload())
              .catch((err) => console.log(""));
      }catch(err) {
        toast.error("Verifiez votre connexion internet")
      }
   
    };
  return (
    <>
    
    <header className="w-full items-center bg-white py-3   px-6 flex ">
            <GiHamburgerMenu  size={25} color='gray' className='mr-5 lg:hidden' onClick={toggleMenu}/>
            <div className="w-1/2 text-gray-900 font-semibold">{location.pathname}</div>
            <div className="relative w-1/2 flex justify-end">
              {/* <Link
                            to="/scc/profil"
                            className="font-semibold text-gray-700 cursor-pointer"
                          >
                          
                           {user.name}     <img className="object-cover w-8 h-8 rounded-full inline" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt=""/>
              
              
                          </Link>
            </div> */}

            <button
                  onClick={toggleDropMenu}
                  data-popover-target="menu"
                  // to="/scc/profil"
                  className="font-semibold text-gray-700 cursor-pointer"
              >

                  {user.name} <img className="object-cover w-8 h-8 rounded-full inline"
                                   src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100"
                                   alt=""/>
                  {/* <button

            class="rounded-md inline bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
            <IoIosArrowDown/>
          </button> */}

              </button>
              {dropMenu && <ul
                  role="menu"
                  data-popover="menu"
                  data-popover-placement="bottom"
                  className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg  focus:outline-none right-4 top-[2.8rem]"
              >  <Link to={'/admin/profil'}>
                  <li
                      role="menuitem"
                      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >

                      Compte
                  </li>
              </Link>

                  <li
                      onClick={logout}
                      role="menuitem"
                      className="cursor-pointer text-gray-500 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-red-500 focus:bg-slate-100 active:bg-slate-100"
                  >
                      {isLoading?(<BeatLoader size={15} color='yellow'/>):'Se Deconnecter'}
                  </li>

              </ul>}
              </div>
         
        </header>
    </>
  )
}

export default Header