import React from 'react'

function MyDoc() {
  return (
    <div className='relative'>
        <div className="w-[100%] h-screen bg-white relative overflow-y-scroll">
            <h1 className=' relative top-[68px] text-blue-500 mt-10 text-center text-3xl font-bold'>Suivre mon dossier</h1>
            <p className='relative top-[68px] text-gray-900 text-center mt-5'>Pour suivre votre dossier il suffit d'entrer la reference dans la barre de recherche ci dessous.Puis appuyer sur le boutton "rechercher".</p>
            <div className="lg:w-[50%] mx-auto h-12 bg-red-500 relative top-[68px] mt-5"></div>
        </div>
    </div>
  )
}

export default MyDoc