/**
 * Servicio de generación de PDF para documentos legales.
 * Usa jsPDF (carga diferida) para crear documentos formales listos para imprimir/radicar.
 *
 * jsPDF ~400KB — solo se carga cuando el usuario genera un PDF.
 */

import { generarDocumento, sugerirAsunto } from '../utils/petitionGenerator.js';

let _jsPDF = null;

async function getJsPDF() {
  if (_jsPDF) return _jsPDF;
  const mod = await import('jspdf');
  _jsPDF = mod.jsPDF;
  return _jsPDF;
}

/**
 * Genera un PDF profesional de Derecho de Petición.
 * Carga jsPDF dinámicamente en la primera llamada.
 *
 * @param {Object} params
 * @returns {Promise<Blob>} PDF como Blob listo para descargar
 */
export async function generarPDF(params) {
  const jsPDF = await getJsPDF();

  const {
    entidad,
    ciudad = 'Colombia',
    nombre,
    cc,
    email,
    telefono = '',
    direccion = '',
    asunto,
    descripcion,
    peticion,
    anexos = '',
  } = params;

  const fecha = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const doc = new jsPDF({ unit: 'mm', format: 'letter' });
  const margen = 25;
  const ancho = doc.internal.pageSize.getWidth() - margen * 2;
  let y = 30;

  function linea(texto, opts = {}) {
    const { size = 10, bold = false, align = 'left', color = [0, 0, 0] } = opts;
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');

    if (align === 'center') {
      doc.text(texto, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    } else if (align === 'right') {
      doc.text(texto, margen + ancho, y, { align: 'right' });
    } else {
      const lineas = doc.splitTextToSize(texto, ancho);
      lineas.forEach((l) => {
        if (y > 250) { doc.addPage(); y = 25; }
        doc.text(l, margen, y);
        y += size * 0.45;
      });
    }
    y += size * 0.3;
  }

  function separador() {
    y += 2;
    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(0.3);
    doc.line(margen, y, margen + ancho, y);
    y += 4;
  }

  // === ENCABEZADO ===
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Veeduría Ciudadana — Herramienta de Control Social', margen, 15);
  doc.text(`Generado: ${fecha}`, margen + ancho, 15, { align: 'right' });
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.5);
  doc.line(margen, 18, margen + ancho, 18);

  // === DESTINATARIO ===
  linea('SEÑORES', { size: 11, bold: true });
  linea(entidad.toUpperCase(), { size: 12, bold: true, color: [0, 51, 102] });
  linea('Atención al Ciudadano');
  linea(ciudad);
  y += 2;

  // === REFERENCIA ===
  separador();
  linea(`REF: DERECHO DE PETICIÓN — ${asunto}`, { size: 10, bold: true });
  linea('Artículo 23 de la Constitución Política de Colombia', { size: 8, color: [80, 80, 80] });
  linea('Ley 1755 de 2015', { size: 8, color: [80, 80, 80] });
  y += 2;

  // === CUERPO ===
  separador();
  linea(
    `${nombre.toUpperCase()}, mayor de edad, identificado(a) con cédula de ciudadanía No. ${cc} expedida en ${ciudad}, con domicilio en ${direccion || '[dirección del solicitante]'}, correo electrónico ${email}${telefono ? `, teléfono ${telefono}` : ''}, en ejercicio del derecho consagrado en el Artículo 23 de la Constitución Política de Colombia y reglamentado por la Ley 1755 de 2015, respetuosamente presento DERECHO DE PETICIÓN con base en los siguientes:`,
    { size: 10 }
  );
  y += 1;

  // === HECHOS ===
  separador();
  linea('HECHOS', { size: 11, bold: true, color: [0, 51, 102] });
  y += 1;
  linea(descripcion, { size: 10 });
  y += 1;

  // === OBJETO DE LA PETICIÓN ===
  separador();
  linea('OBJETO DE LA PETICIÓN', { size: 11, bold: true, color: [0, 51, 102] });
  y += 1;
  linea('Con fundamento en los hechos descritos, solicito:', { size: 10 });
  y += 1;
  linea(peticion, { size: 10 });
  y += 1;

  // === FUNDAMENTO JURÍDICO ===
  separador();
  linea('FUNDAMENTO JURÍDICO', { size: 11, bold: true, color: [0, 51, 102] });
  y += 1;
  linea('Fundamento esta petición en:', { size: 9 });
  linea('• Artículo 23 de la Constitución Política de Colombia: "Toda persona tiene derecho a presentar peticiones respetuosas a las autoridades por motivos de interés general o particular y a obtener pronta resolución."', { size: 8 });
  linea('• Ley 1755 de 2015, Artículo 13: El término para resolver es de quince (15) días hábiles siguientes a su recepción.', { size: 8 });
  linea('• Ley 1712 de 2014 (Ley de Transparencia y del Derecho de Acceso a la Información Pública Nacional).', { size: 8 });

  // === PRUEBAS Y ANEXOS ===
  if (anexos) {
    separador();
    linea('PRUEBAS Y ANEXOS', { size: 11, bold: true, color: [0, 51, 102] });
    y += 1;
    linea(anexos, { size: 9 });
  }

  // === NOTIFICACIONES ===
  separador();
  linea('NOTIFICACIONES', { size: 11, bold: true, color: [0, 51, 102] });
  y += 1;
  linea(`Recibiré notificaciones en el correo electrónico: ${email}`, { size: 9 });
  if (direccion) linea(`Dirección física: ${direccion}`, { size: 9 });
  if (telefono) linea(`Teléfono de contacto: ${telefono}`, { size: 9 });

  // === FIRMA ===
  y += 8;
  linea('Cordialmente,', { size: 10 });
  y += 8;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(margen, y, margen + 60, y);
  y += 5;
  linea(nombre, { size: 10, bold: true });
  linea(`C.C. No. ${cc}`, { size: 8 });
  linea(email, { size: 8 });

  // === PIE DE PÁGINA ===
  y += 5;
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`${ciudad}, ${fecha}`, margen, y);
  doc.text('Documento generado por Veeduría Ciudadana', margen + ancho, y, { align: 'right' });

  // === METADATOS ===
  doc.setProperties({
    title: `Derecho de Petición — ${asunto}`,
    subject: asunto,
    author: nombre,
    creator: 'Veeduría Ciudadana',
    keywords: 'derecho de petición, colombia, veeduria, ciudadana, ley 1755',
  });

  return doc.output('blob');
}

/**
 * Genera y descarga el PDF en el navegador.
 * Carga jsPDF dinámicamente en la primera llamada.
 */
export async function descargarPDF(params) {
  const blob = await generarPDF(params);
  const nombreArchivo = `Derecho_Peticion_${params.entidad.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return nombreArchivo;
}

export { sugerirAsunto };
