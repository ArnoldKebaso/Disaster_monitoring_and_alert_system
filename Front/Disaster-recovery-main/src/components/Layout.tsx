import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import axios from 'axios';

interface LayoutProps {
  children: React.ReactNode;
  role?: 'admin' | 'viewer' | 'reporter'; // Role passed as a prop
}

const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userMenuItems = [
    { label: 'Home', path: '/home' },
    { label: 'Dashboard', path: '/' },
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
    { label: 'Home', path: '/home' },
    { label: 'Dashboard', path: '/' },
    { label: 'Alerts', path: '/alerts' },
    {label: 'sms' , path: '/sms'},
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout'); // Call the logout endpoint
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token'); // Clear the token
      navigate('/'); // Redirect to the default view
      window.location.reload(); // Refresh the page to reset the role
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out hover:translate-x-0 -translate-x-full md:translate-x-0">
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
        {children}
      </main>
    </div>
  );
};

export default Layout;