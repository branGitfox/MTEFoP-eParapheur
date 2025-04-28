import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import axiosRequest from '../../axiosClient/axiosClient'
import { Oval } from 'react-loader-spinner'
function Message() {
  const [messages, setMessages] = useState([])
  const   [loading, setIsLoading] = useState(false)
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //token d'acces

    const [refreshData, setRefreshData] = useState(false)

  //recuperation de la liste de messages 
  const getMessages = async () => {
    setIsLoading(true)
    try{
       await axiosRequest.get("/getMessages", {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setMessages(data))
        .then(() => setIsLoading(false))

        .catch(({response}) => console.log(response.data.message))
        .finally(() => setIsLoading(false))
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }
  }

  
  useEffect(() => {
    getMessages()
  }, [refreshData])
  
  return (
    <div className='w-[95%]  bg-white mx-auto mt-4 flex-grow overflow-y-scroll rounded-md'>
        <h2 className="text-lg font-medium text-gray-800  p-5 rounded-md">Messages</h2>

        <hr className='text-gray-200 w-full border-2'/>
        {loading?(
            <Oval
              visible={true}
              height="30"
              width="30"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="absolute left-[57%] z-50"
            />
          ):(messages.map((mess, index) =>   <ShowMessage refresh={setRefreshData} key={index} mess={mess}/>))}
    </div>
  )
}

//component pour afficher le corps du message avec un effet toggle
const ShowMessage = ({mess, refresh}) =>  {
  const [show, setShow] = useState(false)
    const token = localStorage.getItem("ACCESS_TOKEN")
  const toggle = () =>  {


          setShow(!show)


  }

  const deleteMessage = async (id) => {
      try{
          await axiosRequest.get(`/deleteMessages/${id}`, {headers:{Authorization:`Bearer ${token}`}})
              .then(() =>toast.success("Message supprime") )
              .then(() => refresh(true))
              .catch(() => toast.error("erreur de connexion"))
      }catch(err){
          toast.error("Erreur Serveur:"+err.message)
      }

  }

  return (
    <>
      <div className="w-full py-10 grid grid-cols-12 border-gray-200 border-b border-t rounded-md">
            <div className="col-span-6 text-gray-900 px-2 w-full flex flex-col items-start rounded-md">
                <h3 className="text-gray-800"><span className="font-medium">De:</span> {mess.email}</h3>
                <h4 className="text-gray-800"><span className="font-medium">Objet:</span> {mess.objet}</h4>
                <h5 className="text-gray-800"><span className="font-medium">Date d'envoie:</span> {mess.created_at}</h5>
            </div>
            <div className="col-span-6  w-full flex flex-row items-center px-2 justify-end gap-x-4">
               <button onClick={toggle} className='text-gray-900 underline'>{show?"Lu":"Lire"}</button>
                <button onClick={() => deleteMessage(mess.su_id)} className='text-red-900 underline'>Effacer</button>
            </div>
            {show&& <div className="col-span-12 p-4 text-center font-normal text-gray-800"> 
           <hr className='text-gray-200 w-full border-2 mb-10'/>
                {mess.message}
            </div>}
           
        </div>
    </>
  )
}
 
export default Message