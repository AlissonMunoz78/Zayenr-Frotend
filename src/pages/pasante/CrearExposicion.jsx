import { useState } from 'react';

const Create = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenFile, setImagenFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !descripcion || !imagenFile || !audioFile) {
            setError("Todos los campos (nombre, descripción, imagen y audio) son obligatorios.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagenFile);
        formData.append('audio', audioFile);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exposiciones/crearExposicion`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.msg || "Error al crear la publicación");

            setMessage('¡Publicación creada con éxito!');
            setNombre('');
            setDescripcion('');
            setImagenFile(null);
            setAudioFile(null);
            e.target.reset();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Crear Publicación para el Museo</h1>
            <hr className='my-4 border-gray-300' />
            <p className='mb-8'>Añade una nueva pieza a la colección con su imagen y audioguía.</p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <label className="block mb-1 font-semibold text-gray-600">Nombre de la Pieza</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ej: Máscara ceremonial"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-600">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Describe la pieza, su historia y características..."
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-600">Fotografía de la Pieza</label>
                    <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} className='w-full' required />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-600">Audio Guía</label>
                    <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className='w-full' required />
                </div>

                {message && <p className="text-green-600 text-center">{message}</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}

                <button
                    type="submit"
                    className="bg-teal-800 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition w-full disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? 'Publicando...' : 'Publicar'}
                </button>
            </form>
        </div>
    );
};

export default Create;
