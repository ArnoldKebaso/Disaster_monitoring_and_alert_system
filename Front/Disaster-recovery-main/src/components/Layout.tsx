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
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

  // const handleLogout = () => {
  //   localStorage.removeItem('token'); // Clear the token
  //   navigate('/'); // Redirect to the default view
  //   window.location.reload(); // Refresh the page to reset the role
  // };
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
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">Dashboard</span>
          </Link>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
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