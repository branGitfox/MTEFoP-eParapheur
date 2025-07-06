import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function ListDeparts() {
  const [activeTab, setActiveTab] = useState("dg");
  const [data, setData] = useState({ services: [], directions: [], dg: [] });
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState();
  
  const [nom, setNom] = useState({})
  const [porte, setPorte] = useState({})
  const [refresh, setRefresh] = useState()
  const [id, setId] = useState()
  const portes = useRef()
  const noms = useRef()
  const getId = (di) => {
    setId(di)
  }



  const handleNom = (e) => {


  const {name, value} = e.target
    setNom((values) => ({...values, [name]:value}))
  }

    const handlePorte = (e) => {
  const {name, value} = e.target
    setPorte((values) => ({...values, [name]:value}))
  }



  const getMixte = async () => {
    await axios
      .get("http://localhost:8000/api/mixte", {
        headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
      })
      .then(({ data }) => setData(data));
  };

  useEffect(() => {
    getMixte();
  }, [refresh]);

  const currentData = data[activeTab];

  const getTabLabel = () => {
    switch (activeTab) {
      case "services":
        return "Service";
      case "directions":
        return "Direction";
      case "dg":
        return "Direction Générale";
      default:
        return "";
    }
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
  };

 
  const submitData = async (e) => {
    
    e.preventDefault()
    await axios.put(`http://localhost:8000/api/u${activeTab==='dg'? 'dg':activeTab==='directions'?'dir':'serv'}/${id}`,{nom_dg:noms.current?.value, nom_dir:noms.current?.value, nom_serv:noms.current?.value, porte_dir:portes.current?.value, porte_serv:portes.current?.value}, {headers:{'Access-Control-Allow-Origin':'http://localhost:8000'}}).
    then(() => setShowModal(false))
    .then(() => setRefresh((refresh) => !refresh))
  }

  const deletes = async (ids) => {
    await axios.delete(`http://localhost:8000/api/del${activeTab==='dg'? 'dg':activeTab==='directions'?'dir':'serv'}/${ids}`,{headers:{'Access-Control-Allow-Origin':'http://localhost:8000'}}).then(()=>setRefresh((refresh) => !refresh))

  }

  return (
    <>
      <section className="w-full px-4 mx-auto mt-4">
        {/* Onglets */}
        <div className="flex gap-4 mb-6">
          {["dg", "directions", "services"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab === "dg"
                ? "Direction Générale"
                : tab === "directions"
                ? "Directions"
                : "services"}
            </button>
          ))}
        </div>

        {/* Bouton Ajouter */}
        <div className="flex justify-end mb-4">
          <Link to={'/admin/sccservdirdg'} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Ajouter {getTabLabel()}
          </Link>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                  Nom {getTabLabel()}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Portes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentData.map((item, index) => (
                <tr key={item.s_id ?? item.d_id ?? item.dg_id}>
                  <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.nom_dg ?? item.nom_dir ?? item.nom_serv}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.porte_dir ?? item.porte_serv ?? "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700 space-x-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="inline-flex items-center px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                    >
                      <FaEdit className="mr-1" /> Modifier
                    </button>
                    <button onClick={() => deletes(item?.dg_id??item?.d_id??item?.s_id)} className="inline-flex items-center px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                      <FaTrash className="mr-1" /> Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-3 text-center text-gray-500">
                    Aucune donnée disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Modifier {getTabLabel()}
            </h2>
            <form onSubmit={submitData}>
              {/* Input nom */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom {getTabLabel()}
                </label>
                <input
                  name={activeTab==='dg'?'nom_dg':activeTab==='directions'?'nom_dir':'nom_serv'}
                  type="text"
                  ref={noms}
                  defaultValue={
                    editData?.nom_serv ?? editData?.nom_dir ?? editData?.nom_dg
                  }
                  onChange={handleNom}
                  className="w-full px-3 py-2 border text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Input porte (si service ou direction) */}
              {(activeTab === "services" || activeTab === "directions") && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Porte
                  </label>
                  <input
                  ref={portes}
                    name={activeTab ==='directions'?'porte_dir':"porte_serv"}
                    type="text"
                    defaultValue={editData?.porte_serv ?? editData?.porte_dir}
                    onChange={handlePorte}
                    className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  </div>
              )}

              {/* Boutons */}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                onClick={() => getId(editData?.dg_id??editData?.d_id??editData?.s_id)}
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ListDeparts;
