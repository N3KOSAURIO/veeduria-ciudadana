/**
 * comunidad.api — cliente HTTP del servicio Comunidad (Reddit-like) contra la API Go.
 * Arquitectura (norte): datos de SERVICIO aislados; la auth usa la identidad
 * central (cookies httpOnly + /api/auth/me). Cada request manda credentials
 * para que el navegador adjunte la cookie access_token.
 *
 * FASE 4: Comunidad = servicio nuevo prioridad alta (norte App-Comunitaria).
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8090';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include', // cookie access_token httpOnly (C2/C3)
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

export const comunidadApi = {
  // Comunidades
  listComunidades: () => request('/api/comunidades'),
  createComunidad: (data) => request('/api/comunidades', { method: 'POST', body: JSON.stringify(data) }),
  // Posts
  listPosts: (communityId) => request(`/api/comunidades/${communityId}/posts`),
  createPost: (communityId, data) => request(`/api/comunidades/${communityId}/posts`, { method: 'POST', body: JSON.stringify(data) }),
  votePost: (postId, value) => request(`/api/posts/${postId}/vote`, { method: 'POST', body: JSON.stringify({ value }) }),
  // Comentarios
  listComments: (postId) => request(`/api/posts/${postId}/comments`),
  addComment: (postId, body) => request(`/api/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify({ body }) }),
};
