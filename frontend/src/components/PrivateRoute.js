import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user');
  const location = useLocation(); // 📍 Get current route

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/studentlogin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
