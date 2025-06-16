import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminPasantes from "../pages/AdminPasantes"; // componente para admin

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState('PASANTE');
  const [imagen, setImagen] = useState(null);

  const urlActual = location.pathname;

  useEffect(() => {
    const userString = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    let usuarioLS;

    try {
      usuarioLS = JSON.parse(userString);
    } catch (error) {
      console.error('Error al parsear usuario:', error);
      navigate('/');
      return;
    }

    const obtenerDatosPasante = async () => {
      try {
        const respuesta = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/pasantes/perfil/${usuarioLS.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const datos = await respuesta.json();

        if (respuesta.ok) {
          setUsuario(datos);
          setRol(datos.rol || 'PASANTE');
        } else {
          console.error('Error en respuesta del perfil:', datos.msg || datos.error);
        }
      } catch (error) {
        console.error('Error al obtener perfil del pasante:', error);
      }
    };

    obtenerDatosPasante();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    navigate('/');
  };

  // Mostrar mensaje de carga mientras se obtiene el usuario
  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-800">Cargando datos del usuario...</p>
      </div>
    );
  }

  return (
    <div className="md:flex md:min-h-screen">
      {/* Panel lateral */}
      <div className="md:w-1/5 bg-gray-800 px-5 py-4">
        <h2 className="text-4xl font-black text-center text-slate-200">ZAYEN</h2>

        <img
          src={imagen || 'https://cdn-icons-png.flaticon.com/512/2138/2138508.png'}
          alt="img-client"
          className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full object-cover"
          width={120}
          height={120}
        />

        <p className="text-slate-400 text-center my-4 text-sm">
          <span className="bg-green-600 w-3 h-3 inline-block rounded-full"></span> Bienvenido - {usuario?.nombre}
        </p>

        <p className="text-slate-400 text-center my-4 text-sm">Rol - {rol}</p>

        <hr className="mt-5 border-slate-500" />

        <ul className="mt-5">
          {[
            { to: '/dashboard', label: 'Perfil' },
            { to: '/dashboard/listar', label: 'Listar' },
            { to: '/dashboard/crear', label: 'Crear' },
            { to: '/dashboard/chat', label: 'Chat' }
          ].map(({ to, label }) => (
            <li key={to} className="text-center">
              <Link
                to={to}
                className={`${
                  urlActual === to
                    ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center'
                    : 'text-slate-600'
                } text-xl block mt-2 hover:text-slate-600`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col justify-between h-screen bg-gray-100">
        {/* Barra superior */}
        <div className="bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center px-4">
          <div className="text-md font-semibold text-slate-100">Usuario - {usuario?.nombre}</div>
          <div>
            <img
              src={imagen || 'https://cdn-icons-png.flaticon.com/512/4715/4715329.png'}
              alt="img-client"
              className="border-2 border-green-600 rounded-full object-cover"
              width={50}
              height={50}
            />
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg"
              aria-label="Cerrar sesión"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Sección dinámica */}
        <div className="overflow-y-scroll p-8">
          <Outlet context={{ usuario }} />

          {/* ✅ NUEVO: Mostrar tabla de pasantes si el rol es ADMIN */}
          {rol === 'ADMIN' && (
            <div className="mt-10">
              <AdminPasantes />
            </div>
          )}
        </div>

        {/* Pie de página */}
        <div className="bg-gray-800 h-12">
          <p className="text-center text-slate-100 leading-[2.9rem] underline">
            Todos los derechos reservados @Zayen 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
