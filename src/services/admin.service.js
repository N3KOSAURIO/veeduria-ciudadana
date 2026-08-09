/**
 * Servicio administrativo — datos de clientes, pagos, sesiones, actividad.
 * ⚠️ En producción: estos datos viven en el backend y se sirven con autorización.
 * El frontend NUNCA debe tener acceso directo a datos administrativos.
 */

import fakeClients from '../data/fakeClients.js';
import fakePayments from '../data/fakePayments.js';
import FAKE_SESSIONS from '../data/fakeSessions.js';
import FAKE_ACTIVITY from '../data/fakeActivity.js';

/**
 * Retorna todos los clientes registrados.
 * 🔒 Solo admin autorizado.
 */
export function getClients() {
  return fakeClients;
}

/**
 * Retorna un cliente por ID.
 * 🔒 Solo admin autorizado.
 */
export function getClientById(id) {
  return fakeClients.find(c => c.id === id) || null;
}

/**
 * Retorna todos los pagos registrados.
 * 🔒 Solo admin autorizado.
 */
export function getPayments() {
  return fakePayments;
}

/**
 * Retorna el historial de sesiones de un cliente.
 * 🔒 Solo admin autorizado (NO el propio ciudadano).
 */
export function getSessions(clientId) {
  // En producción: filtrar por clientId real.
  // Por ahora devolvemos datos simulados para cualquier cliente.
  return FAKE_SESSIONS;
}

/**
 * Retorna la actividad reciente de un cliente.
 * 🔒 Solo admin autorizado (NO el propio ciudadano).
 */
export function getActivity(clientId) {
  // En producción: filtrar por clientId real.
  return FAKE_ACTIVITY;
}
