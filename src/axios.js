import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:4444"
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("token")
    return config
})

export default axiosInstance

