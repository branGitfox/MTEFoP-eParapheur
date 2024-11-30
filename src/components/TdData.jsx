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
        <tr  className="text-gray-700">
                    <td className="px-4 py-3">
                      
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{data.ref}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{data.mat}</td>
                    <td className="px-4 py-3 text-sm">{data.dir}</td>
                    <td className="px-4 py-3 text-sm">{data.prop}</td>
                    <td className="px-4 py-3 text-sm">{data.objet}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ">
                        Decharge
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <FaCheckCircle className="text-green-600 text-xl" />
                    </td>
                    <td className="px-4 py-3 text-xs">
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