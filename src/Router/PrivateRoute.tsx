import React from 'react';
import { Navigate } from 'react-router-dom';

export const isAuthenticated = (): boolean => {
  const cookies = document.cookie.split(';').reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});

  return cookies.authToken !== undefined;
};

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
