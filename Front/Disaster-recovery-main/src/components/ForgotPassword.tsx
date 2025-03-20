import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse({ email });
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      setMessage(response.data.message);
      toast.success("Reset link sent! Check your email.");
      setEmail('');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => toast.error(err.message));
      } else {
        toast.error(error.response?.data?.error || "Error sending reset link");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 mb-12">
        <div className="w-full max-w-lg mx-auto p-10 border rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Forgot Password</h2>
          <form onSubmit={handleForgotPassword} className="space-y-6">
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
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
          {message && (
            <p className="mt-6 text-center text-green-600 text-lg font-medium">
              {message}
            </p>
          )}
          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="text-blue-600 hover:text-blue-800 text-lg font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
