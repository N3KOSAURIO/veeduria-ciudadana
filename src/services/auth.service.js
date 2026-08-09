/**
 * Servicio de autenticación — abstrae localStorage para futuro swap por JWT/API.
 * Única fuente de verdad para login, registro, sesión.
 *
 * v1.1 — Usuarios en claves individuales (veeduria_db_<email>), NO en array expuesto.
 */

const DB_PREFIX = 'veeduria_db_';
const SESSION_KEY = 'veeduria_user';

/* ⚠️ DEMO ONLY — ELIMINAR al migrar a backend real.
   Credenciales hardcodeadas. No usar en producción.
   Ver plan: Veeduria-MIGRACION-BACKEND.md paso 6 */
const SEED_ADMIN = {
  nombre: 'Administrador',
  email: 'admin@veeduria.com',
  telefono: '3000000000',
  ciudad: 'Bogotá',
  password: 'admin123',
  plan: 'premium',
  fechaRegistro: '2025-01-01',
  consultasRealizadas: 999,
  isAdmin: true,
};

/* ── helpers internos ── */

function dbKey(email) {
  return DB_PREFIX + email.toLowerCase().trim();
}

function getUser(email) {
  try {
    const raw = localStorage.getItem(dbKey(email));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem(dbKey(user.email), JSON.stringify(user));
}

/** Solo para migrar datos viejos de veeduria_users → claves individuales */
function migrateOldUsers() {
  try {
    const old = localStorage.getItem('veeduria_users');
    if (!old) return;
    const users = JSON.parse(old);
    users.forEach(u => saveUser(u));
    localStorage.removeItem('veeduria_users');
  } catch { /* ignorar errores de migración */ }
}

function seedAdmin() {
  if (!getUser(SEED_ADMIN.email)) {
    saveUser(SEED_ADMIN);
  }
}

function toSessionUser(found) {
  return {
    nombre: found.nombre,
    email: found.email,
    telefono: found.telefono,
    ciudad: found.ciudad,
    plan: found.plan || 'gratis',
    fechaRegistro: found.fechaRegistro,
    consultasRealizadas: found.consultasRealizadas || 0,
    isAdmin: found.isAdmin || false,
    picture: found.picture || '',
    authProvider: found.authProvider || 'email',
  };
}

/* ── API pública ── */

export function initAuth() {
  migrateOldUsers();
  seedAdmin();
}

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed.email && parsed.nombre) return parsed;
  } catch {
    localStorage.removeItem(SESSION_KEY);
  }
  return null;
}

export function login(email, password) {
  const found = getUser(email);

  if (!found) {
    return { success: false, error: 'Correo no registrado. ¿Quieres crear una cuenta?' };
  }
  if (found.password !== password) {
    return { success: false, error: 'Contraseña incorrecta.' };
  }

  const sessionUser = toSessionUser(found);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

export function register(data) {
  const { nombre, email, telefono, ciudad, password } = data;

  if (getUser(email)) {
    return { success: false, error: 'Este correo ya está registrado. Inicia sesión.' };
  }

  const newUser = {
    nombre,
    email,
    telefono,
    ciudad,
    password,
    plan: 'gratis',
    fechaRegistro: new Date().toISOString().split('T')[0],
    consultasRealizadas: 0,
    isAdmin: false,
  };
  saveUser(newUser);

  const sessionUser = toSessionUser(newUser);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

export function googleLogin({ nombre, email, picture }) {
  let found = getUser(email);

  if (!found) {
    found = {
      nombre,
      email,
      telefono: '',
      ciudad: '',
      password: '',
      plan: 'gratis',
      fechaRegistro: new Date().toISOString().split('T')[0],
      consultasRealizadas: 0,
      isAdmin: false,
      authProvider: 'google',
      picture,
    };
    saveUser(found);
  }

  const sessionUser = toSessionUser(found);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateUser(updates) {
  const stored = getCurrentUser();
  if (!stored) return;

  // ⚠️ SEGURIDAD: solo campos de perfil, nunca isAdmin/plan/consultasRealizadas
  const ALLOWED = ['nombre', 'telefono', 'ciudad', 'picture'];
  const safe = {};
  for (const k of ALLOWED) {
    if (k in updates) safe[k] = updates[k];
  }

  const updated = { ...stored, ...safe };
  localStorage.setItem(SESSION_KEY, JSON.stringify(updated));

  const record = getUser(stored.email);
  if (record) {
    saveUser({ ...record, ...safe });
  }
  return updated;
}

export function updatePlan(plan) {
  return updateUser({ plan });
}

export function incrementConsultas() {
  const user = getCurrentUser();
  if (!user) return;
  const count = (user.consultasRealizadas || 0) + 1;
  return updateUser({ consultasRealizadas: count });
}
