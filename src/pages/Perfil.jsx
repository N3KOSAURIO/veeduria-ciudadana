import { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import PLANES from '../data/plans.js';
import Header from '../components/Header.jsx';

export default function Perfil({ onNavigate }) {
  const { user, updateUser, logout } = useUser();
  const planActual = PLANES[user?.plan] || PLANES.gratis;

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
    ciudad: user?.ciudad || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    actual: '',
    nueva: '',
    confirmar: '',
  });
  const [msg, setMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');

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

    // Verificar password actual simulada
    const users = JSON.parse(localStorage.getItem('veeduria_users') || '[]');
    const found = users.find(u => u.email === user.email);
    if (found && found.password !== actual) {
      setPassMsg('Contraseña actual incorrecta.');
      return;
    }

    // Actualizar en users array
    if (found) {
      found.password = nueva;
      localStorage.setItem('veeduria_users', JSON.stringify(users));
    }

    setPasswordForm({ actual: '', nueva: '', confirmar: '' });
    setPassMsg('Contraseña actualizada.');
    setTimeout(() => setPassMsg(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate('dashboard')} />
      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-extrabold text-azul-oscuro mb-8">Mi Perfil</h2>

        {/* Plan actual */}
        <div className={`rounded-xl p-4 border mb-8 ${planActual.colorClase}`}>
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

        {/* Datos personales */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
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
            <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              {msg}
            </div>
          )}

          {editando ? (
            <form onSubmit={handleGuardarPerfil} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
                <input
                  type="text" value={form.nombre} onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
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
                    type="text" value={form.telefono} onChange={e => setForm(prev => ({ ...prev, telefono: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Ciudad</label>
                  <input
                    type="text" value={form.ciudad} onChange={e => setForm(prev => ({ ...prev, ciudad: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-semibold rounded-lg transition-colors"
                >
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
          ) : (
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
              <div className="flex justify-between py-1">
                <dt className="text-sm text-gray-500">Miembro desde</dt>
                <dd className="text-sm font-medium text-gray-800">
                  {user?.fechaRegistro
                    ? new Date(user.fechaRegistro).toLocaleDateString('es-CO')
                    : '—'}
                </dd>
              </div>
            </dl>
          )}
        </div>

        {/* Cambiar contraseña */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
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

        {/* Cerrar sesión */}
        <div className="text-center mb-8">
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
