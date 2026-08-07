/**
 * Generador de documento de Derecho de Petición
 * Basado en Ley 1755 de 2015, Artículo 16.
 *
 * Produce un documento formal listo para radicar en entidades públicas colombianas.
 */

/**
 * Genera el texto completo del derecho de petición.
 * @param {Object} params
 * @param {string} params.entidad - Nombre de la entidad
 * @param {string} params.ciudad - Ciudad de radicación
 * @param {string} params.nombre - Nombre del solicitante
 * @param {string} params.cc - Cédula de ciudadanía
 * @param {string} params.email - Correo del solicitante
 * @param {string} params.telefono - Teléfono del solicitante
 * @param {string} params.direccion - Dirección del solicitante
 * @param {string} params.asunto - Asunto/objeto de la petición
 * @param {string} params.descripcion - Descripción detallada de los hechos
 * @param {string} params.peticion - Qué pide concretamente
 * @param {string} params.anexos - Documentos anexos (opcional)
 */
export function generarDocumento({
  entidad,
  ciudad = 'Colombia',
  nombre,
  cc,
  email,
  telefono = '',
  direccion = '',
  asunto,
  descripcion,
  peticion,
  anexos = '',
}) {
  const fecha = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `SEÑORES
${entidad.toUpperCase()}
Atención al Ciudadano
${ciudad}

REF: DERECHO DE PETICIÓN — ${asunto}
Artículo 23 de la Constitución Política de Colombia
Ley 1755 de 2015

${nombre.toUpperCase()}, mayor de edad, identificado(a) con cédula de ciudadanía No. ${cc} expedida en ${ciudad}, con domicilio en ${direccion || '[dirección del solicitante]'}, correo electrónico ${email}${telefono ? `, teléfono ${telefono}` : ''}, en ejercicio del derecho consagrado en el Artículo 23 de la Constitución Política de Colombia y reglamentado por la Ley 1755 de 2015, respetuosamente presento DERECHO DE PETICIÓN con base en los siguientes:

HECHOS

${descripcion}

OBJETO DE LA PETICIÓN

Con fundamento en los hechos descritos, solicito:

${peticion}

FUNDAMENTO JURÍDICO

Fundamento esta petición en:

- Artículo 23 de la Constitución Política de Colombia: "Toda persona tiene derecho a presentar peticiones respetuosas a las autoridades por motivos de interés general o particular y a obtener pronta resolución."
- Ley 1755 de 2015, Artículo 13: El término para resolver es de quince (15) días hábiles siguientes a su recepción.
- Ley 1712 de 2014 (Ley de Transparencia y del Derecho de Acceso a la Información Pública Nacional).

PRUEBAS Y ANEXOS

${anexos || 'No se anexan documentos adicionales en este momento.'}

NOTIFICACIONES

Recibiré notificaciones en el correo electrónico: ${email}
${direccion ? `Dirección física: ${direccion}` : ''}
${telefono ? `Teléfono de contacto: ${telefono}` : ''}

Cordialmente,

_________________________________
${nombre}
C.C. No. ${cc}
${email}

${ciudad}, ${fecha}
`;
}

/**
 * Versión simplificada (sin datos personales aún) — solo el cuerpo
 * para mostrar en el chat como preview antes de confirmar.
 */
export function generarPreview({ entidad, asunto, descripcion, peticion }) {
  return `📄 **VISTA PREVIA DEL DERECHO DE PETICIÓN**

**Entidad:** ${entidad}
**Asunto:** ${asunto}

**HECHOS:**
${descripcion}

**LO QUE SE SOLICITA:**
${peticion}

_Fundamento legal: Art. 23 Constitución Política + Ley 1755/2015_
_Tiempo de respuesta: 15 días hábiles_

¿Confirmás el envío? Se generará un código de radicado y se enviará por correo electrónico a la entidad.`;
}

/**
 * Sugiere un asunto basado en la descripción del caso.
 */
export function sugerirAsunto(descripcion) {
  if (!descripcion) return 'Derecho de Petición';

  const texto = descripcion.toLowerCase();

  if (texto.includes('obra') || texto.includes('construcción') || texto.includes('hueco')) {
    return 'Solicitud de información sobre obra pública en ejecución';
  }
  if (texto.includes('contrato') || texto.includes('contratación')) {
    return 'Solicitud de información contractual y verificación de cumplimiento';
  }
  if (texto.includes('salud') || texto.includes('hospital') || texto.includes('eps')) {
    return 'Solicitud de información sobre servicios de salud';
  }
  if (texto.includes('educación') || texto.includes('colegio') || texto.includes('universidad')) {
    return 'Solicitud de información sobre servicios educativos';
  }
  if (texto.includes('derecho') || texto.includes('derechos')) {
    return 'Solicitud de protección y garantía de derechos fundamentales';
  }
  if (texto.includes('corrupción') || texto.includes('sobrecosto') || texto.includes('peculado')) {
    return 'Denuncia de presuntas irregularidades y solicitud de investigación';
  }
  if (texto.includes('servicio público') || texto.includes('agua') || texto.includes('luz') || texto.includes('gas')) {
    return 'Solicitud de información y solución sobre servicios públicos';
  }

  return 'Derecho de Petición — Solicitud de información';
}
