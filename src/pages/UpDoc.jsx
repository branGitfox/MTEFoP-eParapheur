import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { Oval } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import axiosRequest from '../axiosClient/axiosClient';
import { toast } from 'react-toastify';
import { userContext } from '../components/ContextWrapper';
function UpDoc() {
      const [isLoading, setIsLoading] = useState(false); //etat du loader
      const {user} = useContext(userContext)
      const [token] = useState(localStorage.getItem("ACCESS_TOKEN")); //le token d'acces
    //   const [doc, setDoc] = useState({})
        const [waiting, setWaiting] = useState(false); // looder pour la recuperation des directions
          const [dir, setDir] = useState([]); //liste des directions
          const {id_doc} = useParams()
      const [formData, setFormData] = useState({  status: "non reçu",
        transfere:"non",
        user_id: user.id,})

      
          //recuperation de la liste de Direction
  const getDir = async () => {
    setWaiting(true);
    try{
        await axiosRequest
            .get("/dir", {
              headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000"},
            })
            .then(({ data }) => setDir(data))
            .then(() => setWaiting(false))
            .catch((err) => console.log(err).finally(() => setWaiting(false)));
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }


 
  };
        //appel a la fonction getDir dependant du chemin grace a (useLocation)
      useEffect(() => {
        getDir()
        getDoc()
      }, [location.pathname])

      const getDoc = async () => {
        try{
            await axiosRequest.get(`/getDoc/${id_doc}`, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
            .then(({data}) => setFormData(data))
            .catch((err) => console.log(err))
        }catch(err) {
            console.log(err);   
        }


      }

      //pour la redirection
        const Navigate = useNavigate()

    const handlechange = (e) => {
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]:value}))
    }
     console.log(formData);
     
      const submit = async (e) => {
        e.preventDefault()
        try{
            await axiosRequest.post(`/upDoc/${id_doc}`, formData, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
            .then(({data}) => toast.success(data.message))
            .then(() => Navigate('/scc/'))
            .catch((err) => toast.error(err.response?.data?.message))
        }catch(err){
            console.log("");
            
        }
      }
      
  return (
    <>
    <h3 className="text-gray-900 text-2xl ml-2.5 font-semibold ">
      Modification d'un Dossier
    </h3>
    <form
      onSubmit={submit}
      className="w-[100%]  m-auto  p-10 bg-white rounded-md shadow mt-5 md:mt-10 "
    >
      <div className="mb-5">
        <label
          htmlFor="chrono"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Chrono
        </label>
        <input
          type="text"
          onChange={handlechange}
          id="chrono"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="reference du dossier"
          name="chrono"
          value={formData.chrono}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="ref"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Reference
        </label>
        <input
          type="text"
          id="ref"
          onChange={handlechange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="chrono initial"
          name="ref"
          value={formData.ref}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="provenance"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Provenance
        </label>
        <input
          type="text"
          onChange={handlechange}
          id="provenance"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="Provenance"
          name="provenance"
          value={formData.provenance}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="prop"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Proprietaire
        </label>
        <input
          type="text"
          onChange={handlechange}
          id="prop"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="proprietaire du dossier"
          name="proprietaire"
          value={formData?.proprietaire}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="motif"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Motif
        </label>
        <input
          type="text"
          onChange={handlechange}
          id="motif"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5   "
          placeholder="objet du depot"
          name="motif"
          value={formData.motif}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="website"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Caracteristique
        </label>
        <select
          onChange={handlechange}
          className="text-gray-900 w-full p-2 rounded"
          name="caracteristique"
          id=""
        >
          <option value="">- Selectionner ici -</option>
          <option value="plis ferme" selected={formData.caracteristique == "plis ferme"?true:false}>Plis Ferme</option>
          <option value="normale" selected={formData.caracteristique == "normale"?true:false}>Normale</option>
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="website"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Direction
        </label>
        {waiting ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="blue"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <select
            onChange={handlechange}
            className="text-gray-900 w-full p-2 rounded"
            name="dir_id"
            id=""
          >
            <option value="">- Selectionner ici -</option>
            {dir.map((d, index) => (
              <option value={d.d_id} selected={d.d_id == formData.dir_id ?true:false} key={index}>
                {d.nom_dir}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="cin"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          CIN
        </label>
        <input
          type="text"
          id="cin"
          onChange={handlechange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="Votre CIN"
          name="cin"
          value={formData.cin}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="cin"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tel
        </label>
        <input
          type="text"
          id="tel"
          onChange={handlechange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="Votre tel"
          name="tel"
          value={formData.tel}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-10"
      >
        {" "}
        {isLoading ? <BeatLoader color="yellow" /> : "Enregistrer"}
      </button>
    </form>
  </>
  )
}

export default UpDoc