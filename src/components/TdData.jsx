import React, { useState } from 'react'
import { BiDotsHorizontal } from 'react-icons/bi';
import { FaArrowCircleDown, FaArrowCircleUp, FaArrowDown, FaArrowUp, FaCheckCircle, FaClosedCaptioning, FaExclamationCircle, FaInfoCircle, FaSearch, } from "react-icons/fa";

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
                          <p className="font-semibold">{data.chrono}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{data.provenance}</td>
                    <td className="px-4 py-3 text-sm">{data.ref}</td>
                    <td className="px-4 py-3 text-sm">{data.propr}</td>
                    <td className="px-4 py-3 text-sm">{data.motif}</td>
                    <td className="px-4 py-3 text-sm">{data.caracteristique}</td>
                    <td className="px-4 py-3 text-sm">{data.nom_dir}</td>
                    <td className="px-4 py-3 text-sm">{data.created_at}</td>
                    {/* <td className="px-4 py-3 text-sm">{data.status}</td> */}
                    {/* <td className="px-4 py-3 text-xs">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ">
                        Decharge
                      </span>
                    </td> */}
                    <td className="px-4 py-3 text-xs">
                      {/* <FaCheckCircle className="text-green-600 text-xl" /> */}
                      <FaExclamationCircle className='text-red-500 text-xl'/>
                    </td>
                    <td className="px-4 py-3 text-xs">
                        {showInfo === true? <FaArrowUp onClick={toggleShow} className="text-gray-400 text-xl" />: <BiDotsHorizontal onClick={toggleShow} className="text-gray-400 text-xl" />}
                     
                    </td>
                  </tr>
                  {showInfo &&  <tr>
                      <td colSpan={12} className='text-center text-gray-800'>
                        <h1>Hello world</h1>
                      </td>
                  </tr>}
                
    </>
  )
}

export default TdData