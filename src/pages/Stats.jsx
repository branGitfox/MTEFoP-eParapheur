import React, { useEffect, useRef, useState } from 'react'
import {FaThumbsUp } from 'react-icons/fa';
import { SiPaperswithcode, SiPinboard } from 'react-icons/si';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar } from 'recharts'
import axiosRequest from '../axiosClient/axiosClient';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 100, pv: 2400, amt: 2400}, {name: 'Page A', uv: 200, pv: 2200, amt: 2200}];

function Stats() {
    const [doc, setDoc] = useState([])
    const [date, setDate] = useState([])
    const [notLivred, setNotLivred] = useState([])
    const [livred, setLivred] = useState([])
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [currentDate, setCurrentDate] = useState("")

    //recuperation des courriers
    const getDoc = async () => {
        await axiosRequest.get('/stats/count', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setDoc(data))
        .catch((err) => console.log(err))
    }

    //recuperation de la liste de dates
    const getDate = async () => {
        await axiosRequest.get('/stats/date', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setDate(data))
 
        .catch((err) => console.log(err))
      
    }

    //recuperation de la liste de courrier non livre
    const getNotLivred = async () => {
        await axiosRequest.get('/stats/notLivred', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setNotLivred(data))
        .catch((err) => console.log(err))
    }

    //recuperation de la liste de courrier non livre
    const getLivred = async () => {
        await axiosRequest.get('/stats/livred', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setLivred(data))
        .catch((err) => console.log(err))
    }

const handleChangeDate = (e) => {
    setCurrentDate(e.target.value)
}
    useEffect(() => {
        getDoc()
        getDate()
        getNotLivred()
        getLivred()
        
    }, [])

console.log(currentDate);



  return (
    <>    
        <div className="flex gap-4">
               <h3 className='text-gray-900 text-xl text-left ml-2.5 font-semibold'>Statistiques Annuel</h3> 
                <select name="date"  onChange={handleChangeDate} id="" className='text-gray-200 border p-1 rounded-xl bg-yellow-600 focus:outline-none'>
       
                    {date.reverse().map((dt, index) => <option key={index} value={dt}>{dt}</option>)}
{/*                       
                      <option value="">2022</option>
                      <option value="">2023</option>
                      <option value="">2024</option> */}
                        <option value="">2022</option>
                </select>
        </div>
   
        <div className="flex flex-wrap mt-5">
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                   
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-blue-800"><SiPaperswithcode/></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Total Dossiers</h5>
                                <h3 className="font-bold text-3xl text-gray-900">{doc.filter(dc => dc?.created_at?.substring(0, 7) == currentDate).length} <span className="text-blue-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                   
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-orange-600"><SiPinboard/></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Total En Attente</h5>
                                <h3 className="font-bold text-3xl text-gray-900">{notLivred.filter(nt => nt?.created_at?.substring(0, 7) == currentDate).length}<span className="text-green-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                   
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-yellow-600"><FaThumbsUp/></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Total Livre</h5>
                                <h3 className="font-bold text-3xl text-gray-900">{livred.filter(lv => lv?.created_at?.substring(0, 7) == currentDate).length} <span className="text-green-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                   
                </div>
                
            </div>
            <hr  className='mt-5 mb-5'/>
            <h3 className='text-gray-900 text-xl text-left ml-2.5 font-semibold'>Graphiques</h3> 

        <div className="flex flex-wrap justify-evenly w-[100%] items-center gap-y-4 p-3 mt-10">

              <LineChart width={500} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="green" />
              <CartesianGrid stroke="#ccc" />
              <XAxis  dataKey="uv" />
              <YAxis />
              </LineChart>
              <BarChart width={500} height={300} data={data}>
              <XAxis dataKey="uv" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
        </div>
    
    </>

  )
}

export default Stats