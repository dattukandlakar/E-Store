import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, token, loading } = useSelector((state) => state.auth);

  // If we have a token but user not loaded yet, avoid premature redirect
  if (token && !user) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin' && user.role !== 'manager') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
