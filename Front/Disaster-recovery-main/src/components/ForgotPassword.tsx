// src/components/ForgotPassword.tsx
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
      setEmail(''); // Clear the email field on success
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
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto p-8 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
          {message && <p className="mb-4 text-center text-green-600">{message}</p>}
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Enter your registered email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Send Reset Link
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
