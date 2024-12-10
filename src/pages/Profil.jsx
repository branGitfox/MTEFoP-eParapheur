import React, { useContext, useState } from "react";
import { userContext } from "../components/ContextWrapper";
import { toast } from "react-toastify";
import axiosRequest from "../axiosClient/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";

function Profil() {
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN")); //token d'access
  const { user } = useContext(userContext); //recuperation de l'utilisateur connecte
  const [formData, setFormData] = useState({
    name: user.name,
    // im: user.im,
  });

  //loader status
  const [infoLoader, setInfoLoader] = useState(false)
  const [passLoader, setPassLoader] = useState(false)

  const [passwordData, setPasswordData] = useState({})

  //Gere le changement de la formulaire le nom et imatricule
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

    //Gere le changement de la formulaire pour les mots de passes
    const handleChangePass = (e) => {
        const { name, value } = e.target;
        setPasswordData((passwordData) => ({ ...passwordData, [name]: value }))
      };

  //Envoie les donnees vers l'API

  //pour nom et imatricule
  const submit = async (e) => {
    try{

        setInfoLoader(true)
        e.preventDefault();
        await axiosRequest.post("/updateUser/info", formData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1/api",
          },
        })
        .then(({ data }) => toast.success(data?.message))
        .then(() => setInfoLoader(false))
        .catch((err) => toast.error(err?.response?.data?.message))
        .finally(() => setInfoLoader(false))
    }catch(err){
        toast.error('Verifiez votre connexion');
    }
  };

  //pour password et confirmation password
  const submitPass = async (e) => {   
    try{
        
        setPassLoader(true)
        e.preventDefault();
        await axiosRequest.post("/updateUser/password", passwordData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1/api",
          },
        })
        .then(({ data }) => toast.success(data.message))
        .then(() => setPassLoader(false))
        .catch((err) => toast.error(err?.response?.data?.message))
        .finally(() => setPassLoader(false))
    }catch(err){
        toast.error('Verifiez votre connexion')
    }

  };
  return (
    <>
      <div className="-w-full p-5 flex justify-center flex-col items-center">
        <div className="mb-5 w-[250px] h-[250px] rounded-full border-2 border-blue-900"></div>
        <h2 className="text-gray-900 font-medium text-lg">{user.email}</h2>
        <h3 className="text-gray-900 font-medium bg-gray-300 px-1 py-1 rounded-md mt-2">
          IM-{user.im}{" "}
        </h3>
        <h3 className="text-gray-900 font-medium mt-2">Agent: {user.role} </h3>
        <h3 className="text-gray-900 font-medium rounded-md mt-2">
          Cree le <span className="font-semibold">{user.created_at}</span>
        </h3>
        <hr className="mt-5 mb-5 text-gray-900 w-full" />
        <h3 className="self-start text-gray-900 font-semibold">Informations</h3>
        <form onSubmit={submit} className="w-full p-5 bg-white mt-3 rounded-md">
          <div className="mt-2 mb-5">
            <label htmlFor="name" className="text-gray-900 ">
              Nom
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="w-full focus:outline-blue-900 py-3  px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900"
              name="name"
              placeholder="Changer le nom"
              value={formData.name}
            />
          </div>

          {/* Au cas  ou on veut modifier aussi l'imatricule*/}
          {/* <div className="mt-2 mb-5">
            <label htmlFor="name" className="text-gray-900 ">
              I-Matricule
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="w-full focus:outline-blue-900 py-3 px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900"
              name="im"
              placeholder="changer l'imatricule"
              value={formData.im}
            />
          </div> */}
          <button type="submit" className="px-5 py-2 bg-blue-900 rounded-md">
            {infoLoader?<BeatLoader size={15} color="yellow"/>:'Modifier'}
          </button>
        </form>
        <h3 className="self-start text-red-500 font-semibold mt-5">Mot De Passe</h3>

        <form onSubmit={submitPass} className="w-full p-5 bg-white mt-3 rounded-md">

          <div className="mt-2 mb-5">
            <label htmlFor="name" className="text-gray-900 ">
              Mot de Passe
            </label>
            <input
              onChange={handleChangePass}
              type="password"
              className="w-full focus:outline-blue-900 py-3 px-2  rounded-md border-gray-400 border-2 mt-2 text-gray-900"
              name="password"
              placeholder="Votre mot de passe"
            />
          </div>
          <div className="mt-2 mb-5">
            <label htmlFor="name" className="text-gray-900 ">
              Nouveau Mot de Passe
            </label>
            <input
              onChange={handleChangePass}
              type="text"
              className="w-full focus:outline-blue-900 py-3 px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900"
              name="new_password"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <div className="mt-2 mb-5">
            <label htmlFor="name" className="text-gray-900 ">
              Confirmation Nouveau Mot de Passe
            </label>
            <input
              onChange={handleChangePass}
              type="text"
              className="w-full focus:outline-blue-900 py-3 px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900"
              name="new_password_confirmation"
              placeholder="confirmer le nouveau mot de passe"
            />
          </div>
          <button type="submit" className="px-5 py-2 bg-blue-900 rounded-md">
          {passLoader?<BeatLoader size={15} color="yellow"/>:'Modifier'}
          </button>
        </form>
        {/* <ToastContainer/> */}
      </div>
    </>
  );
}

export default Profil;
