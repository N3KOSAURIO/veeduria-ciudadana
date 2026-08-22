import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import { metricasComportamientoDemo, SERVICIOS_META } from '../../services/admin/metricasComportamiento.js';

/* ------------------------------------------------------------------ */
/*  Dashboard: Perfil de Comportamiento (ADMIN ONLY)                  */
/*  FASE 5 — Recolección de metadatos de activity_log.                */
/*  ⚠️ DEMO ONLY: datos ficticios de ejemplo.                          */
/*  El guard lo provee AdminLayout (user.role === 'admin').            */
/* ------------------------------------------------------------------ */

function BarraGrafica({ data, valorKey, labelKey, maxValor, colorBase }) {
  return (
    <div className="flex items-end justify-between gap-2 h-36">
      {data.map((item, i) => {
        const altura = maxValor > 0 ? (item[valorKey] / maxValor) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-[10px] font-semibold text-azul-oscuro">{item[valorKey]}</span>
            <div
              className={`w-full max-w-[45px] rounded-t-md ${colorBase || 'bg-azul-medio'} transition-all hover:opacity-90`}
              style={{ height: `${altura}%` }}
              title={`${labelKey ? item[labelKey] : ''}: ${item[valorKey]} eventos`}
            />
            <span className="text-[11px] text-gray-400 font-medium">{item[labelKey]}</span>
          </div>
        );
      })}
    </div>
  );
}

function KpiCard({ icono, label, valor, sub }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <span className="text-2xl block mb-2">{icono}</span>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-azul-oscuro">{valor}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function PerfilComportamiento() {
  const { user } = useUser();
  const navigate = useNavigate();

  const onNavigate = (target, extra) => {
    const routes = {
      landing: '/',
      dashboard: '/admin',
      inicio: '/inicio',
      chat: '/chat',
      perfil: '/perfil',
      planes: '/planes',
      perfilComportamiento: `/admin/perfil-comportamiento`,
      perfilUsuario: `/admin/perfil-comportamiento/usuarios/${extra}`,
      terminos: '/terminos',
      privacidad: '/privacidad',
      cookies: '/cookies',
      ajustes: '/ajustes',
      login: '/login',
      registro: '/registro',
    };
    navigate(routes[target] || '/');
  };

  const m = metricasComportamientoDemo;
  const maxTipo = Math.max(...m.por_tipo.map((t) => t.eventos));
  const maxServicio = Math.max(...m.por_servicio.map((s) => s.eventos));
  const maxDia = Math.max(...m.por_dia.map((d) => d.eventos));

  const formatoFecha = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header onNavigate={onNavigate}>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Dashboard"
          >
            📊
          </button>
          <button
            onClick={() => onNavigate('perfil')}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Perfil"
          >
            👤
          </button>
        </div>
      </Header>

      <main className="flex-1 px-4 md:px-6 py-6 max-w-6xl mx-auto w-full">
        {/* Encabezado + banner DEMO + guard rol */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-azul-oscuro">
              Perfil de Comportamiento
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Metadatos de activity_log · recolección de uso · Solo administración
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              ⚠️ DEMO · datos ficticios de ejemplo
            </span>
            {user && (
              <span className="inline-flex items-center gap-1.5 bg-azul-oscuro/10 text-azul-oscuro text-xs font-semibold px-3 py-1.5 rounded-full">
                👤 {user.role === 'admin' ? 'Admin' : 'Ciudadano'}
              </span>
            )}
          </div>
        </div>

        {/* ---- KPIs ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard icono="🧮" label="Total eventos" valor={m.total_eventos.toLocaleString('es-CO')} sub="acumulado en activity_log" />
          <KpiCard icono="👥" label="Usuarios activos" valor={m.usuarios_activos} sub="con actividad registrada" />
          <KpiCard icono="⚡" label="Eventos hoy" valor={m.eventos_hoy} sub="últimas 24 h" />
          <KpiCard icono="🧩" label="Servicios usados" valor={m.servicios_usados} sub="de los servicios activos" />
        </div>

        {/* ---- Gráficas ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Tipo de comportamiento */}
          <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Tipo de comportamiento
            </h3>
            <BarraGrafica data={m.por_tipo} valorKey="eventos" labelKey="tipo" maxValor={maxTipo} colorBase="bg-azul-medio" />
          </div>

          {/* Uso por servicio */}
          <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Uso por servicio
            </h3>
            <BarraGrafica data={m.por_servicio} valorKey="eventos" labelKey="servicio" maxValor={maxServicio} colorBase="bg-dorado" />
          </div>

          {/* Actividad en el tiempo */}
          <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Actividad en el tiempo (7 días)
            </h3>
            <BarraGrafica data={m.por_dia} valorKey="eventos" labelKey="dia" maxValor={maxDia} colorBase="bg-azul-oscuro" />
          </div>
        </div>

        {/* ---- Tabla: Comportamiento por perfil de usuario ---- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Comportamiento por perfil de usuario
            </h3>
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
              ⚠️ ficticio
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3">Perfil</th>
                  <th className="px-5 py-3">Ciudad</th>
                  <th className="px-5 py-3">Servicios usados</th>
                  <th className="px-5 py-3 text-right">Eventos</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Última actividad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {m.por_perfil.map((p) => (
                  <tr
                    key={p.usuario_id}
                    onClick={() => onNavigate('perfilUsuario', p.usuario_id)}
                    className="hover:bg-azul-claro transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3 font-medium text-azul-oscuro">
                      {p.nombre}
                      <div className="text-xs text-gray-400 font-normal">{p.email}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{p.ciudad}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {p.servicios_uso.map((s) => (
                          <span
                            key={s}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SERVICIOS_META[s]?.color || 'bg-gray-200'} text-white`}
                          >
                            {SERVICIOS_META[s]?.label || s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-azul-oscuro">{p.eventos}</td>
                    <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{formatoFecha(p.ultima_actividad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cerrar sesión y volver */}
        <div className="text-center pb-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-azul-medio transition-colors"
          >
            ← Volver al dashboard
          </button>
        </div>
      </main>

      <footer className="text-center py-3 text-[11px] text-gray-400 border-t border-gray-200 bg-white/50">
        Veeduría Ciudadana 2026 · Datos ficticios de ejemplo · Solo administración · Ley 1581
      </footer>
    </div>
  );
}
