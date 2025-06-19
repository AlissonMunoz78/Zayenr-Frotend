// src/routers/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import storeAuth from "../context/storeAuth"; // o '../store/storeAuth' si usas zustand

const PublicRoute = () => {
  const token = storeAuth(state => state.token);

  // Si ya tiene token, redirigir al dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no tiene token, permitir acceder a la ruta pública
  return <Outlet />;
};

export default PublicRoute;
