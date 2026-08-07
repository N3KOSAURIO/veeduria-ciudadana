import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';

export default function UserMenu({ onNavigate }) {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Iniciales del nombre
  const initials = user?.nombre
    ? user.nombre
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : '?';

  const handlePerfil = () => {
    setOpen(false);
    onNavigate?.('perfil');
  };

  const handleAjustes = () => {
    setOpen(false);
    onNavigate?.('ajustes');
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
    onNavigate?.('landing');
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-dorado text-white font-bold text-sm flex items-center justify-center hover:bg-dorado-hover transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-dorado/50"
        title={user?.nombre || 'Usuario'}
      >
        {initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50">
          {/* Info de usuario */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-azul-oscuro truncate">
              {user?.nombre || 'Usuario'}
            </p>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {user?.email || ''}
            </p>
            {user?.plan && (
              <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-dorado/10 text-dorado">
                {user.plan === 'gratis' ? 'Ciudadano' : user.plan === 'pro' ? 'Pro' : 'Premium'}
              </span>
            )}
          </div>

          {/* Opciones */}
          <div className="py-1">
            <button
              onClick={handlePerfil}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-azul-claro transition-colors flex items-center gap-3"
            >
              <span className="text-base">👤</span>
              Ver perfil
            </button>
            <button
              onClick={handleAjustes}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-azul-claro transition-colors flex items-center gap-3"
            >
              <span className="text-base">⚙️</span>
              Ajustes
            </button>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
            >
              <span className="text-base">🚪</span>
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
