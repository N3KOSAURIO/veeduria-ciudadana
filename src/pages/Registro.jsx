import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import Header from '../components/Header.jsx';
import { initGoogleSignIn } from '../utils/googleAuth.js';

export default function Registro({ onNavigate }) {
  const { register, googleLogin } = useUser();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    password: '',
    confirmar: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initGoogleSignIn('google-signin-registro', (googleUser) => {
      setLoading(true);
      setTimeout(() => {
        googleLogin(googleUser);
      }, 400);
    });
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { nombre, email, telefono, ciudad, password, confirmar } = form;
    if (!nombre.trim() || !email.trim() || !telefono.trim() || !ciudad.trim() || !password || !confirmar) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!form.aceptoTerminos) {
      setError('Debés aceptar los Términos y Condiciones para crear tu cuenta.');
      return;
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        telefono: telefono.trim(),
        ciudad: ciudad.trim(),
        password,
      });
      if (!result.success) {
        setError(result.error);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-6">
              <span className="text-3xl block mb-2">📝</span>
              <h2 className="text-2xl font-extrabold text-azul-oscuro mb-1">
                Creá tu cuenta gratis
              </h2>
              <p className="text-sm text-gray-500">
                Empezá a fiscalizar obras y contratos públicos
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input
                  type="text" name="nombre" value={form.nombre} onChange={handleChange}
                  placeholder="Tu nombre y apellido"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel" name="telefono" value={form.telefono} onChange={handleChange}
                    placeholder="3XX XXX XXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input
                    type="text" name="ciudad" value={form.ciudad} onChange={handleChange}
                    placeholder="Bogotá, Medellín..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password" name="password" value={form.password} onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                <input
                  type="password" name="confirmar" value={form.confirmar} onChange={handleChange}
                  placeholder="Repetí tu contraseña"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="aceptoTerminos"
                  checked={form.aceptoTerminos || false}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-azul-oscuro rounded"
                />
                <span className="text-xs text-gray-500">
                  Acepto los{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('terminos')}
                    className="text-azul-medio underline hover:text-azul-oscuro"
                  >
                    Términos y Condiciones
                  </button>{' '}
                  y la{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('privacidad')}
                    className="text-azul-medio underline hover:text-azul-oscuro"
                  >
                    Política de Privacidad
                  </button>{' '}
                  de Veeduría Ciudadana.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || !form.aceptoTerminos}
                className="w-full py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-md text-sm mt-2"
              >
                {loading ? 'Creando cuenta...' : 'CREAR CUENTA GRATIS'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-3">O registrate con</p>
              <div id="google-signin-registro" className="flex justify-center min-h-[48px]"></div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                ¿Ya tenés cuenta?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="text-azul-medio hover:text-azul-oscuro font-semibold underline"
                >
                  Iniciá sesión
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Demo Beta · Sin verificación de correo · Datos locales
          </p>
        </div>
      </main>
    </div>
  );
}
