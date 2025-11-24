import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const CreateVisita = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    institucion: '',
    cantidadPersonas: '',
    fechaVisita: '',
    horaBloque: ''
  });
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fecha mínima: mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Si cambia la fecha, consultar disponibilidad
    if (e.target.name === 'fechaVisita' && e.target.value) {
      consultarDisponibilidad(e.target.value);
    }
  };

  const consultarDisponibilidad = async (fecha) => {
    try {
      const response = await api.get(`/visitas/disponibilidad?fecha=${fecha}`);
      setDisponibilidad(response.data);
    } catch (error) {
      toast.error('Error al consultar disponibilidad');
      setDisponibilidad(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/visitas', formData);
      toast.success('Visita registrada correctamente');
      navigate('/visitas');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al registrar visita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-6">
          Registrar Visita Grupal
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            ℹ️ Las visitas grupales deben tener entre 2 y 25 personas. Se asignan por bloques de 30 minutos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de personas (2-25)
            </label>
            <input
              type="number"
              name="cantidadPersonas"
              placeholder="15"
              value={formData.cantidadPersonas}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              min="2"
              max="25"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de visita
            </label>
            <input
              type="date"
              name="fechaVisita"
              value={formData.fechaVisita}
              onChange={handleChange}
              min={minDate}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Debe ser con al menos 1 día de anticipación (Lunes a Viernes)
            </p>
          </div>

          {disponibilidad && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bloque horario disponible
              </label>
              <select
                name="horaBloque"
                value={formData.horaBloque}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="">Seleccione un horario</option>
                {disponibilidad.bloques
                  .filter(bloque => bloque.estado !== 'completo')
                  .map(bloque => (
                    <option key={bloque.hora} value={bloque.hora}>
                      {bloque.hora} - {bloque.disponibles} cupos disponibles
                      {bloque.estado === 'casi_lleno' ? ' (⚠️ Casi lleno)' : ''}
                    </option>
                  ))}
              </select>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {disponibilidad.bloques.map(bloque => (
                  <div
                    key={bloque.hora}
                    className={`p-2 rounded text-xs text-center ${
                      bloque.estado === 'completo'
                        ? 'bg-red-100 text-red-800'
                        : bloque.estado === 'casi_lleno'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    <div className="font-bold">{bloque.hora}</div>
                    <div>{bloque.disponibles} disponibles</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !formData.horaBloque}
            className="w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrar Visita'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVisita;