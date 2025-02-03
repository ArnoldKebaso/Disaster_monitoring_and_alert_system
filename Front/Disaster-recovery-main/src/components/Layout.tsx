import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const adminMenuItems = [
    {label: 'Home', path: '/home'},
    { label: 'Dashboard', path: '/' },
    { label: 'Alerts', path: '/alerts' },
    {label: 'Community Reporting', path: '/report'},
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
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">Dashboard</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {adminMenuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
