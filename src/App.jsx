import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Layout from './components/Layout';

// Auth
import Login from './pages/auth/Login';
import GoogleCallback from './pages/auth/GoogleCallback';
import ConfirmAccount from './pages/auth/ConfirmAccount';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import ChangePassword from './pages/dashboard/ChangePassword';

// Admin
import AdminisList from './pages/admin/AdminisList';
import CreateAdmini from './pages/admin/CreateAdmini';
import PasantesList from './pages/admin/PasantesList';
import CreatePasante from './pages/admin/CreatePasante';

// Visitas
import VisitasList from './pages/visitas/VisitasList';
import CreateVisita from './pages/visitas/CreateVisita';
import Disponibilidad from './pages/visitas/Disponibilidad';

// Donaciones
import DonacionesList from './pages/donaciones/DonacionesList';
import DonacionEconomica from './pages/donaciones/DonacionEconomica';
import DonacionBienes from './pages/donaciones/DonacionBienes';
import { DonationsSuccess } from './pages/DonationsSuccess';
import { DonationsCancel } from './pages/DonationsCancel';

// Visitantes
import VisitantesList from './pages/visitantes/VisitantesList';
import CreateVisitante from './pages/visitantes/CreateVisitante';

// Error pages
import { NotFound } from './pages/NotFound';
import { Forbidden } from './pages/Forbidden';

// Routers
import ProtectedRoute from './routers/ProtectedRouter';
import PublicRoute from './routers/PublicRouter';
import PrivateRouteWithRole from './routers/PrivateRouteWhitRole';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/confirmar/:token" element={<ConfirmAccount />} />
        </Route>

        {/* Callback Google */}
        <Route path="/auth/callback" element={<GoogleCallback />} />

        {/* Donaciones públicas */}
        <Route path="/donacion/exitosa" element={<DonationsSuccess />} />
        <Route path="/donacion/cancelada" element={<DonationsCancel />} />

        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/cambiar-password" element={<ChangePassword />} />

            {/* Adminis - Solo Administrador */}
            <Route path="/adminis" element={
              <PrivateRouteWithRole rolPermitido="administrador">
                <AdminisList />
              </PrivateRouteWithRole>
            } />
            <Route path="/adminis/crear" element={
              <PrivateRouteWithRole rolPermitido="administrador">
                <CreateAdmini />
              </PrivateRouteWithRole>
            } />

            {/* Pasantes - Admin y Admini */}
            <Route path="/pasantes" element={<PasantesList />} />
            <Route path="/pasantes/crear" element={<CreatePasante />} />

            {/* Visitas */}
            <Route path="/visitas" element={<VisitasList />} />
            <Route path="/visitas/crear" element={<CreateVisita />} />
            <Route path="/visitas/disponibilidad" element={<Disponibilidad />} />

            {/* Donaciones */}
            <Route path="/donaciones" element={<DonacionesList />} />
            <Route path="/donaciones/economica" element={<DonacionEconomica />} />
            <Route path="/donaciones/bienes" element={<DonacionBienes />} />

            {/* Visitantes */}
            <Route path="/visitantes" element={<VisitantesList />} />
            <Route path="/visitantes/crear" element={<CreateVisitante />} />
          </Route>
        </Route>

        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;