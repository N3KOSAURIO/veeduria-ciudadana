/**
 * Configuración de EmailJS para envío de derechos de petición.
 *
 * Para activar el envío real:
 * 1. Creá cuenta gratuita en https://emailjs.com
 * 2. Conectá un servicio de email (Gmail, Outlook, etc.)
 * 3. Creá un template con estas variables:
 *    - {{to_email}}: destinatario (entidad)
 *    - {{to_name}}: nombre de la entidad
 *    - {{subject}}: asunto del derecho de petición
 *    - {{petition_body}}: cuerpo completo del documento
 *    - {{radicado}}: código de radicado
 *    - {{user_name}}: nombre del ciudadano
 *    - {{user_email}}: correo del ciudadano
 *    - {{user_cc}}: cédula
 * 4. Copiá las credenciales acá abajo.
 */

const EMAILJS_CONFIG = {
  publicKey: 'TU_PUBLIC_KEY',       // EmailJS → Account → API Keys
  serviceId: 'TU_SERVICE_ID',       // EmailJS → Email Services
  templateId: 'TU_TEMPLATE_ID',     // EmailJS → Email Templates
  enabled: false,                   // Cambiar a true cuando tengas las credenciales
};

export default EMAILJS_CONFIG;
