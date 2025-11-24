import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEnvelope, FaPhone, FaKey, FaSpinner, FaUniversity, FaClock } from 'react-icons/fa';
import api from '../../api/axios';
import storeAuth from '../../context/storeAuth';

const Profile = () => {
  const { rol } = storeAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [celular, setCelular] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const endpoint = rol === 'pasante' ? '/pasante/perfil' : '/admin/perfil';
      const response = await api.get(endpoint);
      setProfile(response.data);
      setCelular(response.data.celular || '');
    } catch (error) {
      toast.error('Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const endpoint = rol === 'pasante' ? '/pasante/perfil' : '/admin/perfil';
      await api.put(endpoint, { celular });
      toast.success('Perfil actualizado correctamente');
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al actualizar perfil');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-teal-800" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-playfair font-bold text-teal-800">Mi Perfil</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
            {profile?.fotoPerfil ? (
              <img
                src={profile.fotoPerfil}
                alt="Foto de perfil"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-6xl text-teal-800" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile?.nombre}</h2>
            <p className="text-gray-600 capitalize">{profile?.rol || rol}</p>
            {profile?.tipo && (
              <p className="text-sm text-gray-500 capitalize">Tipo: {profile.tipo}</p>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-teal-800 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Correo Electrónico</p>
              <p className="font-semibold text-gray-800">{profile?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaPhone className="text-teal-800 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Celular</p>
              <p className="font-semibold text-gray-800">{profile?.celular || 'No registrado'}</p>
            </div>
          </div>

          {profile?.facultad && (
            <div className="flex items-center space-x-3">
              <FaUniversity className="text-teal-800 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Facultad</p>
                <p className="font-semibold text-gray-800">{profile.facultad}</p>
              </div>
            </div>
          )}

          {profile?.horasDePasantia !== undefined && (
            <div className="flex items-center space-x-3">
              <FaClock className="text-teal-800 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Horas de Pasantía</p>
                <p className="font-semibold text-gray-800">{profile.horasDePasantia} horas</p>
              </div>
            </div>
          )}
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdateProfile} className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Actualizar Información</h3>
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Celular
              </label>
              <input
                type="text"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="0999999999"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                pattern="09[0-9]{8}"
                title="Debe ser un número ecuatoriano válido (09XXXXXXXX)"
              />
            </div>
            <button
              type="submit"
              disabled={updating}
              className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            >
              {updating ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>

        {/* Change Password Link */}
        {rol !== 'pasante' && (
          <div className="border-t mt-6 pt-6">
            <Link
              to="/cambiar-password"
              className="flex items-center space-x-2 text-teal-800 hover:text-teal-600 transition"
            >
              <FaKey />
              <span className="font-semibold">Cambiar Contraseña</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;