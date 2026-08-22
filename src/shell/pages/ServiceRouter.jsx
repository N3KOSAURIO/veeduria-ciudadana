import { useParams, Navigate } from 'react-router-dom';
import services from '../../config/services.json';
import ComunidadApp from '../../services/comunidad/ComunidadApp.jsx';

/**
 * ServiceRouter — enruta /servicios/:id al módulo correspondiente.
 * Leer `config/services.json` para saber qué servicios existen. Si el id no
 * está registrado, redirige a /inicio (o landing).
 *
 * Añadir servicio = añadir carpeta en src/services/<id> + entrada en services.json.
 */
export default function ServiceRouter() {
  const { id } = useParams();

  const svc = services.services.find((s) => s.id === id);
  if (!svc) {
    return <Navigate to="/" replace />;
  }

  // Carga perezosa por servicio: cada servicio decide su propia página que
  // renderizar. Por ahora todos apuntan a sus rutas; si el módulo todavía no
  // existe, mostramos un placeholder "próximamente".
  switch (svc.id) {
    case 'veeduria':
      return <Navigate to="/chat" replace />;
    case 'comunidad':
      return <ComunidadApp />;
    case 'pagos':
    default:
      return <ServicePlaceholder svc={svc} />;
  }
}

function ServicePlaceholder({ svc }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <span className="text-6xl mb-4" aria-hidden="true">{svc.icon}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro dark:text-white mb-2">
          {svc.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-4">
          {svc.note || 'Este servicio está en desarrollo y estará disponible próximamente.'}
        </p>
        <span className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          Estado: {svc.status}
        </span>
      </div>
    </div>
  );
}
