import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as authService from '../services/auth.service.js';

export const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inicializar auth (seed admin) y restaurar sesión
  useEffect(() => {
    authService.initAuth();
    const current = authService.getCurrentUser();
    if (current) setUser(current);
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    const result = authService.login(email, password);
    if (result.success) setUser(result.user);
    return result;
  }, []);

  const register = useCallback((data) => {
    const result = authService.register(data);
    if (result.success) setUser(result.user);
    return result;
  }, []);

  const updateUser = useCallback((updates) => {
    const updated = authService.updateUser(updates);
    if (updated) setUser(updated);
  }, []);

  const updatePlan = useCallback((plan) => {
    const updated = authService.updatePlan(plan);
    if (updated) setUser(updated);
  }, []);

  const incrementConsultas = useCallback(() => {
    const updated = authService.incrementConsultas();
    if (updated) setUser(updated);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const googleLogin = useCallback((profile) => {
    const result = authService.googleLogin(profile);
    if (result.success) setUser(result.user);
    return result;
  }, []);

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
    isAdmin: user?.isAdmin || false,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
