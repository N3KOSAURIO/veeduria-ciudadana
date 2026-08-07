/**
 * Configuración de Google Identity Services para Sign-In.
 *
 * Para activar:
 * 1. Ir a https://console.cloud.google.com/apis/credentials
 * 2. Crear proyecto > OAuth consent screen (External)
 * 3. Crear credencial OAuth 2.0 Client ID > Web application
 * 4. Agregar origins autorizados:
 *    - http://localhost:5173 (dev)
 *    - https://veeduria-ciudadana.vercel.app (prod)
 * 5. Copiar el Client ID acá abajo.
 */

const GOOGLE_CONFIG = {
  clientId: 'TU_GOOGLE_CLIENT_ID',       // Google Cloud Console → Credentials → OAuth 2.0 Client ID
  enabled: false,                         // Cambiar a true cuando tengas el Client ID
};

export default GOOGLE_CONFIG;
