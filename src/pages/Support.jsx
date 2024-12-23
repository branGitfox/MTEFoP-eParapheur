import React, { useRef, useState } from "react";
import { BiSolidError} from "react-icons/bi";
import { FaMailBulk , FaKey, FaInfo} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link

 } from "react-router-dom";
import { Text } from "recharts";


function Support() {
  const [formData, setFormData] = useState({})
    const handleSubmit = () => null

    const handleChange = () => {
      const [name, value] = e.target
      setFormData((formData) => ({...formData, [name]:value}))
    }

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
          Si vous avez besoin d'aide ou si vous rencontrez une erreur, n'hesitez pas à nous envoyer un message, nous vous repondrons à un court instant.
        </p>
        <div className="relative top-[68px] h-auto lg:h-2/3  lg:w-[1200px]  mx-auto w-full mt-7 flex flex-wrap justify-center">
          <div className=" w-full lg:w-1/2 h-full flex justify-center items-baseline">
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
              <div className="mb-7 w-[100%] relative">
                <label
                  htmlFor="objet"
                  className="block text-semibold text-black"
                >
                  Objet
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="objet"
                  id="objet"
                  placeholder="objet du rapport"
                  className="py-3 px-3 border w-[100%] text-gray-900  focus:outline-blue-900 rounded-md"
                />
                <FaInfo
                  className="text-gray-600 absolute right-3 top-[2.5rem] "
                  size={20}
                />
              </div>
              <div className="mb-5 w-[100%] relative">
                <label
                  htmlFor="message"
                  className="block text-semibold text-black"
                >
                  Message
                </label>
                <textarea
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  ref={checkeds}
                  id="message"
                  name="message"
                  placeholder="Votre message ici"
                  className="py-3 px-3 border w-[100%] text-gray-900 focus:outline-blue-900 rounded-md"
                />
                <FaMessage
                  className="text-gray-600 absolute right-3 top-[2.5rem]"
                  size={20}
                />
              </div>
              <div className="mb-5  w-[100%]">
                <button className="py-4 px-5 bg-[#191970] font-semibold text-white w-[100%] rounded">
                  {isLoading ? <BeatLoader color="yellow" /> : "Envoyer"}
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