export default function Header({ showClose = false, onClose }) {
  return (
    <header className="bg-azul-oscuro text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🏛️</span>
        <div>
          <h1 className="text-lg font-bold leading-tight">Veeduría Ciudadana</h1>
          <p className="text-xs text-blue-200">Tu herramienta de control social</p>
        </div>
      </div>
      {showClose && (
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-xl font-bold px-2"
          title="Cerrar chat"
        >
          ✕
        </button>
      )}
    </header>
  );
}
