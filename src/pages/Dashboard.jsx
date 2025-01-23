import React from "react";
import { FaChartBar, FaDirections, FaEye, FaHandPointDown, FaHandScissors, FaMicroblog, FaTradeFederation, FaUser, FaWallet } from "react-icons/fa";
import { FaHandBackFist, FaHouse } from "react-icons/fa6";

function Dashboard() {
  return (
    <>
      <div className="flex  flex-wrap w-full justify-center  p-3">
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-blue-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Total Courriers</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaHandBackFist className="text-green-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Decharger</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaHandPointDown className="text-red-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Non Decharger</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-amber-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500"></h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-amber-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Total Document</h5>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-[300px]">
          <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink">
                <div className="rounded-full p-3 bg-gray-300 ">
                  <FaWallet className="text-amber-500 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-3xl text-gray-900 text-center">
                  3249
                </h3>
                <h5 className="font-bold text-gray-500">Total Document</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-900" />
      <div className="w-full lg:w-2/5 flex flex-wrap  justify-between items-center">
         <h2 className="mt-3 ml-2 font-bold text-gray-900 text-xl">Trafics de visite <FaEye className="inline ml-1 text-blue-800" size={25}/></h2>    
         <form onSubmit={null} className="w-[200px] flex    mt-2 lg:mt-0 justify-evenly gap-x-5 ">
              <div >
              <label htmlFor="" className="text-gray-800 font-medium" >Debut</label>
                <input className="text-gray-900 p-2 rounded-md w-full"  onChange={null} name="start" type="date"  />
              </div>
              <div >
              <label htmlFor="" className="text-gray-800 font-medium">Fin</label>
              <input  className="text-gray-800 p-2 rounded-md w-full" onChange={null} name="end"  type="date"  />
              </div>
              <button className="bg-blue-600 px-3 h-10 relative top-6 rounded-md" type="submit">Valider</button>
            </form>
      </div>
      <div className="w-1/2 mx-auto h-50 flex justify-center items-center mt-10 text-violet-900 font-bold text-4xl border-2 p-5 border-gray-400">50 visiteurs</div>
    </>
  );
}

export default Dashboard;
