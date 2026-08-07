import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header.jsx';
import ChatBubble from '../components/ChatBubble.jsx';
import QuickActions from '../components/QuickActions.jsx';
import { processQuery } from '../utils/chatEngine.js';

const MENSAJE_INICIAL = {
  sender: 'bot',
  text: '¡Hola! Soy tu asistente de veeduría ciudadana. ¿En qué puedo ayudarte?',
  showQuickActions: true,
};

export default function Chat({ onNavigate, onDerivar }) {
  const [messages, setMessages] = useState([MENSAJE_INICIAL]);
  const [input, setInput] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = (texto) => {
    const query = texto || input.trim();
    if (!query) return;

    // Ocultar quick actions
    setShowQuickActions(false);

    // Agregar mensaje del usuario
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simular delay para sensación de "procesamiento"
    setTimeout(() => {
      const resultado = processQuery(query);
      const botResponse = { sender: 'bot', text: resultado.respuesta, flowId: resultado.id };

      setMessages(prev => [...prev, botResponse]);

      // Si tiene derivación, agregarla como mensaje separado
      if (resultado.derivacion) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `📋 ${resultado.derivacion}`,
            isDerivacion: true,
            flowId: resultado.id,
          },
        ]);
      }

      setIsTyping(false);
      // Re-enfocar input
      inputRef.current?.focus();
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header showClose onClose={() => onNavigate('landing')} />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatBubble sender={msg.sender} isDerivacion={msg.isDerivacion}>
              {msg.text}
            </ChatBubble>
            {/* Quick actions dentro del primer mensaje del bot */}
            {msg.showQuickActions && showQuickActions && (
              <div className="ml-0 -mt-2 mb-4">
                <QuickActions onSelect={(query) => handleSend(query)} />
              </div>
            )}
            {/* Botón "Quiero consultoría" en mensajes de derivación */}
            {msg.isDerivacion && (
              <div className="flex justify-start -mt-2 mb-4 ml-0">
                <button
                  onClick={() => onDerivar(msg.flowId)}
                  className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  Sí, quiero consultoría →
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Indicador de typing */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí tu consulta..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="px-5 py-2.5 bg-azul-oscuro hover:bg-azul-medio text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
