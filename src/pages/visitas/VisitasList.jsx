import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const VisitasList = () => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitas();
  }, []);

  const fetchVisitas = async () => {
    try {
      const response = await api.get('/visitas');
      setVisitas(response.data.visitas);
    } catch (error) {
      toast.error('Error al cargar visitas');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    let descripcion = '';
    
    if (status === 'cancelada') {
      descripcion = window.prompt('Motivo de cancelación:');
      if (!descripcion) return;
    } else {
      descripcion = 'sin novedad';
    }

    try {
      await api.patch(`/visitas/${id}/estado`, { status, descripcion });
      toast.success(`Visita marcada como ${status}`);
      fetchVisitas();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al actualizar');
    }
  };

  if (loading) return <div className="text-center py-12">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">Visitas</h1>
        <div className="space-x-4">
          <Link
            to="/visitas/disponibilidad"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
          >
            Ver Disponibilidad
          </Link>
          <Link
            to="/visitas/crear"
            className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 inline-flex items-center space-x-2"
          >
            <FaPlus /> <span>Registrar Visita</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Institución</th>
              <th className="px-6 py-3 text-left">Fecha</th>
              <th className="px-6 py-3 text-left">Hora</th>
              <th className="px-6 py-3 text-left">Personas</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita) => (
              <tr key={visita.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{visita.institucion}</td>
                <td className="px-6 py-4">{visita.fechaVisita}</td>
                <td className="px-6 py-4">{visita.horaBloque}</td>
                <td className="px-6 py-4">{visita.cantidadPersonas}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    visita.status === 'realizada' ? 'bg-green-100 text-green-800' :
                    visita.status === 'cancelada' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {visita.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  {visita.status === 'pendiente' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(visita.id, 'realizada')}
                        className="text-green-600 hover:text-green-800 inline-flex items-center space-x-1"
                        title="Marcar como realizada"
                      >
                        <FaCheckCircle />
                        <span className="text-xs">Realizada</span>
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(visita.id, 'cancelada')}
                        className="text-red-600 hover:text-red-800 inline-flex items-center space-x-1"
                        title="Cancelar"
                      >
                        <FaTimesCircle />
                        <span className="text-xs">Cancelar</span>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visitas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay visitas registradas
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitasList;
