import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';

/* ------------------------------------------------------------------ */
/*  ToggleSwitch — componente reutilizable                             */
/* ------------------------------------------------------------------ */
function ToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azul-medio focus:ring-offset-2 dark:focus:ring-offset-dark-surface ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${checked ? 'bg-azul-oscuro dark:bg-azul-medio' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  ChevronRight icon                                                  */
/* ------------------------------------------------------------------ */
function ChevronRight() {
  return (
    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ================================================================== */
/*  AJUSTES PAGE (Citizen)                                             */
/* ================================================================== */
export default function Ajustes() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Routing directo con React Router (reemplaza el onNavigate del PageWrapper)
  const onNavigate = (target) => {
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
    };
    navigate(routes[target] || '/');
  };

  // --- Notification toggles (placeholder) ---
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);

  // --- Eliminar cuenta ---
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');

  const handleExportData = () => {
    const data = {
      exportado: new Date().toISOString(),
      plataforma: 'Veeduría Ciudadana',
      datosPersonales: {
        nombre: user?.nombre || '—',
        email: user?.email || '—',
        telefono: user?.telefono || '—',
        ciudad: user?.ciudad || '—',
        plan: user?.plan || 'gratis',
        miembroDesde: user?.fechaRegistro || '—',
        consultasRealizadas: user?.consultasRealizadas || 0,
      },
      preferencias: {
        tema: theme,
        notificacionesEmail: notifEmail,
        notificacionesPush: notifPush,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'veeduria-mis-datos-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setDeleteMsg('');
      return;
    }
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('veeduria_')) keysToRemove.push(key);
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      logout();
      onNavigate && onNavigate('landing');
    } catch {
      setDeleteMsg('Ocurrió un error al eliminar la cuenta. Intentalo de nuevo.');
    }
  };

  // --- Clases condicionales por tema ---
  const cardBg = isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-100';
  const cardHover = isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50';
  const sectionTitle = `text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`;
  const divider = isDark ? 'divide-dark-border' : 'divide-gray-100';

  const themeOptions = [
    { value: 'system', label: 'Sistema', icon: '🖥️', desc: 'Se ajusta a la configuración de tu dispositivo' },
    { value: 'light', label: 'Claro', icon: '☀️', desc: 'Fondo claro, mayor contraste' },
    { value: 'dark', label: 'Oscuro', icon: '🌙', desc: 'Fondo oscuro, menos fatiga visual' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50 dark:from-dark-bg dark:to-dark-surface">
      <Header showClose onClose={() => onNavigate && onNavigate('chat')} onNavigate={onNavigate} />

      <main className="flex-1 px-4 sm:px-6 py-8 max-w-2xl mx-auto w-full space-y-8">
        {/* Título */}
        <div className="text-center">
          <span className="text-4xl block mb-3">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro dark:text-dark-text mb-2">
            Ajustes
          </h2>
          <p className="text-gray-500 dark:text-dark-text-secondary text-sm">
            Personalizá tu experiencia en Veeduría Ciudadana
          </p>
        </div>

        {/* ========== APARIENCIA / TEMA ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Apariencia</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden divide-y ${divider}`}>
            {themeOptions.map((opt) => {
              const isActive =
                opt.value === 'system'
                  ? theme !== 'light' && theme !== 'dark'
                  : theme === opt.value;

              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    if (opt.value === 'system') {
                      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      if (prefersDark !== isDark) toggleTheme();
                      localStorage.removeItem('veeduria_theme');
                    } else if (opt.value !== theme) {
                      toggleTheme();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{opt.icon}</span>
                    <div className="min-w-0">
                      <p className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                        {opt.label}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'} mt-0.5`}>
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isActive
                        ? 'border-azul-medio bg-azul-medio'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isActive && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========== PREFERENCIAS DE NOTIFICACIÓN ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Notificaciones</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden divide-y ${divider}`}>
            {/* Email */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">📧</span>
                <div className="min-w-0">
                  <p className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                    Notificaciones por correo
                  </p>
                  <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'} mt-0.5`}>
                    Recibí alertas y novedades en tu email
                  </p>
                </div>
              </div>
              <ToggleSwitch checked={notifEmail} onChange={setNotifEmail} />
            </div>
            {/* Push */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">🔔</span>
                <div className="min-w-0">
                  <p className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                    Notificaciones push
                  </p>
                  <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'} mt-0.5`}>
                    Alertas instantáneas en tu navegador
                  </p>
                </div>
              </div>
              <ToggleSwitch checked={notifPush} onChange={setNotifPush} />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-dark-text-secondary mt-2 px-2">
            ⚠️ Las notificaciones son placeholders en esta versión demo.
          </p>
        </section>

        {/* ========== LEGALES ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Legales</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden divide-y ${divider}`}>
            <button
              onClick={() => onNavigate && onNavigate('terminos')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <span className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                  Términos de servicio
                </span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => onNavigate && onNavigate('privacidad')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <span className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                  Política de privacidad
                </span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => onNavigate && onNavigate('cookies')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🍪</span>
                <span className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                  Política de cookies
                </span>
              </div>
              <ChevronRight />
            </button>
          </div>
        </section>

        {/* ========== CUENTA ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Cuenta</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden divide-y ${divider}`}>
            {/* Perfil */}
            <button
              onClick={() => onNavigate && onNavigate('perfil')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">👤</span>
                <div className="min-w-0">
                  <p className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                    Ver perfil
                  </p>
                  <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'} mt-0.5 truncate`}>
                    {user?.email || '—'}
                  </p>
                </div>
              </div>
              <ChevronRight />
            </button>

            {/* Cambiar contraseña */}
            <button
              onClick={() => onNavigate && onNavigate('perfil')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔑</span>
                <span className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                  Cambiar contraseña
                </span>
              </div>
              <ChevronRight />
            </button>

            {/* Exportar datos */}
            <button
              onClick={handleExportData}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📥</span>
                <span className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
                  Exportar mis datos
                </span>
              </div>
              <ChevronRight />
            </button>

            {/* Eliminar cuenta */}
            <div className={isDark ? 'bg-red-900/10' : 'bg-red-50/30'}>
              {!confirmDelete ? (
                <button
                  onClick={handleDeleteAccount}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
                    isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🗑️</span>
                    <span className="font-semibold text-sm text-red-600 dark:text-red-400">
                      Eliminar cuenta
                    </span>
                  </div>
                  <ChevronRight />
                </button>
              ) : (
                <div className="px-5 py-4 space-y-3">
                  {deleteMsg && (
                    <p className="text-sm text-red-600 dark:text-red-400">{deleteMsg}</p>
                  )}
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-300 font-semibold mb-1">
                      ⚠️ ¿Estás seguro?
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Esta acción es irreversible. Se borrarán todos tus datos, historial y configuraciones.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Sí, eliminar
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-600 dark:text-dark-text-secondary text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========== CERRAR SESIÓN ========== */}
        <div className="text-center pb-6">
          <button
            onClick={() => {
              logout();
              onNavigate && onNavigate('landing');
            }}
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline font-semibold"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
