import React, { useState } from 'react'

function SccDirServDg() {
    const [formData, setFormData] =useState({})
    const [isLoading, setIsLoading] = useState(false)
    const submit = () => null
    const handleChange = () => null
  return (
   <>
             <main className="w-full flex-grow p-6">
        <div className="leading-loose">
        <form className="p-3 bg-white rounded shadow-xl" onSubmit={submit}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer une Direction General
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="name">
                Nom de la direction general
              </label>
              <input
                onChange={handleChange}
                value={formData?.name}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="name"
                name="name"
                type="text"
                required=""
                placeholder="Le Nom De La Direction General "
                aria-label="Name"
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

        {/* form pour la creation d'une direction */}
        <hr />
        <div className="leading-loose">
        <form className="p-3 bg-white rounded shadow-xl" onSubmit={submit}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer une Direction
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="name">
                Nom de la direction
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
                La direction general
              </label>
              <select
                onChange={handleChange}
                value={formData?.id_dir}
                name="id_dir"
                id="dir"
                // ref={dir}
                className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
              >
                <option value="1">DRFP</option>
                <option value="2">DRHE</option>
                <option value="3">DMI</option>
              </select>
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
        <hr />

        {/* form pour creer un service */}
        <div className="leading-loose">
        <form className="p-3 bg-white rounded shadow-xl" onSubmit={submit}>
            <p className="text-lg text-gray-800 font-medium pb-4">
              Creer un service
            </p>
            <div className="">
              <label className="block text-md  text-gray-600" htmlFor="name">
                Nom du service
              </label>
              <input
                onChange={handleChange}
                value={formData?.name}
                className="w-full px-5 py-1 text-gray-700 border-gray-300 rounded-md border-2 focus:outline-blue-900 bg-gray-50 "
                id="name"
                name="name"
                type="text"
                required=""
                placeholder="Le Nom Du Service "
                aria-label="Name"
              />
            </div>
            <div className="mt-2">
            <label className="text-md block text-gray-900" htmlFor="dir">
                Direction
              </label>
              <select
                onChange={handleChange}
                value={formData?.id_dir}
                name="id_dir"
                id="dir"
                ref={dir}
                className="w-full p-3 text-gray-900 bg-gray-50 rounded-md border-gray-300 border-2 focus:outline-blue-900"
              >
                <option value="1">DRFP</option>
                <option value="2">DRHE</option>
                <option value="3">DMI</option>
              </select>
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
  )
}

export default SccDirServDg