import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { userContext } from '../components/ContextWrapper'
import axiosRequest from '../axiosClient/axiosClient';
import { BeatLoader } from "react-spinners";


function Register() {
    const {user} = useContext(userContext)
    const [formData, setFormData]=useState({status:'non reçu', user_id:user.id}) //donnee du formulaire
    const [isLoading, setIsLoading] = useState(false) //etat du loader
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //le token d'acces
    //gere le changement du formuulaire
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]:value}))
    }

    //gere la submission du formulaire
    const submit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        await axiosRequest
          .post("/doc", formData, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin": "http://127.0.0.1:8000/api"}})
          .then(({ data }) => toast.success(data.message))
          .then(() => setIsLoading(false))
    
          .catch((err) => toast.error(err.response?.data?.message))
          .finally(() => setIsLoading(false));
      };


  return (
    <>
        <h3 className='text-gray-900 text-2xl ml-2.5 font-semibold '>Enregistrement d'un Dossier</h3>
    <form onSubmit={submit} className='w-[100%]  m-auto  p-10 bg-white rounded-md shadow mt-5 md:mt-10' >
        <div className='mb-5'>
            <label htmlFor="chrono" className="block mb-2 text-sm font-medium text-gray-900 ">Chrono</label>
            <input type="text"  onChange={handleChange} id="chrono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="reference du dossier" name='chrono'/>
        </div>
        <div className='mb-5'>
            <label htmlFor="ref" className="block mb-2 text-sm font-medium text-gray-900 ">Reference</label>
            <input type="text" id="ref" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="chrono initial" name='ref'/>
        </div>
        <div className='mb-5'>
            <label htmlFor="provenance" className="block mb-2 text-sm font-medium text-gray-900 ">Provenance</label>
            <input type="text" onChange={handleChange} id="provenance" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="Provenance" name='provenance'/>
        </div>
        <div className='mb-5'>
            <label htmlFor="prop" className="block mb-2 text-sm font-medium text-gray-900 ">Proprietaire</label>
            <input type="text" onChange={handleChange} id="prop" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="proprietaire du dossier" name='propr'/>
        </div>  
        <div className='mb-5'>
            <label htmlFor="motif" className="block mb-2 text-sm font-medium text-gray-900 ">Motif</label>
            <input type="text" onChange={handleChange} id="motif" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5   " placeholder="objet du depot"  name='motif' />
        </div >
        <div className='mb-5'>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Caracteristique</label>
            <select onChange={handleChange} className='text-gray-900 w-full p-2 rounded' name="caracteristique" id="">
                <option value="">- Selectionner ici -</option>
                <option value="plis ferme">Plis Ferme</option>
            </select>
        </div>
        <div className='mb-5'>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Direction</label>
            <select onChange={handleChange} className='text-gray-900 w-full p-2 rounded' name="dir_id" id="">
                <option value="1">DRFP</option>
                <option value="">DSI</option>
                <option value="">DRHE</option>
                <option value="">DMI</option>
            </select>
        </div>
    <button type="submit" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-10"> {isLoading ? <BeatLoader color="yellow" /> : "Enregistrer"}</button>
</form>
    </>
  )
}

export default Register