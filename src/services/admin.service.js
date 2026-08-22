/**
 * Servicio administrativo — datos de clientes, pagos, sesiones, actividad.
 * 🔒 FASE 2: los datos admin viven SOLO en el backend Go (con autorización
 * server-side). El frontend NUNCA recibe estos datos directamente ni del bundle.
 * C8 resuelto: ya no hay fakeClients/fakePayments/fakeSessions/fakeActivity
 * en el frontend.
 *
 * Metadatos admin NUNCA consultables desde el frontend ciudadano
 * (Ley 1581 / App-Comunitaria-Arquitectura). Solo roles admin autorizados.
 */
import { authApi } from '../core/api/apiClient';

/**
 * Los datos administrativos se obtienen del backend. Requiere autenticación.
 * En producción, llamar a los endpoints admin (ej. /api/admin/clients).
 * Si no hay sesión valida, devuelve estructura vacía (NUNCA datos inventados).
 */
export async function getClients() {
  try {
    // Endpoint real (admin-only). Si no existe aún en el backend, 404/401 aquí
    // NO se pisa: devolvemos vacío para no exponer datos falsos.
    const res = await authApi.me();
    if (!res || res.role !== 'admin') return [];
    // TODO fase 4: GET /api/admin/clients
    return [];
  } catch {
    return [];
  }
}

export async function getClientById(id) {
  const clients = await getClients();
  return clients.find((c) => Number(c.id) === Number(id)) || null;
}

export async function getPayments() {
  try {
    const res = await authApi.me();
    if (!res || res.role !== 'admin') return [];
    return [];
  } catch {
    return [];
  }
}

export async function getSessions() {
  return [];
}

export async function getActivity() {
  return [];
}
