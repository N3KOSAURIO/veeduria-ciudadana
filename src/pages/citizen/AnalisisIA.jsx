import { useState } from 'react';
import { chatbotApi } from '../../services/veeduria/chatbot.api.js';

/**
 * AnalisisIA — panel "Análisis IA" del chatbot de Veeduría (F3).
 * Abre sobre el chat y consume el backend POST /api/veeduria/chatbot (JWT).
 * Expone las 5 funciones IA (GUIDE/CLASSIFY/SUMMARIZE/STRUCTURE/ANALYZE).
 *
 * Regla IA = asistente · humano = supervisión · ciudadano = decisión:
 * - cada resultado muestra `metodo` (local_rule/llm) y `fuente`
 *   (base_juridica | interpretacion_local).
 * - disclaimer visible: la IA NO es autoridad jurídica/médica/financiera.
 */
const FUNCIONES = [
  { id: 'orientar',   emoji: '🧭', label: 'Orientar',      desc: 'Entidad, leyes y ruta de participación' },
  { id: 'clasificar', emoji: '🏷️', label: 'Clasificar',    desc: 'Tema, territorio, tipo y población' },
  { id: 'resumir',    emoji: '📝', label: 'Resumir',       desc: 'Ideas clave de un texto o documento' },
  { id: 'estructurar',emoji: '📐', label: 'Estructurar',   desc: 'Convierte "tengo una idea..." en ficha' },
  { id: 'analizar',   emoji: '📊', label: 'Analizar',      desc: 'Tendencias en varios textos' },
];

const DISCLAIMER = 'IA = asistente · humano = supervisión · ciudadano = decisión. ' +
  'La información es orientativa y NO constituye asesoría jurídica, médica, financiera ni administrativa.';

export default function AnalisisIA({ onClose }) {
  const [funcion, setFuncion] = useState('orientar');
  const [input, setInput] = useState('');
  const [textos, setTextos] = useState(''); // para ANALYZE (una por línea)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const ejecutar = async () => {
    setError('');
    setResult(null);
    if (!input.trim() && !textos.trim()) {
      setError('Escribe un texto para analizar.');
      return;
    }
    setLoading(true);
    try {
      const item = FUNCIONES.find((f) => f.id === funcion);
      let data;
      if (item.id === 'analizar') {
        // ANALYZE toma varios textos (uno por línea)
        const lista = textos.split('\n').map((s) => s.trim()).filter(Boolean);
        data = await chatbotApi.analizar(lista);
      } else if (item.id === 'estructurar') {
        data = await chatbotApi.estructurar(input);
      } else if (item.id === 'orientar') {
        data = await chatbotApi.orientar(input);
      } else if (item.id === 'clasificar') {
        data = await chatbotApi.clasificar(input);
      } else {
        data = await chatbotApi.resumir(input);
      }
      // El backend devuelve { [funcion]: resultado, metodo, fuente, disclaimer }
      // Normalizamos manteniéndolo tal cual.
      setResult(data);
    } catch (e) {
      setError(e.message || 'No se pudo conectar con el asistente IA.');
    } finally {
      setLoading(false);
    }
  };

  const renderBloque = (data) => {
    if (!data) return null;
    // Mapa id-frontend → clave JSON del backend:
    // orientar→guide, clasificar→classify, resumir→summarize,
    // estructurar→structure, analizar→analyze
    const CLAVE = { orientar: 'guide', clasificar: 'classify', resumir: 'summarize', estructurar: 'structure', analizar: 'analyze' };
    const key = CLAVE[funcion] || funcion;
    const bloque = data[key];
    if (!bloque) return null;

    return (
      <div className="space-y-3">
        {/* GUIDE */}
        {(key === 'guide') && (
          <div className="space-y-3">
            <InfoRow k="Tema" v={bloque.tema} />
            <InfoRow k="Entidad competente" v={bloque.entidad} />
            {Array.isArray(bloque.ruta) && bloque.ruta.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Ruta sugerida</div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  {bloque.ruta.map((r, i) => <li key={i}>{r}</li>)}
                </ol>
              </div>
            )}
            {Array.isArray(bloque.leyes) && bloque.leyes.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Normas relevantes</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {bloque.leyes.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            )}
            {bloque.fuente_oficial && <InfoRow k="Fuente oficial" v={bloque.fuente_oficial} />}
            {bloque.interpretacion && (
              <p className="text-sm italic text-gray-500 border-l-2 border-dorado pl-3 mt-2">
                {bloque.interpretacion}
              </p>
            )}
          </div>
        )}

        {/* CLASSIFY */}
        {(key === 'classify') && (
          <div className="grid grid-cols-2 gap-2">
            <InfoRow k="Tema" v={bloque.tema} />
            <InfoRow k="Territorio" v={bloque.territorio} />
            <InfoRow k="Tipo solicitud" v={bloque.tipo_solicitud} />
            <InfoRow k="Población" v={bloque.poblacion} />
            {bloque.flujo_nombre && (
              <div className="col-span-2"><InfoRow k="Flujo" v={`${bloque.flujo_id} · ${bloque.flujo_nombre}`} /></div>
            )}
          </div>
        )}

        {/* SUMMARIZE */}
        {(key === 'summarize') && (
          <div className="space-y-3">
            {bloque.resumen_breve && (
              <p className="text-sm text-gray-800 bg-gray-50 dark:bg-dark-bg rounded-lg p-3">
                <span className="font-bold">Resumen:</span> {bloque.resumen_breve}
              </p>
            )}
            {Array.isArray(bloque.ideas_clave) && bloque.ideas_clave.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Ideas clave</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {bloque.ideas_clave.map((i, k) => <li key={k}>{i}</li>)}
                </ul>
              </div>
            )}
            {Array.isArray(bloque.temas_detectados) && bloque.temas_detectados.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {bloque.temas_detectados.map((t, k) => (
                  <span key={k} className="px-2 py-1 bg-azul-claro dark:bg-azul-oscuro/50 text-azul-medio rounded-full text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STRUCTURE */}
        {(key === 'structure') && (
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-azul-oscuro dark:text-white">{bloque.titulo}</h4>
            <InfoRow k="Problemática" v={bloque.problematica} />
            <InfoRow k="Finalidad" v={bloque.finalidad} />
            <InfoRow k="Beneficiarios" v={bloque.beneficiarios} />
            <InfoRow k="Territorio" v={bloque.territorio} />
            {Array.isArray(bloque.actores) && bloque.actores.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Actores</div>
                <div className="flex flex-wrap gap-2">
                  {bloque.actores.map((a, k) => (
                    <span key={k} className="px-2 py-1 bg-gray-100 dark:bg-dark-bg rounded-lg text-xs text-gray-700 dark:text-gray-300">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {Array.isArray(bloque.proximos_pasos) && bloque.proximos_pasos.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Próximos pasos</div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  {bloque.proximos_pasos.map((p, k) => <li key={k}>{p}</li>)}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* ANALYZE */}
        {(key === 'analyze') && (
          <div className="space-y-3">
            {Array.isArray(bloque.temas_recurrentes) && bloque.temas_recurrentes.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Temas recurrentes</div>
                <div className="flex flex-wrap gap-2">
                  {bloque.temas_recurrentes.map((t, k) => (
                    <span key={k} className="px-2 py-1 bg-azul-claro dark:bg-azul-oscuro/50 text-azul-medio rounded-full text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {Array.isArray(bloque.preguntas_frecuentes) && bloque.preguntas_frecuentes.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Preguntas frecuentes</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {bloque.preguntas_frecuentes.map((p, k) => <li key={k}>{p}</li>)}
                </ul>
              </div>
            )}
            {Array.isArray(bloque.necesidades_capacitacion) && bloque.necesidades_capacitacion.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Necesidades de capacitación</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {bloque.necesidades_capacitacion.map((n, k) => <li key={k}>{n}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Fuente / método → transparencia */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-dark-border text-xs">
          <SourceTag fuente={data.fuente} />
          <span className="text-gray-400 capitalize">{data.metodo || 'local_rule'}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-azul-oscuro text-white">
          <div>
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              🤖 Análisis IA <span className="text-xs font-normal bg-white/20 rounded-full px-2 py-0.5">Veeduría</span>
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">Orientar · Clasificar · Resumir · Estructurar · Analizar</p>
          </div>
          <button onClick={onClose} className="text-2xl leading-none hover:opacity-70" aria-label="Cerrar">✕</button>
        </div>

        {/* Selector de función */}
        <div className="px-5 pt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {FUNCIONES.map((f) => (
            <button
              key={f.id}
              onClick={() => { setFuncion(f.id); setResult(null); setError(''); }}
              className={`px-2 py-2 rounded-xl text-center transition-all ${
                funcion === f.id
                  ? 'bg-azul-oscuro text-white shadow'
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
              title={f.desc}
            >
              <span className="block text-xl">{f.emoji}</span>
              <span className="text-xs font-semibold">{f.label}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-4">
          {funcion === 'analizar' ? (
            <textarea
              rows="3"
              value={textos}
              onChange={(e) => setTextos(e.target.value)}
              placeholder="Escribe varios textos, uno por línea, para analizar tendencias…"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl text-sm text-gray-900 dark:text-dark-text bg-white dark:bg-dark-bg resize-y focus:outline-none focus:ring-2 focus:ring-azul-medio"
            />
          ) : (
            <textarea
              rows="3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                funcion === 'estructurar'
                  ? 'Escribe tu idea, p. ej.: "vamos a crear una veeduría para vigilar las obras del municipio"…'
                  : funcion === 'orientar'
                    ? 'Describe tu caso para orientarte hacia la entidad y ruta adecuada…'
                    : 'Escribe el texto o consulta a analizar…'
              }
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl text-sm text-gray-900 dark:text-dark-text bg-white dark:bg-dark-bg resize-y focus:outline-none focus:ring-2 focus:ring-azul-medio"
            />
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex-1 text-xs text-gray-400 dark:text-dark-text-secondary">
              {funcion === 'analizar'
                ? 'Útil para detectar tendencias en reportes o denuncias.'
                : 'Análisis con IA orientativa; verifica la fuente oficial.'}
            </div>
            <button
              onClick={ejecutar}
              disabled={loading || (!input.trim() && !textos.trim())}
              className="px-5 py-2.5 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analizando…' : 'Analizar ➤'}
            </button>
          </div>
        </div>

        {/* Resultado */}
        <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ minHeight: '120px' }}>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg px-3 py-2">
              ⚠️ {error}
            </p>
          )}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-dorado rounded-full animate-pulse"></span>
              Procesando con el motor local de Veeduría…
            </div>
          )}
          {!loading && result && renderBloque(result)}
          {!loading && !result && !error && (
            <p className="text-sm text-gray-400 dark:text-dark-text-secondary mt-2">
              Elige una función y escribe tu consulta para obtener un análisis orientativo.
            </p>
          )}
        </div>

        {/* Pie / disclaimer */}
        <div className="px-5 py-3 bg-gray-50 dark:bg-dark-bg text-[11px] text-gray-500 dark:text-dark-text-secondary">
          ⚖️ {DISCLAIMER}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ k, v }) {
  if (v === undefined || v === null || v === '') return null;
  return (
    <div className="mb-1">
      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{k}: </span>
      <span className="text-sm text-gray-800 dark:text-gray-200">{v}</span>
    </div>
  );
}

function SourceTag({ fuente }) {
  const esDato = fuente === 'base_juridica';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
      esDato
        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
    }`}>
      {esDato ? '✓ dato · base jurídica' : '◇ interpretación'}
    </span>
  );
}
