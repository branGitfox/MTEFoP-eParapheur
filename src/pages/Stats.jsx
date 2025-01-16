import React, { useEffect, useRef, useState } from "react";
import { FaDirections, FaThumbsUp } from "react-icons/fa";
import { SiExpertsexchange, SiFlux, SiPaperswithcode, SiPinboard } from "react-icons/si";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import axiosRequest from "../axiosClient/axiosClient";
import { FaHouseChimney, FaHouseChimneyCrack, FaHouseChimneyUser, FaHouseChimneyWindow, FaHouseFlag } from "react-icons/fa6";

function Stats() {
  const [doc, setDoc] = useState([]);
  const [date, setDate] = useState([]);
  const [notLivred, setNotLivred] = useState([]);
  const [livred, setLivred] = useState([]);
  const [docByDirection, setDocByDirection] = useState([]);
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [currentDate, setCurrentDate] = useState("");
  //couleur de la graphique radial
  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  //donnees filtree
  const data = [];
  //recuperation des courriers
  const getDoc = async () => {
    await axiosRequest
      .get("/stats/count", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setDoc(data))
      .catch((err) => console.log(err));
  };

  //recuperation de la liste de dates
  const getDate = async () => {
    await axiosRequest
      .get("/stats/date", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setDate(data))

      .catch((err) => console.log(err));
  };

  //recuperation de la liste de courrier non livre
  const getNotLivred = async () => {
    await axiosRequest
      .get("/stats/notLivred", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setNotLivred(data))
      .catch((err) => console.log(err));
  };

   //recuperation de la liste de courrier non livre
   const getDocByDirection = async () => {
    await axiosRequest
      .get("/stats/countByDirection", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setDocByDirection(data))
      .catch((err) => console.log(err));
  };

  //recuperation de la liste de courrier non livre
  const getLivred = async () => {
    await axiosRequest
      .get("/stats/livred", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setLivred(data))
      .catch((err) => console.log(err));
  };

  //gere le changement de la date
  const handleChangeDate = (e) => {
    setCurrentDate(e.target.value);
  };
  //recperation des donnees pour le statistique
  useEffect(() => {
    getDoc();
    getDate();
    getNotLivred();
    getLivred();
    //recuperation du nombre de courriers pour chaque direction existant
    getDocByDirection()
  }, []);
  
  const only = [];
  if (doc.length !== 0) {
    doc.forEach((d) => {
      let data;
      if (d?.created_at) {
        data = { created_at: d?.created_at.substring(0, 7) };
        only.push(data);
      }
    });
  }


  

   //filtrer les courriers par direction par date
const docByDirectionByDate = docByDirection?.map((docs) => {
 

    return [docs[0], docs[1]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7)))]
  
    
  })
  
//access du nombre de courriers par direction par index statique
let fop = docByDirection.length > 0? docByDirection[1][1].length: 0
let ministre = docByDirection.length > 0? docByDirection[0][1].length: 0

  //ajout des donnees filtree
  if (only.length !== 0) {
    new Set(only).forEach((dc) => {
      const color = ["red", "orange", "green", "purple", "blue"];
      let random = Math.floor(Math.random() * color.length);
      let uv = doc.filter(
        (d) => d.created_at.substring(0, 7) == dc.created_at
      ).length;
      let pv = doc.filter(
        (d) => d.created_at.substring(0, 7) == (currentDate?currentDate:doc[doc.length - 1].created_at?.substring(0, 7))
      ).length;

      data.push({
        name: "courrier",
        courrier: uv,
        mensuel: pv,
        amt: dc.created_at,
        fill: color[random],
        Ministre:ministre,
        FOP:fop
      });
    });
  }

  

  //nombre de courriers par mois 

  //liste des dates non filtree
  const AMT = []

  doc.filter(dc => {
    AMT.push({amt:dc.created_at?.substring(0, 7)})
  })

  //liste de dates filtrees
const uniqueAMT = []
uniqueAMT.push({amt: AMT[0]?.amt, courrier: 0})
let index = 0
 for(let i=0; i< AMT.length; i++) {

    if(uniqueAMT[index].amt != AMT[i].amt){
        uniqueAMT.push({amt: AMT[i].amt, courrier: 0})
        index++
    }
 }

 //Calcul de nombre de courriers par uniqueAMT
 for(let i=0; i< uniqueAMT.length; i++) {
    doc.forEach(dc => {
        if(dc.created_at?.substring(0, 7) == uniqueAMT[i].amt){
            uniqueAMT[i].courrier+=1 
        }
    })
 }



// console.log(docByDirectionByDate);

 
  return (
    <>
      <div className="flex gap-4 items-center">
        <h3 className="text-gray-900 text-xl text-left ml-2.5 font-semibold">
          Statistiques Mensuel
        </h3>
        <select
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
        </select>
      </div>

      <div className="flex flex-wrap mt-5">
      <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-yellow-800">
                  <SiFlux />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Tous les courriers 
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    doc.length
                  }{" "}
                  <span className="text-blue-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-blue-800">
                  <SiPaperswithcode />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  courriers mensuel
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    doc.filter(
                      (dc) =>
                        dc?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : doc[doc.length - 1]?.created_at?.substring(0, 7))
                    ).length
                  }{" "}
                  <span className="text-blue-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-orange-600">
                  <SiPinboard />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Courriers En Attente
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    notLivred.filter(
                      (nt) =>
                        nt?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : nt?.created_at?.substring(0, 7))
                    ).length
                  }
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-green-600">
                  <FaThumbsUp />
                </div>
              </div>
              {/* Livre */}
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  courriers Livre
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    livred.filter(
                      (lv) =>
                        lv?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : livred?.created_at?.substring(0, 7))
                    ).length
                  }{" "}
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
              
            </div>
              
          </div>
              
        </div>
              {/* par direction */}
              {docByDirectionByDate.map((doc, index) => (              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-red-600">
                  <FaHouseFlag />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                    {doc[0]}
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
      
                  {doc[1].length}
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
              
            </div>
              
          </div>
          
              
              
        </div>))}


      {/* FIN par Direcion */}
      </div>
      <hr className="mt-5 mb-5" />

      {/* Ici commence les deux  premiers graphiques */}
      <h3 className="text-gray-900 text-xl text-left ml-2.5 font-semibold">
        Graphiques
      </h3>

      <div className="flex flex-wrap justify-evenly w-[100%] items-center gap-y-4 p-3 mt-10">
        <LineChart width={500} height={300} data={data}>
          <Line type="monotone" dataKey="courrier" stroke="#8884d8" />
          <Line type="monotone" dataKey="mensuel" stroke="green" />
          <Line type="monotone" dataKey="Ministre" stroke="red" />
          <Line type="monotone" dataKey="FOP" stroke="blue" />a
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="" />
          <YAxis />
          <Legend />
        </LineChart>
        <BarChart width={500} height={300} data={uniqueAMT}>
          <XAxis dataKey="amt" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="courrier" fill="#8884d8" barSize={50} />
        </BarChart>
      </div>

      {/*Graphique pour le statistique periodique  */}
      <hr className="mt-5 mb-5" />

      <div className="flex flex-wrap  gap-4 items-center">
        <h3 className="text-gray-900 text-xl text-left ml-2.5 font-semibold">
          Statistiques Periodique
        </h3>
            <div className="w-[200px] flex mt-2 lg:mt-0 justify-evenly gap-x-5 ">
              <div >
              <label htmlFor="" className="text-gray-800 font-medium" >Debut</label>
                <input className="text-gray-900 p-2 rounded-md w-full"  type="date" name="" id="" />
              </div>
              <div >
              <label htmlFor="" className="text-gray-800 font-medium">Fin</label>
              <input  className="text-gray-800 p-2 rounded-md w-full" type="date" name="" id="" />
              </div>
            </div>
      </div>
      <div className="flex flex-wrap mt-5">
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-blue-800">
                  <SiPaperswithcode />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total Dossiers
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    doc.filter(
                      (dc) =>
                        dc?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : doc?.reverse()[0]?.created_at?.substring(0, 7))
                    ).length
                  }{" "}
                  <span className="text-blue-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-orange-600">
                  <SiPinboard />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total En Attente
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    notLivred.filter(
                      (nt) =>
                        nt?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : doc?.reverse()[0]?.created_at?.substring(0, 7))
                    ).length
                  }
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-green-600">
                  <FaThumbsUp />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total Livre
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    livred.filter(
                      (lv) =>
                        lv?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : doc?.reverse()[0]?.created_at?.substring(0, 7))
                    ).length
                  }{" "}
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5 mb-5" />
      <ResponsiveContainer width={"100%"} height={500}>
        <LineChart
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
          <XAxis dataKey="" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="courrier"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="mensuel" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      {/* radial statistique */}
      <ResponsiveContainer width={"100%"} height={600}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={data}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            clockWise
            dataKey="courrier"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Stats;
