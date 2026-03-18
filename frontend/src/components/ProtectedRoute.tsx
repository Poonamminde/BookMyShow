import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ role?: 'admin' | 'user'; children: React.ReactNode }> = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  let userEmail: string | null = null;
  try {
    if (userJson) userEmail = JSON.parse(userJson).email;
  } catch (e) {
    userEmail = null;
  }

  if (!token) return <Navigate to="/login" replace />;
  // If route requires admin, allow only admin@gmail.com
  if (role === 'admin' && userEmail !== 'admin@gmail.com') return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
