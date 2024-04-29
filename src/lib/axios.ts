import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

const token = localStorage.getItem("token");
axiosInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;

export default axiosInstance;
