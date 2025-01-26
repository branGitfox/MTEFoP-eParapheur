import React, { useEffect, useState } from 'react'
import axiosRequest from '../../axiosClient/axiosClient'; 
import { FaHouseFire } from 'react-icons/fa6';
function SpStats() {
    const [docByService, setDocByService] = useState([])
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //token d'access
         //recuperation de la liste de courrier non livre
         const getDocByService = async () => {
            await axiosRequest
              .get("/stats/countByService", {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
                },
              })
              .then(({ data }) => setDocByService(data))
              .catch((err) => console.log(err));
          };
          const colors  = ["red", "blue", "green", "purple"]
          useEffect(() => {
                getDocByService()
          }, [])
  return (
    <>
      <div className="flex  flex-wrap w-full justify-center  p-3">

        <div>SpStats</div>
                {docByService.map((doc, index) => (
                  <div className="w-[300px]">
                  <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex-shrink">
                        <div className="rounded-full p-3 bg-gray-300 ">
                          <FaHouseFire className={`text-${colors[index]}-500 text-center`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-3xl text-gray-900 text-center">
                          {doc[1].length}
                        </h3>
                        <h5 className="font-bold text-gray-500">{doc[0]}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
    </div>
    </>
  )
}

export default SpStats