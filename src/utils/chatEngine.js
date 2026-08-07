import FLUJOS from '../data/flujos.js';

/**
 * Normaliza texto: minúsculas, quita tildes y signos de puntuación.
 */
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .replace(/[¿?¡!.,;:()\[\]{}"']/g, ' ') // signos → espacio
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokeniza el texto normalizado en palabras individuales
 * y también en bigramas (pares de palabras consecutivas)
 * para capturar frases como "no tiene aviso".
 */
function tokenizar(texto) {
  const palabras = texto.split(/\s+/).filter(t => t.length > 0);
  const tokens = [...palabras];

  // Agregar bigramas para capturar frases de 2 palabras
  for (let i = 0; i < palabras.length - 1; i++) {
    tokens.push(palabras[i] + ' ' + palabras[i + 1]);
  }

  // Agregar trigramas para frases de 3 palabras
  for (let i = 0; i < palabras.length - 2; i++) {
    tokens.push(palabras[i] + ' ' + palabras[i + 1] + ' ' + palabras[i + 2]);
  }

  return tokens;
}

/**
 * Procesa una consulta del usuario y devuelve el flujo más relevante.
 * @param {string} input - Texto ingresado por el usuario
 * @returns {{ id: string, respuesta: string, derivacion: string|null }}
 */
export function processQuery(input) {
  const normalizado = normalizar(input);
  const tokens = tokenizar(normalizado);

  let bestMatch = null;
  let bestScore = 0;

  for (const [id, flujo] of Object.entries(FLUJOS)) {
    if (id === '00') continue; // skip fallback

    const triggersNormalizados = flujo.triggers.map(t => normalizar(t));
    let score = 0;

    for (const token of tokens) {
      for (const trigger of triggersNormalizados) {
        // Match exacto de token
        if (token === trigger) {
          score += 3;
        }
        // Match como substring
        else if (token.includes(trigger) && trigger.length >= 4) {
          score += 2;
        }
        // Match parcial (el trigger contiene el token)
        else if (trigger.includes(token) && token.length >= 4) {
          score += 2;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = { id, ...flujo };
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch;
  }

  // Fallback
  return { id: '00', ...FLUJOS['00'] };
}

export { FLUJOS };
