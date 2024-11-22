import React, { useState } from "react";
import {  FaHamburger, FaUser } from "react-icons/fa";
import Aside from "../components/Aside";
import { Outlet } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
function Scc() {
 

  return (
    <div className="w-[100%]  min-h-[100vh]">
      <div class="flex min-h-screen md:overflow-y-hidden  bg-gray-100 md:h-screen">
        <Aside />
        <div class="w-full md:overflow-hidden shadow-xs">
          <div className=" w-[100%] justify-between flex p-3 bg-gray-50 mb-5">
            <h2 className="font-semibold hidden md:block text-gray-700">
              SCC
            </h2>
            <BiMenu className="text-gray-900 md:hidden" size={20} cursor={'pointer'}/>
            <h2 className="font-semibold ml-16 md:hidden text-gray-700">
              SCC
            </h2>
            <h3 className="font-semibold text-gray-700 cursor-pointer" >
              Utilisateur <FaUser className="inline ml-2" />
            </h3>
          </div>
          <Outlet/>
        </div>
              </div>
    </div>
  );
}

export default Scc;
