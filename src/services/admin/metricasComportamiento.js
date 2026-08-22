/**
 * 🔒 Datos demo de métricas de comportamiento (FASE 5) — PERFIL DE COMPORTAMIENTO ADMIN.
 * -----------------------------------------------------------------
 * ⚠️ DEMO ONLY: datos FICTICIOS de ejemplo para mostrar el dashboard.
 *   - NO son datos reales. No representan usuarios reales ni actividad real.
 *   - La fuente real serán metadatos de `activity_log` del backend Go
 *     (endpoint admin /api/admin/metricas, pendiente de conectar).
 *   - Ley 1581: el frontend ciudadano NUNCA ve esto. Solo la ruta admin
 *     (guard server-side AdminLayout: user.role === 'admin').
 * -----------------------------------------------------------------
 * ESTRUCTURA (espejo del futuro endpoint admin):
 *   {
 *     total_eventos, usuarios_activos, eventos_hoy, servicios_usados,
 *     por_tipo:      [{ tipo, eventos }]        -> gráfica tipo de comportamiento
 *     por_servicio:  [{ servicio, eventos }]    -> gráfica uso por servicio
 *     por_dia:       [{ dia, eventos }]         -> gráfica actividad en el tiempo
 *     por_perfil:    [{ usuario_id, nombre, email, ciudad, eventos,
 *                       servicios_uso, ultima_actividad }] -> tabla comportamiento/perfil
 *   }
 */

export const metricasComportamientoDemo = {
  total_eventos: 1248,
  usuarios_activos: 42,
  eventos_hoy: 87,
  servicios_usados: 2,

  // 1. Tipo de comportamiento (event_type de activity_log)
  por_tipo: [
    { tipo: 'consulta',  eventos: 486 },
    { tipo: 'trámite',   eventos: 214 },
    { tipo: 'reporte',   eventos: 152 },
    { tipo: 'comentario', eventos: 198 },
    { tipo: 'voto',      eventos: 126 },
    { tipo: 'login',     eventos: 72 },
  ],

  // 2. Uso por servicio (service_id)
  por_servicio: [
    { servicio: 'veeduria',  eventos: 742 },
    { servicio: 'comunidad', eventos: 506 },
  ],

  // 3. Actividad en el tiempo (últimos 7 días)
  por_dia: [
    { dia: 'Lun', eventos: 168 },
    { dia: 'Mar', eventos: 204 },
    { dia: 'Mié', eventos: 182 },
    { dia: 'Jue', eventos: 231 },
    { dia: 'Vie', eventos: 219 },
    { dia: 'Sáb', eventos: 156 },
    { dia: 'Dom', eventos: 87 },
  ],

  // 4. Comportamiento por perfil de usuario (ficticio, enlazado a cada perfil)
  por_perfil: [
    { usuario_id: 'u-01', nombre: 'María Fernanda López', email: 'maria.lopez@ejemplo.co', ciudad: 'Medellín',     eventos: 214, servicios_uso: ['veeduria', 'comunidad'], ultima_actividad: '2026-08-22T08:15:00Z', plan: 'veeduria' },
    { usuario_id: 'u-02', nombre: 'Pedro Nel Vargas',     email: 'pedro.vargas@ejemplo.co', ciudad: 'Bogotá',       eventos: 168, servicios_uso: ['veeduria'],           ultima_actividad: '2026-08-22T09:40:00Z', plan: 'gratis' },
    { usuario_id: 'u-03', nombre: 'Andrea Rodríguez',     email: 'andrea.r@ejemplo.co',    ciudad: 'Cali',         eventos: 145, servicios_uso: ['veeduria', 'comunidad'], ultima_actividad: '2026-08-21T18:20:00Z', plan: 'veeduria' },
    { usuario_id: 'u-04', nombre: 'Carlos Gutiérrez',     email: 'carlos.g@ejemplo.co',    ciudad: 'Barranquilla', eventos: 132, servicios_uso: ['comunidad'],          ultima_actividad: '2026-08-21T15:05:00Z', plan: 'gratis' },
    { usuario_id: 'u-05', nombre: 'Sofía Martínez',       email: 'sofia.m@ejemplo.co',     ciudad: 'Santa Marta',  eventos: 118, servicios_uso: ['veeduria', 'comunidad'], ultima_actividad: '2026-08-22T07:55:00Z', plan: 'gratis' },
    { usuario_id: 'u-06', nombre: 'Gabriel Suárez',       email: 'gabriel.s@ejemplo.co',   ciudad: 'Pereira',      eventos:  96, servicios_uso: ['veeduria'],           ultima_actividad: '2026-08-20T11:30:00Z', plan: 'veeduria' },
    { usuario_id: 'u-07', nombre: 'Valentina Ospina',     email: 'valentina.o@ejemplo.co', ciudad: 'Manizales',    eventos:  84, servicios_uso: ['comunidad'],          ultima_actividad: '2026-08-20T14:10:00Z', plan: 'gratis' },
  ],
};

// Meta de servicios (para colores/iconos en la gráfica) — isomorfo al future endpoint.
export const SERVICIOS_META = {
  veeduria:  { label: 'Veeduría',   color: 'bg-azul-medio' },
  comunidad: { label: 'Comunidad',  color: 'bg-dorado' },
};
