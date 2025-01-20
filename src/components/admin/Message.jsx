import React, { useEffect, useState } from 'react'
import { FaReadme } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosRequest from '../../axiosClient/axiosClient'
import { Oval } from 'react-loader-spinner'
function Message() {
  const [messages, setMessages] = useState([])
  const   [loading, setIsLoading] = useState(false)
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //token d'acces

  //recuperation de la liste de messages 
  const getMessages = async () => {
    setIsLoading(true)
    try{
        axiosRequest.get("/getMessages", {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
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
  }, [])
  
  return (
    <div className='w-[95%]  bg-white mx-auto mt-4 flex-grow overflow-y-scroll'>
        <h1 className='text-xl text-gray-900 font-semibold bg-white p-5'>Messages</h1>
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
          ):(messages.map((mess, index) =>   <ShowMessage mess={mess}/>))}
    </div>
  )
}

//component pour afficher le corps du message avec un effet toggle
const ShowMessage = ({mess}) =>  {
  const [show, setShow] = useState(false)

  const toggle = () =>  {
    setShow(!show)
  }
  return (
    <>
      <div className="w-full py-10 grid grid-cols-12 border-gray-200 border-b border-t ">
            <div className="col-span-6 text-gray-900 px-2 w-full flex flex-col items-start ">
              <h3><strong>De: </strong>{mess.email}</h3>
              <h4><strong>Objet: </strong>{mess.objet}</h4>
              <h5><strong>Date d'envoie: </strong>{mess.created_at}</h5>
            </div>
            <div className="col-span-6  w-full flex flex-col items-end px-2 justify-center">
               <Link onClick={toggle} className='text-gray-900 underline'>{show?"Lu":"Lire"}<FaReadme size={25} className='text-gray-500 inline ml-2'/></Link>
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