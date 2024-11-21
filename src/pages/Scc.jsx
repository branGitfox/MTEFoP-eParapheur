import React, { useState } from "react";
import { FaCheckCircle, FaInfoCircle, FaSearch, FaUser } from "react-icons/fa";
import Aside from "../components/Aside";
import { Outlet } from "react-router-dom";
function Scc() {
 

  return (
    <div className="w-[100%] min-h-[100vh] bg-gray-50">
      <div class="flex min-h-screen bg-gray-100 ">
        <Aside />
        <div class="w-full md:overflow-hidden shadow-xs">
          <div className=" w-[100%] justify-between flex p-3 bg-gray-50 mb-5">
            <h2 className="font-semibold text-black">
              SCC
            </h2>
            <h3 className="font-semibold text-black">
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
