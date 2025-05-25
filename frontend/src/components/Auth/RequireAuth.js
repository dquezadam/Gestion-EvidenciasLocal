// components/RequireAuth.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Asegúrate de que la ruta sea correcta

const RequireAuth = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) { // Si no está autenticado, redirige a login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.tipoUsuario)) { // Si el rol no coincide
    return <Navigate to="/" replace />;
  }

  return children;
};