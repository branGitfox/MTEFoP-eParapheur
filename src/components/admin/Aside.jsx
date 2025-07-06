import { FaChartLine, FaFlag, FaMailBulk, FaUserPlus } from "react-icons/fa";
import { FaHouseLaptop, FaMessage } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { RiFileUserLine, RiHomeOfficeLine, RiLineChartLine, RiMailDownloadLine, RiMailOpenLine, RiMailSettingsLine, RiMessage3Line, RiNewspaperLine, RiUser6Line, RiUserAddLine } from "react-icons/ri";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { BiFork, BiGitRepoForked, BiStrikethrough } from "react-icons/bi";
function Aside({setShow, show}) {
  const locations = useLocation();
  const [loading, setIsLoading] = useState(false);
  



  const toggleShow = () => {
    setShow(!show)
  }
  
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
        {/* <div className="p-3 ">
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
                  class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
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
                  class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
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
                  class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
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
                  class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
                )
            } <FaHouseLaptop  className="mr-4" />
            Ajout DG/Dir/Serv
            </Link>
            <Link
            to="/admin/messages"
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`}
          >
          {
              locations.pathname === "/admin/messages" ? (
                <span
                class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
                )
                } <FaMessage  className="mr-4" />
                Messages
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
      {show && (      <aside className="absolute h-screen w-[250px]  shadow-xl bg-[#191970] rounded-r-xl z-50">
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
          className={`flex items-center relative rounded-sm  hover:bg-blue-900  text-white py-4 pl-6 nav-item`} onClick={toggleShow}
          >
               {
                locations.pathname === "/admin" ? (
                <span
                class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
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
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`} onClick={toggleShow}
            >
            {
              locations.pathname === "/admin/userregister" ? (
                <span
                class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
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
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`} onClick={toggleShow}
          >
            {
              locations.pathname === "/admin/usersList" ? (
                <span
                class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
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
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`} onClick={toggleShow}
            >
               {
              locations.pathname === "/admin/sccservdirdg" ? (
                <span
                  class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
                )
            } <FaHouseLaptop  className="mr-4" />
            Ajout DG/Dir/Serv
            </Link>
          <Link
            to="/admin/messages"
            className={`flex relative items-center rounded-sm  text-white hover:bg-blue-900 py-4 pl-6 nav-item`} onClick={toggleShow}
          >
               {
              locations.pathname === "/admin/messages" ? (
                <span
                  class="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                  ></span>
                  ) : (
                    ""
                    )
                    } <FaMessage  className="mr-4" />
            Messages
          </Link>
          <Link
            to="/scc"
            className="flex items-center text-white rounded-sm hover:bg-blue-900 py-4 pl-6 nav-item" onClick={toggleShow}
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
          </div> */}
      <aside className=" hidden  lg:flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-[#191970] border-r rtl:border-r-0 rtl:border-l  animate__animated animate__fadeInLeft ">
              <div className="w-full flex gap-2 items-center">
                    <a href="#">
                      <img className="w-[3rem] h-[3rem] rounded-full" src="/mtefp_logo.jpeg" alt=""/>
                      
                  </a>
                  <h1 className='font-medium  text-gray-100'>e-Parapheur</h1>
                </div>
                
              
                  <div className="flex flex-col justify-between flex-1 mt-6" >
                      <nav className="-mx-3 space-y-3 " >
                          <Link class={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${ location.pathname ==='/admin'?'bg-blue-100 text-gray-600':'text-gray-200'} hover:bg-blue-100  hover:text-gray-700`} to="/admin">
                              <RiLineChartLine size={20}/>
              
                              <span className="mx-2 text-sm font-medium">Tableau de Bord</span>
                          </Link>
              
                          <Link class={`flex items-center px-3 py-2 transition-colors duration-300 transform  ${ location.pathname ==='/admin/userregister'?'bg-blue-100 text-gray-600':'text-gray-200'} rounded-lg hover:bg-blue-100  hover:text-gray-700`} to="/admin/userregister">
                            <RiUserAddLine size={20}/>
              
                              <span className="mx-2 text-sm font-medium">Ajout Utilisateur</span>
                          </Link>    
                          <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/admin/usersList'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/admin/usersList'>
                              <AiOutlineUsergroupDelete  size={20}/>
              
                              <span className="mx-2 text-sm font-medium">Liste Utilisateurs</span>
                          </Link>   
                          <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/admin/sccservdirdg'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/admin/sccservdirdg'>
                              <RiHomeOfficeLine size={20} />
              
                              <span className="mx-2 text-sm font-medium">Ajout Departements</span>
                          </Link>  
                              <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/admin/listDeparts'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/admin/listDeparts'>
                              <BiGitRepoForked size={20} />
              
                              <span className="mx-2 text-sm font-medium">Liste Departements</span>
                          </Link> 
                          <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/admin/messages'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/admin/messages'>
                              <RiMailSettingsLine size={20} />
              
                              <span className="mx-2 text-sm font-medium">Messages Support</span>
                          </Link>  
                          <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/scc'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/scc'>
                              <RiNewspaperLine size={20} />
              
                              <span className="mx-2 text-sm font-medium">Service Central</span>
                          </Link>  
                          
                          {/* {user.role=='admin'?
                           <Link class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-blue-100  hover:text-gray-700" to="/admin">
              
                              <RiShieldKeyholeLine size={20}/>
                              <span class="mx-2 text-sm font-medium">Administrateur</span>
                          </Link>:''} */}
                      </nav>
              
                  </div>
      </aside>

        {show && (<aside
            className="flex z-50 absolute lg:hidden flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-[#191970] border-r rtl:border-r-0 rtl:border-l  animate__animated animate__fadeInLeft ">
            <div className="w-full flex gap-2 items-center">
                <a href="#">
                    <img className="w-[3rem] h-[3rem] rounded-full" src="/mtefp_logo.jpeg" alt=""/>

                </a>
                <h1 className='font-medium  text-gray-100'>e-Parapheur</h1>
            </div>


            <div className="flex flex-col justify-between flex-1 mt-6" onClick={setShow}>
                <nav className="-mx-3 space-y-3 "  >
                    <Link

                        class={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${location.pathname === '/admin' ? 'bg-blue-100 text-gray-600' : 'text-gray-200'} hover:bg-blue-100  hover:text-gray-700`}
                        to="/admin">
                        <RiLineChartLine size={20}/>

                        <span className="mx-2 text-sm font-medium">Tableau de Bord</span>
                    </Link>

                    <Link
                        class={`flex items-center px-3 py-2 transition-colors duration-300 transform  ${location.pathname === '/admin/userregister' ? 'bg-blue-100 text-gray-600' : 'text-gray-200'} rounded-lg hover:bg-blue-100  hover:text-gray-700`}
                        to="/admin/userregister">
                        <RiUserAddLine size={20}/>

                        <span className="mx-2 text-sm font-medium">Ajout Utilisateur</span>
                    </Link>
                    <Link
                        class={`flex items-center px-3 py-2  transition-colors duration-300  ${location.pathname === '/admin/usersList' ? 'bg-blue-100 text-gray-600' : 'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`}
                        to='/admin/usersList'>
                        <AiOutlineUsergroupDelete size={20}/>

                        <span className="mx-2 text-sm font-medium">Liste Utilisateurs</span>
                    </Link>
                    <Link
                        class={`flex items-center px-3 py-2  transition-colors duration-300  ${location.pathname === '/admin/sccservdirdg' ? 'bg-blue-100 text-gray-600' : 'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`}
                        to='/admin/sccservdirdg'>
                        <RiHomeOfficeLine size={20}/>

                        <span className="mx-2 text-sm font-medium">Ajout Departements</span>
                    </Link>
                        <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/admin/messages'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/admin/messages'>
                              <BiGitRepoForked size={20} />
              
                              <span className="mx-2 text-sm font-medium">Messages Support</span>
                          </Link> 
                    <Link
                        class={`flex items-center px-3 py-2  transition-colors duration-300  ${location.pathname === '/admin/messages' ? 'bg-blue-100 text-gray-600' : 'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`}
                        to='/admin/messages'>
                        <RiMailSettingsLine size={20}/>

                        <span className="mx-2 text-sm font-medium">Messages Support</span>
                    </Link>
                    <Link
                        class={`flex items-center px-3 py-2  transition-colors duration-300  ${location.pathname === '/scc' ? 'bg-blue-100 text-gray-600' : 'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`}
                        to='/scc'>
                        <RiNewspaperLine size={20}/>

                        <span className="mx-2 text-sm font-medium">Service Central</span>
                    </Link>

                    {/* {user.role=='admin'?
                           <Link class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-blue-100  hover:text-gray-700" to="/admin">

                              <RiShieldKeyholeLine size={20}/>
                              <span class="mx-2 text-sm font-medium">Administrateur</span>
                          </Link>:''} */}
                </nav>

            </div>
        </aside>)}
    </>
  );
}

export default Aside;
