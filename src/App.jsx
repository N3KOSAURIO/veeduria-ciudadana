import { useState, useEffect } from 'react';
import { useUser } from './context/UserContext.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Chat from './pages/Chat.jsx';
import Derivacion from './pages/Derivacion.jsx';
import Planes from './pages/Planes.jsx';
import Checkout from './pages/Checkout.jsx';
import Perfil from './pages/Perfil.jsx';

export default function App() {
  const { isAuthenticated, loading } = useUser();
  const [page, setPage] = useState('landing');
  const [derivarFlowId, setDerivarFlowId] = useState(null);
  const [checkoutPlanId, setCheckoutPlanId] = useState(null);

  // Redirigir a dashboard si ya está autenticado y va a landing/login/registro
  useEffect(() => {
    if (isAuthenticated && (page === 'landing' || page === 'login' || page === 'registro')) {
      setPage('dashboard');
    }
  }, [isAuthenticated, page]);

  const handleNavigate = (target, extra) => {
    // Proteger rutas que requieren auth
    const protectedPages = ['chat', 'dashboard', 'derivacion', 'planes', 'checkout', 'perfil'];
    if (protectedPages.includes(target) && !isAuthenticated) {
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

  // Páginas públicas (sin auth)
  if (page === 'landing') {
    return <Landing onNavigate={handleNavigate} />;
  }
  if (page === 'login') {
    return <Login onNavigate={handleNavigate} />;
  }
  if (page === 'registro') {
    return <Registro onNavigate={handleNavigate} />;
  }

  // Páginas protegidas (requieren auth)
  if (!isAuthenticated) {
    return <Login onNavigate={handleNavigate} />;
  }

  if (page === 'dashboard') {
    return <Dashboard onNavigate={handleNavigate} />;
  }
  if (page === 'chat') {
    return <Chat onNavigate={handleNavigate} onDerivar={handleDerivar} />;
  }
  if (page === 'derivacion') {
    return <Derivacion onNavigate={handleNavigate} onBack={handleBack} flowId={derivarFlowId} />;
  }
  if (page === 'planes') {
    return <Planes onNavigate={handleNavigate} />;
  }
  if (page === 'checkout') {
    return <Checkout onNavigate={handleNavigate} planId={checkoutPlanId} />;
  }
  if (page === 'perfil') {
    return <Perfil onNavigate={handleNavigate} />;
  }

  return null;
}
