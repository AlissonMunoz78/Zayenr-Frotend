import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaSpinner, FaTrash } from 'react-icons/fa';
import api from '../../api/axios';

const VisitanteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [visitante, setVisitante] = useState(null);

  useEffect(() => {
    fetchVisitante();
  }, [id]);

  const fetchVisitante = async () => {
    try {
      const response = await api.get(`/visitantes/${id}`);
      setVisitante(response.data);
    } catch (error) {
      toast.error('Error al cargar visitante');
      navigate('/visitantes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar este visitante?')) return;

    try {
      await api.delete(`/visitantes/${id}`);
      toast.success('Visitante eliminado');
      navigate('/visitantes');
    } catch (error) {
      toast.error('Error al eliminar visitante');
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          to="/visitantes"
          className="text-teal-800 hover:text-teal-600 flex items-center space-x-2"
        >
          <FaArrowLeft />
          <span>Volver a lista de visitantes</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-playfair font-bold text-teal-800">
            Detalle del Visitante
          </h1>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <FaTrash />
            <span>Eliminar</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Nombre completo</label>
              <p className="text-lg font-semibold text-gray-800">{visitante.nombre}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Cédula</label>
              <p className="text-lg font-semibold text-gray-800">{visitante.cedula}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Institución</label>
              <p className="text-lg font-semibold text-gray-800">{visitante.institucion}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Fecha de visita</label>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(visitante.fecha).toLocaleDateString('es-EC', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitanteDetail;