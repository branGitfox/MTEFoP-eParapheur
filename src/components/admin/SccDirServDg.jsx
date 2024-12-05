import React, { useEffect, useState } from "react";
import axiosRequest from "../../axiosClient/axiosClient";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Oval } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SccDirServDg() {
  const [formDataDg, setFormDataDg] = useState({});
  const [formDataDir, setFormDataDir] = useState({});
  const [formDataServ, setFormDataServ] = useState({});
  const location = useLocation()
  const [isLoadingDg, setIsLoadingDg] = useState(false);
  const [isLoadingDir, setIsLoadingDir] = useState(false);
  const [isLoadingServ, setIsLoadingServ] = useState(false);
  const [waiting, setWaiting]= useState(false)
  const [dg, setDg] = useState([])
  const [dir, setDir] = useState([])

  //creation d'une nouvelle Direction Generale
  const submitDg =async  (e) => {
    setIsLoadingDg(true)
    e.preventDefault()
    await axiosRequest.post('/dg', formDataDg, {headers:{Accept:'application/json', "Access-Control-Allow-Origin":"http://127.0.0.1:8000/api"}})
    .then(({data}) => toast.success(data.message))
    .then(() => setIsLoadingDg(false))
    .catch((err) => toast.error(err?.response?.data?.message))
    .finally(() => setIsLoadingDg(false))
    
  }

  //creation d'une nouvelle Direction
  const submitDir = async (e) => {
    setIsLoadingDir(true)
    e.preventDefault()
    await axiosRequest.post('/dir', formDataDir, {headers:{Accept:'application/json', "Access-Control-Allow-Origin":"http://127.0.0.1:8000/api"}})
    .then(({data}) => toast.success(data.message))
    .then(() => setIsLoadingDir(false))
    .catch((err) => toast.error(err?.response?.data?.message))
    .finally(() => setIsLoadingDir(false))
  }

  //creation d'une nouveau Service
  const submitServ = async (e) => {
    setIsLoadingServ(true)
    e.preventDefault()
    await axiosRequest.post('/serv', formDataServ, {headers:{Accept:'application/json', "Access-Control-Allow-Origin":"http://127.0.0.1:8000/api"}})
    .then(({data}) => toast.success(data.message))
    .then(() => setIsLoadingServ(false))
    .catch((err) => toast.error(err?.response?.data?.message))
    .finally(() => setIsLoadingServ(false))
  }


  //Gere le changement du formulaire Direction Generale
  const handleChangeDg = (e) => {
    const {name, value} = e.target
    setFormDataDg((formDataDg) => ({...formDataDg, [name]:value}))
  }

   //Gere le changement du formulaire Direction Generale
   const handleChangeDir = (e) => {
    const {name, value} = e.target
    setFormDataDir((formDataDir) => ({...formDataDir, [name]:value}))
  }

     //Gere le changement du formulaire Direction Generale
     const handleChangeServ = (e) => {
        const {name, value} = e.target
        setFormDataServ((formDataServ) => ({...formDataServ, [name]:value}))
      }

  //recuperation de la liste de Direction General
  const getDg = async () => {
    setWaiting(true)
    await axiosRequest
      .get("/dg", {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
      })
      .then(({ data }) => setDg(data))
      .then(() => setIsLoadingDg(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingDg(false))
    
  };

  //recuperation de la liste de Direction
  const getDir = async () => {
   setWaiting(true)

    await axiosRequest
      .get("/dir", {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
      })
      .then(({ data }) => setDir(data))
      .then(() => setWaiting(false))

      .catch((err) => console.log(err)
      .finally(() => setWaiting(false))

      )
  };

  useEffect(() => {
    getDg()
    getDir()
  }, [location.pathname])

  return (
    <>
      <main className="w-full flex-grow p-6">
        <div className="leading-loose">
          <form className="p-3 bg-white rounded shadow-xl" onSubmit={submitDg}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer une Direction General
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="dg">
                Nom de la direction general
              </label>
              <input
                onChange={handleChangeDg}
                value={formDataDg?.nom_dg}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="dg"
                name="nom_dg"
                type="text"
                placeholder="Le Nom De La Direction General "
              />
            </div>
            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded-md"
                type="submit"
              >
                {isLoadingDg ? <BeatLoader color="yellow" /> : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>

        {/* form pour la creation d'une direction */}
        <hr className="mt-3"/>
        <div className="leading-loose">
          <form className="p-3 bg-white rounded shadow-xl" onSubmit={submitDir}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer une Direction
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="dir">
                Nom de la direction
              </label>
              <input
                onChange={handleChangeDir}
                value={formDataDir?.nom_dir}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="dir"
                name="nom_dir"
                type="text"
            
                placeholder="Le Nom Du Nouveau Utilisateur "
                aria-label="Name"
              />
            </div>
            <div className="mt-2">
              <label className="block text-md text-gray-900" htmlFor="email">
                La direction general
              </label>
              {
                waiting?(<Oval  visible={true}
                    height="20"
                    width="20"
                    color="blue"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""/>):(     <select
                        onChange={handleChangeDir}
                        name="dg_id"
                        id="dir"
                        // ref={dir}
                        className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                      >
                       
                               <option value="">- Selectionner une direction -</option>
                               {
                                dg.map((d, index) => <option value={d.dg_id}>{d.nom_dg}</option>)
                               }
                       
                      </select>)
              }

          <div className="mt-2">
            <label className="block text-md  text-gray-600" htmlFor="pdir">
                Porte de la Direction
              </label>
              <input
                onChange={handleChangeDir}
                value={formDataDir?.porte_dir}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="pdir"
                name="porte_dir"
                type="text"
                placeholder="La Porte De la Direction "
                aria-label="porte_dir"
              />
  
            </div>
         
            </div>

            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded-md"
                type="submit"
              >
                {isLoadingDir ? <BeatLoader color="yellow" /> : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
        <hr className="mt-3"/>

        {/* form pour creer un service */}
        <div className="leading-loose">
          <form className="p-3 bg-white rounded shadow-xl" onSubmit={submitServ}>
            <p className="text-lg text-gray-800 font-medium mb-4">
              Creer un service
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="serv">
                Nom du service
              </label>
              <input
                onChange={handleChangeServ}
                value={formDataServ?.nom_serv}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="serv"
                name="nom_serv"
                type="text"
                placeholder="Le Nom Du Service "
                aria-label="Name"
              />
            </div>
            <div className="mt-2">
              <label className="text-md block text-gray-900" htmlFor="dir">
                Direction
              </label>
              {
                waiting?(<Oval  visible={true}
                    height="20"
                    width="20"
                    color="blue"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""/>):( <select
                        onChange={handleChangeServ}
                        value={formDataServ?.dir_id}
                        name="dir_id"
                        id="dir"
                        // ref={dir}
                        className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                      >
                        <option value="">- Selectionner une direction -</option>
                       {
                        dir.map((d, index) => <option value={d.d_id}>{d.nom_dir}</option>)
                       }
                      </select>)
              }
             
            </div>
            <div className="mt-2">
            <label className="block text-md  text-gray-600" htmlFor="pserv">
                Porte du service
              </label>
              <input
                onChange={handleChangeServ}
                value={formDataServ?.porte_serv}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="pserv"
                name="porte_serv"
                type="text"
                placeholder="La Porte Du Service "
                aria-label="porte_serv"
              />
  
            </div>
            
            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded-md"
                type="submit"
              >
                {isLoadingServ ? <BeatLoader color="yellow" /> : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </main>
    </>
  );
}

export default SccDirServDg;
