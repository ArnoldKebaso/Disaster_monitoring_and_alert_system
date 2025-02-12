import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole: 'admin' | 'viewer' | 'reporter';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const token = localStorage.getItem('token');
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : 'viewer';

  if (role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Use Outlet to render nested routes
};

export default ProtectedRoute;