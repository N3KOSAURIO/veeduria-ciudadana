export default function Header({ showClose = false, onClose, children }) {
  return (
    <header className="bg-azul-oscuro text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-xl md:text-2xl">🏛️</span>
        <div>
          <h1 className="text-base md:text-lg font-bold leading-tight">Veeduría Ciudadana</h1>
          <p className="text-xs text-blue-200 hidden sm:block">Tu herramienta de control social</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {showClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl font-bold px-2"
            title="Cerrar"
          >
            ✕
          </button>
        )}
      </div>
    </header>
  );
}
