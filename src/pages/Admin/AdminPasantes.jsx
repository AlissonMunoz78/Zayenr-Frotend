import React, { useEffect, useState } from 'react';

const AdminPasantes = () => {
  const [pasantes, setPasantes] = useState([]);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const obtenerPasantes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/pasantes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPasantes(data);
      } catch (err) {
        setError('Error al cargar pasantes');
      }
    };
    obtenerPasantes();
  }, [token]);

  const handleSelect = (id) => {
    if (editId && id !== editId) {
      if (!window.confirm('Estás editando un pasante, ¿quieres cancelar la edición?')) return;
      cancelarEdicion();
    }
    setSelectedId(id);
  };

  const empezarEdicion = () => {
    if (!selectedId) {
      setError('Selecciona un pasante para editar');
      return;
    }
    const pasante = pasantes.find((p) => p._id === selectedId);
    setEditId(selectedId);
    setEditData({
      nombre: pasante.nombre,
      email: pasante.email,
      facultad: pasante.facultad || '',
      celular: pasante.celular || '',
    });
    setError('');
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditData({});
    setError('');
  };

  const guardarEdicion = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/pasantes/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) throw new Error('Error al guardar cambios');

      setPasantes(
        pasantes.map((p) => (p._id === editId ? { ...p, ...editData } : p))
      );
      cancelarEdicion();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarPasante = async () => {
    if (!selectedId) {
      setError('Selecciona un pasante para eliminar');
      return;
    }
    if (!window.confirm('¿Seguro que deseas eliminar este pasante?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/pasantes/${selectedId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al eliminar');

      setPasantes(pasantes.filter((p) => p._id !== selectedId));
      setSelectedId(null);
      if (editId === selectedId) cancelarEdicion();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-teal-800">Lista de Pasantes</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="w-full border border-teal-300 rounded">
        <thead className="bg-green-100">
          <tr>
            <th className="p-3 border border-teal-300">Seleccionar</th>
            <th className="p-3 border border-teal-300">Nombre</th>
            <th className="p-3 border border-teal-300">Correo</th>
            <th className="p-3 border border-teal-300">Facultad</th>
            <th className="p-3 border border-teal-300">Celular</th>
          </tr>
        </thead>
        <tbody>
          {pasantes.map((pasante) => (
            <tr
              key={pasante._id}
              className={`text-center border-t border-teal-300 ${
                selectedId === pasante._id ? 'bg-green-50' : ''
              }`}
            >
              <td className="p-2 border border-teal-300">
                <input
                  type="radio"
                  name="selectedPasante"
                  checked={selectedId === pasante._id}
                  onChange={() => handleSelect(pasante._id)}
                />
              </td>
              <td className="p-2 border border-teal-300">
                {editId === pasante._id ? (
                  <input
                    type="text"
                    name="nombre"
                    value={editData.nombre}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  pasante.nombre
                )}
              </td>
              <td className="p-2 border border-teal-300">
                {editId === pasante._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  pasante.email
                )}
              </td>
              <td className="p-2 border border-teal-300">
                {editId === pasante._id ? (
                  <input
                    type="text"
                    name="facultad"
                    value={editData.facultad}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Facultad"
                  />
                ) : (
                  pasante.facultad || '-'
                )}
              </td>
              <td className="p-2 border border-teal-300">
                {editId === pasante._id ? (
                  <input
                    type="text"
                    name="celular"
                    value={editData.celular}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Celular"
                  />
                ) : (
                  pasante.celular || '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 space-x-3">
        {editId ? (
          <>
            <button
              onClick={guardarEdicion}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar
            </button>
            <button
              onClick={cancelarEdicion}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={empezarEdicion}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={eliminarPasante}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPasantes;
