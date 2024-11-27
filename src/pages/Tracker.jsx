import React, { useContext, useEffect, useState } from 'react'
import { FaSearch, } from "react-icons/fa";
import data from "../data";
import TdData from '../components/TdData';
import { userContext } from '../components/ContextWrapper';

import { useNavigate } from 'react-router-dom';

function Tracker() {
const {user} = useContext(userContext)



    const [docs] = useState(data);
    const [search, setSearch] = useState("");
    const handleChange = (e) => {
      setSearch(e.target.value);
    };
    const filtered = docs.filter((doc) => {
      if (doc.prop.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
  
      if (doc.ref.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
  
      if (doc.mat.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    });
  return (
    <>
                  <div className=" w-[100%]  justify-center flex p-3 mb-5 relative text-black">
            <input
              onChange={handleChange}
              value={search}
              type="text"
              className="border w-2/3 p-2 rounded-md focus:outline-blue-900 shadow"
              placeholder="rechercher"
            />
            <FaSearch
              size={20}
              className="absolute right-[20%] md:right-[18%] top-6 text-black "
            />
          </div>
          <div class="w-full overflow-x-auto overflow-y-scroll max-h-[83%]">
            <table class="w-full whitespace-no-wrap">
              <thead>
                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-gray-50 ">
                  <th className="px-4 py-3 text-gray-800">Reference</th>
                  <th className="px-4 py-3 text-gray-800" >Matricules</th>
                  <th className="px-4 py-3 text-gray-800">Direction</th>
                  <th className="px-4 py-3 text-gray-800">Proprietaire</th>
                  <th className="px-4 py-3 text-gray-800">Objet</th>
                  <th className="px-4 py-3 text-gray-800">Status</th>
                  <th className="px-4 py-3 text-gray-800">Livre</th>
                  <th className="px-4 py-3 text-gray-800">Infos</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y ">
                {filtered.map((data, index) => (
                  <>
                    <TdData data={data} key={index}/>
                  </>
                  
                ))}
              </tbody>
            </table>
          </div>
    
    </>
  )
}

export default Tracker