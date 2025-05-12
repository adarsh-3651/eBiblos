import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, userRole }) => {
  // If no userRole (not logged in), or role is not allowed → redirect
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;  // Redirect to home (or login page)
  }

  // If allowed → render children
  return children;
};

export default ProtectedRoute;
