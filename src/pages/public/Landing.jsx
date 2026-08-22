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
        <section className="px-6 py-16 md:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-5xl mb-4 block" aria-hidden="true">🌱</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-azul-oscuro mb-4 leading-tight">
              Una plataforma para la comunidad
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              Herramientas para el control social y la participación ciudadana.
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto">
              Explora nuestros servicios: control ciudadano, comunidades y más, todo en un solo lugar.
            </p>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/registro"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <span className="text-xl" aria-hidden="true">📝</span>
                  CREAR CUENTA
                </a>
                <a
                  href="/inicio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-azul-oscuro hover:bg-azul-claro text-azul-oscuro font-bold text-lg rounded-xl transition-all"
                >
                  <span className="text-xl" aria-hidden="true">🏠</span>
                  MI INICIO
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ── CATÁLOGO DE SERVICIOS (núcleo, lee services.json) ── */}
        <section className="px-6 py-10 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro text-center mb-2">
              Nuestros servicios
            </h3>
            <p className="text-center text-gray-600 mb-10">
              Elige un servicio para comenzar.
            </p>
            <ServiceCatalog />
          </div>
        </section>

        {/* ── CÓMO FUNCIONA la plataforma ────────────────────── */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro mb-12">
              ¿Cómo funciona?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <span className="text-3xl block mb-3" aria-hidden="true">🎯</span>
                <h4 className="font-bold text-azul-oscuro mb-2">Elige un servicio</h4>
                <p className="text-sm text-gray-500">Explora el catálogo y selecciona la herramienta que necesitas.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <span className="text-3xl block mb-3" aria-hidden="true">🔐</span>
                <h4 className="font-bold text-azul-oscuro mb-2">Inicia sesión</h4>
                <p className="text-sm text-gray-500">Regístrate y accede con tu cuenta central para los servicios.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <span className="text-3xl block mb-3" aria-hidden="true">🚀</span>
                <h4 className="font-bold text-azul-oscuro mb-2">Participa</h4>
                <p className="text-sm text-gray-500">Ejerce tu control social y participa en la comunidad.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
