/**
 * adminMetrics.api — cliente HTTP del dashboard ADMIN de perfil de comportamiento (F5 real).
 * Consume el endpoint real del backend Go: GET /api/admin/metricas (JWT, admin-only).
 *
 * B1 (2026-08-22, decisión Ney): el endpoint ahora devuelve, además de los agregados
 * globales (total_eventos, por_tipo, por_servicio, por_dia), el detalle POR USUARIO:
 *   - por_perfil:         [{ usuario_id, nombre, email, ciudad, plan, eventos,
 *                            servicios_uso[], ultima_actividad }]  -> tabla/selector
 *   - por_perfil_detalle: { usuario_id: { total_eventos, eventos_hoy, servicios_usados,
 *                            por_tipo[], por_servicio[], por_dia[] } } -> gráficas KPIs
 *
 * Ley 1581: esta ruta es ADMIN-ONLY (guard server-side RequireAdmin). El frontend
 * ciudadano nunca la invoca. Solo un admin autenticado (cookie httpOnly) la alcanza.
 *
 * Nota 'por_dia': el backend devuelve to_char(date, 'Dy') → días en INGLÉS ('Sat',
 * 'Sun', ...). Aquí lo mapeamos a español ('Sáb', 'Dom') para que el dashboard
 * renderice correctamente (fix del handoff 2026-08-22).
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8090';

// Mapa en→es de abreviaturas de día (PostgreSQL 'Dy' devuelve en inglés por locale).
const DIA_ES = {
  Mon: 'Lun', Tue: 'Mar', Wed: 'Mié', Thu: 'Jue',
  Fri: 'Vie', Sat: 'Sáb', Sun: 'Dom',
};

function normalizarDias(porDia = []) {
  return porDia.map((d) => ({ ...d, dia: DIA_ES[d.dia] || d.dia }));
}

/**
 * Carga las métricas reales del dashboard admin.
 * Devuelve el objeto ya normalizado (por_dia en español) listo para el panel.
 */
export async function obtenerMetricasAdmin() {
  const res = await fetch(`${API_BASE}/api/admin/metricas`, {
    method: 'GET',
    credentials: 'include', // cookie access_token httpOnly (C2/C3, auth central)
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.error || `Error ${res.status}`);
    err.status = res.status;
    throw err;
  }
  // Normalizar días a español en el detalle global y por usuario.
  const out = { ...data };
  out.por_dia = normalizarDias(data.por_dia);
  if (data.por_perfil_detalle) {
    const det = {};
    for (const [uid, d] of Object.entries(data.por_perfil_detalle)) {
      det[uid] = { ...d, por_dia: normalizarDias(d.por_dia) };
    }
    out.por_perfil_detalle = det;
  }
  return out;
}
