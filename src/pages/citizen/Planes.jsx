import { useUser } from '../../context/UserContext.jsx';
import { getPlans } from '../../services/citizen.service.js';
import Header from '../../components/Header.jsx';

export default function Planes({ onNavigate }) {
  const { user } = useUser();
  const PLANES = getPlans();
  const planActual = user?.plan || 'gratis';

  const planOrder = ['gratis', 'pro', 'premium'];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate('dashboard')} />
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-azul-oscuro mb-2">
            Elegí tu plan
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Todos los planes incluyen acceso al chatbot con respuestas basadas en leyes colombianas reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planOrder.map((planId) => {
            const plan = PLANES[planId];
            const isCurrent = planId === planActual;

            return (
              <div
                key={planId}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all ${
                  plan.popular
                    ? 'border-dorado shadow-lg scale-[1.02]'
                    : 'border-gray-200 hover:border-azul-medio hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dorado text-white text-xs font-bold px-4 py-1 rounded-full">
                    MÁS ELEGIDO
                  </div>
                )}

                <div className="text-center mb-6">
                  <span className="text-3xl block mb-2">
                    {planId === 'gratis' ? '🆓' : planId === 'pro' ? '⭐' : '👑'}
                  </span>
                  <h3 className="text-xl font-bold text-azul-oscuro">{plan.nombre}</h3>
                  <div className="mt-3">
                    <span className="text-3xl font-extrabold text-azul-oscuro">
                      {plan.precio === 0 ? 'Gratis' : `$${plan.precio.toLocaleString('es-CO')}`}
                    </span>
                    {plan.precio > 0 && (
                      <span className="text-sm text-gray-500 ml-1">{plan.periodo}</span>
                    )}
                  </div>
                  {plan.precio === 0 && (
                    <p className="text-xs text-gray-400 mt-1">{plan.periodo}</p>
                  )}
                </div>

                {/* Beneficios */}
                <ul className="space-y-2 mb-6">
                  {plan.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 font-bold">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Limitaciones */}
                {plan.limitaciones.length > 0 && (
                  <ul className="space-y-1 mb-6">
                    {plan.limitaciones.map((l, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="mt-0.5">✗</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Botón */}
                {isCurrent ? (
                  <div className="text-center py-2.5 bg-gray-100 text-gray-500 text-sm font-semibold rounded-xl">
                    Plan actual
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate('checkout', planId)}
                    className={`w-full py-2.5 font-bold rounded-xl transition-colors text-sm shadow-sm ${
                      plan.popular
                        ? 'bg-dorado hover:bg-dorado-hover text-white'
                        : 'bg-azul-oscuro hover:bg-azul-medio text-white'
                    }`}
                  >
                    {planId === 'gratis' ? 'Empezar gratis' : 'Elegir plan'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-sm text-gray-500 hover:text-azul-oscuro underline"
          >
            ← Volver al panel
          </button>
        </div>
      </main>
    </div>
  );
}
