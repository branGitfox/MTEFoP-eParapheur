import axiosRequest from "../axiosClient/axiosClient";
import { BeatLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import { toast} from "react-toastify";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

function UserRegister() {
  const [formData, setFormData] = useState({status:'active'});
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [servLoading, setServLoading] = useState(false)
  const [dirs, setDirs] = useState([]); //liste des directions
  const [waiting, setWaiting] = useState(false); // looder pour la recuperation des directions
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));

  
 
 

 
  

  //recupere dynamiquement la liste de services par rapport a la direction
  const getServices = async () => {
    setServLoading(true)
    await axiosRequest
      .get(`/services/${formData?.id_dir}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000/api",
        },
      })
      .then(({ data }) => setServices(data))
      .then(() => setServLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setServLoading(false))
  };

    //recuperation de la liste de Direction
    const getDir = async () => {
      setWaiting(true);
  
      await axiosRequest
        .get("/dir", {
          headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" },
        })
        .then(({ data }) => setDirs(data))
        .then(() => setWaiting(false))
  
        .catch((err) => console.log(err).finally(() => setWaiting(false)));
    };

  useEffect(() => {
    getServices()    
   
  }, [formData?.id_dir]);

  useEffect(() => {
    getDir()
  }, [])



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const submit = async (e) => {
    try{
      setIsLoading(true);
    e.preventDefault();
    await axiosRequest
      .post("/register", formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:8000/api",
        },
      })
      .then(({ data }) => toast.success(data.message))
      .then(() => toast.info("l'email a ete bien envoyee"))
      .then(() => setIsLoading(false))
      .catch((err) => toast.error(err?.response?.data?.message))
      .finally(() => setIsLoading(false));
    }catch(err){
      toast.error('Erreur de connexion au serveur')
    }
    
  };

  return (
    <>
      <main className="w-full flex-grow p-6">
        <div className="leading-loose">
          <form className="p-3 bg-white rounded shadow-xl" onSubmit={submit}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer Un Utilisateur
            </p>
            <div className="">
              <label className="block text-md  text-gray-900" htmlFor="name">
                Nom
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
                Email
              </label>
              <input
                onChange={handleChange}
                value={formData?.email}
                className="w-full px-5  py-1 text-gray-700 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                name="email"
                type="text"
                required=""
                placeholder="L'Email Du Nouveau Utilisateur"
                id="email"
              />
            </div>
            <div className="mt-2">
              <label className=" block text-md text-gray-900" htmlFor="im">
                I-Matricule
              </label>
              <input
                onChange={handleChange}
                value={formData?.im}
                className="w-full px-2 py-1 text-gray-700 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                id="im"
                name="im"
                type="text"
                required=""
                placeholder="L'Imatricule Du Nouveau Utilisateur"
              />
            </div>
            <div className="mt-2">
              <label className="text-md block text-gray-900" htmlFor="dir">
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
              onChange={handleChange}
              className="text-gray-900 w-full p-2 rounded"
              name="id_dir"
              id="dir"
              
            >
              <option value="">- Selectionner ici -</option>
              {dirs.map((d, index) => (
                <option value={d.d_id} key={index}>
                  {d.nom_dir}
                </option>
              ))}
            </select>
          )}
            </div>
            <div className="mt-2">
              <label className="text-md block text-gray-900" htmlFor="serv">
                Services 
              </label>
            {
              servLoading?(<Oval  visible={true}
                height="20"
                width="20"
                color="blue"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""/>):(       <select
               
                onChange={handleChange}
                // value={formData?.id_serv}
                name="id_serv"
                id="serv"
                className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
              >
                <option value=''>Selectionner un service</option>
                {
                    services.map((serv, index) =><option key={index} value={serv.s_id}>{serv.nom_serv}</option>)
                }
              </select>)
            }
       
            </div>

            <div className="mt-2">
              <label
                className="text-md block text-gray-900"
                htmlFor="cus_email"
              >
                Role
              </label>
              <select
                onChange={handleChange}
                value={formData?.role}
                name="role"
                className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
              >
                <option value="">- Selectionner ici -</option>
                <option value="admin">Admin</option>
                <option value="scc">SCC</option>
                <option value="sp">Secretaire Particulier</option>
                <option value="agent">Agent Service</option>
              </select>
            </div>
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label className="block text-md text-gray-900" htmlFor="pass">
                Mot de Passe
              </label>
              <input
                onChange={handleChange}
                value={formData?.password}
                className="w-full px-2 py-2 text-gray-700 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                id="pass"
                name="password"
                type="password"
                required=""
                placeholder="Mot De Passe"
              />
            </div>
            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label className=" block text-md text-gray-900" htmlFor="conf">
                Confirmation Mot de passe
              </label>
              <input
                onChange={handleChange}
                value={formData?.password_confirmation}
                className="w-full px-2 py-2 text-gray-700 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
                id="conf"
                name="password_confirmation"
                type="password"
                required=""
                placeholder="Confirmation Du Mot De Passe"
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
      
      </main>
    </>
  );
}

export default UserRegister;
