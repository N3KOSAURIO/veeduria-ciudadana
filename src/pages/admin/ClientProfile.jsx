import { getClientById, getSessions, getActivity } from '../../services/admin.service.js';
import Header from '../../components/Header.jsx';

// Datos simulados por cliente — metadatos de navegación
const CLIENT_METADATA = {
  navegadores: ['Chrome 127', 'Firefox 128', 'Safari 17.5', 'Edge 126', 'Chrome 126', 'Firefox 125'],
  sistemas: ['Windows 11', 'macOS 14.5', 'Ubuntu 24.04', 'Android 14', 'iOS 17.6', 'Windows 10'],
  resoluciones: ['1920×1080', '2560×1440', '1366×768', '1440×900', '375×812', '390×844'],
  ips: [
    { ip: '181.52.xxx.xxx', ubicacion: 'Bogotá, Colombia', isp: 'Tigo Colombia' },
    { ip: '186.84.xxx.xxx', ubicacion: 'Medellín, Colombia', isp: 'Claro Colombia' },
    { ip: '190.90.xxx.xxx', ubicacion: 'Cali, Colombia', isp: 'Movistar Colombia' },
    { ip: '201.245.xxx.xxx', ubicacion: 'Barranquilla, Colombia', isp: 'Tigo Colombia' },
    { ip: '152.200.xxx.xxx', ubicacion: 'Bucaramanga, Colombia', isp: 'ETB' },
  ],
  dispositivos: ['Escritorio', 'Escritorio', 'Móvil', 'Tablet', 'Escritorio', 'Móvil'],
  cookies: [
    { nombre: 'veeduria_session', valor: 'sess_xxxxxxxx', duracion: '24h', tipo: 'Esencial' },
    { nombre: 'veeduria_tos_accepted', valor: 'v1.0', duracion: 'Permanente', tipo: 'Esencial' },
    { nombre: 'veeduria_cookies_accepted', valor: 'essential,analytics', duracion: '1 año', tipo: 'Esencial' },
    { nombre: 'veeduria_theme', valor: 'light', duracion: 'Permanente', tipo: 'Preferencia' },
    { nombre: '_ga', valor: 'GA1.2.xxxxx', duracion: '2 años', tipo: 'Analítica' },
    { nombre: '_ga_XXX', valor: 'GS2.1.xxxxx', duracion: '2 años', tipo: 'Analítica' },
  ],
};

// Generar metadatos determinísticos basados en ID del cliente
function getClientMeta(clientId) {
  const idx = (clientId - 1) % CLIENT_METADATA.navegadores.length;
  const ip = CLIENT_METADATA.ips[(clientId - 1) % CLIENT_METADATA.ips.length];

  return {
    navegador: CLIENT_METADATA.navegadores[idx],
    sistema: CLIENT_METADATA.sistemas[idx],
    resolucion: CLIENT_METADATA.resoluciones[idx],
    dispositivo: CLIENT_METADATA.dispositivos[idx],
    ip: ip.ip,
    ubicacion: ip.ubicacion,
    isp: ip.isp,
    zonaHoraria: 'America/Bogota (GMT-5)',
    idioma: 'es-CO',
    cookiesActivas: 6,
  };
}

// Generar sesiones para el cliente
function getClientSessions(clientId) {
  return getSessions(clientId).map((s, i) => ({
    ...s,
    id: `sess-${clientId}-${i}`,
  }));
}

// Generar actividad para el cliente
function getClientActivity(clientId) {
  return getActivity(clientId).map((a, i) => ({
    ...a,
    id: `act-${clientId}-${i}`,
  }));
}

export default function ClientProfile({ onNavigate, clientId }) {
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

  const meta = getClientMeta(client.id);
  const sessions = getClientSessions(client.id);
  const activity = getClientActivity(client.id);

  const PLAN_LABELS = { gratis: 'Ciudadano', pro: 'Pro', premium: 'Premium' };
  const PLAN_COLORS = { gratis: 'bg-green-100 text-green-700', pro: 'bg-azul-claro text-azul-oscuro', premium: 'bg-yellow-100 text-yellow-700' };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate('dashboard')}>
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

        {/* Metadatos del dispositivo (simulados) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>🖥️</span> Metadatos del dispositivo
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">IP (simulada)</dt>
              <dd className="text-sm font-mono text-gray-800">{meta.ip}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Ubicación</dt>
              <dd className="text-sm text-gray-800">{meta.ubicacion}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">ISP</dt>
              <dd className="text-sm text-gray-800">{meta.isp}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Navegador</dt>
              <dd className="text-sm text-gray-800">{meta.navegador}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Sistema operativo</dt>
              <dd className="text-sm text-gray-800">{meta.sistema}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Resolución</dt>
              <dd className="text-sm text-gray-800">{meta.resolucion}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Dispositivo</dt>
              <dd className="text-sm text-gray-800">{meta.dispositivo}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Zona horaria</dt>
              <dd className="text-sm text-gray-800">{meta.zonaHoraria}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Idioma</dt>
              <dd className="text-sm text-gray-800">{meta.idioma}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-sm text-gray-500">Cookies activas</dt>
              <dd className="text-sm font-bold text-dorado">{meta.cookiesActivas}</dd>
            </div>
          </dl>
        </div>

        {/* Cookies visor */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>🍪</span> Cookies del cliente
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-400 uppercase">
                  <th className="px-4 py-2">Cookie</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Duración</th>
                  <th className="px-4 py-2">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CLIENT_METADATA.cookies.map((c, i) => (
                  <tr key={i} className="hover:bg-blue-50/30">
                    <td className="px-4 py-2.5 font-mono text-xs text-azul-oscuro">{c.nombre}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{c.valor}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500">{c.duracion}</td>
                    <td className="px-4 py-2.5 text-xs">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        c.tipo === 'Esencial' ? 'bg-green-100 text-green-700' :
                        c.tipo === 'Analítica' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {c.tipo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historial de sesiones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>📜</span> Historial de sesiones
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-400 uppercase">
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">IP</th>
                  <th className="px-4 py-2">Ubicación</th>
                  <th className="px-4 py-2">Navegador</th>
                  <th className="px-4 py-2">Dispositivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sessions.map((s, i) => (
                  <tr key={i} className={`${s.actual ? 'bg-azul-claro/30' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-2.5 text-xs text-gray-700 font-medium">
                      {new Date(s.fecha).toLocaleString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      {s.actual && <span className="ml-1 text-[10px] text-azul-medio font-bold">ACTUAL</span>}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{s.ip}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500">{s.ubicacion}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500">{s.navegador}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500">{s.dispositivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
