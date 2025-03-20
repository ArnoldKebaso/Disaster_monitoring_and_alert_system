// src/api/api.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true 
});

instance.interceptors.response.use(
  response => response,
  error => {
    const publicPaths = ['/login', '/register','/contact','/forgot-password','/about','/reset-password','/userReSources','/disasterinfo','/donate','/faq','/'];
    // Only redirect if the current path is not a public path.
    if (
      error.response?.status === 401 &&
      !publicPaths.includes(window.location.pathname)
    ) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;