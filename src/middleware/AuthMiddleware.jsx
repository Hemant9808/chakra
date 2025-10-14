// import { Navigate, useLocation } from 'react-router-dom';
// import useAuthStore from '../Store/useAuthStore';

// // For protected routes (logged in users only)
// export const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }pcp

//   return children;
// };

// // For public routes (non-logged in users only)
// export const PublicRoute = ({ children }) => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const location = useLocation();

//   if (isAuthenticated) {
//     // Redirect to the page they came from, or home if no previous location
//     return <Navigate to={location.state?.from?.pathname || '/'} replace />;
//   }

//   return children;
// }; 