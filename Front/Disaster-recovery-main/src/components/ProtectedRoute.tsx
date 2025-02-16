import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole: 'admin' | 'viewer' | 'reporter';
  currentRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requiredRole,
  currentRole
}) => {
  const location = useLocation();

  if (requiredRole !== currentRole) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;