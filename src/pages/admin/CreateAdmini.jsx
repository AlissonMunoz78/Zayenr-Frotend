import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const CreateAdmini = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    celular: '',
    tipo: 'administrativo',
    facultad: '',
    horasDePasantia: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/adminis', formData);
      toast.success('Admini creado correctamente');
      navigate('/adminis');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al crear admini');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-6">Crear Admini</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              placeholder="Juan Pérez"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Celular</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="administrativo">Administrativo</option>
              <option value="estudiante">Estudiante</option>
            </select>
          </div>

          {formData.tipo === 'estudiante' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facultad</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Horas de pasantía</label>
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
            className="w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 font-semibold"
          >
            Crear Admini
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmini;