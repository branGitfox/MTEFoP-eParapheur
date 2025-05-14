import  { useContext, useEffect, useState } from "react";
import { FaExclamationCircle, FaCheckCircle, FaArrowLeft , FaArrowRight} from "react-icons/fa";

import { userContext } from "../components/ContextWrapper";

import axiosRequest from "../axiosClient/axiosClient";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";


function ListTrans() {
    const { user } = useContext(userContext);
    const [moveByDirection, setMoveByDirection] = useState([])
    const [loader, setLoader] = useState(false); //L'etat du loader
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState("")
        const [page, setPage] = useState(1)
        const [lines, setLines] = useState("all")
    
    
    //recupere la liste des courrier par direction
    const fetchByDirection = async () => {
      setLoader(true)
      try{
              await axiosRequest.get(`/moveTransferedToService?page=${page}&lines=${lines}`, {headers:{Authorization:`Bearer ${token}`}})
      .then(({data}) => setMoveByDirection(data))
      .then(() => setLoader(false))
      .catch((err) => toast.error(err?.response?.data?.message))  
      .finally(() => setLoader(false))
      }catch(err){
        toast.error("Verifiez votre connexion internet")
      }

    }
  
  
const changeLine = (e) => {
  setLines(e.target.value)
}

const nextPage = () => {
  setPage((page) => page + 1)
}
 
const previousPage = () => {
  setPage((page) => page - 1)
}

const pageLinks = []

for(let i =1; i<= moveByDirection?.last_page;i++) {
  pageLinks.push({number:i})
}

const gotoPage = (page) => {
  setPage(page)
}
  
    //appelle de fechByDirection
    useEffect(() => {
      fetchByDirection()
    }, [reload, lines, page])
  
    //filtre la barre de recherche
    const filtered = moveByDirection.data?.filter((doc) => {
      if (doc.proprietaire?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
  
      if (doc.ref_propre?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
  
      if (doc.ref_initial?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
      if (doc.created_at?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
      if (doc.caracteristique?.toLowerCase().includes(search?.toLowerCase())) {
        return true;
      }
      if (doc.motif?.toLowerCase().includes(search?.toLowerCase())) {
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
              <div className=" w-[100%]  justify-start gap-x-4  flex p-3 mb-5 relative text-black">
              <div className="relative">
              <span className="absolute inset-y-0 left-0 justify-start flex items-center pl-3">
            <svg className="w-full h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </span>


        <input value={search}   onChange={handleChange} type="text" className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Rechercher"/>
              </div>
              <button onClick={fresh} className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
    <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
    </svg>

    <span className="mx-1">Rafraichir</span>
</button>
<div className="flex items-center me-4">
        {/* <input id="inline-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500   focus:ring-2"/> */}
        <select onChange={changeLine} className="py-3 px-4 pe-9 block w-full bg-white shadow-lg border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
  <option value='all'>Afficher toutes les lignes</option>
  <option value='15'>15 lignes</option>
  <option value='50'>50 lignes</option>
  <option value='100'>100 lignes</option>
</select>
        {/* <label for="inline-checkbox" class="ms-2 text-sm font-medium text-gray-è00 ">Afficher Tout</label> */}
    </div>
        <div className="flex">
        <button disabled={page==1?true:false} onClick={previousPage}  className={`flex items-center px-4 py-2 mx-1 text-gray-500  ${page==1?'bg-gray-200 text-gray-500':'bg-blue-600 text-white'} rounded-md cursor-not-allowed`}>
           <FaArrowLeft className="mr-1"/> Précédent
        </button>
              
                {pageLinks.map((number, index) => (
                      <button key={index}  onClick={() => gotoPage(number.number)} className={`items-center hidden px-4 py-2 mx-1 text-gray-700 ${page!==number.number?'bg-white text-gray-500':'bg-blue-600 text-white'} transition-colors duration-300 transform  rounded-md sm:flex`}>
              {number.number}
            </button>
                ))}
    
    
        {/* <a href="#" class="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex   hover:bg-blue-600  hover:text-white ">
            2
        </a>
    
        <a href="#" class="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex  hover:bg-blue-600  hover:text-white ">
            3
        </a> */}
    
        <button disabled={page==moveByDirection?.last_page?true:false}  onClick={nextPage} className={`flex items-center px-4 py-2 mx-1  ${page<moveByDirection?.last_page?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'} transition-colors duration-300 transform  rounded-md`}>
            Suivant<FaArrowRight className="ml-1"/> 
        </button>
    </div>
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
            className="absolute  text-gray-900 right-2 top-4 "
          />
        </div> */}
{/* 
        <button
          onClick={fresh}
          className="bg-blue-900 text-white flex justify-between items-center px-3   py-2 rounded-md"
        >
          <IoReloadOutline className="inline mr-2" />
          Actualiser
        </button> */}
      </div>
      <div className="mx-auto w-[98%] overflow-x-auto overflow-y-scroll max-h-[80%] rounded-md ">
        <table className="w-full whitespace-no-wrap ">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-blue-100">
              <th className="px-4 py-3 text-gray-800">Chrono</th>
              <th className="px-4 py-3 text-gray-800">Provenance</th>
              <th className="px-4 py-3 text-gray-800">Service</th>
              <th className="px-4 py-3 text-gray-800">Porte</th>
              <th className="px-4 py-3 text-gray-800">Ref</th>
              <th className="px-4 py-3 text-gray-800">Type</th>
              <th className="px-4 py-3 text-gray-800">Proprietaire</th>
              <th className="px-4 py-3 text-gray-800">Cin</th>
              <th className="px-4 py-3 text-gray-800">Tel</th>
              <th className="px-4 py-3 text-gray-800">Motif</th>
              <th className="px-4 py-3 text-gray-800">Caracteristique</th>
              <th className="px-4 py-3 text-gray-800">Agent</th>
              <th className="px-4 py-3 text-gray-800">Date</th>
              <th className="px-4 py-3 text-gray-800">Livre</th>
      

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
                <DocByDirection token={token} docsByDirection={filtered}  />
          </tbody>)}
        </table>
      </div>
    </>
  )
}

const DocByDirection = ({docsByDirection}) => {

    return (
        <>
       
         {docsByDirection?.map((doc, index) => <DocItems key={index}  doc={doc} ind={index} />)}
        </>
    )
}

const DocItems = ({doc, ind}) => {

    return (
        <tr key={ind} className="text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{doc.ref_propre}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{doc.provenance}</td>
        <td className="px-4 py-3 text-sm">{doc.nom_serv??doc.nom_dir}</td>
        <td className="px-4 py-3 text-sm">{doc.porte_serv??doc.porte_dir}</td>
        <td className="px-4 py-3 text-sm">{doc.ref_initial}</td>
        <td className="px-4 py-3 text-sm">{doc.type}</td>
        <td className="px-4 py-3 text-sm">{doc.propr??doc.proprietaire}</td>
        <td className="px-4 py-3 text-sm">{doc.cin}</td>
        <td className="px-4 py-3 text-sm">{doc.tel}</td>
        <td className="px-4 py-3 text-sm">{doc.description}</td>
        <td className="px-4 py-3 text-sm">{doc.caracteristique}</td>
        <td className="px-4 py-3 text-sm">{doc.name}</td>
        <td className="px-4 py-3 text-sm">{doc.created_at}</td>
        <td className="px-4 py-3 text-xs">
          {doc.status === "reçu" ? (
            <FaCheckCircle className="text-green-600 text-xl" />
          ) : (
            <FaExclamationCircle className="text-red-500 text-xl" />
          )}
        </td>
        {/* <td className="px-8 py-3 text-sm">
          <button disabled={doc.transfere =='non'?false:true} onClick={() (doc.c_id)
          }  className={`${doc.transfere =='non'?'':'bg-gray-600'} px-3 py-2 bg-blue-500 text-gray-50 rounded-2xl`}>
    
            <BiTransfer />
           
          </button>
        </td> */}
      </tr>
    )
}
export default ListTrans