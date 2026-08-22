import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';

/* ------------------------------------------------------------------ */
/*  ToggleSwitch — componente reutilizable                            */
/* ------------------------------------------------------------------ */
function ToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azul-medio focus:ring-offset-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${checked ? 'bg-azul-oscuro' : 'bg-gray-300'}`}
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
/*  Icono chevron                                                      */
/* ------------------------------------------------------------------ */
function ChevronRight() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ================================================================== */
/*  AJUSTES PAGE                                                       */
/* ================================================================== */
export default function Ajustes() {
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

  // --- Theme desde ThemeContext del agente #2 ---
  const { isDark, toggleTheme } = useTheme();

  // --- Notification toggles (placeholder) ---
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifResumen, setNotifResumen] = useState(true);

  // --- Language (placeholder) ---
  const [lang, setLang] = useState('es');

  // --- Common classes based on theme ---
  const bgClass = isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-slate-50 to-blue-50';
  const cardBg = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const cardHover = isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const textMain = isDark ? 'text-gray-100' : 'text-gray-800';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const textLabel = isDark ? 'text-gray-300' : 'text-gray-600';
  const divider = isDark ? 'border-gray-700' : 'border-gray-100';
  const dangerHover = isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-50';

  const sectionTitle = `text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`;

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      {/* ---- HEADER ---- */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-azul-oscuro'} text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-lg`}>
        <div className="flex items-center gap-3">
          <span className="text-xl md:text-2xl">⚙️</span>
          <h1 className="text-base md:text-lg font-bold">Ajustes</h1>
        </div>
        <button
          onClick={() => onNavigate?.('chat')}
          className="text-white/80 hover:text-white text-xl font-bold px-2 transition-colors"
          title="Cerrar"
        >
          ✕
        </button>
      </header>

      {/* ---- MAIN ---- */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-2xl mx-auto w-full space-y-8">

        {/* ========== APARIENCIA ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Apariencia</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden`}>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{isDark ? '🌙' : '☀️'}</span>
                <div>
                  <p className={`font-semibold ${textMain}`}>
                    {isDark ? 'Modo Oscuro' : 'Modo Claro'}
                  </p>
                  <p className={`text-xs ${textMuted} mt-0.5`}>
                    {isDark ? 'Fondo oscuro, menos fatiga visual' : 'Fondo claro, mayor contraste'}
                  </p>
                </div>
              </div>
              <ToggleSwitch checked={isDark} onChange={toggleTheme} />
            </div>
          </div>
        </section>

        {/* ========== PREFERENCIAS DE NOTIFICACIÓN ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Preferencias de notificación</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden divide-y ${divider}`}>
            {/* Email */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">📧</span>
                <div className="min-w-0">
                  <p className={`font-semibold ${textMain} truncate`}>Notificaciones por correo</p>
                  <p className={`text-xs ${textMuted} mt-0.5`}>Recibí alertas y novedades en tu email</p>
                </div>
              </div>
              <ToggleSwitch checked={notifEmail} onChange={setNotifEmail} />
            </div>
            {/* Push */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">🔔</span>
                <div className="min-w-0">
                  <p className={`font-semibold ${textMain} truncate`}>Notificaciones push</p>
                  <p className={`text-xs ${textMuted} mt-0.5`}>Alertas instantáneas en tu navegador</p>
                </div>
              </div>
              <ToggleSwitch checked={notifPush} onChange={setNotifPush} />
            </div>
            {/* Resumen semanal */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">📊</span>
                <div className="min-w-0">
                  <p className={`font-semibold ${textMain} truncate`}>Resumen semanal</p>
                  <p className={`text-xs ${textMuted} mt-0.5`}>Informe con tus estadísticas cada lunes</p>
                </div>
              </div>
              <ToggleSwitch checked={notifResumen} onChange={setNotifResumen} />
            </div>
          </div>
        </section>

        {/* ========== IDIOMA ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Idioma</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden`}>
            <div className="px-5 py-4">
              <label className={`block text-xs font-medium ${textLabel} mb-2`}>
                Idioma de la interfaz
              </label>
              <div className="relative">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className={`w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio transition-colors ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option value="es">🇨🇴 Español</option>
                  <option value="en" disabled>
                    🇺🇸 English (próximamente)
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== PRIVACIDAD Y SEGURIDAD ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Privacidad y seguridad</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden divide-y ${divider}`}>
            <button
              onClick={() => onNavigate?.('terminos')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <span className={`font-semibold ${textMain}`}>Términos de servicio</span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => onNavigate?.('privacidad')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <span className={`font-semibold ${textMain}`}>Política de privacidad</span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => onNavigate?.('cookies')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🍪</span>
                <span className={`font-semibold ${textMain}`}>Política de cookies</span>
              </div>
              <ChevronRight />
            </button>
          </div>
        </section>

        {/* ========== CUENTA ========== */}
        <section>
          <h2 className={`${sectionTitle} mb-3`}>Cuenta</h2>
          <div className={`rounded-2xl shadow-sm border ${cardBg} overflow-hidden divide-y ${divider}`}>
            <button
              onClick={() => onNavigate?.('perfil')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">👤</span>
                <span className={`font-semibold ${textMain}`}>Ver perfil</span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => onNavigate?.('perfil')}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔑</span>
                <span className={`font-semibold ${textMain}`}>Cambiar contraseña</span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => {
                const userStr = localStorage.getItem('veeduria_user');
                const data = {
                  exportado: new Date().toISOString(),
                  plataforma: 'Veeduría Ciudadana',
                  usuario: userStr ? JSON.parse(userStr) : {},
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `veeduria-datos-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${cardHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📥</span>
                <span className={`font-semibold ${textMain}`}>Exportar datos</span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro? Esta acción eliminará todos tus datos de forma permanente.')) {
                  const keysToRemove = [];
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('veeduria_')) keysToRemove.push(key);
                  }
                  keysToRemove.forEach((k) => localStorage.removeItem(k));
                  onNavigate?.('landing');
                }
              }}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${dangerHover}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🗑️</span>
                <span className="font-semibold text-red-600">Eliminar cuenta</span>
              </div>
              <ChevronRight />
            </button>
          </div>
        </section>

        {/* Espacio final */}
        <div className="pb-8" />
      </main>
    </div>
  );
}
