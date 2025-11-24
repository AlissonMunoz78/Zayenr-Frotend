import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import storeAuth from '../../context/storeAuth';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, setRol } = storeAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Error al autenticar con Google. Contacta al administrador.');
      navigate('/login');
      return;
    }

    if (token) {
      setToken(token);
      setRol('pasante');
      toast.success('¡Bienvenido! Sesión iniciada con Google');
      navigate('/dashboard');
    } else {
      toast.error('No se recibió token de autenticación');
      navigate('/login');
    }
  }, [searchParams, navigate, setToken, setRol]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-green-100">
      <FaSpinner className="text-6xl text-teal-800 animate-spin mb-4" />
      <h2 className="text-2xl font-semibold text-teal-800 mb-2">
        Autenticando con Google...
      </h2>
      <p className="text-gray-600">Por favor espera un momento</p>
    </div>
  );
};

export default GoogleCallback;