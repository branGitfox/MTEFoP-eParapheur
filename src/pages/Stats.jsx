import React, { useEffect, useState } from "react";
import {FaThumbsUp } from "react-icons/fa";
import { SiFlux, SiPaperswithcode, SiPinboard } from "react-icons/si";
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
import {  FaHouseFlag } from "react-icons/fa6";

function Stats() {
  const [doc, setDoc] = useState([]);
  const [date, setDate] = useState([]);
  const [notLivred, setNotLivred] = useState([]);
  const [notLivredByPeriod, setNotLivredByPeriod] = useState([]);
  const [livred, setLivred] = useState([]);
  const [livredByPeriod, setLivredByPeriod] = useState([]);
  const [docByDirection, setDocByDirection] = useState([]);
  const [docByDirectionByPeriod, setDocByDirectionByPeriod] = useState([]);
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN")); //token d'access pour l'API
  const [currentDate, setCurrentDate] = useState("");
  const [period, setPeriod] = useState({start:"", end:""}) //state pour contenir la date de debut et la date de fin pour le filtrage de la statistique periodique.
  const [docByPeriod, setDocByPeriod] = useState([]) //state pour contenir les courriers par periode debut et fin
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

   //recuperation de la liste de courrier non livre par periode
   const getNotLivredByPeriod = async () => {
    await axiosRequest
      .post("/stats/notLivredByPeriod",period, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setNotLivredByPeriod(data))
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

     //recuperation de la liste de courrier non livre par periode
     const getDocByDirectionByPeriod = async () => {
      await axiosRequest
        .post("/stats/countByDirectionByPeriod", period, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        })
        .then(({ data }) => setDocByDirectionByPeriod(data))
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

   //recuperation de la liste de courrier non livre par periode
   const getLivredByPeriod = async () => {
    await axiosRequest
      .post("/stats/livredByPeriod", period,  {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setLivredByPeriod(data))
      .catch((err) => console.log(err));
  };

  //gere le changement de la date
  const handleChangeDate = (e) => {
    setCurrentDate(e.target.value);
  };

  //recuperation des courriers par period
  const getDocByPeriod = async () => {
    try{
      await axiosRequest.post('/stats/period', period, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
      .then(({data}) => setDocByPeriod(data))
      .catch(err => console.log(err))
    }catch(err) {
      console.log('Erreur:', err.message);
      
    }
  }
  //recperation des donnees pour le statistique
  useEffect(() => {

    getDoc();
    getDate();
    getNotLivred();
    getLivred();
    //recuperation du nombre de courriers pour chaque direction existant
    getDocByDirection()
    //recupertion des courriers par periode debut et fin
    getDocByPeriod()
    getNotLivredByPeriod()
    getLivredByPeriod()
    getDocByDirectionByPeriod()


  }, []);

  const handleSubmitPeriod = (e) => {
    e.preventDefault()
    getDocByPeriod()
    getNotLivredByPeriod()
    getLivredByPeriod()
    getDocByDirectionByPeriod()
 
    
  }
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
 

    return [docs[0], docs[1]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7))), docs[2]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7))), docs[3]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7)))]
  
    
  })

     //filtrer les courriers par direction par date par periode
const docByDirectionByDateByPeriod = docByDirectionByPeriod?.map((docs) => {
 

  return [docs[0], docs[1]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7))), docs[2]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7))), docs[3]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7)))]

  
})
  
//access du nombre de courriers par direction par index statique
// let fop = docByDirection.length > 0? docByDirection[1][1]?.filter(d => d.created_at.substring(0, 7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0, 7))).length: 0
// let ministre = docByDirection.length > 0? docByDirection[0][1]?.filter(d => d.created_at.substring(0, 7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0, 7))).length: 0


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
        // DRFP:ministre,
        // DUGT:fop
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

//gere le changement des dates periodiques
const handlePeriod = (e) => {
  const {name, value} = e.target
  setPeriod((period) => ({...period, [name]:value}))
}

 console.log(docByPeriod);
 const dataPeriod = []
 dataPeriod.push({
  name: "courrier",
  mensuel: docByPeriod.length,
  courrier: doc.filter(d => d.created_at.substring(0, 7) == (currentDate?currentDate:doc[doc.length - 1].created_at?.substring(0, 7))).length,
});

console.log('Livred', docByDirectionByDateByPeriod);
const dataDir = []
docByDirectionByDateByPeriod.forEach((doc, index) => {
  dataDir.push({name:doc[0],Courriers:doc[1].length})
} )


const allOfDocByPeriod =  [...docByDirectionByPeriod]
let number = 0
allOfDocByPeriod.map((doc , index)=> doc[1].find(f =>f.created_at.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7))))
allOfDocByPeriod.forEach(dc => {
  number+= dc[1].length
})





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

        <form onSubmit={handleSubmitPeriod} className="w-1/2 flex justify-evenly items-center text-gray-700 mr-3">
              <label htmlFor="" className="text-gray-700 font-medium">Début</label>
              <input type="date"  onChange={handlePeriod} name="start" id="" className="py-2 px-3 rounded-md shadow"/>
              <label htmlFor="" className="text-gray-700 font-medium">Fin</label>

              <input type="date"  onChange={handlePeriod} name="end" id="" className="py-2 px-3 rounded-md shadow"/>
              <input type="submit"  className="py-2 px-3  bg-blue-600 rounded-lg hover:bg-blue-500 text-white" value='Filtrer'/>
        </form>
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
                  Courriers non dispatchés
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
                  courriers dispatchés
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    livred.filter(
                      (lv) =>
                        lv?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : lv?.created_at?.substring(0, 7))
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
              {docByDirectionByDate.map((d, index) => (              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-red-600">
                  <FaHouseFlag />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                    {d[0]}
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
      
                  {d[1].length}
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
          
            </div>
                  <ul>
                  <li className="text-green-800 font-bold ">Dechargé(s): {d[2].length}</li>
                  <li className="text-red-800 font-bold ">Non Dechargé(s): {d[3].length}</li>
                </ul>
          </div>
          
              
              
        </div>))}


      {/* FIN par Direcion */}
      </div>
      <hr className="mt-5 mb-5" />

      {/* Ici commence les deux  premiers graphiques */}
      <h3 className="text-gray-900 text-xl text-left ml-2.5 font-semibold">
        Représentation graphiques de courriers enregistrés
      </h3>

      <div className="flex justify-evenly w-[100%] h-[400px] items-center gap-y-4 p-3 mt-10">
      <ResponsiveContainer width="100%" height="100%">
                
        <BarChart width='100%' height='100%' data={uniqueAMT}>
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
          <Bar dataKey="courrier" fill="blue" barSize={50} />
        </BarChart>
        </ResponsiveContainer>
      </div>

{/* ********************************************************************************************************* */}
      {/*Graphique pour le statistique periodique  */}
      <hr className="mt-5 mb-5" />

      <div className="flex flex-wrap  gap-4 items-center">
        <h3 className="text-gray-900 text-xl text-left ml-2.5 font-semibold">
          Statistiques Periodique
        </h3>
            <form onSubmit={handleSubmitPeriod} className="w-[200px] flex mt-2 lg:mt-0 justify-evenly gap-x-5 ">
              <div >
              <label htmlFor="" className="text-gray-800 font-medium" >Début</label>
                <input className="text-gray-900 p-2 rounded-md w-full"  onChange={handlePeriod} name="start" type="date"  />
              </div>
              <div >
              <label htmlFor="" className="text-gray-800 font-medium">Fin</label>
              <input  className="text-gray-800 p-2 rounded-md w-full" onChange={handlePeriod} name="end"  type="date"  />
              </div>
              <button className="bg-blue-600 px-3 h-10 relative top-6 rounded-md" type="submit">Valider</button>
            </form>
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
                  courriers Enregistrés
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    number
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
                    notLivredByPeriod.length
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
                  courriers Livrés
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
                  {
                    livredByPeriod.filter(
                      (lv) =>
                        lv?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : lv?.created_at?.substring(0, 7))
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
        {docByDirectionByDateByPeriod.map((d, index) => (              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-red-600">
                  <FaHouseFlag />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                    {d[0]}
                </h5>
                <h3 className="font-bold text-3xl text-gray-900">
      
                  {d[1].length}
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
              
            </div>
            <ul>
                  <li className="text-green-800 font-bold ">Dechargé(s): {d[2].length}</li>
                  {/* <li className="text-red-800 font-bold ">Non Dechargee: {d[3].length}</li> */}
                </ul>
          </div>
          
              
              
        </div>))}
      </div>
      <hr className="mt-5 mb-5" />
<div className="w-full flex justify-center h-[300px] mt-10">

      <ResponsiveContainer width="70%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataDir}
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
          <Bar dataKey="Courriers" fill="blue" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>

</div>
      {/* radial statistique */}
      <ResponsiveContainer width={"100%"} height={600}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={dataDir}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill:"blue" }}
            background
            clockWise
            dataKey="Courriers"
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
