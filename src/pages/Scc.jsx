import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Aside from "../components/Aside";
import { Link, Outlet } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { userContext } from "../components/ContextWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Security from "../security/Security";
import axiosRequest from "../axiosClient/axiosClient";
import MatchRoleSCC from "../security/MatchRoleSCC";

function Scc() {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const { user, setUser } = useContext(userContext);

  //garantie pour l'information de l'utilisateur en cas d'actualisation
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
      console.log(err);
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
      .catch((err) => toast.error(err.message))
    }catch(err){
      toast.error("Verifiez connexion internet")
      }
;
  };

  useEffect(() => {
    if (user.role !== undefined) {
      toast.success(`Vous connecte etes en tant que ${user?.role}`);
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
          <div className=" w-[100%] justify-between flex p-3 bg-white mb-5 items-center">
            <h2 className="font-semibold hidden md:block text-gray-700">{user.role=='scc'?'SCC':user.nom_serv}</h2>
            <BiMenu
              className="text-gray-900 md:hidden"
              onClick={toggleMenu}
              size={20}
              cursor={"pointer"}
            />
            <h2 className="font-semibold absolute left-[46%]  md:hidden text-gray-700">
              SCC
            </h2>
            <Link
              to="/scc/profil"
              className="font-semibold text-gray-700 cursor-pointer"
            >
            
             {user.name}     <img class="object-cover w-8 h-8 rounded-full inline" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt=""/>


            </Link>

          </div>
          <Security>
            <MatchRoleSCC>
              <Outlet />
            </MatchRoleSCC>
          </Security>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Scc;
