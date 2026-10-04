import axios, { AxiosError, type AxiosResponse } from "axios";
import { clearLocalStorage } from "../utils/authStorage";
export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        clearLocalStorage();
        window.location.href = "/login"
        break
      default:
        break
    }
    return Promise.reject(error)
   }
 )