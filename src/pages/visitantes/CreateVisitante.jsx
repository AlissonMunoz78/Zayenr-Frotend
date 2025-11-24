import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const CreateVisitante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    institucion: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/visitantes', formData);
      toast.success('Visitante registrado correctamente');
      navigate('/visitantes');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al registrar visitante');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-6">
          Registrar Visitante
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Carlos Rodríguez"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cédula (10 dígitos)
            </label>
            <input
              type="text"
              name="cedula"
              placeholder="1234567890"
              value={formData.cedula}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institución
            </label>
            <input
              type="text"
              name="institucion"
              placeholder="Universidad XYZ"
              value={formData.institucion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 font-semibold"
          >
            Registrar Visitante
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVisitante;