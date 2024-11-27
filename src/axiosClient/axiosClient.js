import axios from "axios";

const token =localStorage.getItem('ACCESS_TOKEN')
const axiosRequest = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
})

export default axiosRequest