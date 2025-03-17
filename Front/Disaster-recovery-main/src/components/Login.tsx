// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    if (user) {
      const to = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(to);
    }
  }, [user, navigate, location]);

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto p-8 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center"
            >
              Sign in with Google
            </button>
          </div>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
