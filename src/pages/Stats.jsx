import { useEffect, useState } from "react";
import {FaFilter } from "react-icons/fa";
import { SiPaperswithcode, SiPinboard, SiUpcloud } from "react-icons/si";
import {


  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,

  PieChart,
  Pie,
  Cell
} from "recharts";
import axiosRequest from "../axiosClient/axiosClient";

import { BsClock } from "react-icons/bs";

import { HiOfficeBuilding } from "react-icons/hi";


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
    Utilisateurs
    
  })

     //filtrer les courriers par direction par date par periode
const docByDirectionByDateByPeriod = docByDirectionByPeriod?.map((docs) => {
 

  return [docs[0], docs[1]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7))), docs[2]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7))), docs[3]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0,7)))]

  
})
  
//access du nombre de courriers par direction par index statique
// let fop = docByDirection.length > 0? docByDirection[1][1]?.filter(d => d.created_at.substring(0, 7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0, 7))).length: 0
// let ministre = docByDirection.length > 0? docByDirection[0][1]?.filter(d => d.created_at.substring(0, 7) == (currentDate?currentDate:doc[doc.length - 1]?.created_at?.substring(0, 7))).length: 0
const color = ['blue', 'green', 'violet', 'maroon', 'yellow', 'purple', 'red'];

  //ajout des donnees filtree
  if (only.length !== 0) {
    new Set(only).forEach((dc, index) => {
      const color = ['blue', 'green', 'violet', 'maroon', 'yellow', 'purple', 'red'];
      // let random = Math.floor(Math.random() * color.length);
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
        fill: color[index],
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


const dataDir = []
docByDirectionByDateByPeriod.forEach((doc, index) => {
  const randomColor = ['blue', 'green', 'violet', 'maroon', 'yellow', 'purple', 'red']
  // const indexColor = Math.floor(Math.random() * randomColor.length)
  dataDir.push({name:doc[0],Courriers:doc[1].length, fill:randomColor[index]})
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

            <span className="font-bold text-gray-600"> {doc.length} </span>
        </div>

        <div className="mt-2 text-sm text-gray-400">Total Courriers</div>
    </a>

 
    <a href="#"
       className="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div className="flex flex-row items-center justify-center">
            <SiUpcloud className="text-cyan-500 mr-3" size={24}/>

            <span className="font-bold text-gray-600"> {number} </span>
        </div>

        <div className="mt-2 text-sm text-gray-400">Courriers Enregistrés</div>
    </a>
 
    <a href="#"
       className="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div className="flex flex-row items-center justify-center">
            <BsClock className="mr-3 text-orange-500"/>

            <span className="font-bold text-gray-600"> {notLivredByPeriod.length} </span>
        </div>

        <div className="mt-2 text-sm text-gray-400">En attente</div>
    </a>

    <a href="#"
       className="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div className="flex flex-row items-center justify-center">
            <SiPinboard className="mr-3 text-green-500"/>

            <span className="font-bold text-gray-600"> {    livredByPeriod.filter(
                      (lv) =>
                        lv?.created_at?.substring(0, 7) ==
                        (currentDate
                          ? currentDate
                          : lv?.created_at?.substring(0, 7))
                    ).length} </span>
        </div>

        <div className="mt-2 text-sm text-gray-400">Courriers Livrés</div>
    </a>
    {docByDirectionByDateByPeriod.map((d, index) =>(<a href="#"
                                                           className="flex h-20 w-40 bg-white shadow-lg flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div className="flex flex-row items-center justify-center">
            <HiOfficeBuilding className={`mr-3 text-${color[index]}-500`}/>

            <span className="font-bold text-gray-600"> {d[1].length}{'/'}<span className="text-green-500">{d[2].length}</span>{'/'}<span className="text-red-500">{d[3].length}</span></span>
        </div>

        <div className="mt-2 text-sm text-gray-400">Direction {d[0]}</div>
    </a>))
    }

</div>
  </div>
  <div className="mt-4  flex  flex-wrap lg:flex-nowrap w-full justify-center gap-5 px-10">
  <div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-10 shadow-lg">
  <h2 className="text-gray-700 mb-2 mt-2">Graphique Radial - Flux de Courriers par Direction</h2>

<ResponsiveContainer width="100%" height="100%" >
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
    <Bar dataKey="Courriers" fill="blue" radius={5} background={{ fill: '#eee' }} />
  </BarChart>
</ResponsiveContainer>

</div>
<div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-10 shadow-lg">
      <h2 className="text-gray-700 mb-2 mt-2">Graphique Radial - Flux de Courriers par Direction</h2>
  
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={dataDir}
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
      

{/* ********************************************************************************************************* */}
      {/*Graphique pour le statistique periodique  */}
      {/* <hr className="mt-5 mb-5" />

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
      </div> */}
      {/* <div className="flex flex-wrap mt-5">
                <div className="w-full md:w-1/2 xl:w-1/3 p-3"> */}
          {/* <div className="bg-white border rounded shadow p-2">
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
        </div> */}
        {/* <div className="w-full md:w-1/2 xl:w-1/3 p-3">
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
        </div> */}
        {/* <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-green-600">
                  <FaThumbsUp />
                </div>
              </div> */}
              {/* Livre */}
              {/* <div className="flex-1 text-right md:text-center">
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
              </div> */}
              
            {/* </div>
              
          </div> */}
              
        {/* </div> */}
        {/* {docByDirectionByDateByPeriod.map((d, index) => (              <div className="w-full md:w-1/2 xl:w-1/3 p-3">
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
                  <li className="text-red-800 font-bold ">Non Dechargee: {d[3].length}</li>
                </ul>
          </div>
          
              
              
        </div>))} */}
      {/* </div> */}
      {/* <hr className="mt-5 mb-5" /> */}
{/* <div className="w-full flex justify-center h-[300px] mt-10"> */}

      {/* <ResponsiveContainer width="70%" height="100%">
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
      {/* <ResponsiveContainer width={"100%"} height={600}>
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
      </ResponsiveContainer>  */}
    </>
  );
}

export default Stats;
