import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import UserMenu from './UserMenu.jsx';
import logo from '../assets/logo.svg';

/**
 * Header — navegación global del shell de la app comunitaria.
 * FASE 2: usa react-router (Link/useNavigate) directo, ya no el onNavigate
 * heredado del PageWrapper. Muestra la marca comunitaria central.
 */
export default function Header({ showClose = false, onClose, onNavigate, children }) {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const go = (target) => {
    if (onNavigate) return onNavigate(target); // retro-compat si padre provee
    const routes = {
      landing: '/',
      inicio: '/inicio',
      login: '/login',
      registro: '/registro',
      ajustes: '/ajustes',
    };
    navigate(routes[target] || '/');
  };

  return (
    <header className="bg-azul-oscuro text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center" title="Ir al inicio" aria-label="Ir al inicio">
          <img src={logo} alt="App Comunitaria" className="h-8 md:h-9 w-auto" />
        </Link>
        <div>
          <button onClick={() => go('landing')} className="text-left">
            <h1 className="text-base md:text-lg font-bold leading-tight">App Comunitaria</h1>
            <p className="text-xs text-blue-200 hidden sm:block">Control social y participación</p>
          </button>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="flex items-center gap-3">
        {/* Navegación principal (siempre visible) */}
        <Link
          to="/"
          className="hidden sm:inline-flex px-3 py-1.5 text-white/80 hover:text-white text-xs font-semibold hover:underline"
        >
          Inicio
        </Link>

        {children}

        {/* Navegación cuando usuario autenticado */}
        {isAuthenticated ? (
          <>
            <Link
              to="/inicio"
              className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Mi Inicio
            </Link>
            <Link
              to="/ajustes"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Ajustes"
            >
              ⚙️
            </Link>
            <UserMenu onNavigate={go} />
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-2 sm:px-3 py-1.5 text-white text-xs font-semibold hover:underline"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="px-2 sm:px-3 py-1.5 bg-dorado hover:bg-dorado-hover text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Registrarse
            </Link>
          </div>
        )}

        {/* Botón cerrar (para páginas como Chat) */}
        {showClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl font-bold px-2"
            title="Cerrar"
          >
            ✕
          </button>
        )}
      </div>
    </header>
  );
}
