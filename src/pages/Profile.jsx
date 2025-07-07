import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
     // Verifica que las variables .env estén cargadas
    console.log("CLOUD_NAME:", import.meta.env.VITE_CLOUDINARY_NAME);
    console.log("UPLOAD_PRESET:", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

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
        const id = usuario.id;

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

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenSeleccionada(file);
      const previewUrl = URL.createObjectURL(file);
      setPerfil(prev => ({ ...prev, fotoPerfil: previewUrl }));
    }
  };

  const handleGuardarFoto = async () => {
    if (!imagenSeleccionada) return;

    try {
      setSubiendo(true);

      const formData = new FormData();
      formData.append('file', imagenSeleccionada);

      // IMPORTANTE:
      // El 'upload_preset' debe estar configurado en modo "unsigned" en Cloudinary,
      // lo que permite subir imágenes directamente desde el frontend sin exponer API_SECRET.
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) throw new Error('Error al subir la imagen');

      const data = await res.json();

      // Actualizar fotoPerfil en backend con la URL segura devuelta por Cloudinary
      const token = localStorage.getItem('token');
      const usuarioString = localStorage.getItem('usuario');
      const usuario = JSON.parse(usuarioString);
      const id = usuario.id;

      await axios.put(
        `https://zayenr-backend.onrender.com/api/pasantes/perfil/${id}`,
        { fotoPerfil: data.secure_url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPerfil(prev => ({ ...prev, fotoPerfil: data.secure_url }));
      setImagenSeleccionada(null);
      alert('Foto de perfil actualizada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al subir la imagen');
    } finally {
      setSubiendo(false);
    }
  };

  if (cargando) return <p className="text-center py-10">Cargando perfil...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
  if (!perfil) return <p className="text-center text-red-600 py-10">No se encontró el perfil.</p>;

  return (
    <>
      {/* Vista de perfil solo lectura con imagen */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0 text-center">
          <img
            src={perfil.fotoPerfil || "https://cdn-icons-png.flaticon.com/512/4715/4715329.png"}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full object-cover border border-gray-300 mx-auto"
          />
          <input
            type="file"
            accept="image/*"
            className="mt-3"
            onChange={handleImagenChange}
          />
          <button
            onClick={handleGuardarFoto}
            disabled={!imagenSeleccionada || subiendo}
            className="mt-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {subiendo ? 'Subiendo...' : 'Guardar Foto'}
          </button>
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Tu Información</h2>
          <p className="mb-2"><strong>Nombre:</strong> {perfil.nombre}</p>
          <p className="mb-2"><strong>Email:</strong> {perfil.email}</p>
          <p className="mb-2"><strong>Facultad:</strong> {perfil.facultad}</p>
          <p className="mb-2"><strong>Celular:</strong> {perfil.celular}</p>
          <p className="mb-2"><strong>Rol:</strong> <span className="capitalize">{perfil.rol}</span></p>
        </div>
      </div>

      {/* Formulario: Cambiar contraseña */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-10">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Cambiar Contraseña</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Contraseña Actual</label>
            <input type="password" className="w-full mt-1 border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Nueva Contraseña</label>
            <input type="password" className="w-full mt-1 border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Confirmar Nueva Contraseña</label>
            <input type="password" className="w-full mt-1 border rounded p-2" />
          </div>
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Cambiar Contraseña
          </button>
        </form>
      </div>

      {/* Formulario: Actualizar información personal */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-10 mb-10">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Actualizar Información Personal</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Nombre Completo</label>
            <input type="text" className="w-full mt-1 border rounded p-2" defaultValue={perfil.nombre} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Correo Institucional</label>
            <input type="email" className="w-full mt-1 border rounded p-2" defaultValue={perfil.email} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Facultad</label>
            <input type="text" className="w-full mt-1 border rounded p-2" defaultValue={perfil.facultad} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Celular</label>
            <input type="text" className="w-full mt-1 border rounded p-2" defaultValue={perfil.celular} />
          </div>
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Guardar Cambios
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
