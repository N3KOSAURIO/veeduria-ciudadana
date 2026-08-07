import { useUser } from '../context/UserContext.jsx';
import UserMenu from './UserMenu.jsx';
import logo from '../assets/logo.svg';

export default function Header({ showClose = false, onClose, onNavigate, children }) {
  const { isAuthenticated } = useUser();

  return (
    <header className="bg-azul-oscuro text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Veeduría Ciudadana" className="h-8 md:h-9 w-auto" />
        <div>
          <h1 className="text-base md:text-lg font-bold leading-tight">Veeduría Ciudadana</h1>
          <p className="text-xs text-blue-200 hidden sm:block">Tu herramienta de control social</p>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="flex items-center gap-2">
        {children}

        {/* Navegación propia cuando usuario autenticado */}
        {isAuthenticated && (
          <>
            <button
              onClick={() => onNavigate?.('ajustes')}
              className="text-lg text-white/70 hover:text-white transition-colors p-1"
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
