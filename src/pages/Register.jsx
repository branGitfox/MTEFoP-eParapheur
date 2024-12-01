import React from 'react'

function Register() {
  return (
    <>
        <h3 className='text-gray-900 text-2xl ml-2.5 font-semibold '>Enregistrement d'un Dossier</h3>
<form className='w-[100%]  m-auto  p-10 bg-white rounded-md shadow mt-5 md:mt-10' >
    <div className="grid gap-6 mb-1 md:grid-cols-2">
        <div>
            <label htmlFor="ref" className="block mb-2 text-sm font-medium text-gray-900 ">Reference</label>
            <input type="text" id="ref" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="reference du dossier" required />
        </div>
        <div>
            <label htmlFor="chrono" className="block mb-2 text-sm font-medium text-gray-900 ">Chrono</label>
            <input type="text" id="Chrono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="chrono initial" required />
        </div>
        <div>
            <label htmlFor="prop" className="block mb-2 text-sm font-medium text-gray-900 ">Proprietaire</label>
            <input type="text" id="prop" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="proprietaire du dossier" required />
        </div>  
        <div>
            <label htmlFor="objet" className="block mb-2 text-sm font-medium text-gray-900 ">Objet</label>
            <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " placeholder="objet du depot"  required />
        </div>
        <div>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Direction</label>
            <select className='text-gray-900 w-full p-2 rounded' name="" id="">
                <option value="">DRFP</option>
                <option value="">DSI</option>
                <option value="">DRHE</option>
                <option value="">DMI</option>
            </select>
        </div>
        <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">Date D'ajout</label>
                <input type="date" name="" id="date" className='text-black w-full border p-1 rounded' />
            </div>
    </div>
    
    

    <button type="submit" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-10">Enregistrer</button>
</form>

    </>
  )
}

export default Register