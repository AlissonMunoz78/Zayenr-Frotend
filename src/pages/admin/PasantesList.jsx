import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const PasantesList = () => {
  const [pasantes, setPasantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPasantes();
  }, []);

  const fetchPasantes = async () => {
    try {
      const response = await api.get('/admin/pasantes');
      setPasantes(response.data);
    } catch (error) {
      toast.error('Error al cargar pasantes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este pasante?')) return;
    try {
      await api.delete(`/admin/pasantes/${id}`);
      toast.success('Pasante eliminado');
      fetchPasantes();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al eliminar');
    }
  };

  if (loading) return <div className="text-center py-12">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">Pasantes</h1>
        <Link
          to="/pasantes/crear"
          className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center space-x-2"
        >
          <FaPlus /> <span>Crear Pasante</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Facultad</th>
              <th className="px-6 py-3 text-left">Horas</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pasantes.map((pasante) => (
              <tr key={pasante._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{pasante.nombre}</td>
                <td className="px-6 py-4">{pasante.email}</td>
                <td className="px-6 py-4">{pasante.facultad}</td>
                <td className="px-6 py-4">{pasante.horasDePasantia}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(pasante._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pasantes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay pasantes registrados
          </div>
        )}
      </div>
    </div>
  );
};

export default PasantesList;
