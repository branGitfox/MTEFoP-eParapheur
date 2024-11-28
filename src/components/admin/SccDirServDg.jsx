import React, { useEffect, useState } from "react";
import axiosRequest from "../../axiosClient/axiosClient";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Oval } from "react-loader-spinner";
function SccDirServDg() {
  const [formData, setFormData] = useState({});
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false);
  const [waiting, setWaiting]= useState(false)
  const [dg, setDg] = useState([])
  const [dir, setDir] = useState([])
  const submit = () => null;
  const handleChange = () => null;

  //recuperation de la liste de Direction General
  const getDg = async () => {
    setWaiting(true)
    await axiosRequest
      .get("/dg", {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
      })
      .then(({ data }) => setDg(data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    
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
          <form className="p-3 bg-white rounded shadow-xl" onSubmit={submit}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer une Direction General
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="name">
                Nom de la direction general
              </label>
              <input
                onChange={handleChange}
                value={formData?.name}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="name"
                name="name"
                type="text"
                required=""
                placeholder="Le Nom De La Direction General "
                aria-label="Name"
              />
            </div>
            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded-md"
                type="submit"
              >
                {isLoading ? <BeatLoader color="yellow" /> : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>

        {/* form pour la creation d'une direction */}
        <hr className="mt-3"/>
        <div className="leading-loose">
          <form className="p-3 bg-white rounded shadow-xl" onSubmit={submit}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer une Direction
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="name">
                Nom de la direction
              </label>
              <input
                onChange={handleChange}
                value={formData?.name}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="name"
                name="name"
                type="text"
                required=""
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
                        onChange={handleChange}
                        value={formData?.id_dir}
                        name="id_dir"
                        id="dir"
                        // ref={dir}
                        className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                      >
                       
                               <option value="">- Selectionner une direction -</option>
                               {
                                dg.map((d, index) => <option value={d.id}>{d.nom_dg}</option>)
                               }
                       
                      </select>)
              }
         
            </div>

            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded-md"
                type="submit"
              >
                {isLoading ? <BeatLoader color="yellow" /> : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
        <hr className="mt-3"/>

        {/* form pour creer un service */}
        <div className="leading-loose">
          <form className="p-3 bg-white rounded shadow-xl" onSubmit={submit}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer un service
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="name">
                Nom du service
              </label>
              <input
                onChange={handleChange}
                value={formData?.name}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="name"
                name="name"
                type="text"
                required=""
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
                        onChange={handleChange}
                        value={formData?.id_dir}
                        name="id_dir"
                        id="dir"
                        // ref={dir}
                        className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                      >
                        <option value="">- Selectionner une direction -</option>
                       {
                        dir.map((d, index) => <option value={d.id}>{d.nom_dir}</option>)
                       }
                      </select>)
              }
             
            </div>

            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 rounded-md"
                type="submit"
              >
                {isLoading ? <BeatLoader color="yellow" /> : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default SccDirServDg;
