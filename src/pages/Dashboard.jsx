import React from 'react'
import { FaDirections, FaMicroblog, FaUser, FaWallet } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'

function Dashboard() {
  return (
    <>
        <div className="flex  flex-wrap w-full justify-center  p-3">
        <div class="w-[300px] ">
                <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div class="flex flex-col items-center">
                        <div class="flex-shrink pr-4">
                            <div class="rounded-full p-3 bg-gray-300"><FaHouse className='text-green-500'/></div>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-3xl text-gray-900">3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            <h5 class="font-bold text-gray-500">Total Direction</h5>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="w-[300px] ">
                <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div class="flex flex-col items-center">
                        <div class="flex-shrink pr-4">
                            <div class="rounded-full p-3 bg-gray-300"><FaUser className='text-indigo-500'/></div>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-3xl text-gray-900">3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            <h5 class="font-bold text-gray-500">Total Utilisateur</h5>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="w-[300px]">
                <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div class="flex flex-col items-center">
                        <div class="flex-shrink pr-4">
                            <div class="rounded-full p-3 bg-gray-300"><FaWallet className='text-amber-500'/></div>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-3xl text-gray-900">3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            <h5 class="font-bold text-gray-500">Total Document</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[300px]">
                <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div class="flex flex-col items-center">
                        <div class="flex-shrink pr-4">
                            <div class="rounded-full p-3 bg-gray-300"><FaWallet className='text-amber-500'/></div>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-3xl text-gray-900">3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            <h5 class="font-bold text-gray-500">Total Document</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[300px]">
                <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div class="flex flex-col items-center">
                        <div class="flex-shrink pr-4">
                            <div class="rounded-full p-3 bg-gray-300"><FaWallet className='text-amber-500'/></div>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-3xl text-gray-900">3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            <h5 class="font-bold text-gray-500">Total Document</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[300px]">
                <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                    <div class="flex flex-col items-center">
                        <div class="flex-shrink pr-4">
                            <div class="rounded-full p-3 bg-gray-300"><FaWallet className='text-amber-500'/></div>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-3xl text-gray-900">3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            <h5 class="font-bold text-gray-500">Total Document</h5>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        <hr className='text-gray-900'/>
        <h1 className='mt-3 ml-2 font-bold text-gray-900 text-xl'>Graphiques</h1>
        
    </>
  )
}

export default Dashboard