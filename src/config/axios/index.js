import axiosInstance from "./axiosInstance";
import { LOCAL_STORAGE_TOKEN } from "../../constants";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
      // window.location.href = "/login"; // Redirect to login page
      return 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
