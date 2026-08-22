/**
 * chatbot.api — cliente HTTP del chatbot IA de Veeduría (F3).
 * Consume el endpoint del backend Go: POST /api/veeduria/chatbot (JWT).
 *
 * El backend expone las 5 funciones IA (CLASSIFY/SUMMARIZE/GUIDE/STRUCTURE/
 * ANALYZE) + PQRSF, con motor local (sin LLM aún, provider plugin-ready).
 * Cada respuesta incluye `metodo` (local_rule/llm) y `fuente`
 * (base_juridica | interpretacion_local) → transparencia IA=asistente.
 *
 * Arquitectura (norte App-Comunitaria): auth central vía cookie httpOnly
 * (credentials: 'include'); el navegador adjunta access_token automáticamente.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8090';

async function request(modo, texto, textos = []) {
  const res = await fetch(`${API_BASE}/api/veeduria/chatbot`, {
    method: 'POST',
    credentials: 'include', // cookie access_token httpOnly (C2/C3)
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ modo, texto, textos }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.error || `Error ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

/** Wrappers por función IA (5) + PQRSF/control social vía guide. */
export const chatbotApi = {
  // GUIDE: orienta hacia entidad/ley/ruta/fuente (también cubre PQRSF/control social)
  orientar: (texto) => request('guide', texto),

  // CLASSIFY: clasifica tema/territorio/tipo/población
  clasificar: (texto) => request('classify', texto),

  // SUMMARIZE: resume documentos / textos
  resumir: (texto) => request('summarize', texto),

  // STRUCTURE: convierte "tengo una idea..." en ficha de proyecto
  estructurar: (idea) => request('structure', idea),

  // ANALYZE: tendencias/temas recurrentes en múltiples textos
  analizar: (textos) => request('analyze', '', textos),
};
