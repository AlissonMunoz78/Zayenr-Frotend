import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import api from '../../api/axios';

const ConfirmAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await api.get(`/admin/confirmar/${token}`);
        setStatus('success');
        toast.success(response.data.msg);
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setStatus('error');
        toast.error(error.response?.data?.msg || 'Token inválido o expirado');
      }
    };

    confirmAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-green-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        {status === 'loading' && (
          <>
            <FaSpinner className="text-6xl text-teal-800 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-teal-800 mb-2">Confirmando cuenta...</h2>
            <p className="text-gray-600">Por favor espera</p>
          </>
        )}

        {status === 'success' && (
          <>
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">¡Cuenta confirmada!</h2>
            <p className="text-gray-600 mb-4">
              Tu cuenta ha sido activada correctamente. Redirigiendo al login...
            </p>
            <Link to="/login" className="text-teal-800 hover:underline font-semibold">
              Ir al login ahora
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-700 mb-2">Error al confirmar</h2>
            <p className="text-gray-600 mb-4">
              El token es inválido o ha expirado. Por favor contacta al administrador.
            </p>
            <Link
              to="/login"
              className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition inline-block"
            >
              Volver al login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmAccount;