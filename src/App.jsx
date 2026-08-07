import { useState, useEffect } from 'react';
import { useUser } from './context/UserContext.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Chat from './pages/Chat.jsx';
import Derivacion from './pages/Derivacion.jsx';
import Planes from './pages/Planes.jsx';
import Checkout from './pages/Checkout.jsx';
import Perfil from './pages/Perfil.jsx';
import Terminos from './pages/Terminos.jsx';
import Privacidad from './pages/Privacidad.jsx';
import Cookies from './pages/Cookies.jsx';
import ClientProfile from './pages/ClientProfile.jsx';
import Ajustes from './pages/Ajustes.jsx';

const PAGES_WITH_FOOTER = ['landing', 'login', 'registro', 'dashboard', 'planes', 'perfil', 'ajustes'];

export default function App() {
  const { isAuthenticated, isAdmin, loading } = useUser();
  const [page, setPage] = useState('landing');
  const [derivarFlowId, setDerivarFlowId] = useState(null);
  const [checkoutPlanId, setCheckoutPlanId] = useState(null);
  const [clientProfileId, setClientProfileId] = useState(null);

  // Redirigir según tipo de usuario
  useEffect(() => {
    if (isAuthenticated) {
      if (page === 'landing' || page === 'login' || page === 'registro') {
        setPage(isAdmin ? 'dashboard' : 'chat');
      }
    }
  }, [isAuthenticated, isAdmin, page]);

  const handleNavigate = (target, extra) => {
    // Rutas públicas: landing, login, registro, terminos, privacidad, cookies
    const publicPages = ['landing', 'login', 'registro', 'terminos', 'privacidad', 'cookies'];
    const isPublic = publicPages.includes(target);

    if (!isPublic && !isAuthenticated) {
      setPage('login');
      return;
    }

    if (target === 'landing' || target === 'dashboard') {
      setDerivarFlowId(null);
      setCheckoutPlanId(null);
    }
    if (target === 'checkout') {
      setCheckoutPlanId(extra);
    }
    if (target === 'clientProfile') {
      setClientProfileId(extra);
    }
    setPage(target);
  };

  const handleDerivar = (flowId) => {
    setDerivarFlowId(flowId);
    setPage('derivacion');
  };

  const handleBack = () => {
    setPage('chat');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  const showFooter = PAGES_WITH_FOOTER.includes(page);

  const renderPage = () => {
    // Páginas públicas
    if (page === 'landing') return <Landing onNavigate={handleNavigate} />;
    if (page === 'login') return <Login onNavigate={handleNavigate} />;
    if (page === 'registro') return <Registro onNavigate={handleNavigate} />;
    if (page === 'terminos') return <Terminos onNavigate={handleNavigate} />;
    if (page === 'privacidad') return <Privacidad onNavigate={handleNavigate} />;
    if (page === 'cookies') return <Cookies onNavigate={handleNavigate} />;

    // Si no autenticado, mostrar login
    if (!isAuthenticated) return <Login onNavigate={handleNavigate} />;

    // Páginas protegidas
    if (page === 'dashboard') return <Dashboard onNavigate={handleNavigate} />;
    if (page === 'chat') return <Chat onNavigate={handleNavigate} onDerivar={handleDerivar} />;
    if (page === 'derivacion') return <Derivacion onNavigate={handleNavigate} onBack={handleBack} flowId={derivarFlowId} />;
    if (page === 'planes') return <Planes onNavigate={handleNavigate} />;
    if (page === 'checkout') return <Checkout onNavigate={handleNavigate} planId={checkoutPlanId} />;
    if (page === 'perfil') return <Perfil onNavigate={handleNavigate} />;
    if (page === 'ajustes') return <Ajustes onNavigate={handleNavigate} />;
    if (page === 'clientProfile') return <ClientProfile onNavigate={handleNavigate} clientId={clientProfileId} />;

    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {renderPage()}
      <CookieBanner />
      {showFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
