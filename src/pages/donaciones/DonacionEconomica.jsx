import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const DonacionEconomica = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreDonante: '',
    institucion: '',
    monto: '',
    descripcion: '',
  });
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Crear donación
      const response = await api.post('/donaciones/economica', formData);
      const donacionId = response.data.donacion.id;

      // Crear sesión de pago con Stripe
      const paymentResponse = await api.post('/donaciones/pago', { donacionId });
      
      // Redirigir a Stripe Checkout
      window.location.href = paymentResponse.data.url;
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al procesar donación');
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-6">
          Donación Económica
        </h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            Serás redirigido a la plataforma de pago segura de Stripe para completar tu donación.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del donante
            </label>
            <input
              type="text"
              name="nombreDonante"
              placeholder="Juan Pérez"
              value={formData.nombreDonante}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
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
              placeholder="Empresa XYZ"
              value={formData.institucion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto (USD)
            </label>
            <input
              type="number"
              name="monto"
              placeholder="100.00"
              value={formData.monto}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              name="descripcion"
              placeholder="Mensaje o propósito de la donación"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
          >
            {processing ? 'Procesando...' : 'Proceder al Pago'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonacionEconomica;