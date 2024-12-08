import React, { useEffect, useId, useState } from "react";
import { FaSearch } from "react-icons/fa";
import TdData from "../components/TdData";
import axiosRequest from "../axiosClient/axiosClient";
import { Oval } from "react-loader-spinner";
function Tracker() {
  const [loader, setLoader] = useState(false); //L'etat du loader
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN")); //recuperation de la cle d'access au serveur (access_token)
  const [docs, setDocs] = useState([])
  const [search, setSearch] = useState("")
  const [freshStatus, setFreshStatus] = useState(false)

  const fresh = () => {
    setFreshStatus(!freshStatus)
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //filtrage des recherches
  const filtered = docs.filter((doc) => {
    if (doc.propr.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }

    if (doc.chrono.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }

    if (doc.ref.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
  });

  //recuperation des courriers
  const getDocs = async () => {
    try {
      setLoader(true);
      await axiosRequest
        .get("/docs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000/api",
          },
        })
        .then(({ data }) => setDocs(data))
        .then(() => setLoader(false))
        .catch((err) => console.log(err))
        .finally(() => setLoader(false));
    } catch (err) {
      console.log("Erreur de connexion");
    }
  };

  //appel de la fonction de recuperation
  useEffect(() => {
    getDocs();
  }, [freshStatus]);
  return (
    <>
      <div className=" w-[100%]  justify-evenly flex p-3 mb-5 relative text-black">
    
          <input
            onChange={handleChange}
            value={search}
            type="text"
            className="border w-2/3 p-2 rounded-md focus:outline-blue-900 shadow"
            placeholder="rechercher"
          />
          <FaSearch
            size={20}
            className="absolute text-gray-900 right-[20%] md:right-[25.5%] top-6 "
          />
          <button onClick={fresh} className="bg-blue-900 text-white px-3   py-2 rounded-md">Actualiser</button>
      </div>
      <div className="w-full overflow-x-auto overflow-y-scroll max-h-[83%]">
        <table className="w-full whitespace-no-wrap">
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
              <th className="px-4 py-3 text-gray-800">Livre</th>
              <th className="px-4 py-3 text-gray-800">Porte</th>
              <th className="px-4 py-3 text-gray-800">Infos</th>
            </tr>
          </thead>
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
            <tbody className="bg-white divide-y ">
              {filtered.reverse().map((data, index) => (
                <>
                  <TdData data={data} doc_id={data.c_id} key={useId} />
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default Tracker;
