import React, { useEffect, useState } from 'react'
import axiosRequest from '../axiosClient/axiosClient'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Oval } from 'react-loader-spinner'

function OneDoc() {

    const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //le token d'access
    const {id_doc} = useParams() //id du courrier dans le parametre du lien
    const [isLoading, setIsLoading] = useState(false)
    const [doc, setDoc] = useState({})
    //recupere un courrier par son :id
    const getOneDoc = async () => {
        setIsLoading(true)
        await axiosRequest.get(`/docByDirection/${id_doc}`, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setDoc(data))
        .then(() => setIsLoading(false))
        .catch(({response}) => toast.error(response.data?.message))
        .finally(() => setIsLoading(false))
    }

    //appel de getOneDoc
    useEffect(() => {
        getOneDoc()
    }, [])

    console.log(doc);
    
  return (
    <>
        {isLoading ? ( <Oval
              visible={true}
              height="30"
              width="30"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="absolute left-[57%] z-50"
            />):(<div>OneDoc</div>)}
    </>
  )
}

export default OneDoc