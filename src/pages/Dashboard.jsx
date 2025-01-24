import React, { useEffect, useState } from "react";
import {  FaEye, FaHandPointDown,FaWallet } from "react-icons/fa";
import { FaHandBackFist} from "react-icons/fa6";
import axiosRequest from "../axiosClient/axiosClient";
import { ResponsiveContainer, LineChart , Line} from "recharts";


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  
  const [period, setPeriod] = useState({start:"", end:""})
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
  const [view, setView] = useState()
  const handleSubmitPeriod = (e) => {
    e.preventDefault()
    getNumberOfView()
  }

  //gere le changement des dates periodiques
const handlePeriod = (e) => {
  const {name, value} = e.target
  setPeriod((period) => ({...period, [name]:value}))
}

//recuperation du nombre de vues
const getNumberOfView = async () =>  {
  try{
    await axiosRequest.post('/visitors/period', period, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin": "http://127.0.0.1:8000"}})
    .then(({data}) => setView(data))
    .catch(err => console.log(err))
  }catch(err){
    console.log(err)
  }
}

useEffect(() => {
  getNumberOfView()
},[])

console.log(view);

  return (
    <>
      <div className="flex  flex-wrap w-full justify-center  p-3">
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-blue-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Total Courriers</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaHandBackFist className="text-green-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Decharger</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaHandPointDown className="text-red-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Non Decharger</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-amber-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500"></h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-amber-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Total Document</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-amber-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Total Document</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-900" />
      <div className="w-full lg:w-2/5 flex flex-wrap  justify-between items-center">
         <h2 className="mt-3 ml-2 font-bold text-gray-900 text-xl">Trafics de visite <FaEye className="inline ml-1 text-blue-800" size={25}/></h2>    
         <form onSubmit={handleSubmitPeriod} className="w-[200px] flex    mt-2 lg:mt-0 justify-evenly gap-x-5 ">
              <div >
              <label htmlFor="" className="text-gray-800 font-medium" >Debut</label>
                <input className="text-gray-900 p-2 rounded-md w-full"  onChange={handlePeriod} name="start" type="date"  />
              </div>
              <div >
              <label htmlFor="" className="text-gray-800 font-medium">Fin</label>
              <input  className="text-gray-800 p-2 rounded-md w-full" onChange={handlePeriod} name="end"  type="date"  />
              </div>
              <button className="bg-blue-600 px-3 h-10 relative top-6 rounded-md" type="submit">Valider</button>
            </form>
      </div>
      <div className="w-1/2 mx-auto h-50 flex justify-center items-center mt-10 text-violet-900 font-bold text-4xl border-2 p-5 border-gray-400">{view} <span className="text-xl ml-2">visiteur(s)</span></div>
    
    <ResponsiveContainer width="80%" height="100%" className="mt-10 w-full flex justify-center bg-blue-200 mx-auto mb-10">
      <LineChart width={300} height={500} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        {/* <Line type="monotone" dataKey="uv" stroke="red" strokeWidth={2} /> */}
      </LineChart>
    </ResponsiveContainer>
    
    </>
  );
}

export default Dashboard;
