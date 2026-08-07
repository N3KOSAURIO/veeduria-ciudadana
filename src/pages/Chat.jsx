import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
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
  const { user, incrementConsultas } = useUser();
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

    // Gratis limitado a 5 consultas
    if (user?.plan === 'gratis' && (user?.consultasRealizadas || 0) >= 5) {
      const limitMsg = {
        sender: 'bot',
        text: '⚠️ Alcanzaste el límite de 5 consultas del plan gratuito.\n\nPara seguir consultando, subí al plan Pro con consultas ILIMITADAS, informes detallados y asesoría personalizada.',
        showUpgrade: true,
      };
      setMessages(prev => [...prev, limitMsg]);
      return;
    }

    setShowQuickActions(false);

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resultado = processQuery(query);
      const botResponse = { sender: 'bot', text: resultado.respuesta, flowId: resultado.id };

      setMessages(prev => [...prev, botResponse]);

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

      incrementConsultas();
      setIsTyping(false);
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
      <Header showClose onClose={() => onNavigate('dashboard')}>
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs text-blue-200 hover:text-white"
        >
          ← Panel
        </button>
      </Header>

      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatBubble sender={msg.sender} isDerivacion={msg.isDerivacion}>
              {msg.text}
            </ChatBubble>
            {msg.showQuickActions && showQuickActions && (
              <div className="ml-0 -mt-2 mb-4">
                <QuickActions onSelect={(query) => handleSend(query)} />
              </div>
            )}
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
            {msg.showUpgrade && (
              <div className="flex justify-start -mt-2 mb-4 ml-0">
                <button
                  onClick={() => onNavigate('planes')}
                  className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  Ver planes →
                </button>
              </div>
            )}
          </div>
        ))}

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

      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              user?.plan === 'gratis' && (user?.consultasRealizadas || 0) >= 5
                ? 'Límite alcanzado — subí de plan para seguir'
                : 'Escribí tu consulta...'
            }
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-azul-medio focus:border-transparent"
            disabled={isTyping || (user?.plan === 'gratis' && (user?.consultasRealizadas || 0) >= 5)}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping || (user?.plan === 'gratis' && (user?.consultasRealizadas || 0) >= 5)}
            className="px-5 py-2.5 bg-azul-oscuro hover:bg-azul-medio text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
