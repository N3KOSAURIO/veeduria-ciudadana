import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import CookieBanner from '../components/CookieBanner.jsx';
import Footer from '../components/Footer.jsx';

export default function PublicLayout() {
  const { isAuthenticated, isAdmin, loading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const onNavigate = (target) => {
    const routes = {
      landing: '/',
      terminos: '/terminos',
      privacidad: '/privacidad',
      cookies: '/cookies',
      informacion: '/informacion',
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

  // Si ya autenticado en landing/login/registro → redirigir
  const authRedirectPages = ['/', '/login', '/registro'];
  if (isAuthenticated && authRedirectPages.includes(location.pathname)) {
    return <Navigate to={isAdmin ? '/admin' : '/chat'} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <CookieBanner />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
