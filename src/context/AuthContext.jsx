import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(() => localStorage.getItem('logueado') === 'true');
  const login = () => {
    localStorage.setItem('logueado', 'true');
    setAutenticado(true);
  };
  const logout = () => {
    localStorage.removeItem('logueado');
    setAutenticado(false);
  };
  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext); 