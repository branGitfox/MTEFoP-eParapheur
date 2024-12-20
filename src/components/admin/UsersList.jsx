import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axiosRequest from '../../axiosClient/axiosClient'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
function UsersList() {
  const [users, setUsers] = useState([])
  const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))
  const [isLoading, setIsLoading] = useState(false)
  const [fresh, setFresh] = useState(true)
const [search, setSearch] = useState("")
    const handleChange = (e) => {
      setSearch(e.target.value)
    }

    const navigate = useNavigate()
   

    const getUsers = async () => {
      setIsLoading(true)
      await axiosRequest.get('/usersList', {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http:://127.0.0.1:8000"}})
      .then(({data}) => setUsers(data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    }

    const updateUserStatus = async (user_id) => {
      await axiosRequest.post(`/updateStatus/${user_id}`, {}, {headers:{Authorization:`Bearer ${token}`, "Access-Control-Allow-Origin":"http://127.0.0.1:8000"}})
      .then(({data}) => toast.success(data.message))
      .then(() => setFresh(!fresh))
      .catch((err) => console.log(err))

    }

    useEffect(() => {
        getUsers()
    }, [fresh])

   const filtered = users.filter((u) => {
      if(u?.im?.toLowerCase()?.includes(search.toLowerCase())){
        return true
      }

      if(u?.name?.toLowerCase()?.includes(search.toLowerCase())){
        return true
      }

      if(u?.email?.toLowerCase()?.includes(search.toLowerCase())){
        return true
      }

      if(u?.nom_serv?.toLowerCase()?.includes(search.toLowerCase())){
        return true
      }

      if(u?.nom_dir?.toLowerCase()?.includes(search.toLowerCase())){
        return true
      }
   })
    
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
                  <th className="px-4 py-3 text-gray-800">Role</th>
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
               {filtered.map((user, index) => <>
                <tr key={index} className="text-xs font-semibold tracking-wide text-left text-gray-500  border-b0 bg-gray-50">
                  <td className="px-4 py-3 text-sm">{user.im}</td>
                  <td className="px-4 py-3 text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">{user.nom_dir}</td>
                  <td className="px-4 py-3 text-sm">{user.nom_serv}</td>
                  <td className="px-4 py-3 text-sm">{user.created_at}</td>
                  <td className="px-4 py-3 text-sm">{user.updated_at}</td>
                  <td className='px-4 py-3 text-sm rounded-3xl text-white'><button className={`px-3 py-3 rounded-3xl cursor-default ${user.status=="active"?"bg-green-500":"bg-red-500"}`}>{user.status}</button></td>
                  <td className="px-4 py-3 text-sm">
                    <button onClick={() => updateUserStatus(user.id)} className={`px-3 py-3 rounded-3xl ${user.status=="active"?"bg-red-500":"bg-green-500"}  text-white`}>{user.status=="active"?"Bloquer":"Debloquer"}</button>  
                  </td> 
                </tr>
               </> )}
          </tbody>)}
          </table>
          </div>
   </>
  )
}

export default UsersList