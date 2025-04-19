// Import necessary libraries and hooks
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  // Get the current user and location
  const { user } = useAuth();
  const location = useLocation();

  // Redirect to login page if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home page if the user's role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if the user is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
