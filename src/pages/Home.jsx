import React, { useEffect, useState } from "react";
import { FaEye, FaHandHoldingHeart, FaHandsHelping, FaTools } from "react-icons/fa";
import { MdOutlineDangerous } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import axiosRequest from "../axiosClient/axiosClient";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
function Home() {
  const [visitors, setVisitors] = useState()
  const [loading, setLoading] = useState(false)
  const getNbrVisitors = async () => {  
    setLoading(true)
    try{
      await axiosRequest.get('/visitors', {headers:{"Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
      .then(({data}) => setVisitors(data))
      .then(() => setLoading(false))
      .catch((err) => console.log(''))
      .finally(() => setLoading(false))
    }catch(err){
      toast.error("Verifiez votre connexion internet")
    }
  }

  useEffect(() => {
    getNbrVisitors()
  }, [])
  return (
    <>
      <div className="pt-24 lg:pt-15">
        <div className="container px-3 mx-auto flex flex-wrap flex-col lg:flex-row items-center">
          <div className="flex flex-col w-full lg:w-2/5 justify-center items-start text-center md:text-left">
            <div className="mx-auto mb-2 md:hidden">
              <img src="/Rpp.png" alt="" className="w-[100px] h-auto" />
            </div>
            <p className="uppercase tracking-loose w-full text-semibold text-4xl text-left animate__animated animate__fadeInDown">
              Ministere du Travail,
              <br /> de l'Emploi <br /> et de la Fonction Publique
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight self-start animate__animated animate__fadeInLeft">
              e-Parapheur
            </h1>
            <p className="leading-normal text-2xl  lg:m-auto  mb-8 text-left animate__animated animate__fadeInLeft">
              Application Web de suivi de Courriers dédié au Service Central de
              courriers au sein du Ministere afin de simplifier le traçage de
              courriers.
            </p>
            <Link
              to="/login"
              className="mx-auto z-30  animate__animated animate__fadeInLeft lg:mx-0 self-start hover:underline bg-gradient-to-r from-blue-600 to-yellow-900  text-white font-bold rounded-full my-6 relative lg:top-10 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Se Connecter
            </Link>
          </div>
          <div className="w-full md:w-3/5 py-6 text-right relative -z-50" >
            <img
              className="w-full animate__animated  animate__fadeInRight md:w-4/5 -z-50 relative lg:left-[7rem]"
              src="/hero.png"
            />
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>
      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-2xl md:text-5xl font-bold leading-tight text-center text-gray-800">
            A propos de ce Site Web <TbWorld className="inline text-blue-500 mx-3"/>
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap pl-5 lg:pl-20">
            <div className="w-5/6 sm:w-1/2 p-6 ">
              <h3 className="text-xl md:text-3xl text-gray-800 font-bold leading-none mb-3">
                  Avant <MdOutlineDangerous className="inline text-red-500 w-10 h-10 mx-3"/>
              </h3>
              <ul className="text-gray-600 mb-2 list-disc">
                  <li>Courrier difficile à tracer</li>
                  <li>Archivage non garantie</li>
                  <li>Directions et services   asynchrone</li>
              </ul>
            
            </div>
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-xl md:text-3xl text-gray-800 font-bold leading-none mb-3">
                Après <FaTools className="inline text-green-500 w-7 mx-3 h-7"/>
              </h3>
              <ul className="text-gray-600 mb-2 list-disc">
                  <li>Traçage de courries rapide et efficace </li>
                  <li>Archivage sécurisé</li>
                  <li>Directions et services  synchrone</li>      
                  <li>Accessible à distance</li>      
              </ul>
            </div>
            
          </div>
          <h3 className="text-gray-900 text-xl text-center  font-bold">Nombre de visites <FaEye className="inline mx-3 text-blue-500 w-7 h-7"/></h3>
          <div className="max-w-[100px] mx-auto mt-5 h-[50px] border-2 border-gray-600 text-gray-900 flex justify-center items-center rounded-md font-bold">{loading ? (
          <Oval
            visible={true}
            height="30"
            width="30"
            color="blue"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) :visitors}</div>

        </div>
      </section>
      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-2xl md:text-5xl font-bold leading-tight text-center text-gray-800">
            Mise en Oeuvre <FaHandHoldingHeart className="inline text-blue-500 mx-3"/>
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className=" text-xl md:text-3xl text-gray-800 font-bold leading-none mb-3 flex items-center ">
                Direction Général de la FOnction Publique <img src="/dgfop.JPG" className=" mx-3 inline w-20 h-20 rounded-full" alt="" />
              </h3>
              <p className="text-gray-600 mb-2">
               Monsieur le Directeur Général, 
              </p>
            </div>
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-xl md:text-3xl text-gray-800 font-bold leading-none mb-3 flex items-center ">
                Direction de la Réforme de la Fonction Publique <img src="/fop.jpeg" className=" mx-3 inline w-20 h-20 rounded-full" alt="" />
              </h3>
              <p className="text-gray-600 mb-2">
               Monsieur le Directeur , Christian
              </p> 
        
            </div>

          </div>
        </div>
      </section>
      <section className="bg-white border-b py-8">
          <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-2xl md:text-3xl font-bold leading-tight text-center text-gray-800">
            Partenariat <FaHandsHelping className="inline text-blue-500 mx-3"/>
          </h2>
          <div className="full flex justify-center">
             <img src="/ispm.jpeg" className="  inline w-20 h-20 rounded-full mx-auto mt-5" alt="" />  
          </div>
             <h3 className="text-gray-900 text-xl text-center  font-bold">Institut Superieur Polytechnique de Madagascar</h3>
          </div>
      </section>

      <svg
        className="wave-top"
        viewBox="0 0 1439 147"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
            <g className="wave" fill="#f8fafc">
              <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  opacity="0.200000003"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <section className="container mx-auto text-center py-6 mb-12">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
          Contact
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <h3 className="my-4 text-3xl leading-tight">
          Pour un rapport ou soif d'information, veuillez nous envoyer un email
          
        </h3>
        <button onClick={() => location.href="mailto:vixfgit@gmail.com"} className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          Envoyer un mail
        </button>
      </section>

      <footer className="bg-white">
        <p className="text-black text-center">Copyright © MTEFoP 2024</p>
      </footer>
    </>
  );
}

export default Home;
