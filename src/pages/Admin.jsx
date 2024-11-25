import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/admin/Aside";
import Header from "../components/admin/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  return (
    <>
      <div className="bg-gray-100 font-family-karla flex min-h-screen">
        <Aside />
        <div className="w-full flex flex-col h-screen overflow-y-scroll">
          <Header />
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Admin;
