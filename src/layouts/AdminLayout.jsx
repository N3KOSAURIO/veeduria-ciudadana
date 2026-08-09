import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import CookieBanner from '../components/CookieBanner.jsx';
import Footer from '../components/Footer.jsx';

export default function AdminLayout() {
  const { isAuthenticated, isAdmin, loading } = useUser();
  const navigate = useNavigate();

  const onNavigate = (target) => {
    const routes = {
      terminos: '/terminos',
      privacidad: '/privacidad',
      cookies: '/cookies',
    };
    navigate(routes[target] || '/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <CookieBanner />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
