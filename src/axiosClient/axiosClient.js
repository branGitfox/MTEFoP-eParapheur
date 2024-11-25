import axios from "axios";


const axiosRequest = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers:{
        Accept:"application/json",
        Authorization:'Bearer 1|Fpn3QV312b6z7c73FT31ybi9twlzFjmorUt4CbWfd0289038',
        "Access-Control-Allow-Origin":"http://127.0.0.1:8000/api"
    }
})

export default axiosRequest