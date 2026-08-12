import { useUser } from '../context/UserContext.jsx';
import UserMenu from './UserMenu.jsx';
import logo from '../assets/logo.svg';

export default function Header({ showClose = false, onClose, onNavigate, children }) {
  const { isAuthenticated } = useUser();

  return (
    <header className="bg-azul-oscuro text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate?.('landing')}
          className="flex items-center"
          title="Ir al inicio"
          aria-label="Ir al inicio"
        >
          <img src={logo} alt="Veeduría Ciudadana" className="h-8 md:h-9 w-auto" />
        </button>
        <div>
          <h1 className="text-base md:text-lg font-bold leading-tight">Veeduría Ciudadana</h1>
          <p className="text-xs text-blue-200 hidden sm:block">Tu herramienta de control social</p>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="flex items-center gap-3">
        {children}

        {/* Navegación propia cuando usuario autenticado */}
        {isAuthenticated && (
          <>
            <button
              onClick={() => onNavigate?.('ajustes')}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Ajustes"
            >
              ⚙️
            </button>
            <UserMenu onNavigate={onNavigate} />
          </>
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
