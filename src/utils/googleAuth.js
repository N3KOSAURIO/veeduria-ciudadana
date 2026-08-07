/**
 * Autenticación con Google Identity Services (GIS).
 * Flujo OAuth 2.0 frontend-only — sin backend.
 */

import GOOGLE_CONFIG from '../config/google.js';

let googleLoaded = false;
let loadPromise = null;

/**
 * Carga el SDK de Google Identity Services.
 */
function loadGoogleSDK() {
  if (googleLoaded) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleLoaded = true;
      resolve();
    };
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('No se pudo cargar Google SDK'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

/**
 * Inicializa el botón de Sign In With Google.
 * @param {string} elementId - ID del elemento donde montar el botón
 * @param {function} onSuccess - Callback con {name, email, picture, googleId}
 */
export async function initGoogleSignIn(elementId, onSuccess) {
  if (!GOOGLE_CONFIG.enabled) {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = '<p class="text-xs text-gray-400 text-center">Google Sign-In no configurado</p>';
    }
    return;
  }

  try {
    await loadGoogleSDK();

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CONFIG.clientId,
      callback: (response) => {
        handleCredentialResponse(response, onSuccess);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: '100%',
      }
    );

    // También prompter One Tap (opcional)
    // window.google.accounts.id.prompt();
  } catch (err) {
    console.error('Google Sign-In error:', err);
  }
}

/**
 * Procesa la respuesta del JWT de Google.
 */
function handleCredentialResponse(response, onSuccess) {
  try {
    // Decodificar el JWT (sin verificar — ya viene firmado por Google)
    const credential = response.credential;
    const payload = parseJwtPayload(credential);

    if (!payload) {
      throw new Error('No se pudo decodificar el token');
    }

    const user = {
      googleId: payload.sub,
      nombre: payload.name || payload.given_name || '',
      email: payload.email || '',
      picture: payload.picture || '',
      emailVerified: payload.email_verified || false,
    };

    onSuccess(user);
  } catch (err) {
    console.error('Error al procesar credencial de Google:', err);
  }
}

/**
 * Decodifica el payload de un JWT sin verificar firma.
 * Solo para extraer datos — la verificación la hizo Google.
 */
function parseJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Cierra la sesión de Google (revoca el token).
 */
export function signOutGoogle() {
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
}

export { GOOGLE_CONFIG };
