import React, { useState } from 'react'
import { FaCheckCircle, FaInfoCircle, FaSearch, } from "react-icons/fa";
import data from "../data";


function Tracker() {
    const [docs] = useState(data);
    const [search, setSearch] = useState("");
    const handleChange = (e) => {
      setSearch(e.target.value);
    };
    const filtered = docs.filter((doc) => {
      if (doc.prop.toLowerCase().includes(search)) {
        return true;
      }
  
      if (doc.ref.toLowerCase().includes(search)) {
        return true;
      }
  
      if (doc.mat.toLowerCase().includes(search)) {
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
          <div class="w-full overflow-x-auto overflow-y-scroll max-h-[98%]">
            <table class="w-full whitespace-no-wrap">
              <thead>
                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-gray-50 ">
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Matricules</th>
                  <th className="px-4 py-3">Direction</th>
                  <th className="px-4 py-3">Proprietaire</th>
                  <th className="px-4 py-3">Objet</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Livre</th>
                  <th className="px-4 py-3">Infos</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y ">
                {filtered.map((data, index) => (
                  <tr key={index} class="text-gray-700">
                    <td class="px-4 py-3">
                      
                      <div class="flex items-center text-sm">
                        <div>
                          <p class="font-semibold">{data.ref}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">{data.mat}</td>
                    <td class="px-4 py-3 text-sm">{data.dir}</td>
                    <td class="px-4 py-3 text-sm">{data.prop}</td>
                    <td class="px-4 py-3 text-sm">{data.objet}</td>
                    <td class="px-4 py-3 text-xs">
                      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ">
                        Decharge
                      </span>
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <FaCheckCircle className="text-green-600 text-xl" />
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <FaInfoCircle className="text-blue-00 text-xl" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
    </>
  )
}

export default Tracker