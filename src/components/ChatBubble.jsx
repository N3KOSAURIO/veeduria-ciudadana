export default function ChatBubble({ sender, children, isDerivacion = false }) {
  const isBot = sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
          isBot
            ? isDerivacion
              ? 'bg-yellow-50 border border-dorado text-gray-800 rounded-tl-sm'
              : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
            : 'bg-azul-oscuro text-white rounded-tr-sm shadow-sm'
        }`}
      >
        {isBot && (
          <span className="inline-block mr-2 text-sm">🏛️</span>
        )}
        {children}
      </div>
    </div>
  );
}
