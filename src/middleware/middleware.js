import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";


// Custom hook for middleware to protect routes
export const useAuthMiddleware = () => {
  const navigate = useNavigate();
  const location = useLocation();
  


  useEffect(() => {
    const isLoggedIn = checkIfUserIsLoggedIn();
    // console.log("")
    console.log("isLoggedIn",isLoggedIn)
    const publicRoutes = ["/login", "/signup"];
    const isBookingRoute = location.pathname.startsWith("/booking");
    const isProfileRoute =
      location.pathname.startsWith("/profile") ||
      location.pathname.startsWith("/dashboard");

    // If not logged in and trying to access a private route
    if (!isLoggedIn && (isProfileRoute || isBookingRoute)) {
      const useLocation = location.pathname;
      const useSearch = location.search;

      navigate("/signup", { replace: true }); // Redirect to signup if not logged in

    }

    // If logged in and trying to access public routes like login/signup
    if (isLoggedIn && publicRoutes.includes(location.pathname)) {
      navigate("/", { replace: true }); // Redirect to profile if logged in
    }
  }, [navigate, location]);
};

// Function to check if user is logged in
const checkIfUserIsLoggedIn = () => {
  const token = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage")).state.token
      : null; // Replace with your actual auth token logic
  return !!token; // Returns true if the token exists
};

// Logout function to clear the token and redirect
export const clearLocalStorage = (navigate) => {
  localStorage.removeItem("authToken");// Remove the auth token from localStorage
  localStorage.removeItem("auth-storage"); // Optionally remove user-related data
  navigate("/login", { replace: true }); // Redirect to login or signup page
};         
