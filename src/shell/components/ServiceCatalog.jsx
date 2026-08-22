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
export default function ServiceCatalog({ compact = false }) {
  return (
    <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-4 w-full max-w-4xl mx-auto`}>
      {services.services.map((svc) => (
        <Link
          key={svc.id}
          to={svc.path}
          className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="text-3xl" aria-hidden="true">{svc.icon}</span>
            <span
              className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                svc.status === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                  : svc.status === 'beta'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {svc.status}
            </span>
          </div>
          <h3 className="mt-3 font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {svc.name}
          </h3>
          {svc.note && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{svc.note}</p>
          )}
          {svc.paid && (
            <p className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">Servicio de pago</p>
          )}
          <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            Explorar
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
