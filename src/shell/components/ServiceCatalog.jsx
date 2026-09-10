import services from '../../config/services.json';
import { Link } from 'react-router-dom';

/**
 * ServiceCatalog — catálogo de servicios de la app comunitaria.
 * Lee `config/services.json` (el registro de servicios estilo GitHub).
 * Añadir/quitar/editar un servicio = editar el JSON, sin re-migrar la app.
 *
 * Norte de producto (App-Comunitaria-Arquitectura):
 * la app es COMUNITARIA, Veeduría es UN servicio integrado, no la principal.
 */

// Etiquetas de estado en español (evita mezclar idiomas en la UI)
const ETIQUETA_ESTADO = {
  active: 'Activo',
  beta: 'Beta',
  idea: 'Idea',
};

export default function ServiceCatalog({ compact = false }) {
  return (
    <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-4 w-full max-w-4xl mx-auto`}>
      {services.services.map((svc) => (
        <Link
          key={svc.id}
          to={svc.path}
          className="group flex flex-col h-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="text-3xl" aria-hidden="true">{svc.icon}</span>
            <span
              className={`inline-block text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                svc.status === 'active'
                  ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-200 dark:border-green-700'
                  : svc.status === 'beta'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-700'
                  : 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500'
              }`}
            >
              {ETIQUETA_ESTADO[svc.status] || svc.status}
            </span>
          </div>
          <h3 className="mt-3 font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {svc.name}
          </h3>
          {svc.note && (
            <p className="mt-1 mb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">{svc.note}</p>
          )}
          <div className="mt-auto">
            {svc.paid && (
              <p className="mb-2 text-xs font-semibold text-amber-700 dark:text-amber-300">Servicio de pago</p>
            )}
            <span className="inline-flex items-center text-sm font-semibold text-blue-700 dark:text-blue-300 group-hover:underline">
              Explorar
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
