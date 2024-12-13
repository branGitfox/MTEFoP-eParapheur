import React, { useContext } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { userContext } from "../components/ContextWrapper";
import { BiTransfer } from "react-icons/bi";
function ListDoc() {
  const { user } = useContext(userContext);
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

              {user.role == "admin" && (
                <th className="px-4 py-3 text-gray-800">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y ">
            <tr className="text-gray-700">
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">Test de td</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">test</td>
              <td className="px-4 py-3 text-sm">test</td>
              <td className="px-4 py-3 text-sm">test</td>
              <td className="px-4 py-3 text-sm">test</td>
              <td className="px-4 py-3 text-sm">test</td>
              <td className="px-4 py-3 text-sm">test</td>
              <td className="px-4 py-3 text-sm">
                <button className="px-3 py-2 bg-green-500 text-gray-50 rounded-2xl">
                  <FaCheck />
                </button>
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="px-3 py-2 bg-blue-500 text-gray-50 rounded-2xl">
                  <BiTransfer />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListDoc;
