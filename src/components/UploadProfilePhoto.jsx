import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaCamera, FaSpinner, FaTimes } from 'react-icons/fa';
import api from '../api/axios';

const UploadProfilePhoto = ({ userId, currentPhoto, userType = 'admin', onPhotoUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentPhoto);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten archivos de imagen');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe superar 5MB');
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Subir archivo
    setUploading(true);

    const formData = new FormData();
    formData.append('fotoPerfil', file);

    try {
      const endpoint = userType === 'pasante' 
        ? '/pasante/perfil/foto'
        : `/admin/perfil/${userId}/foto`;

      const response = await api.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Foto de perfil actualizada');
      
      if (onPhotoUpdate) {
        onPhotoUpdate(response.data.fotoPerfil);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al subir foto');
      setPreview(currentPhoto); // Revertir preview
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Preview de la foto */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaCamera className="text-4xl text-gray-400" />
          )}
        </div>
        
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <FaSpinner className="text-white text-2xl animate-spin" />
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="photo-upload"
        />
        
        <label
          htmlFor="photo-upload"
          className={`bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition cursor-pointer flex items-center space-x-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaCamera />
          <span>{preview ? 'Cambiar foto' : 'Subir foto'}</span>
        </label>

        {preview && !uploading && (
          <button
            onClick={handleRemovePhoto}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
          >
            <FaTimes />
            <span>Quitar</span>
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">
        JPG, PNG o WEBP. Máximo 5MB.
      </p>
    </div>
  );
};

export default UploadProfilePhoto;