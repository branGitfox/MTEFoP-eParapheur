import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axiosRequest from "../../axiosClient/axiosClient";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function UsersList() {
  const [users, setUsers] = useState();
  const [token] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [isLoading, setIsLoading] = useState(false);
  const [fresh, setFresh] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState("all")
  const [page, setPage] = useState(1)
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();

  const getUsers = async () => {
    setIsLoading(true);
    await axiosRequest
      .get(`/usersList?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http:://127.0.0.1:8000",
        },
      })
      .then(({ data }) => setUsers(data))
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const filter = (filter) => {
    setFilters(filter)
  }
  const updateUserStatus = async (user_id) => {
    await axiosRequest
      .post(
        `/updateStatus/${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
          },
        }
      )
      .then(({ data }) => toast.success(data.message))
      .then(() => setFresh(!fresh))
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    getUsers();
  }, [fresh]);

  
  const filtered = users?.data?.filter((u) => {
    if(filters == 'all'){
    
   
    if (u?.im?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }

    if (u?.name?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }

    if (u?.email?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }

    if (u?.nom_serv?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }

    if (u?.nom_dir?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }
  }else{
    if(filters == 'active' && u?.status == filters){
      if (u?.im?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.name?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.email?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.nom_serv?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.nom_dir?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
    }

    if(filters == 'blocked' && u?.status == 'desactive'){
      if (u?.im?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.name?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.email?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.nom_serv?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
  
      if (u?.nom_dir?.toLowerCase()?.includes(search.toLowerCase())) {
        return true;
      }
    }
  }
  });

const previousPage = () => {
  setPage(page => page - 1)
}

const nextPage = () => {
  setPage(page => page + 1)
}
  return (
    <>
      {/* <div className=" w-[100%]  justify-evenly flex p-3 mb-5 relative text-black">
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
      </div> */}
      {/* <div className="w-full overflow-x-auto overflow-y-scroll max-h-[83%] ">
        <table className="w-full whitespace-no-wrap ">
          <thead>
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
          ) : (
        
          )}
        </table>
      </div> */}
      <section class="w-full px-4 max-h-[83%] overflow-y-scroll mx-auto overflow-x-hidden mt-3">
        <div class="sm:flex sm:items-center sm:justify-between w-full overflow-x-hidden ">
          <div>
            <div class="flex items-center gap-x-3">
              <h2 class="text-lg font-medium text-gray-800 ">Liste Utilisateurs</h2>

              <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                {users?.data?.length} utilisateurs
              </span>
            </div>

            <p class="mt-1 text-sm text-gray-500 :text-gray-300">
              Voici la liste de compte ayant l'accès au platefome
            </p>
          </div>
          <div class="flex items-center mt-4 gap-x-3">
            {/* <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto :hover:bg-gray-800 :bg-gray-900 hover:bg-gray-100 :text-gray-200 :border-gray-700">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3098_154395)">
                  <path
                    d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                    stroke="currentColor"
                    stroke-width="1.67"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3098_154395">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span>Import</span>
            </button> */}

            <Link to="/admin/userregister" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 :hover:bg-blue-500 :bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Ajouter</span>
            </Link>
          </div>
        </div>
        <div class="mt-6 md:flex md:items-center md:justify-between">
          <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg :bg-gray-900 rtl:flex-row-reverse :border-gray-700 :divide-gray-700">
            <button onClick={() => filter('all')} class={`px-5 py-2 text-xs font-medium  transition-colors duration-200 ${filters =='all'?'bg-blue-500 text-gray-100':'text-gray-600'}  sm:text-sm :text-gray-300`}>
              Voir tout
            </button>

            <button onClick={() => filter('active')} class={`px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${filters =='active'?'bg-blue-500 text-gray-100':'text-gray-600'}  :hover:bg-gray-800 :text-gray-300 `}>
              Active
            </button>

            <button onClick={() => filter('blocked')} class={`px-5 py-2 text-xs font-medium  transition-colors duration-200 sm:text-sm ${filters =='blocked'?'bg-blue-500 text-gray-100':'text-gray-600'} :hover:bg-gray-800 :text-gray-300 `}>
              Desactivé
            </button>
          </div>

          <div class="relative flex items-center mt-4 md:mt-0">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mx-3 text-gray-400 :text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Rechercher"
              onChange={handleChange}
              value={search}
              class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 :bg-gray-900 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        <div class="flex flex-col mt-6">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 :border-gray-700 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 :divide-gray-700 shadow-xl">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        I-matricule
                      </th>

                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Nom et Prenoms
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Direction
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Service
                      </th>

                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Creé
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Modifié
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 :text-gray-400"
                      >
                        Actions
                      </th>
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
          ) : (
        
            <tbody class="bg-white divide-y divide-gray-200 :divide-gray-700 :bg-gray-900">
                    {filtered?.map((user, index) => (
                      <>
                        <tr
                          key={index}
                          className="text-xs font-semibold tracking-wide text-left text-gray-500  border-b0 bg-gray-50"
                        >
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.im}
                              </p>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.name}
                              </p>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.nom_dir}
                              </p>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.nom_serv}
                              </p>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.role}
                              </p>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.created_at}
                              </p>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              {/* <h2 class="font-medium text-gray-800  ">Catalog</h2> */}
                              <p class="text-sm font-normal text-gray-600 :text-gray-400">
                                {user.updated_at}
                              </p>
                            </div>
                          </td>
                         
                            <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              <div
                                class={`inline px-3 py-1 text-sm font-normal  rounded-full ${
                                  user.status == "active"
                                    ? "bg-green-500 text-green-100"
                                    : "bg-red-500 text-red-100"
                                }`}
                              >
                                {user.status}
                              </div>
                            </td>
                            <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                    <div  onClick={() => updateUserStatus(user.id)} class={`inline px-3 py-1 cursor-pointer ${
                                user.status == "active"
                                  ? "bg-red-500 text-red-100"
                                  : "bg-green-500 text-green-100"
                              } text-sm font-normal   rounded-full  gap-x-2 `}>
                                    {user.status == "active"
                                ? "Bloquer"
                                : "Debloquer"}
                                    </div>
                                </td>

                   
                          
                        </tr>
                      </>
                    ))}
                  </tbody>
              )}
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
          {/* <div class="text-sm text-gray-500 :text-gray-400">
            Page{" "}
            <span class="font-medium text-gray-700 :text-gray-100">
              1 of 10
            </span>
          </div> */}

          <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
            <button
            disabled={page == 1?true:false}
           onClick={previousPage}
              class={` ${page == 1? 'bg-gray-100 text-gray-500':'bg-blue-500 text-white'} flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 :bg-gray-900 :text-gray-200 :border-gray-700 :hover:bg-gray-800`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Précedent</span>
            </button>

            <button
            disabled={page == users?.last_page?true:false}
              onClick={nextPage}
              class={` ${page == users?.last_page? 'bg-gray-100 text-gray-500':'bg-blue-500 text-white'} flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 :bg-gray-900 :text-gray-200 :border-gray-700 :hover:bg-gray-800`}
            >
              <span>Suivant</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default UsersList;
