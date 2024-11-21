import React from 'react'

function Register() {
  return (
    <>
        
<form className='w-[100%]  md:w-5/6 m-auto  p-2 bg-white rounded-md shadow md:mt-20' >
    <div class="grid gap-6 mb-1 md:grid-cols-2">
        <div>
            <label for="ref" class="block mb-2 text-sm font-medium text-gray-900 ">Reference</label>
            <input type="text" id="ref" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="reference du dossier" required />
        </div>
        <div>
            <label for="chrono" class="block mb-2 text-sm font-medium text-gray-900 ">Chrono</label>
            <input type="text" id="Chrono" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="chrono initial" required />
        </div>
        <div>
            <label for="prop" class="block mb-2 text-sm font-medium text-gray-900 ">Proprietaire</label>
            <input type="text" id="prop" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="proprietaire du dossier" required />
        </div>  
        <div>
            <label for="objet" class="block mb-2 text-sm font-medium text-gray-900 ">Objet</label>
            <input type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " placeholder="objet du depot"  required />
        </div>
        <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">Direction</label>
            <select className='text-gray-900 w-full p-2 rounded' name="" id="">
                <option value="">DRFP</option>
                <option value="">DSI</option>
                <option value="">DRHE</option>
                <option value="">DMI</option>
            </select>
        </div>
        <div>
            <label for="date" class="block mb-2 text-sm font-medium text-gray-900 ">Date D'ajout</label>
                <input type="date" name="" id="date" className='text-black w-full border p-1 rounded' />
            </div>
    </div>
    
    

    <button type="submit" class="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-10">Enregistrer</button>
</form>

    </>
  )
}

export default Register