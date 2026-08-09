import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import CookieBanner from '../components/CookieBanner.jsx';
import Footer from '../components/Footer.jsx';

export default function CitizenLayout() {
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

  // Admin users get redirected to admin dashboard if they land here
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <CookieBanner />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
