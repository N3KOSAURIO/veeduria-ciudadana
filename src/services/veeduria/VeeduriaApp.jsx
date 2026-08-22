import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import ReportarCaso from './ReportarCaso.jsx';
import Chat from '../../pages/citizen/Chat.jsx';

/**
 * VeeduriaApp — shell del servicio "Veeduría Ciudadana".
 * Módulo aislado del shell (norte: cada servicio en src/services/<id>/).
 * Sub-vistas gestionadas por estado local (KISS, igual que ComunidadApp):
 *   view: 'home' | 'reportar' | 'chat'
 *
 * - 'home': menú del servicio (2 puertas: Reporta un caso + Chat de análisis)
 * - 'reportar': flujo guiado "hueco en la calle" (Opción A2)
 * - 'chat': chatbot + panel Análisis IA (ya existente)
 *
 * Requiere sesión (CitizenLayout / autenticación central). Si no hay sesión,
 * redirige a /login (el guard vive en el layout; aquí solo protegemos el home).
 */
export default function VeeduriaApp() {
  const { isAuthenticated } = useUser();
  const [view, setView] = useState('home');

  // Sin sesión: no entrar al servicio. (El layout también protege /servicios.)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (view === 'reportar') {
    return <ReportarCaso onBack={() => setView('home')} />;
  }

  if (view === 'chat') {
    // El Chat ya tiene su Header y vuelta a Inicio (ruta /chat). No necesita props extra.
    return <Chat />;
  }

  // Home del servicio Veeduría
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 px-4 sm:px-6 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-5xl block mb-4" aria-hidden="true">🏛</span>
          <h1 className="text-3xl font-extrabold text-azul-oscuro dark:text-white mb-2">
            Veeduría Ciudadana
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Control social de obras y gestión pública. Reporta una situación,
            cruzalá con lo que exige la norma y genera tu informe de veeduría.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 max-w-lg mx-auto">
            <button
              onClick={() => setView('reportar')}
              className="group p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-azul-medio hover:shadow-md transition-all text-left cursor-pointer"
            >
              <span className="text-3xl block mb-3" aria-hidden="true">📝</span>
              <h3 className="font-bold text-azul-oscuro dark:text-white mb-1">Reporta un caso</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Un caso guiado: describí la situación, marcá el checklist y obtené
                tu informe ejecutivo/detallado.
              </p>
              <span className="mt-3 inline-block text-sm font-bold text-azul-medio group-hover:underline">
                Comenzar →
              </span>
            </button>

            <button
              onClick={() => setView('chat')}
              className="group p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-azul-medio hover:shadow-md transition-all text-left cursor-pointer"
            >
              <span className="text-3xl block mb-3" aria-hidden="true">🤖</span>
              <h3 className="font-bold text-azul-oscuro dark:text-white mb-1">Chat de análisis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Conversá con el asistente legal IA y usá las 5 funciones de análisis
                (Orientar, Clasificar, Resumir, Estructurar, Analizar).
              </p>
              <span className="mt-3 inline-block text-sm font-bold text-azul-medio group-hover:underline">
                Abrir chat →
              </span>
            </button>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-gray-400 dark:text-gray-500">
        IA=asistente · el ciudadano decide. La información verde es el contraste normativo;
        la interpretación es orientativa, no constituye asesoría legal.
      </footer>
    </div>
  );
}
