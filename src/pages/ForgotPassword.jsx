import React from 'react'
import { FaArrowLeft, FaMailBulk } from 'react-icons/fa'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);



    const handleChange = () => {


    }


    const handleSubmit = () => {

    }
  return (
    <div className="w-[100%]  relative top-[4.5rem] lg:top-0 flex items-center  lg:h-screen">
    <div className=" w-[100%] lg:w-[1200px]  h-auto lg:h-2/3 bg-white m-auto relative top-1 lg:top-9 rounded-md flex flex-wrap animate__animated animate__pulse">
      <div className="w-[100%] lg:w-[50%] h-[100%] flex items-center rounded-l-md justify-center lg:bg-[#191970]">
        <img
          src="/forgot.webp"
          className="w-3/5 md:w-3/5 lg:w-5/6 h-auto"
          alt=""
        />
      </div>
      <div className="w-[100%] lg:w-[50%]  flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center  mt-[1.5rem] mb-10  text-[#A10304]">
          Mot De Passe Oubliee
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[100%] px-10  items-center"
        >
          <div className="mb-7 w-[100%] relative">
            <label htmlFor="email" className="block text-semibold text-black">
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
          <div className="mb-5  w-[100%]">
              <button className="py-4 px-5 bg-[#191970] font-semibold text-white w-[100%] rounded">
                {isLoading ? <BeatLoader color="yellow" /> : "Verification Email"}
              </button>
            </div>
            <div className="mt-2">
                <Link to='/login' className=' underline text-blue-500'><FaArrowLeft className='inline'/> Annuler</Link>
            </div>
        </form>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default ForgotPassword