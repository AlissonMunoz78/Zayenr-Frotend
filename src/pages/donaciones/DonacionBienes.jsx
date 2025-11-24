import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

const DonacionBienes = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreDonante: '',
    institucion: '',
    descripcionBien: '',
    estadoBien: 'nuevo',
    descripcion: '',
  });
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    
    // Preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!foto) {
      toast.error('Debes subir una foto del bien');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('nombreDonante', formData.nombreDonante);
    data.append('institucion', formData.institucion);
    data.append('descripcionBien', formData.descripcionBien);
    data.append('estadoBien', formData.estadoBien);
    data.append('descripcion', formData.descripcion);
    data.append('fotoBien', foto);

    try {
      await api.post('/donaciones/bienes', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Donación registrada correctamente');
      navigate('/donaciones');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al registrar donación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-6">
          Donación de Bienes
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Tu donación será revisada por el equipo del museo antes de ser aceptada.
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
              placeholder="María García"
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
              Descripción detallada del bien
            </label>
            <textarea
              name="descripcionBien"
              placeholder="Describe el bien que deseas donar..."
              value={formData.descripcionBien}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado del bien
            </label>
            <select
              name="estadoBien"
              value={formData.estadoBien}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto del bien *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas adicionales (opcional)
            </label>
            <textarea
              name="descripcion"
              placeholder="Información adicional..."
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              rows="2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrar Donación'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonacionBienes;