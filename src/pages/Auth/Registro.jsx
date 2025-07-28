import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaPhone, FaArrowLeft } from 'react-icons/fa';
import mamut from '../../assets/mamut.jpeg'; 

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [facultad, setFacultad] = useState('');
  const [celular, setCelular] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Aquí puedes validar campos si quieres antes de enviar

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pasantes/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          facultad,
          celular,
          rol: 'pasante', // Por defecto rol "pasante"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error en el registro');
      }

      setSuccess('Registro exitoso! Redirigiendo...');
      setTimeout(() => navigate('/login'), 2000); // Redirigir al login después de 2 segundos

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Formulario de registro */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-50">
        <h2 className="text-3xl font-bold text-teal-800 mb-8">Registro</h2>

        <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <label className="block text-teal-800 font-semibold mb-1">Nombre</label>
            <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
              <FaUser className="text-teal-700 mr-2" />
              <input
                type="text"
                placeholder="Tu nombre completo"
                className="w-full bg-transparent focus:outline-none"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Correo */}
          <div>
            <label className="block text-teal-800 font-semibold mb-1">Correo institucional</label>
            <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
              <FaEnvelope className="text-teal-700 mr-2" />
              <input
                type="email"
                placeholder="ejemplo@epn.edu.ec"
                className="w-full bg-transparent focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-teal-800 font-semibold mb-1">Contraseña</label>
            <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
              <FaLock className="text-teal-700 mr-2" />
              <input
                type="password"
                placeholder="Crea una contraseña"
                className="w-full bg-transparent focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

    {/* Facultad */}
<div>
  <label className="block text-teal-800 font-semibold mb-1">Facultad</label>
  <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2 bg-white">
    <FaUniversity className="text-teal-700 mr-2" />
    <select
      className="w-full bg-white text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
      value={facultad}
      onChange={(e) => setFacultad(e.target.value)}
      required
    >
      <option value="" disabled>Selecciona tu facultad</option>
      <option value="FC">FC</option>
      <option value="FCA">FCA</option>
      <option value="FICA">FICA</option>
      <option value="FIEE">FIEE</option>
      <option value="FGP">FGP</option>
      <option value="FIM">FIM</option>
      <option value="FIQA">FIQA</option>
      <option value="FIS">FIS</option>
      <option value="ESFOT">ESFOT</option>
    </select>
  </div>
</div>


          {/* Celular */}
          <div>
            <label className="block text-teal-800 font-semibold mb-1">Celular</label>
            <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
              <FaPhone className="text-teal-700 mr-2" />
              <input
                type="tel"
                placeholder="0991234567"
                className="w-full bg-transparent focus:outline-none"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Registrarse
          </button>
        </form>

        {/* Enlace para volver */}
        <div className="mt-6">
          <Link to="/login" className="flex items-center text-sm text-teal-800 hover:underline">
            <FaArrowLeft className="mr-2" /> ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>

      {/* Imagen al lado derecho */}
      <div className="w-1/2 hidden md:block">
        <img
          src={mamut}
          alt="Registro Museo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
