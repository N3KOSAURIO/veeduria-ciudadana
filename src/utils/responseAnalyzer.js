/**
 * Analizador de respuestas de entidades a derechos de petición.
 *
 * Cuando el ciudadano carga la respuesta de la entidad (texto, PDF, imagen),
 * el sistema analiza si la respuesta es:
 * - Completa (responde todo lo solicitado)
 * - Parcial (responde parte)
 * - Evasiva (no responde, deriva a otra entidad)
 * - Negativa (niega la petición)
 * - Silencio administrativo (no respondió en 15 días)
 *
 * Y sugiere los siguientes pasos legales.
 */

/**
 * Analiza la respuesta de una entidad frente al derecho de petición original.
 */
export function analizarRespuesta({ peticionOriginal, respuestaEntidad }) {
  const petText = (peticionOriginal || '').toLowerCase();
  const respText = (respuestaEntidad || '').toLowerCase();

  if (!respText) {
    return {
      tipo: 'sin_respuesta',
      titulo: 'Sin contenido para analizar',
      resumen: 'No se encontró texto en la respuesta cargada. Si escaneaste un documento, verificá que el texto sea legible.',
    };
  }

  // Extraer los puntos clave de la petición (líneas que empiezan con - o •)
  const puntosPeticion = petText
    .split('\n')
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
    .map(line => line.replace(/^[-•]\s*/, '').trim().toLowerCase())
    .filter(p => p.length > 10);

  // Buscar si la respuesta contiene cada punto
  const puntosRespondidos = [];
  const puntosPendientes = [];

  for (const punto of puntosPeticion) {
    const palabrasClave = punto.split(/\s+/).filter(w => w.length > 4);
    const matchCount = palabrasClave.filter(w => respText.includes(w)).length;
    const ratio = palabrasClave.length > 0 ? matchCount / palabrasClave.length : 0;

    if (ratio > 0.4) {
      puntosRespondidos.push(punto);
    } else {
      puntosPendientes.push(punto);
    }
  }

  // Detectar evasivas
  const evasivas = [
    'no es competencia',
    'no corresponde',
    'debe dirigirse',
    'remitimos',
    'trasladamos',
    'no somos',
    'debe solicitarlo',
    'no tenemos',
    'carecemos',
    'no contamos',
  ];
  const esEvasiva = evasivas.some(e => respText.includes(e));

  // Detectar negativa explícita
  const negativas = [
    'se niega',
    'no es procedente',
    'improcedente',
    'rechazada',
    'no se accede',
  ];
  const esNegativa = negativas.some(n => respText.includes(n));

  // Determinar tipo
  let tipo, titulo, resumen, siguientesPasos;

  if (esNegativa) {
    tipo = 'negativa';
    titulo = '❌ Respuesta NEGATIVA';
    resumen =
      'La entidad negó tu petición. Revisá los argumentos que dieron. Si considerás que la negativa es injustificada, tenés derecho a interponer recursos.';
    siguientesPasos = [
      '📌 **Recurso de reposición**: ante la misma entidad, en los 5 días hábiles siguientes a la notificación.',
      '📌 **Recurso de apelación**: ante el superior jerárquico (si aplica).',
      '📌 **Acción de tutela**: si se vulnera un derecho fundamental (Art. 86, Constitución).',
      '📌 **Queja ante Procuraduría**: si el funcionario omitió su deber de responder adecuadamente.',
    ];
  } else if (esEvasiva) {
    tipo = 'evasiva';
    titulo = '⚠️ Respuesta EVASIVA';
    resumen =
      'La entidad no respondió directamente tu petición. Posiblemente la derivó a otra entidad o alegó falta de competencia. Esto no es una respuesta de fondo.';
    siguientesPasos = [
      '📌 **Insistir**: responder al oficio exigiendo respuesta de fondo. La Ley 1755/2015 obliga a responder.',
      '📌 **Procuraduría**: si derivan sin justificación, es falta disciplinaria.',
      '📌 **Queja ante la Personería** de tu municipio por vulneración del derecho de petición.',
    ];
  } else if (puntosPendientes.length === 0 && puntosRespondidos.length > 0) {
    tipo = 'completa';
    titulo = '✅ Respuesta COMPLETA';
    resumen =
      'La entidad respondió todos los puntos de tu derecho de petición. La respuesta parece abordar cada una de tus solicitudes.';
    siguientesPasos = [
      '📌 **Revisá el contenido**: ¿la respuesta es satisfactoria? ¿entregaron lo que pediste?',
      '📌 **Si no es satisfactoria**: podés interponer recursos en 5 días hábiles.',
      '📌 **Si es satisfactoria**: guardá la respuesta como evidencia. ¡Tu derecho de petición fue resuelto!',
    ];
  } else if (puntosRespondidos.length > 0) {
    tipo = 'parcial';
    titulo = '⚠️ Respuesta PARCIAL';
    resumen =
      `La entidad respondió ${puntosRespondidos.length} de ${puntosPeticion.length} puntos de tu petición.\n\n` +
      `**Puntos respondidos:**\n${puntosRespondidos.map(p => `✅ ${p}`).join('\n')}\n\n` +
      `**Puntos pendientes:**\n${puntosPendientes.map(p => `❌ ${p}`).join('\n')}`;
    siguientesPasos = [
      '📌 **Exigir respuesta completa**: radicar nuevo oficio señalando los puntos no respondidos.',
      '📌 **Recordar plazo**: la entidad ya venció o está por vencer el término legal de 15 días hábiles.',
      '📌 **Procuraduría**: la respuesta parcial incompleta puede constituir falta disciplinaria.',
    ];
  } else {
    tipo = 'inconclusa';
    titulo = '🔍 Análisis INCONCLUSO';
    resumen =
      'No se pudo determinar claramente si la respuesta aborda los puntos de tu petición. El texto extraído puede no reflejar fielmente el contenido del documento original.';
    siguientesPasos = [
      '📌 **Leé la respuesta manualmente** y compará con tu petición original.',
      '📌 **Cargá un mejor archivo** si el texto se extrajo de forma incompleta (mejor PDF que imagen).',
      '📌 **Consultá con un abogado** si tenés dudas sobre la validez de la respuesta.',
    ];
  }

  return { tipo, titulo, resumen, siguientesPasos };
}

/**
 * Calcula el plazo legal y su estado.
 */
export function analizarPlazos(fechaRadicacion) {
  const rad = new Date(fechaRadicacion);
  const hoy = new Date();
  const diasCalendario = Math.floor((hoy - rad) / (1000 * 60 * 60 * 24));

  // Aproximación: 15 días hábiles ≈ 21 días calendario
  const diasHabilesEstimados = Math.floor(diasCalendario * 0.71);
  const plazoLegal = 15;
  const diasRestantes = plazoLegal - diasHabilesEstimados;

  if (diasRestantes < 0) {
    return {
      vencido: true,
      mensaje: `⚠️ Han pasado aproximadamente ${diasHabilesEstimados} días hábiles. El plazo legal de ${plazoLegal} días hábiles (Ley 1755/2015) ha VENCIDO. Se configura **silencio administrativo** si no hay respuesta.`,
      diasRestantes: 0,
    };
  }

  return {
    vencido: false,
    mensaje: `⏳ Días hábiles transcurridos: ~${diasHabilesEstimados}. Quedan aproximadamente ${diasRestantes} días hábiles del plazo legal.`,
    diasRestantes,
  };
}
