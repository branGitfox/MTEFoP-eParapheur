import React from 'react'

function Message() {
  return (
    <div className='w-[95%]  bg-white mx-auto mt-4'>
        <h1 className='text-xl text-gray-900 font-semibold bg-white p-5'>Messages</h1>
        <hr className='text-gray-200 w-full border-2'/>
        <div className="w-full py-10 grid grid-cols-12 ">
            <div className="col-span-6 text-gray-900 px-2 w-full flex flex-col items-left">
              <h3><strong>De: </strong>Vixfgit@gmail.com</h3>
              <h4><strong>Objet: </strong>Erreur d'envoie</h4>
              <h5><strong>Date d'envoie: </strong>29-12-2024</h5>

            </div>
            <div className="col-span-6 bg-green-500 w-full">h</div>
        </div>
    </div>
  )
}
 
export default Message