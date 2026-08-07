import { useState, useRef, useCallback } from 'react';

/**
 * Botón de entrada de voz usando Web Speech API.
 * Compatible con Chrome, Edge, Safari (no Firefox).
 * Transcribe en español (es-CO) y devuelve el texto.
 */
export default function VoiceInput({ onText, disabled }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const isSupported = typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Navegador no compatible');
      return;
    }

    setError(null);
    setListening(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'es-CO';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (transcript && onText) {
        onText(transcript);
      }
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.warn('Voice error:', event.error);
      const msgs = {
        'not-allowed': 'Permiso de micrófono denegado',
        'no-speech': 'No se detectó voz. Intentá de nuevo.',
        'audio-capture': 'No se encontró micrófono.',
        'network': 'Error de red. Verificá tu conexión.',
        'aborted': 'Grabación cancelada.',
      };
      setError(msgs[event.error] || `Error: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, onText]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setListening(false);
    setError(null);
  }, []);

  const handleClick = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) return null; // Navegador sin soporte → ocultar botón

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled && !listening}
        title={listening ? 'Detener grabación' : 'Hablar por voz'}
        className={`p-2 rounded-xl transition-all ${
          listening
            ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200'
            : disabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-400 hover:text-azul-medio hover:bg-blue-50'
        }`}
      >
        {listening ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>

      {listening && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow">
          🎤 Escuchando...
        </span>
      )}

      {error && !listening && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-lg border border-amber-200 shadow">
          {error}
        </span>
      )}
    </div>
  );
}
