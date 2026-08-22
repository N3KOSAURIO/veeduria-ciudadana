/**
 * Servicio administrativo — datos de clientes, pagos, sesiones, actividad.
 * 🔒 FASE 2: los datos admin viven SOLO en el backend Go (autorización
 * server-side). El frontend NUNCA los tiene en el bundle. C8 resuelto: ya no
 * hay fakeClients/fakePayments/fakeSessions/fakeActivity.
 *
 * Estas funciones devuelven datos vacíos (síncronas) porque el dashboard admin
 * espera arrays síncronos y aún no hay endpoint admin real. En FASE 4 se
 * conectan a la API real del backend (async) actualizando los renders. Esto
 * evita exponer datos inventados mientras tanto (norte de producto).
 */

/** Retorna clientes. Vacío hasta conectar endpoint admin (F4). */
export function getClients() {
  return [];
}

export function getClientById() {
  return null;
}

export function getPayments() {
  return [];
}

export function getSessions() {
  return [];
}

export function getActivity() {
  return [];
}
