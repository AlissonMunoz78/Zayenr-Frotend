import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaKey } from 'react-icons/fa';
import api from '../../api/axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    actualPassword: '',
    nuevaPassword: '',
    confirmarPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nuevaPassword !== formData.confirmarPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.nuevaPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      await api.put('/admin/cambiar-password', {
        actualPassword: formData.actualPassword,
        nuevaPassword: formData.nuevaPassword,
      });
      toast.success('Contraseña actualizada correctamente');
      setFormData({ actualPassword: '', nuevaPassword: '', confirmarPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al cambiar contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaKey className="text-3xl text-teal-800" />
          <h1 className="text-3xl font-playfair font-bold text-teal-800">
            Cambiar Contraseña
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña Actual
            </label>
            <input
              type="password"
              name="actualPassword"
              value={formData.actualPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              name="nuevaPassword"
              value={formData.nuevaPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              minLength={8}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-800 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;