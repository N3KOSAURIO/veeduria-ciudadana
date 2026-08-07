/**
 * Analiza archivos subidos por el usuario:
 * - Imágenes: dimensiones, formato, tamaño, colores predominantes
 * - PDFs: extrae texto (pdf.js CDN), cuenta páginas
 * - Audio: duración, metadatos
 * - Video: duración, dimensiones, thumbnail
 */

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfjsLib = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PDFJS_CDN;
    script.onload = () => {
      pdfjsLib = window.pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
      resolve(pdfjsLib);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Obtiene colores predominantes de una imagen (promedio por cuadrantes)
 */
function getDominantColors(img) {
  const canvas = document.createElement('canvas');
  const size = 100; // thumbnail para análisis rápido
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const pixels = imageData.data;

  // Dividir en 4 cuadrantes y sacar color promedio de cada uno
  const quadrants = [
    { r: 0, g: 0, b: 0, count: 0 }, // top-left
    { r: 0, g: 0, b: 0, count: 0 }, // top-right
    { r: 0, g: 0, b: 0, count: 0 }, // bottom-left
    { r: 0, g: 0, b: 0, count: 0 }, // bottom-right
  ];

  const half = Math.floor(size / 2);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      const qx = x < half ? 0 : 1;
      const qy = y < half ? 0 : 1;
      const q = qy * 2 + qx;

      quadrants[q].r += r;
      quadrants[q].g += g;
      quadrants[q].b += b;
      quadrants[q].count++;
    }
  }

  return quadrants.map((q) => {
    const r = Math.round(q.r / q.count);
    const g = Math.round(q.g / q.count);
    const b = Math.round(q.b / q.count);
    return { r, g, b, hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}` };
  });
}

/**
 * Ejecuta OCR sobre la imagen usando Tesseract.js.
 * Devuelve el texto extraído o null si falla / no hay texto significativo.
 */
async function extractTextFromImage(file) {
  try {
    // Carga diferida de Tesseract para no pesar el bundle inicial
    const Tesseract = (await import('tesseract.js')).default;
    const { data } = await Tesseract.recognize(file, 'spa', {
      logger: () => {}, // silencioso
    });
    const text = (data.text || '').trim();
    // Solo devolver si hay al menos 10 caracteres de texto
    return text.length >= 10 ? text : null;
  } catch (err) {
    console.warn('OCR falló:', err.message);
    return null; // fallback silencioso — seguimos sin OCR
  }
}

/**
 * Analiza un archivo de imagen (metadatos + OCR opcional)
 */
async function analyzeImage(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      const colors = getDominantColors(img);

      // Intentar OCR en paralelo (no bloquea la respuesta)
      const ocrPromise = extractTextFromImage(file).catch(() => null);

      const baseSummary = `📷 **${file.name}**\n` +
        `• Dimensiones: ${img.naturalWidth}×${img.naturalHeight}px\n` +
        `• Formato: ${file.type || 'desconocido'}\n` +
        `• Tamaño: ${formatBytes(file.size)}\n` +
        `• Relación de aspecto: ${(img.naturalWidth / img.naturalHeight).toFixed(2)}:1\n` +
        `• Colores predominantes: ${colors.map(c => c.hex).join(', ')}`;

      // Esperar OCR
      const ocrText = await ocrPromise;

      let summary = baseSummary;
      if (ocrText) {
        const preview = ocrText.length > 300 ? ocrText.substring(0, 300) + '...' : ocrText;
        summary += `\n\n📝 **Texto detectado (OCR):**\n${preview}`;
      }

      URL.revokeObjectURL(url);
      resolve({
        type: 'image',
        name: file.name,
        size: file.size,
        format: file.type,
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: (img.naturalWidth / img.naturalHeight).toFixed(2),
        dominantColors: colors,
        dataUrl: url,
        ocrText: ocrText || null,
        summary,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        type: 'image',
        name: file.name,
        error: 'No se pudo cargar la imagen.',
      });
    };
    img.src = url;
  });
}

/**
 * Analiza un archivo PDF (extrae texto)
 */
async function analyzePdf(file) {
  try {
    await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const numPages = pdf.numPages;
    const textPromises = [];
    const maxPages = Math.min(numPages, 5); // primeras 5 páginas

    for (let i = 1; i <= maxPages; i++) {
      textPromises.push(
        pdf.getPage(i).then((page) =>
          page.getTextContent().then((tc) =>
            tc.items.map((item) => item.str).join(' ')
          )
        )
      );
    }

    const pageTexts = await Promise.all(textPromises);
    const fullText = pageTexts.join('\n\n--- página ---\n\n');
    const preview = fullText.substring(0, 1500);

    return {
      type: 'pdf',
      name: file.name,
      size: file.size,
      pages: numPages,
      textPreview: preview,
      fullText: fullText.length > 1500 ? fullText : preview,
      summary: `📄 **${file.name}**\n` +
        `• Páginas: ${numPages}\n` +
        `• Tamaño: ${formatBytes(file.size)}\n` +
        `• Texto extraído (vista previa):\n\n${preview}${fullText.length > 1500 ? '\n\n_(texto truncado — primeras 5 páginas)_' : ''}`,
    };
  } catch (err) {
    return {
      type: 'pdf',
      name: file.name,
      error: `Error al leer PDF: ${err.message}`,
    };
  }
}

/**
 * Analiza un archivo de audio
 */
async function analyzeAudio(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio();
    let resolved = false;

    audio.addEventListener('loadedmetadata', () => {
      if (resolved) return;
      resolved = true;

      const duration = audio.duration;
      const mins = Math.floor(duration / 60);
      const secs = Math.floor(duration % 60);

      // Intentar obtener bitrate
      const bitrate = file.size / duration;
      const estimatedKbps = Math.round(bitrate * 8 / 1000);

      URL.revokeObjectURL(url);
      resolve({
        type: 'audio',
        name: file.name,
        size: file.size,
        duration: duration,
        durationFormatted: `${mins}:${secs.toString().padStart(2, '0')}`,
        format: file.type || 'audio',
        estimatedBitrate: estimatedKbps,
        summary: `🎵 **${file.name}**\n` +
          `• Duración: ${mins}:${secs.toString().padStart(2, '0')}\n` +
          `• Formato: ${file.type || 'desconocido'}\n` +
          `• Tamaño: ${formatBytes(file.size)}\n` +
          `• Bitrate estimado: ~${estimatedKbps} kbps`,
      });
    });

    audio.addEventListener('error', () => {
      if (resolved) return;
      resolved = true;
      URL.revokeObjectURL(url);
      resolve({
        type: 'audio',
        name: file.name,
        error: 'No se pudo leer el audio.',
      });
    });

    // Timeout de seguridad
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        URL.revokeObjectURL(url);
        resolve({
          type: 'audio',
          name: file.name,
          error: 'Tiempo de espera agotado al leer audio.',
        });
      }
    }, 10000);

    audio.src = url;
    audio.load();
  });
}

/**
 * Analiza un archivo de video (genera thumbnail)
 */
async function analyzeVideo(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    let resolved = false;

    video.addEventListener('loadedmetadata', () => {
      if (resolved) return;

      // Generar thumbnail al frame 1 segundo
      video.currentTime = Math.min(1, video.duration * 0.1);
    });

    video.addEventListener('seeked', () => {
      if (resolved) return;
      resolved = true;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);

      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);

      URL.revokeObjectURL(url);
      resolve({
        type: 'video',
        name: file.name,
        size: file.size,
        duration: duration,
        durationFormatted: `${mins}:${secs.toString().padStart(2, '0')}`,
        width: video.videoWidth,
        height: video.videoHeight,
        format: file.type || 'video',
        thumbnailUrl,
        summary: `🎬 **${file.name}**\n` +
          `• Duración: ${mins}:${secs.toString().padStart(2, '0')}\n` +
          `• Dimensiones: ${video.videoWidth}×${video.videoHeight}px\n` +
          `• Formato: ${file.type || 'desconocido'}\n` +
          `• Tamaño: ${formatBytes(file.size)}`,
      });
    });

    video.addEventListener('error', () => {
      if (resolved) return;
      resolved = true;
      URL.revokeObjectURL(url);
      resolve({
        type: 'video',
        name: file.name,
        error: 'No se pudo leer el video.',
      });
    });

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        URL.revokeObjectURL(url);
        resolve({
          type: 'video',
          name: file.name,
          error: 'Tiempo de espera agotado al leer video.',
        });
      }
    }, 15000);

    video.src = url;
    video.load();
  });
}

/**
 * Analiza cualquier archivo soportado
 */
export async function analyzeFile(file) {
  const type = file.type;
  const extension = file.name.split('.').pop().toLowerCase();

  if (type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
    return analyzeImage(file);
  }

  if (type === 'application/pdf' || extension === 'pdf') {
    return analyzePdf(file);
  }

  if (type.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'oga', 'm4a', 'flac', 'aac'].includes(extension)) {
    return analyzeAudio(file);
  }

  if (type.startsWith('video/') || ['mp4', 'webm', 'mkv', 'avi', 'mov', 'ogv'].includes(extension)) {
    return analyzeVideo(file);
  }

  return {
    type: 'unknown',
    name: file.name,
    error: `Tipo de archivo no soportado: ${type || extension}`,
  };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export { formatBytes };
