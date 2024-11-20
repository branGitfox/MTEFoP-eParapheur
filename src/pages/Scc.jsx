import React, { useState } from 'react'
import { FaArrowRight, FaCheckCircle, FaSearch, FaUser } from 'react-icons/fa'
import data from '../data'

function Scc() {
  const [docs] = useState(data)
  const [search, setSearch] = useState('')
const handleChange = (e) => {
  setSearch(e.target.value)
}
  const filtered = docs.filter((doc) => {
    if(doc.prop.toLowerCase().includes(search)){
      return true
    }

    if(doc.ref.toLowerCase().includes(search)){
      return true
    }

    if(doc.mat.toLowerCase().includes(search)){
      return true
    }
  })
  
  
  return (
    <div className='w-[100%] min-h-[100vh] bg-white'>
      <div
      class="flex h-screen bg-gray-50 ">
              <aside
        class="z-20 hidden w-64 overflow-y-auto bg-[#191970]  md:block flex-shrink-0"
      >
        <div class="py-4 text-white ">
          <a
            class="ml-6 text-lg font-bold text-white "
            href="#"
          >
            MTFoP
          </a>
          <ul class="mt-6">
       
          </ul>
          <ul>
            <li class="relative px-6 py-3 ">
            <span
                class="absolute inset-y-0 left-0 w-1 bg-[#C1AB48] rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                href=""
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
                <span class="ml-4">Suivis</span>
              </a>
            </li>
            <li class="relative px-6 py-3">
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                href="cards.html"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <span class="ml-4">Enregistrements</span>
              </a>
            </li>
            <li class="relative px-6 py-3">
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                href="charts.html"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  ></path>
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                <span class="ml-4">Statistiques</span>
              </a>
            </li>
             </ul>
          <div class="px-6 my-6">
            <button
              class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#A10304] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Se Deconnecter
              <FaArrowRight/>
            </button>
          </div>
        </div>
      </aside>
            
            <div class="w-full overflow-hidden shadow-xs">
            <div className=" w-[100%] justify-between flex p-3 bg-gray-100 mb-5">
                <h2 className='font-semibold text-black'>SCC-Service Central de Courriers</h2>
                <h3 className='font-semibold text-black'>Utilisateur <FaUser className='inline ml-2'/></h3>
            </div>
            <div className=" w-[100%] justify-center flex p-3 mb-5 relative text-black">
                <input onChange={handleChange} value={search} type="text" className='border w-2/3 p-2 rounded-md focus:outline-orange-500 shadow' placeholder='rechercher'/>
                <FaSearch size={20} className='absolute right-[20%] md:right-[18%] top-6 text-black '/>
            </div>
              <div class="w-full overflow-x-auto overflow-y-scroll max-h-[700px]">
                <table class="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-gray-50 "
                    >
                      <th className="px-4 py-3">Reference</th>
                      <th className="px-4 py-3">Matricules</th>
                      <th className="px-4 py-3">Direction</th>
                      <th className="px-4 py-3">Proprietaire</th>
                      <th className="px-4 py-3">Objet</th>
                      <th className='px-4 py-3'>Status</th>
                      <th className='px-4 py-3'>Livre</th>
                      <th className='px-4 py-3'>Infos</th>
                      
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white divide-y "
                  >
                    {filtered.map((data, index) => (
                        <tr class="text-gray-700">
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                          
                     
                            <div>
                              <p class="font-semibold">{data.ref}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">
                           {data.mat}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {data.dir}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {data.prop}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {data.objet}
                        </td>
                        <td class="px-4 py-3 text-xs">
                          <span
                            class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full "
                          >
                            Decharge
                          </span>
                        </td>
                        <td class="px-4 py-3 text-xs">
                              <FaCheckCircle className='text-green-600 text-xl'/>
                        </td> 
                      </tr>
                    ))}
                    
                    

                   
                  </tbody>
                </table>
              </div>
              
               
            
            </div>
            {/* <!-- General elements -->
            <h4
              class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
            >
              Elements
            </h4>
            <div
              class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">Name</span>
                <input
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  placeholder="Jane Doe"
                />
              </label>

              <div class="mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  Account Type
                </span>
                <div class="mt-2">
                  <label
                    class="inline-flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="accountType"
                      value="personal"
                    />
                    <span class="ml-2">Personal</span>
                  </label>
                  <label
                    class="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="accountType"
                      value="busines"
                    />
                    <span class="ml-2">Business</span>
                  </label>
                </div>
              </div>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  Requested Limit
                </span>
                <select
                  class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                >
                  <option>$1,000</option>
                  <option>$5,000</option>
                  <option>$10,000</option>
                  <option>$25,000</option>
                </select>
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  Multiselect
                </span>
                <select
                  class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-multiselect focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  multiple
                >
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
                  <option>Option 5</option>
                </select>
              </label>

              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">Message</span>
                <textarea
                  class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  rows="3"
                  placeholder="Enter some long form content."
                ></textarea>
              </label>

              <div class="flex mt-6 text-sm">
                <label class="flex items-center dark:text-gray-400">
                  <input
                    type="checkbox"
                    class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  />
                  <span class="ml-2">
                    I agree to the
                    <span class="underline">privacy policy</span>
                  </span>
                </label>
              </div>
            </div> */}
      </div>
         
    </div>
  )
}

export default Scc