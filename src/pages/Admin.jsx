import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/admin/Aside";
import Header from "../components/admin/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProtection from "../components/admin/AdminProtection";

function Admin() {
  return (
    <> 
      <div className="bg-gray-100 font-family-karla flex min-h-screen">
        <Aside />
        <div className="w-full flex flex-col h-screen overflow-y-scroll">
          <Header />
          <AdminProtection>
              <Outlet />
          </AdminProtection>
         
        </div>
      </div> 
   
      <ToastContainer />
    </>
  );
}

export default Admin;
