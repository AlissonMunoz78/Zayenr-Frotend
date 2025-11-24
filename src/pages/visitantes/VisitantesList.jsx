import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const VisitantesList = () => {
  const [visitantes, setVisitantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitantes();
  }, []);

  const fetchVisitantes = async () => {
    try {
      const response = await api.get('/visitantes');
      setVisitantes(response.data.visitantes);
    } catch (error) {
      toast.error('Error al cargar visitantes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">Visitantes</h1>
        <Link
          to="/visitantes/crear"
          className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center space-x-2"
        >
          <FaPlus /> <span>Registrar Visitante</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Cédula</th>
              <th className="px-6 py-3 text-left">Institución</th>
              <th className="px-6 py-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((visitante) => (
              <tr key={visitante._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{visitante.nombre}</td>
                <td className="px-6 py-4">{visitante.cedula}</td>
                <td className="px-6 py-4">{visitante.institucion}</td>
                <td className="px-6 py-4">
                  {new Date(visitante.fecha).toLocaleDateString('es-EC')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visitantes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay visitantes registrados
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitantesList;