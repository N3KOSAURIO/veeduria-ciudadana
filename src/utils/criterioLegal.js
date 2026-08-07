/**
 * criterioLegal.js — Módulo de razonamiento jurídico para el chatbot de Veeduría Ciudadana.
 *
 * Exporta funciones puras que reciben texto y devuelven objetos de diagnóstico.
 * Usa como base la BD de flujos.js y las entidades de entidades.js.
 *
 * Funciones exportadas:
 *   - testProcedenciaTutela(consulta)        → { procede, motivo, pasos[] }
 *   - testProcedenciaAccionPopular(consulta) → { procede, motivo, pasos[] }
 *   - rutaEntidadControl(tipoIrregularidad)  → { entidad, accion, descripcion }
 *   - jerarquiaNormativa                     → objeto con pesos de la pirámide normativa
 */

// ---------------------------------------------------------------------------
// Utilidades de normalización (mismo enfoque que chatEngine.js para coherencia)
// ---------------------------------------------------------------------------

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()[\]{}"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizar(texto) {
  const palabras = texto.split(/\s+/).filter(t => t.length > 0);
  const tokens = [...palabras];
  for (let i = 0; i < palabras.length - 1; i++) {
    tokens.push(palabras[i] + ' ' + palabras[i + 1]);
  }
  for (let i = 0; i < palabras.length - 2; i++) {
    tokens.push(palabras[i] + ' ' + palabras[i + 1] + ' ' + palabras[i + 2]);
  }
  return tokens;
}

/**
 * Puntúa una consulta contra un diccionario de categorías.
 * Cada categoría tiene `triggers` (palabras/frases) y un `peso`.
 * Retorna el total de puntos por categoría y los triggers que acertaron.
 */
function puntuarCategorias(consulta, categorias) {
  const normalizado = normalizar(consulta);
  const tokens = tokenizar(normalizado);

  const resultados = {};
  for (const [categoria, def] of Object.entries(categorias)) {
    let puntaje = 0;
    const aciertos = [];
    for (const token of tokens) {
      for (const trigger of def.triggers) {
        const tNorm = normalizar(trigger);
        if (token === tNorm) {
          puntaje += def.peso || 1;
          if (!aciertos.includes(tNorm)) aciertos.push(tNorm);
        } else if (token.includes(tNorm) && tNorm.length >= 4) {
          puntaje += Math.ceil((def.peso || 1) * 0.7);
          if (!aciertos.includes(tNorm)) aciertos.push(tNorm);
        } else if (tNorm.includes(token) && token.length >= 4) {
          puntaje += Math.ceil((def.peso || 1) * 0.7);
          if (!aciertos.includes(tNorm)) aciertos.push(tNorm);
        }
      }
    }
    resultados[categoria] = { puntaje, aciertos };
  }

  return resultados;
}

// ---------------------------------------------------------------------------
// 1. testProcedenciaTutela(consulta)
// ---------------------------------------------------------------------------

const CATEGORIAS_TUTELA = {
  salud: {
    triggers: [
      'salud', 'eps', 'hospital', 'medicamento', 'tratamiento', 'cirugia',
      'cirugía', 'enfermedad', 'paciente', 'consulta', 'cita', 'urgencia',
      'incapacidad', 'discapacidad', 'trasplante', 'oncologico', 'oncologico',
      'quimioterapia', 'dialisis', 'diálisis', 'insulina', 'cancer', 'cáncer',
      'vih', 'sida', 'embarazo', 'parto', 'neonato', 'uci', 'cuidados intensivos',
      'negacion servicio', 'niegan atencion', 'no me atienden'
    ],
    peso: 3
  },
  informacion: {
    triggers: [
      'negar informacion', 'niegan informacion', 'no responden', 'sin respuesta',
      'no contestan', 'silencio administrativo', 'no entregan', 'me niegan',
      'no quieren dar', 'ocultan', 'no publican', 'no aparece', 'derecho de peticion',
      'derecho de petición', 'pedi informacion', 'solicite informacion',
      'informacion publica', 'información pública', 'no me dieron', 'transparencia',
      'acceso a la informacion', 'datos abiertos'
    ],
    peso: 3
  },
  serviciosPublicos: {
    triggers: [
      'corte de servicio', 'no tengo agua', 'no tengo luz', 'no tengo gas',
      'suspendieron', 'corte de agua', 'corte de luz', 'sin agua', 'sin luz',
      'sin energia', 'sin energía', 'sin gas', 'servicio publico',
      'servicio público', 'desconectaron', 'factura', 'cobro excesivo',
      'tarifa', 'acueducto', 'alcantarillado'
    ],
    peso: 2
  },
  vulnerabilidad: {
    triggers: [
      'adulto mayor', 'anciano', 'tercera edad', 'menor de edad', 'niño', 'niña',
      'nino', 'nina', 'bebe', 'bebé', 'discapacitado', 'discapacidad',
      'desplazado', 'victima', 'víctima', 'vulnerable', 'cabeza de familia',
      'madre soltera', 'padre soltero', 'embarazada', 'lactante', 'indigena',
      'indígena', 'afrodescendiente', 'pobreza', 'indigente', 'habitante de calle',
      'reclusion', 'reclusión', 'carcel', 'cárcel', 'prisionero'
    ],
    peso: 2
  },
  derechosFundamentales: {
    triggers: [
      'derecho fundamental', 'vida', 'dignidad', 'debido proceso',
      'defensa', 'igualdad', 'libertad', 'intimidad', 'buen nombre',
      'peticion', 'petición', 'habeas corpus', 'habeas data',
      'libre desarrollo', 'personalidad', 'conciencia', 'religion',
      'religión', 'expresion', 'expresión', 'reunion', 'reunión',
      'trabajo', 'seguridad social', 'educacion', 'educación'
    ],
    peso: 2
  },
  perjuicioIrremediable: {
    triggers: [
      'urgente', 'emergencia', 'gravedad', 'grave', 'riesgo', 'peligro',
      'inminente', 'irreparable', 'irremediable', 'muerte', 'fallecio',
      'falleció', 'agonizando', 'critico', 'crítico', 'desahuciado',
      'terminal', 'perdida', 'pérdida', 'daño irreparable', 'dano irreparable'
    ],
    peso: 2
  }
};

/**
 * Evalúa si procede una acción de tutela según la consulta del ciudadano.
 *
 * La tutela (Art. 86 CP) protege derechos fundamentales cuando:
 *   - No existe otro mecanismo judicial idóneo (subsidiariedad) — o
 *   - Existe perjuicio irremediable (procede incluso con otro mecanismo)
 *
 * @param {string} consulta - Texto del ciudadano describiendo su situación
 * @returns {{ procede: boolean, motivo: string, pasos: string[] }}
 */
export function testProcedenciaTutela(consulta) {
  if (!consulta || consulta.trim().length === 0) {
    return {
      procede: false,
      motivo: 'No se proporcionó información suficiente para evaluar la procedencia de una tutela.',
      pasos: []
    };
  }

  const puntajes = puntuarCategorias(consulta, CATEGORIAS_TUTELA);
  const total = Object.values(puntajes).reduce((s, c) => s + c.puntaje, 0);

  // Determinar categorías activadas (con puntaje > 0)
  const activadas = Object.entries(puntajes)
    .filter(([, v]) => v.puntaje > 0)
    .sort(([, a], [, b]) => b.puntaje - a.puntaje);

  if (total === 0) {
    return {
      procede: false,
      motivo: 'No se detectan indicios de violación de derechos fundamentales que activen la acción de tutela. Considerá otras vías como derecho de petición, queja ante la Procuraduría o denuncia penal.',
      pasos: [
        'Verificá si tu caso encaja mejor en un derecho de petición (Ley 1712/2014)',
        'Consultá con la Personería municipal para orientación gratuita',
        'Si hay delito, acudí a la Fiscalía',
        'Si hay daño colectivo, evaluá la acción popular'
      ]
    };
  }

  // Construir motivo según categorías activadas
  const nombresCategoria = {
    salud: 'derecho fundamental a la salud',
    informacion: 'derecho fundamental de acceso a la información pública',
    serviciosPublicos: 'afectación de servicios públicos que compromete derechos fundamentales',
    vulnerabilidad: 'protección reforzada por condición de vulnerabilidad',
    derechosFundamentales: 'violación de derechos fundamentales constitucionales',
    perjuicioIrremediable: 'riesgo de perjuicio irremediable'
  };

  const motivos = activadas.map(([cat]) => nombresCategoria[cat] || cat);
  const motivo = `Procede tutela por: ${motivos.join('; ')}. ` +
    `(Puntaje total de coincidencia: ${total}). ` +
    `La acción de tutela está consagrada en el Art. 86 de la Constitución Política ` +
    `y reglamentada por el Decreto 2591 de 1991.`;

  const pasosBase = [
    '1. Redactá la tutela: describí los hechos, el derecho vulnerado, y la pretensión (lo que pedís al juez). No necesitás abogado.',
    '2. Aportá pruebas: documentos, fotos, historias clínicas, derechos de petición sin respuesta, testimonios.',
    '3. Presentala ante cualquier juez (municipal o de circuito) de tu domicilio. Es GRATIS.',
    '4. El juez tiene 10 días hábiles para resolver en primera instancia.',
    '5. Si el fallo es desfavorable, la impugnación se resuelve en 20 días hábiles por el superior jerárquico.',
    '6. Si el derecho es a la salud y hay riesgo inminente, solicitá MEDIDA PROVISIONAL urgente (Art. 7, Decreto 2591/91).'
  ];

  // Personalizar pasos según categorías
  let pasos = [...pasosBase];

  if (puntajes.salud.puntaje > 0) {
    pasos.unshift('⚕️ Salud: Adjuntá tu historia clínica, fórmula médica o negación de la EPS. Si es urgente, pedí medida provisional.');
  }
  if (puntajes.informacion.puntaje > 0) {
    pasos.unshift('📄 Información: Adjuntá copia del derecho de petición radicado y la constancia de que no respondieron en 10 días.');
  }
  if (puntajes.vulnerabilidad.puntaje > 0) {
    pasos.unshift('🛡️ Vulnerabilidad: Mencioná explícitamente tu condición (edad, discapacidad, desplazamiento) — la Corte Constitucional da protección reforzada.');
  }
  if (puntajes.serviciosPublicos.puntaje > 0) {
    pasos.unshift('💡 Servicios: Adjuntá la última factura, la PQR presentada a la empresa y la respuesta (o constancia de no respuesta).');
  }

  return {
    procede: true,
    motivo,
    pasos
  };
}

// ---------------------------------------------------------------------------
// 2. testProcedenciaAccionPopular(consulta)
// ---------------------------------------------------------------------------

const CATEGORIAS_ACCION_POPULAR = {
  medioAmbiente: {
    triggers: [
      'contaminacion', 'contaminación', 'rio', 'río', 'basura', 'desechos',
      'tala', 'arboles', 'árboles', 'deforestacion', 'deforestación',
      'mineria', 'minería', 'aire', 'humo', 'vertedero', 'escombro',
      'escombros', 'residuo', 'toxico', 'tóxico', 'quimico', 'químico',
      'derrame', 'licencia ambiental', 'animales', 'fauna', 'flora',
      'ecosistema', 'humedal', 'paramo', 'páramo', 'selva', 'bosque',
      'rio contaminado', 'río contaminado', 'quema', 'incendio forestal',
      'cambio climatico', 'cambio climático'
    ],
    peso: 3
  },
  espacioPublico: {
    triggers: [
      'espacio publico', 'espacio público', 'parque', 'plaza', 'anden',
      'andén', 'via publica', 'vía pública', 'zona verde', 'área comun',
      'area comun', 'invasion', 'invasión', 'ocupacion', 'ocupación',
      'cerramiento', 'rejas', 'apropiacion', 'apropiación', 'privatizacion',
      'privatización', 'calle cerrada', 'parqueadero ilegal'
    ],
    peso: 3
  },
  moralidadAdministrativa: {
    triggers: [
      'moralidad administrativa', 'corrupcion', 'corrupción',
      'desvio de recursos', 'desvío de recursos', 'contrato amañado',
      'licitacion amañada', 'licitación amañada', 'nepotismo',
      'trafico de influencias', 'tráfico de influencias', 'enriquecimiento ilicito',
      'enriquecimiento ilícito', 'sobrecosto', 'sobrecosto generalizado',
      'peculado'
    ],
    peso: 2
  },
  patrimonioCultural: {
    triggers: [
      'patrimonio cultural', 'monumento', 'herencia', 'historico',
      'histórico', 'arqueologico', 'arqueológico', 'bien cultural',
      'identidad cultural', 'lengua indigena', 'lengua indígena',
      'tradicion', 'tradición', 'ancestral', 'sagrado', 'patrimonio inmaterial'
    ],
    peso: 2
  },
  derechosColectivos: {
    triggers: [
      'derecho colectivo', 'comunidad', 'vecinos', 'barrio', 'poblacion',
      'población', 'grupo', 'todos', 'colectivo', 'afecta a muchos',
      'afecta a la comunidad', 'todo el barrio', 'todo el sector',
      'salubridad publica', 'salubridad pública', 'seguridad publica',
      'seguridad pública', 'consumidores', 'usuarios', 'competencia desleal',
      'servicios publicos', 'servicios públicos', 'plan de desarrollo',
      'plan de ordenamiento', 'pot', 'eot', 'pbot'
    ],
    peso: 2
  },
  obrasAfectanComunidad: {
    triggers: [
      'obra afecta', 'construccion afecta', 'construcción afecta',
      'edificio', 'torre', 'urbanizacion', 'urbanización', 'conjunto',
      'megaproyecto', 'hidroelectrica', 'hidroeléctrica', 'represa',
      'puerto', 'aeropuerto', 'carretera', 'autopista', 'viaducto',
      'tunel', 'túnel', 'mineria a gran escala', 'minería a gran escala',
      'expropiacion', 'expropiación', 'desalojo', 'reubicacion', 'reubicación'
    ],
    peso: 2
  }
};

/**
 * Evalúa si procede una acción popular según la consulta del ciudadano.
 *
 * La acción popular (Art. 88 CP, Ley 472/1998) protege derechos e intereses
 * colectivos relacionados con:
 *   - Medio ambiente sano
 *   - Moralidad administrativa
 *   - Espacio público
 *   - Patrimonio cultural
 *   - Seguridad y salubridad públicas
 *   - Derechos de consumidores y usuarios
 *
 * @param {string} consulta - Texto del ciudadano describiendo la situación
 * @returns {{ procede: boolean, motivo: string, pasos: string[] }}
 */
export function testProcedenciaAccionPopular(consulta) {
  if (!consulta || consulta.trim().length === 0) {
    return {
      procede: false,
      motivo: 'No se proporcionó información suficiente para evaluar la procedencia de una acción popular.',
      pasos: []
    };
  }

  const puntajes = puntuarCategorias(consulta, CATEGORIAS_ACCION_POPULAR);
  const total = Object.values(puntajes).reduce((s, c) => s + c.puntaje, 0);

  const activadas = Object.entries(puntajes)
    .filter(([, v]) => v.puntaje > 0)
    .sort(([, a], [, b]) => b.puntaje - a.puntaje);

  if (total === 0) {
    return {
      procede: false,
      motivo: 'No se detectan indicios de afectación a derechos o intereses colectivos que activen la acción popular. Considerá otras vías como tutela (derechos fundamentales individuales), queja administrativa ante la entidad competente, o denuncia penal.',
      pasos: [
        'Verificá si hay afectación a un derecho individual (podría aplicar tutela)',
        'Consultá con la Personería municipal o la Defensoría del Pueblo',
        'Si es daño ambiental, presentá queja ante la Corporación Autónoma Regional (CAR)',
        'Si hay delito, acudí a la Fiscalía'
      ]
    };
  }

  const nombresCategoria = {
    medioAmbiente: 'afectación al medio ambiente (Art. 79 y 80 CP)',
    espacioPublico: 'afectación al espacio público y uso del suelo',
    moralidadAdministrativa: 'vulneración de la moralidad administrativa',
    patrimonioCultural: 'amenaza al patrimonio cultural de la Nación',
    derechosColectivos: 'afectación a derechos e intereses colectivos',
    obrasAfectanComunidad: 'obra o proyecto que afecta derechos colectivos de la comunidad'
  };

  const motivos = activadas.map(([cat]) => nombresCategoria[cat] || cat);
  const motivo = `Procede acción popular por: ${motivos.join('; ')}. ` +
    `(Puntaje total de coincidencia: ${total}). ` +
    `La acción popular está consagrada en el Art. 88 de la Constitución Política ` +
    `y reglamentada por la Ley 472 de 1998. Cualquier persona natural o jurídica ` +
    `puede interponerla sin necesidad de abogado.`;

  const pasos = [
    '1. Identificá el derecho colectivo vulnerado (ambiente, espacio público, moralidad administrativa, etc.).',
    '2. Recolectá evidencias: fotos, videos, ubicación exacta, fechas, testimonios de vecinos afectados.',
    '3. Identificá al responsable: empresa, entidad pública, persona natural o jurídica.',
    '4. Presentá la acción popular ante un Juez Administrativo (Tribunal Administrativo o Juzgado Administrativo). Es GRATIS.',
    '5. El juez puede decretar MEDIDAS CAUTELARES urgentes para detener el daño mientras se resuelve el caso.',
    '6. La sentencia tiene efecto de COSA JUZGADA (aplica para todos los afectados, presentes y futuros).',
    '7. Si se causó daño, el juez ordena la reparación y puede fijar un incentivo económico para el demandante.'
  ];

  // Personalizar
  if (puntajes.medioAmbiente.puntaje > 0) {
    pasos.unshift('🌿 Ambiente: Documentá el daño con fotos y ubicación GPS. Consultá si el proyecto tiene licencia ambiental ante la CAR o ANLA.');
  }
  if (puntajes.espacioPublico.puntaje > 0) {
    pasos.unshift('🏗️ Espacio público: Verificá el Plan de Ordenamiento Territorial (POT) de tu municipio. Tomá fotos del cerramiento u ocupación.');
  }
  if (puntajes.moralidadAdministrativa.puntaje > 0) {
    pasos.unshift('⚖️ Moralidad administrativa: Reuní evidencia documental del contrato, sobrecosto o desviación. Buscá el contrato en SECOP.');
  }
  if (puntajes.patrimonioCultural.puntaje > 0) {
    pasos.unshift('🏛️ Patrimonio: Contactá al Ministerio de Cultura y al Instituto Colombiano de Antropología e Historia (ICANH).');
  }

  return {
    procede: true,
    motivo,
    pasos
  };
}

// ---------------------------------------------------------------------------
// 3. rutaEntidadControl(tipoIrregularidad)
// ---------------------------------------------------------------------------

const MAPA_ENTIDADES = {
  danoPatrimonial: {
    triggers: [
      'dano patrimonial', 'daño patrimonial', 'plata perdida', 'malgasto',
      'mal gasto', 'detrimento', 'detrimento patrimonial', 'sobrecosto',
      'sobrecosto', 'dinero publico', 'dinero público', 'recursos publicos',
      'recursos públicos', 'desfalco', 'desviacion', 'desviación',
      'fiscal', 'control fiscal', 'auditar', 'auditoria', 'auditoría',
      'perdida de recursos', 'pérdida de recursos', 'plata mal invertida',
      'robo de recursos', 'saqueo', 'contrato irregular', 'sobrefacturacion',
      'sobrefacturación', 'pago indebido', 'pago sin soporte'
    ],
    entidad: 'Contraloría General de la República',
    accion: 'Denuncia fiscal',
    descripcion: 'La Contraloría investiga el daño patrimonial al Estado y puede recuperar los recursos perdidos mediante procesos de responsabilidad fiscal.'
  },
  faltaDisciplinaria: {
    triggers: [
      'falta disciplinaria', 'funcionario incumple', 'omision', 'omisión',
      'negligencia', 'disciplinario', 'servidor publico', 'servidor público',
      'empleado publico', 'empleado público', 'incumplimiento', 'deberes',
      'funcion', 'función', 'destitucion', 'destitución', 'sancion',
      'sanción', 'disciplina', 'procuraduria', 'procuraduría', 'personeria',
      'personería', 'falta grave', 'falta gravísima', 'abuso de autoridad',
      'extralimitacion', 'extralimitación', 'abandono del cargo',
      'acoso laboral', 'irregularidad administrativa'
    ],
    entidad: 'Procuraduría General de la Nación / Personería Municipal',
    accion: 'Queja disciplinaria',
    descripcion: 'La Procuraduría y las Personerías investigan las faltas disciplinarias de servidores públicos. Pueden imponer sanciones que van desde multa hasta destitución e inhabilidad.'
  },
  delito: {
    triggers: [
      'delito', 'penal', 'crimen', 'peculado', 'prevaricato', 'cohecho',
      'soborno', 'concusion', 'concusión', 'trafico de influencias',
      'tráfico de influencias', 'enriquecimiento ilicito',
      'enriquecimiento ilícito', 'contrato sin cumplimiento',
      'interes indebido', 'interés indebido', 'celebracion indebida',
      'celebración indebida', 'falsedad', 'falsificacion', 'falsificación',
      'estafa', 'hurto', 'extorsion', 'extorsión', 'amenaza',
      'homicidio', 'lesiones', 'desaparicion', 'desaparición',
      'secuestro', 'tortura', 'desplazamiento forzado', 'violencia',
      'carcel', 'cárcel', 'prision', 'prisión', 'investigacion penal',
      'investigación penal', 'denuncia penal', 'fiscal', 'fiscalia',
      'fiscalía', 'crimen organizado', 'lavado de activos',
      'testaferrato', 'contrabando', 'evasion', 'evasión'
    ],
    entidad: 'Fiscalía General de la Nación',
    accion: 'Denuncia penal',
    descripcion: 'La Fiscalía investiga los delitos y, si encuentra mérito, lleva el caso ante un juez penal. Las penas pueden incluir prisión, multa e inhabilidad.'
  },
  negacionInformacion: {
    triggers: [
      'negar informacion', 'negar información', 'niegan informacion',
      'niegan información', 'no entregan', 'no dan informacion',
      'no dan información', 'silencio', 'sin respuesta', 'no responden',
      'no contestan', 'me niegan', 'no quieren dar', 'ocultan informacion',
      'ocultan información', 'no publican', 'datos ocultos', 'secreto',
      'informacion publica', 'información pública', 'acceso a la informacion',
      'acceso a la información', 'derecho de peticion sin responder',
      'derecho de petición sin responder', 'transparencia',
      'no aparece en secop', 'falta de publicidad', 'no esta publicado',
      'no está publicado'
    ],
    entidad: 'Juez Constitucional (Acción de Tutela)',
    accion: 'Tutela por violación del derecho de petición / acceso a información',
    descripcion: 'Cuando una entidad niega u omite entregar información pública, se viola el derecho fundamental de petición (Art. 23 CP) y acceso a la información (Ley 1712/2014). La tutela obliga a responder en 48 horas.'
  },
  danoColectivo: {
    triggers: [
      'dano colectivo', 'daño colectivo', 'afecta comunidad', 'afecta a todos',
      'afecta al barrio', 'todo el barrio', 'todo el sector', 'vecinos',
      'comunidad afectada', 'derecho colectivo', 'contaminacion',
      'contaminación', 'ambiente', 'medio ambiente', 'espacio publico',
      'espacio público', 'parque', 'plaza', 'rio', 'río', 'humedal',
      'accion popular', 'acción popular', 'interes colectivo',
      'interés colectivo', 'salubridad', 'seguridad publica',
      'seguridad pública', 'moralidad administrativa', 'patrimonio',
      'bien comun', 'bien común', 'obra afecta', 'megaproyecto',
      'afectacion colectiva', 'afectación colectiva', 'todos los vecinos'
    ],
    entidad: 'Juez Administrativo (Acción Popular)',
    accion: 'Acción Popular',
    descripcion: 'Cuando se vulneran derechos e intereses colectivos (ambiente, espacio público, moralidad administrativa, patrimonio), la acción popular (Art. 88 CP, Ley 472/1998) protege a toda la comunidad afectada.'
  }
};

/**
 * Determina a qué entidad de control acudir según el tipo de irregularidad.
 *
 * Mapea descripciones en lenguaje natural hacia las entidades competentes:
 *   - Daño patrimonial → Contraloría (control fiscal)
 *   - Falta disciplinaria → Procuraduría / Personería
 *   - Delito → Fiscalía (penal)
 *   - Negación de información → Tutela ante juez constitucional
 *   - Daño colectivo → Acción Popular ante juez administrativo
 *
 * @param {string} tipoIrregularidad - Descripción de la irregularidad detectada
 * @returns {{ entidad: string, accion: string, descripcion: string } | null}
 */
export function rutaEntidadControl(tipoIrregularidad) {
  if (!tipoIrregularidad || tipoIrregularidad.trim().length === 0) {
    return {
      entidad: 'No determinada',
      accion: 'Se requiere más información',
      descripcion: 'Describí la irregularidad con más detalle para identificar la entidad de control competente. Podés mencionar: daño patrimonial, falta disciplinaria, delito, negación de información, o daño colectivo.'
    };
  }

  const normalizado = normalizar(tipoIrregularidad);
  const tokens = tokenizar(normalizado);

  let mejorMatch = null;
  let mejorPuntaje = 0;

  for (const [categoria, def] of Object.entries(MAPA_ENTIDADES)) {
    let puntaje = 0;
    const triggersNorm = def.triggers.map(t => normalizar(t));

    for (const token of tokens) {
      for (const trigger of triggersNorm) {
        if (token === trigger) {
          puntaje += 3;
        } else if (token.includes(trigger) && trigger.length >= 4) {
          puntaje += 2;
        } else if (trigger.includes(token) && token.length >= 4) {
          puntaje += 2;
        }
      }
    }

    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejorMatch = { categoria, ...def };
    }
  }

  if (mejorMatch && mejorPuntaje > 0) {
    return {
      entidad: mejorMatch.entidad,
      accion: mejorMatch.accion,
      descripcion: mejorMatch.descripcion
    };
  }

  // Fallback: sugerir todas las opciones para que el ciudadano elija
  return {
    entidad: 'Depende del tipo exacto de irregularidad',
    accion: 'Especificá mejor el tipo de irregularidad',
    descripcion: 'No se pudo determinar automáticamente la entidad. Las opciones son:\n' +
      '• 💸 Daño patrimonial → Contraloría General de la República\n' +
      '• 📋 Falta disciplinaria → Procuraduría General / Personería Municipal\n' +
      '• 🔴 Delito → Fiscalía General de la Nación\n' +
      '• 📄 Negación de información → Tutela ante juez constitucional\n' +
      '• 🏗️ Daño colectivo / ambiental → Acción Popular ante juez administrativo'
  };
}

// ---------------------------------------------------------------------------
// 4. jerarquiaNormativa — Pirámide normativa colombiana (Kelsen)
// ---------------------------------------------------------------------------

/**
 * Jerarquía normativa colombiana según la pirámide de Kelsen.
 *
 * Los pesos representan la prevalencia relativa en el ordenamiento jurídico.
 * Un peso mayor indica mayor jerarquía y prevalece sobre normas inferiores.
 *
 * Referencias:
 *   - Constitución Política de Colombia (1991), Art. 4: supremacía constitucional
 *   - Ley 153 de 1887, Art. 5-8: criterios de interpretación jerárquica
 *   - Corte Constitucional, Sentencia C-415/12: bloque de constitucionalidad
 */
export const jerarquiaNormativa = {
  constitucion: {
    nivel: 1,
    peso: 100,
    nombre: 'Constitución Política de Colombia',
    descripcion: 'Norma suprema del ordenamiento jurídico. Todas las demás normas deben ajustarse a ella (Art. 4 CP). Incluye el bloque de constitucionalidad (tratados de derechos humanos ratificados por Colombia).',
    ejemplos: [
      'Constitución Política de 1991',
      'Tratados internacionales de derechos humanos (bloque de constitucionalidad)',
      'Convención Americana de Derechos Humanos'
    ],
    prevaleceSobre: ['leyes', 'decretos', 'sentencias', 'actos administrativos']
  },
  leyes: {
    nivel: 2,
    peso: 80,
    nombre: 'Leyes (estatutarias, orgánicas, ordinarias)',
    descripcion: 'Normas expedidas por el Congreso de la República. Las leyes estatutarias (derechos fundamentales, estados de excepción) requieren mayoría absoluta y revisión previa de la Corte Constitucional. Las leyes orgánicas regulan la actividad legislativa. Las leyes ordinarias cubren las demás materias.',
    ejemplos: [
      'Ley 80 de 1993 (Contratación estatal)',
      'Ley 850 de 2003 (Veedurías ciudadanas)',
      'Ley 1712 de 2014 (Transparencia y acceso a la información)',
      'Ley 1474 de 2011 (Estatuto Anticorrupción)',
      'Ley 1757 de 2015 (Participación ciudadana)',
      'Ley 472 de 1998 (Acciones populares y de grupo)',
      'Ley 1755 de 2015 (Derecho de petición)',
      'Ley 142 de 1994 (Servicios públicos domiciliarios)'
    ],
    prevaleceSobre: ['decretos', 'sentencias', 'actos administrativos']
  },
  decretos: {
    nivel: 3,
    peso: 60,
    nombre: 'Decretos (reglamentarios, legislativos, ejecutivos)',
    descripcion: 'Normas expedidas por el Presidente de la República. Los decretos reglamentarios desarrollan leyes sin modificarlas. Los decretos legislativos se expiden durante estados de excepción. Los decretos ejecutivos regulan la administración pública.',
    ejemplos: [
      'Decreto 2591 de 1991 (Reglamentario de la acción de tutela)',
      'Decreto 1082 de 2015 (Contratación pública)',
      'Decreto 1076 de 2015 (Medio ambiente y licencias ambientales)',
      'Decreto Único Reglamentario del Sector Administrativo'
    ],
    prevaleceSobre: ['actos administrativos']
  },
  sentencias: {
    nivel: 4,
    peso: 50,
    nombre: 'Sentencias de la Corte Constitucional (precedente judicial)',
    descripcion: 'Las sentencias de la Corte Constitucional hacen tránsito a cosa juzgada constitucional y tienen efecto vinculante para todas las autoridades. Las sentencias de unificación (SU) y las que fijan precedente (T con efecto amplio) orientan la interpretación de derechos fundamentales.',
    ejemplos: [
      'Sentencia T-760/08 (Salud como derecho fundamental)',
      'Sentencia T-596/02 (Control social sin inscripción como veedor)',
      'Sentencia C-274/13 (No justificar derecho de petición)',
      'Sentencia C-415/12 (Bloque de constitucionalidad)',
      'Sentencia SU-067/22 (Precedente vinculante)'
    ],
    prevaleceSobre: ['actos administrativos'],
    aclaracion: 'Aunque formalmente están por debajo de la ley, las sentencias de constitucionalidad pueden declarar la inexequibilidad de una ley, ejerciendo control material sobre todo el ordenamiento.'
  },
  actosAdministrativos: {
    nivel: 5,
    peso: 30,
    nombre: 'Actos administrativos (resoluciones, circulares, directivas)',
    descripcion: 'Decisiones de autoridades administrativas que producen efectos jurídicos. Incluyen resoluciones, circulares, directivas, acuerdos municipales, ordenanzas departamentales. Deben ajustarse a la Constitución, las leyes y los decretos superiores.',
    ejemplos: [
      'Resoluciones de la Contraloría General',
      'Circulares de la Procuraduría General',
      'Acuerdos del Concejo Municipal',
      'Ordenanzas de la Asamblea Departamental',
      'Directivas de ministerios y superintendencias'
    ],
    prevaleceSobre: []
  }
};

// ---------------------------------------------------------------------------
// Utilidad auxiliar: obtener el texto completo de la jerarquía ordenado
// ---------------------------------------------------------------------------

/**
 * Devuelve la jerarquía normativa como array ordenado (de mayor a menor peso).
 * Útil para renderizar en UI o explicar al ciudadano qué norma prevalece.
 */
export function getJerarquiaOrdenada() {
  return Object.entries(jerarquiaNormativa)
    .sort(([, a], [, b]) => b.peso - a.peso)
    .map(([key, val]) => ({ key, ...val }));
}

/**
 * Dado un nombre de norma (ej: "Ley 1712 de 2014"), devuelve su nivel
 * en la jerarquía o null si no se reconoce.
 */
export function ubicarNorma(nombreNorma) {
  const normalizado = normalizar(nombreNorma);

  for (const [key, def] of Object.entries(jerarquiaNormativa)) {
    for (const ejemplo of def.ejemplos) {
      if (normalizar(ejemplo).includes(normalizado) || normalizado.includes(normalizar(ejemplo.split('(')[0].trim()))) {
        return { nivel: def.nivel, nombre: def.nombre, peso: def.peso, key };
      }
    }
  }

  // Detección por tipo de prefijo
  if (/^ley\s/i.test(normalizado)) {
    return { nivel: 2, nombre: jerarquiaNormativa.leyes.nombre, peso: 80, key: 'leyes' };
  }
  if (/^decreto\s/i.test(normalizado)) {
    return { nivel: 3, nombre: jerarquiaNormativa.decretos.nombre, peso: 60, key: 'decretos' };
  }
  if (/^(sentencia|t-|c-|su-)\s/i.test(normalizado)) {
    return { nivel: 4, nombre: jerarquiaNormativa.sentencias.nombre, peso: 50, key: 'sentencias' };
  }
  if (/^(resolucion|circular|acuerdo|ordenanza|directiva)\s/i.test(normalizado)) {
    return { nivel: 5, nombre: jerarquiaNormativa.actosAdministrativos.nombre, peso: 30, key: 'actosAdministrativos' };
  }

  // Constitución
  if (/\bconstitucion\b/i.test(normalizado) || /\bconstitución\b/i.test(normalizado) ||
      /\bart[ií]culo\s+\d+\s*(cp|const\.?\s*pol)/i.test(normalizado)) {
    return { nivel: 1, nombre: jerarquiaNormativa.constitucion.nombre, peso: 100, key: 'constitucion' };
  }

  return null;
}

// Re-exportar utilidades para tests o uso externo
export { normalizar, tokenizar, puntuarCategorias, CATEGORIAS_TUTELA, CATEGORIAS_ACCION_POPULAR, MAPA_ENTIDADES };
