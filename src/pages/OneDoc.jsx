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

    const submit = () => null
    const handleChange = () => null
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
              wrapperClass="absolute left-[48%] lg:left-[57%] z-50"
            />):(

                <>
                     <h3 className="text-gray-900 text-2xl ml-2.5 font-semibold ">
                             Transfert D'un Courrier
                    </h3>
            <form
                onSubmit={submit}
                className="w-[100%]  m-auto  p-10 bg-white rounded-md shadow mt-5 md:mt-10"
            >
                <div className="mb-5">
          <label
            htmlFor="Proprietaire"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Proprietaire
          </label>
          <input
            type="text"
            disabled
            placeholder={doc?.propr}
            id="Proprietaire"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="Motif"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Motif
          </label>
          <input
            type="text"
            disabled
            placeholder={doc?.motif}
            id="Motif"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="Motif"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Caracteristique
          </label>
          <input
            type="text"
            disabled
            placeholder={doc?.caracteristique}
            id="caracteristique"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="provenance"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Provenance
          </label>
          <input
            type="text"
            disabled
            placeholder={doc?.provenance}
            id="provenance"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="reference"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Reference
          </label>
          <input
            type="text"
            disabled
            placeholder={doc?.chrono}
            id="reference"

            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          />
        </div>

            </form>
                </>

            )}
    </>
  )
}

export default OneDoc