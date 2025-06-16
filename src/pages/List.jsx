import { useEffect, useState } from 'react';

const List = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publicaciones`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (!response.ok) throw new Error('No se pudieron cargar las publicaciones.');
                
                const data = await response.json();
                setPublicaciones(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublicaciones();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Cargando publicaciones...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div>
            <h1 className="font-black text-4xl text-gray-500">Publicaciones del Museo</h1>
            <hr className="my-4 border-gray-300" />
            <p className="mb-8">Explora todas las piezas y audioguías agregadas por los pasantes.</p>

            {publicaciones.length === 0 ? (
                <p className="text-gray-600 text-lg text-center">Aún no hay publicaciones disponibles.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicaciones.map((pub) => (
                        <div key={pub._id} className="bg-white rounded-lg shadow-md overflow-hidden border flex flex-col">
                            <img
                                src={pub.imagen.secure_url}
                                alt={pub.descripcion}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <p className="text-gray-600 mb-4 flex-grow h-20 overflow-y-auto">{pub.descripcion}</p>
                                
                                {pub.audio?.secure_url && (
                                    <div className="mb-3">
                                        <audio controls className="w-full h-10">
                                            <source src={pub.audio.secure_url} type={pub.audio.format || 'audio/mpeg'} />
                                            Tu navegador no soporta el audio.
                                        </audio>
                                    </div>
                                )}
                                
                                <div className="border-t pt-3 mt-auto">
                                    <p className="text-sm font-semibold text-gray-700">Creado por:</p>
                                    <p className="text-teal-800">{pub.autor.nombre}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default List;