/**
 * Servicio de autenticación — abstrae localStorage para futuro swap por JWT/API.
 * Única fuente de verdad para login, registro, sesión.
 */

const USERS_KEY = 'veeduria_users';
const SESSION_KEY = 'veeduria_user';

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

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function seedAdmin() {
  const users = getUsers();
  if (!users.find(u => u.email === SEED_ADMIN.email)) {
    users.push(SEED_ADMIN);
    saveUsers(users);
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

export function initAuth() {
  seedAdmin();
}

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed.email && parsed.nombre) return parsed;
  } catch (e) {
    localStorage.removeItem(SESSION_KEY);
  }
  return null;
}

export function login(email, password) {
  const users = getUsers();
  const found = users.find(u => u.email === email);

  if (!found) {
    return { success: false, error: 'Correo no registrado. ¿Querés crear una cuenta?' };
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
  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Este correo ya está registrado. Iniciá sesión.' };
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
  users.push(newUser);
  saveUsers(users);

  const sessionUser = toSessionUser(newUser);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

export function googleLogin({ nombre, email, picture }) {
  const users = getUsers();
  let found = users.find(u => u.email === email);

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
    users.push(found);
    saveUsers(users);
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

  const updated = { ...stored, ...updates };
  localStorage.setItem(SESSION_KEY, JSON.stringify(updated));

  const users = getUsers();
  const idx = users.findIndex(u => u.email === stored.email);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
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
