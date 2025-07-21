import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener el token desde la URL
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pasantes/recuperar-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword: repeatPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al actualizar la contraseña');
      }

      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/login'), 2500); // Redirige después de 2.5 segundos
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden md:block">
        <img
          src="/src/assets/dino.jpg"
          alt="Museo Imagen"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-50">
        <h2 className="text-3xl font-bold text-teal-800 mb-8">Crear nueva contraseña</h2>

        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-800 font-semibold mb-2">Nueva contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-teal-800 font-semibold mb-2">Repetir contraseña</label>
            <input
              type="password"
              placeholder="Repite tu nueva contraseña"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">Contraseña actualizada. Redirigiendo al login...</p>}

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Actualizar contraseña
          </button>
        </form>

        <div className="mt-6 w-full max-w-md text-center">
          <a href="/login" className="text-teal-700 hover:underline">
            Volver a iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
};
