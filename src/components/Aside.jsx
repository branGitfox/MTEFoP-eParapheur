
import { Link, useLocation } from 'react-router-dom'
import { BiAddToQueue } from 'react-icons/bi'

import {FaChartLine } from 'react-icons/fa6'
import {  GoTasklist } from 'react-icons/go'


import {  RiShieldKeyholeLine } from 'react-icons/ri'


function Aside({toggleMenu,menu, user}) {
    const location = useLocation() //hooks pour recuperer le path de la page actuel
  return (
//     <>
//             <aside
//         className="z-20 hidden w-64 overflow-y-auto bg-[#191970] relative  md:block flex-shrink-0 rounded-r-xl shadow-xl"
//       >
//         <div className="py-4 text-white">
//           <img src="/mtefp_logo.jpeg " className='w-10 h-10 rounded-full inline ml-5' alt="" />
//           <a
//             className="ml-6 text-lg font-bold text-white "
//             href="#"
//           >
//             e-Parapheur
//           </a>
//           <ul className="mt-6">
       
//           </ul>
//           <ul>
//             <li className="relative px-6 py-3 ">
//                 {
//                     location.pathname ==='/scc'?(   <span
//                 className="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
//                 aria-hidden="true"
//               ></span>):''
//                 }
         
//               <Link
//                 className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
        
//               to='/scc'              >
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   fill="none"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
//                   ></path>
//                 </svg>
//                 <span className="ml-4">Suivis</span>
//               </Link>
//             </li>
//             <li className="relative px-6 py-3">
//             {
//                     location.pathname ==='/scc/register'?(   <span
//                 className="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
//                 aria-hidden="true"
//               ></span>):''
//                 }
//               <Link
             
//                 className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
//                 to='/scc/register'
//               >
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   fill="none"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                   ></path>
//                 </svg>
//                 <span className="ml-4">Enregistrements</span>
//               </Link>
//             </li>
//             <li className="relative px-6 py-3">
//             {
//                     location.pathname ==='/scc/stats'?(   <span
//                 className="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
//                 aria-hidden="true"
//               ></span>):''
//                 }
//               <Link
//                 className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
//                 to='/scc/stats'
            

//               >
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   fill="none"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
//                   ></path>
//                   <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
//                 </svg>
//                 <span className="ml-4">Statistiques</span>
//               </Link>
//             </li>
//             {user.role=='admin'? (            <li className="relative px-6 py-3">

//               <Link
//                 className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
//                 to='/admin'
//               >
//                 <FaUnlockKeyhole/>
//                 <span className="ml-4">Administrateur</span>
//               </Link>
//             </li>):''}
//              </ul>
//           <div className="px-6 my-6 absolute bottom-0">
//             <button
//             onClick={logout}
//               className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
//             >
//              {loading?(<BeatLoader size={15} color='yellow'/>):'Se Deconnecter'}
//               <FaArrowRight className='ml-[4rem]'/>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Side bar  pour mobile */}
      
//       {menu &&       <aside
//         className="z-20  w-64 overflow-y-auto absolute h-screen bg-[#191970]  md:block flex-shrink-0 rounded-r-xl"
//       >

//         <div className="py-4 text-white relative">
//         <BiX className="text-gray-200 md:hidden z-50 absolute right-2" onClick={toggleMenu} size={20} cursor={'pointer'}/>
//         <img src="/mtefp_logo.jpeg " className='w-10 h-10 rounded-full inline ml-5' alt="" />

//           <a
//             className="ml-6 text-lg font-bold text-white "
//             href="#"
//           >
//             e-Parapheur
//           </a>
//           <ul className="mt-6">
       
//           </ul>
//           <ul>
//             <li className="relative px-6 py-3 ">
//                 {
//                     location.pathname ==='/scc'?(   <span
//                 className="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
//                 aria-hidden="true"
//               ></span>):''
//                 }
         
//               <Link
//               onClick={toggleMenu}

//                 className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
//                 to='/scc'              >
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   fill="none"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
//                   ></path>
//                 </svg>
//                 <span className="ml-4">Suivis</span>
//               </Link>
//             </li>
//             <li className="relative px-6 py-3">
//             {
//                     location.pathname ==='/scc/register'?(   <span
//                 className="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
//                 aria-hidden="true"
//               ></span>):''
//                 }
//               <Link
//               onClick={toggleMenu}

//                 className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
//                 to='/scc/register'
//               >
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   fill="none"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                   ></path>
//                 </svg>
//                 <span className="ml-4">Enregistrements</span>
//               </Link>
//             </li>
//             <li className="relative px-6 py-3">
//             {
//                     location.pathname ==='/scc/stats'?(   <span
//                 className="absolute inset-y-0 left-0 w-2 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
//                 aria-hidden="true"
//               ></span>):''
//                 }
//               <Link
//               onClick={toggleMenu}

//                 className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
//                 to='/scc/stats'
//               >
//                 <svg
//                   className="w-5 h-5"
//                   aria-hidden="true"
//                   fill="none"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
//                   ></path>
//                   <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
//                 </svg>
//                 <span className="ml-4">Statistiques</span>
//               </Link>
//             </li>
//             {user.role=='admin'? (            <li className="relative px-6 py-3">

// <Link
//   className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
//   to='/admin'
// >
//   <FaUnlockKeyhole/>
//   <span className="ml-4">Administrateur</span>
// </Link>
// </li>):''}
//              </ul>
//         </div>
//           <div className="px-6 my-6 absolute bottom-0">
//             <button
//             onClick={logout}
//               className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
//             >
//              {loading?(<BeatLoader size={15} color='yellow'/>):'Se Deconnecter'}
//              <FaArrowRight   className='ml-[4rem]'/>
//             </button>
//           </div>
//       </aside>}

//     </>
<>


<aside className="flex flex-col  hidden lg:block   w-64 h-screen px-5 py-8 overflow-y-auto bg-[#191970] border-r rtl:border-r-0 rtl:border-l  animate__animated animate__fadeInLeft">
  <div className="w-full flex gap-2 items-center">
      <a href="#">
        <img className="w-[3rem] h-[3rem] rounded-full" src="/mtefp_logo.jpeg" alt=""/>

    </a>
    <h1 className='font-medium  text-gray-100'>e-Parapheur</h1>
  </div>


    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-3 ">
            <Link class={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${ location.pathname ==='/scc'?'bg-blue-100 text-gray-600':'text-gray-200'} hover:bg-blue-100  hover:text-gray-700`} to="/scc">
                <GoTasklist size={20}/>

                <span className="mx-2 text-sm font-medium">Suivis</span>
            </Link>

            <Link class={`flex items-center px-3 py-2 transition-colors duration-300 transform  ${ location.pathname ==='/scc/register'?'bg-blue-100 text-gray-600':'text-gray-200'} rounded-lg hover:bg-blue-100  hover:text-gray-700`} to="/scc/register">
              <BiAddToQueue size={20}/>

                <span className="mx-2 text-sm font-medium">Enregistrement</span>
            </Link>    <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/scc/stats'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/scc/stats'>
                <FaChartLine/>

                <span className="mx-2 text-sm font-medium">Reporting</span>
            </Link>
            {user.role=='admin'?
             <Link class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-blue-100  hover:text-gray-700" to="/admin">

                <RiShieldKeyholeLine size={20}/>
                <span className="mx-2 text-sm font-medium">Administrateur</span>
            </Link>:''}
        </nav>

    </div>
</aside>
    {menu && (
        <aside className="flex flex-col absolute lg:hidden z-50 w-64 h-screen px-5 py-8 overflow-y-auto bg-[#191970] border-r rtl:border-r-0 rtl:border-l  animate__animated animate__fadeInLeft">
            <div className="w-full flex gap-2 items-center">
                <a href="#">
                    <img className="w-[3rem] h-[3rem] rounded-full" src="/mtefp_logo.jpeg" alt=""/>

                </a>
                <h1 className='font-medium  text-gray-100'>e-Parapheur</h1>
            </div>


            <div onClick={toggleMenu} className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-3 ">
                    <Link class={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${ location.pathname ==='/scc'?'bg-blue-100 text-gray-600':'text-gray-200'} hover:bg-blue-100  hover:text-gray-700`} to="/scc">
                        <GoTasklist size={20}/>

                        <span className="mx-2 text-sm font-medium">Suivis</span>
                    </Link>

                    <Link class={`flex items-center px-3 py-2 transition-colors duration-300 transform  ${ location.pathname ==='/scc/register'?'bg-blue-100 text-gray-600':'text-gray-200'} rounded-lg hover:bg-blue-100  hover:text-gray-700`} to="/scc/register">
                        <BiAddToQueue size={20}/>

                        <span className="mx-2 text-sm font-medium">Enregistrement</span>
                    </Link>    <Link class={`flex items-center px-3 py-2  transition-colors duration-300  ${ location.pathname ==='/scc/stats'?'bg-blue-100 text-gray-600':'text-gray-200'} transform rounded-lg hover:bg-blue-100  hover:text-gray-700`} to='/scc/stats'>
                    <FaChartLine/>

                    <span className="mx-2 text-sm font-medium">Reporting</span>
                </Link>
                    {user.role=='admin'?
                        <Link class="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-blue-100  hover:text-gray-700" to="/admin">

                            <RiShieldKeyholeLine size={20}/>
                            <span className="mx-2 text-sm font-medium">Administrateur</span>
                        </Link>:''}
                </nav>

            </div>
        </aside>
    )}

</>
  )
}

export default Aside