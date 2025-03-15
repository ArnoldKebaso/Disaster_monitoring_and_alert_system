// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import Cookies from 'js-cookie';
import { decodeToken } from '../utils/decodeToken';

type User = {
  id: number;
  email: string;
  role: 'admin' | 'reporter' | 'viewer';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      // Force a fresh response by appending a timestamp and setting no-cache headers.
      const response = await api.get(`/validate?t=${Date.now()}`, {
        withCredentials: true,
        headers: { 'Cache-Control': 'no-store' }
      });
      console.log("checkAuth response data:", response.data);
      let userData = response.data;
      // If the response doesn’t include a role, decode it from the token.
      if (!userData.role) {
        const token = Cookies.get('token');
        if (token) {
          const role = decodeToken(token);
          userData = { ...userData, role };
        }
      }
      setUser(userData);
    } catch (error) {
      console.error("checkAuth error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await api.post('/login', { email, password }, { withCredentials: true })
      .then((res)=>{
        console.log("login response data:", res.data);
      });
      await checkAuth();
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
