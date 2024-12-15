import React from 'react'
import axiosRequest from '../axiosClient/axiosClient'
import { useParams } from 'react-router-dom'
function OneDoc() {
    //recupere un courrier par son :id
    const getOneDoc = async () => {
        await axiosRequest.get(`/docByDirection/${id_doc}`)
    }
  return (
    <div>OneDoc</div>
  )
}

export default OneDoc