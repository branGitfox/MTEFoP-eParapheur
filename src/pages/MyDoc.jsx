import React, { useEffect, useState } from "react";
import axiosRequest from "../axiosClient/axiosClient";
import { Oval } from "react-loader-spinner";
import { useId } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { toast } from "react-toastify";
function MyDoc() {
  const [doc, setDoc] = useState({});
  const [search, setSearch] = useState({});
  const [docLoading, setDocLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [historyLoader, setHistoryLoader] = useState(false);

  //gere le changement de la valeur de la barre de recherche
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((search) => ({ ...search, [name]: value }));
  };

  //envoi de la reference au serveur
  const submit = async (e) => {
    setDocLoading(true);
    setShow(false);
    e.preventDefault();
    try {
      await axiosRequest
        .post("findDoc", search, {
          headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
        })
        .then(({ data }) => setDoc(data))
        .then(() => setDocLoading(false))
        .catch((err) => console.log("").finally(() => setDocLoading(false)));
    } catch (err) {
      toast.error("Verifiez votre connexion internet");
    }
  };

  //boutton d'affichage de l'historique
  const showMove = async (c_id) => {
    setShow(true);
    setHistoryLoader(true);
    await axiosRequest
      .get(`/getDocsHistory/${c_id}`, {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
      })
      .then(({ data }) => setHistory(data))
      .then(() => setHistoryLoader(false))
      .catch((err) => console.log(err))
      .finally(() => setHistoryLoader(false));
  };

  //    useEffect(() => {
  //     setShow(false)
  //    }, [])

  return (
    <div className="relative">
      <div className="w-[100%] h-screen bg-white relative overflow-y-scroll p-5">
       

        {/* tailwind stepper  */}
          {history.length > 0?(   <ul class="relative flex flex-row gap-x-2 top-[68px] "> 
            {history.map((h, index) => (<li class="flex items-center gap-x-2 shrink basis-0 flex-1 group">
            <div class="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
              <span class="size-7 flex justify-center items-center shrink-0 bg-blue-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                {index + 1}
              </span>
              <span class="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
                {h.nom_serv}
              </span>
            </div>
            <div class="w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
          </li>))}
    

          
        </ul>):""}

        {/* fin tailwind stepper */}

        <h1 className=" relative top-[68px] text-blue-500 mt-10 text-center text-3xl font-bold">
          Suivre mon dossier
        </h1>
        <p className="relative top-[68px] text-gray-900 text-center mt-5">
          Pour suivre votre dossier il suffit d'entrer la reference dans la
          barre de recherche ci dessous.Puis appuyer sur le boutton
          "rechercher".
        </p>
        <form
          onSubmit={submit}
          className="lg:w-[50%] mx-auto h-12  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly"
        >
          <input
            onChange={handleChange}
            name="ref"
            value={search?.ref}
            type="text"
            className="px-2 py-3 w-full border-2 border-gray-500 text-gray-900 shadow-sm focus:outline-blue-900 rounded-3xl"
            placeholder="la reference de votre dossier ici"
          />
          <button className="bg-blue-500 rounded-3xl px-4 py-3">
            Rechercher
          </button>
        </form>
        <div className="lg:w-[50%] mx-auto  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly w-full overflow-x-auto  ">
          {docLoading ? (
            <Oval
              visible={true}
              height="30"
              width="30"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <>
              <table className="w-full whitespace-no-wrap ">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-gray-50 ">
                    <th className="px-4 py-3 text-gray-800">Chrono</th>
                    <th className="px-4 py-3 text-gray-800">Provenance</th>
                    <th className="px-4 py-3 text-gray-800">Ref</th>
                    <th className="px-4 py-3 text-gray-800">Proprietaire</th>
                    <th className="px-4 py-3 text-gray-800">Motif</th>
                    <th className="px-4 py-3 text-gray-800">Caracteristique</th>
                    <th className="px-4 py-3 text-gray-800">Direction</th>
                    <th className="px-4 py-3 text-gray-800">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700">
                    {doc ? (
                      <>
                        <td className="px-4 py-3 text-sm">{doc?.chrono}</td>
                        <td className="px-4 py-3 text-sm">{doc?.provenance}</td>
                        <td className="px-4 py-3 text-sm">{doc?.ref}</td>
                        <td className="px-4 py-3 text-sm">
                          {doc?.proprietaire}
                        </td>
                        <td className="px-4 py-3 text-sm">{doc?.motif}</td>
                        <td className="px-4 py-3 text-sm">
                          {doc?.caracteristique}
                        </td>
                        <td className="px-4 py-3 text-sm">{doc?.nom_dir}</td>
                        <td className="px-4 py-3 text-sm">{doc?.created_at}</td>
                      </>
                    ) : (
                      <td colSpan={8} className=" text-center text-red-500">
                        Entrez une reference valide{" "}
                        <CgDanger className="inline w-5 h-5" />
                      </td>
                    )}{" "}
                  </tr>

                  {doc.chrono && (
                    <tr className="text-black">
                      <td colSpan={8} className="text-left lg:text-center ">
                        <button
                          onClick={() => showMove(doc.c_id)}
                          className="px-4 py-3 bg-blue-500 text-gray-50 rounded-3xl "
                        >
                          Afficher Mouvements{" "}
                          <IoIosArrowDown className="ml-2 inline" />
                        </button>
                      </td>
                    </tr>
                  )}

                  {show && (
                    <History
                      history={history}
                      loader={historyLoader}
                      all={true}
                    />
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const History = ({ loader, history, all }) => {
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
          wrapperClass=""
        />
      ) : (
        <tr>
          <td
            colSpan={12}
            className=" text-gray-800 flex-col justify-center m-auto"
          >
            {history.length > 0 ? (
              <ul class="lg:mx-auto px-5 py-5 grid max-w-md grid-cols-1 gap-10 sm:mt-10 lg:mt-5 lg:max-w-5xl lg:grid-cols-3">
                {history.map((h, index) => (
                  <HistoryData
                    key={useId}
                    index={index}
                    length={history.length}
                    history={h}
                    all={all}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-center text-red-500">
                Aucun transfert pour ce courrier{" "}
                <CgDanger className="text-red-500 inline w-5 h-5" />
              </p>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

const HistoryData = ({ history, index, length, all }) => {
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
        {all && (
          <div class="ml-6 lg:ml-0 lg:mt-10">
            <h3 class="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 capitalize">
              {history.type + " - " + history.created_at}
            </h3>
            <li>
              <span className="underline">Vers</span>: {history.nom_serv}
            </li>
            <li>
              <span className="underline">Porte</span>: {history.porte_serv}
            </li>
            <li>
              <span className="underline">Reference Initial</span>:{" "}
              {history.ref_initial}
            </li>
            <li>
              <span className="underline">Chrono</span>: {history.ref_propre}
            </li>

            {history.type == "recuperation" && (
              <li>
                <span className="underline">Recupere Par</span>: {history.propr}
              </li>
            )}
            <li>
              <span className="underline">Declenchee Par</span>: {history.name}
            </li>
            <h4 class="mt-2 text-base text-gray-700"> {history.description}</h4>
          </div>
        )}
      </li>
    </>
  );
};

export default MyDoc;
