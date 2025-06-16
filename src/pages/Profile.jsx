import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        const usuarioString = localStorage.getItem('usuario');

        if (!token || !usuarioString) {
          setError('No autenticado. Por favor inicia sesión.');
          setCargando(false);
          return;
        }

        const usuario = JSON.parse(usuarioString);
        const id = usuario.id;  // <-- Aquí cambió a "id"

        if (!id) {
          setError('ID de usuario no encontrado');
          setCargando(false);
          return;
        }

        const url = `https://zayenr-backend.onrender.com/api/pasantes/perfil/${id}`;

        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPerfil(data);
      } catch (err) {
        console.error('Error al obtener el perfil:', err);
        setError('No se pudo cargar el perfil.');
      } finally {
        setCargando(false);
      }
    };

    obtenerPerfil();
  }, []);

  if (cargando) return <p className="text-center py-10">Cargando perfil...</p>;

  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  if (!perfil) return <p className="text-center text-red-600 py-10">No se encontró el perfil.</p>;

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">Perfil del Pasante</h1>
        <hr className="my-4 border-gray-300" />
        <p className="mb-8">Aquí puedes ver tu información personal registrada.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Tus Datos</h2>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Nombre Completo</label>
            <p className="text-gray-800 text-lg">{perfil.nombre}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Correo Institucional</label>
            <p className="text-gray-800 text-lg">{perfil.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Facultad</label>
            <p className="text-gray-800 text-lg">{perfil.facultad}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Celular</label>
            <p className="text-gray-800 text-lg">{perfil.celular}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Rol</label>
            <p className="text-gray-800 text-lg capitalize">{perfil.rol}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
