import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    profilePhoto: '', // URL or Base64 data
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch current user details on mount
  useEffect(() => {
    if (user) {
      // Option 1: Use user details from AuthContext
    //   setProfile({
    //     username: user.username,
    //     email: user.email,
    //     phone: user.phone || '',
    //     location: user.location || '',
    //     profilePhoto: user.profilePhoto || '', // Ensure your backend returns this if available
    //   });
      
      // Option 2: Alternatively, fetch fresh details from backend:
      axios.get(`http://localhost:3000/user/${user.id}`, { withCredentials: true })
        .then(res => setProfile(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Update profile fields: phone, location, and profilePhoto.
      await axios.put(`http://localhost:3000/user/${user?.id}`, profile, { withCredentials: true });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      // Update password using a dedicated endpoint.
      await axios.put(
        `http://localhost:3000/user/${user?.id}/password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );
      toast.success("Password updated successfully");
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      {/* Profile Photo and Information */}
      <div className="mb-8 p-4 border rounded">
        <div className="flex items-center mb-4">
          <img
            src={profile.profilePhoto || '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Change Profile Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1" />
          </div>
        </div>
        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700">Username</label>
              <input 
                type="text" 
                name="username" 
                value={profile.username} 
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                value={profile.email} 
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={profile.phone} 
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Location</label>
              <input 
                type="text" 
                name="location" 
                value={profile.location} 
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="p-4 border rounded">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700">Current Password</label>
            <input 
              type="password" 
              name="currentPassword" 
              value={passwordData.currentPassword} 
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              value={passwordData.newPassword} 
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm New Password</label>
            <input 
              type="password" 
              name="confirmNewPassword" 
              value={passwordData.confirmNewPassword} 
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
