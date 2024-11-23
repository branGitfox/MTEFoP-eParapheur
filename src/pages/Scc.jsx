import React, { useState } from "react";
import {  FaUser,  } from "react-icons/fa";
import Aside from "../components/Aside";
import { Outlet } from "react-router-dom";
import { BiMenu} from "react-icons/bi";
function Scc() {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
      setShowMenu(!showMenu)
    }

  return (
    <div className="w-[100%]  min-h-[100vh]">
      <div class="flex min-h-screen md:overflow-y-hidden  bg-gray-100 md:h-screen">
        <Aside toggleMenu={toggleMenu} menu={showMenu}/>
        <div class="w-full md:overflow-hidden shadow-xs">
          <div className=" w-[100%] justify-between flex p-3 bg-gray-50 mb-5">
            <h2 className="font-semibold hidden md:block text-gray-700">
              SCC
            </h2>
            <BiMenu className="text-gray-900 md:hidden" onClick={toggleMenu} size={20} cursor={'pointer'}/>
            <h2 className="font-semibold absolute left-[46%]  md:hidden text-gray-700">
              SCC
            </h2>
            <h3 className="font-semibold text-gray-700 cursor-pointer" >
              Utilisateurs <FaUser className="inline ml-2" />
            </h3>
          </div>
          <Outlet/>
        </div>
              </div>
    </div>
  );
}

export default Scc;
