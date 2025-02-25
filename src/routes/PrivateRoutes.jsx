import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  return user && roles.includes(user.role) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
