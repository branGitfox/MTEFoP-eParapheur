import React, { useContext, useEffect, useState } from 'react'
import axiosRequest from '../axiosClient/axiosClient'
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Oval } from 'react-loader-spinner'
import { userContext } from '../components/ContextWrapper'


function OneDoc2() {
    const [formData, setFormData] =useState({})
    const {user}= useContext(userContext)
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN')) //le token d'access
    const {id_doc} = useParams() //id du courrier dans le parametre du lien
    const [isLoading, setIsLoading] = useState(false)
    const [doc, setDoc] = useState({})
    const [servLoading, setServLoading] = useState(false)
    const [servs, setServs] = useState([])
    const [propr, setPropr] = useState({})

    const navigate = useNavigate()

        
    
    const getServs = async () => {
        setServLoading(true)
        await axiosRequest.get(`services/${user.id_dir}`, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setServs(data))
        .then(() => setServLoading(false))
        .catch((err) => toast.error(err.response?.data?.message))
        .finally(() => setServLoading(false))
    }
    //recupere un courrier par son :id
    const getOneDoc = async () => {
        setIsLoading(true)
        await axiosRequest.get(`/docByService/${id_doc}`, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => setDoc(data))
        .then(() => setIsLoading(false))
        .catch(({response}) => toast.error(response.data?.message))
        .finally(() => setIsLoading(false))
       
    }

    
    
    
    //appel de getOneDoc
    useEffect(() => {
        getOneDoc()
    }, [])
    
    //appel de getServs
    useEffect(() => {
        getServs()
    }, [user])
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]:value}))
    }

    const handleChangePropr = (e) => {
        const {name, value} = e.target
        setPropr((propr) => ({...propr, [name]:value}))
    }
    const submit =async (e) => {
        e.preventDefault()
        let data
        if(formData.type == 'transfert'){
            data = {...formData, courrier_id:id_doc, user_id:user.id, status:"non reçu",current_trans_id:user.id_serv ,description:doc.motif, transfere:"non", ref_initial:doc.chrono}
        }else{
           data = {...formData, courrier_id:id_doc, user_id:user.id, status:"non reçu", ...propr, current_trans_id:user.id_serv, description:doc.motif, transfere:"non", ref_initial:doc.chrono}
        }

        
        await axiosRequest.post('/transDocMove', data, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
        .then(({data}) => toast.success(data.message))
        .then(() =>  navigate('/agent'))
        .catch(({response}) => toast.error(response.data.message))
        
   

    }

  
  
    
   
   
    
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
        <div className="mb-5">
          <label
            htmlFor="services"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Transferer vers (Service)
          </label>
          {servLoading?(<Oval
              visible={true}
              height="30"
              width="30"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />):(  <select
            onChange={handleChange}
            className="text-gray-900 w-full p-2 rounded"
            name="serv_id"
            id="services"
          >
            <option value="">- Selectionner ici -</option>
            {servs.map((serv, index)=><option key={index} value={serv.s_id}>{serv.nom_serv}</option>)}
          </select>)}  
        </div>
        <div className="mb-5">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Type de Mouvements
          </label>
       <select
            onChange={handleChange}
            className="text-gray-900 w-full p-2 rounded"
            name="type"
            id="type"
          >
            <option value="">- Selectionner ici -</option>
            <option value="transfert">Transfert</option>
            <option value="recuperation">Recuperation</option>
          </select> 
        </div>
        {formData.type =="recuperation" && <div className="mb-5">
          <label
            htmlFor="par"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Par (la personne qui recupere le courrier)
          </label>
          <input
            type="text"
            value={propr?.propr}
            onChange={handleChangePropr}
            placeholder='Recupereur'
            id="par"
            name='propr'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          />
        </div>
}
      
        <div className="mb-5">
          <label
            htmlFor="Chrono"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Chrono
          </label>
          <input
            type="text"
            value={formData?.chrono}
            onChange={handleChange}
            placeholder='Chronologie'
            id="Chrono"
            name='ref_propre'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          />
        </div>
        <button className='bg-blue-900 px-3 py-2 rounded-md' type='submit'>Transferer</button>
            </form>
                </>

            )}
    </>
  )
}

export default OneDoc2