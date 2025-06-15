import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './pages/home';
import { Login } from './pages/Login';
import { Register } from './pages/Registro';
import { ConfirmAccount } from './pages/ConfirmAccount';

import { ForgotPassword } from './pages/ForgotPassword';
import { NewPassword } from './pages/NewPassword';
import { NotFound } from './pages/NotFound'; 
import { ResetPassword } from './pages/ResetPassword';

import Dashboard from './layouts/Dashboard';

import Perfil from "./pages/Profile";
import Listar from "./pages/List";
import Crear from "./pages/Crear";
import Chat from "./pages/Chat";

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
        <Route path="dashboard" element={<Dashboard />} />

        

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
