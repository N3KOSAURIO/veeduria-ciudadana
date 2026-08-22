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
    { usuario_id: 'u-03', nombre: 'Andrea Rodríguez',     email: 'andrea.r@ejemplo.co',    ciudad: 'Cali',         eventos: 115, servicios_uso: ['veeduria', 'comunidad'], ultima_actividad: '2026-08-21T18:20:00Z', plan: 'veeduria' },
    { usuario_id: 'u-04', nombre: 'Carlos Gutiérrez',     email: 'carlos.g@ejemplo.co',    ciudad: 'Barranquilla', eventos: 132, servicios_uso: ['comunidad'],          ultima_actividad: '2026-08-21T15:05:00Z', plan: 'gratis' },
    { usuario_id: 'u-05', nombre: 'Sofía Martínez',       email: 'sofia.m@ejemplo.co',     ciudad: 'Santa Marta',  eventos: 118, servicios_uso: ['veeduria', 'comunidad'], ultima_actividad: '2026-08-22T07:55:00Z', plan: 'gratis' },
    { usuario_id: 'u-06', nombre: 'Gabriel Suárez',       email: 'gabriel.s@ejemplo.co',   ciudad: 'Pereira',      eventos:  96, servicios_uso: ['veeduria'],           ultima_actividad: '2026-08-20T11:30:00Z', plan: 'veeduria' },
    { usuario_id: 'u-07', nombre: 'Valentina Ospina',     email: 'valentina.o@ejemplo.co', ciudad: 'Manizales',    eventos:  84, servicios_uso: ['comunidad'],          ultima_actividad: '2026-08-20T14:10:00Z', plan: 'gratis' },
  ],

  // 5. Detalle de gráficas por usuario (ficticio). El dashboard de perfil de
  //    comportamiento permite elegir un usuario y ver SUS métricas individuales.
  //    Cada usuario tiene su propio por_tipo / por_dia / por_servicio.
  por_perfil_detalle: {
    'u-01': {
      total_eventos: 214, eventos_hoy: 14, servicios_usados: 2,
      por_tipo: [
        { tipo: 'consulta',   eventos: 68 },
        { tipo: 'trámite',    eventos: 42 },
        { tipo: 'reporte',    eventos: 22 },
        { tipo: 'comentario', eventos: 34 },
        { tipo: 'voto',       eventos: 30 },
        { tipo: 'login',      eventos: 18 },
      ],
      por_servicio: [
        { servicio: 'veeduria',  eventos: 148 },
        { servicio: 'comunidad', eventos: 66 },
      ],
      por_dia: [
        { dia: 'Lun', eventos: 38 }, { dia: 'Mar', eventos: 44 },
        { dia: 'Mié', eventos: 32 }, { dia: 'Jue', eventos: 51 },
        { dia: 'Vie', eventos: 28 }, { dia: 'Sáb', eventos: 14 },
        { dia: 'Dom', eventos: 7 },
      ],
    },
    'u-02': {
      total_eventos: 168, eventos_hoy: 11, servicios_usados: 1,
      por_tipo: [
        { tipo: 'consulta',   eventos: 52 },
        { tipo: 'trámite',    eventos: 38 },
        { tipo: 'reporte',    eventos: 21 },
        { tipo: 'comentario', eventos: 16 },
        { tipo: 'voto',       eventos: 18 },
        { tipo: 'login',      eventos: 23 },
      ],
      por_servicio: [
        { servicio: 'veeduria',  eventos: 168 },
        { servicio: 'comunidad', eventos: 0 },
      ],
      por_dia: [
        { dia: 'Lun', eventos: 24 }, { dia: 'Mar', eventos: 30 },
        { dia: 'Mié', eventos: 28 }, { dia: 'Jue', eventos: 25 },
        { dia: 'Vie', eventos: 22 }, { dia: 'Sáb', eventos: 15 },
        { dia: 'Dom', eventos: 11 },
      ],
    },
    'u-03': {
      total_eventos: 115, eventos_hoy: 6, servicios_usados: 2,
      por_tipo: [
        { tipo: 'consulta',   eventos: 28 },
        { tipo: 'trámite',    eventos: 15 },
        { tipo: 'reporte',    eventos: 26 },
        { tipo: 'comentario', eventos: 21 },
        { tipo: 'voto',       eventos: 14 },
        { tipo: 'login',      eventos: 11 },
      ],
      por_servicio: [
        { servicio: 'veeduria',  eventos: 72 },
        { servicio: 'comunidad', eventos: 43 },
      ],
      por_dia: [
        { dia: 'Lun', eventos: 18 }, { dia: 'Mar', eventos: 21 },
        { dia: 'Mié', eventos: 12 }, { dia: 'Jue', eventos: 24 },
        { dia: 'Vie', eventos: 20 }, { dia: 'Sáb', eventos: 12 },
        { dia: 'Dom', eventos: 8 },
      ],
    },
    'u-04': {
      total_eventos: 132, eventos_hoy: 8, servicios_usados: 1,
      por_tipo: [
        { tipo: 'consulta',   eventos: 24 },
        { tipo: 'trámite',    eventos: 18 },
        { tipo: 'reporte',    eventos: 14 },
        { tipo: 'comentario', eventos: 20 },
        { tipo: 'voto',       eventos: 41 },
        { tipo: 'login',      eventos: 15 },
      ],
      por_servicio: [
        { servicio: 'veeduria',  eventos: 0 },
        { servicio: 'comunidad', eventos: 132 },
      ],
      por_dia: [
        { dia: 'Lun', eventos: 20 }, { dia: 'Mar', eventos: 18 },
        { dia: 'Mié', eventos: 24 }, { dia: 'Jue', eventos: 19 },
        { dia: 'Vie', eventos: 26 }, { dia: 'Sáb', eventos: 14 },
        { dia: 'Dom', eventos: 11 },
      ],
    },
    'u-05': {
      total_eventos: 118, eventos_hoy: 9, servicios_usados: 2,
      por_tipo: [
        { tipo: 'consulta',   eventos: 30 },
        { tipo: 'trámite',    eventos: 12 },
        { tipo: 'reporte',    eventos: 18 },
        { tipo: 'comentario', eventos: 27 },
        { tipo: 'voto',       eventos: 16 },
        { tipo: 'login',      eventos: 15 },
      ],
      por_servicio: [
        { servicio: 'veeduria',  eventos: 71 },
        { servicio: 'comunidad', eventos: 47 },
      ],
      por_dia: [
        { dia: 'Lun', eventos: 16 }, { dia: 'Mar', eventos: 22 },
        { dia: 'Mié', eventos: 17 }, { dia: 'Jue', eventos: 14 },
        { dia: 'Vie', eventos: 21 }, { dia: 'Sáb', eventos: 16 },
        { dia: 'Dom', eventos: 12 },
      ],
    },
    'u-06': {
      total_eventos: 96, eventos_hoy: 4, servicios_usados: 1,
      por_tipo: [
        { tipo: 'consulta',   eventos: 28 },
        { tipo: 'trámite',    eventos: 30 },
        { tipo: 'reporte',    eventos: 12 },
        { tipo: 'comentario', eventos: 10 },
        { tipo: 'voto',       eventos: 8 },
        { tipo: 'login',      eventos: 8 },
      ],
      por_servicio: [
        { servicio: 'veeduria',  eventos: 96 },
        { servicio: 'comunidad', eventos: 0 },
      ],
      por_dia: [
        { dia: 'Lun', eventos: 12 }, { dia: 'Mar', eventos: 18 },
        { dia: 'Mié', eventos: 10 }, { dia: 'Jue', eventos: 16 },
        { dia: 'Vie', eventos: 14 }, { dia: 'Sáb', eventos: 16 },
        { dia: 'Dom', eventos: 10 },
      ],
    },
    'u-07': {
      total_eventos: 84, eventos_hoy: 3, servicios_usados: 1,
      por_tipo: [
        { tipo: 'consulta',   eventos: 22 },
        { tipo: 'trámite',    eventos: 10 },
        { tipo: 'reporte',    eventos: 8 },
        { tipo: 'comentario', eventos: 18 },
        { tipo: 'voto',       eventos: 16 },
        { tipo: 'login',      eventos: 10 },
      ],
      por_servicio: [
        { servicio: 'veeduria',  eventos: 0 },
        { servicio: 'comunidad', eventos: 84 },
      ],
      por_dia: [
        { dia: 'Lun', eventos: 14 }, { dia: 'Mar', eventos: 12 },
        { dia: 'Mié', eventos: 10 }, { dia: 'Jue', eventos: 13 },
        { dia: 'Vie', eventos: 12 }, { dia: 'Sáb', eventos: 14 },
        { dia: 'Dom', eventos: 9 },
      ],
    },
  },
};

// Meta de servicios (para colores/iconos en la gráfica) — isomorfo al future endpoint.
export const SERVICIOS_META = {
  veeduria:  { label: 'Veeduría',   color: 'bg-azul-medio' },
  comunidad: { label: 'Comunidad',  color: 'bg-dorado' },
};
