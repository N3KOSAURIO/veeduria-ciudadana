/**
 * Servicio de import/export Excel.
 * Usa SheetJS (xlsx) vía lazy-load para no inflar el bundle principal.
 *
 * Solo se carga cuando el admin exporta/importa datos.
 */

let _XLSX = null;

async function getXLSX() {
  if (_XLSX) return _XLSX;
  _XLSX = await import('xlsx');
  return _XLSX;
}

/**
 * Exporta un array de objetos a un archivo Excel y lo descarga.
 *
 * @param {Object[]} data - Array de objetos (cada objeto = una fila)
 * @param {string} filename - Nombre del archivo (sin extensión)
 * @param {string} sheetName - Nombre de la hoja
 */
export async function exportToExcel(data, filename = 'export', sheetName = 'Datos') {
  if (!data || data.length === 0) {
    console.warn('exportToExcel: datos vacíos, no se generó archivo.');
    return;
  }

  const XLSX = await getXLSX();
  const ws = XLSX.utils.json_to_sheet(data);

  // Auto-ajustar ancho de columnas
  const colWidths = Object.keys(data[0]).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...data.map((row) => String(row[key] || '').length)
    );
    return { wch: Math.min(maxLen + 2, 40) };
  });
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, `${filename}.xlsx`);
}

/**
 * Exporta clientes a Excel con columnas formateadas.
 */
export async function exportClients(clients) {
  const data = clients.map((c) => ({
    ID: c.id,
    Nombre: c.nombre,
    Email: c.email,
    Plan: c.plan === 'gratis' ? 'Ciudadano' : c.plan === 'pro' ? 'Pro' : 'Premium',
    Ciudad: c.ciudad,
    'Fecha Registro': c.fechaRegistro,
    'Valor Pagado (COP)': c.valorPagado || 0,
    Consultas: c.consultasRealizadas || 0,
  }));

  await exportToExcel(data, `veeduria-clientes-${fechaISO()}`, 'Clientes');
}

/**
 * Exporta pagos a Excel con columnas formateadas.
 */
export async function exportPayments(payments) {
  const data = payments.map((p) => ({
    Factura: p.factura,
    Cliente: p.cliente,
    'Monto (COP)': p.monto,
    Método: p.metodo,
    Fecha: p.fecha,
  }));

  await exportToExcel(data, `veeduria-pagos-${fechaISO()}`, 'Pagos');
}

/**
 * Exporta el dashboard 3E completo (24 leyes + plan de acción + datos).
 * Formato compatible con el template del cliente.
 *
 * @param {Object} params
 * @param {Object} params.indice3E - Resultado de calcular3E()
 * @param {Object[]} params.leyes - Array de leyes aplicables
 * @param {Object[]} params.planAccion - Plan de acción generado
 */
export async function exportDashboard3E({ indice3E, leyes = [], planAccion = [] }) {
  const XLSX = await getXLSX();
  const wb = XLSX.utils.book_new();

  // Hoja 1: Datos del Índice 3E
  const datos3E = [
    { Indicador: 'Eficiencia', Calificación: indice3E?.eficiencia || 0 },
    { Indicador: 'Eficacia', Calificación: indice3E?.eficacia || 0 },
    { Indicador: 'Efectividad', Calificación: indice3E?.efectividad || 0 },
    { Indicador: 'ÍNDICE 3E', Calificación: indice3E?.indice || 0 },
    { Indicador: 'Nivel', Calificación: indice3E?.nivel || '—' },
  ];
  const ws1 = XLSX.utils.json_to_sheet(datos3E);
  XLSX.utils.book_append_sheet(wb, ws1, 'Índice 3E');

  // Hoja 2: Leyes
  if (leyes.length > 0) {
    const ws2 = XLSX.utils.json_to_sheet(leyes);
    XLSX.utils.book_append_sheet(wb, ws2, '24 Leyes');
  }

  // Hoja 3: Plan de Acción
  if (planAccion.length > 0) {
    const ws3 = XLSX.utils.json_to_sheet(planAccion);
    XLSX.utils.book_append_sheet(wb, ws3, 'Plan de Acción');
  }

  XLSX.writeFile(wb, `veeduria-dashboard-3e-${fechaISO()}.xlsx`);
}

/**
 * Lee un archivo Excel y devuelve un array de objetos.
 *
 * @param {File} file - Archivo de input type="file"
 * @returns {Promise<Object[]>} Array de objetos (primera hoja)
 */
export async function importFromExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const XLSX = await getXLSX();
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws);
        resolve(json);
      } catch (err) {
        reject(new Error('No se pudo leer el archivo Excel: ' + err.message));
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo.'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Importa datos desde el formulario de participación ciudadana
 * (template de 3 hojas del cliente).
 *
 * @param {File} file
 * @returns {Promise<{leyes: Object[], planAccion: Object[], datos: Object[]}>}
 */
export async function importFormularioParticipacion(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const XLSX = await getXLSX();
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        resolve({
          leyes: wb.SheetNames[1]
            ? XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]])
            : [],
          planAccion: wb.SheetNames[2]
            ? XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]])
            : [],
          datos: XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]),
        });
      } catch (err) {
        reject(new Error('No se pudo leer el formulario: ' + err.message));
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo.'));
    reader.readAsArrayBuffer(file);
  });
}

function fechaISO() {
  return new Date().toISOString().split('T')[0];
}
