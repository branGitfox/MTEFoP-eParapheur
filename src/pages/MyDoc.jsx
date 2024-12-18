import React from 'react'

function MyDoc() {
  return (
    <div className='relative'>
        <div className="w-[100%] h-screen bg-white relative overflow-y-scroll">
            <h1 className=' relative top-[68px] text-blue-500 mt-10 text-center text-3xl font-bold'>Suivre mon dossier</h1>
            <p className='relative top-[68px] text-gray-900 text-center mt-5'>Pour suivre votre dossier il suffit d'entrer la reference dans la barre de recherche ci dessous.Puis appuyer sur le boutton "rechercher".</p>
            <div className="lg:w-[50%] mx-auto h-12  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly">
                <input type="text" className='px-2 py-3 w-full border-2 border-gray-500 text-gray-900 shadow-sm focus:outline-blue-900 rounded-3xl' placeholder='la reference de votre dossier ici'/>
                <button className='bg-blue-500 rounded-3xl px-2 py-3'>Rechercher</button>
            </div>
        </div>
    </div>
  )
}

export default MyDoc