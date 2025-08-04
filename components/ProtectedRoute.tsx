
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactElement;
  paymentRequired?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, paymentRequired = true }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (paymentRequired && !user?.hasPaid) {
    return <Navigate to="/payment" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
