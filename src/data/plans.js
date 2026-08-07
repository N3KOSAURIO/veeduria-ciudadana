// Planes de Veeduría Ciudadana — Precios en COP (simulados)

const PLANES = {
  gratis: {
    id: 'gratis',
    nombre: 'Ciudadano',
    precio: 0,
    moneda: 'COP',
    periodo: 'para siempre',
    color: 'gray',
    colorClase: 'bg-gray-100 border-gray-300',
    beneficios: [
      '5 consultas al mes',
      'Respuestas basadas en leyes colombianas',
      'Acceso al checklist de obra pública',
      'Derivación a consultoría básica',
    ],
    limitaciones: [
      'Sin informes detallados',
      'Sin historial de consultas',
      'Sin asesoría personalizada',
    ],
  },
  pro: {
    id: 'pro',
    nombre: 'Pro',
    precio: 89000,
    moneda: 'COP',
    periodo: '/mes',
    color: 'dorado',
    colorClase: 'bg-yellow-50 border-dorado',
    popular: true,
    beneficios: [
      'Consultas ILIMITADAS',
      'Informe ejecutivo de 2 páginas por caso',
      'Historial completo de tus consultas',
      'Checklist de auditoría personalizado',
      'Mapa de riesgos (8 dimensiones)',
      'Derivación prioritaria a consultoría',
      'Soporte por WhatsApp',
    ],
    limitaciones: [
      'Sin informes detallados con señalamiento de responsables',
    ],
  },
  premium: {
    id: 'premium',
    nombre: 'Premium',
    precio: 199000,
    moneda: 'COP',
    periodo: '/mes',
    color: 'azul',
    colorClase: 'bg-azul-claro border-azul-medio',
    beneficios: [
      'TODO lo de Pro',
      'Informe detallado con señalamiento de responsables',
      'Análisis de competencias, habilidades y funciones omitidas',
      'Acompañamiento en derechos de petición',
      'Acompañamiento en tutelas',
      'Asesoría legal personalizada (1 hora/mes)',
      'Consultor dedicado',
      'Reportes exportables en PDF',
    ],
    limitaciones: [],
  },
};

export default PLANES;
