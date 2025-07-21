import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CardPassword from '../components/profile/CardPassword'
import { CardProfile } from '../components/profile/CardProfile'
import { CardProfileOwner } from '../components/profile/CardProfileOwner'
import FormProfile from '../components/profile/FormProfile'
import storeProfile from '../context/storeProfile'


const Profile = () => {
  const location = useLocation();
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    facultad: '',
    celular: ''
  });

  const [passwords, setPasswords] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  });

  // La función para obtener el perfil se mantiene igual
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
        const id = usuario.id;
        const baseURL = import.meta.env.VITE_BACKEND_URL;
        const esAdmin = location.pathname.startsWith('/admin');
        const endpoint = esAdmin
          ? `${baseURL}/admin/perfil/${id}`
          : `${baseURL}/pasantes/perfil/${id}`;

        const { data } = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Aseguramos que la data que llega es el perfil correcto
        const perfilData = data.pasante || data.admin || data;
        setPerfil(perfilData);
        setFormulario({
          nombre: perfilData.nombre,
          email: perfilData.email,
          facultad: perfilData.facultad,
          celular: perfilData.celular
        });
      } catch (err) {
        console.error('Error al obtener el perfil:', err);
        setError('No se pudo cargar el perfil.');
      } finally {
        setCargando(false);
      }
    };

    obtenerPerfil();
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

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
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) throw new Error('Error al subir la imagen a Cloudinary');

      const cloudinaryData = await res.json();
      const imageUrl = cloudinaryData.secure_url;

      const token = localStorage.getItem('token');
      const usuarioString = localStorage.getItem('usuario');
      const usuario = JSON.parse(usuarioString);
      const id = usuario.id;
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const esAdmin = location.pathname.startsWith('/admin');
      const endpoint = esAdmin
        ? `${baseURL}/admin/perfil/${id}`
        : `${baseURL}/pasantes/perfil/${id}`;

      // <-- CAMBIO CLAVE: Enviamos el formulario completo junto con la nueva URL de la foto
      const payload = {
        ...formulario,
        fotoPerfil: imageUrl,
      };

      const { data: backendData } = await axios.put(
        endpoint,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const updatedProfile = backendData.pasante || backendData.admin || backendData;

      // <-- CAMBIO CLAVE: Actualizamos ambos estados, 'perfil' y 'formulario'
      setPerfil(updatedProfile);
      // No necesitamos actualizar el formulario aquí porque ya estaba sincronizado

      setImagenSeleccionada(null);
      alert('Foto de perfil actualizada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la foto de perfil.');
    } finally {
      setSubiendo(false);
    }
  };


  const handleGuardarInfo = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const usuarioString = localStorage.getItem('usuario');
      const usuario = JSON.parse(usuarioString);
      const id = usuario.id;
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const esAdmin = location.pathname.startsWith('/admin');

      const endpoint = esAdmin
        ? `${baseURL}/admin/perfil/${id}`
        : `${baseURL}/pasantes/perfil/${id}`;

      // <-- CAMBIO CLAVE: El payload ahora incluye la foto de perfil actual para no perderla
      const payload = {
        ...formulario,
        fotoPerfil: perfil.fotoPerfil,
      };

      const { data } = await axios.put(
        endpoint,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const updatedProfile = data.pasante || data.admin || data;

      // <-- CAMBIO CLAVE: Actualizamos el estado 'perfil' Y el estado 'formulario'
      setPerfil(updatedProfile);
      setFormulario({
        nombre: updatedProfile.nombre,
        email: updatedProfile.email,
        facultad: updatedProfile.facultad,
        celular: updatedProfile.celular,
      });

      alert('Información actualizada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la información');
    }
  };


  // La función de cambiar contraseña se mantiene igual
  const handleCambiarContrasena = async (e) => {
    e.preventDefault();
    if (passwords.nueva !== passwords.confirmar) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const usuarioString = localStorage.getItem('usuario');
      const usuario = JSON.parse(usuarioString);
      const id = usuario.id;
      const baseURL = import.meta.env.VITE_BACKEND_URL;
      const esAdmin = location.pathname.startsWith('/admin');

      const endpoint = esAdmin
        ? `${baseURL}/admin/cambiar-password/${id}`
        : `${baseURL}/pasantes/cambiar-password/${id}`;
      
      await axios.put(
        endpoint,
        {
          actual: passwords.actual,
          nueva: passwords.nueva,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Contraseña actualizada correctamente');
      setPasswords({ actual: '', nueva: '', confirmar: '' });
    } catch (error) {
      console.error(error);
      // <-- MEJORA: Mostrar el mensaje de error del backend si existe
      const errorMessage = error.response?.data?.message || 'Error al actualizar la contraseña';
      alert(errorMessage);
    }
  };


  if (cargando) return <p className="text-center py-10">Cargando perfil...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
  if (!perfil) return <p className="text-center text-red-600 py-10">No se encontró el perfil.</p>;

  // El JSX se mantiene igual
  return (
    <>
      {/* Perfil e imagen */}
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
            className="mt-3 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
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

      {/* Actualizar información personal */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-10 mb-10">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Actualizar Información Personal</h2>
        <form onSubmit={handleGuardarInfo}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Correo Institucional</label>
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Facultad</label>
            <input
              type="text"
              name="facultad"
              value={formulario.facultad}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Celular</label>
            <input
              type="text"
              name="celular"
              value={formulario.celular}
              onChange={handleInputChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Guardar Cambios
          </button>
        </form>
      </div>
      
      {/* Cambiar contraseña */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-10">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Cambiar Contraseña</h2>
        <form onSubmit={handleCambiarContrasena}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Contraseña Actual</label>
            <input
              type="password"
              name="actual"
              value={passwords.actual}
              onChange={handlePasswordChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Nueva Contraseña</label>
            <input
              type="password"
              name="nueva"
              value={passwords.nueva}
              onChange={handlePasswordChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              name="confirmar"
              value={passwords.confirmar}
              onChange={handlePasswordChange}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Cambiar Contraseña
          </button>
        </form>
      </div>

    </>
  );
};

export default Profile;