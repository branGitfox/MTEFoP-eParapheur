import React from 'react'
import { FaSearch } from 'react-icons/fa'
function UsersList() {
    const handleChange = () => null
    const search = null
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
    </div>
   </>
  )
}

export default UsersList