import Header from '../../components/Header.jsx';
import ServiceCatalog from '../components/ServiceCatalog.jsx';
import { useUser } from '../../context/UserContext.jsx';

/**
 * Inicio — "Hogar del usuario" post-login.
 * Norte de producto (App-Comunitaria-Arquitectura): SOLO enlaces a los
 * servicios disponibles (lee services.json). NO inserta ningún servicio aquí
 * para que no vuelva a pasar el problema de "re-migrar la principal".
 */
export default function Inicio() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-azul-oscuro dark:text-white mb-2">
              Hola{user?.nombre ? `, ${user.nombre.split(' ')[0]}` : ''} 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Este es tu espacio. Elige un servicio para comenzar.
            </p>
          </header>

          {/* Catálogo de servicios — SOLO enlaces (no inserta servicios) */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            Tus servicios
          </h3>
          <ServiceCatalog />
        </div>
      </main>
    </div>
  );
}
