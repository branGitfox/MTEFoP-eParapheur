import React, { useContext, useEffect, useId, useState } from "react";
import { FaSearch } from "react-icons/fa";
import TdData from "../components/TdData";
import axiosRequest from "../axiosClient/axiosClient";
import { Oval } from "react-loader-spinner";
import { userContext } from "../components/ContextWrapper";
import { IoReloadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
function Tracker() {
  const [loader, setLoader] = useState(false); //L'etat du loader
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN")); //recuperation de la cle d'access au serveur (access_token)
  const [docs, setDocs] = useState([])
  const [search, setSearch] = useState("")
  const [freshStatus, setFreshStatus] = useState(false)
  const {user} = useContext(userContext)
  const fresh = () => {
    setFreshStatus(!freshStatus)
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //filtrage des recherches
  const filtered = docs.filter((doc) => {
      if (doc.proprietaire?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }

      if (doc.chrono?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }

      if (doc.ref?.toLowerCase().includes(search?.toLowerCase())) {
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
     toast.error('Verifiez votre connexion internet')
    }
  };

  //appel de la fonction de recuperation
  useEffect(() => {
    getDocs();
  }, [freshStatus]);
  return (
    <>
      <div className=" w-[100%]  justify-evenly flex p-3 mb-5 relative text-black">
          <div className="w-[80%] h-12 flex justify-center relative ">
                <input
            onChange={handleChange}
            value={search}
            type="text"
            className="border  p-2  w-full rounded-md focus:outline-blue-900 shadow"
            placeholder="rechercher"
          />
          <FaSearch
            size={20}
            className="absolute  text-gray-900 right-2 top-4 "
          />
          </div>
      
          <button onClick={fresh} className="bg-blue-900 text-white flex justify-between items-center px-3   py-2 rounded-md"><IoReloadOutline className="inline mr-2"/>Actualiser</button>
      </div>
      <div className="w-full overflow-x-auto overflow-y-scroll max-h-[83%] ">
        <table className="w-full whitespace-no-wrap ">
          <thead >
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-gray-50 ">
              <th className="px-4 py-3 text-gray-800">Chrono</th>
              <th className="px-4 py-3 text-gray-800">Provenance</th>
              <th className="px-4 py-3 text-gray-800">Ref</th>
              <th className="px-4 py-3 text-gray-800">Proprietaire</th>
              <th className="px-4 py-3 text-gray-800">CIN</th>
              <th className="px-4 py-3 text-gray-800">Tel</th>
              <th className="px-4 py-3 text-gray-800">Motif</th>
              <th className="px-4 py-3 text-gray-800">Caracteristique</th>
              <th className="px-4 py-3 text-gray-800">Direction</th>
              <th className="px-4 py-3 text-gray-800">Date</th>
              <th className="px-4 py-3 text-gray-800">Livre</th>
              <th className="px-4 py-3 text-gray-800">Porte</th>
              {
                user.role =='admin' && <th className="px-4 py-3 text-gray-800">Actions</th>
              }
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
              {filtered?.reverse().map((data, index) => (
                <>
                  <TdData data={data} doc_id={data.c_id} key={useId} user={user} fresh={freshStatus} setFresh={setFreshStatus}/>
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
