import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import { getPlans } from '../../services/citizen.service.js';
import { authApi } from '../../core/api/apiClient.js';
import Header from '../../components/Header.jsx';

function exportarDatos(user, planActual) {
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

export default function Perfil() {
  const { user, updateUser, logout } = useUser();
  const navigate = useNavigate();

  // Routing directo con React Router (reemplaza el onNavigate del PageWrapper)
  const onNavigate = (target, extra) => {
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
      clientProfile: `/admin/clients/${extra}`,
      checkout: `/checkout/${extra}`,
    };
    navigate(routes[target] || '/');
  };

  const plans = getPlans();
  const planActual = plans[user?.plan] || plans.gratis;

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

  const handleCambiarPassword = async (e) => {
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
    setPassMsg('Actualizando...');
    try {
      await authApi.changePassword({ actual, nueva });
      setPasswordForm({ actual: '', nueva: '', confirmar: '' });
      setPassMsg('Contraseña actualizada.');
    } catch (err) {
      setPassMsg(err.message === 'password_incorrecto' ? 'La contraseña actual es incorrecta.' : 'No se pudo actualizar la contraseña.');
    }
    setTimeout(() => setPassMsg(''), 3000);
  };

  const handleEliminar = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    eliminarCuenta(logout, onNavigate);
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
            onClick={() => exportarDatos(user, planActual)}
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
