import React, { useEffect, useId, useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaArrowUp, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import axiosRequest from "../axiosClient/axiosClient";
import { Oval } from "react-loader-spinner";
function TdData({ data, doc_id }) {
  const [showInfo, setShowInfo] = useState(false);
  const [infoLoader, setInfoLoader] = useState(false);
  const [history, setHistory] = useState([]);

  //Active et desactive l'info
  const toggleShow = () => {
    setShowInfo(!showInfo);
  };

  //recuperation de l'historique de mouvement
  const getHistory = async () => {
    setInfoLoader(true);
    await axiosRequest
      .get(`/getDocsHistory/${doc_id}`, {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
      })
      .then(({ data }) => setHistory(data))
      .then(() => setInfoLoader(false))
      .catch((err) => console.log(err))
      .finally(() => setInfoLoader(false));
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
        <td className="px-4 py-3 text-sm">{data.propr}</td>
        <td className="px-4 py-3 text-sm">{data.motif}</td>
        <td className="px-4 py-3 text-sm">{data.caracteristique}</td>
        <td className="px-4 py-3 text-sm">{data.nom_dir}</td>
        <td className="px-4 py-3 text-sm">{data.created_at}</td>
        <td className="px-4 py-3 text-xs">
          {data.status === "reçu" ? (
            <FaCheckCircle className="text-green-600 text-xl" />
          ) : (
            <FaExclamationCircle className="text-red-500 text-xl" />
          )}
        </td>
        <td className="px-4 py-3 text-sm">{data.porte_dir}</td>

        <td className="px-4 py-3 text-xs">
          {showInfo === true ? (
            <FaArrowUp onClick={toggleShow} className="text-gray-400 text-xl" />
          ) : (
            <BiDotsHorizontal
              onClick={toggleShow}
              className="text-gray-400 text-xl"
            />
          )}
        </td>
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
          <td colSpan={12} className=" text-gray-800 flex-col justify-center">
            <div class="flex flex-col justify-center w-full p-5">
              {history.map((h, index) => (
                <HistoryData key={useId} index={index} history={h} />
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const HistoryData = ({ history, index }) => {
  return (
    <>
      <div class="flex">
        <div class="mr-4 flex flex-col items-center">
          <div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6 text-blue-800 dark:text-slate-200"
              >
                <path d="M12 5l0 14"></path>
                <path d="M18 13l-6 6"></path>
                <path d="M6 13l6 6"></path>
              </svg>
            </div>
          </div>
          <div class="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
        </div>
        <div class="pt-1 pb-8">
          <p class="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
            Step 1
          </p>
          <p class="text-gray-600 dark:text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            sagittis, quam nec venenatis lobortis, mirisus tempus nulla, sed
            porttitor est nibh at nulla. Praesent placerat enim ut ex tincidunt
            vehicula. Fusce sit amet dui tellus.
          </p>
        </div>
      </div>
    </>
  );
};

export default TdData;
