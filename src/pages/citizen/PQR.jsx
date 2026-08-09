import { useState } from 'react';
import Header from '../../components/Header.jsx';

const TIPOS_PQR = [
  { value: '', label: 'Seleccioná el tipo...' },
  { value: 'Petición', label: 'Petición' },
  { value: 'Queja', label: 'Queja' },
  { value: 'Reclamo', label: 'Reclamo' },
];

const STORAGE_KEY = 'veeduria_pqr';

export default function PQR({ onNavigate }) {
  const [form, setForm] = useState({
    tipo: '',
    asunto: '',
    descripcion: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!form.tipo || !form.asunto.trim() || !form.descripcion.trim()) {
      setStatus('error');
      setMsg('Todos los campos son obligatorios.');
      return;
    }

    if (form.asunto.trim().length < 5) {
      setStatus('error');
      setMsg('El asunto debe tener al menos 5 caracteres.');
      return;
    }

    if (form.descripcion.trim().length < 20) {
      setStatus('error');
      setMsg('La descripción debe tener al menos 20 caracteres.');
      return;
    }

    // Simular carga
    setStatus('loading');
    setMsg('');

    setTimeout(() => {
      try {
        const nuevaPQR = {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
          tipo: form.tipo,
          asunto: form.asunto.trim(),
          descripcion: form.descripcion.trim(),
          fecha: new Date().toISOString(),
          estado: 'Radicada',
        };

        // Guardar en localStorage
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        existing.unshift(nuevaPQR);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

        // Éxito
        setStatus('success');
        setMsg(`¡${form.tipo} radicada con éxito! Tu solicitud ha sido registrada con el ID: ${nuevaPQR.id.slice(0, 8)}`);
        setForm({ tipo: '', asunto: '', descripcion: '' });
      } catch (err) {
        setStatus('error');
        setMsg('Ocurrió un error al guardar tu solicitud. Intentalo de nuevo.');
      }
    }, 1000);
  };

  const handleCancel = () => {
    setForm({ tipo: '', asunto: '', descripcion: '' });
    setStatus('idle');
    setMsg('');
  };

  const isFormValid = form.tipo && form.asunto.trim().length >= 5 && form.descripcion.trim().length >= 20;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50 dark:from-dark-bg dark:to-dark-surface">
      <Header showClose onClose={() => onNavigate && onNavigate('chat')} onNavigate={onNavigate} />

      <main className="flex-1 px-4 sm:px-6 py-8 max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">📝</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro dark:text-dark-text mb-2">
            Radicar PQR
          </h2>
          <p className="text-gray-500 dark:text-dark-text-secondary max-w-md mx-auto">
            Presentá tu Petición, Queja o Reclamo ante las entidades públicas. Todos los campos son obligatorios.
          </p>
        </div>

        {/* Mensajes de estado */}
        {msg && (
          <div
            className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
              status === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300'
            }`}
          >
            {status === 'success' ? (
              <span className="flex items-center gap-2">
                <span>✅</span> {msg}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>❌</span> {msg}
              </span>
            )}
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-dark-surface rounded-2xl shadow-md border border-gray-100 dark:border-dark-border p-6 md:p-8 space-y-5"
        >
          {/* Tipo */}
          <div>
            <label
              htmlFor="pqr-tipo"
              className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2"
            >
              Tipo de solicitud <span className="text-red-500">*</span>
            </label>
            <select
              id="pqr-tipo"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl text-sm bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-azul-medio transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {TIPOS_PQR.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Asunto */}
          <div>
            <label
              htmlFor="pqr-asunto"
              className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2"
            >
              Asunto <span className="text-red-500">*</span>
            </label>
            <input
              id="pqr-asunto"
              type="text"
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
              disabled={status === 'loading'}
              placeholder="Ej: Irregularidades en obra de la Calle 80"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl text-sm bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-azul-medio transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {form.asunto && form.asunto.trim().length < 5 && (
              <p className="text-xs text-red-500 mt-1">Mínimo 5 caracteres.</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="pqr-descripcion"
              className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2"
            >
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="pqr-descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              disabled={status === 'loading'}
              rows={6}
              placeholder="Describí los hechos con el mayor detalle posible: qué, dónde, cuándo, quiénes..."
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl text-sm bg-white dark:bg-dark-bg text-gray-800 dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-azul-medio transition-colors resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {form.descripcion && form.descripcion.trim().length < 20 && (
              <p className="text-xs text-red-500 mt-1">
                Mínimo 20 caracteres ({form.descripcion.trim().length}/20).
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              type="submit"
              disabled={!isFormValid || status === 'loading'}
              className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                isFormValid && status !== 'loading'
                  ? 'bg-dorado hover:bg-dorado-hover text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar'
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={status === 'loading'}
              className="px-6 py-3 border border-gray-300 dark:border-dark-border text-gray-600 dark:text-dark-text-secondary font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Info adicional */}
        <div className="mt-8 p-4 bg-azul-claro dark:bg-azul-oscuro/30 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <p className="text-xs text-azul-oscuro dark:text-blue-200 leading-relaxed">
            <strong>💡 ¿Sabías qué?</strong> Según la Ley 1755 de 2015, toda persona tiene derecho a presentar peticiones respetuosas a las autoridades por motivos de interés general o particular. Las entidades tienen <strong>15 días hábiles</strong> para responder peticiones generales y <strong>10 días</strong> para solicitudes de documentos.
          </p>
        </div>
      </main>
    </div>
  );
}
