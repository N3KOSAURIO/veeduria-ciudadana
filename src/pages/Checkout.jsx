import { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import PLANES from '../data/plans.js';
import Header from '../components/Header.jsx';

const METODOS = [
  { id: 'tarjeta', nombre: 'Tarjeta débito/crédito', icono: '💳' },
  { id: 'efectivo', nombre: 'Efectivo (Efecty, Baloto)', icono: '💵' },
  { id: 'transferencia', nombre: 'Transferencia bancaria', icono: '🏦' },
];

export default function Checkout({ onNavigate, planId }) {
  const { updatePlan } = useUser();
  const plan = PLANES[planId] || PLANES.pro;

  const [metodo, setMetodo] = useState('tarjeta');
  const [paso, setPaso] = useState('pago'); // 'pago' | 'exito'
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    nombre: '',
    expiracion: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTarjetaChange = (e) => {
    let { name, value } = e.target;
    if (name === 'numero') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }
    if (name === 'expiracion') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    setTarjeta(prev => ({ ...prev, [name]: value }));
  };

  const handlePagar = (e) => {
    e.preventDefault();
    setError('');

    if (metodo === 'tarjeta') {
      if (!tarjeta.numero || tarjeta.numero.replace(/\s/g, '').length < 16) {
        setError('Número de tarjeta inválido.');
        return;
      }
      if (!tarjeta.nombre.trim()) {
        setError('Ingresá el nombre en la tarjeta.');
        return;
      }
      if (!tarjeta.expiracion || tarjeta.expiracion.length < 5) {
        setError('Fecha de expiración inválida.');
        return;
      }
      if (!tarjeta.cvv || tarjeta.cvv.length < 3) {
        setError('CVV inválido.');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      updatePlan(planId);
      setPaso('exito');
      setLoading(false);
    }, 1500);
  };

  if (paso === 'exito') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-6xl mb-6">🎉</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Pago exitoso!</h2>
          <p className="text-gray-600 mb-1">
            Tu plan <strong className="text-azul-oscuro">{plan.nombre}</strong> está activo.
          </p>
          <p className="text-sm text-gray-400 mb-2">(Modo demo — no se realizó ningún cobro real)</p>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-dorado/30 mb-8 inline-block">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-dorado">
                ${plan.precio.toLocaleString('es-CO')}
              </span>
              {plan.precio > 0 && <span className="text-gray-400"> {plan.periodo}</span>}
            </p>
            <p className="text-xs text-gray-400 mt-1">Factura #DEMO-{Date.now().toString(36).toUpperCase()}</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-3 bg-azul-oscuro hover:bg-azul-medio text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Ir al panel
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onNavigate('planes')} />
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-azul-oscuro mb-1">
              Finalizar compra
            </h2>
            <p className="text-gray-500 text-sm">
              Plan <strong>{plan.nombre}</strong> ·{' '}
              {plan.precio === 0 ? 'Gratis' : `$${plan.precio.toLocaleString('es-CO')} ${plan.periodo}`}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            {/* Método de pago */}
            <h3 className="font-bold text-gray-700 mb-3">Método de pago</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {METODOS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetodo(m.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs transition-all ${
                    metodo === m.id
                      ? 'border-azul-medio bg-azul-claro'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{m.icono}</span>
                  {m.nombre}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Formulario tarjeta */}
            {metodo === 'tarjeta' && (
              <form onSubmit={handlePagar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
                  <input
                    type="text" name="numero" value={tarjeta.numero}
                    onChange={handleTarjetaChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre en la tarjeta</label>
                  <input
                    type="text" name="nombre" value={tarjeta.nombre}
                    onChange={handleTarjetaChange}
                    placeholder="JUAN PÉREZ"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento</label>
                    <input
                      type="text" name="expiracion" value={tarjeta.expiracion}
                      onChange={handleTarjetaChange}
                      placeholder="MM/AA"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text" name="cvv" value={tarjeta.cvv}
                      onChange={handleTarjetaChange}
                      placeholder="123"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-md text-sm"
                >
                  {loading ? 'Procesando...' : `Pagar $${plan.precio.toLocaleString('es-CO')}`}
                </button>
              </form>
            )}

            {/* Efectivo */}
            {metodo === 'efectivo' && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-gray-700">
                  <p className="font-semibold mb-2">💵 Pago en efectivo</p>
                  <p>1. Realizá el pago en cualquier punto Efecty o Baloto.</p>
                  <p>2. Usá el código de referencia que aparece abajo.</p>
                  <p>3. Tu plan se activa en minutos tras confirmar el pago.</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Código de referencia</p>
                  <p className="text-2xl font-mono font-bold text-azul-oscuro">
                    VEED-{Date.now().toString(36).toUpperCase().slice(-8)}
                  </p>
                </div>
                <button
                  onClick={handlePagar}
                  disabled={loading}
                  className="w-full py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-md text-sm"
                >
                  {loading ? 'Procesando...' : 'Simular pago en efectivo'}
                </button>
              </div>
            )}

            {/* Transferencia */}
            {metodo === 'transferencia' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
                  <p className="font-semibold mb-2">🏦 Datos de transferencia</p>
                  <p><strong>Banco:</strong> Bancolombia</p>
                  <p><strong>Titular:</strong> Veeduría Ciudadana SAS</p>
                  <p><strong>NIT:</strong> 901.234.567-8</p>
                  <p><strong>Cuenta de ahorros:</strong> 123-456789-00</p>
                </div>
                <p className="text-xs text-gray-500">
                  Tu plan se activa cuando confirmemos la transferencia (1-2 días hábiles).
                </p>
                <button
                  onClick={handlePagar}
                  disabled={loading}
                  className="w-full py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-md text-sm"
                >
                  {loading ? 'Procesando...' : 'Simular transferencia'}
                </button>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Demo Beta · No se realiza ningún cobro real · Simulación
          </p>
        </div>
      </main>
    </div>
  );
}
