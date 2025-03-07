// components/Layout.tsx
import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { user, logout } = useAuth(); // Destructure from context
  const location = useLocation();
  const navigate = useNavigate();

  const userMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'Community Reporting', path: '/report' },
    { label: 'Safety Map', path: '/maps' },
    { label: 'Agencies', path: '/agencies' },
    // { label: 'Register', path: '/register' },
     { label: 'Resources', path: '/userReSources' },
    
  ];

  const adminMenuItems = [
    { label: 'Safety Map', path: '/maps' },
    // { label: 'Locations', path: '/locations' },
    // { label: 'Resources', path: '/resources' },
    // { label: 'Healthcare', path: '/healthcare' },
    // { label: 'Demographics', path: '/demographics' },
    // { label: 'Flood Data', path: '/floods' },
    { label: 'Subscription', path: '/subscriptions' },
    // { label: 'Agencies', path: '/agencies' },
    // { label: 'Register', path: '/register' },
    { label: 'Modify Alerts', path: '/adminAlerts' },
    { label: 'Create Alert', path: '/createAlert' },
    { label: 'Send Email', path: '/email' },
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'sms', path: '/sms' },
    { label: 'Reports', path: '/adminReport' },
    { label: 'Subscribed Users', path: '/subscriptionReport' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout');
      logout(); // Use context logout
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white shadow-lg">
        {/* ... rest of your sidebar JSX */}
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`block px-6 py-3 text-lg font-semibold transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-800 text-white'
                      : 'text-white hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;