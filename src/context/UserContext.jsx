import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurar sesión al cargar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('veeduria_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email && parsed.nombre) {
          setUser(parsed);
        }
      }
    } catch (e) {
      localStorage.removeItem('veeduria_user');
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('veeduria_users') || '[]');
    const found = users.find(u => u.email === email);

    if (!found) {
      return { success: false, error: 'Correo no registrado. ¿Querés crear una cuenta?' };
    }
    if (found.password !== password) {
      return { success: false, error: 'Contraseña incorrecta.' };
    }

    const sessionUser = {
      nombre: found.nombre,
      email: found.email,
      telefono: found.telefono,
      ciudad: found.ciudad,
      plan: found.plan || 'gratis',
      fechaRegistro: found.fechaRegistro,
      consultasRealizadas: found.consultasRealizadas || 0,
    };
    localStorage.setItem('veeduria_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const register = (data) => {
    const { nombre, email, telefono, ciudad, password } = data;
    const users = JSON.parse(localStorage.getItem('veeduria_users') || '[]');

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
    };
    users.push(newUser);
    localStorage.setItem('veeduria_users', JSON.stringify(users));

    const sessionUser = {
      nombre: newUser.nombre,
      email: newUser.email,
      telefono: newUser.telefono,
      ciudad: newUser.ciudad,
      plan: newUser.plan,
      fechaRegistro: newUser.fechaRegistro,
      consultasRealizadas: 0,
    };
    localStorage.setItem('veeduria_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('veeduria_user', JSON.stringify(updated));

    const users = JSON.parse(localStorage.getItem('veeduria_users') || '[]');
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('veeduria_users', JSON.stringify(users));
    }
    setUser(updated);
  };

  const updatePlan = (plan) => {
    updateUser({ plan });
  };

  const incrementConsultas = () => {
    const count = (user?.consultasRealizadas || 0) + 1;
    updateUser({ consultasRealizadas: count });
  };

  const logout = () => {
    localStorage.removeItem('veeduria_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    updateUser,
    updatePlan,
    incrementConsultas,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
