import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { userContext } from "../components/ContextWrapper";
import { BiTransfer } from "react-icons/bi";
import axiosRequest from "../axiosClient/axiosClient";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
function ListDoc() {
  const { user } = useContext(userContext);
  const [docsByDirection, setDocsByDirection] = useState([])
  const [loader, setLoader] = useState(false); //L'etat du loader
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
  const fetchByDirection = async () => {
    setLoader(true)
    await axiosRequest.get('/docsByDirection', {headers:{Authorization:`Bearer ${token}`}})
    .then(({data}) => setDocsByDirection(data))
    .then(() => setLoader(false))
    .catch((err) => toast.error(err?.response?.data?.message))
    .finally(() => setLoader(false))
  }

  useEffect(() => {
    fetchByDirection()
  }, [])

  

  const handleChange = () => null;
  const search = () => null;
  const fresh = () => null;

  return (
    <>
      <div className=" w-[100%]  justify-evenly flex p-3 mb-5 relative text-black">
        <div className="w-[80%] h-12 flex justify-center relative ">
          <input
            onChange={handleChange}
            value={search}
            type="text"
            className="border  p-2  w-full rounded-md focus:outline-blue-900 shadow"
            placeholder="rechercher"
          />
          <FaSearch
            size={20}
            className="absolute  text-gray-900 right-2 top-4 "
          />
        </div>

        <button
          onClick={fresh}
          className="bg-blue-900 text-white flex justify-between items-center px-3   py-2 rounded-md"
        >
          <IoReloadOutline className="inline mr-2" />
          Actualiser
        </button>
      </div>
      <div className="w-full overflow-x-auto overflow-y-scroll max-h-[83%] ">
        <table className="w-full whitespace-no-wrap ">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-blue-100">
              <th className="px-4 py-3 text-gray-800">Chrono</th>
              <th className="px-4 py-3 text-gray-800">Provenance</th>
              <th className="px-4 py-3 text-gray-800">Ref</th>
              <th className="px-4 py-3 text-gray-800">Proprietaire</th>
              <th className="px-4 py-3 text-gray-800">Motif</th>
              <th className="px-4 py-3 text-gray-800">Caracteristique</th>
              <th className="px-4 py-3 text-gray-800">Date</th>
              <th className="px-4 py-3 text-gray-800">Livre</th>
              <th className="px-4 py-3 text-gray-800 ">Transferer</th>

              {user.role == "admin" && (
                <th className="px-4 py-3 text-gray-800">Actions</th>
              )}
            </tr>
          </thead>
          {loader ? (
            <Oval
              visible={true}
              height="30"
              width="30"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="absolute left-[57%] z-50"
            />
          ) :(
        
          <tbody className="bg-white divide-y ">
                <DocByDirection docsByDirection={docsByDirection}/>
          </tbody>)}
        </table>
      </div>
    </>
  );
}

const DocByDirection = ({docsByDirection}) => {
    return (
        <>
         {docsByDirection.map((doc, index) => <DocItems key={index} doc={doc} ind={index}/>)}
        </>
    )
}

const DocItems = ({doc, ind}) => {
    return (
        <tr key={ind} className="text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{doc.chrono}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{doc.provenance}</td>
        <td className="px-4 py-3 text-sm">{doc.ref}</td>
        <td className="px-4 py-3 text-sm">{doc.propr}</td>
        <td className="px-4 py-3 text-sm">{doc.motif}</td>
        <td className="px-4 py-3 text-sm">{doc.caracteristique}</td>
        <td className="px-4 py-3 text-sm">{doc.created_at}</td>
        <td className="px-4 py-3 text-sm">
          <button className="px-3 py-2 bg-green-500 text-gray-50 rounded-2xl">
            <FaCheck />
          </button>
        </td>
        <td className="px-8 py-3 text-sm flex ">
          <button onClick={() => console.log('hello')
          }  className=" px-3 py-2 bg-blue-500 text-gray-50 rounded-2xl">
            <BiTransfer />
          </button>
        </td>
      </tr>
    )
}

export default ListDoc;
