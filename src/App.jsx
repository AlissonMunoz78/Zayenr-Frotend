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
import Crear from "./pages/Crear";
import Chat from "./pages/Chat";
import List from './pages/List';
import Profile from './pages/Profile';

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

        {/* Rutas anidadas dentro de Dashboard */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} /> {/* <== esto carga en /dashboard */}
          <Route path="listar" element={<List />} />
          <Route path="crear" element={<Crear />} />
          <Route path="chat" element={<Chat />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
