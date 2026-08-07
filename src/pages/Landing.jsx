import Header from '../components/Header.jsx';

export default function Landing({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header />

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

          <button
            onClick={() => onNavigate('chat')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-dorado hover:bg-dorado-hover text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <span className="text-xl">🟢</span>
            CONSULTÁ GRATIS
          </button>

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
