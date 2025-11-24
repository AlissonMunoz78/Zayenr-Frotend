import { Link, useNavigate } from 'react-router-dom';
import storeAuth from '../context/storeAuth';
import { FaUserCircle, FaHome, FaUsers, FaCalendarAlt, FaDonate, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const Navbar = () => {
  const { rol, clearToken } = storeAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="bg-teal-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-playfair font-bold">Museo Zayen</span>
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center space-x-1 hover:text-teal-200 transition">
              <FaHome />
              <span>Inicio</span>
            </Link>

            {/* Solo Administrador puede ver Adminis */}
            {rol === 'administrador' && (
              <Link to="/adminis" className="flex items-center space-x-1 hover:text-teal-200 transition">
                <FaUserShield />
                <span>Adminis</span>
              </Link>
            )}

            {/* Todos menos pasante pueden ver Pasantes */}
            {rol !== 'pasante' && (
              <Link to="/pasantes" className="flex items-center space-x-1 hover:text-teal-200 transition">
                <FaUsers />
                <span>Pasantes</span>
              </Link>
            )}

            <Link to="/visitas" className="flex items-center space-x-1 hover:text-teal-200 transition">
              <FaCalendarAlt />
              <span>Visitas</span>
            </Link>

            <Link to="/donaciones" className="flex items-center space-x-1 hover:text-teal-200 transition">
              <FaDonate />
              <span>Donaciones</span>
            </Link>

            <Link to="/visitantes" className="flex items-center space-x-1 hover:text-teal-200 transition">
              <FaUsers />
              <span>Visitantes</span>
            </Link>

            {/* Perfil y Logout */}
            <div className="flex items-center space-x-4 border-l border-teal-600 pl-6">
              <Link to="/perfil" className="flex items-center space-x-1 hover:text-teal-200 transition">
                <FaUserCircle className="text-xl" />
                <span>Perfil</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-red-300 transition"
              >
                <FaSignOutAlt />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;