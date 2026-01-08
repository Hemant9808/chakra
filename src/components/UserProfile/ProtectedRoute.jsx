import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (adminOnly && user && user.role !== 'admin') {
      toast.error("Access denied. Admin privileges required.");
    }
  }, [adminOnly, user]);

  // Check if user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin access is required
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
