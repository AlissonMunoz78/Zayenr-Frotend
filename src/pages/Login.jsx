import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowLeft, FaUserPlus } from 'react-icons/fa';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pasantes/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }

      // Guarda el token (si existe) en localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Redirigir a la página principal o dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Imagen a la izquierda */}
      <div className="w-1/2 hidden md:block">
        <img
          src="src/assets/dino.jpg"
          alt="Museo Imagen"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Formulario de login */}
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
            <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
              <FaLock className="text-teal-700 mr-2" />
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full focus:outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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

        {/* Botones adicionales */}
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
