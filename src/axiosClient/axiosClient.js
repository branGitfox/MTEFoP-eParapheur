import axios from "axios";

//configuration pour la consommation de l'API
const axiosRequest = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
})

export default axiosRequest