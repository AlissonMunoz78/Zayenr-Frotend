import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const ConfirmAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pasantes/confirmar/${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'Error al confirmar la cuenta.');
        }

        setMensaje(data.msg);
        setError(false);

        // Redirige al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setMensaje(err.message);
        setError(true);
      }
    };

    confirmarCuenta();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-md">
        <h1 className={`text-2xl font-bold ${error ? 'text-red-600' : 'text-teal-800'}`}>
          {mensaje}
        </h1>
        {!error && (
          <p className="text-teal-700 mt-4">Redirigiendo al inicio de sesión...</p>
        )}
      </div>
    </div>
  );
};
