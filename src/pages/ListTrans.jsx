
import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { userContext } from "../components/ContextWrapper";
import { BiTransfer } from "react-icons/bi";
import axiosRequest from "../axiosClient/axiosClient";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ListTrans() {
    const { user } = useContext(userContext);
    const [docsByDirection, setDocsByDirection] = useState([])
    const [loader, setLoader] = useState(false); //L'etat du loader
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState("")
      const [updateLivre, setUpdateLivre] = useState(false)
      const navigate = useNavigate()
    //recupere la liste des courrier par direction
    const fetchByDirection = async () => {
      setLoader(true)
      await axiosRequest.get('/docsByDirection', {headers:{Authorization:`Bearer ${token}`}})
      .then(({data}) => setDocsByDirection(data))
      .then(() => setLoader(false))
      .catch((err) => toast.error(err?.response?.data?.message))
      .finally(() => setLoader(false))
    }
  
  
  
    //appelle de fechByDirection
    useEffect(() => {
      fetchByDirection()
    }, [reload, updateLivre])
  
    //filtre la barre de recherche
    const filtered = docsByDirection.filter((doc) => {
      if (doc.propr?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
  
      if (doc.chrono?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
  
      if (doc.ref?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
  })
  
  //prend la valeur de la barre de recherche
    const handleChange = (e) => {
      setSearch(e.target.value)
    };
  
    //actualise les donnees
    const fresh = () => setReload(!reload);
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

        <button
          onClick={fresh}
          className="bg-blue-900 text-white flex justify-between items-center px-3   py-2 rounded-md"
        >
          <IoReloadOutline className="inline mr-2" />
          Actualiser
        </button>
      </div>
    </>
  )
}

export default ListTrans