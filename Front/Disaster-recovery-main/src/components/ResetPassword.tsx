// src/components/ResetPassword.tsx
import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const passwordSchema = z.object({
  newPassword: z.string().min(12, "Password must be at least 12 characters")
    .refine(val => /[A-Z]/.test(val), "Must include an uppercase letter")
    .refine(val => /[a-z]/.test(val), "Must include a lowercase letter")
    .refine(val => /[0-9]/.test(val), "Must include a number")
    .refine(val => /[^A-Za-z0-9]/.test(val), "Must include a special character"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();



  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      passwordSchema.parse({ newPassword, confirmPassword });
      const response = await axios.post('http://localhost:3000/reset-password', 
        { email, token, newPassword },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      // Optionally, you might auto-login the user here.
      navigate('/login');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => toast.error(err.message));
      } else {
        toast.error(error.response?.data?.error || "Reset failed");
      }
    }
  };
// const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     if (newPassword.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         'http://localhost:3000/reset-password',
//         { email, token, newPassword },
//         { withCredentials: true }
//       );
//       toast.success(response.data.message);
//       // Optionally, you could auto-login the user here by generating a token.
//       // For now, we redirect to the login page.
//       navigate('/login');
//     } catch (error: any) {
//       toast.error(error.response?.data?.error || 'Reset failed');
//     }
//   };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto p-8 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4 relative">
              <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
              <input
                type={showNew ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showNew ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm New Password</label>
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Reset Password
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

export default ResetPassword;
