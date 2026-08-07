import { createContext, useState, useEffect, useContext } from 'react';
import Terminos from '../pages/Terminos.jsx';

export const TOSContext = createContext(null);

export function useTOS() {
  return useContext(TOSContext);
}

export function TOSProvider({ children }) {
  const [accepted, setAccepted] = useState(null); // null = cargando, true/false
  const [showTOS, setShowTOS] = useState(false);

  // Verificar al montar si ya aceptó T&C
  useEffect(() => {
    try {
      const stored = localStorage.getItem('veeduria_tos_accepted');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.accepted) {
          setAccepted(true);
          setShowTOS(false);
          return;
        }
      }
    } catch (e) {
      localStorage.removeItem('veeduria_tos_accepted');
    }
    // No ha aceptado: mostrar pantalla de T&C
    setAccepted(false);
    setShowTOS(true);
  }, []);

  const acceptTOS = () => {
    const record = {
      accepted: true,
      version: '1.0',
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('veeduria_tos_accepted', JSON.stringify(record));
    setAccepted(true);
    setShowTOS(false);
  };

  const declineTOS = () => {
    localStorage.removeItem('veeduria_tos_accepted');
    setAccepted(false);
    setShowTOS(true);
  };

  const resetTOS = () => {
    // Permite forzar re-aceptación (útil si cambian los T&C)
    localStorage.removeItem('veeduria_tos_accepted');
    setAccepted(false);
    setShowTOS(true);
  };

  // Mientras carga localStorage, mostrar pantalla de carga
  if (accepted === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  // Si no ha aceptado, bloquear toda la app y mostrar T&C
  if (!accepted && showTOS) {
    return (
      <Terminos onNavigate={acceptTOS} />
    );
  }

  // Si aceptó, renderizar la app normal
  const value = {
    tosAccepted: accepted,
    acceptTOS,
    declineTOS,
    resetTOS,
  };

  return (
    <TOSContext.Provider value={value}>
      {children}
    </TOSContext.Provider>
  );
}
