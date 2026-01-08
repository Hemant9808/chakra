import axios from "axios";

// Use Vite's import.meta.env for environment variables
// Automatically uses localhost in development, production URL when deployed
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

console.log("Using Backend URL:", BACKEND_URL);

const axiosInstance = axios.create({

  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // Remove if not using cookies
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or Zustand store if you prefer)

    const token = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage")).state.token
      : null;
    console.log("token", token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
