import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { userContext } from "../components/ContextWrapper";
import { BiTransfer } from "react-icons/bi";
import axiosRequest from "../axiosClient/axiosClient";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ListDoc() {
  const { user } = useContext(userContext);
  const [docsByDirection, setDocsByDirection] = useState([])
  const [loader, setLoader] = useState(false); //L'etat du loader
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState("")
    const [updateLivre, setUpdateLivre] = useState(false)
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

  //affiche les courriers par (ID)
  const showDocByOne = (id_doc) => {

  }

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
      <div className="w-full overflow-x-auto overflow-y-scroll max-h-[83%] ">
        <table className="w-full whitespace-no-wrap ">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-blue-100">
              <th className="px-4 py-3 text-gray-800">Chrono</th>
              <th className="px-4 py-3 text-gray-800">Provenance</th>
              <th className="px-4 py-3 text-gray-800">Ref</th>
              <th className="px-4 py-3 text-gray-800">Proprietaire</th>
              <th className="px-4 py-3 text-gray-800">Motif</th>
              <th className="px-4 py-3 text-gray-800">Caracteristique</th>
              <th className="px-4 py-3 text-gray-800">Agent</th>
              <th className="px-4 py-3 text-gray-800">Date</th>
              <th className="px-4 py-3 text-gray-800">Livre</th>
              <th className="px-4 py-3 text-gray-800 ">Transferer</th>

              {user.role == "admin" && (
                <th className="px-4 py-3 text-gray-800">Actions</th>
              )}
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
          ) :(
        
          <tbody className="bg-white divide-y ">
                <DocByDirection token={token} docsByDirection={filtered} updateLivre={updateLivre} setUpdateLivre={setUpdateLivre}/>
          </tbody>)}
        </table>
      </div>
    </>
  );
}

const DocByDirection = ({docsByDirection, token, updateLivre, setUpdateLivre}) => {
    return (
        <>
         {docsByDirection.map((doc, index) => <DocItems key={index} token={token} doc={doc} ind={index} setUpdateLivre={setUpdateLivre} updateLivre={updateLivre}/>)}
        </>
    )
}

const DocItems = ({doc, ind, token, updateLivre, setUpdateLivre}) => {
    const [livreLoader, setLivreLoader] = useState(false)
    //change le status livre
const  changeLivreStatus= async (id_doc) => {
    setLivreLoader(true)
    await axiosRequest.post(`/docUpdateLivre/${id_doc}`,{}, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
    .then(({data}) => toast.success(data.message))
    .then(() => setLivreLoader(false))
    .then(() => setUpdateLivre(!updateLivre))
    .catch((err) => toast.error(err?.response?.data?.message))
    .finally(() => setLivreLoader(false))
}
    return (
        <tr key={ind} className="text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{doc.chrono}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{doc.provenance}</td>
        <td className="px-4 py-3 text-sm">{doc.ref}</td>
        <td className="px-4 py-3 text-sm">{doc.propr}</td>
        <td className="px-4 py-3 text-sm">{doc.motif}</td>
        <td className="px-4 py-3 text-sm">{doc.caracteristique}</td>
        <td className="px-4 py-3 text-sm">{doc.name}</td>
        <td className="px-4 py-3 text-sm">{doc.created_at}</td>
        <td className="px-4 py-3 text-sm">
          <button onClick={() =>changeLivreStatus(doc.c_id)} disabled={doc.status =='non reçu'?false:true} className={` ${doc.status =='non reçu'?'bg-green-500':'bg-gray-600'} px-3 py-2  text-gray-50 rounded-2xl`}>
            {livreLoader?(     <Oval
              visible={true}
              height="15"
              width="15"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
            
            />):<FaCheck />}
            
          </button>
        </td>
        <td className="px-8 py-3 text-sm">
          <button disabled={doc.transfere =='non'?false:true} onClick={() => console.log('hello')
          }  className={`${doc.transfere =='non'?'':'bg-gray-600'} px-3 py-2 bg-blue-500 text-gray-50 rounded-2xl`}>
    
            <BiTransfer />
           
          </button>
        </td>
      </tr>
    )
}

export default ListDoc;
