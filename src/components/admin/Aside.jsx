
import { FaDashcube, FaUserPlus } from 'react-icons/fa'
import {FaUnlockKeyhole } from 'react-icons/fa6'
function Aside() {
  return (
   <>
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
            <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300"><FaUnlockKeyhole className='inline mr-3'/>Admin</a>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
            <a href="index.html" className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
                <FaDashcube size={20} className='mr-3'/>
                Dashboard
            </a>
            <a href="blank.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
               <FaUserPlus size={20} className='mr-3'/> Utilisateur
            </a>
        </nav>
        <a href="#" className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
            <i className="fas fa-arrow-circle-up mr-3"></i>
            E-parapheur
        </a>
    </aside>
   </>
  )
}

export default Aside