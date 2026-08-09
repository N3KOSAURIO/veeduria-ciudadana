export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-azul-oscuro text-white py-6 px-4 mt-auto">
      <div className="max-w-5xl mx-auto">
        {/* Links legales */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm mb-4">
          <button
            onClick={() => onNavigate && onNavigate('terminos')}
            className="text-blue-200 hover:text-white transition-colors font-medium"
          >
            Términos
          </button>
          <span className="text-blue-300 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate && onNavigate('privacidad')}
            className="text-blue-200 hover:text-white transition-colors font-medium"
          >
            Privacidad
          </button>
          <span className="text-blue-300 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate && onNavigate('cookies')}
            className="text-blue-200 hover:text-white transition-colors font-medium"
          >
            Cookies
          </button>
          <span className="text-blue-300 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate && onNavigate('informacion')}
            className="text-blue-200 hover:text-white transition-colors font-medium"
          >
            Información
          </button>
        </div>

        {/* Separador */}
        <div className="border-t border-blue-900/50 w-32 mx-auto mb-4" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-blue-300/80">
            &copy; {year} Veeduría Ciudadana. Todos los derechos reservados.
          </p>
          <p className="text-xs text-blue-400/50 mt-1">
            República de Colombia — Herramienta digital de control social ciudadano
          </p>
        </div>
      </div>
    </footer>
  );
}
