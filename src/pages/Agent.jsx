
import React, { useContext, useEffect, useState } from "react";

import Aside from "../components/agent/Aside";
import { Link, Outlet } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { userContext } from "../components/ContextWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Security from "../security/Security";
import axiosRequest from "../axiosClient/axiosClient";
import MatchRoleAgent from "../security/MatchRoleAgent";
import {BeatLoader} from "react-spinners";

function Agent() {

    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const { user, setUser } = useContext(userContext);
    const [dropMenu, setDropMenu] = useState(false)

    const toggleDropMenu = () => {
        setDropMenu(!dropMenu)
    }
    //garantie pour l'information de l'utilisateur
    const getUser = async () => {
      try {
        await axiosRequest
          .get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "http://127.0.0.1:8000/api",
            },
          })
          .then(({ data }) => setUser(data))
          .catch((err) => console.log(""));
      } catch (err) {
        toast.error("Verifiez votre connexion internet")
      }
    };
  
    useEffect(() => {
      getUser();
    }, []);
  
    //devoile et cache le sidebar
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  
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
              .then(() => location.reload())
              .catch((err) => console.log(""));
      }catch(err) {
        toast.error("Verifiez votre connexion internet")
      }
   
    };
  
    useEffect(() => {
      if (user.role !== undefined) {
        toast.success(`Vous etes connecte en tant que ${user?.role}`);
      }
    }, [user.role]);
  return (
    <div className="w-[100%]  min-h-[100vh]">
    <div className="flex min-h-screen md:overflow-y-hidden  bg-gray-100 md:h-screen">
      <Aside
        user={user}
        logout={logout}
        loading={isLoading}
        toggleMenu={toggleMenu}
        menu={showMenu}
      />
      <div className="w-full md:overflow-y-scroll  shadow-xs">
          <div className=" w-[100%] justify-between flex p-3 bg-white mb-5">
              <h2 className="font-semibold hidden md:block text-gray-700">{user?.nom_serv}</h2>
              <BiMenu
                  className="text-gray-900 md:hidden"
                  onClick={toggleMenu}
                  size={20}
                  cursor={"pointer"}
              />
              <h2 className="font-semibold absolute left-[46%]  md:hidden text-gray-700">
                  {user?.nom_serv}
              </h2>
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
              >  <Link to={'/agent/profil'}>
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
          <Security>
              <MatchRoleAgent>
                  <Outlet/>
              </MatchRoleAgent>
          </Security>
      </div>
    </div>
        <ToastContainer/>
    </div>
  )
}

export default Agent