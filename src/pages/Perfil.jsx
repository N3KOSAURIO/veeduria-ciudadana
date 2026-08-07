import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import PLANES from '../data/plans.js';
import FAKE_SESSIONS from '../data/fakeSessions.js';
import FAKE_ACTIVITY from '../data/fakeActivity.js';
import Header from '../components/Header.jsx';

function useMetadata() {
  const [meta, setMeta] = useState(null);
  useEffect(() => {
    const ipBase = '181.52.' + Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256);
    setMeta({
      ip: ipBase,
      ubicacion: 'Bogotá, Colombia',
      navegador: (() => {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'Firefox ' + (ua.match(/Firefox\/(\d+)/)?.[1] || '?');
        if (ua.includes('Edg')) return 'Edge ' + (ua.match(/Edg\/(\d+)/)?.[1] || '?');
        if (ua.includes('Chrome')) return 'Chrome ' + (ua.match(/Chrome\/(\d+)/)?.[1] || '?');
        if (ua.includes('Safari')) return 'Safari ' + (ua.match(/Version\/(\d+)/)?.[1] || '?');
        return ua.split(' ').slice(-2).join(' ') || 'Desconocido';
      })(),
      sistemaOperativo: (() => {
        const p = navigator.userAgent;
        if (p.includes('Windows')) return 'Windows ' + ((p.match(/Windows NT (\d+\.\d+)/)?.[1] || '?') === '10.0' ? '10/11' : p.match(/Windows NT (\d+\.\d+)/)?.[1] || '?');
        if (p.includes('Mac OS')) return 'macOS ' + (p.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '?');
        if (p.includes('Linux')) return 'Linux';
        if (p.includes('Android')) return 'Android ' + (p.match(/Android (\d+)/)?.[1] || '?');
        if (p.includes('iPhone') || p.includes('iPad')) return 'iOS';
        return 'Desconocido';
      })(),
      resolucion: window.screen.width + '×' + window.screen.height,
      zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone,
      idioma: navigator.language || 'es-CO',
      cookiesActivas: document.cookie ? document.cookie.split(';').length : 0,
    });
  }, []);
  return meta;
}

function useCookies() {
  const [cookies, setCookies] = useState([]);
  useEffect(() => {
    const list = [];
    // Cookies reales del navegador
    if (document.cookie) {
      document.cookie.split(';').forEach(c => {
        const [name, ...rest] = c.trim().split('=');
        if (name) list.push({ fuente: 'Cookie', nombre: name, valor: rest.join('=') || '(vacío)' });
      });
    }
    // Cookies de localStorage veeduria_*
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('veeduria_')) {
        const val = localStorage.getItem(key);
        list.push({ fuente: 'LocalStorage', nombre: key, valor: val ? val.substring(0, 120) + (val.length > 120 ? '…' : '') : '(vacío)' });
      }
    }
    setCookies(list);
  }, []);
  return cookies;
}

function exportarDatos(user, planActual, meta, sessions, activity) {
  const data = {
    exportado: new Date().toISOString(),
    plataforma: 'Veeduría Ciudadana',
    datosPersonales: {
      nombre: user?.nombre || '—',
      email: user?.email || '—',
      telefono: user?.telefono || '—',
      ciudad: user?.ciudad || '—',
      plan: planActual?.nombre || '—',
      miembroDesde: user?.fechaRegistro || '—',
      consultasRealizadas: user?.consultasRealizadas || 0,
    },
    metadatosDispositivo: meta || {},
    historialSesiones: sessions,
    actividadCuenta: activity,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'veeduria-mis-datos-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function eliminarCuenta(logout, onNavigate) {
  // Limpiar localStorage de la app
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('veeduria_')) keysToRemove.push(key);
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
  logout();
  onNavigate('landing');
}

export default function Perfil({ onNavigate }) {
  const { user, updateUser, logout } = useUser();
  const planActual = PLANES[user?.plan] || PLANES.gratis;
  const meta = useMetadata();
  const cookies = useCookies();

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
    ciudad: user?.ciudad || '',
  });
  const [passwordForm, setPasswordForm] = useState({ actual: '', nueva: '', confirmar: '' });
  const [msg, setMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [tabVisible, setTabVisible] = useState({ sesiones: false, cookies: false, actividad: false });

  const handleGuardarPerfil = (e) => {
    e.preventDefault();
    updateUser({
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      ciudad: form.ciudad.trim(),
    });
    setEditando(false);
    setMsg('Perfil actualizado.');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleCambiarPassword = (e) => {
    e.preventDefault();
    const { actual, nueva, confirmar } = passwordForm;
    if (nueva !== confirmar) {
      setPassMsg('Las contraseñas no coinciden.');
      return;
    }
    if (nueva.length < 6) {
      setPassMsg('Mínimo 6 caracteres.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('veeduria_users') || '[]');
    const found = users.find(u => u.email === user.email);
    if (found && found.password !== actual) {
      setPassMsg('Contraseña actual incorrecta.');
      return;
    }
    if (found) {
      found.password = nueva;
      localStorage.setItem('veeduria_users', JSON.stringify(users));
    }
    setPasswordForm({ actual: '', nueva: '', confirmar: '' });
    setPassMsg('Contraseña actualizada.');
    setTimeout(() => setPassMsg(''), 3000);
  };

  const handleEliminar = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    eliminarCuenta(logout, onNavigate);
  };

  const fmt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  };

  const datosLectura = (
    <dl className="space-y-3">
      <div className="flex justify-between py-1 border-b border-gray-100">
        <dt className="text-sm text-gray-500">Nombre</dt>
        <dd className="text-sm font-medium text-gray-800">{user?.nombre || '—'}</dd>
      </div>
      <div className="flex justify-between py-1 border-b border-gray-100">
        <dt className="text-sm text-gray-500">Correo</dt>
        <dd className="text-sm font-medium text-gray-800">{user?.email || '—'}</dd>
      </div>
      <div className="flex justify-between py-1 border-b border-gray-100">
        <dt className="text-sm text-gray-500">Teléfono</dt>
        <dd className="text-sm font-medium text-gray-800">{user?.telefono || '—'}</dd>
      </div>
      <div className="flex justify-between py-1 border-b border-gray-100">
        <dt className="text-sm text-gray-500">Ciudad</dt>
        <dd className="text-sm font-medium text-gray-800">{user?.ciudad || '—'}</dd>
      </div>
      <div className="flex justify-between py-1 border-b border-gray-100">
        <dt className="text-sm text-gray-500">Miembro desde</dt>
        <dd className="text-sm font-medium text-gray-800">
          {user?.fechaRegistro ? new Date(user.fechaRegistro).toLocaleDateString('es-CO') : '—'}
        </dd>
      </div>
      <div className="flex justify-between py-1">
        <dt className="text-sm text-gray-500">Consultas realizadas</dt>
        <dd className="text-sm font-bold text-azul-medio">{user?.consultasRealizadas || 0}</dd>
      </div>
    </dl>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate('dashboard')} />
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full space-y-6">

        {/* Título y Exportar */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl font-extrabold text-azul-oscuro">Mi Perfil</h2>
          <button
            onClick={() => exportarDatos(user, planActual, meta, FAKE_SESSIONS, FAKE_ACTIVITY)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <span>📥</span> Exportar mis datos
          </button>
        </div>

        {/* ========== PLAN ACTUAL ========== */}
        <div className={`rounded-xl p-4 border ${planActual.colorClase}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {planActual.id === 'gratis' ? '🆓' : planActual.id === 'pro' ? '⭐' : '👑'}
              </span>
              <div>
                <p className="font-bold text-azul-oscuro">Plan {planActual.nombre}</p>
                <p className="text-xs text-gray-500">
                  {planActual.precio === 0 ? 'Gratis para siempre' : `$${planActual.precio.toLocaleString('es-CO')} ${planActual.periodo}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('planes')}
              className="text-xs text-azul-medio hover:underline font-semibold"
            >
              Cambiar plan
            </button>
          </div>
        </div>

        {/* ========== DATOS PERSONALES ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700">Datos personales</h3>
            {!editando && (
              <button
                onClick={() => setEditando(true)}
                className="text-xs text-azul-medio hover:underline font-semibold"
              >
                Editar
              </button>
            )}
          </div>

          {msg && (
            <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">{msg}</div>
          )}

          {editando ? (
            <form onSubmit={handleGuardarPerfil} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
                <input
                  type="text" value={form.nombre}
                  onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Correo</label>
                <input
                  type="email" value={user?.email || ''} disabled
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">El correo no se puede cambiar en el demo.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Teléfono</label>
                  <input
                    type="text" value={form.telefono}
                    onChange={e => setForm(prev => ({ ...prev, telefono: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Ciudad</label>
                  <input
                    type="text" value={form.ciudad}
                    onChange={e => setForm(prev => ({ ...prev, ciudad: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-semibold rounded-lg transition-colors">
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => { setEditando(false); setForm({ nombre: user?.nombre || '', telefono: user?.telefono || '', ciudad: user?.ciudad || '' }); }}
                  className="px-4 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : datosLectura}
        </div>

        {/* ========== METADATOS DEL DISPOSITIVO ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>🖥️</span> Metadatos del dispositivo
          </h3>
          {!meta ? (
            <p className="text-sm text-gray-400">Cargando metadatos…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Dirección IP</span>
                <span className="text-xs font-mono font-medium text-gray-700">{meta.ip}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Ubicación</span>
                <span className="text-xs font-medium text-gray-700">{meta.ubicacion}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Navegador</span>
                <span className="text-xs font-mono font-medium text-gray-700">{meta.navegador}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Sistema operativo</span>
                <span className="text-xs font-medium text-gray-700">{meta.sistemaOperativo}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Resolución</span>
                <span className="text-xs font-mono font-medium text-gray-700">{meta.resolucion}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Zona horaria</span>
                <span className="text-xs font-medium text-gray-700">{meta.zonaHoraria}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Idioma</span>
                <span className="text-xs font-medium text-gray-700">{meta.idioma}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-xs text-gray-500">Cookies activas</span>
                <span className="text-xs font-bold text-azul-medio">{meta.cookiesActivas}</span>
              </div>
            </div>
          )}
        </div>

        {/* ========== HISTORIAL DE SESIONES ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setTabVisible(t => ({ ...t, sesiones: !t.sesiones }))}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <span>📋</span> Historial de sesiones
              <span className="text-xs font-normal text-gray-400 ml-1">({FAKE_SESSIONS.length})</span>
            </h3>
            <span className={`text-gray-400 transition-transform ${tabVisible.sesiones ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {tabVisible.sesiones && (
            <div className="overflow-x-auto border-t border-gray-100">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider">
                    <th className="text-left px-4 py-2.5 font-semibold">Fecha</th>
                    <th className="text-left px-4 py-2.5 font-semibold">IP</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Ubicación</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Navegador</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Dispositivo</th>
                  </tr>
                </thead>
                <tbody>
                  {FAKE_SESSIONS.map(s => (
                    <tr key={s.id} className={`border-t border-gray-50 ${s.actual ? 'bg-azul-claro/50' : ''}`}>
                      <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                        {fmt(s.fecha)}
                        {s.actual && <span className="ml-2 inline-block px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">Activa</span>}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-gray-600 whitespace-nowrap">{s.ip}</td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{s.ubicacion}</td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{s.navegador}</td>
                      <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{s.dispositivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ========== VISOR DE COOKIES ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setTabVisible(t => ({ ...t, cookies: !t.cookies }))}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <span>🍪</span> Visor de cookies
              <span className="text-xs font-normal text-gray-400 ml-1">({cookies.length})</span>
            </h3>
            <span className={`text-gray-400 transition-transform ${tabVisible.cookies ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {tabVisible.cookies && (
            <div className="overflow-x-auto border-t border-gray-100">
              {cookies.length === 0 ? (
                <p className="p-6 text-sm text-gray-400 text-center">
                  No se encontraron cookies del navegador ni datos veeduria_* en localStorage.
                </p>
              ) : (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider">
                      <th className="text-left px-4 py-2.5 font-semibold w-24">Fuente</th>
                      <th className="text-left px-4 py-2.5 font-semibold">Nombre</th>
                      <th className="text-left px-4 py-2.5 font-semibold">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies.map((c, i) => (
                      <tr key={i} className="border-t border-gray-50">
                        <td className="px-4 py-2.5">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            c.fuente === 'Cookie' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {c.fuente}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-gray-700 break-all">{c.nombre}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-500 break-all max-w-[300px]">{c.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* ========== ACTIVIDAD DE CUENTA ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setTabVisible(t => ({ ...t, actividad: !t.actividad }))}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <span>📜</span> Actividad de cuenta
              <span className="text-xs font-normal text-gray-400 ml-1">({FAKE_ACTIVITY.length})</span>
            </h3>
            <span className={`text-gray-400 transition-transform ${tabVisible.actividad ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {tabVisible.actividad && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {FAKE_ACTIVITY.map(a => (
                <div key={a.id} className="px-6 py-3 flex items-start gap-3 hover:bg-gray-50/50 transition-colors">
                  <span className="text-base mt-0.5 flex-shrink-0">{a.icono}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-gray-700 truncate">{a.accion}</span>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">{fmt(a.fecha)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{a.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========== CAMBIAR CONTRASEÑA ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-700 mb-4">Cambiar contraseña</h3>
          {passMsg && (
            <div className={`mb-4 p-2 rounded-lg text-sm ${
              passMsg.includes('actualizada') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {passMsg}
            </div>
          )}
          <form onSubmit={handleCambiarPassword} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Contraseña actual</label>
              <input
                type="password" value={passwordForm.actual}
                onChange={e => setPasswordForm(prev => ({ ...prev, actual: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nueva contraseña</label>
              <input
                type="password" value={passwordForm.nueva}
                onChange={e => setPasswordForm(prev => ({ ...prev, nueva: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Confirmar nueva contraseña</label>
              <input
                type="password" value={passwordForm.confirmar}
                onChange={e => setPasswordForm(prev => ({ ...prev, confirmar: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Actualizar contraseña
            </button>
          </form>
        </div>

        {/* ========== ELIMINAR CUENTA ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h3 className="font-bold text-red-700 mb-2">Eliminar cuenta</h3>
          <p className="text-sm text-gray-500 mb-4">
            Esta acción es irreversible. Se eliminarán todos tus datos, historial y configuraciones de la plataforma.
          </p>
          {!confirmDelete ? (
            <button
              onClick={handleEliminar}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Eliminar mi cuenta
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-semibold mb-1">⚠️ ¿Estás seguro?</p>
                <p className="text-xs text-red-600">Esta acción no se puede deshacer. Se borrarán todos tus datos locales.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEliminar}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========== CERRAR SESIÓN ========== */}
        <div className="text-center pb-6">
          <button
            onClick={() => { logout(); onNavigate('landing'); }}
            className="text-sm text-red-500 hover:text-red-700 underline font-semibold"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
