import React, { useRef, useState } from "react";
import { BiSolidError} from "react-icons/bi";
import { FaMailBulk , FaKey} from "react-icons/fa";
import { Link

 } from "react-router-dom";


function Support() {
    const handleSubmit = () => null
    const handleChange = () => null
    const [showPassword, setShowPassword] = useState()
    const checkeds = useRef()
    const togglePassword = null
    const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="relative">
      <div className="w-[100%] h-screen bg-white relative overflow-y-scroll p-5">
        <h1 className=" relative top-[68px] text-blue-500 mt-10 text-center text-3xl font-bold">
          Support technique <BiSolidError className="inline text-yellow-500" />
        </h1>
        <p className="relative top-[68px] text-gray-900 text-center mt-5">
          Pour suivre votre dossier il suffit d'entrer la reference dans la
          barre de recherche ci dessous.Puis appuyer sur le boutton
          "rechercher".
        </p>
        <div className="relative top-[68px] h-auto lg:h-2/3  lg:w-[1200px]  mx-auto w-full mt-7 flex flex-wrap justify-center">
          <div className=" w-full lg:w-1/2 h-full flex justify-center items-center">
            <img
              src="/support.avif"
              className="w-3/5 md:w-3/5 lg:w-auto h-auto"
              alt=""
            />
          </div>
          <div className=" w-full lg:w-1/2 h-full flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-[100%] px-10  items-center"
            >
                    <h1 className="text-4xl text-center  mt-[1.5rem] mb-10  text-blue-500">
                Rapport
          </h1>
              <div className="mb-7 w-[100%] relative">
                <label
                  htmlFor="email"
                  className="block text-semibold text-black"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  placeholder="email"
                  className="py-3 px-3 border w-[100%] text-gray-900  focus:outline-blue-900 rounded-md"
                />
                <FaMailBulk
                  className="text-gray-600 absolute right-3 top-[2.5rem] "
                  size={20}
                />
              </div>
              <div className="mb-5 w-[100%] relative">
                <label
                  htmlFor="email"
                  className="block text-semibold text-black"
                >
                  Mot de passe
                </label>
                <input
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  ref={checkeds}
                  name="password"
                  placeholder="mot de passe"
                  className="py-3 px-3 border w-[100%] text-gray-900 focus:outline-blue-900 rounded-md"
                />
                <FaKey
                  className="text-gray-600 absolute right-3 top-[2.5rem]"
                  size={20}
                />
              </div>
              <div className="mb-5 w-[100%]">
                <label htmlFor="ss" className="text-semibold text-black">
                  Afficher le mot de passe
                </label>
                <input
                  onChange={togglePassword}
                  type="checkbox"
                  id="ss"
                  className="mx-3"
                  checked={showPassword}
                />
                <Link to="/forgotPassword" className="underline text-blue-500">
                  Mot de Passe oublie
                </Link>
              </div>

              <div className="mb-5  w-[100%]">
                <button className="py-4 px-5 bg-[#191970] font-semibold text-white w-[100%] rounded">
                  {isLoading ? <BeatLoader color="yellow" /> : "Se Connecter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
