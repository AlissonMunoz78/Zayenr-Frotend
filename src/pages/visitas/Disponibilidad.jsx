import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import api from '../../api/axios';

const Disponibilidad = () => {
  const [fecha, setFecha] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get(`/visitas/disponibilidad?fecha=${fecha}`);
      setDisponibilidad(response.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al consultar');
      setDisponibilidad(null);
    } finally {
      setLoading(false);
    }
  };

  // Fecha mínima: mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-6">
          Consultar Disponibilidad
        </h1>

        <form onSubmit={handleSearch} className="flex space-x-4 mb-8">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={minDate}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            required
          />
          <button
            type="submit"
            className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center space-x-2"
          >
            <FaSearch /> <span>Consultar</span>
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800 mx-auto"></div>
          </div>
        )}

        {disponibilidad && !loading && (
          <div>
            <div className="mb-6 p-4 bg-teal-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <p className="text-sm text-gray-700">
                  <strong>Fecha:</strong> {disponibilidad.fecha}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Día:</strong> {disponibilidad.diaSemana}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Horario:</strong> {disponibilidad.horarioAtencion}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Capacidad por bloque:</strong> {disponibilidad.capacidadMaximaPorBloque} personas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {disponibilidad.bloques.map((bloque) => (
                <div
                  key={bloque.hora}
                  className={`p-4 rounded-lg border-2 ${
                    bloque.estado === 'completo'
                      ? 'border-red-300 bg-red-50'
                      : bloque.estado === 'casi_lleno'
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-green-300 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">{bloque.hora}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        bloque.estado === 'completo'
                          ? 'bg-red-200 text-red-800'
                          : bloque.estado === 'casi_lleno'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {bloque.estado === 'completo'
                        ? 'Completo'
                        : bloque.estado === 'casi_lleno'
                        ? 'Casi lleno'
                        : 'Disponible'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Ocupados:</strong> {bloque.ocupados}/{bloque.capacidadMaxima}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Disponibles:</strong> {bloque.disponibles}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {bloque.porcentajeOcupacion}% ocupado
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Disponibilidad;