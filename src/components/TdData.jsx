import React, { useState } from 'react'
import { BiDotsHorizontal } from 'react-icons/bi';
import { FaArrowCircleDown, FaArrowCircleUp, FaArrowDown, FaArrowUp, FaCheckCircle, FaInfoCircle, FaSearch, } from "react-icons/fa";

function TdData({data}) {
    const [showInfo, setShowInfo] = useState(false)

    const toggleShow = () => {
        setShowInfo(!showInfo)
    }
  return (
    <>
        <tr  class="text-gray-700">
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
                        {showInfo === true? <FaArrowUp onClick={toggleShow} className="text-gray-400 text-xl" />: <BiDotsHorizontal onClick={toggleShow} className="text-gray-400 text-xl" />}
                     
                    </td>
                  </tr>
                  {showInfo &&  <tr>
                      <td colSpan={8} className='text-center text-gray-800'>
                        <h1>Hello world</h1>
                      </td>
                  </tr>}
                
    </>
  )
}

export default TdData