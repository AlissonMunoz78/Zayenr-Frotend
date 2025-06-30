import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser, FaLock, FaArrowLeft, FaUserPlus, FaEye, FaEyeSlash
} from 'react-icons/fa';
import storeAuth from '../context/storeAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setToken, setRol: setUserRol } = storeAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!rol) {
      setError('Debes seleccionar un rol');
      return;
    }

    try {
      const endpoint = rol === 'ADMIN'
        ? `${import.meta.env.VITE_BACKEND_URL}/admin/login`
        : `${import.meta.env.VITE_BACKEND_URL}/pasantes/login`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('📩 Respuesta del login:', data);

      if (!response.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }

      const token = data.token;
      let usuario = data.admin || data.pasante || data.usuario;

      if (!usuario) {
        throw new Error('Usuario no encontrado en la respuesta');
      }

      // Aquí agregamos el rol manualmente porque no viene en la respuesta
      usuario.rol = rol === 'ADMIN' ? 'ADMINISTRADOR' : 'PASANTE';

      // Guardar en localStorage y Zustand
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setToken(token);
      setUserRol(usuario.rol);

      navigate(usuario.rol === 'ADMINISTRADOR' ? '/admin/dashboard' : '/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden md:block">
        <img
          src="src/assets/dino.jpg"
          alt="Museo Imagen"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-50">
        <h2 className="text-3xl font-bold text-teal-800 mb-8">Iniciar Sesión</h2>

        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-800 font-semibold mb-2">Correo electrónico</label>
            <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
              <FaUser className="text-teal-700 mr-2" />
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="w-full focus:outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-teal-800 font-semibold mb-2">Contraseña</label>
            <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2 relative">
              <FaLock className="text-teal-700 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                className="w-full focus:outline-none bg-transparent pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 text-teal-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-teal-800 font-semibold mb-2">Tipo de usuario</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="">Seleccione un rol</option>
              <option value="PASANTE">Pasante</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div className="text-right">
            <Link to="/recuperar" className="text-sm text-teal-700 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="flex justify-between mt-6 w-full max-w-md">
          <Link
            to="/registro"
            className="flex items-center text-sm text-teal-800 hover:underline"
          >
            <FaUserPlus className="mr-2" /> Registrarse
          </Link>
          <Link
            to="/"
            className="flex items-center text-sm text-teal-800 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
