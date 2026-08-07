/**
 * Directorio de entidades colombianas con correos de atención al ciudadano.
 * Los correos son los oficiales publicados en cada portal de la entidad.
 * Última actualización: 2026-08-07
 */

const ENTIDADES = [
  // === ALCALDÍAS ===
  {
    id: 'alcaldia-bogota',
    nombre: 'Alcaldía Mayor de Bogotá D.C.',
    tipo: 'Alcaldía',
    correo: 'contactenos@alcaldiabogota.gov.co',
    jurisdiccion: 'Bogotá D.C.',
    web: 'https://bogota.gov.co',
    sugerencias: ['obra', 'construcción', 'hueco', 'calle', 'espacio público', 'movilidad'],
  },
  {
    id: 'alcaldia-medellin',
    nombre: 'Alcaldía de Medellín',
    tipo: 'Alcaldía',
    correo: 'atencion.ciudadano@medellin.gov.co',
    jurisdiccion: 'Medellín, Antioquia',
    web: 'https://medellin.gov.co',
    sugerencias: ['obra', 'construcción', 'hueco', 'calle', 'espacio público'],
  },
  {
    id: 'alcaldia-cali',
    nombre: 'Alcaldía de Santiago de Cali',
    tipo: 'Alcaldía',
    correo: 'contacto@cali.gov.co',
    jurisdiccion: 'Cali, Valle del Cauca',
    web: 'https://cali.gov.co',
    sugerencias: ['obra', 'construcción', 'hueco', 'calle'],
  },
  {
    id: 'alcaldia-barranquilla',
    nombre: 'Alcaldía de Barranquilla',
    tipo: 'Alcaldía',
    correo: 'atencionalciudadano@barranquilla.gov.co',
    jurisdiccion: 'Barranquilla, Atlántico',
    web: 'https://barranquilla.gov.co',
    sugerencias: ['obra', 'construcción', 'hueco', 'calle'],
  },
  {
    id: 'alcaldia-generica',
    nombre: 'Alcaldía Municipal (genérica)',
    tipo: 'Alcaldía',
    correo: 'contacto@[municipio].gov.co',
    jurisdiccion: 'Nacional',
    web: null,
    sugerencias: ['obra', 'construcción', 'hueco', 'calle', 'espacio público', 'municipio'],
  },

  // === PERSONERÍAS ===
  {
    id: 'personeria-bogota',
    nombre: 'Personería de Bogotá D.C.',
    tipo: 'Personería',
    correo: 'atencionciudadano@personeriabogota.gov.co',
    jurisdiccion: 'Bogotá D.C.',
    web: 'https://personeriabogota.gov.co',
    sugerencias: ['derechos humanos', 'abuso', 'queja', 'servicio público', 'derecho'],
  },
  {
    id: 'personeria-medellin',
    nombre: 'Personería de Medellín',
    tipo: 'Personería',
    correo: 'personeria@personeriamedellin.gov.co',
    jurisdiccion: 'Medellín, Antioquia',
    web: 'https://personeriamedellin.gov.co',
    sugerencias: ['derechos humanos', 'abuso', 'queja'],
  },

  // === ENTES DE CONTROL NACIONAL ===
  {
    id: 'contraloria',
    nombre: 'Contraloría General de la República',
    tipo: 'Contraloría',
    correo: 'atencionciudadano@contraloria.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://contraloria.gov.co',
    sugerencias: ['contrato', 'auditar', 'fiscalizar', 'sobrecosto', 'corrupción', 'contratación'],
  },
  {
    id: 'procuraduria',
    nombre: 'Procuraduría General de la Nación',
    tipo: 'Procuraduría',
    correo: 'quejas@procuraduria.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://procuraduria.gov.co',
    sugerencias: ['funcionario', 'disciplinario', 'falta', 'omisión', 'servidor público', 'corrupción'],
  },
  {
    id: 'defensoria',
    nombre: 'Defensoría del Pueblo',
    tipo: 'Defensoría',
    correo: 'atencionalciudadano@defensoria.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://defensoria.gov.co',
    sugerencias: ['derechos humanos', 'vulnerable', 'desplazado', 'víctima', 'abuso'],
  },
  {
    id: 'fiscalia',
    nombre: 'Fiscalía General de la Nación',
    tipo: 'Fiscalía',
    correo: 'denunciaanonima@fiscalia.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://fiscalia.gov.co',
    sugerencias: ['delito', 'denuncia', 'penal', 'crimen', 'corrupción', 'peculado'],
  },

  // === MINISTERIOS ===
  {
    id: 'min-salud',
    nombre: 'Ministerio de Salud y Protección Social',
    tipo: 'Ministerio',
    correo: 'atencionciudadano@minsalud.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://minsalud.gov.co',
    sugerencias: ['salud', 'eps', 'hospital', 'paciente', 'medicamento', 'cita'],
  },
  {
    id: 'min-educacion',
    nombre: 'Ministerio de Educación Nacional',
    tipo: 'Ministerio',
    correo: 'atencionalciudadano@mineducacion.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://mineducacion.gov.co',
    sugerencias: ['educación', 'colegio', 'universidad', 'estudiante', 'matrícula', 'profesor'],
  },
  {
    id: 'min-transporte',
    nombre: 'Ministerio de Transporte',
    tipo: 'Ministerio',
    correo: 'atencionalciudadano@mintransporte.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://mintransporte.gov.co',
    sugerencias: ['transporte', 'vía', 'carretera', 'movilidad', 'tránsito'],
  },
  {
    id: 'min-vivienda',
    nombre: 'Ministerio de Vivienda, Ciudad y Territorio',
    tipo: 'Ministerio',
    correo: 'atencionalciudadano@minvivienda.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://minvivienda.gov.co',
    sugerencias: ['vivienda', 'construcción', 'obra', 'urbanismo', 'acueducto', 'alcantarillado'],
  },

  // === SUPERINTENDENCIAS ===
  {
    id: 'superservicios',
    nombre: 'Superintendencia de Servicios Públicos Domiciliarios',
    tipo: 'Superintendencia',
    correo: 'sui@superservicios.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://superservicios.gov.co',
    sugerencias: ['agua', 'luz', 'gas', 'alcantarillado', 'aseo', 'servicio público', 'factura'],
  },
  {
    id: 'supersalud',
    nombre: 'Superintendencia Nacional de Salud',
    tipo: 'Superintendencia',
    correo: 'atencionciudadano@supersalud.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://supersalud.gov.co',
    sugerencias: ['salud', 'eps', 'hospital', 'clínica', 'paciente', 'medicamento'],
  },
  {
    id: 'superindustria',
    nombre: 'Superintendencia de Industria y Comercio',
    tipo: 'Superintendencia',
    correo: 'contactenos@sic.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://sic.gov.co',
    sugerencias: ['consumidor', 'garantía', 'estafa', 'comercio', 'publicidad', 'producto'],
  },

  // === SECRETARÍAS (genéricas) ===
  {
    id: 'secretaria-salud',
    nombre: 'Secretaría de Salud (municipal/departamental)',
    tipo: 'Secretaría',
    correo: 'secretaria.salud@[municipio].gov.co',
    jurisdiccion: 'Municipal',
    web: null,
    sugerencias: ['salud', 'hospital', 'clínica', 'eps', 'vacuna', 'cita'],
  },
  {
    id: 'secretaria-educacion',
    nombre: 'Secretaría de Educación (municipal/departamental)',
    tipo: 'Secretaría',
    correo: 'secretaria.educacion@[municipio].gov.co',
    jurisdiccion: 'Municipal',
    web: null,
    sugerencias: ['educación', 'colegio', 'profesor', 'matrícula', 'estudiante'],
  },
  {
    id: 'secretaria-planeacion',
    nombre: 'Secretaría de Planeación (municipal/departamental)',
    tipo: 'Secretaría',
    correo: 'secretaria.planeacion@[municipio].gov.co',
    jurisdiccion: 'Municipal',
    web: null,
    sugerencias: ['obra', 'construcción', 'licencia', 'urbanismo', 'plan', 'contrato'],
  },
  {
    id: 'secretaria-movilidad',
    nombre: 'Secretaría de Movilidad (municipal)',
    tipo: 'Secretaría',
    correo: 'secretaria.movilidad@[municipio].gov.co',
    jurisdiccion: 'Municipal',
    web: null,
    sugerencias: ['tránsito', 'multa', 'vía', 'transporte', 'movilidad', 'bicicleta'],
  },

  // === INFRAESTRUCTURA Y OBRA PÚBLICA ===
  {
    id: 'ani',
    nombre: 'Agencia Nacional de Infraestructura (ANI)',
    tipo: 'Agencia',
    correo: 'atencionalciudadano@ani.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://ani.gov.co',
    sugerencias: ['carretera', 'vía', 'autopista', 'concesión', 'peaje', 'obra', 'infraestructura'],
  },
  {
    id: 'invias',
    nombre: 'Instituto Nacional de Vías (INVÍAS)',
    tipo: 'Instituto',
    correo: 'atencionalciudadano@invias.gov.co',
    jurisdiccion: 'Nacional',
    web: 'https://invias.gov.co',
    sugerencias: ['carretera', 'vía', 'puente', 'obra', 'infraestructura', 'mantenimiento'],
  },

  // === OTROS ===
  {
    id: 'otra',
    nombre: 'Otra entidad (ingresar manualmente)',
    tipo: 'Otra',
    correo: '',
    jurisdiccion: 'N/A',
    web: null,
    sugerencias: [],
  },
];

/**
 * Busca la entidad más relevante según palabras clave en la consulta del ciudadano.
 */
export function buscarEntidad(query) {
  if (!query) return ENTIDADES.filter(e => e.id !== 'otra');

  const tokens = query.toLowerCase().split(/\s+/);
  const scored = ENTIDADES.filter(e => e.id !== 'otra').map(entidad => {
    let score = 0;
    for (const token of tokens) {
      if (entidad.sugerencias.some(s => token.includes(s) || s.includes(token))) {
        score += 1;
      }
      if (entidad.nombre.toLowerCase().includes(token)) {
        score += 2;
      }
      if (entidad.tipo.toLowerCase().includes(token)) {
        score += 1;
      }
      if (entidad.jurisdiccion.toLowerCase().includes(token)) {
        score += 1;
      }
    }
    return { entidad, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.entidad);
}

/**
 * Obtiene todas las entidades (para listados).
 */
export function getEntidades() {
  return ENTIDADES;
}

/**
 * Obtiene una entidad por ID.
 */
export function getEntidadById(id) {
  return ENTIDADES.find(e => e.id === id) || ENTIDADES.find(e => e.id === 'otra');
}

export default ENTIDADES;
