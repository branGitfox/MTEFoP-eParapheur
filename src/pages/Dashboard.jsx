import React, { useEffect, useState } from "react";
import { FaEye, FaFilter, FaHandPointDown, FaWallet } from "react-icons/fa";
import { FaHandBackFist, FaHouseFire, FaUserGroup } from "react-icons/fa6";
import axiosRequest from "../axiosClient/axiosClient";
import { AnimatedCounter } from  'react-animated-counter';

// import { ResponsiveContainer, LineChart, Line } from "recharts";
import {
  SiEnterprisedb,
  SiFlux,
  SiPaperswithcode,
  SiPinboard,
  SiUpcloud,
} from "react-icons/si";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Cell,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

function Dashboard() {
  const [period, setPeriod] = useState({ start: "", end: "" }); //pour le trafics
  const [period2, setPeriod2] = useState({ start: "", end: "" }); //pour les donnees globaux
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [view, setView] = useState();
  const [chartDataView, setChartDataView] = useState([]);
  const [staff, setStaff] = useState(0);
  const [docByDirectionByPeriod, setDocByDirectionByPeriod] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const [allDoc, setAllDoc] = useState([]);
  const [allDocGotByOwner, setAllDocGotByOwner] = useState([]);
  const [allDocNotGotByOwner, setAllDocNotGotByOwner] = useState([]);
  const [docByDirection, setDocByDirection] = useState([]);
  const [docNumberByServiceNoFilter, setDocNumberByServiceNoFilter] = useState(
    []
  );

  const handleSubmitPeriod = (e) => {
    e.preventDefault();
    getNumberOfView();
  };

  const handleSubmitPeriod2 = (e) => {
    e.preventDefault();
    getDocByDirection();
    getDocGotByOwner();
    getDocNotGotByOwner();
    getDocNumberByServiceNoFilter();
    getDocByDirectionByPeriod();
  };

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
      .post("/stats/gotByOwnerCount", period2, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setAllDocGotByOwner(data))
      .catch((err) => console.log(err));
  };

  //recuperation des courriers recuperer par son proprietaire
  const getDocNumberByServiceNoFilter = async () => {
    await axiosRequest
      .post("/stats/countByServiceNoFilter", period2, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setDocNumberByServiceNoFilter(data))
      .catch((err) => console.log(err));
  };

  //recuperation des courriers recuperer par son proprietaire
  const getDocNotGotByOwner = async () => {
    await axiosRequest
      .post("/stats/notGotByOwnerCount", period2, {
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
    const { name, value } = e.target;
    setPeriod((period) => ({ ...period, [name]: value }));
  };

  //gere le changement des dates periodiques  globaux
  const handlePeriod2 = (e) => {
    const { name, value } = e.target;
    setPeriod2((period2) => ({ ...period2, [name]: value }));
  };

  //recuperation du nombre de vues
  const getNumberOfView = async () => {
    try {
      await axiosRequest
        .post("/visitors/period", period, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        })
        .then(({ data }) => setView(data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  //recuperation du nombre de vues
  const getNumberOfViewChart = async () => {
    try {
      await axiosRequest
        .get("/visitors/charts", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        })
        .then(({ data }) => setChartDataView(data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const colors = ["blue", "purple", "pink", "red", "green", "yellow"];
  //recuperation de la liste de courrier non livre
  const getDocByDirection = async () => {
    await axiosRequest
      .post("/stats/countByDirectionAdmin", period2, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setDocByDirection(data))
      .catch((err) => console.log(err));
  };

  const getUserCount = async () => {
    try {
      await axiosRequest
        .get("/userCount", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        })
        .then(({ data }) => setStaff(data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  //recuperation de la liste de courrier non livre par periode
  const getDocByDirectionByPeriod = async () => {
    await axiosRequest
      .post("/stats/countByDirectionByPeriod", period2, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setDocByDirectionByPeriod(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getNumberOfView();
    getNumberOfViewChart();
    getDoc();
    getDocGotByOwner();
    getDocNotGotByOwner();
    getDocByDirection();
    getUserCount();
    getDocNumberByServiceNoFilter();
    getDocByDirectionByPeriod();
  }, []);

  const allOfDocByPeriod = [...docByDirectionByPeriod];
  let number = 0;
  allOfDocByPeriod.map((doc, index) =>
    doc[1].find(
      (f) =>
        f.created_at.substring(0, 7) ==
        (currentDate
          ? currentDate
          : doc[doc.length - 1].created_at?.substring(0, 7))
    )
  );
  allOfDocByPeriod.forEach((dc) => {
    number += dc[1].length;
  });

  const allOfDocByPeriodService = [...docNumberByServiceNoFilter];

  allOfDocByPeriodService.map((doc, index) =>
    doc[1].find(
      (f) =>
        f.created_at.substring(0, 7) ==
        (currentDate
          ? currentDate
          : doc[doc.length - 1].created_at?.substring(0, 7))
    )
  );


  const data = []

  data.push({})

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

       //filtrer les courriers par direction par date par periode
const docByDirectionByDateByPeriod = allOfDocByPeriod?.map((docs) => {
 

  return [docs[0], docs[1]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:allDoc[allDoc.length - 1]?.created_at?.substring(0,7))), docs[2]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:allDoc[allDoc.length - 1]?.created_at?.substring(0,7))), docs[3]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:allDoc[allDoc.length - 1]?.created_at?.substring(0,7)))]

  
})

// const docByServiceByDateByPeriod = allOfDocByPeriodService?.map((docs) => {
 

//   return [docs[0], docs[1]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:allDoc[allDoc.length - 1]?.created_at?.substring(0,7))), docs[2]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:allDoc[allDoc.length - 1]?.created_at?.substring(0,7))), docs[3]?.filter(dc => dc.created_at?.substring(0,7) == (currentDate?currentDate:allDoc[allDoc.length - 1]?.created_at?.substring(0,7)))]

  
// })
  const dataDir = []
docByDirectionByDateByPeriod.forEach((doc, index) => {
  const randomColor = ['blue', 'green', 'violet', 'maroon']
  const indexColor = Math.floor(Math.random() * randomColor.length)
  dataDir.push({name:doc[0],Courriers:doc[1].length, fill:randomColor[indexColor]})
} )


const dataServ = []
allOfDocByPeriodService.forEach((doc, index) => {
  const randomColor = ['blue', 'green', 'violet', 'maroon']
  const indexColor = Math.floor(Math.random() * randomColor.length)
  dataServ.push({name:doc[0],Courriers:doc[1].length, fill:randomColor[indexColor]})
} )


  //couleur de la graphique radial
  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
    color:"blue",
    
    
  };

  return (
    <>
      <div className="flex w-full gap-4 items-center justify-between mt-3">
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

        <form
          onSubmit={handleSubmitPeriod2}
          className="w-200px  gap-x-2 flex justify-evenly items-center text-gray-700 mr-2 "
        >
          <label htmlFor="" className="text-gray-700 font-medium">
            Début
          </label>
          <input
            type="date"
            onChange={handlePeriod2}
            name="start"
            id=""
            className="py-2 px-3 rounded-md shadow"
          />
          <label htmlFor="" className="text-gray-700 font-medium">
            Fin
          </label>

          <input
            type="date"
            onChange={handlePeriod2}
            name="end"
            id=""
            className="py-2 px-3 rounded-md shadow"
          />

          <button
            type="submit"
            className="py-2 px-3  bg-blue-600 rounded-lg hover:bg-blue-500 text-white"
          >
            <FaFilter className="mr-2 inline" /> Filtrer
          </button>
        </form>
      </div>
      <div className="flex flex-wrap mt-5 px-2 justify-center">
        <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
        <a href="#"
        class="flex h-20 w-[12rem] flex-col items-center justify-center bg-white shadow-lg rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div class="flex flex-row items-center justify-center">
        <FaUserGroup className="mr-3 text-yellow-600"/>
            <span class="font-bold text-gray-600"> {staff} </span>
        </div>

        <div class="mt-2 text-sm text-gray-400">Utilisateurs</div>
    </a>
          <a
            href="#"
            class="flex h-20 w-40 flex-col items-center justify-center bg-white shadow-lg rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
          >
            <div class="flex flex-row items-center justify-center">
              <SiPaperswithcode className="mr-3 text-blue-600" />
              <span class="font-bold text-gray-600"> {number} </span>
            </div>

            <div class="mt-2 text-sm text-gray-400">Total Courriers</div>
          </a>
           
        <a href="#"
        class="flex h-20 w-40 flex-col items-center justify-center bg-white shadow-lg rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div class="flex flex-row items-center justify-center">
        <FaHandBackFist className="mr-3 text-green-600"/>
            <span class="font-bold text-gray-600"> {allDocGotByOwner} </span>
        </div>

        <div class="mt-2 text-sm text-gray-400">Courriers Dechargés</div>
    </a>
    <a href="#"
        class="flex h-20 w-[12rem] flex-col items-center justify-center bg-white shadow-lg rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div class="flex flex-row items-center justify-center">
        <FaHandPointDown className="mr-3 text-orange-600"/>
            <span class="font-bold text-gray-600"> {allDocNotGotByOwner} </span>
        </div>

        <div class="mt-2 text-sm text-gray-400">Courriers Non Dechargés</div>
    </a>
    {docByDirection.map((doc, index) => (
          <a href="#"
          class="flex h-20 w-[12rem] flex-col items-center justify-center bg-white shadow-lg rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
          <div class="flex flex-row items-center justify-center">
          <FaHouseFire className="mr-3 text-cyan-600"/>
              <span class="font-bold text-gray-600"> {doc[1].length} </span>
          </div>
  
          <div class="mt-2 text-sm text-gray-400">{doc[0]}</div>
      </a>
    ))}
       {docNumberByServiceNoFilter.map((doc, index) => (
           <a href="#"
           class="flex h-20 w-[12rem] flex-col items-center justify-center bg-white shadow-lg rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
           <div class="flex flex-row items-center justify-center">
           <FaHouseFire className="mr-3 text-indigo-600"/>
               <span class="font-bold text-gray-600"> {doc[1].length} </span>
           </div>
   
           <div class="mt-2 text-sm text-gray-400">{doc[0]}</div>
       </a>
       ))}
        </div>
  <div className="mt-0 flex  w-full justify-center gap-5 px-10">
       <div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-10 shadow-lg">
         <h2 className="text-gray-700 mb-2 mt-2 flex justify-between"><p>Nombre Total de Visites</p>         
         <form
          onSubmit={handleSubmitPeriod}
          className=" flex   mt-2 lg:mt-0 justify-evenly gap-x-5 p-4 md:p-0"
        >
          
       
            <input
              className=" p-2 rounded-md shadow-lg"
              onChange={handlePeriod}
              name="start"
              type="date"
            />
          
       
      
            <input
              className=" p-2 rounded-md shadow-lg "
              onChange={handlePeriod}
              name="end"
              type="date"
            />
       
          <button
            className="bg-blue-900 text-white px-3 h-10 relative rounded-md"
            type="submit"
          >
            Valider
          </button>
        </form></h2>
          <div className="w-full flex justify-center h-full border items-center border-gray-200 rounded-md">
              <h2 >
                  <AnimatedCounter includeCommas={false} includeDecimals={false}  value={view} fontSize="5rem"  digitStyles={{ color:'#7393B3'}} />
              </h2>
            
          
          </div>
       
       </div>
       <div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-10 shadow-lg">  
         <h2 className="text-gray-700 mb-2 mt-2">Graphique de Trafic de Visites</h2>
       

         <ResponsiveContainer
        width="100%"
        height="100%"
        className=" w-full flex justify-center bg-blue-200 mx-auto rounded-md"
      >
        <LineChart width={300}  height={500} data={chartDataView}>
          <Line
            type="monotone"
            dataKey="nbr"
            stroke="#8884d8"
            strokeWidth={2}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="red" strokeWidth={2} /> */}
        </LineChart>
      </ResponsiveContainer>
       
       </div>
  </div>
  <div className=" flex  w-full justify-center gap-5 px-10">
      <div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-5 shadow-lg">
      <h2 className="text-gray-700 mb-2 mt-2">Flux de courriers par Direction</h2>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart
      width={500}
      height={300}
      data={dataDir}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
          {/* <Legend /> */}
      
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Courriers" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {dataDir.map((entry, index) => (
          <Cell key={`cell-${index}`} />
        ))}
      </Bar>
               {/* <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={style}
                /> */}
                
                    {/* <Legend /> */}
    </BarChart>
      </ResponsiveContainer>
      </div>
      <div className="w-full bg-white p-5 rounded-lg  py-2 flex flex-col justify-center h-[300px] mt-5 shadow-lg">
      <h2 className="text-gray-700 mb-2 mt-2">Flux de courriers par Service</h2>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart
      width={500}
      height={300}
      data={dataServ}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
          {/* <Legend /> */}
      
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Courriers" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {dataServ.map((entry, index) => (
          <Cell key={`cell-${index}`} />
        ))}
      </Bar>
               {/* <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={style}
                /> */}
                
                    {/* <Legend /> */}
    </BarChart>
      </ResponsiveContainer>
      </div>
  </div>         
  
</div>



    </>
  );
}

export default Dashboard;
