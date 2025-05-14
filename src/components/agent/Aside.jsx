
import { Link, useLocation } from 'react-router-dom'
import {BiTask, BiTransfer} from 'react-icons/bi'

import {SiTransifex} from "react-icons/si";
import {CgChart} from "react-icons/cg";



function Aside({toggleMenu,menu, logout, loading, user}) {
    const location = useLocation() //hooks pour recuperer le path de la page actuel
  return (
    <>
      <aside className="lg:flex hidden flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-[#191970] border-r rtl:border-r-0 rtl:border-l  animate__animated animate__fadeInLeft">
        <div className="w-full flex gap-2 items-center">
          <a href="#">
            <img className="w-[3rem] h-[3rem] rounded-full" src="/mtefp_logo.jpeg" alt=""/>

          </a>
          <h1 className='font-medium  text-gray-100'>e-Parapheur</h1>
        </div>


        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-3 ">
            <Link className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${location.pathname ==='/agent'?'bg-blue-100 text-gray-600':'text-gray-200'} hover:bg-blue-100  hover:text-gray-700`} to="/agent">
              <BiTask size={20}/>

              <span className="mx-2 text-sm font-medium">Liste Courriers</span>
            </Link>

            <Link className={`flex items-center px-3 py-2 transition-colors duration-300 transform  ${location.pathname ==='/agent/listTrans'?'bg-blue-100 text-gray-600':'text-gray-200'} rounded-lg hover:bg-blue-100  hover:text-gray-700`} to="/agent/listTrans">
              <BiTransfer size={20}/>

              <span className="mx-2 text-sm font-medium">Liste Transferts</span>
            </Link>
            {/* {user.role=='admin'?
                   <Link class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-blue-100  hover:text-gray-700" to="/admin">

                      <RiShieldKeyholeLine size={20}/>
                      <span class="mx-2 text-sm font-medium">Administrateur</span>
                  </Link>:''} */}
          </nav>

        </div>
      </aside>

      {menu && <aside className="flex absolute z-50 flex-col lg:hidden w-64 h-screen px-5 py-8 overflow-y-auto bg-[#191970] border-r rtl:border-r-0 rtl:border-l  animate__animated animate__fadeInLeft">
        <div className="w-full flex gap-2 items-center">
          <a href="#">
            <img className="w-[3rem] h-[3rem] rounded-full" src="/mtefp_logo.jpeg" alt=""/>

          </a>
          <h1 className='font-medium  text-gray-100'>e-Parapheur</h1>
        </div>


        <div className="flex  flex-col justify-between flex-1 mt-6" onClick={toggleMenu}>
          <nav className="-mx-3 space-y-3 ">
            <Link className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${location.pathname ==='/sp'?'bg-blue-100 text-gray-600':'text-gray-200'} hover:bg-blue-100  hover:text-gray-700`} to="/sp">
              <BiTask size={20}/>

              <span className="mx-2 text-sm font-medium">Courriers</span>
            </Link>

            <Link className={`flex items-center px-3 py-2 transition-colors duration-300 transform  ${location.pathname ==='/sp/listTrans'?'bg-blue-100 text-gray-600':'text-gray-200'} rounded-lg hover:bg-blue-100  hover:text-gray-700`} to="/sp/listTrans">
              <BiTransfer size={20}/>

              <span className="mx-2 text-sm font-medium">Transferts</span>
            </Link>    <Link className={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/sp/listTraite'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/sp/listTraite'>
            <SiTransifex size={20}/>

            <span className="mx-2 text-sm font-medium">Acheminements</span>
          </Link>
            <Link className={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/sp/stats'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/sp/stats'>
              <CgChart size={20}/>

              <span className="mx-2 text-sm font-medium">Reporting</span>
            </Link>
            {/* {user.role=='admin'?
                   <Link class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-blue-100  hover:text-gray-700" to="/admin">

                      <RiShieldKeyholeLine size={20}/>
                      <span class="mx-2 text-sm font-medium">Administrateur</span>
                  </Link>:''} */}
          </nav>

        </div>
      </aside>}

    </>
  )
}

export default Aside