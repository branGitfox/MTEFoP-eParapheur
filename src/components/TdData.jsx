import React, { useEffect, useState } from 'react'
import { BiDotsHorizontal } from 'react-icons/bi';
import { FaArrowUp, FaCheckCircle,FaExclamationCircle} from "react-icons/fa";
import axiosRequest from '../axiosClient/axiosClient';
import { Oval } from 'react-loader-spinner';
function TdData({data, doc_id}) {
    const [showInfo, setShowInfo] = useState(false)
    const [infoLoader, setInfoLoader] = useState(false)
    const [history, setHistory] = useState([])
  

    //Active et desactive l'info
    const toggleShow = () => {
       setShowInfo(!showInfo)

      }

      //recuperation de l'historique de mouvement
      const getHistory = async () => {
      setInfoLoader(true)
      await axiosRequest.get(`/getDocsHistory/${doc_id}`, {headers:{"Access-Control-Allow-Origin":'http://127.0.0.1:8000'}})
      .then(({data}) => setHistory(data))
      .then(() => setInfoLoader(false))
      .catch((err) => console.log(err))
      .finally(() => setInfoLoader(false))
      }

        //Appel de la fonction de recuperation d'historique
        useEffect(() => {
            getHistory()
        }, [showInfo])
        console.log(history);
    
  return (
    <>
        <tr  className="text-gray-700">
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
                      {data.status ==='reçu'? ( <FaCheckCircle className="text-green-600 text-xl" />):( <FaExclamationCircle className='text-red-500 text-xl'/>)}
                    </td>
                    <td className="px-4 py-3 text-sm">{data.porte_dir}</td>

                    <td className="px-4 py-3 text-xs">
                        {showInfo === true? <FaArrowUp onClick={toggleShow} className="text-gray-400 text-xl" />: <BiDotsHorizontal onClick={toggleShow} className="text-gray-400 text-xl" />}
                     
                    </td>
                  </tr>
                  {showInfo &&  <History history={history} loader={infoLoader}/> }
                
    </>
  )
}

const History = ({loader, history}) => {
  return (
    <>
      {loader ? (<Oval  visible={true}
                    height="30"
                    width="30"
                    color="blue"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass="absolute left-1/2 z-50" />):(
      <tr>
          <td colSpan={12} className='text-center text-gray-800'>
              {history.map((h, index) => <HistoryData history={h}/>)}
          
           
          </td>
      </tr>
      )}
    </>
  )
}

const HistoryData = ({history}) => {
  return (
    <>
    <p className='text-black'>{history.created_at}</p>
    <p>{history.ref_propre}</p>
    <p>{history.ref_initial}</p>
    <p>{history.name}</p>
  </>
  )
}

export default TdData