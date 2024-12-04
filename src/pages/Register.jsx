import React, { useState } from 'react'

function Register() {
    const [formData, setFormData]=useState({}) //donnee du formulaire
    const [isLoading, setIsLoading] = useState(false) //etat du loader
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
          .post("/doc", formData, {headers:{Authorization:`Bearer ${}`}})
          .then(({ data }) => setUserData(data))
          .then(() => setIsLoading(false))
    
          .catch((err) => toast.error(err.response?.data?.message))
          .finally(() => setIsLoading(false));
      };


  return (
    <>
        <h3 className='text-gray-900 text-2xl ml-2.5 font-semibold '>Enregistrement d'un Dossier</h3>
<form className='w-[100%]  m-auto  p-10 bg-white rounded-md shadow mt-5 md:mt-10' >
        <div className='mb-5'>
            <label htmlFor="ref" className="block mb-2 text-sm font-medium text-gray-900 ">Chrono</label>
            <input type="text" id="ref" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="reference du dossier" name='chrono'/>
        </div>
        <div className='mb-5'>
            <label htmlFor="chrono" className="block mb-2 text-sm font-medium text-gray-900 ">Reference</label>
            <input type="text" id="Chrono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="chrono initial" name='ref'/>
        </div>
        <div className='mb-5'>
            <label htmlFor="chrono" className="block mb-2 text-sm font-medium text-gray-900 ">Provenance</label>
            <input type="text" id="Chrono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="Provenance" name='Provenance'/>
        </div>
        <div className='mb-5'>
            <label htmlFor="prop" className="block mb-2 text-sm font-medium text-gray-900 ">Proprietaire</label>
            <input type="text" id="prop" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  " placeholder="proprietaire du dossier" name='propr'/>
        </div>  
        <div className='mb-5'>
            <label htmlFor="objet" className="block mb-2 text-sm font-medium text-gray-900 ">Motif</label>
            <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5   " placeholder="objet du depot"  name='motif' />
        </div >
        <div className='mb-5'>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Caracteristique</label>
            <select className='text-gray-900 w-full p-2 rounded' name="caracteristique" id="">
                <option value="">- Selectionner ici -</option>
                <option value="plis ferme">Plis Ferme</option>
            </select>
        </div>
        <div className='mb-5'>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Direction</label>
            <select className='text-gray-900 w-full p-2 rounded' name="dir" id="">
                <option value="">DRFP</option>
                <option value="">DSI</option>
                <option value="">DRHE</option>
                <option value="">DMI</option>
            </select>
        </div>
    <button type="submit" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-10">Enregistrer</button>
</form>

    </>
  )
}

export default Register