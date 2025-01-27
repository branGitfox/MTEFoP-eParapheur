import React, { useEffect, useState } from 'react'
import axiosRequest from '../../axiosClient/axiosClient'; 
import { FaHouseFire, FaFilter } from 'react-icons/fa6';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart , ResponsiveContainer, BarChart, Bar, Rectangle} from 'recharts';
import { FaChartLine,  } from 'react-icons/fa';
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
function SpStats() {
    const [docByService, setDocByService] = useState([])
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //token d'access
    const [period, setPeriod] = useState({start:"", end:""})

    const handlePeriod = (e) => {
      const {name, value} = e.target
      setPeriod((period) => ({...period, [name]:value}))
    }

    const handleSubmitPeriod =  (e) => {
      e.preventDefault()
      getDocByService()
    }
         //recuperation de la liste de courrier non livre
         const getDocByService = async () => {
            await axiosRequest
              .post("/stats/countByService", period,{
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
        <div className="flex w-full flex-wrap md:w-[400px] justify-between px-1 ">
          <h2 className="text-gray-800 font-bold">
             <FaFilter className="inline mr-1 text-blue-500 "/> Fitres
          </h2>
          <form onSubmit={handleSubmitPeriod} className=" w-full md:w-[200px] flex mt-2  lg:mt-0 justify-evenly gap-x-5 ">
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
      <div className="flex  flex-wrap w-full justify-center  p-3">

     
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
    <h2 className="text-gray-800 font-bold ml-1">
             <FaChartLine className="inline mr-1 text-blue-500 "/> Representation Graphique
      </h2>
<div className="w-full flex justify-center h-[300px] mt-10">
<ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
</div>
    </>
  )
}

export default SpStats