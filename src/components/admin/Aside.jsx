import { FaChartLine, FaFlag, FaMailBulk, FaUserPlus } from "react-icons/fa";
import { FaHouseLaptop } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
function Aside() {
  const locations = useLocation();
  const [loading, setIsLoading] = useState(false);

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
  return (
    <>
      <aside className="relative h-screen w-[295px] hidden sm:block shadow-xl bg-[#191970] rounded-r-xl ">
        <div className="p-3 ">
        <img src="/mtefp_logo.jpeg " className='w-10 h-10 rounded-full inline ml-2' alt="" />

          <Link
            to="/admin"
            className="text-white text-xl ml-5 font-semibold  hover:text-gray-300"
          >
         
            e-Parapheur
          </Link>
        </div>
        <nav className="text-white text-normal font-semibold pt-3">
          <Link
            to="/admin"
            className={`flex items-center relative rounded-sm  hover:bg-blue-900  text-white py-4 pl-6 nav-item`}
          >
               {
              locations.pathname === "/admin" ? (
                <span
                  class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
              )
            } <FaChartLine  className="mr-4" />
            Tableau de Bord
          </Link>
          <Link
            to="/admin/userregister"
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`}
          >
            {
              locations.pathname === "/admin/userregister" ? (
                <span
                  class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
              )
            }<FaUserPlus className="mr-4" />
            Ajout Utilisateur
          </Link>
          <Link
            to="/admin/usersList"
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`}
          >
            {
              locations.pathname === "/admin/usersList" ? (
                <span
                  class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
              )
            }<FaUsers className="mr-4" />
            Liste Utilisateurs
          </Link>
          <Link
            to="/admin/sccservdirdg"
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`}
          >
               {
              locations.pathname === "/admin/sccservdirdg" ? (
                <span
                  class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
              )
            } <FaHouseLaptop  className="mr-4" />
            Ajout Dir/Serv
          </Link>
          <Link
            to="/scc"
            className="flex items-center text-white rounded-sm hover:bg-blue-900 py-4 pl-6 nav-item"
          >
            <FaMailBulk  className="mr-4" />
            Visiter Service-CC
          </Link>
        </nav>
        <div className="px-6 my-6 absolute bottom-0">
            <button
            onClick={logout}
              className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
             {loading?(<BeatLoader size={15} color='yellow'/>):'Se Deconnecter'}
             <FaArrowRight   className='ml-[3rem]'/>
            </button>
          </div>
      </aside>
    </>
  );
}

export default Aside;
