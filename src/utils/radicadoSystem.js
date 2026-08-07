/**
 * Sistema de radicado: genera códigos únicos y ADN de trazabilidad.
 *
 * Código: VED-YYYYMMDD-XXXX (4 dígitos aleatorios)
 * ADN: hash simple que identifica la petición unívocamente
 */

/**
 * Genera un código de radicado único.
 * Formato: VED-20260807-A3F2
 */
export function generarRadicado() {
  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VED-${fecha}-${random}`;
}

/**
 * Genera el ADN de la petición: un hash que la identifica.
 * Incluye: timestamp, entidad, tipo, y resumen corto.
 */
export function generarADN({ entidad, tipo, resumen, ciudadano }) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const entidadKey = (entidad || 'NN').substring(0, 4).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
  const ciudadanoKey = (ciudadano || 'NN').substring(0, 4).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
  const tipoKey = (tipo || 'GEN').substring(0, 3).toUpperCase();

  // checksum simple: suma de caracteres del resumen
  let checksum = 0;
  if (resumen) {
    for (let i = 0; i < Math.min(resumen.length, 50); i++) {
      checksum += resumen.charCodeAt(i);
    }
  }
  const chk = (checksum % 1000).toString(16).toUpperCase().padStart(3, '0');

  return `${timestamp}-${entidadKey}-${tipoKey}-${ciudadanoKey}-${chk}`;
}

/**
 * Guarda una petición en localStorage.
 */
export function guardarPeticion(peticion) {
  const peticiones = obtenerPeticiones();
  peticiones.unshift(peticion);
  localStorage.setItem('veeduria_peticiones', JSON.stringify(peticiones));
}

/**
 * Obtiene todas las peticiones del ciudadano.
 */
export function obtenerPeticiones() {
  try {
    const data = localStorage.getItem('veeduria_peticiones');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Actualiza una petición existente (ej: cargar respuesta).
 */
export function actualizarPeticion(radicado, updates) {
  const peticiones = obtenerPeticiones();
  const idx = peticiones.findIndex(p => p.radicado === radicado);
  if (idx === -1) return false;
  peticiones[idx] = { ...peticiones[idx], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem('veeduria_peticiones', JSON.stringify(peticiones));
  return true;
}

/**
 * Calcula días transcurridos desde la radicación.
 */
export function diasTranscurridos(fechaRadicacion) {
  const rad = new Date(fechaRadicacion);
  const hoy = new Date();
  return Math.floor((hoy - rad) / (1000 * 60 * 60 * 24));
}

/**
 * Determina el estado según los días y si hay respuesta.
 */
export function calcularEstado(peticion) {
  if (peticion.respuestaCargada) {
    return peticion.respuestaAnalizada ? 'analizada' : 'respondida';
  }

  const dias = diasTranscurridos(peticion.fecha);
  if (dias > 15) return 'vencida';       // silencio administrativo (Ley 1755/2015: 15 días hábiles, simplificamos a calendario)
  if (dias > 10) return 'por-vencer';
  return 'radicada';
}

const ESTADOS = {
  radicada:    { label: 'Radicada',       color: 'bg-blue-100 text-blue-800',   icon: '📨' },
  'por-vencer':{ label: 'Por vencer',     color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
  respondida:  { label: 'Respondida',     color: 'bg-green-100 text-green-800', icon: '📬' },
  analizada:   { label: 'Analizada',      color: 'bg-purple-100 text-purple-800', icon: '✅' },
  vencida:     { label: 'Vencida (silencio)', color: 'bg-red-100 text-red-800', icon: '⚠️' },
};

export function getEstadoInfo(estado) {
  return ESTADOS[estado] || ESTADOS.radicada;
}
