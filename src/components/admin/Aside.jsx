import { FaChartLine, FaFlag, FaMailBulk, FaUserPlus } from "react-icons/fa";
import { FaHouseLaptop } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
function Aside() {
  const location = useLocation();
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
              location.pathname === "/admin" ? (
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
              location.pathname === "/admin/userregister" ? (
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
            to="/admin/sccservdirdg"
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`}
          >
               {
              location.pathname === "/admin/sccservdirdg" ? (
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
        <h2 className="absolute w-full font-bold    bottom-10  text-white flex items-center justify-center py-4">
          <FaFlag className="mr-4" />
          E-parapheur
        </h2>
      </aside>
    </>
  );
}

export default Aside;
