import { Navigate, Outlet } from 'react-router-dom';
import storeAuth from '../context/storeAuth';

const ProtectedRoute = () => {
  const token = storeAuth(state => state.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
