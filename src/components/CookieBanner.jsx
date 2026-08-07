import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    essential: true,     // Siempre activas (no se pueden desmarcar)
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Verificar si ya se aceptaron/rechazaron cookies
    const stored = localStorage.getItem('veeduria_cookies_accepted');
    if (!stored) {
      // Pequeño delay para que aparezca después de cargar la página
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreference = (preferences) => {
    localStorage.setItem('veeduria_cookies_accepted', JSON.stringify({
      accepted: true,
      preferences,
      timestamp: new Date().toISOString(),
    }));
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreference({ essential: true, analytics: true, advertising: true });
  };

  const rejectAll = () => {
    savePreference({ essential: true, analytics: false, advertising: false });
  };

  const saveSettings = () => {
    savePreference(settings);
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay oscuro (solo cuando se muestra configuración) */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/60 z-40 transition-opacity"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Banner principal o panel de configuración */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white dark:bg-dark-surface border-t-4 border-azul-oscuro dark:border-dark-border shadow-2xl">
          {!showSettings ? (
            /* --- BANNER PRINCIPAL --- */
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-5">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Texto */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🍪</span>
                    <h3 className="text-base font-bold text-azul-oscuro dark:text-dark-text">Este sitio utiliza cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                    Utilizamos cookies propias y de terceros para garantizar el funcionamiento técnico de la 
                    Plataforma, analizar el uso de nuestros servicios y, con su consentimiento, mostrar 
                    contenido personalizado.{' '}
                    <button
                      type="button"
                      onClick={() => setShowSettings(true)}
                      className="text-azul-medio dark:text-blue-400 underline hover:text-azul-oscuro dark:hover:text-blue-300 font-medium"
                    >
                      Más información
                    </button>
                  </p>
                </div>

                {/* Botones */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    Aceptar todas
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 border border-gray-300 dark:border-slate-600 hover:border-azul-medio dark:hover:border-blue-400 text-azul-medio dark:text-blue-400 text-sm font-semibold rounded-lg transition-colors"
                  >
                    Configurar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* --- PANEL DE CONFIGURACIÓN --- */
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-azul-oscuro dark:text-dark-text">Configuración de Cookies</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 text-xl leading-none p-1"
                  title="Cerrar"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-5">
                Seleccione qué tipos de cookies desea permitir. Las cookies esenciales son necesarias 
                para el funcionamiento de la Plataforma y no pueden desactivarse.
              </p>

              <div className="space-y-4 mb-6">
                {/* Esenciales */}
                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-800/60 cursor-not-allowed opacity-75">
                  <input
                    type="checkbox"
                    checked={settings.essential}
                    disabled
                    className="mt-0.5 w-4 h-4 text-azul-oscuro rounded border-gray-300 accent-azul-oscuro"
                  />
                  <div>
                    <span className="font-semibold text-sm text-gray-800 dark:text-dark-text">Cookies esenciales</span>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-0.5">
                      Necesarias para el funcionamiento de la Plataforma. Gestionan autenticación, 
                      sesiones de usuario y navegación segura.
                    </p>
                  </div>
                </label>

                {/* Analíticas */}
                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-800/60 cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) => setSettings(s => ({ ...s, analytics: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 text-azul-oscuro rounded border-gray-300 accent-azul-oscuro"
                  />
                  <div>
                    <span className="font-semibold text-sm text-gray-800 dark:text-dark-text">Cookies analíticas (simuladas)</span>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-0.5">
                      Permiten analizar de forma anónima cómo los usuarios interactúan con la Plataforma 
                      para mejorar el servicio. Actualmente simuladas en entorno de desarrollo.
                    </p>
                  </div>
                </label>

                {/* Publicitarias */}
                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-800/60 cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.advertising}
                    onChange={(e) => setSettings(s => ({ ...s, advertising: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 text-azul-oscuro rounded border-gray-300 accent-azul-oscuro"
                  />
                  <div>
                    <span className="font-semibold text-sm text-gray-800 dark:text-dark-text">Cookies publicitarias (simuladas)</span>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-0.5">
                      Utilizadas para mostrar contenido y comunicaciones relevantes sobre servicios de 
                      control social ciudadano. Actualmente simuladas en entorno de desarrollo.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={saveSettings}
                  className="px-5 py-2.5 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Guardar preferencias
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          )}

          {/* Link a política de cookies */}
          <div className="border-t border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-slate-800/30 px-4 py-2 text-center">
            <span className="text-xs text-gray-400 dark:text-dark-text-secondary">
              Consulte nuestra{' '}
              <span className="text-azul-medio dark:text-blue-400 underline cursor-pointer">
                Política de Cookies
              </span>{' '}
              para más información.
            </span>
          </div>
        </div>
      </div>

      {/* Animación CSS inyectada */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
