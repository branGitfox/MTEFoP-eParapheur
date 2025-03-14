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
  Tooltip,
  Legend,
  Bar,
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

  const data = []

  data.push({})
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
  <div className="mt-4 flex  w-full justify-center gap-5 px-10">
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
         <h2 className="text-gray-700 mb-2 mt-2">Graphique Radial - Flux de Courriers par Direction</h2>
       

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
                <h5 className="font-bold text-gray-500">Dechargés</h5>
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
                <h5 className="font-bold text-gray-500">Non Dechargés</h5>
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
                    <FaHouseFire
                      className={`text-${colors[index]}-500 text-center`}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-3xl text-gray-900 text-center">
                    {doc[1].length}
                  </h3>
                  <h5 className="font-bold text-gray-500">{doc[0]}</h5>
                  <ul>
                    <li className="text-green-800 font-bold ">
                      Dechargé(s): {doc[2]}
                    </li>
                    {/* <li className="text-red-800 font-bold ">Non Dechargee: {doc[3]}</li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
        {docNumberByServiceNoFilter.map((doc, index) => (
          <div className="w-[300px]">
            <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
              <div className="flex flex-col items-center justify-center">
                <div className="flex-shrink">
                  <div className="rounded-full p-3 bg-gray-300 ">
                    <FaHouseFire
                      className={`text-${colors[index]}-500 text-center`}
                    />
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
        <h2 className="mt-3 ml-2 font-bold text-gray-900 text-xl">
          {" "}
          <FaEye className="inline ml-1 text-blue-800 mr-1" size={25} />
          Trafics
        </h2>
        <form
          onSubmit={handleSubmitPeriod}
          className=" w-full md:w-[200px] flex    mt-2 lg:mt-0 justify-evenly gap-x-5 p-4 md:p-0"
        >
          <div>
            <label htmlFor="" className="text-gray-800 font-medium">
              Début
            </label>
            <input
              className="text-gray-900 p-2 rounded-md w-full"
              onChange={handlePeriod}
              name="start"
              type="date"
            />
          </div>
          <div>
            <label htmlFor="" className="text-gray-800 font-medium">
              Fin
            </label>
            <input
              className="text-gray-800 p-2 rounded-md w-full"
              onChange={handlePeriod}
              name="end"
              type="date"
            />
          </div>
          <button
            className="bg-blue-600 px-3 h-10 relative top-6 rounded-md"
            type="submit"
          >
            Valider
          </button>
        </form>
      </div>
      <div className="w-1/2 mx-auto h-50 flex justify-center items-center mt-10 text-violet-900 font-bold text-4xl border-2 p-5 border-gray-400">
        {view} <span className="text-xl ml-2">visiteur(s)</span>
      </div>

      <ResponsiveContainer
        width="80%"
        height="100%"
        className="mt-10 w-full flex justify-center bg-blue-200 mx-auto mb-10"
      >
        <LineChart width={300} height={500} data={chartDataView}>
          <Line
            type="monotone"
            dataKey="nbr"
            stroke="#8884d8"
            strokeWidth={2}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="red" strokeWidth={2} /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Dashboard;
