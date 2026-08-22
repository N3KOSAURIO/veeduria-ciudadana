import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import { processQuery } from '../../utils/chatEngine.js';
import { descargarInformeVeeduria } from '../../services/pdf.service.js';

/**
 * ReportarCaso — "Reporta un caso" (flujo guiado del boseto v0.1, Opción A2).
 * Módulo del servicio Veeduría. Wizard paso a paso:
 *   paso 1: tipo de situación (texto libre + tarjetas rápidas)
 *   paso 2: checklist de cruce normativo (basado en BD-Checklist-Obra-Publica)
 *   paso 3: resultado — alertas + respuesta normativa (flujos.js) + jurisprudencia
 *   paso 4: acción — descargar informe ejecutivo/detallado (PDF)
 *
 * Reusa el motor existente (processQuery + FLUJOS) → consistente con el chat.
 * No toca backend: el cruce normativo usa la base ya validada del frontend.
 */

// Checklist real de obra pública municipal (BD-Checklist-Obra-Publica-Municipal).
// id, texto, alerta si NO se cumple.
const CHECKLIST_OBRA = [
  { id: 1, verificar: '¿Hay un aviso visible con entidad, contratista, plazo y valor?', herramienta: 'Observación en sitio', alerta: 'Sin aviso → opacidad. La Ley 80/1993 exige transparencia.', fase: 'Ejecución' },
  { id: 2, verificar: '¿Hay interventor o supervisor designado?', herramienta: 'Contrato en SECOP', alerta: 'Sin interventoría → nadie controla la obra.', fase: 'Ejecución' },
  { id: 3, verificar: '¿La obra aparece en SECOP?', herramienta: 'https://www.contratos.gov.co', alerta: 'Obra no registrada en SECOP → posible irregularidad GRAVE.', fase: 'Ejecución' },
  { id: 4, verificar: '¿Los materiales coinciden con lo especificado en pliegos?', herramienta: 'Comparar pliegos vs obra', alerta: 'Material inferior → posible detrimento patrimonial.', fase: 'Ejecución' },
  { id: 5, verificar: '¿El avance físico corresponde al avance programado?', herramienta: 'Informes de supervisión en SECOP', alerta: 'Retraso injustificado → posible incumplimiento.', fase: 'Ejecución' },
  { id: 6, verificar: '¿Los pagos corresponden al avance real documentado?', herramienta: 'Informes financieros SECOP', alerta: 'Pago anticipado sin avance → riesgo fiscal.', fase: 'Ejecución' },
  { id: 7, verificar: '¿Las pólizas están vigentes?', herramienta: 'SECOP', alerta: 'Pólizas vencidas → sin garantías.', fase: 'Ejecución' },
];

const TIPOS_RAPIDOS = [
  { label: '🏗️ Obra en la calle', texto: 'Están construyendo en la calle, abrieron un hueco' },
  { label: '🚧 Obra sin aviso', texto: 'Hay una obra y no tiene aviso visible con quién la hace' },
  { label: '🔌 Servicio público', texto: 'Problema con un servicio público (luz, agua, gas, alcantarillado)' },
  { label: '🌳 Ambiente', texto: 'Veo un daño ambiental o una obra que afecta el ambiente' },
  { label: '📄 Contrato / gasto', texto: 'Sospecho de un contrato o gasto público irregular' },
];

const EstadoCheck = {
  OK: { label: '✅ Sí', valor: 'cumple' },
  NO: { label: '❌ No', valor: 'no_cumple' },
  INFO: { label: '❓ No sé / no verificable', valor: 'no_info' },
};

function normalizaEstado(v) {
  if (v === 'no') return EstadoCheck.NO;
  if (v === 'si') return EstadoCheck.OK;
  return EstadoCheck.INFO;
}

export default function ReportarCaso({ onBack }) {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [paso, setPaso] = useState(1);
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [detalles, setDetalles] = useState({}); // {checkId: 'si'|'no'|'ns'}
  const [generando, setGenerando] = useState(false);

  // Cruce normativo: matchea la descripción del caso con el motor de flujos.
  const cruz = useMemo(() => {
    const texto = descripcion || tipo;
    if (!texto.trim()) return null;
    const match = processQuery(texto);
    return match && match.id !== '00' ? match : null;
  }, [descripcion, tipo]);

  // Alertas según el checklist: los ítems marcados "no" (o "no sé" si es grave)
  // se convierten en hallazgos.
  const alertas = useMemo(() => {
    return CHECKLIST_OBRA
      .map((item) => ({ item, estado: normalizaEstado(detalles[item.id]) }))
      .filter(({ estado }) => estado === EstadoCheck.NO || estado === EstadoCheck.INFO);
  }, [detalles]);

  const riesgosTop = useMemo(() => {
    // Prioridad: primero los "no", luego los "no sé". Máximo 5.
    return [...alertas]
      .sort((a, b) => {
        const prio = { 'no_cumple': 0, 'no_info': 1 };
        return prio[a.estado.valor] - prio[b.estado.valor];
      })
      .slice(0, 5);
  }, [alertas]);

  const handleTipoRapido = (t) => {
    setTipo(t.label);
    setDescripcion(t.texto);
  };

  const irPaso = (n) => {
    if (n === 2 && !descripcion.trim()) return;
    if (n === 3 && alertas.length === 0 && !cruz) return; // sin datos no hay cruce
    setPaso(n);
  };

  const toggleDetalle = (id, val) => {
    setDetalles((prev) => ({ ...prev, [id]: val }));
  };

  // Informe de veeduría (ejecutivo ≤2 páginas o detallado): hallazgos + normas + acción.
  function construirInforme() {
    // Extraer normas de la respuesta normativa del flujo: líneas que empiecen
    // por "•" o contengan "Ley"/"Constitución"/"Decreto"/"Artículo".
    const normas = (cruz ? (cruz.respuesta.match(/^[•-]\s*.*(?:\bLey\b|\bConstitución\b|\bDecreto\b|\bArtículo\b).*$/gm) || []) : [])
      .map((n) => n.replace(/^[•-]\s*/, '').trim())
      .slice(0, 5);

    return {
      tipo: tipo || 'Caso de control social',
      caso: descripcion,
      normas,
      jurisprudencia: cruz?.jurisprudencia ? [cruz.jurisprudencia] : [],
      hallazgos: riesgosTop.map(({ item, estado }) => ({
        check: item.verificar,
        estado: estado.label,
        alerta: item.alerta,
      })),
      usuario: isAuthenticated && user?.nombre ? user.nombre : 'Ciudadano',
    };
  }

  async function descargarInforme(ejecutivo) {
    setGenerando(true);
    try {
      const info = construirInforme();
      await descargarInformeVeeduria({
        tipo: ejecutivo ? 'executivo' : 'detallado',
        caso: info.caso,
        normas: info.normas,
        jurisprudencia: info.jurisprudencia,
        hallazgos: info.hallazgos,
        usuario: info.usuario,
      });
    } finally {
      setGenerando(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => (onBack ? onBack() : navigate('/inicio'))}
            className="text-sm text-azul-medio dark:text-blue-300 hover:underline mb-4 cursor-pointer"
          >
            ← Volver{onBack ? ' al servicio' : ' a Inicio'}
          </button>

          <h1 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro dark:text-white mb-1">
            Reporta un caso
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Describe una situación y te ayudamos a cruzar lo que ves con lo que exige la norma.
            {!isAuthenticated && (
              <span className="block mt-1 text-xs text-amber-600 dark:text-amber-400">
                Inicia sesión para guardar tu historial y descargar informes.
              </span>
            )}
          </p>

          {/* Stepper */}
          <div className="flex gap-2 mb-8 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {['Situación', 'Checklist', 'Resultado'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full ${paso === i + 1 ? 'bg-azul-oscuro text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                  {i + 1}. {s}
                </span>
                {i < 2 && <span className="text-gray-300 dark:text-gray-600">→</span>}
              </div>
            ))}
          </div>

          {/* PASO 1 — Situación */}
          {paso === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                  ¿Qué encontraste? Describí la situación con tus palabras
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={3}
                  placeholder="Ej: En la calle 45 están excavando un hueco, hay maquinaria pero no hay ningún aviso que diga quién construye..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-azul-medio placeholder-gray-400"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                  O elegí una situación rápida:
                </p>
                <div className="flex flex-wrap gap-2">
                  {TIPOS_RAPIDOS.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => handleTipoRapido(t)}
                      className={`px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                        tipo === t.label
                          ? 'border-azul-medio bg-azul-claro text-azul-oscuro dark:bg-blue-900 dark:text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-azul-medio'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {!isAuthenticated && (
                <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
                  <strong>¿Ya tenés cuenta?</strong>{' '}
                  <button onClick={() => navigate('/login')} className="underline cursor-pointer">
                    Iniciá sesión
                  </button>{' '}
                  o{' '}
                  <button onClick={() => navigate('/registro')} className="underline cursor-pointer">
                    registrate gratis
                  </button>{' '}
                  para guardar tu historial.
                </div>
              )}

              <button
                onClick={() => irPaso(2)}
                disabled={!descripcion.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-azul-oscuro text-white rounded-lg font-bold hover:bg-azul-medio disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 2 — Checklist de cruce */}
          {paso === 2 && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <h2 className="text-lg font-bold text-azul-oscuro dark:text-white mb-2">
                  Checklist de control social — Obra pública
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Basado en la Ley 80/1993, Ley 1150/2007 y la metodología CGR.
                  Marcá el estado de cada ítem. Lo que marques "No" o "No sé" se
                  convierte en hallazgo en tu informe.
                </p>

                <div className="space-y-3">
                  {CHECKLIST_OBRA.map((item) => (
                    <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        {item.id}. {item.verificar}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Verificalo con: {item.herramienta}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {(['si', 'no', 'ns']).map((v) => {
                          const opt = normalizaEstado(v);
                          const activo = detalles[item.id] === v;
                          return (
                            <button
                              key={v}
                              onClick={() => toggleDetalle(item.id, v)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                                activo
                                  ? 'border-azul-medio bg-azul-oscuro text-white'
                                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-azul-medio'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setPaso(1)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => irPaso(3)}
                  className="px-6 py-3 bg-azul-oscuro text-white rounded-lg font-bold hover:bg-azul-medio cursor-pointer flex-1 sm:flex-none"
                >
                  Ver resultado →
                </button>
              </div>
            </div>
          )}

          {/* PASO 3 — Resultado (cruce + alertas + acción) */}
          {paso === 3 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Normativa aplicable */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-bold text-azul-oscuro dark:text-white mb-2">
                    ⚖️ Normas aplicables
                  </h3>
                  {cruz ? (
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <p className="whitespace-pre-line">{cruz.respuesta.split('\n').slice(0, 8).join('\n')}</p>
                      {cruz.jurisprudencia && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">📚 {cruz.jurisprudencia}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No se pudo clasificar el caso automáticamente. Usa el{' '}
                      <button onClick={() => navigate('/chat')} className="underline cursor-pointer">
                        Chat de análisis
                      </button>{' '}
                      para orientarte.
                    </p>
                  )}
                </div>

                {/* Hallazgos / alertas */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-bold text-azul-oscuro dark:text-white mb-2">
                    🚨 Hallazgos detectados
                  </h3>
                  {riesgosTop.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No marcaste irregularidades. Revisá el checklist por si algo
                      se te pasó.
                    </p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {riesgosTop.map(({ item, estado }) => (
                        <li key={item.id} className="flex gap-2 items-start">
                          <span className={estado.valor === 'no_cumple' ? 'text-red-500' : 'text-amber-500'}>
                            {estado.valor === 'no_cumple' ? '🔴' : '🟡'}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            <strong>{item.verificar}</strong> — {estado.label}
                            <span className="block text-xs text-gray-500 dark:text-gray-400">{item.alerta}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Resumen del caso */}
              <div className="bg-azul-claro dark:bg-blue-900/30 border border-azul-medio/30 rounded-lg p-4">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  <strong>Caso:</strong> {tipo || 'Descrito libremente'}
                </p>
                {descripcion && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    <strong>Descripción:</strong> {descripcion}
                  </p>
                )}
              </div>

              {/* Acción — descargar informes */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <h3 className="font-bold text-azul-oscuro dark:text-white mb-2">
                  📄 Generá tu informe
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  El informe ejecutivo (≤2 páginas) resume el hallazgo y la acción
                  sugerida. El detallado amplía cada ítem con responsables y fuentes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => descargarInforme(true)}
                    disabled={generando}
                    className="px-5 py-2.5 bg-azul-oscuro text-white rounded-lg font-bold hover:bg-azul-medio disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                  >
                    {generando ? 'Generando...' : '⬇️ Descargar Informe Ejecutivo'}
                  </button>
                  <button
                    onClick={() => descargarInforme(false)}
                    disabled={generando}
                    className="px-5 py-2.5 border border-azul-oscuro text-azul-oscuro dark:border-blue-400 dark:text-blue-300 rounded-lg font-bold hover:bg-azul-claro dark:hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                  >
                    {generando ? 'Generando...' : '⬇️ Descargar Informe Detallado'}
                  </button>
                </div>
              </div>

              {isAuthenticated && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setPaso(1);
                      setDetalles({});
                      setDescripcion('');
                      setTipo('');
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    Nuevo caso
                  </button>
                  <button
                    onClick={() => navigate('/chat')}
                    className="px-6 py-3 bg-azul-medio text-white rounded-lg font-bold hover:bg-azul-oscuro cursor-pointer ml-auto"
                  >
                    🤖 Preguntar al asistente IA
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-gray-400 dark:text-gray-500">
        IA=asistente · el ciudadano decide. La información verde es del contraste normativo;
        la interpretación es orientativa, no constituye asesoría legal.
      </footer>
    </div>
  );
}
