import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import { metricasComportamientoDemo, SERVICIOS_META } from '../../services/admin/metricasComportamiento.js';

/* ------------------------------------------------------------------ */
/*  Dashboard: Perfil de Comportamiento (ADMIN ONLY)                  */
/*  FASE 5 — Recolección de metadatos de activity_log.                */
/*  ⚠️ DEMO ONLY: datos ficticios de ejemplo.                          */
/*  El guard lo provee AdminLayout (user.role === 'admin').            */
/*  El eje central es el SELECTOR DE USUARIO: al elegir uno, las      */
/*  KPIs y las 3 gráficas muestran la actividad de ESE usuario.       */
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
            <span className="text-[11px] text-gray-400 font-medium">{labelKey ? item[labelKey] : ''}</span>
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
  const [usuarioId, setUsuarioId] = useState(metricasComportamientoDemo.por_perfil[0]?.usuario_id || '');

  const onNavigate = (target, extra) => {
    const routes = {
      landing: '/',
      dashboard: '/admin',
      inicio: '/inicio',
      chat: '/chat',
      perfil: '/perfil',
      planes: '/planes',
      perfilComportamiento: '/admin/perfil-comportamiento',
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

  // El usuario seleccionado + sus métricas individuales
  const perfiles = metricasComportamientoDemo.por_perfil;
  const perfilSeleccionado = perfiles.find((p) => p.usuario_id === usuarioId) || perfiles[0];
  const detalle = metricasComportamientoDemo.por_perfil_detalle[perfilSeleccionado?.usuario_id]
    || { total_eventos: 0, eventos_hoy: 0, servicios_usados: 0, por_tipo: [], por_servicio: [], por_dia: [] };

  const maxTipo = detalle.por_tipo.length ? Math.max(...detalle.por_tipo.map((t) => t.eventos)) : 1;
  const maxServicio = detalle.por_servicio.length ? Math.max(...detalle.por_servicio.map((s) => s.eventos)) : 1;
  const maxDia = detalle.por_dia.length ? Math.max(...detalle.por_dia.map((d) => d.eventos)) : 1;

  const formatoFecha = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  if (!perfilSeleccionado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
        <p className="text-gray-500">No hay usuarios para mostrar.</p>
      </div>
    );
  }

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
              Selecciona un usuario para ver su comportamiento · Solo administración
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

        {/* ---- Selector de usuario ---- */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-8">
          <label htmlFor="selector-usuario" className="block text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            👤 Usuario a analizar
          </label>
          <select
            id="selector-usuario"
            value={perfilSeleccionado.usuario_id}
            onChange={(e) => setUsuarioId(e.target.value)}
            className="w-full sm:w-96 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-azul-oscuro font-medium focus:outline-none focus:ring-2 focus:ring-dorado focus:border-transparent"
          >
            {perfiles.map((p) => (
              <option key={p.usuario_id} value={p.usuario_id}>
                {p.nombre} · {p.ciudad}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-2">
            Mostrando el perfil de <strong className="text-azul-oscuro">{perfilSeleccionado.nombre}</strong> ({perfilSeleccionado.email}) · {perfilSeleccionado.ciudad}
          </p>
        </div>

        {/* ---- KPIs (del usuario seleccionado) ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard icono="🧮" label="Total eventos" valor={detalle.total_eventos.toLocaleString('es-CO')} sub={perfilSeleccionado.nombre} />
          <KpiCard icono="⚡" label="Eventos hoy" valor={detalle.eventos_hoy} sub="últimas 24 h" />
          <KpiCard icono="🧩" label="Servicios usados" valor={detalle.servicios_usados} sub="de los activos" />
          <KpiCard icono="📌" label="última actividad" valor={formatoFecha(perfilSeleccionado.ultima_actividad)} sub={perfilSeleccionado.ciudad} />
        </div>

        {/* ---- Gráficas (del usuario seleccionado) ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Tipo de comportamiento · {perfilSeleccionado.nombre.split(' ')[0]}
            </h3>
            <BarraGrafica data={detalle.por_tipo} valorKey="eventos" labelKey="tipo" maxValor={maxTipo} colorBase="bg-azul-medio" />
          </div>

          <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Uso por servicio · {perfilSeleccionado.nombre.split(' ')[0]}
            </h3>
            <BarraGrafica data={detalle.por_servicio} valorKey="eventos" labelKey="servicio" maxValor={maxServicio} colorBase="bg-dorado" />
          </div>

          <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Actividad en el tiempo (7 días)
            </h3>
            <BarraGrafica data={detalle.por_dia} valorKey="eventos" labelKey="dia" maxValor={maxDia} colorBase="bg-azul-oscuro" />
          </div>
        </div>

        {/* ---- Tabla: todos los perfiles (referencia para elegir) ---- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Usuarios disponibles · comportamiento
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
                {perfiles.map((p) => (
                  <tr
                    key={p.usuario_id}
                    onClick={() => { setUsuarioId(p.usuario_id); }}
                    className={`transition-colors cursor-pointer ${p.usuario_id === perfilSeleccionado.usuario_id ? 'bg-azul-claro font-medium' : 'hover:bg-azul-claro/60'}`}
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
