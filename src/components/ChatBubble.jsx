export default function ChatBubble({ sender, children, isDerivacion = false, attachment }) {
  const isBot = sender === 'bot';

  const renderAttachment = () => {
    if (!attachment) return null;

    if (attachment.type === 'image' && attachment.dataUrl) {
      return (
        <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-border">
          <img
            src={attachment.dataUrl}
            alt={attachment.name}
            className="max-w-full max-h-64 object-contain bg-gray-100 dark:bg-dark-bg"
          />
        </div>
      );
    }

    if (attachment.type === 'video' && attachment.thumbnailUrl) {
      return (
        <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-border relative">
          <img
            src={attachment.thumbnailUrl}
            alt={attachment.name}
            className="max-w-full max-h-48 object-contain bg-black"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl drop-shadow-lg">▶️</span>
          </div>
        </div>
      );
    }

    if (attachment.type === 'audio') {
      return (
        <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-dark-text-secondary">
          <span className="text-2xl">🎵</span>
          <span className="text-sm">{attachment.name}</span>
          {attachment.durationFormatted && (
            <span className="text-xs text-gray-400 ml-auto">{attachment.durationFormatted}</span>
          )}
        </div>
      );
    }

    if (attachment.type === 'pdf' || attachment.type === 'unknown') {
      return (
        <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-dark-text-secondary">
          <span className="text-2xl">{attachment.type === 'pdf' ? '📄' : '📁'}</span>
          <span className="text-sm">{attachment.name}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
          isBot
            ? isDerivacion
              ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-dorado text-gray-800 dark:text-dark-text rounded-tl-sm'
              : 'bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-800 dark:text-dark-text rounded-tl-sm shadow-sm'
            : 'bg-azul-oscuro text-white rounded-tr-sm shadow-sm'
        }`}
      >
        {isBot && !attachment && (
          <span className="inline-block mr-2 text-sm">🏛️</span>
        )}
        {renderAttachment()}
        {children}
      </div>
    </div>
  );
}
