// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  id: number;
  role: 'admin' | 'viewer' | 'reporter';
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Define public routes where we do NOT want to check auth
    const publicPaths = ['/forgot-password', '/reset-password'];
    if (publicPaths.includes(location.pathname)) {
      return;
    }
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/me', {
          withCredentials: true,
        });
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, [location]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
    } finally {
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




// // context/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   id: number;
//   role: 'admin' | 'viewer' | 'reporter';
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:3000/me', {
//           withCredentials: true
//         });
//         setUser(data);
//       } catch {
//         setUser(null);
//       }
//     };
//     checkAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:3000/login', 
//         { email, password },
//         { withCredentials: true }
//       );
//       setUser(response.data.user);
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post('http://localhost:3000/logout', {}, { 
//         withCredentials: true 
//       });
//     } finally {
//       setUser(null);
//       navigate('/login');
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);