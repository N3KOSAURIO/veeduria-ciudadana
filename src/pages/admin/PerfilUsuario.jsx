import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { obtenerMetricasAdmin } from '../../services/admin/adminMetrics.api.js';
import { SERVICIOS_META } from '../../services/admin/metricasComportamiento.js';

/* ------------------------------------------------------------------ */
/*  Detalle del perfil de usuario (ADMIN ONLY) — FASE 5               */
/*  ✅ B1 (2026-08-22): datos REALES desde GET /api/admin/metricas.   */
/*  Guard: AdminLayout (user.role === 'admin'). El ciudadano no ve    */
/*  estas rutas ni estos datos (Ley 1581).                            */
/*                                                                    */
/*  Muestra el comportamiento agregado de UN perfil: identidad (nombre,*/
/*  email, ciudad), KPIs (total eventos, servicios, última actividad)  */
/*  y las 3 métricas (por_tipo / por_servicio / por_dia).             */
/*  NOTA: el historial crudo de eventos NO se expone desde el endpoint */
/*  admin (deliberado, Ley 1581: no se leen payloads individuales).   */
/*  Solo se muestran agregados administrativos.                       */
/* ------------------------------------------------------------------ */

function Barra({ data, valorKey, labelKey, maxValor, colorBase }) {
  return (
    <div className="flex items-end justify-between gap-2 h-28">
      {data.map((item, i) => {
        const altura = maxValor > 0 ? (item[valorKey] / maxValor) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-[10px] font-semibold text-azul-oscuro">{item[valorKey]}</span>
            <div
              className={`w-full max-w-[40px] rounded-t-md ${colorBase || 'bg-azul-medio'}`}
              style={{ height: `${altura}%` }}
            />
            <span className="text-[10px] text-gray-400 font-medium">{labelKey ? item[labelKey] : ''}</span>
          </div>
        );
      })}
    </div>
  );
}

function Kpi({ label, valor }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-azul-oscuro">{valor}</p>
    </div>
  );
}

export default function PerfilUsuario() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [metricas, setMetricas] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    let activo = true;
    obtenerMetricasAdmin()
      .then((data) => activo && setMetricas(data))
      .catch((e) => activo && setError(e.message || 'No se pudo cargar las métricas'));
    return () => { activo = false; };
  }, []);

  // error de carga
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }
  if (!metricas) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
        <p className="text-gray-500">Cargando…</p>
      </div>
    );
  }

  const perfil = (metricas.por_perfil || []).find((p) => p.usuario_id === userId);
  const detalle = metricas.por_perfil_detalle?.[userId];

  if (!perfil || !detalle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">⚠️ Perfil no encontrado o sin actividad registrada.</p>
          <button onClick={() => onNavigate('perfilComportamiento')} className="text-azul-medio underline">← Volver</button>
        </div>
      </div>
    );
  }

  const formatoFecha = (iso) =>
    iso ? new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—';

  const maxTipo = detalle.por_tipo?.length ? Math.max(...detalle.por_tipo.map((t) => t.eventos)) : 1;
  const maxServicio = detalle.por_servicio?.length ? Math.max(...detalle.por_servicio.map((s) => s.eventos)) : 1;
  const maxDia = detalle.por_dia?.length ? Math.max(...detalle.por_dia.map((d) => d.eventos)) : 1;

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
              <h2 className="text-xl font-bold text-azul-oscuro">{perfil.nombre || perfil.email}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{perfil.email} · {perfil.ciudad || '—'}</p>
            </div>
            <div className="flex items-center gap-2">
              {(perfil.servicios_uso || []).map((s) => (
                <span key={s} className={`text-[10px] font-bold px-2 py-1 rounded-full ${SERVICIOS_META[s]?.color || 'bg-gray-200'} text-white`}>
                  {SERVICIOS_META[s]?.label || s}
                </span>
              ))}
            </div>
          </div>
          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Kpi label="Total eventos" valor={detalle.total_eventos.toLocaleString('es-CO')} />
            <Kpi label="Eventos hoy" valor={detalle.eventos_hoy} />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Última actividad</p>
              <p className="text-lg font-semibold text-azul-oscuro">{formatoFecha(perfil.ultima_actividad)}</p>
            </div>
          </div>
        </div>

        {/* Métricas agregadas del perfil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Tipo de comportamiento</h3>
            <Barra data={detalle.por_tipo} valorKey="eventos" labelKey="tipo" maxValor={maxTipo} colorBase="bg-azul-medio" />
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Uso por servicio</h3>
            <Barra data={detalle.por_servicio} valorKey="eventos" labelKey="servicio" maxValor={maxServicio} colorBase="bg-dorado" />
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Actividad en el tiempo (7 días)</h3>
            <Barra data={detalle.por_dia} valorKey="eventos" labelKey="dia" maxValor={maxDia} colorBase="bg-azul-oscuro" />
          </div>
        </div>
      </main>

      <footer className="text-center py-3 text-[11px] text-gray-400 border-t border-gray-200 bg-white/50">
        Veeduría Ciudadana 2026 · Solo administración · Ley 1581
      </footer>
    </div>
  );
}
