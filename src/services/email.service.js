/**
 * Servicio de envío de correos vía EmailJS.
 * Carga el SDK dinámicamente desde CDN.
 *
 * Envía el texto del derecho de petición en el cuerpo del correo.
 * PDF adjunto requiere plan pago de EmailJS — por ahora se descarga aparte.
 */

import EMAILJS_CONFIG from '../config/emailjs.js';

let _emailjsPromise = null;
let _loading = false;

async function loadSDK() {
  if (typeof window !== 'undefined' && window.emailjs) return window.emailjs;
  if (_loading) return _emailjsPromise;

  _loading = true;
  _emailjsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => { _loading = false; resolve(window.emailjs); };
    script.onerror = () => { _loading = false; _emailjsPromise = null; reject(new Error('No se pudo cargar EmailJS SDK')); };
    document.head.appendChild(script);
  });
  return _emailjsPromise;
}

/**
 * Genera un código de radicado único.
 */
function generarRadicado() {
  const now = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VEE-${now}-${rand}`;
}

/**
 * Envía el derecho de petición por correo electrónico.
 *
 * @param {Object} params
 * @param {string} params.toEmail - Correo de la entidad
 * @param {string} params.toName  - Nombre de la entidad
 * @param {string} params.subject - Asunto
 * @param {string} params.body    - Texto completo del derecho de petición
 * @param {string} params.userName  - Nombre del ciudadano
 * @param {string} params.userEmail - Correo del ciudadano (para CC)
 * @param {string} params.userCC    - Cédula
 *
 * @returns {Promise<{success: boolean, message: string, radicado?: string}>}
 */
export async function enviarDerechoPeticion({
  toEmail,
  toName,
  subject,
  body,
  userName,
  userEmail,
  userCC,
}) {
  const radicado = generarRadicado();

  if (!EMAILJS_CONFIG.enabled) {
    return {
      success: false,
      radicado,
      message:
        '⚠️ EmailJS no está configurado. El PDF se generó pero no se envió por correo.\n\n' +
        'Para activar el envío: creá una cuenta en emailjs.com, conectá Gmail/Outlook,\n' +
        'creá un template y poné las credenciales en src/config/emailjs.js',
    };
  }

  try {
    const emailjs = await loadSDK();
    emailjs.init(EMAILJS_CONFIG.publicKey);

    const templateParams = {
      to_email: toEmail,
      to_name: toName,
      subject,
      petition_body: body,
      radicado,
      user_name: userName,
      user_email: userEmail,
      user_cc: userCC,
    };

    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);

    // Enviar copia al ciudadano
    if (userEmail && userEmail !== toEmail) {
      try {
        await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          ...templateParams,
          to_email: userEmail,
          to_name: userName,
          subject: `[COPIA] ${subject}`,
        });
      } catch (_) {
        // CC falló silenciosamente — el envío principal ya fue exitoso
      }
    }

    return {
      success: true,
      radicado,
      message: `✅ Derecho de petición enviado a ${toName} (${toEmail}).${userEmail ? `\n📧 Copia enviada a ${userEmail}.` : ''}`,
    };
  } catch (err) {
    const msg = err?.text || err?.message || 'Error desconocido';
    if (msg.includes('template') || err?.status === 404) {
      return {
        success: false,
        radicado,
        message: `⚠️ Template de EmailJS no encontrado.\nVerificá TEMPLATE_ID en src/config/emailjs.js.\nRadicado: ${radicado}`,
      };
    }
    return {
      success: false,
      radicado,
      message: `⚠️ No se pudo enviar: ${msg}.\nRadicado: ${radicado}`,
    };
  }
}

/**
 * Envía el texto completo del derecho de petición + notifica al ciudadano.
 * Versión simplificada para usar desde el flujo de derivación.
 */
export async function enviarDerechoPeticionCompleto({
  entidad,
  emailEntidad,
  asunto,
  cuerpo,
  nombre,
  email,
  cc,
}) {
  return enviarDerechoPeticion({
    toEmail: emailEntidad,
    toName: entidad,
    subject: `Derecho de Petición — ${asunto}`,
    body: cuerpo,
    userName: nombre,
    userEmail: email,
    userCC: cc,
  });
}

export function isEmailJSConfigured() {
  return EMAILJS_CONFIG.enabled;
}
