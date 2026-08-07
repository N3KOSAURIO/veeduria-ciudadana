import { useUser } from '../context/UserContext.jsx';
import PLANES from '../data/plans.js';
import Header from '../components/Header.jsx';

export default function Dashboard({ onNavigate }) {
  const { user, logout } = useUser();
  const planActual = PLANES[user?.plan] || PLANES.gratis;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header>
        {/* Nav adicional en header */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => onNavigate('planes')}
            className="text-xs text-blue-200 hover:text-white px-2 py-1"
          >
            Planes
          </button>
          <button
            onClick={() => onNavigate('perfil')}
            className="text-xs text-blue-200 hover:text-white px-2 py-1"
          >
            Mi Perfil
          </button>
        </div>
      </Header>

      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-azul-oscuro">
            ¡Hola{user?.nombre ? `, ${user.nombre.split(' ')[0]}` : ''}!
          </h2>
          <p className="text-gray-500 mt-1">Bienvenido a tu panel de Veeduría Ciudadana</p>
        </div>

        {/* Stats rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <span className="text-2xl block mb-2">📋</span>
            <p className="text-sm text-gray-500">Consultas realizadas</p>
            <p className="text-2xl font-bold text-azul-oscuro">{user?.consultasRealizadas || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <span className="text-2xl block mb-2">⭐</span>
            <p className="text-sm text-gray-500">Tu plan actual</p>
            <p className="text-2xl font-bold text-dorado">{planActual.nombre}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <span className="text-2xl block mb-2">📅</span>
            <p className="text-sm text-gray-500">Miembro desde</p>
            <p className="text-2xl font-bold text-azul-oscuro">
              {user?.fechaRegistro
                ? new Date(user.fechaRegistro).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
                : '—'}
            </p>
          </div>
        </div>

        {/* Acciones principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Chat */}
          <button
            onClick={() => onNavigate('chat')}
            className="group bg-white rounded-2xl p-6 shadow-md border-2 border-transparent hover:border-dorado transition-all text-left"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">💬</span>
              <div>
                <h3 className="text-lg font-bold text-azul-oscuro group-hover:text-dorado transition-colors">
                  Nueva consulta
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Consultá sobre obras, contratos, tus derechos. El chatbot te responde con datos reales de leyes colombianas.
                </p>
              </div>
            </div>
          </button>

          {/* Planes */}
          <button
            onClick={() => onNavigate('planes')}
            className="group bg-white rounded-2xl p-6 shadow-md border-2 border-transparent hover:border-azul-medio transition-all text-left"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">🚀</span>
              <div>
                <h3 className="text-lg font-bold text-azul-oscuro group-hover:text-azul-medio transition-colors">
                  {planActual.id === 'gratis' ? 'Subir de plan' : 'Gestionar plan'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {planActual.id === 'gratis'
                    ? 'Desbloqueá consultas ilimitadas, informes detallados y asesoría personalizada.'
                    : `Estás en el plan ${planActual.nombre}. Gestioná tu suscripción.`}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Plan actual - resumen */}
        <div className={`rounded-2xl p-6 border ${planActual.colorClase} mb-6`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {planActual.id === 'gratis' ? '🆓' : planActual.id === 'pro' ? '⭐' : '👑'}
              </span>
              <h3 className="font-bold text-azul-oscuro">
                Plan {planActual.nombre}
              </h3>
              {planActual.popular && (
                <span className="text-xs bg-dorado text-white px-2 py-0.5 rounded-full font-semibold">
                  POPULAR
                </span>
              )}
            </div>
            <span className="text-lg font-bold text-azul-oscuro">
              {planActual.precio === 0
                ? 'Gratis'
                : `$${planActual.precio.toLocaleString('es-CO')} ${planActual.periodo}`}
            </span>
          </div>
          <ul className="space-y-1">
            {planActual.beneficios.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="text-center">
          <button
            onClick={() => { logout(); onNavigate('landing'); }}
            className="text-sm text-gray-400 hover:text-red-500 underline transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-200">
        Veeduría Ciudadana 2026 · Demo Beta · Sesión local
      </footer>
    </div>
  );
}
