import Header from '../../components/Header.jsx';
import { useUser } from '../../context/UserContext.jsx';
import ServiceCatalog from '../../shell/components/ServiceCatalog.jsx';

/**
 * Landing — página de entrada de la APP COMUNITARIA.
 * Norte de producto (App-Comunitaria-Arquitectura): la app es comunitaria,
 * NO Veeduría. Esta landing central lee `config/services.json` y genera el
 * catálogo de servicios dinámicamente (ServicioCatalog). Añadir/quitar
 * servicio = editar el JSON, no migrar la principal.
 *
 * Veeduría es UN servicio integrado, no la página principal.
 */
export default function Landing() {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header (nav global del shell) */}
      <Header />

      <main className="flex-1">
        {/* ── HERO comunidad ─────────────────────────────────── */}
        <section className="relative px-6 py-16 md:py-24 text-center overflow-hidden">
          {/* Fondo decorativo sutil */}
          <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
            <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/80 border border-blue-200 text-azul-medio text-xs font-bold uppercase tracking-wide shadow-sm"
            >
              <span aria-hidden="true">🇨🇴</span>
              Control social ciudadano
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-azul-oscuro mb-5 leading-tight tracking-tight">
              Una plataforma para la comunidad
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-3 max-w-2xl mx-auto leading-relaxed">
              Herramientas para el control social y la participación ciudadana.
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
              Explora nuestros servicios: control ciudadano, comunidades y más, todo en un lugar.
            </p>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="/registro"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-dorado focus:ring-offset-2"
                >
                  <span className="text-xl" aria-hidden="true">📝</span>
                  Crear cuenta
                </a>
                <a
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-azul-oscuro hover:bg-azul-claro text-azul-oscuro font-bold text-lg rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-azul-medio focus:ring-offset-2"
                >
                  Iniciar sesión
                </a>
              </div>
            )}
            {!isAuthenticated && (
              <p className="mt-4 text-sm text-gray-500">
                Gratis y sin tarjeta de crédito.
              </p>
            )}
          </div>
        </section>

        {/* ── CATÁLOGO DE SERVICIOS (núcleo, lee services.json) ── */}
        <section className="px-6 py-14 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro text-center mb-3">
              Nuestros servicios
            </h2>
            <p className="text-center text-gray-600 mb-10 text-lg">
              Elige un servicio para comenzar.
            </p>
            <ServiceCatalog />
          </div>
        </section>

        {/* ── CÓMO FUNCIONA la plataforma ────────────────────── */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro mb-3">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-600 mb-12 text-lg max-w-xl mx-auto">
              Tres pasos para empezar a ejercer tu control social.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-md border border-gray-100 transition-shadow">
                <span className="absolute -top-3 left-6 inline-flex items-center justify-center h-7 w-7 rounded-full bg-azul-oscuro text-white text-xs font-bold">1</span>
                <span className="text-4xl block mb-4 mt-1" aria-hidden="true">🎯</span>
                <h3 className="font-bold text-lg text-azul-oscuro mb-2">Elige un servicio</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Explora el catálogo y selecciona la herramienta que necesitas.
                </p>
              </div>
              <div className="relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-md border border-gray-100 transition-shadow">
                <span className="absolute -top-3 left-6 inline-flex items-center justify-center h-7 w-7 rounded-full bg-azul-oscuro text-white text-xs font-bold">2</span>
                <span className="text-4xl block mb-4 mt-1" aria-hidden="true">🔐</span>
                <h3 className="font-bold text-lg text-azul-oscuro mb-2">Inicia sesión</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Regístrate y accede con tu cuenta central para todos los servicios.
                </p>
              </div>
              <div className="relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-md border border-gray-100 transition-shadow">
                <span className="absolute -top-3 left-6 inline-flex items-center justify-center h-7 w-7 rounded-full bg-azul-oscuro text-white text-xs font-bold">3</span>
                <span className="text-4xl block mb-4 mt-1" aria-hidden="true">🚀</span>
                <h3 className="font-bold text-lg text-azul-oscuro mb-2">Participa</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ejerce tu control social y participa en la comunidad.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
