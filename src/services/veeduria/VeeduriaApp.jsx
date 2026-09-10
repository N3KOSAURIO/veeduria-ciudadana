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
      <main className="flex-1 flex items-center px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto w-full text-center">
          <span className="text-5xl block mb-4" aria-hidden="true">🏛</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-azul-oscuro dark:text-white mb-3">
            Veeduría Ciudadana
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
            Control social de obras y gestión pública. Reporta una situación,
            compárala con lo que exige la norma y genera tu informe de veeduría.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
            <button
              onClick={() => setView('reportar')}
              className="group flex flex-col p-7 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-azul-medio hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-azul-medio focus:ring-offset-2 transition-all text-left cursor-pointer"
            >
              <span className="text-4xl block mb-4" aria-hidden="true">📝</span>
              <h2 className="text-lg font-bold text-azul-oscuro dark:text-white mb-2">
                Reporta un caso
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                Un caso guiado: describe la situación, marca el checklist y obtén
                tu informe ejecutivo o detallado.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-azul-medio group-hover:gap-2.5 transition-all">
                Comenzar
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => setView('chat')}
              className="group flex flex-col p-7 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-azul-medio hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-azul-medio focus:ring-offset-2 transition-all text-left cursor-pointer"
            >
              <span className="text-4xl block mb-4" aria-hidden="true">🤖</span>
              <h2 className="text-lg font-bold text-azul-oscuro dark:text-white mb-2">
                Chat de análisis
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                Conversa con el asistente legal IA y usa las 5 funciones de análisis
                (Orientar, Clasificar, Resumir, Estructurar, Analizar).
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-azul-medio group-hover:gap-2.5 transition-all">
                Abrir chat
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </main>
      <footer className="px-6 py-6 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        IA=asistente · el ciudadano decide. La información verde es el contraste normativo;
        la interpretación es orientativa, no constituye asesoría legal.
      </footer>
    </div>
  );
}
