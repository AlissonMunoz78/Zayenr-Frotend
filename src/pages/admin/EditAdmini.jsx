import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import api from '../../api/axios';

const EditAdmini = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [admini, setAdmini] = useState(null);
  const [formData, setFormData] = useState({
    celular: '',
    facultad: '',
    horasDePasantia: 0
  });

  useEffect(() => {
    fetchAdmini();
  }, [id]);

  const fetchAdmini = async () => {
    try {
      const response = await api.get(`/admin/adminis/${id}`);
      setAdmini(response.data);
      setFormData({
        celular: response.data.celular || '',
        facultad: response.data.facultad || '',
        horasDePasantia: response.data.horasDePasantia || 0
      });
    } catch (error) {
      toast.error('Error al cargar admini');
      navigate('/adminis');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/admin/adminis/${id}`, formData);
      toast.success('Admini actualizado correctamente');
      navigate('/adminis');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al actualizar admini');
    } finally {
      setSaving(false);
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
          to="/adminis"
          className="text-teal-800 hover:text-teal-600 flex items-center space-x-2"
        >
          <FaArrowLeft />
          <span>Volver a lista de adminis</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-6">
          Editar Admini
        </h1>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">
            <strong>Nombre:</strong> {admini.nombre}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {admini.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Tipo:</strong> <span className="capitalize">{admini.tipo}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Celular
            </label>
            <input
              type="text"
              name="celular"
              placeholder="0999999999"
              value={formData.celular}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              pattern="09[0-9]{8}"
              required
            />
          </div>

          {admini.tipo === 'estudiante' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facultad
                </label>
                <input
                  type="text"
                  name="facultad"
                  placeholder="Ej: Ingeniería de Sistemas"
                  value={formData.facultad}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horas de pasantía
                </label>
                <input
                  type="number"
                  name="horasDePasantia"
                  placeholder="0"
                  value={formData.horasDePasantia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  min="0"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 font-semibold disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdmini;