import { useState, useRef } from 'react';

const TIPOS_ACEPTADOS = 'image/*,.pdf,audio/*,video/*,.doc,.docx';
const TIPO_LABELS = {
  image: 'Imagen',
  pdf: 'PDF',
  audio: 'Audio',
  video: 'Video',
  unknown: 'Archivo',
};

export default function FileUpload({ onFileSelect, disabled }) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const MAX_SIZE = 50 * 1024 * 1024; // 50MB

  const validarArchivo = (file) => {
    if (file.size > MAX_SIZE) {
      return `El archivo excede el límite de 50MB.`;
    }
    // Verificar tipo
    const type = file.type;
    const ext = file.name.split('.').pop().toLowerCase();
    const validos = [
      'image', 'pdf', 'audio', 'video',
      'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp',
      'mp3', 'wav', 'ogg', 'oga', 'm4a', 'flac', 'aac', 'opus',
      'mp4', 'webm', 'mkv', 'avi', 'mov', 'ogv',
      'doc', 'docx',
    ];
    const esValido = type.startsWith('image/') || type.startsWith('audio/') || type.startsWith('video/') ||
      type === 'application/pdf' || validos.includes(ext);

    if (!esValido) {
      return `Tipo de archivo no soportado: ${type || ext}`;
    }
    return null;
  };

  const handleFile = (file) => {
    setError(null);
    const err = validarArchivo(file);
    if (err) {
      setError(err);
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={TIPOS_ACEPTADOS}
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        title="Adjuntar archivo (imagen, PDF, audio, video)"
        className={`p-2 rounded-xl transition-colors ${
          disabled
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-400 hover:text-azul-medio hover:bg-blue-50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
        onDrop={handleDrop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      </button>

      {dragOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 pointer-events-none">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl text-center">
            <span className="text-4xl">📎</span>
            <p className="mt-2 text-gray-700 font-medium">Soltá el archivo para analizarlo</p>
            <p className="text-xs text-gray-400 mt-1">Imagen · PDF · Audio · Video (máx. 50MB)</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-full mb-2 left-0 right-0">
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 text-center">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export { TIPO_LABELS };
