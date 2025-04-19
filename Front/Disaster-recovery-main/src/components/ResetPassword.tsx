// Import necessary libraries and components
import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

// Define validation schema for password reset
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
  // Extract email and token from URL search parameters
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  // State variables for form inputs and UI behavior
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false); // Toggle visibility for new password
  const [showConfirm, setShowConfirm] = useState(false); // Toggle visibility for confirm password

  const navigate = useNavigate(); // Navigation hook for programmatic routing

  // Handle password reset form submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Validate form data using Zod schema
      passwordSchema.parse({ newPassword, confirmPassword });

      // Send password reset request to the server
      const response = await axios.post('http://localhost:3000/reset-password', 
        { email, token, newPassword },
        { withCredentials: true }
      );

      // Show success message and redirect to login page
      toast.success(response.data.message);
      navigate('/login');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Display validation errors
        error.errors.forEach(err => toast.error(err.message));
      } else {
        // Display server error message
        toast.error(error.response?.data?.error || "Reset failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Render Navbar component */}
      <main className="flex-grow flex items-center justify-center p-4 mb-12">
        <div className="w-full max-w-lg mx-auto p-10 border rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Reset Password</h2>
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-4">
              {/* New Password Input */}
              <div className="relative">
                <label htmlFor="newPassword" className="block text-lg text-gray-700 mb-2">New Password</label>
                <input
                  type={showNew ? 'text' : 'password'} // Toggle input type based on visibility state
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-blue-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)} // Toggle password visibility
                  className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
                >
                  {showNew ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-lg text-gray-700 mb-2">Confirm Password</label>
                <input
                  type={showConfirm ? 'text' : 'password'} // Toggle input type based on visibility state
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-blue-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)} // Toggle password visibility
                  className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login Link */}
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
      <Footer /> {/* Render Footer component */}
    </div>
  );
};

export default ResetPassword;
