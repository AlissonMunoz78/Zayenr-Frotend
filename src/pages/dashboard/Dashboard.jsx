import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaDonate, FaUserPlus } from 'react-icons/fa';
import api from '../../api/axios';
import storeAuth from '../../context/storeAuth';

const Dashboard = () => {
  const { rol } = storeAuth();
  const [stats, setStats] = useState({
    visitas: 0,
    donaciones: 0,
    visitantes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [visitasRes, donacionesRes, visitantesRes] = await Promise.all([
          api.get('/visitas/estadisticas'),
          api.get('/donaciones/estadisticas'),
          api.get('/visitantes/estadisticas'),
        ]);

        setStats({
          visitas: visitasRes.data.totalVisitas || 0,
          donaciones: donacionesRes.data.economicas.totalRecaudado || 0,
          visitantes: visitantesRes.data.totalVisitantes || 0,
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Visitas',
      value: stats.visitas,
      icon: FaCalendarAlt,
      color: 'bg-blue-500',
      link: '/visitas',
    },
    {
      title: 'Donaciones',
      value: `$${stats.donaciones.toFixed(2)}`,
      icon: FaDonate,
      color: 'bg-green-500',
      link: '/donaciones',
    },
    {
      title: 'Visitantes',
      value: stats.visitantes,
      icon: FaUsers,
      color: 'bg-purple-500',
      link: '/visitantes',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-playfair font-bold text-teal-800 mb-2">
          Dashboard - Museo Zayen
        </h1>
        <p className="text-gray-600">
          Bienvenido, <span className="font-semibold capitalize">{rol}</span>
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-800 mx-auto"></div>
          <p className="text-gray-600 mt-4">Cargando estadísticas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                </div>
                <div className={`${card.color} p-4 rounded-full`}>
                  <card.icon className="text-white text-2xl" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-teal-800 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/visitas/crear"
            className="bg-teal-800 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition text-center"
          >
            Registrar Visita
          </Link>
          <Link
            to="/visitantes/crear"
            className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition text-center"
          >
            Registrar Visitante
          </Link>
          <Link
            to="/donaciones"
            className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition text-center"
          >
            Ver Donaciones
          </Link>
          {rol === 'administrador' && (
            <Link
              to="/adminis/crear"
              className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition text-center"
            >
              Crear Admini
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;