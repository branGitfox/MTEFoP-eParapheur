import React, { useEffect, useId, useState } from "react";
import {
  
  FaCheckCircle,
  FaEdit,
  FaExclamationCircle,

  FaTrashAlt,
} from "react-icons/fa";
import axiosRequest from "../axiosClient/axiosClient";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
function TdData({ data, doc_id, user, setFresh, fresh }) {
  const [showInfo, setShowInfo] = useState(false);
  const [infoLoader, setInfoLoader] = useState(false);
  const [history, setHistory] = useState([]);
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
  //navigation
  const navigate = useNavigate()


  //Active et desactive l'info
  const toggleShow = () => {
    setShowInfo(!showInfo);
  };

  //Supprimer un courrier
  const deleteDoc = async (id_courrier) => {
    try{
          await axiosRequest
      .get(`/delDoc/${id_courrier}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        },
      })
      .then(({ data }) => toast.success(data.message))
      .then(() => setFresh(!fresh))
      .catch((err) => console.log(err));
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }
  };

  //recuperation de l'historique de mouvement
  const getHistory = async () => {
    setInfoLoader(true);
    try{
    await axiosRequest
      .get(`/getDocsHistory/${doc_id}`, {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
      })
      .then(({ data }) => setHistory(data))
      .then(() => setInfoLoader(false))
      .catch((err) => console.log(err))
      .finally(() => setInfoLoader(false));
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }

  };

  //Appel de la fonction de recuperation d'historique
  useEffect(() => {
    getHistory();
  }, [showInfo]);

  return (
    <>
      <tr className="text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{data.chrono}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{data.provenance}</td>
        <td className="px-4 py-3 text-sm">{data.ref}</td>
        <td className="px-4 py-3 text-sm">{data.proprietaire}</td>
        <td className="px-4 py-3 text-sm">{data.cin}</td>
        <td className="px-4 py-3 text-sm">{data.tel}</td>
        <td className="px-4 py-3 text-sm">{data.motif}</td>
        <td className={`px-4 py-3 text-sm ${data.caracteristique =='plis ferme'?'underline decoration-red-500':'decoration-green-300'}`}>{data.caracteristique}</td>
        <td className="px-4 py-3 text-sm">{data.nom_dir}</td>
          <td className="px-4 py-3 text-sm">{data.porte_dir}</td>
        <td className="px-4 py-3 text-sm">{data.created_at}</td>{" "}
        <td className="px-4 py-3 text-xs">
          {data.status === "reçu" ? (
            <FaCheckCircle className="text-green-600 text-xl" />
          ) : (
            <FaExclamationCircle className="text-red-500 text-xl" />
          )}
        </td>

        <td className="px-4 py-3 text-xs">
          {showInfo === true ? (
            <IoIosArrowUp onClick={toggleShow} className="text-blue-500 text-xl cursor-pointer" />
          ) : (
            <IoIosArrowDown
              onClick={toggleShow}
              className="text-blue-500 text-xl cursor-pointer"
            />
          )}
        </td> 
              <td className="px-9 py-3 text-sm">
                <Link to={`/scc/upDoc/${data.c_id}`}>
                    <FaEdit
              cursor={"pointer"}
              color="green"
            />
                </Link>
        
          </td>     
            {user.role == "admin" && (
          <td className="px-9 py-3 text-sm">
            <FaTrashAlt
              onClick={() => deleteDoc(data.c_id)}
              cursor={"pointer"}
              color="red"
            />
          </td>
        )}
      </tr>
      {showInfo && <History history={history} loader={infoLoader} />}
    </>
  );
}

const History = ({ loader, history }) => {
  return (
    <>
      {loader ? (
        <Oval
          visible={true}
          height="30"
          width="30"
          color="blue"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass="absolute left-[57%] z-50"
        />
      ) : (
        <tr>
          <td
            colSpan={14}
            className=" text-gray-800 flex-col justify-center m-auto"
          >
            {history.length>0?      <ul class="lg:mx-auto px-5 py-5 grid max-w-md grid-cols-1 gap-10 sm:mt-10 lg:mt-5 lg:max-w-5xl lg:grid-cols-4">
              {history.map((h, index) => (
                <HistoryData
                  key={useId}
                  index={index}
                  length={history.length}
                  history={h}
                />
              ))}
            </ul>:(<p className="text-center text-red-500">Aucun transfert pour ce courrier <CgDanger className="text-red-500 inline w-5 h-5"/></p>)}
      
          </td>
        </tr>
      )}
    </>
  );
};

const HistoryData = ({ history, index, length }) => {
  return (
    <>
      <li key={index} class="flex-start group relative flex lg:flex-col">
        <span
          class="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300  lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
          aria-hidden="true"
        ></span>
        <div
          class={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-300  ${
            index == length - 1 ? "bg-blue-900 text-white" : "bg-gray-50"
          }  transition-all duration-200 group-hover:border-blue-900 group-hover:text-white group-hover:bg-blue-900`}
        >
          {index + 1}
        </div>
        <div class="ml-6 lg:ml-0 lg:mt-10">
          <h3 class="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 capitalize">
            {history.type + " - " + history.created_at}
          </h3>
          <li>
            <span className="underline">Vers</span>:{" "}
            {history.nom_serv??history.nom_dir+"(Direction)"}
          </li>
          <li>
            <span className="underline">Porte</span>:{" "}
            {history.porte_serv??history.porte_dir}
          </li>
          <li>
            <span className="underline">Reference Initial</span>:{" "}
            {history.ref_initial}
          </li>
          <li>
            <span className="underline">Chrono</span>: {history.ref_propre}
          </li>
            
          {history.type=="recuperation" &&     <li>
            <span className="underline">Recupere Par</span>: {history.propr}
          </li>}
          <li>
            <span className="underline">Declenchee Par</span>: {history.name}
          </li>
          <h4 class="mt-2 text-base text-gray-700"> {history.description}</h4>
        </div>
      </li>
    </>
  );
};

export default TdData;
