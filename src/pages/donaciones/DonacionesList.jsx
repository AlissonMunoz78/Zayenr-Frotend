import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaBox, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const DonacionesList = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonaciones();
  }, []);

  const fetchDonaciones = async () => {
    try {
      const response = await api.get('/donaciones');
      setDonaciones(response.data.donaciones);
    } catch (error) {
      toast.error('Error al cargar donaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBienStatus = async (id, status) => {
    if (!window.confirm(`¿${status === 'aceptada' ? 'Aceptar' : 'Rechazar'} esta donación?`)) return;
    
    try {
      await api.patch(`/donaciones/${id}/estado-bien`, { status });
      toast.success(`Donación ${status === 'aceptada' ? 'aceptada' : 'rechazada'}`);
      fetchDonaciones();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al actualizar');
    }
  };

  if (loading) return <div className="text-center py-12">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">Donaciones</h1>
        <div className="space-x-4">
          <Link
            to="/donaciones/economica"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 inline-flex items-center space-x-2"
          >
            <FaDollarSign /> <span>Nueva Económica</span>
          </Link>
          <Link
            to="/donaciones/bienes"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center space-x-2"
          >
            <FaBox /> <span>Nueva de Bienes</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Donante</th>
              <th className="px-6 py-3 text-left">Institución</th>
              <th className="px-6 py-3 text-left">Tipo</th>
              <th className="px-6 py-3 text-left">Monto/Descripción</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {donaciones.map((donacion) => (
              <tr key={donacion.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{donacion.nombreDonante}</td>
                <td className="px-6 py-4">{donacion.institucion}</td>
                <td className="px-6 py-4">
                  <span className="capitalize">{donacion.tipoDonacion}</span>
                </td>
                <td className="px-6 py-4">
                  {donacion.tipoDonacion === 'economica'
                    ? `$${donacion.monto?.toFixed(2)}`
                    : donacion.descripcionBien}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    donacion.status === 'completada' || donacion.status === 'aceptada'
                      ? 'bg-green-100 text-green-800'
                      : donacion.status === 'no_aceptada' || donacion.status === 'fallida'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donacion.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  {donacion.tipoDonacion === 'bienes' && donacion.status === 'pendiente' && (
                    <>
                      <button
                        onClick={() => handleUpdateBienStatus(donacion.id, 'aceptada')}
                        className="text-green-600 hover:text-green-800 inline-flex items-center space-x-1"
                      >
                        <FaCheckCircle />
                        <span className="text-xs">Aceptar</span>
                      </button>
                      <button
                        onClick={() => handleUpdateBienStatus(donacion.id, 'no_aceptada')}
                        className="text-red-600 hover:text-red-800 inline-flex items-center space-x-1"
                      >
                        <FaTimesCircle />
                        <span className="text-xs">Rechazar</span>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {donaciones.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay donaciones registradas
          </div>
        )}
      </div>
    </div>
  );
};

export default DonacionesList;