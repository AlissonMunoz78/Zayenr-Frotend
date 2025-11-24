// src/routers/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import storeAuth from "../context/storeAuth";

const PublicRoute = () => {
  const token = storeAuth((state) => state.token);

  // Si ya tiene token, no debe volver a /login ni rutas públicas → redirigir
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si NO tiene token → puede acceder a /login, /confirmar, etc.
  return <Outlet />;
};

export default PublicRoute;
