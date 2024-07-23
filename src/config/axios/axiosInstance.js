import axios from "axios";
import { BASE_URL, LOCAL_STORAGE_TOKEN } from "../../constants";
import { getValuesLocalStorage } from "../../utils/localStorageFunctions";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your base URL
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getValuesLocalStorage(LOCAL_STORAGE_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;