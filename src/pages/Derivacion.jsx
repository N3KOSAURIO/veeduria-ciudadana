import { useState } from 'react';
import Header from '../components/Header.jsx';

export default function Derivacion({ onNavigate, onBack, flowId }) {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    ciudad: '',
    acepto: false,
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.acepto) return;
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-6xl mb-6">✅</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Recibido!</h2>
          <p className="text-gray-600 mb-2">(Modo demo — los datos no fueron enviados)</p>
          <p className="text-gray-500 mb-8">En la versión final, un consultor se contactará con vos.</p>
          <button
            onClick={() => onBack()}
            className="px-6 py-3 bg-azul-oscuro hover:bg-azul-medio text-white font-semibold rounded-xl transition-colors"
          >
            Volver al chat
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header showClose onClose={() => onBack()} />
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <span className="text-4xl block mb-3">📋</span>
            <h2 className="text-xl font-bold text-azul-oscuro mb-1">Consultoría Especializada</h2>
            <p className="text-sm text-gray-500">
              Un experto revisará tu caso. Dejanos tus datos y te contactamos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
                placeholder="tu@correo.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
                placeholder="3XX XXX XXXX"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                required
                placeholder="Bogotá, Medellín..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="acepto"
                checked={form.acepto}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-azul-oscuro rounded"
              />
              <span className="text-xs text-gray-500">
                Acepto ser contactado por un consultor de Veeduría Ciudadana para recibir orientación sobre mi caso.
              </span>
            </label>

            <button
              type="submit"
              disabled={!form.acepto}
              className="w-full py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              📨 SOLICITAR CONSULTORÍA
            </button>

            <p className="text-xs text-gray-400 text-center">
              Beta: este formulario es demostrativo. No se almacenan datos.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
