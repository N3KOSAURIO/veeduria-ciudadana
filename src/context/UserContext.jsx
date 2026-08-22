import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { authApi } from '../core/api/apiClient.js';

export const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

/**
 * UserProvider — identidad conectada al backend Go (API), no a localStorage.
 * FASE 2: elimina isAdmin del cliente (C3). El rol viene SIEMPRE del backend
 * (JWT). La sesión se restaura via /api/auth/me con la cookie httpOnly.
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurar sesión desde el backend (cookie httpOnly → /api/auth/me)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const me = await authApi.me();
        if (active && me?.user_id) {
          setUser({ id: me.user_id, role: me.role, plan: me.plan });
        }
      } catch {
        // No hay sesión válida → user null (no autenticado)
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const result = await authApi.login({ email, password });
      // Tras login, obtener el perfil completo del backend.
      const me = await authApi.me();
      setUser({ id: me.user_id, role: me.role, plan: me.plan });
      return { success: true, user: { id: me.user_id, role: me.role, plan: me.plan } };
    } catch (err) {
      return { success: false, error: err.message, status: err.status };
    }
  }, []);

  const register = useCallback(async (data) => {
    try {
      const result = await authApi.register(data);
      const me = await authApi.me();
      setUser({ id: me.user_id, role: me.role, plan: me.plan });
      return { success: true, user: { id: me.user_id, role: me.role, plan: me.plan } };
    } catch (err) {
      return { success: false, error: err.message, status: err.status };
    }
  }, []);

  const logout = useCallback(() => {
    // TODO fase 1b: endpoint /api/auth/logout para revocar refresh token.
    setUser(null);
  }, []);

  // FASE 2: los métodos locales ya no existen en el backend aún (perfil/plan).
  // Se mantienen como stubs que preservan el contrato de UI sin datos fake.
  const updateUser = useCallback(() => {}, []);
  const updatePlan = useCallback(() => {}, []);
  const incrementConsultas = useCallback(() => {}, []);
  const googleLogin = useCallback(() => ({ success: false, error: 'google_disabled' }), []);

  const value = {
    user,
    loading,
    login,
    register,
    updateUser,
    updatePlan,
    incrementConsultas,
    logout,
    googleLogin,
    isAuthenticated: !!user,
    // C3: eliminar isAdmin del cliente. El rol solo se valida server-side.
    // AdminLayout debe usar la API para verificar rol admin, no un flag local.
    isAdmin: user?.role === 'admin' || false,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
