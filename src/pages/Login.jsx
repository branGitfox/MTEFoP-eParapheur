import { FaKey, FaMailBulk } from "react-icons/fa";
import { userContext } from "../components/ContextWrapper";
import { useContext, useEffect, useRef, useState } from "react";
import axiosRequest from "../axiosClient/axiosClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const { setUser, user } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigate();
  const [formData, setFormData] = useState({});
  const [token]=useState(localStorage.getItem('ACCESS_TOKEN'))
  const [showPassword, setShowPassword] = useState(false)

const checkeds = useRef(null)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }


  //recuperation de l'utilisateur connecte
  const getUser = async () => {
    try{
          await axiosRequest
      .get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000/api",
        },
      })
      .then(({ data }) => {
        if (!data.message) {
          setUser(data);
          if (data.role == "scc") {
            navigation("/scc");
      
            
          }
          
          if(data.role == "sp"){
              navigation("/sp");
          }

           if(data.role == "agent"){
           

            navigation("/agent");
          }
          
          if(data.role == "admin"){
          

            navigation("/admin");
          }

        

        }
      })
      .catch((err) => console.log(''))
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }

    
  };

  useEffect(() => {
    getUser();
  }, [localStorage.getItem("ACCESS_TOKEN")]);

  //definition le'ACCESS_TOKEN dans le navigateur
  useEffect(() => {
    if (userData !== null) {
      setUser(userData.user);
      localStorage.setItem("ACCESS_TOKEN", userData.token);
      if (userData.user.role == "scc") {
        navigation("/scc");
      } else if(userData.user.role == "admin"){
        navigation("/admin");
      }else if(userData.user.role == "sp"){
        navigation("/sp");

      }
    }
  }, [userData]);

  //redirection vers une page par rapport au role de l'utilisateur
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
      if (user.role == "scc" ) {
        navigation("/scc");
      }

      if(user.role == "sp"){
        navigation("/sp");

      }
      
      if (user.role == "admin") {
        navigation("/admin");
      }
      
      if (user.role == "agent"){
        navigation("/agent")

      }
  

    

    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  //Envoie des donnees au serveur
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try{
      await axiosRequest
          .post("/login", formData)
          .then(({ data }) => setUserData(data))
          .then(() => setIsLoading(false))

          .catch((err) => toast.error(err.response?.data?.message))
          .finally(() => setIsLoading(false));
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }
  
  };

  return (
    <div className="w-[100%]  relative top-[4.5rem] lg:top-0 flex items-center  lg:h-screen">
      <div className=" w-[100%] lg:w-[1200px]  h-auto lg:h-2/3 bg-white m-auto relative top-1 lg:top-9 rounded-md flex flex-wrap animate__animated animate__pulse">
        <div className="w-[100%] lg:w-[50%] h-[100%] flex items-center rounded-l-md justify-center lg:bg-[#191970]">
          <img
            src="/login.png"
            className="w-3/5 md:w-3/5 lg:w-5/6 h-auto"
            alt=""
          />
        </div>
        <div className="w-[100%] lg:w-[50%]  flex flex-col items-center justify-center">
          <h1 className="text-4xl text-center  mt-[1.5rem] mb-10  text-blue-500">
            Connexion
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
            <div className="mb-5 w-[100%] relative">
              <label htmlFor="email" className="block text-semibold text-black">
                Mot de passe
              </label>
              <input
                onChange={handleChange}
                type={showPassword?'text':'password'}
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
              <input onChange={togglePassword}   type="checkbox" id="ss" className="mx-3"  checked={showPassword}/>
              <Link to='/forgotPassword' className="underline text-blue-500">Mot de Passe oublie</Link>
            </div>
            
            <div className="mb-5  w-[100%]">
              <button className="py-4 px-5 bg-[#191970] font-semibold text-white w-[100%] rounded">
                {isLoading ? <BeatLoader color="yellow" /> : "Se Connecter"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;
