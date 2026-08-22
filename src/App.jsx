import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import CitizenLayout from './layouts/CitizenLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Landing from './pages/public/Landing.jsx';
import Inicio from './shell/pages/Inicio.jsx';
import ServiceRouter from './shell/pages/ServiceRouter.jsx';
import Login from './pages/public/Login.jsx';
import Registro from './pages/public/Registro.jsx';
import Terminos from './pages/public/Terminos.jsx';
import Privacidad from './pages/public/Privacidad.jsx';
import Cookies from './pages/public/Cookies.jsx';
import Chat from './pages/citizen/Chat.jsx';
import Perfil from './pages/citizen/Perfil.jsx';
import MisPeticiones from './pages/citizen/MisPeticiones.jsx';
import Derivacion from './pages/citizen/Derivacion.jsx';
import Planes from './pages/citizen/Planes.jsx';
import Checkout from './pages/citizen/Checkout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ClientProfile from './pages/admin/ClientProfile.jsx';
import AdminAjustes from './pages/admin/Ajustes.jsx';
import Informacion from './pages/public/Informacion.jsx';
import PQR from './pages/citizen/PQR.jsx';
import CitizenAjustes from './pages/citizen/Ajustes.jsx';

/**
 * Wrapper que traduce onNavigate (API vieja) → navigate (React Router).
 * FASE 2: se está reemplazando por useNavigate() directo. Las nuevas rutas de
 * shell (/, /inicio, /servicios/*) usan routing directo, sin PageWrapper.
 */
import { useNavigate, useParams } from 'react-router-dom';

function PageWrapper({ Component, extraProps }) {
  const navigate = useNavigate();
  const params = useParams();

  const onNavigate = (target, extra) => {
    const routes = {
      landing: '/',
      inicio: '/inicio',
      dashboard: '/admin',
      chat: '/chat',
      perfil: '/perfil',
      planes: '/planes',
      'mis-peticiones': '/mis-peticiones',
      login: '/login',
      registro: '/registro',
      terminos: '/terminos',
      privacidad: '/privacidad',
      cookies: '/cookies',
      ajustes: '/ajustes',
      informacion: '/informacion',
      pqr: '/pqr',
      clientProfile: `/admin/clients/${extra}`,
      checkout: `/checkout/${extra}`,
    };
    navigate(routes[target] || '/');
  };

  const onDerivar = (flowId) => {
    navigate(`/derivacion/${flowId}`);
  };

  const onBack = () => {
    navigate(-1);
  };

  // Resolver params de ruta para componentes que los necesitan
  const clientId = params.clientId;
  const planId = params.planId;
  const flowId = params.flowId;

  return (
    <Component
      onNavigate={onNavigate}
      onDerivar={onDerivar}
      onBack={onBack}
      clientId={clientId}
      planId={planId}
      flowId={flowId}
      {...extraProps}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas — Landing central comunitaria (lee services.json) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PageWrapper Component={Login} />} />
          <Route path="/registro" element={<PageWrapper Component={Registro} />} />
          <Route path="/terminos" element={<PageWrapper Component={Terminos} />} />
          <Route path="/privacidad" element={<PageWrapper Component={Privacidad} />} />
          <Route path="/cookies" element={<PageWrapper Component={Cookies} />} />
          <Route path="/informacion" element={<PageWrapper Component={Informacion} />} />
        </Route>

        {/* Shell — Inicio (hogar post-login) y router de servicios */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/servicios/:id" element={<ServiceRouter />} />

        {/* Ciudadano */}
        <Route element={<CitizenLayout />}>
          <Route path="/chat" element={<PageWrapper Component={Chat} />} />
          <Route path="/perfil" element={<PageWrapper Component={Perfil} />} />
          <Route path="/mis-peticiones" element={<PageWrapper Component={MisPeticiones} />} />
          <Route path="/derivacion/:flowId?" element={<PageWrapper Component={Derivacion} />} />
          <Route path="/planes" element={<PageWrapper Component={Planes} />} />
          <Route path="/checkout/:planId?" element={<PageWrapper Component={Checkout} />} />
          <Route path="/pqr" element={<PageWrapper Component={PQR} />} />
          <Route path="/ajustes" element={<PageWrapper Component={CitizenAjustes} />} />
        </Route>

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<PageWrapper Component={Dashboard} />} />
          <Route path="/admin/clients/:clientId" element={<PageWrapper Component={ClientProfile} />} />
          <Route path="/admin/ajustes" element={<PageWrapper Component={AdminAjustes} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
