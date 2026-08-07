const QUICK_ACTIONS = [
  { id: '01', emoji: '🏗️', label: 'Veo una obra en la calle', query: 'Veo una obra en construcción en la calle' },
  { id: '08', emoji: '📋', label: 'Quiero auditar un contrato', query: 'Quiero auditar un contrato público' },
  { id: '04', emoji: '⚖️', label: 'Conocer mis derechos', query: 'Soy ciudadano, ¿qué derechos tengo para vigilar?' },
];

export default function QuickActions({ onSelect }) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.id}
          onClick={() => onSelect(action.query)}
          className="flex items-center gap-3 px-4 py-2.5 bg-azul-claro hover:bg-blue-100 border border-blue-200 rounded-xl text-sm text-azul-oscuro font-medium transition-colors text-left"
        >
          <span className="text-lg">{action.emoji}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
}
