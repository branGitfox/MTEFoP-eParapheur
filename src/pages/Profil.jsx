import React from "react";

function Profil() {
  return (
    <>
      <div className="-w-full p-5 flex justify-center flex-col items-center">
        <div className="mb-5 w-[250px] h-[250px] rounded-full border-2 border-blue-900"></div>
        <h2 className="text-gray-900 font-medium text-lg">Vixfgit@gmail.com </h2>
        <h3 className="text-gray-900 font-medium bg-gray-300 px-1 py-1 rounded-md mt-2">IM-2342455 </h3>  
        <h3 className="text-gray-900 font-medium rounded-md mt-2">Cree le <span className="font-semibold">3203 </span> </h3>  
        <hr  className="mt-5 mb-5 text-gray-900 w-full"/>
        <h3 className="self-start text-gray-900 font-semibold">Informations</h3>
    
      </div>
    </>
  );
}

export default Profil;
