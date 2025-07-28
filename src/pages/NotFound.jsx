import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-8">
      {/* Imagen centrada */}
      <img
        src="src\assets\dino-repair.png"
        alt="No encontrado"
        className="w-64 h-64 object-contain mb-8"
      />

      {/* Mensaje */}
      <h1 className="text-4xl font-bold text-teal-800 mb-4">Endpoint no encontrado</h1>
      <p className="text-teal-700 mb-8 text-center max-w-md">
        Lo sentimos, la ruta que buscas no existe. Por favor verifica la URL o vuelve al inicio.
      </p>

      {/* Botón para volver al inicio */}
      <Link
        to="/"
        className="bg-teal-800 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};
