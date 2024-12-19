import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axiosRequest from '../../axiosClient/axiosClient'
import { Oval } from 'react-loader-spinner'
function UsersList() {
  const [users, setUsers] = useState([])
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
  const [isLoading, setIsLoading] = useState(false)

    const handleChange = () => null
    const search = null

    const getUsers = async () => {
      setIsLoading(true)
      await axiosRequest.get('/usersList', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http:://127.0.0.1:8000"}})
      .then(({data}) => setUsers(data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getUsers()
    }, [])

    console.log(users);
    
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
                    className="absolute  text-gray-900 right-2 top-4"
                />
          </div>
    </div>
          <div className="w-full overflow-x-auto overflow-y-scroll max-h-[83%] ">
          <table className="w-full whitespace-no-wrap ">
              <thead >
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b0 bg-gray-50 ">
                  <th className="px-4 py-3 text-gray-800">I-Matricule</th>
                  <th className="px-4 py-3 text-gray-800">Nom et Prenoms</th>
                  <th className="px-4 py-3 text-gray-800">Email</th>
                  <th className="px-4 py-3 text-gray-800">Direction</th>
                  <th className="px-4 py-3 text-gray-800">Service</th>
                  <th className="px-4 py-3 text-gray-800">Cree le</th>
                  <th className="px-4 py-3 text-gray-800">Modifie le</th>
                  <th className="px-4 py-3 text-gray-800">Status</th>
                  <th className="px-4 py-3 text-gray-800">Actions</th>
                </tr>
              </thead>
              {isLoading ? (
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
               
          </tbody>)}
          </table>
          </div>
   </>
  )
}

export default UsersList