import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import { initGoogleSignIn } from '../../utils/googleAuth.js';

export default function Login({ onNavigate }) {
  const { login, googleLogin } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    initGoogleSignIn('google-signin-btn', (googleUser) => {
      setLoading(true);
      setTimeout(() => {
        googleLogin(googleUser);
      }, 400);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    // Simular delay de red
    setTimeout(() => {
      const result = login(email.trim().toLowerCase(), password);
      if (!result.success) {
        setError(result.error);
        setLoading(false);
      }
      // Si es success, el contexto actualiza user y App redirige solo
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header onNavigate={onNavigate} />
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <span className="text-4xl block mb-3">🏛️</span>
              <h2 className="text-2xl font-extrabold text-azul-oscuro mb-1">
                Bienvenido de nuevo
              </h2>
              <p className="text-sm text-gray-500">
                Ingresá a tu cuenta de Veeduría Ciudadana
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio focus:border-transparent"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-azul-oscuro hover:bg-azul-medio text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-md text-sm"
              >
                {loading ? 'Ingresando...' : 'INGRESAR'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div id="google-signin-btn" className="flex justify-center min-h-[48px]"></div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                ¿No tenés cuenta?{' '}
                <button
                  onClick={() => onNavigate('registro')}
                  className="text-azul-medio hover:text-azul-oscuro font-semibold underline"
                >
                  Registrate gratis
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Demo Beta · Los datos se guardan solo en tu navegador
          </p>
        </div>
      </main>
    </div>
  );
}
