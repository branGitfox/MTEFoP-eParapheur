import React, { useState } from 'react'
import axiosRequest from '../axiosClient/axiosClient'
import { Oval } from 'react-loader-spinner'
function MyDoc() {
    const [doc, setDoc] = useState({})
    const [search, setSearch] = useState({})
    const [docLoading, setDocLoading]= useState(false)

   const handleChange = (e) => {
        const {name, value} = e.target
        setSearch((search) => ({...search, [name]:value}))
   }

   const submit = async (e) => {
        setDocLoading(true)
        e.preventDefault()
        await axiosRequest.post('findDoc', search, {headers:{"Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setDoc(data))
        .then(() => setDocLoading(false))
        .catch((err) => console.log("")
        .finaly(() => setDocLoading(false))
        )
   }


   
  return (
    <div className='relative'>
        <div className="w-[100%] h-screen bg-white relative overflow-y-scroll">
            <h1 className=' relative top-[68px] text-blue-500 mt-10 text-center text-3xl font-bold'>Suivre mon dossier</h1>
            <p className='relative top-[68px] text-gray-900 text-center mt-5'>Pour suivre votre dossier il suffit d'entrer la reference dans la barre de recherche ci dessous.Puis appuyer sur le boutton "rechercher".</p>
            <form onSubmit={submit} className="lg:w-[50%] mx-auto h-12  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly">
                <input onChange={handleChange} name='ref' value={search?.ref} type="text" className='px-2 py-3 w-full border-2 border-gray-500 text-gray-900 shadow-sm focus:outline-blue-900 rounded-3xl' placeholder='la reference de votre dossier ici'/>
                <button className='bg-blue-500 rounded-3xl px-2 py-3'>Rechercher</button>
            </form>
            <div className="lg:w-[50%] mx-auto  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly w-full overflow-x-auto  ">
                {docLoading ? (<Oval
              visible={true}
              height="30"
              width="30"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />):(<><table className="w-full whitespace-no-wrap ">
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
          <tbody >
            <tr className="text-gray-700">
                <td className="px-4 py-3 text-sm">{doc?.chrono}</td>
                <td className="px-4 py-3 text-sm">{doc?.provenance}</td>
                <td className="px-4 py-3 text-sm">{doc?.ref}</td>
                <td className="px-4 py-3 text-sm">{doc?.propr}</td>
                <td className="px-4 py-3 text-sm">{doc?.motif}</td>
                <td className="px-4 py-3 text-sm">{doc?.caracteristique}</td>
                <td className="px-4 py-3 text-sm">{doc?.nom_dir}</td>
                <td className="px-4 py-3 text-sm">{doc?.created_at}</td>
            </tr>
            <tr className="text-black">
                <td colSpan={8} className='text-left lg:text-center '>
                    <button className='px-2 py-3 bg-blue-500 text-gray-50 rounded-3xl '>Mouvements</button>
                </td>
            </tr>
          </tbody>
                
          </table>
                </>
        )}


            </div>
        </div>
    </div>
  )
}

export default MyDoc