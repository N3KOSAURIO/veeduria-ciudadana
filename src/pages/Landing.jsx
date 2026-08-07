import Header from '../components/Header.jsx';
import { useUser } from '../context/UserContext.jsx';

export default function Landing({ onNavigate }) {
  const { isAuthenticated, user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header con nav */}
      <Header>
        {isAuthenticated ? (
          <>
            <span className="text-xs text-blue-200 hidden sm:inline">
              {user?.nombre?.split(' ')[0]}
            </span>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Mi Panel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('login')}
              className="px-3 py-1.5 text-white text-xs font-semibold hover:underline"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => onNavigate('registro')}
              className="px-3 py-1.5 bg-dorado hover:bg-dorado-hover text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Registrarse
            </button>
          </>
        )}
      </Header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl">
          <span className="inline-block text-5xl mb-6">🏛️</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-azul-oscuro mb-4 leading-tight">
            Veeduría Ciudadana
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Tu herramienta de control social
          </p>
          <p className="text-base text-gray-500 mb-10 max-w-md mx-auto">
            ¿Ves una obra en la calle y no sabés si es legal? Consultá gratis.
          </p>

          {isAuthenticated ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span className="text-xl">📋</span>
              IR AL PANEL
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('chat')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span className="text-xl">🟢</span>
                CONSULTÁ GRATIS
              </button>
              <button
                onClick={() => onNavigate('registro')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-azul-oscuro hover:bg-azul-claro text-azul-oscuro font-bold text-lg rounded-xl transition-all"
              >
                <span className="text-xl">📝</span>
                CREAR CUENTA
              </button>
            </div>
          )}

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-3">🔍</span>
              <h3 className="font-bold text-azul-oscuro mb-1">Fiscalizá</h3>
              <p className="text-sm text-gray-500">obras públicas</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-3">📋</span>
              <h3 className="font-bold text-azul-oscuro mb-1">Auditá</h3>
              <p className="text-sm text-gray-500">contratos públicos</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-3">⚖️</span>
              <h3 className="font-bold text-azul-oscuro mb-1">Conocé</h3>
              <p className="text-sm text-gray-500">tus derechos</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-200">
        Próximamente · Demo Beta · Veeduría Ciudadana 2026
      </footer>
    </div>
  );
}
