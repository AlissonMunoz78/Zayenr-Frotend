import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const AdminisList = () => {
  const [adminis, setAdminis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminis();
  }, []);

  const fetchAdminis = async () => {
    try {
      const response = await api.get('/admin/adminis');
      setAdminis(response.data);
    } catch (error) {
      toast.error('Error al cargar adminis');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este admini?')) return;
    try {
      await api.delete(`/admin/adminis/${id}`);
      toast.success('Admini eliminado');
      fetchAdminis();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al eliminar');
    }
  };

  if (loading) return <div className="text-center py-12">Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">Adminis</h1>
        <Link
          to="/adminis/crear"
          className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center space-x-2"
        >
          <FaPlus /> <span>Crear Admini</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Tipo</th>
              <th className="px-6 py-3 text-left">Facultad</th>
              <th className="px-6 py-3 text-left">Horas</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {adminis.map((admini) => (
              <tr key={admini._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{admini.nombre}</td>
                <td className="px-6 py-4">{admini.email}</td>
                <td className="px-6 py-4 capitalize">{admini.tipo}</td>
                <td className="px-6 py-4">{admini.facultad || '-'}</td>
                <td className="px-6 py-4">{admini.horasDePasantia || '-'}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(admini._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {adminis.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay adminis registrados
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminisList;
