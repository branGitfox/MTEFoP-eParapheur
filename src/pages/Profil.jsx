import React, { useContext, useState } from "react";
import { userContext } from "../components/ContextWrapper";

function Profil() {
    const {user} = useContext(userContext) //recuperation de l'utilisateur connecte
    cosnt [formData, setFormData] = useState({})

    //gere le changement de la formulaire
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]:value}))

    }

    const submit = async () => {

    }

  return (
    <>
      <div className="-w-full p-5 flex justify-center flex-col items-center">
        <div className="mb-5 w-[250px] h-[250px] rounded-full border-2 border-blue-900"></div>
        <h2 className="text-gray-900 font-medium text-lg">{user.email}</h2>
        <h3 className="text-gray-900 font-medium bg-gray-300 px-1 py-1 rounded-md mt-2">IM-{user.im} </h3>  
        <h3 className="text-gray-900 font-medium mt-2">Agent: {user.role} </h3>  
        <h3 className="text-gray-900 font-medium rounded-md mt-2">Cree le <span className="font-semibold">{user.created_at}</span></h3>  
        <hr  className="mt-5 mb-5 text-gray-900 w-full"/>
        <h3 className="self-start text-gray-900 font-semibold">Informations</h3>
        <form onSubmit={submit} className="w-full p-5 bg-white mt-3 rounded-md">
            <div className="mt-2 mb-5">
                <label htmlFor="name" className="text-gray-900 ">Nom</label>
                <input onChange={handleChange} type="text"className="w-full focus:outline-blue-900 py-3  px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900" placeholder="Changer le nom" value={user.name}/>
            </div>
            <div className="mt-2 mb-5">
                <label htmlFor="name" className="text-gray-900 ">I-Matricule</label>
                <input onChange={handleChange} type="text"className="w-full focus:outline-blue-900 py-3 px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900" placeholder="changer l'imatricule" value={user.im}/>
            </div>
            <div className="mt-2 mb-5">
                <label htmlFor="name" className="text-gray-900 ">Mot de Passe</label>
                <input onChange={handleChange} type="password"className="w-full focus:outline-blue-900 py-3 px-2  px-2rounded-md border-gray-400 border-2 mt-2 text-gray-900" placeholder="Votre mot de passe"/>
            </div>
            <div className="mt-2 mb-5">
                <label htmlFor="name" className="text-gray-900 ">Nouveau Mot de Passe</label>
                <input onChange={handleChange} type="text"className="w-full focus:outline-blue-900 py-3 px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900" placeholder="Nouveau mot de passe"/>
            </div>
            <div className="mt-2 mb-5">
                <label htmlFor="name" className="text-gray-900 ">Confirmation Nouveau Mot de Passe</label>
                <input onChange={handleChange} type="text"className="w-full focus:outline-blue-900 py-3 px-2 rounded-md border-gray-400 border-2 mt-2 text-gray-900" placeholder="confirmer le nouveau mot de passe"/>
            </div>
            <button type="submit"  className="px-5 py-2 bg-blue-900 rounded-md">Modifier</button>
        </form>
      </div>
    </>
  );
}

export default Profil;
