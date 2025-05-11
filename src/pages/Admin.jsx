import  { useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/admin/Aside";
import Header from "../components/admin/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProtection from "../components/admin/AdminProtection";


function Admin() {
  const [show, setShow] = useState(false)
const toggleShow = () => {
    setShow(!show)
}

    return (
    <> 
      <div className="bg-gray-100 font-family-karla flex min-h-screen">
        <Aside show={show} setShow={toggleShow}/>
        <div className="w-full flex flex-col h-screen overflow-y-scroll">
          <Header show={show} setShow={setShow}/>
          {/* protection de la page administrateur */}
          <AdminProtection>
              <Outlet/>
          </AdminProtection>
         
         
        </div>
      </div> 
   
      <ToastContainer />
    </>
  );
}

export default Admin;
