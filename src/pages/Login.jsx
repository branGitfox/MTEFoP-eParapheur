import { FaKey, FaMailBulk } from "react-icons/fa";
import { userContext } from "../components/ContextWrapper";
import { useContext, useEffect, useState } from "react";
import axiosRequest from "../axiosClient/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Login() {
  const {setUser, setToken} = useContext(userContext)
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null)
const navigation = useNavigate()
  const [formData, setFormData] = useState({});


 useEffect(() => {
  if(userData !== null){
    setUser(userData.user)
    setToken(userData.token)
    navigation('/scc')
  }

 
  

  if(localStorage.getItem('ACCESS_TOKEN') !== null){
    navigation('/scc')
  }
  
 })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  // console.log(user);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    console.log(formData);
    await axiosRequest
      .post("/login", formData)
      .then(({ data }) => setUserData(data))
      .then(() => setIsLoading(false))
    
      .catch((err) => toast.error(err.response?.data?.message))
      .finally(() => setIsLoading(false))
  };

  console.log(userData);
  

  return (

    <div className="w-[100%]  relative top-[4.5rem] lg:top-0 flex items-center  lg:h-screen">
      <div className=" w-[100%] lg:w-[1200px]  h-auto bg-white m-auto relative top-1 lg:top-9 rounded-md flex flex-wrap">
        <div className="w-[100%] lg:w-[50%] h-[100%] flex items-center justify-center">
          <img src="/lottieee.png" className="w-4/5" alt="" />
        </div>
        <div className="w-[100%] lg:w-[50%] ">
          <h1 className="text-4xl text-center  mt-[4rem] mb-10  text-[#A10304]">
            Connexion
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[100%] px-10  items-center"
          >
            <div className="mb-5 w-[100%] relative">
              <label htmlFor="email" className="block text-semibold text-black">
                Email
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="email"
                name="email"
                placeholder="email"
                className="py-3 px-3 border w-[100%] text-gray-900"
              />
              <FaMailBulk
                className="text-gray-600 absolute right-3 top-[2.5rem]"
                size={20}
              />
            </div>
            <div className="mb-5 w-[100%] relative">
              <label htmlFor="email" className="block text-semibold text-black">
                Mot de passe
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="email"
                name="password"
                placeholder="mot de passe"
                className="py-3 px-3 border w-[100%] text-gray-900"
              />
              <FaKey
                className="text-gray-600 absolute right-3 top-[2.5rem]"
                size={20}
              />
            </div>
            <div className="mb-5 w-[100%]">
              <label htmlFor="ss" className="text-semibold text-black">
                Se Souvenir de moi
              </label>
              <input type="checkbox" id="ss" className="mx-3" />
            </div>
            <div className="mb-5 w-[100%]">
              <input
                type="submit"
                id="email"
                placeholder="email"
                value={isLoading ? <BeatLoader color="yellow" /> : "Se Connecter"}
                className="py-4 px-5 bg-[#191970] font-semibold text-white w-[100%] rounded"
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Login;
