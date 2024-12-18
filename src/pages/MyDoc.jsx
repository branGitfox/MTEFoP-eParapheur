import React, { useState } from 'react'
import axiosRequest from '../axiosClient/axiosClient'

function MyDoc() {
    const [doc, setDoc] = useState({})
    const [search, setSearch] = useState({})

   const handleChange = (e) => {
        const {name, value} = e.target
        setSearch((search) => ({...search, [name]:value}))
   }

   const submit = async (e) => {
        e.preventDefault()
        await axiosRequest.post('findDoc', search, {headers:{"Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setDoc(data))
        .catch((err) => console.log("")
        )
   }

   console.log(doc);
   
  return (
    <div className='relative'>
        <div className="w-[100%] h-screen bg-white relative overflow-y-scroll">
            <h1 className=' relative top-[68px] text-blue-500 mt-10 text-center text-3xl font-bold'>Suivre mon dossier</h1>
            <p className='relative top-[68px] text-gray-900 text-center mt-5'>Pour suivre votre dossier il suffit d'entrer la reference dans la barre de recherche ci dessous.Puis appuyer sur le boutton "rechercher".</p>
            <form onSubmit={submit} className="lg:w-[50%] mx-auto h-12  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly">
                <input onChange={handleChange} name='ref' value={search?.ref} type="text" className='px-2 py-3 w-full border-2 border-gray-500 text-gray-900 shadow-sm focus:outline-blue-900 rounded-3xl' placeholder='la reference de votre dossier ici'/>
                <button className='bg-blue-500 rounded-3xl px-2 py-3'>Rechercher</button>
            </form>
            <div className="lg:w-[50%] mx-auto h-12  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly w-full overflow-x-auto overflow-y-scroll max-h-[83%]">
            <table className="w-full whitespace-no-wrap ">
          <thead >
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-gray-50 ">
              <th className="px-4 py-3 text-gray-800">Chrono</th>
              <th className="px-4 py-3 text-gray-800">Provenance</th>
              <th className="px-4 py-3 text-gray-800">Ref</th>
              <th className="px-4 py-3 text-gray-800">Proprietaire</th>
              <th className="px-4 py-3 text-gray-800">Motif</th>
              <th className="px-4 py-3 text-gray-800">Caracteristique</th>
              <th className="px-4 py-3 text-gray-800">Direction</th>
              <th className="px-4 py-3 text-gray-800">Date</th>
            </tr>
          </thead>
          </table>
            </div>
        </div>
    </div>
  )
}

export default MyDoc