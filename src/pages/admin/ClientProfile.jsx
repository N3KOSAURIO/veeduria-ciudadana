import { useNavigate, useParams } from 'react-router-dom';
import { getClientById, getActivity } from '../../services/admin.service.js';
import Header from '../../components/Header.jsx';

// Generar actividad para el cliente
function getClientActivity(clientId) {
  return getActivity(clientId).map((a, i) => ({
    ...a,
    id: `act-${clientId}-${i}`,
  }));
}

export default function ClientProfile() {
  const navigate = useNavigate();
  const { clientId } = useParams();

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

  const client = getClientById(clientId);

  if (!client) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500">Cliente no encontrado.</p>
        <button onClick={() => onNavigate('dashboard')} className="text-azul-medio underline font-semibold">
          ← Volver al panel
        </button>
      </div>
    );
  }

  const activity = getClientActivity(client.id);

  const PLAN_LABELS = { gratis: 'Ciudadano', pro: 'Pro', premium: 'Premium' };
  const PLAN_COLORS = { gratis: 'bg-green-100 text-green-700', pro: 'bg-azul-claro text-azul-oscuro', premium: 'bg-yellow-100 text-yellow-700' };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate('dashboard')} onNavigate={onNavigate}>
        <span className="text-xs text-blue-200">Admin — Perfil Cliente</span>
      </Header>

      <main className="flex-1 px-4 md:px-6 py-6 max-w-4xl mx-auto w-full">
        {/* Badge admin */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => onNavigate('dashboard')} className="text-sm text-gray-500 hover:text-azul-oscuro underline">
            ← Panel Admin
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-azul-oscuro">{client.nombre}</span>
        </div>

        {/* Datos básicos del cliente */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-azul-claro flex items-center justify-center text-2xl shrink-0">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-azul-oscuro">{client.nombre}</h2>
              <p className="text-sm text-gray-500">{client.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PLAN_COLORS[client.plan]}`}>
                  {PLAN_LABELS[client.plan]}
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {client.ciudad}
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {client.consultasRealizadas} consultas
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Cliente desde</p>
              <p className="font-semibold text-azul-oscuro">
                {new Date(client.fechaRegistro).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {client.valorPagado > 0 && (
                <p className="text-sm font-bold text-dorado mt-1">
                  ${client.valorPagado.toLocaleString('es-CO')}/mes
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actividad */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>🕐</span> Actividad de la cuenta
          </h3>
          <div className="space-y-2">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-lg shrink-0 mt-0.5">{a.icono}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700">{a.detalle}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(a.fecha).toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">
                  {a.tipo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nota */}
        <p className="text-center text-xs text-gray-400 mb-8">
          Datos simulados con fines demostrativos · Cliente ficticio · Demo Beta
        </p>
      </main>
    </div>
  );
}
