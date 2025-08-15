import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export const useAuthMiddleware = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = checkIfUserIsLoggedIn();
    const publicRoutes = ["/login", "/signup", "/otp-verification"];
    const isBookingRoute = location.pathname.startsWith("/booking");
    const isProfileRoute =
      location.pathname.startsWith("/profile") ||
      location.pathname.startsWith("/dashboard");

      console.log("isLoggedIn",isLoggedIn);

    if (!isLoggedIn && (isProfileRoute || isBookingRoute)) {
      const useLocation = location.pathname;
      const useSearch = location.search;

      navigate("/login", { replace: true });
    }

    if (isLoggedIn && publicRoutes.includes(location.pathname)) {
      navigate("/", { replace: true });
    }
  }, [navigate, location]);
};

export const checkIfUserIsLoggedIn = () => {
  const token = localStorage.getItem("auth-storage")
    ? JSON.parse(localStorage.getItem("auth-storage")).state.token
    : null;
  return !!token;
};

export const clearLocalStorage = (navigate) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("auth-storage");
  navigate("/login", { replace: true });
};
