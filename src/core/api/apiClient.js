/**
 * apiClient — cliente HTTP para el backend Go de Veeduría 2.
 * Arquitectura: la identidad/auth viven en el backend (API), NUNCA en
 * localStorage ni en el bundle. Las cookies httpOnly son gestionadas por el
 * navegador automáticamente (credentials: 'include').
 *
 * FASE 2: el frontend deja de depender de datos fake/localStorage y consume
 * la API real. Si el backend no está disponible en dev, hay rutas que fallan
 * con degradación visible (no datos inventados).
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8090';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include', // envía cookies httpOnly (access_token)
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.error || `Error ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
};

/** Autenticación */
export const authApi = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  me: () => api.get('/api/auth/me'),
  historial: () => api.get('/api/historial'),
  changePassword: (data) => api.post('/api/auth/change-password', data),
};

/** Catálogo de servicios (público) */
export const servicesApi = {
  list: () => api.get('/api/services'),
};
