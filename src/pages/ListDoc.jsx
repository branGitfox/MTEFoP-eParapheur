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
  const { user } = useContext(userContext); // donne de l'utilisateur connectee
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
    try{
        await axiosRequest.get('/docsByDirection', {headers:{Authorization:`Bearer ${token}`}})
    .then(({data}) => setDocsByDirection(data))
    .then(() => setLoader(false))
    .catch((err) => console.log("")
    )
    .finally(() => setLoader(false))
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }
  
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
    if (doc.created_at?.toLowerCase().includes(search?.toLowerCase())) {
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
    navigate(`/sp/doc/${id_doc}`)
  }

  console.log(docsByDirection);
  
  docsByDirection.reverse()
  return (
    <>
      <div className=" w-[100%]  justify-start gap-x-4  flex p-3 mb-5 relative text-black">
      <div class="relative">
              <span class="absolute inset-y-0 left-0 justify-start flex items-center pl-3">
            <svg class="w-full h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </span>


        <input value={search}   onChange={handleChange} type="text" class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Rechercher"/>
      </div>
      <button onClick={fresh} class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
    <svg class="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
    </svg>

    <span class="mx-1">Rafraichir</span>
</button>
        {/* <div className="w-[80%] h-12 flex justify-center relative ">
          <input
            onChange={handleChange}
            value={search}
            type="text"
            className="border  p-2  w-full rounded-md focus:outline-blue-900 shadow"
            placeholder="rechercher"
          />
          <FaSearch
            size={20}
            className="absolute  text-gray-600 right-2 top-4 "
          />
        </div> */}

        {/* <button
          onClick={fresh}
          className="bg-blue-900 text-white flex justify-between items-center px-3   py-2 rounded-md"
        >
          <IoReloadOutline className="inline mr-2" />
          Actualiser
        </button> */}
      </div>
      <div className="w-full overflow-x-auto overflow-y-scroll max-h-[83%] ">
        <table className="w-full whitespace-no-wrap ">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-blue-100">
              <th className="px-4 py-3 text-gray-800">Chrono</th>
              <th className="px-4 py-3 text-gray-800">Provenance</th>
              <th className="px-4 py-3 text-gray-800">Ref</th>
              <th className="px-4 py-3 text-gray-800">Proprietaire</th>
              <th className="px-4 py-3 text-gray-800">Cin</th>
              <th className="px-4 py-3 text-gray-800">Tel</th>
              <th className="px-4 py-3 text-gray-800">Motif</th>
              <th className="px-4 py-3 text-gray-800">Caracteristique</th>
              <th className="px-4 py-3 text-gray-800">Agent</th>
              <th className="px-4 py-3 text-gray-800">Date</th>
              <th className="px-4 py-3 text-gray-800">Livre</th>
              <th className="px-4 py-3 text-gray-800 ">Transferer</th>

              {/* {user.role == "admin" && (
                <th className="px-4 py-3 text-gray-800">Actions</th>
              )} */}
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
                <DocByDirection token={token} docsByDirection={filtered} showDocByOne={showDocByOne} updateLivre={updateLivre} setUpdateLivre={setUpdateLivre}/>
          </tbody>)}
        </table>
      </div>
    </>
  );
}

const DocByDirection = ({docsByDirection, token, updateLivre, setUpdateLivre, showDocByOne}) => {
    return (
        <>
         {docsByDirection.map((doc, index) => <DocItems key={index} token={token} doc={doc} ind={index} showDocByOne={showDocByOne} setUpdateLivre={setUpdateLivre} updateLivre={updateLivre}/>)}
     
        </>
    )
}

const DocItems = ({doc, ind, token, updateLivre, setUpdateLivre, showDocByOne}) => {
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
        <td className="px-4 py-3 text-sm">{doc.proprietaire}</td>
        <td className="px-4 py-3 text-sm">{doc.cin}</td>
        <td className="px-4 py-3 text-sm">{doc.tel}</td>
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
        
     
          
          <button disabled={doc.transfere == 'oui' || doc.status =='non reçu'? true:false } onClick={() => showDocByOne(doc.c_id)
          }  className={`${doc.transfere =='oui' || doc.status=='non reçu'?'bg-gray-600':''} px-3 py-2 bg-blue-500 text-gray-50 rounded-2xl`}>
    
            <BiTransfer />
           
          </button>
           
        </td>
      </tr>
    )
}

export default ListDoc;
