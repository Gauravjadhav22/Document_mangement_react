import axiosInstance from "./axiosInstance";
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../../constants";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_USER)

      // window.location.href = "/login"; // Redirect to login page
      return 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
