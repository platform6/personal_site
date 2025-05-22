import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Since we're using Sanity Studio's built-in authentication,
  // we don't need additional auth checks here
  return children;
};

export default ProtectedRoute;
