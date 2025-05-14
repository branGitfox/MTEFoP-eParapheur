import  { useEffect, useState } from 'react'
import axiosRequest from '../../axiosClient/axiosClient'; 
import { FaHouseFire, FaFilter } from 'react-icons/fa6';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, ResponsiveContainer, BarChart, Bar,Pie, Cell} from 'recharts';
import { FaChartLine,  } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { SiPaperswithcode } from 'react-icons/si';
import { HiOfficeBuilding } from 'react-icons/hi';
import { BeatLoader } from 'react-spinners';

function SpStats() {
    const [docByService, setDocByService] = useState([])
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //token d'access
    const [period, setPeriod] = useState({start:"", end:""})
    const [countByDirection, setCountByDirection]= useState(0)

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

      //couleur de la graphique radial
      const style = {
        top: "50%",
        right: 0,
        transform: "translate(0, -50%)",
        lineHeight: "24px",
        color:"blue",
        
        
      };
    const handlePeriod = (e) => {
      const {name, value} = e.target
      setPeriod((period) => ({...period, [name]:value}))
    }

    const handleSubmitPeriod =  (e) => {
      e.preventDefault()
      getDocByService()
      getcountDocByDirection()
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

          //nombre de courrier dans la direction actuel
          const getcountDocByDirection = async () => {
            await axiosRequest
              .post("/stats/countDocByDirection", period,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
                },
              })
              .then(({ data }) => setCountByDirection(data))
              .catch((err) => console.log(err));
          };

          const colors  = ["red", "blue", "green", "purple"]
          useEffect(() => {
                getDocByService()
                getcountDocByDirection()
          }, [])
          const data = []
        docByService.forEach((doc, index) => {
          data.push({name:doc[0],Courriers:doc[1].length, fill:colors[index]})
        } )
  return (
    <>
  
        
                <div className="flex w-full gap-4 items-center justify-between">
                        <h3 className="text-gray-700 text-xl text-left ml-2.5 font-semibold">
                          Reporting
                        </h3>
                        {/* <select
                          name="date"
                          onChange={handleChangeDate}
                          id=""
                          className="text-gray-200 border p-1  rounded-xl bg-yellow-600 focus:outline-none"
                        >
                          {date?.map((dt, index) => (
                            <option key={index} value={dt}>
                              {dt}
                            </option>
                          ))}
                          {date.reverse()}
                        </select> */}
                
                        <form onSubmit={handleSubmitPeriod} className="w-200px  gap-x-2 flex justify-evenly items-center text-gray-700 mr-2 ">
                              <label htmlFor="" className="text-gray-700 font-medium">Début</label>
                              <input type="date"  onChange={handlePeriod} name="start" id="" className="py-2 px-3 rounded-md shadow"/>
                              <label htmlFor="" className="text-gray-700 font-medium">Fin</label>
                
                              <input type="date"  onChange={handlePeriod} name="end" id="" className="py-2 px-3 rounded-md shadow"/>
                           
                              <button type="submit"  className="py-2 px-3  bg-blue-600 rounded-lg hover:bg-blue-500 text-white"><FaFilter  className="mr-2 inline"/> Filtrer</button>
                        </form>
                      </div>
                
                      <div className="flex flex-wrap mt-5 px-2 justify-center">
                      <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
                 
                    <a href="#"
                       className="flex h-20 w-40 flex-col items-center justify-center bg-white shadow-lg rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                        <div className="flex flex-row items-center justify-center">
                     <SiPaperswithcode className="mr-3 text-blue-600"/>
                
                            <span className="font-bold text-gray-600"> {countByDirection} </span>
                        </div>
                
                        <div className="mt-2 text-sm text-gray-400">Total Courriers</div>
                    </a>
                
                 
                    {/* <a href="#"
                        class="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                        <div class="flex flex-row items-center justify-center">
                            <SiUpcloud className="text-cyan-500 mr-3" size={24}/>
                
                            <span class="font-bold text-gray-600"> {number} </span>
                        </div>
                
                        <div class="mt-2 text-sm text-gray-400">Courriers Enregistrés</div>
                    </a>
                 
                    <a href="#"
                        class="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                        <div class="flex flex-row items-center justify-center">
                            <BsClock className="mr-3 text-orange-500"/>
                
                            <span class="font-bold text-gray-600"> {notLivredByPeriod.length} </span>
                        </div>
                
                        <div class="mt-2 text-sm text-gray-400">En attente</div>
                    </a> */}
{/*                 
                    <a href="#"
                        class="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                        <div class="flex flex-row items-center justify-center">
                            <SiPinboard className="mr-3 text-green-500"/>
                
                            <span class="font-bold text-gray-600"> {    livredByPeriod.filter(
                                      (lv) =>
                                        lv?.created_at?.substring(0, 7) ==
                                        (currentDate
                                          ? currentDate
                                          : lv?.created_at?.substring(0, 7))
                                    ).length} </span>
                        </div>
                
                        <div class="mt-2 text-sm text-gray-400">Courriers Livrés</div>
                    </a> */}
                    {docByService.map((d, index) =>(    <a href="#"
                                                           className="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                        <div className="flex flex-row items-center justify-center">
                            <HiOfficeBuilding className={`mr-3 text-cyan-500`}/>
                
                            <span className="font-bold text-gray-600"> {d[1].length}</span>
                        </div>
                
                        <div className="mt-2 text-sm text-gray-400">Direction {d[0]}</div>
                    </a>))
                    }
                
                </div>
                  </div>
                  <div className="mt-4 flex flex-wrap lg:flex-nowrap  w-full justify-center gap-5 px-10">
                  <div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-10 shadow-lg">
                  <h2 className="text-gray-700 mb-2 mt-2">Graphique Radial - Flux de Courriers par Direction</h2>
                
                <ResponsiveContainer width="100%" height="100%" >
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
                    barSize={20}
                  >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="Courriers" fill="blue" radius={5} background={{ fill: '#eee' }} />
                  </BarChart>
                </ResponsiveContainer>
                
                </div>
                <div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-10 shadow-lg">
                      <h2 className="text-gray-700 mb-2 mt-2">Graphique Radial - Flux de Courriers par Direction</h2>
                  
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="Courriers"
                            
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`}  />
                            ))}
                          </Pie>
                          <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            wrapperStyle={style}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                
                </div>
                  </div>
    </>
  )
}

export default SpStats