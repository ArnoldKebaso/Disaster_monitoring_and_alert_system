// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { showError, showSuccess } from '../utils/toastHelpers';

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
      showSuccess('Login successful! Redirecting...');
    } catch (error) {
      toast.error('Login failed', {
        description: 'Please check your email and password and try again.',
        action: {
          label: 'Retry',
          onClick: () => handleSubmit(e)
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      const redirectPath = user.role === 'admin' 
        ? '/subscriptions' 
        : (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      
      const redirectTimer = setTimeout(() => navigate(redirectPath), 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [user, navigate, location]);

  const handleGoogleSignIn = () => {
    try {
      window.location.href = 'http://localhost:3000/auth/google';
      toast.info('Redirecting to Google authentication...');
    } catch (error) {
      toast.error('Google authentication failed', {
        description: 'Please try again or use email/password.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 mb-12"> {/* Added margin-bottom */}
        <div className="w-full max-w-lg mx-auto p-10 border rounded-xl shadow-xl"> {/* Increased padding and width */}
          <h2 className="text-3xl font-bold mb-8 text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="relative">
                <label htmlFor="password" className="block text-lg text-gray-700 mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 text-lg border-2 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-8 space-y-6 text-center"> {/* Increased spacing */}
            <Link 
              to="/forgot-password" 
              className="text-blue-600 hover:text-blue-800 text-lg font-medium"
            >
              Forgot Password?
            </Link>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 text-lg">Or continue with</span>
              </div>
            </div>

                            <button
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-gray-700 p-3 rounded-lg text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border-2 border-gray-200"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>

            <p className="mt-4 text-lg">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;