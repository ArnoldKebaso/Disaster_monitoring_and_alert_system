import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import axios from 'axios';

interface LayoutProps {
  role?: 'admin' | 'viewer' | 'reporter';
}

const Layout: React.FC<LayoutProps> = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'Community Reporting', path: '/report' },
    { label: 'Safety Map', path: '/maps' },
    { label: 'Agencies', path: '/agencies' },
    { label: 'Register', path: '/register' },
  ];

  const adminMenuItems = [
    { label: 'Safety Map', path: '/maps' },
    { label: 'Locations', path: '/locations' },
    { label: 'Resources', path: '/resources' },
    { label: 'Healthcare', path: '/healthcare' },
    { label: 'Demographics', path: '/demographics' },
    { label: 'Flood Data', path: '/floods' },
    { label: 'Subscription', path: '/subscriptions' },
    { label: 'Agencies', path: '/agencies' },
    { label: 'Register', path: '/register' },
    { label: 'Create Alert', path: '/createAlert' },
    { label: 'Send Email', path: '/email' },
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'sms', path: '/sms' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white shadow-lg">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold">Dashboard</span>
          </Link>
        </div>
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
        <Outlet /> {/* Use Outlet for nested routes */}
      </main>
    </div>
  );
};

export default Layout;