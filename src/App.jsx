import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { FormPasante } from "./components/create/Form"; // para pasantes
import { Crear } from "./pages/pasante/CrearExposicion"; // para exposiciones
import Chat from "./pages/Chat";
import Exposicion from "./pages/pasante/MisExposiciones";
import Profile from "./pages/Profile";

import List from "./components/list/Table";
import Details from "./pages/Details";
import Update from "./pages/Update";

import ProtectedRouter from "./routers/ProtectedRouter";
import PrivateRouteWithRole from "./routers/PrivateRouteWhitRole";

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

        {/* Rutas protegidas */}
        <Route element={<ProtectedRouter />}>
          {/* Dashboard usuario normal */}
          <Route path="dashboard/*" element={<Dashboard />}>
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
