
import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
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

function Agent() {

    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const { user, setUser } = useContext(userContext);
  
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
        .catch((err) => toast.error(err.message));
    };
  
    useEffect(() => {
      if (user.role !== undefined) {
        toast.success(`Vous connecte en tant que ${user?.role}`);
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
          <h2 className="font-semibold hidden md:block text-gray-700">{user.nom_serv}</h2>
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
            {user.name} <FaUser className="inline ml-2" />
          </Link>
        </div>
        <Security>
          <MatchRoleAgent>
            <Outlet />
          </MatchRoleAgent>
        </Security>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default Agent