/**
 * Servicio de envío de correos vía EmailJS.
 * Carga el SDK desde CDN y expone una interfaz simple.
 */

import EMAILJS_CONFIG from '../config/emailjs.js';

let emailjsLoading = false;
let emailjsPromise = null;

/**
 * Carga el SDK de EmailJS desde CDN.
 */
async function loadEmailJS() {
  if (typeof window !== 'undefined' && window.emailjs) {
    return window.emailjs;
  }

  if (emailjsLoading) return emailjsPromise;

  emailjsLoading = true;
  emailjsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      emailjsReady = true;
      emailjsLoading = false;
      resolve(window.emailjs);
    };
    script.onerror = () => {
      emailjsLoading = false;
      emailjsPromise = null;
      reject(new Error('No se pudo cargar EmailJS SDK'));
    };
    document.head.appendChild(script);
  });

  return emailjsPromise;
}

/**
 * Envía el derecho de petición por correo usando EmailJS.
 *
 * @param {Object} params
 * @param {string} params.toEmail - Correo de la entidad destinataria
 * @param {string} params.toName - Nombre de la entidad
 * @param {string} params.subject - Asunto del correo
 * @param {string} params.body - Cuerpo del derecho de petición (texto completo)
 * @param {string} params.radicado - Código de radicado generado
 * @param {string} params.userName - Nombre del ciudadano
 * @param {string} params.userEmail - Correo del ciudadano
 * @param {string} params.userCC - Cédula del ciudadano
 *
 * @returns {{ success: boolean, message: string }}
 */
export async function enviarDerechoPeticion({
  toEmail,
  toName,
  subject,
  body,
  radicado,
  userName,
  userEmail,
  userCC,
}) {
  if (!EMAILJS_CONFIG.enabled) {
    return {
      success: false,
      message:
        'EmailJS no está configurado. El documento se generó pero no se envió por correo.\n\n' +
        'Para activar el envío real, configurá las credenciales en src/config/emailjs.js',
    };
  }

  try {
    const emailjs = await loadEmailJS();
    emailjs.init(EMAILJS_CONFIG.publicKey);

    const templateParams = {
      to_email: toEmail,
      to_name: toName,
      subject: subject,
      petition_body: body,
      radicado: radicado,
      user_name: userName,
      user_email: userEmail,
      user_cc: userCC,
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    return {
      success: true,
      message: `✅ Derecho de petición enviado exitosamente a ${toName} (${toEmail}).`,
    };
  } catch (err) {
    // Si es error de configuración (template no existe, etc.)
    if (err?.text?.includes?.('template') || err?.status === 404) {
      return {
        success: false,
        message:
          `⚠️ Error de configuración EmailJS: el template no se encontró.\n\n` +
          `Verificá que el TEMPLATE_ID en src/config/emailjs.js sea correcto.\n` +
          `El documento se generó (radicado: ${radicado}) pero no se envió.`,
      };
    }

    return {
      success: false,
      message:
        `⚠️ No se pudo enviar el correo: ${err?.text || err?.message || 'Error desconocido'}.\n\n` +
        `El documento se generó (radicado: ${radicado}) y queda guardado en Mis Peticiones.`,
    };
  }
}

/**
 * Verifica si EmailJS está configurado y listo.
 */
export function isEmailJSConfigured() {
  return EMAILJS_CONFIG.enabled;
}
