import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import { getClients, getPayments } from '../../services/admin.service.js';
import { exportClients, exportPayments } from '../../services/excel.service.js';

/* ------------------------------------------------------------------ */
/*  Datos simulados para gráfico de barras (ingresos mensuales COP)   */
/* ------------------------------------------------------------------ */
const INGRESOS_MENSUALES = [
  { mes: 'Ene', ingresos: 3200000 },
  { mes: 'Feb', ingresos: 4100000 },
  { mes: 'Mar', ingresos: 3800000 },
  { mes: 'Abr', ingresos: 5200000 },
  { mes: 'May', ingresos: 4800000 },
  { mes: 'Jun', ingresos: 6100000 },
  { mes: 'Jul', ingresos: 5800000 },
  { mes: 'Ago', ingresos: 4500000 },
];

const maxIngreso = Math.max(...INGRESOS_MENSUALES.map((m) => m.ingresos));

/* ------------------------------------------------------------------ */
/*  Actividad reciente simulada                                       */
/* ------------------------------------------------------------------ */
const ACTIVIDAD_RECIENTE = [
  { tipo: 'consulta', texto: 'María Fernanda López realizó una consulta sobre contratación estatal', hora: 'Hace 12 min' },
  { tipo: 'registro', texto: 'Pedro Nel Vargas se registró en la plataforma', hora: 'Hace 34 min' },
  { tipo: 'upgrade', texto: 'Andrea Rodríguez subió al plan Pro', hora: 'Hace 1 h' },
  { tipo: 'consulta', texto: 'Constructora Andes SAS consultó sobre licitación pública', hora: 'Hace 2 h' },
  { tipo: 'pago', texto: 'Carlos Gutiérrez renovó su plan Premium', hora: 'Hace 3 h' },
  { tipo: 'registro', texto: 'Sofía Martínez se registró desde Santa Marta', hora: 'Hace 5 h' },
  { tipo: 'consulta', texto: 'Fundación Progreso Colombia generó informe ejecutivo', hora: 'Hace 6 h' },
  { tipo: 'upgrade', texto: 'Gabriel Suárez actualizó a plan Pro', hora: 'Ayer, 16:30' },
];

const ICONOS_ACTIVIDAD = {
  consulta:  '💬',
  registro:  '👤',
  upgrade:   '⭐',
  pago:      '💳',
};

const COLORES_ACTIVIDAD = {
  consulta:  'bg-blue-100 text-blue-700',
  registro:  'bg-green-100 text-green-700',
  upgrade:   'bg-yellow-100 text-yellow-700',
  pago:      'bg-purple-100 text-purple-700',
};

/* ------------------------------------------------------------------ */
/*  Componente: BarChart simple con CSS                               */
/* ------------------------------------------------------------------ */
function BarChart() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Ingresos mensuales · COP
      </h3>
      <div className="flex items-end justify-between gap-1 h-44">
        {INGRESOS_MENSUALES.map((item) => {
          const altura = (item.ingresos / maxIngreso) * 100;
          return (
            <div key={item.mes} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[10px] font-semibold text-azul-oscuro">
                ${(item.ingresos / 1_000_000).toFixed(1)}M
              </span>
              <div
                className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-azul-oscuro to-azul-medio transition-all hover:from-dorado hover:to-dorado-hover cursor-pointer"
                style={{ height: `${altura}%` }}
                title={`${item.mes}: $${item.ingresos.toLocaleString('es-CO')}`}
              />
              <span className="text-[11px] text-gray-400 font-medium">{item.mes}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Componente: MetricCard                                             */
/* ------------------------------------------------------------------ */
function MetricCard({ icono, label, valor, color = 'azul-oscuro' }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icono}</span>
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold text-${color}`}>{valor}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Componente: Badge                                                   */
/* ------------------------------------------------------------------ */
function Badge({ children, color = 'dorado' }) {
  const clases = {
    dorado: 'bg-dorado text-white',
    azul: 'bg-azul-medio text-white',
    verde: 'bg-green-500 text-white',
    rojo: 'bg-red-500 text-white',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${clases[color] || clases.dorado}`}>
      {children}
    </span>
  );
}

/* ================================================================== */
/*  DASHBOARD PRINCIPAL                                                */
/* ================================================================== */
export default function Dashboard({ onNavigate }) {
  const { user, logout } = useUser();

  const clients = getClients();
  const payments = getPayments();
  const ultimosClientes = clients.slice(0, 10);
  const ultimosPagos = payments.slice(0, 10);

  const ingresosTotales = ultimosPagos.reduce((sum, p) => sum + p.monto, 0);
  const formatoCOP = (n) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : `$${n.toLocaleString('es-CO')}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      {/* ---- HEADER ---- */}
      <Header onNavigate={onNavigate}>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => onNavigate('chat')}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Chat"
          >
            💬
          </button>
          <button
            onClick={() => onNavigate('planes')}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Planes"
          >
            🚀
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

      {/* ---- MAIN ---- */}
      <main className="flex-1 px-4 md:px-6 py-6 max-w-6xl mx-auto w-full">

        {/* Fila: Bienvenida + Badge Demo */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-azul-oscuro">
              ¡Hola{user?.nombre ? `, ${user.nombre.split(' ')[0]}` : ''}!
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Panel de control · Veeduría Ciudadana
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-azul-oscuro/10 text-azul-oscuro text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-dorado rounded-full animate-pulse" />
              Demo Beta
            </span>
          </div>
        </div>

        {/* ---- TARJETAS DE MÉTRICAS ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span className="text-2xl block mb-2">💰</span>
            <p className="text-sm text-gray-500">Ingresos totales</p>
            <p className="text-2xl font-bold text-azul-oscuro">
              {formatoCOP(ingresosTotales)} COP
            </p>
            <p className="text-xs text-green-600 mt-1">↑ 12% vs mes anterior</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span className="text-2xl block mb-2">👥</span>
            <p className="text-sm text-gray-500">Clientes activos</p>
            <p className="text-2xl font-bold text-azul-oscuro">47</p>
            <p className="text-xs text-green-600 mt-1">↑ 4 nuevos este mes</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span className="text-2xl block mb-2">📋</span>
            <p className="text-sm text-gray-500">Consultas este mes</p>
            <p className="text-2xl font-bold text-azul-oscuro">312</p>
            <p className="text-xs text-green-600 mt-1">↑ 8% vs mes anterior</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span className="text-2xl block mb-2">📈</span>
            <p className="text-sm text-gray-500">Tasa de conversión</p>
            <p className="text-2xl font-bold text-dorado">23%</p>
            <p className="text-xs text-amber-600 mt-1">gratis → pago</p>
          </div>
        </div>

        {/* ---- ACCESO RÁPIDO ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => onNavigate('chat')}
            className="group bg-white rounded-xl p-5 shadow-sm border-2 border-transparent hover:border-dorado transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">💬</span>
              <div>
                <h3 className="font-bold text-azul-oscuro group-hover:text-dorado transition-colors">
                  Nueva consulta
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Preguntá sobre obras, contratos o tus derechos
                </p>
              </div>
            </div>
          </button>
          <button
            onClick={() => onNavigate('planes')}
            className="group bg-white rounded-xl p-5 shadow-sm border-2 border-transparent hover:border-azul-medio transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <div>
                <h3 className="font-bold text-azul-oscuro group-hover:text-azul-medio transition-colors">
                  Ver planes
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Compará planes y subí tu cuenta
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* ---- GRÁFICO + ACTIVIDAD ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <BarChart />
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Actividad reciente
            </h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {ACTIVIDAD_RECIENTE.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${COLORES_ACTIVIDAD[a.tipo]}`}>
                    {ICONOS_ACTIVIDAD[a.tipo]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">{a.texto}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{a.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- TABLA: ÚLTIMOS CLIENTES ---- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Últimos clientes registrados
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => exportClients(clients)}
                className="text-xs text-green-600 hover:text-green-800 font-medium flex items-center gap-1"
                title="Exportar a Excel"
              >
                <span>📥</span> Excel
              </button>
              <Badge>{clients.length} totales</Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Ciudad</th>
                  <th className="px-5 py-3 hidden md:table-cell">Registro</th>
                  <th className="px-5 py-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ultimosClientes.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onNavigate('clientProfile', c.id)}
                    className="hover:bg-azul-claro transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3 font-medium text-azul-oscuro">
                      {c.nombre}
                      <div className="text-xs text-gray-400 font-normal">{c.email}</div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge color={c.plan === 'premium' ? 'dorado' : c.plan === 'pro' ? 'azul' : 'verde'}>
                        {c.plan === 'gratis' ? 'Ciudadano' : c.plan === 'pro' ? 'Pro' : 'Premium'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{c.ciudad}</td>
                    <td className="px-5 py-3 text-gray-500 hidden md:table-cell">
                      {new Date(c.fechaRegistro).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-azul-oscuro">
                      {c.valorPagado === 0 ? '—' : `$${c.valorPagado.toLocaleString('es-CO')}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- TABLA: ÚLTIMOS PAGOS ---- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Últimos pagos recibidos
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => exportPayments(payments)}
                className="text-xs text-green-600 hover:text-green-800 font-medium flex items-center gap-1"
                title="Exportar a Excel"
              >
                <span>📥</span> Excel
              </button>
              <Badge color="verde">{payments.length} transacciones</Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3">Factura</th>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3 text-right">Monto</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Método</th>
                  <th className="px-5 py-3 hidden md:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ultimosPagos.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">{p.factura}</td>
                    <td className="px-5 py-3 font-medium text-azul-oscuro">{p.cliente}</td>
                    <td className="px-5 py-3 text-right font-semibold text-azul-oscuro">
                      ${p.monto.toLocaleString('es-CO')}
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{p.metodo}</td>
                    <td className="px-5 py-3 text-gray-500 hidden md:table-cell">
                      {new Date(p.fecha).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- CERRAR SESIÓN ---- */}
        <div className="text-center pb-4">
          <button
            onClick={() => { logout(); onNavigate('landing'); }}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            ← Cerrar sesión
          </button>
        </div>
      </main>

      {/* ---- FOOTER ---- */}
      <footer className="text-center py-3 text-[11px] text-gray-400 border-t border-gray-200 bg-white/50">
        Veeduría Ciudadana 2026 · Demo Beta · Datos simulados con fines demostrativos
      </footer>
    </div>
  );
}
