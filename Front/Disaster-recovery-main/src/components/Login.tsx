import React, { useState } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const to = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
      navigate(to);
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
          </form>
          
          <p className="mt-4 text-center">
            Don't have an account? <a href="/register" className="text-blue-500">Register</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;