import React from 'react'
import { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { Oval } from 'react-loader-spinner';
function UpDoc() {
      const [isLoading, setIsLoading] = useState(false); //etat du loader
      const [token] = useState(localStorage.getItem("ACCESS_TOKEN")); //le token d'acces
        const [waiting, setWaiting] = useState(false); // looder pour la recuperation des directions
          const [dir, setDir] = useState([]); //liste des directions
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

      //appel a la fonction getDir dependant du chemin grace a (useLocation)
      useEffect(() => {
        getDir()
      }, [location.pathname])
 
  };
  return (
    <>
    <h3 className="text-gray-900 text-2xl ml-2.5 font-semibold ">
      Modification d'un Dossier
    </h3>
    <form
      onSubmit={null}
      className="w-[100%]  m-auto  p-10 bg-white rounded-md shadow mt-5 md:mt-10"
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
          onChange={null}
          id="chrono"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="reference du dossier"
          name="chrono"
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
          onChange={null}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="chrono initial"
          name="ref"
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
          onChange={null}
          id="provenance"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="Provenance"
          name="provenance"
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
          onChange={null}
          id="prop"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="proprietaire du dossier"
          name="proprietaire"
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
          onChange={null}
          id="motif"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5   "
          placeholder="objet du depot"
          name="motif"
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
          onChange={null}
          className="text-gray-900 w-full p-2 rounded"
          name="caracteristique"
          id=""
        >
          <option value="">- Selectionner ici -</option>
          <option value="plis ferme">Plis Ferme</option>
          <option value="normale">Normale</option>
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
            onChange={null}
            className="text-gray-900 w-full p-2 rounded"
            name="dir_id"
            id=""
          >
            <option value="">- Selectionner ici -</option>
            {dir.map((d, index) => (
              <option value={d.d_id} key={index}>
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
          onChange={null}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="Votre CIN"
          name="cin"
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
          onChange={null}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-900  focus:border-blue-500 block w-full p-2.5  "
          placeholder="Votre tel"
          name="tel"
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