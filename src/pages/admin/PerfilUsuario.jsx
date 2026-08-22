import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { metricasComportamientoDemo, SERVICIOS_META } from '../../services/admin/metricasComportamiento.js';

/* ------------------------------------------------------------------ */
/*  Detalle del perfil de usuario (ADMIN ONLY) — FASE 5               */
/*  ⚠️ DEMO ONLY: datos ficticios de ejemplo.                          */
/*  Muestra el comportamiento individual (activity_log) de UN perfil.  */
/*  Guard: AdminLayout (user.role === 'admin'). El ciudadano no ve estos. */
/* ------------------------------------------------------------------ */

// Historial ficticio de eventos por usuario (enlace a "los datos de cada perfil").
const HISTORIAL_DEMO = {
  'u-01': [
    { tipo: 'consulta', servicio: 'veeduria', detalle: 'Consulta sobre contratación estatal', fecha: '2026-08-22T08:15:00Z' },
    { tipo: 'comentario', servicio: 'comunidad', detalle: 'Comentó una publicación de obra civil', fecha: '2026-08-22T08:02:00Z' },
    { tipo: 'voto', servicio: 'comunidad', detalle: 'Votó una publicación de infraestructura', fecha: '2026-08-21T20:10:00Z' },
    { tipo: 'trámite', servicio: 'veeduria', detalle: 'Inició trámite de derecho de petición', fecha: '2026-08-21T14:45:00Z' },
    { tipo: 'login', servicio: 'veeduria', detalle: 'Inicio de sesión', fecha: '2026-08-21T08:00:00Z' },
  ],
  'u-02': [
    { tipo: 'consulta', servicio: 'veeduria', detalle: 'Consulta sobre obra pública municipal', fecha: '2026-08-22T09:40:00Z' },
    { tipo: 'login', servicio: 'veeduria', detalle: 'Inicio de sesión', fecha: '2026-08-22T09:39:00Z' },
    { tipo: 'trámite', servicio: 'veeduria', detalle: 'Generó informe ejecutivo', fecha: '2026-08-21T16:20:00Z' },
  ],
  'u-03': [
    { tipo: 'reporte', servicio: 'veeduria', detalle: 'Reportó obra sin finalizar', fecha: '2026-08-21T18:20:00Z' },
    { tipo: 'comentario', servicio: 'comunidad', detalle: 'Comentó un post de salud pública', fecha: '2026-08-21T11:00:00Z' },
    { tipo: 'login', servicio: 'veeduria', detalle: 'Inicio de sesión', fecha: '2026-08-21T09:30:00Z' },
  ],
  'u-04': [
    { tipo: 'voto', servicio: 'comunidad', detalle: 'Votó una publicación de transporte', fecha: '2026-08-21T15:05:00Z' },
    { tipo: 'login', servicio: 'comunidad', detalle: 'Inicio de sesión', fecha: '2026-08-21T15:00:00Z' },
  ],
  'u-05': [
    { tipo: 'consulta', servicio: 'veeduria', detalle: 'Consulta sobre contratos públicos', fecha: '2026-08-22T07:55:00Z' },
    { tipo: 'reporte', servicio: 'veeduria', detalle: 'Reportó posible irregularidad', fecha: '2026-08-20T13:30:00Z' },
    { tipo: 'comentario', servicio: 'comunidad', detalle: 'Comentó un post de medio ambiente', fecha: '2026-08-19T10:15:00Z' },
  ],
  'u-06': [
    { tipo: 'trámite', servicio: 'veeduria', detalle: 'Acción popular en curso', fecha: '2026-08-20T11:30:00Z' },
    { tipo: 'login', servicio: 'veeduria', detalle: 'Inicio de sesión', fecha: '2026-08-20T11:00:00Z' },
  ],
  'u-07': [
    { tipo: 'consulta', servicio: 'comunidad', detalle: 'Consultó comunidades activas', fecha: '2026-08-20T14:10:00Z' },
    { tipo: 'login', servicio: 'comunidad', detalle: 'Inicio de sesión', fecha: '2026-08-20T14:00:00Z' },
  ],
};

const ICONOS = { consulta: '💬', trámite: '📋', reporte: '🚨', comentario: '💭', voto: '👍', login: '🔐' };
const COLORES = {
  consulta: 'bg-blue-100 text-blue-700',
  trámite: 'bg-indigo-100 text-indigo-700',
  reporte: 'bg-red-100 text-red-700',
  comentario: 'bg-green-100 text-green-700',
  voto: 'bg-yellow-100 text-yellow-700',
  login: 'bg-gray-100 text-gray-700',
};

export default function PerfilUsuario() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const onNavigate = (target) => {
    const routes = {
      perfilComportamiento: '/admin/perfil-comportamiento',
      dashboard: '/admin',
      landing: '/',
      inicio: '/inicio',
      perfil: '/perfil',
    };
    navigate(routes[target] || '/');
  };

  const perfil = metricasComportamientoDemo.por_perfil.find((p) => p.usuario_id === userId);
  const historial = HISTORIAL_DEMO[userId] || [];

  if (!perfil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">⚠️ Perfil no encontrado (dato ficticio)</p>
          <button onClick={() => onNavigate('perfilComportamiento')} className="text-azul-medio underline">← Volver</button>
        </div>
      </div>
    );
  }

  const formatoFecha = (iso) =>
    new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header onNavigate={onNavigate}>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => onNavigate('perfilComportamiento')}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Perfil de comportamiento"
          >
            📊
          </button>
        </div>
      </Header>

      <main className="flex-1 px-4 md:px-6 py-6 max-w-4xl mx-auto w-full">
        <button
          onClick={() => onNavigate('perfilComportamiento')}
          className="text-sm text-gray-400 hover:text-azul-medio transition-colors mb-4 inline-flex items-center gap-1"
        >
          ← Volver al perfil de comportamiento
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-azul-oscuro">{perfil.nombre}</h2>
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ⚠️ ficticio
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{perfil.email} · {perfil.ciudad}</p>
            </div>
            <div className="flex items-center gap-2">
              {perfil.servicios_uso.map((s) => (
                <span key={s} className={`text-[10px] font-bold px-2 py-1 rounded-full ${SERVICIOS_META[s]?.color || 'bg-gray-200'} text-white`}>
                  {SERVICIOS_META[s]?.label || s}
                </span>
              ))}
            </div>
          </div>
          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Total eventos</p>
              <p className="text-2xl font-bold text-azul-oscuro">{perfil.eventos}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Servicios usados</p>
              <p className="text-2xl font-bold text-azul-oscuro">{perfil.servicios_uso.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Última actividad</p>
              <p className="text-lg font-semibold text-azul-oscuro">{formatoFecha(perfil.ultima_actividad)}</p>
            </div>
          </div>
        </div>

        {/* Historial de activity_log del perfil */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Historial de comportamiento (activity_log)
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {historial.length === 0 && (
              <div className="px-5 py-6 text-center text-sm text-gray-400">
                Sin eventos registrados (dato ficticio).
              </div>
            )}
            {historial.map((h, i) => (
              <div key={i} className="px-5 py-3 flex gap-3 items-start">
                <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${COLORES[h.tipo]}`}>{ICONOS[h.tipo]}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700 leading-snug">{h.detalle}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {h.tipo} · {SERVICIOS_META[h.servicio]?.label || h.servicio} · {formatoFecha(h.fecha)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-3 text-[11px] text-gray-400 border-t border-gray-200 bg-white/50">
        Veeduría Ciudadana 2026 · Datos ficticios de ejemplo · Solo administración · Ley 1581
      </footer>
    </div>
  );
}
