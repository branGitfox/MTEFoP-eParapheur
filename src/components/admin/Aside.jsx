
import { FaChartLine, FaFlag, FaMailBulk, FaUserPlus } from 'react-icons/fa'
import {FaHouseLaptop, FaUnlockKeyhole } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
function Aside() {
  return (
   <>
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl bg-blue-900">
        <div className="p-6 ">
            <Link href="/admin" className="text-white text-3xl font-semibold uppercase hover:text-gray-300"><FaUnlockKeyhole className='inline mr-3 mb-2'/>Admin</Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
            <Link href="index.html" className="flex items-center hover:bg-blue-800  text-white py-4 pl-6 nav-item">
                <FaChartLine size={20} className='mr-3'/>
                Tableau de Bord
            </Link>
            <Link href="blank.html" className="flex items-center text-white hover:bg-blue-800 py-4 pl-6 nav-item">
               <FaUserPlus size={20} className='mr-3'/>Ajout Utilisateur
            </Link>
            <Link href="blank.html" className="flex items-center text-white hover:bg-blue-800 py-4 pl-6 nav-item">
               <FaHouseLaptop size={20} className='mr-3'/>Ajout Dir/Serv
            </Link>
            <Link href="blank.html" className="flex items-center text-white hover:bg-blue-800 py-4 pl-6 nav-item">
               <FaMailBulk size={20} className='mr-3'/>Visiter Service-CC
            </Link>
        </nav>
        <h2 href="#" className="absolute w-full font-bold    bottom-0  text-white flex items-center justify-center py-4">
            <FaFlag className='mr-3'/>
            E-parapheur
        </h2>
    </aside>
   </>
  )
}

export default Aside