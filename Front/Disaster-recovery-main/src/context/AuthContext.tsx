// context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  role: 'admin' | 'viewer' | 'reporter';
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({ id: payload.id, role: payload.role });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);