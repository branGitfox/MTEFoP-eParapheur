
import { FaChartLine, FaFlag, FaMailBulk, FaUserPlus } from 'react-icons/fa'
import {FaHouseLaptop, FaUnlockKeyhole } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'
function Aside() {
    const location = useLocation()
  return (
   <>
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl bg-blue-900">
        <div className="p-6 ">
            <Link href="/admin" className="text-white text-3xl font-semibold uppercase hover:text-gray-300"><FaUnlockKeyhole className='inline mr-3 mb-2'/>Admin</Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
            <Link href="index.html" className={`flex items-center rounded-md ${location.pathname ==='/admin'?'bg-[#C1AB48]':''} hover:bg-[#C1AB48]  text-white py-4 pl-6 nav-item`}>
                <FaChartLine size={20} className='mr-3'/>
                Tableau de Bord
            </Link>
            <Link to='/admin/userregister' className={`flex items-center rounded-md ${location.pathname ==='/admin/userregister'?'bg-[#C1AB48]':''} text-white hover:bg-[#C1AB48] py-4 pl-6 nav-item`}>
               <FaUserPlus size={20} className='mr-3'/>Ajout Utilisateur
            </Link>
            <Link to='/admin/sccservdirdg' className={`flex items-center rounded-md ${location.pathname ==='/admin/sccservdirdg'?'bg-[#C1AB48]':''} text-white hover:bg-[#C1AB48] py-4 pl-6 nav-item`}>
               <FaHouseLaptop size={20} className='mr-3'/>Ajout Dir/Serv
            </Link>
            <Link to="/scc" className="flex items-center text-white rounded-md hover:bg-[#C1AB48] py-4 pl-6 nav-item">
               <FaMailBulk size={20} className='mr-3'/>Visiter Service-CC
            </Link>
        </nav>
        <h2  className="absolute w-full font-bold    bottom-0  text-white flex items-center justify-center py-4">
            <FaFlag className='mr-3'/>
            E-parapheur
        </h2>
    </aside>
   </>
  )
}

export default Aside