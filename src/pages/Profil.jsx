import React, { useContext, useState } from "react";
import { userContext } from "../components/ContextWrapper";

import axiosRequest from "../axiosClient/axiosClient";
function Profil() {
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const { user } = useContext(userContext); //recuperation de l'utilisateur connecte
  const [formData, setFormData] = useState({
    name: user.name,
    im: user.im,
  });

  const [passwordData, setPasswordData] = useState({})

  //Gere le changement de la formulaire le nom et imatricule
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

    //Gere le changement de la formulaire pour les mots de passes
    const handleChangePass = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
      };

  //Envoie les donnees vers l'API

  //pour nom et imatricule
  const submit = async (e) => {
    e.preventDefault();
    await axiosRequest.post("/updateUser/info", formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://127.0.0.1/api",
      },
    }).then(({ data }) => console.log(data));
  };

  //pour password et confirmation password
  const submitPass = async (e) => {
    e.preventDefault();
    await axiosRequest.post("/updateUser/password", formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://127.0.0.1/api",
      },
    }).then(({ data }) => console.log(data));
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
              value={formData?.name}
            />
          </div>
          <div className="mt-2 mb-5">
            <label htmlFor="name" className="text-gray-900 ">
              I-Matricule
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="w-full focus:outline-blue-900 py-3 px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900"
              name="im"
              placeholder="changer l'imatricule"
              value={user.im}
            />
          </div>
          <button type="submit" className="px-5 py-2 bg-blue-900 rounded-md">
            Modifier
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
            Modifier
          </button>
        </form>
      </div>
    </>
  );
}

export default Profil;
