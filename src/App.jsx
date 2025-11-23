import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Registro";
import { ConfirmAccount } from "./pages/Auth/ConfirmAccount";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { NewPassword } from "./pages/Auth/NewPassword";
import { NotFound } from "./pages/NotFound";
import { ResetPassword } from "./pages/Auth/ResetPassword";

import Dashboard from "./layouts/Dashboard";
import DashboardAdmin from "./layouts/DashboardAdmin";

import AdminPasantes from "./pages/Admin/PerfilAdmin";
import { FormPasante } from "./components/create/Form";
import { Crear } from "./pages/pasante/CrearExposicion";
import Chat from "./pages/Chat";
import Exposicion from "./pages/pasante/MisExposiciones";
import Profile from "./pages/Profile";

import List from "./components/list/Table";
import Details from "./pages/Details";
import Update from "./pages/Update";

import ProtectedRouter from "./routers/ProtectedRouter";
import PrivateRouteWithRole from "./routers/PrivateRouteWhitRole";

import { Donations } from "./pages/Donations";
import { DonationsSuccess } from "./pages/DonationsSuccess";
import { DonationsCancel } from "./pages/DonationsCancel";

// Store para token y rol
import storeAuth from "./context/storeAuth";

// Componente que procesa el callback de OAuth
function OAuthHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, setRol } = storeAuth();
  const [procesando, setProcesando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const procesarCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const rol = params.get("rol");
        const id = params.get("id");
        const nombre = params.get("nombre");
        const email = params.get("email");
        const facultad = params.get("facultad");
        const celular = params.get("celular");

        if (!token || !rol) {
          throw new Error("Parámetros de autenticación incompletos");
        }

        const rolNormalizado = rol.toLowerCase();

        // Crear objeto usuario completo
        const usuario = {
          id: id || "",
          rol: rolNormalizado,
          nombre: nombre || "",
          email: email || "",
          facultad: facultad || "",
          celular: celular || "",
        };

        // Guardar en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Actualizar store de Zustand
        setToken(token);
        setRol(rolNormalizado);

        console.log("✅ Autenticación OAuth exitosa:", {
          rol: rolNormalizado,
          email: email,
        });

        // Pequeño delay para asegurar que todo se guarde
        setTimeout(() => {
          if (rolNormalizado === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else if (rolNormalizado === "pasante") {
            navigate("/pasante/dashboard", { replace: true });
          } else {
            throw new Error("Rol no reconocido: " + rolNormalizado);
          }
          setProcesando(false);
        }, 500);
      } catch (err) {
        console.error("❌ Error en OAuth callback:", err);
        setError(err.message);
        setProcesando(false);
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    };

    procesarCallback();
  }, [location.search, setToken, setRol, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error de Autenticación</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-gray-600">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  if (procesando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-teal-800 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-teal-800 mb-2">Procesando inicio de sesión...</h2>
          <p className="text-teal-600">Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">¡Autenticación exitosa!</h2>
        <p className="text-green-700">Redirigiendo al dashboard...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route path="confirmar/:token" element={<ConfirmAccount />} />
        <Route path="recuperar" element={<ForgotPassword />} />
        <Route path="reset/:token" element={<ResetPassword />} />
        <Route path="nueva-contrasena" element={<NewPassword />} />

        <Route path="donations" element={<Donations />} />
        <Route path="donations/success" element={<DonationsSuccess />} />
        <Route path="donations/cancel" element={<DonationsCancel />} />

        {/* Ruta callback OAuth - IMPORTANTE */}
        <Route path="oauth-callback" element={<OAuthHandler />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRouter />}>
          {/* Dashboard pasante */}
          <Route path="pasante/dashboard/*" element={<Dashboard />}>
            <Route index element={<Profile />} />
            <Route path="exposiciones" element={<Exposicion />} />
            <Route path="listar" element={<List />} />
            <Route path="visualizar/:id" element={<Details />} />
            <Route
              path="crear"
              element={
                <PrivateRouteWithRole rolPermitido="pasante">
                  <Crear />
                </PrivateRouteWithRole>
              }
            />
            <Route
              path="actualizar/:id"
              element={
                <PrivateRouteWithRole rolPermitido="pasante">
                  <Update />
                </PrivateRouteWithRole>
              }
            />
            <Route path="chat" element={<Chat />} />
          </Route>

          {/* Dashboard admin */}
          <Route path="admin/dashboard/*" element={<DashboardAdmin />}>
            <Route index element={<Profile />} />
            <Route
              path="pasantes"
              element={
                <PrivateRouteWithRole rolPermitido="admin">
                  <AdminPasantes />
                </PrivateRouteWithRole>
              }
            />
            <Route
              path="exposiciones"
              element={
                <PrivateRouteWithRole rolPermitido="admin">
                  <Exposicion />
                </PrivateRouteWithRole>
              }
            />
            <Route
              path="crear"
              element={
                <PrivateRouteWithRole rolPermitido="admin">
                  <Crear />
                </PrivateRouteWithRole>
              }
            />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;