import React, { useEffect, useState } from "react";
import {  FaEye, FaFilter, FaHandPointDown,FaWallet } from "react-icons/fa";
import { FaHandBackFist, FaHouseFire, FaUserGroup} from "react-icons/fa6";
import axiosRequest from "../axiosClient/axiosClient";
import { ResponsiveContainer, LineChart , Line} from "recharts";




function Dashboard() {
  
  const [period, setPeriod] = useState({start:"", end:""})    //pour le trafics
  const [period2, setPeriod2] = useState({start:"", end:""})  //pour les donnees globaux
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
  const [view, setView] = useState()
  const [chartDataView, setChartDataView] = useState([])
  const [staff, setStaff] = useState(0)

  const [allDoc, setAllDoc] = useState([])
  const [allDocGotByOwner, setAllDocGotByOwner] = useState([])
  const [allDocNotGotByOwner, setAllDocNotGotByOwner] = useState([])
  const [docByDirection, setDocByDirection] = useState([])

  const handleSubmitPeriod = (e) => {
    e.preventDefault()
    getNumberOfView()
  }

  const handleSubmitPeriod2 = (e) => {
    e.preventDefault()
    getDocByDirection()
  }

    //recuperation des courriers
    const getDoc = async () => {
      await axiosRequest
        .get("/stats/count", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        })
        .then(({ data }) => setAllDoc(data))
        .catch((err) => console.log(err));
    };


    //recuperation des courriers recuperer par son proprietaire
    const getDocGotByOwner = async () => {
      await axiosRequest
        .get("/stats/gotByOwnerCount", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        })
        .then(({ data }) => setAllDocGotByOwner(data))
        .catch((err) => console.log(err));
    };

        //recuperation des courriers recuperer par son proprietaire
        const getDocNotGotByOwner = async () => {
          await axiosRequest
            .get("/stats/notGotByOwnerCount", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
              },
            })
            .then(({ data }) => setAllDocNotGotByOwner(data))
            .catch((err) => console.log(err));
        };

  //gere le changement des dates periodiques trafics
const handlePeriod = (e) => {
  const {name, value} = e.target
  setPeriod((period) => ({...period, [name]:value}))
}

  //gere le changement des dates periodiques  globaux
  const handlePeriod2 = (e) => {
    const {name, value} = e.target
    setPeriod2((period2) => ({...period2, [name]:value}))
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

//recuperation du nombre de vues
const getNumberOfViewChart = async () =>  {
  try{
    await axiosRequest.get('/visitors/charts', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin": "http://127.0.0.1:8000"}})
    .then(({data}) => setChartDataView(data))
    .catch(err => console.log(err))
  }catch(err){
    console.log(err)
  }
}

const colors = ["blue", "purple", "pink"]
   //recuperation de la liste de courrier non livre
   const getDocByDirection = async () => {
    await axiosRequest
      .post("/stats/countByDirection", period2,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setDocByDirection(data))
      .catch((err) => console.log(err));
  };



  const getUserCount = async () => {
    try{
        await axiosRequest.get('/userCount', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setStaff(data))
        .catch((err) => console.log(err))
    }catch(err){
      console.log(err);
      
    }
  }
useEffect(() => {
  getNumberOfView()
  getNumberOfViewChart()
  getDoc()
  getDocGotByOwner()
  getDocNotGotByOwner()
  getDocByDirection()
  getUserCount()
},[])

console.log(docByDirection);

  return (
    <>
    <div className="flex w-full flex-wrap md:w-[400px]  justify-between p-4 ">
      <h2 className="text-gray-800 font-bold">
         <FaFilter className="inline mr-1 text-blue-500 "/> Fitres
      </h2>
      <form onSubmit={handleSubmitPeriod2} className=" w-full md:w-[200px] flex    mt-2 lg:mt-0 justify-evenly gap-x-5 ">
              <div >
              <label htmlFor="" className="text-gray-800 font-medium" >Debut</label>
                <input className="text-gray-900 p-2 rounded-md w-full"  onChange={handlePeriod2} name="start" type="date"  />
              </div>
              <div >
              <label htmlFor="" className="text-gray-800 font-medium">Fin</label>
              <input  className="text-gray-800 p-2 rounded-md w-full" onChange={handlePeriod2} name="end"  type="date"  />
              </div>
              <button className="bg-blue-600 px-3 h-10 relative top-6 rounded-md" type="submit">Valider</button>
            </form>
    </div>
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
                {allDoc.length}
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
                  {allDocGotByOwner}
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
                {allDocNotGotByOwner}
                </h3>
                <h5 className="font-bold text-gray-500">Non Decharger</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        {docByDirection.map((doc, index) => (
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
                  <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaUserGroup className={`text-blue-500 text-center`} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  {staff}
                </h3>
                <h5 className="font-bold text-gray-500">Staff(s)</h5>
              </div>
            </div>
          </div>
        </div>
        </div>
      <hr className="text-gray-900" />
      <div className="w-full md:w-[400px] flex flex-wrap  justify-between items-center">
         <h2 className="mt-3 ml-2 font-bold text-gray-900 text-xl"> <FaEye className="inline ml-1 text-blue-800 mr-1"  size={25}/>Trafics</h2>    
         <form onSubmit={handleSubmitPeriod} className=" w-full md:w-[200px] flex    mt-2 lg:mt-0 justify-evenly gap-x-5 p-4 md:p-0">
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
      <LineChart width={300} height={500} data={chartDataView}>
        <Line type="monotone" dataKey="nbr" stroke="#8884d8" strokeWidth={2} />
        {/* <Line type="monotone" dataKey="uv" stroke="red" strokeWidth={2} /> */}
      </LineChart>
    </ResponsiveContainer>
    
    </>
  );
}

export default Dashboard;
