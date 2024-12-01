import { FaChartLine, FaFlag, FaMailBulk, FaUserPlus } from "react-icons/fa";
import { FaHouseLaptop, FaUnlockKeyhole } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
function Aside() {
  const location = useLocation();
  return (
    <>
      <aside className="relative bg-sidebar h-screen w-[19.7rem] hidden sm:block shadow-xl bg-[#191970]">
        <div className="p-6 ">
          <Link
            to="/admin"
            className="text-white text-xl font-semibold uppercase hover:text-gray-300"
          >
            <FaUnlockKeyhole className="inline mr-3 mb-2" />
            Admin
          </Link>
        </div>
        <nav className="text-white text-normal font-semibold pt-3">
          <Link
            to="index.html"
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
            } <FaChartLine size={20} className="mr-3" />
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
            }<FaUserPlus size={20} className="mr-3" />
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
            } <FaHouseLaptop size={20} className="mr-3" />
            Ajout Dir/Serv
          </Link>
          <Link
            to="/scc"
            className="flex items-center text-white rounded-sm hover:bg-blue-900 py-4 pl-6 nav-item"
          >
            <FaMailBulk size={20} className="mr-3" />
            Visiter Service-CC
          </Link>
        </nav>
        <h2 className="absolute w-full font-bold    bottom-10  text-white flex items-center justify-center py-4">
          <FaFlag className="mr-3" />
          E-parapheur
        </h2>
      </aside>
    </>
  );
}

export default Aside;
