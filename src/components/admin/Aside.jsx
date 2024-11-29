
import { FaChartLine, FaFlag, FaMailBulk, FaUserPlus } from 'react-icons/fa'
import {FaHouseLaptop, FaUnlockKeyhole } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'
function Aside() {
    const location = useLocation()
  return (
   <>
    <aside className="relative bg-sidebar h-screen w-[19.7rem] hidden sm:block shadow-xl bg-[#191970]">
        <div className="p-6 ">
            <Link href="/admin" className="text-white text-2xl font-semibold uppercase hover:text-gray-300"><FaUnlockKeyhole className='inline mr-3 mb-2'/>Admin</Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
            <Link href="index.html" className={`flex items-center rounded-sm ${location.pathname ==='/admin'?'border-l-[#C1AB48] border-l-4 rounded-md':''} hover:bg-[#C1AB48]  text-white py-4 pl-6 nav-item`}>
                <FaChartLine size={20} className='mr-3'/>
                Tableau de Bord
            </Link>
            <Link to='/admin/userregister' className={`flex items-center rounded-sm ${location.pathname ==='/admin/userregister'?'border-l-[#C1AB48] border-l-4 rounded-md':''} text-white hover:bg-[#C1AB48] py-4 pl-6 nav-item`}>
               <FaUserPlus size={20} className='mr-3'/>Ajout Utilisateur
            </Link>
            <Link to='/admin/sccservdirdg' className={`flex items-center rounded-sm ${location.pathname ==='/admin/sccservdirdg'?'border-l-[#C1AB48] border-l-4 rounded-md':''} text-white hover:bg-[#C1AB48] py-4 pl-6 nav-item`}>
               <FaHouseLaptop size={20} className='mr-3'/>Ajout Dir/Serv
            </Link>
            <Link to="/scc" className="flex items-center text-white rounded-sm hover:bg-[#C1AB48] py-4 pl-6 nav-item">
               <FaMailBulk size={20} className='mr-3'/>Visiter Service-CC
            </Link>
        </nav>
        <h2  className="absolute w-full font-bold    bottom-10  text-white flex items-center justify-center py-4">
            <FaFlag className='mr-3'/>
            E-parapheur
        </h2>
    </aside>
   </>
  )
}

export default Aside