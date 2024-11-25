import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../components/admin/Aside'
import Header from '../components/admin/Header'
function Admin() {
  return (
    <body class="bg-gray-100 font-family-karla flex min-h-screen">

    
    <Aside/>
    <div class="w-full flex flex-col h-screen overflow-y-scroll">
    <Header/>
    <main class="w-full flex-grow p-6">
               
                        <div class="leading-loose">
                            <form class="p-3 bg-white rounded shadow-xl">
                                <p class="text-lg text-gray-800 font-medium pb-4">Customer information</p>
                                <div class="">
                                    <label class="block text-md  text-gray-600" for="cus_name">Nom</label>
                                    <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Le Nom Du Nouveau Utilisateur " aria-label="Name"/>
                                </div>
                                <div class="mt-2">
                                    <label class="block text-md text-gray-600" for="cus_email">Email</label>
                                    <input class="w-full px-5  py-1 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="L'Email Du Nouveau Utilisateur" aria-label="Email"/>
                                </div>
                                <div class="mt-2">
                                    <label class=" block text-md text-gray-600" for="cus_email">I-Matricule</label>
                                    <input class="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="L'Imatricule Du Nouveau Utilisateur" aria-label="Email"/>
                                </div>
                                <div class="mt-2">
                                    <label class="text-md block text-gray-600" for="cus_email">Role</label>
                                    <select name="" id="" className='w-full p-3 text-gray-900 bg-gray-200 rounded-md'>
                                        <option value="">DRFP</option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div class="inline-block mt-2 w-1/2 pr-1">
                                    <label class="block text-md text-gray-600" for="cus_email">Mot de Passe</label>
                                    <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Mot De Passe" aria-label="Email"/>
                                </div>
                                <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
                                    <label class=" block text-md text-gray-600" for="cus_email">Confirmation Mot de passe</label>
                                    <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email"  name="cus_email" type="text" required="" placeholder="Confirmation Du Mot De Passe" aria-label="Email"/>
                                </div>
                                <div class="mt-6">
                                    <button class="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded" type="submit">Enregistrer</button>
                                </div>
                            </form>
                        </div>
            </main>
    
         <Outlet/>
    </div>
    </body>
  )
}

export default Admin