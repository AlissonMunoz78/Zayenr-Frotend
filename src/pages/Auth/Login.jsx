import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaGoogle, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import api from '../../api/axios';
import storeAuth from '../../context/storeAuth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setRol } = storeAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login tradicional (Administrador / Admini)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/admin/login', formData);

      if (response.data.token) {
        setToken(response.data.token);
        setRol(response.data.admin.rol);
        toast.success(response.data.msg);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Login Google (Pasantes)
  const handleGoogleLogin = () => {
    const backendUrl =
      import.meta.env.VITE_API_URL ||
      'https://backend-zayen.onrender.com/api';

    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-green-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-teal-800 mb-2">
            MUSEO GUSTAVO ORCÉS
          </h1>
          <p className="text-gray-600">Sistema de Gestión</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Botón Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-800 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </button>
        </form>

        {/* Recuperar contraseña */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-teal-800 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">O</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center space-x-2"
        >
          <FaGoogle className="text-red-500 text-xl" />
          <span>Continuar con Google</span>
        </button>

        {/* Info */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            <strong>Administradores:</strong> Usa correo y contraseña.
          </p>
          <p className="text-xs text-gray-500">
            <strong>Pasantes:</strong> Usa Google OAuth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
