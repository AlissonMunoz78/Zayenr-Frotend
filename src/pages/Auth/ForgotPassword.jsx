import React, { useState } from 'react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pasantes/recuperar-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || 'Error al enviar el correo');

      setMensaje('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
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
        <h2 className="text-3xl font-bold text-teal-800 mb-6">Recuperar contraseña</h2>

        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-800 font-semibold mb-2">Correo electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          {mensaje && <p className="text-green-600">{mensaje}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Enviar enlace de recuperación
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
