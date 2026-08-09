import { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import ChatBubble from '../../components/ChatBubble.jsx';
import QuickActions from '../../components/QuickActions.jsx';
import FileUpload from '../../components/FileUpload.jsx';
import PetitionFlow from '../../components/PetitionFlow.jsx';
import VoiceInput from '../../components/VoiceInput.jsx';
import { processQuery } from '../../utils/chatEngine.js';
import { analyzeFile } from '../../utils/fileAnalyzer.js';

const MENSAJE_INICIAL = {
  sender: 'bot',
  text: '¡Hola! Soy tu asistente de veeduría ciudadana. ¿En qué puedo ayudarte?\n\nPuedes consultarme sobre obras, contratos y derechos. También puedes adjuntarme archivos para analizar o **radicar un derecho de petición**.',
  showQuickActions: true,
};

export default function Chat({ onNavigate, onDerivar }) {
  const { user, incrementConsultas } = useUser();
  const [messages, setMessages] = useState([MENSAJE_INICIAL]);
  const [input, setInput] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(null);
  const [mode, setMode] = useState('chat'); // 'chat' | 'petition'
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, mode]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const checkLimit = () => {
    if (user?.plan === 'gratis' && (user?.consultasRealizadas || 0) >= 5) {
      const limitMsg = {
        sender: 'bot',
        text: '⚠️ Alcanzaste el límite de 5 consultas del plan gratuito.\n\nPara seguir consultando, subí al plan Pro con consultas ILIMITADAS, informes detallados y asesoría personalizada.',
        showUpgrade: true,
      };
      setMessages(prev => [...prev, limitMsg]);
      return true;
    }
    return false;
  };

  const addMessages = (msgs) => {
    setMessages(prev => [...prev, ...msgs]);
  };

  const handleSend = (texto) => {
    const query = texto || input.trim();
    if (!query) return;
    if (checkLimit()) return;

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

  const handleStartPetition = () => {
    if (checkLimit()) return;
    setShowQuickActions(false);
    setMode('petition');
    addMessages([
      { sender: 'bot', text: '✍️ Vamos a crear tu **derecho de petición**. Te voy a guiar paso a paso.\n\n**Ley 1755 de 2015** — Derecho fundamental de petición.' },
    ]);
  };

  const handlePetitionDone = (target) => {
    setMode('chat');
    if (target === 'mis-peticiones') {
      onNavigate('mis-peticiones');
    }
  };

  const handleFileSelect = async (file) => {
    if (checkLimit()) return;

    setShowQuickActions(false);
    setUploadingFile(file);

    const fileTypeEmoji = getFileEmoji(file);
    const userMsg = {
      sender: 'user',
      text: `${fileTypeEmoji} ${file.name} (${formatBytes(file.size)})`,
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const analysis = await analyzeFile(file);

      if (analysis.error) {
        const errorMsg = {
          sender: 'bot',
          text: `❌ No pude analizar el archivo: ${analysis.error}`,
        };
        setMessages(prev => [...prev, errorMsg]);
      } else {
        const botMsg = {
          sender: 'bot',
          text: analysis.summary,
          attachment: analysis.type === 'image'
            ? { type: 'image', dataUrl: analysis.dataUrl, name: analysis.name }
            : analysis.type === 'video'
              ? { type: 'video', thumbnailUrl: analysis.thumbnailUrl, name: analysis.name }
              : analysis.type === 'audio'
                ? { type: 'audio', name: analysis.name, durationFormatted: analysis.durationFormatted }
                : analysis.type === 'pdf'
                  ? { type: 'pdf', name: analysis.name }
                  : null,
        };
        setMessages(prev => [...prev, botMsg]);

        // Si es PDF con texto, también procesar contra el chatbot
        if (analysis.type === 'pdf' && analysis.fullText) {
          const chatResult = processQuery(analysis.fullText.substring(0, 500));
          if (chatResult.id && chatResult.id !== '00') {
            setMessages(prev => [
              ...prev,
              {
                sender: 'bot',
                text: `🔍 Analizando el contenido del documento, encontré información relevante:\n\n${chatResult.respuesta}`,
                flowId: chatResult.id,
              },
            ]);
            if (chatResult.derivacion) {
              setMessages(prev => [
                ...prev,
                {
                  sender: 'bot',
                  text: `📋 ${chatResult.derivacion}`,
                  isDerivacion: true,
                  flowId: chatResult.id,
                },
              ]);
            }
          }

          // Preguntar si quiere generar derecho de petición con el contenido del PDF
          setMessages(prev => [
            ...prev,
            {
              sender: 'bot',
              text: '📄 ¿Querés generar un **derecho de petición** basado en este documento?',
              offerPetition: true,
            },
          ]);
        }

        // Si es imagen con texto OCR, procesar contra el chatbot
        if (analysis.type === 'image' && analysis.ocrText) {
          const chatResult = processQuery(analysis.ocrText.substring(0, 500));
          if (chatResult.id && chatResult.id !== '00') {
            setMessages(prev => [
              ...prev,
              {
                sender: 'bot',
                text: `🔍 Detecté texto en la imagen y encontré información relevante:\n\n${chatResult.respuesta}`,
                flowId: chatResult.id,
              },
            ]);
            if (chatResult.derivacion) {
              setMessages(prev => [
                ...prev,
                {
                  sender: 'bot',
                  text: `📋 ${chatResult.derivacion}`,
                  isDerivacion: true,
                  flowId: chatResult.id,
                },
              ]);
            }
          }
        }
      }

      incrementConsultas();
    } catch (err) {
      const errorMsg = {
        sender: 'bot',
        text: `❌ Error inesperado al analizar el archivo: ${err.message}`,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      setUploadingFile(null);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isInputDisabled = isTyping || (user?.plan === 'gratis' && (user?.consultasRealizadas || 0) >= 5);

  // ===== PETITION MODE =====
  if (mode === 'petition') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg">
        <Header showClose onClose={() => setMode('chat')}>
          <button
            onClick={() => setMode('chat')}
            className="text-xs text-blue-200 hover:text-white"
          >
            ← Cancelar
          </button>
        </Header>

        <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 max-w-3xl mx-auto w-full" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {messages.map((msg, i) => (
            <div key={i}>
              <ChatBubble sender={msg.sender}>
                {msg.text}
              </ChatBubble>
            </div>
          ))}

          <PetitionFlow
            onDone={handlePetitionDone}
            user={user}
            onAddMessages={addMessages}
            city={user?.ciudad}
          />

          <div ref={chatEndRef} />
        </div>
      </div>
    );
  }

  // ===== CHAT MODE =====
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg">
      <Header showClose onClose={() => onNavigate(user?.isAdmin ? 'dashboard' : 'perfil')}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(user?.isAdmin ? 'dashboard' : 'perfil')}
            className="text-sm text-blue-200 hover:text-white px-1"
            title={user?.isAdmin ? 'Panel' : 'Perfil'}
          >
            {user?.isAdmin ? '📊' : '👤'}
          </button>
          <button
            onClick={() => onNavigate('mis-peticiones')}
            className="text-sm text-yellow-200 hover:text-white px-1"
            title="Mis Peticiones"
          >
            📋
          </button>
        </div>
      </Header>

      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 max-w-3xl mx-auto w-full" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatBubble
              sender={msg.sender}
              isDerivacion={msg.isDerivacion}
              attachment={msg.attachment}
            >
              {msg.text}
            </ChatBubble>
            {msg.showQuickActions && showQuickActions && (
              <div className="ml-0 -mt-2 mb-4">
                <QuickActions onSelect={(query) => handleSend(query)} />
                <button
                  onClick={handleStartPetition}
                  className="flex items-center gap-3 px-4 py-2.5 mt-2 bg-yellow-50 hover:bg-yellow-100 border border-dorado rounded-xl text-sm text-azul-oscuro font-medium transition-colors text-left w-full"
                >
                  <span className="text-lg">✍️</span>
                  Radicar derecho de petición
                </button>
              </div>
            )}
            {msg.isDerivacion && (
              <div className="flex justify-start -mt-2 mb-4 ml-0">
                <button
                  onClick={() => onDerivar(msg.flowId)}
                  className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  Sí, generar derecho de petición →
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
            {msg.offerPetition && (
              <div className="flex justify-start -mt-2 mb-4 ml-0">
                <button
                  onClick={handleStartPetition}
                  className="px-4 py-2 bg-dorado hover:bg-dorado-hover text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  ✍️ Sí, generar derecho de petición →
                </button>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              {uploadingFile ? (
                <span className="text-sm text-gray-500">
                  Analizando {uploadingFile.name}...
                </span>
              ) : (
                <span className="inline-flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              )}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface px-4 py-3">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <FileUpload onFileSelect={handleFileSelect} disabled={isInputDisabled} />
          <VoiceInput onText={(text) => handleSend(text)} disabled={isInputDisabled} />

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              user?.plan === 'gratis' && (user?.consultasRealizadas || 0) >= 5
                ? 'Límite alcanzado — subí de plan para seguir'
                : 'Escribe tu consulta o adjunta un archivo...'
            }
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl text-sm text-gray-900 dark:text-dark-text bg-white dark:bg-dark-bg placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-azul-medio focus:border-transparent"
            disabled={isInputDisabled}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isInputDisabled}
            className="px-5 py-2.5 bg-azul-oscuro hover:bg-azul-medio text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

function getFileEmoji(file) {
  if (file.type.startsWith('image/')) return '🖼️';
  if (file.type === 'application/pdf') return '📄';
  if (file.type.startsWith('audio/')) return '🎵';
  if (file.type.startsWith('video/')) return '🎬';
  return '📁';
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
