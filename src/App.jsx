import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/home';
import { Login } from './pages/Login';
import { Register } from './pages/Registro';
import { ConfirmAccount } from './pages/ConfirmAccount';
import { ForgotPassword } from './pages/ForgotPassword';
import { NewPassword } from './pages/NewPassword';
import { NotFound } from './pages/NotFound'; 
import { ResetPassword } from './pages/ResetPassword';

import Dashboard from './layouts/Dashboard';
import DashboardAdmin from './layouts/DashboardAdmin';

import AdminPasantes from './pages/AdminPasantes';
import Crear from "./pages/Crear";
import Chat from "./pages/Chat";
import List from './pages/List';
import Profile from './pages/Profile';

// ✅ IMPORTACIÓN DEL COMPONENTE DE RUTA PROTEGIDA
import ProtectedRouter from './routers/ProtectedRouter';

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

        {/* ✅ Rutas protegidas dentro de un <Route> con element={<ProtectedRouter />} */}
        <Route element={<ProtectedRouter />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Profile />} />
            <Route path="listar" element={<List />} />
            <Route path="crear" element={<Crear />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          <Route path="admin/dashboard" element={<DashboardAdmin />}>
            <Route index element={<AdminPasantes />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;