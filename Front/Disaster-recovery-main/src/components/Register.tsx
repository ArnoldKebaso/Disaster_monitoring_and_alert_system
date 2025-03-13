import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const locationOptions = [
  { value: "Bumadeya", label: "Bumadeya" },
  { value: "Budalangi Central", label: "Budalangi Central" },
  { value: "Budubusi", label: "Budubusi" },
  { value: "Mundere", label: "Mundere" },
  { value: "Musoma", label: "Musoma" },
  { value: "Sibuka", label: "Sibuka" },
  { value: "Sio Port", label: "Sio Port" },
  { value: "Rukala", label: "Rukala" },
  { value: "Mukhweya", label: "Mukhweya" },
  { value: "Sigulu Island", label: "Sigulu Island" },
  { value: "Siyaya", label: "Siyaya" },
  { value: "Nambuku", label: "Nambuku" },
  { value: "West Bunyala", label: "West Bunyala" },
  { value: "East Bunyala", label: "East Bunyala" },
  { value: "South Bunyala", label: "South Bunyala" },
];

const Register: React.FC = () => {
  // Extend formData to include confirmPassword, phone and location
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    role: 'viewer', // always viewer on registration
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verify that password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      // Exclude confirmPassword from being sent to backend
      const { confirmPassword, ...dataToSend } = formData;
      await axios.post('http://localhost:3000/register', dataToSend);
      setMessage('User registered successfully!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto p-8 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-sm text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Confirm Password */}
            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-10 text-sm text-blue-500"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g., +254712345678"
              />
            </div>
            {/* Location Select and Detect Button */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 mb-2">Location</label>
              <div className="flex gap-2">
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select your location</option>
                  {locationOptions.map((loc) => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          // Here, you can use reverse geocoding to find the closest location.
                          // For now, we simulate it by setting a default value.
                          setFormData(prev => ({ ...prev, location: "Budalangi Central" }));
                          alert("Detected location: Budalangi Central");
                        },
                        (error) => {
                          alert("Unable to detect location.");
                          console.error(error);
                        }
                      );
                    } else {
                      alert("Geolocation is not supported by your browser.");
                    }
                  }}
                  className="bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors font-semibold"
                >
                  Detect
                </button>
              </div>
            </div>
            {/* Hidden role field */}
            <input type="hidden" name="role" value="viewer" />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Login
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
