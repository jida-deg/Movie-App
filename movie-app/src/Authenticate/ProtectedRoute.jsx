import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../components/AuthProvider';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If there are nested routes, use <Outlet />
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
