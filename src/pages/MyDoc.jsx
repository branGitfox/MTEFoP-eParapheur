import React, { useEffect, useState } from 'react'
import axiosRequest from '../axiosClient/axiosClient'
import { Oval } from 'react-loader-spinner'
import { useId } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { CgDanger } from 'react-icons/cg'
import { toast } from 'react-toastify'
function MyDoc() {
    const [doc, setDoc] = useState({})
    const [search, setSearch] = useState({})
    const [docLoading, setDocLoading]= useState(false)
    const [history, setHistory] = useState([])
    const [show, setShow] = useState(false)
    const [historyLoader, setHistoryLoader] = useState(false)
 
    //gere le changement de la valeur de la barre de recherche
   const handleChange = (e) => {
        const {name, value} = e.target
        setSearch((search) => ({...search, [name]:value}))
   }

   //envoi de la reference au serveur
   const submit = async (e) => {
        setDocLoading(true)
        setShow(false)
        e.preventDefault()
        try{
               await axiosRequest.post('findDoc', search, {headers:{"Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setDoc(data))
        .then(() => setDocLoading(false))
        .catch((err) => console.log("")
        .finally(() => setDocLoading(false))
        )
        }catch(err){
          toast.error("Verifiez votre connexion internet")
        }
 
     
   }

   //boutton d'affichage de l'historique
   const showMove = async (c_id) => {
    setShow(true)
    setHistoryLoader(true)
        await axiosRequest.get(`/getDocsHistory/${c_id}`, {headers:{"Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setHistory(data))
        .then(() => setHistoryLoader(false))
        .catch((err) => console.log(err))
        .finally(() =>  setHistoryLoader(false)) 
   }

//    useEffect(() => {
//     setShow(false)
//    }, [])

   

   
  return (
    <div className='relative'>
        <div className="w-[100%] h-screen bg-white relative overflow-y-scroll p-5">
          {/* {history.length > 0?(<div className=" text-gray-800 flex-col justify-center m-auto w-full bg-red-500">
            <History history={history} loader={historyLoader} all={false} /></div>):""} */}


<ol class="flex items-center w-full relative top-[68px] justify-center bg-red-500">
    <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
        <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
    </li>
    <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
        <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
    </li>
    <li class="flex items-center w-full">
        <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
            </svg>
        </span>
    </li>
</ol>

            <h1 className=' relative top-[68px] text-blue-500 mt-10 text-center text-3xl font-bold'>Suivre mon dossier</h1>
            <p className='relative top-[68px] text-gray-900 text-center mt-5'>Pour suivre votre dossier il suffit d'entrer la reference dans la barre de recherche ci dessous.Puis appuyer sur le boutton "rechercher".</p>
            <form onSubmit={submit} className="lg:w-[50%] mx-auto h-12  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly">
                <input onChange={handleChange} name='ref' value={search?.ref} type="text" className='px-2 py-3 w-full border-2 border-gray-500 text-gray-900 shadow-sm focus:outline-blue-900 rounded-3xl' placeholder='la reference de votre dossier ici'/>
                <button className='bg-blue-500 rounded-3xl px-4 py-3'>Rechercher</button>
            </form>
            <div className="lg:w-[50%] mx-auto  relative top-[68px] mt-5 px-3 flex gap-x-2 justify-evenly w-full overflow-x-auto  ">
                {docLoading ? (<Oval
              visible={true}
              height="30"
              width="30"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />):(<><table className="w-full whitespace-no-wrap ">
          <thead >
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
          <tbody >
           <tr className="text-gray-700">
           {doc?( 
            <>
                <td className="px-4 py-3 text-sm">{doc?.chrono}</td>
                <td className="px-4 py-3 text-sm">{doc?.provenance}</td>
                <td className="px-4 py-3 text-sm">{doc?.ref}</td>
                <td className="px-4 py-3 text-sm">{doc?.proprietaire}</td>
                <td className="px-4 py-3 text-sm">{doc?.motif}</td>
                <td className="px-4 py-3 text-sm">{doc?.caracteristique}</td>
                <td className="px-4 py-3 text-sm">{doc?.nom_dir}</td>
                <td className="px-4 py-3 text-sm">{doc?.created_at}</td></>
           ):(<td colSpan={8} className=' text-center text-red-500'>Entrez une reference valide <CgDanger className='inline w-5 h-5'/></td>)} </tr>
         
            {doc.chrono &&   <tr className="text-black">
                <td colSpan={8} className='text-left lg:text-center '>
                    <button onClick={() => showMove(doc.c_id)} className='px-4 py-3 bg-blue-500 text-gray-50 rounded-3xl '>Afficher Mouvements <IoIosArrowDown className='ml-2 inline'/></button>
                </td>
            </tr>}
         
            {show&&  <History history={history} loader={historyLoader} all={true}/>}
          
          </tbody>
                
          </table>
                </>
        )}


            </div>
        </div>
    </div>
  )
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
              {history.length > 0?<ul class="lg:mx-auto px-5 py-5 grid max-w-md grid-cols-1 gap-10 sm:mt-10 lg:mt-5 lg:max-w-5xl lg:grid-cols-3">
                {history.map((h, index) => (
                  <HistoryData
                    key={useId}
                    index={index}
                    length={history.length}
                    history={h}
                    all={all}
                  />
                ))}
              </ul>:<p className="text-center text-red-500">Aucun transfert pour ce courrier <CgDanger className="text-red-500 inline w-5 h-5"/></p>}
              
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
          {all && (<div class="ml-6 lg:ml-0 lg:mt-10">
            <h3 class="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 capitalize">
              {history.type + " - " + history.created_at}
            </h3>
            <li>
            <span className="underline">Vers</span>:{" "}
            {history.nom_serv}
          </li>
          <li>
            <span className="underline">Porte</span>:{" "}
            {history.porte_serv}
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
          </div>)}
          
        </li>
      </>
    );
  };
  
export default MyDoc