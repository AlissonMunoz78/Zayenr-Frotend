import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [valid, setValid] = useState(null);

  useEffect(() => {
    // Validar el token
    fetch(`${import.meta.env.VITE_BACKEND_URL}/pasantes/recuperar-password/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error('Token inválido');
        return res.json();
      })
      .then(() => {
        setValid(true);
        // Esperar 2 segundos antes de redirigir al formulario
        setTimeout(() => {
          navigate(`/nueva-contrasena?token=${token}`);
        }, 2000);
      })
      .catch(() => setValid(false));
  }, [token, navigate]);

  if (valid === null) return <p className="text-center mt-20">Validando token...</p>;

  if (!valid) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 p-8">
        <h2 className="text-2xl text-red-800 font-bold mb-4">Token inválido o expirado</h2>
        <p className="mb-4 text-red-700">Este enlace ya no es válido. Puedes solicitar uno nuevo.</p>
        <button
          onClick={() => navigate('/recuperar')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Solicitar nuevo enlace
        </button>
      </div>
    );
  }

  // Mensaje bonito de éxito antes de redirigir
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-8">
      <img
        src="/src/assets/dino2.jpg"
        alt="Token validado"
        className="w-48 h-48 mb-8"
      />
      <h2 className="text-3xl font-bold text-teal-800 mb-4">Token validado correctamente</h2>
      <p className="text-teal-700 mb-2 text-center max-w-md">
        Serás redirigido para crear una nueva contraseña...
      </p>
    </div>
  );
};
