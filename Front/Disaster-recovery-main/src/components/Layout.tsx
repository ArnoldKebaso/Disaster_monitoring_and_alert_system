import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Admin menu items
  const adminMenuItems = [
    { label: 'Dashboard', path: '/' },
    {
      label: 'Incident Management',
      submenu: [
        { label: 'Alerts', path: '/alerts' },
      ],
    },
    {
      label: 'Geospatial Data',
      submenu: [
        { label: 'Safety Map', path: '/maps' },
        { label: 'Locations', path: '/locations' },
      ],
    },
    {
      label: 'Resource Management',
      submenu: [
        { label: 'Resources', path: '/resources' },
        { label: 'Healthcare', path: '/healthcare' },
        { label: 'Agencies', path: '/agencies' },
      ],
    },
    {
      label: 'Analytics',
      submenu: [
        { label: 'Demographics', path: '/demographics' },
        { label: 'Flood Data', path: '/floods' },
      ],
    },
    { label: 'User Management', path: '/register' },
  ];

  // User menu items
  const userMenuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Alerts', path: '/alerts' },
     { label: 'Agencies', path: '/agencies' },
    { label: 'Report Incident', path: '/report' },
    { label: 'Disaster Information', path: '/disasterinfo' },
    { label: 'Donate', path: '/donate' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">Disaster Alert</span>
          </Link>

          {/* Admin Menu */}
          <nav>
            <ul className="flex space-x-4">
              <li className="font-bold">Admin Menu</li>
              {adminMenuItems.map((item) =>
                item.submenu ? (
                  <li key={item.label} className="relative group">
                    <span
                      className={`text-sm font-medium ${
                        location.pathname === item.path
                          ? 'text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {item.label}
                    </span>
                    <ul className="absolute hidden group-hover:block bg-white shadow-lg py-2">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            to={subItem.path}
                            className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
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
                )
              )}
            </ul>
          </nav>

          {/* User Menu */}
          <nav>
            <ul className="flex space-x-4">
              <li className="font-bold">User Menu</li>
              {userMenuItems.map((item) => (
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
