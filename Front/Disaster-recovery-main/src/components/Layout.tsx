// Import necessary libraries and components
import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Import icons from Lucide library
import {
  Home,
  LayoutDashboard,
  Bell,
  MapPin,
  Map,
  Users,
  FileBox,
  User,
  LogOut,
  Menu,
  X,
  BookOpen,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

// Define the Layout component
const Layout: React.FC = () => {
  // Extract user and logout function from AuthContext
  const { user, logout } = useAuth();
  const location = useLocation(); // Get current route location
  const navigate = useNavigate(); // Navigation hook for programmatic routing

  // State for toggling the sidebar on small screens
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define menu items for regular users
  const userMenuItems = [
    { label: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Alerts", path: "/alerts", icon: <Bell className="w-5 h-5" /> },
    { label: "Community Reporting", path: "/report", icon: <AlertTriangle className="w-5 h-5" /> },
    { label: "Safety Map", path: "/maps", icon: <Map className="w-5 h-5" /> },
    { label: "Agencies", path: "/agencies", icon: <Users className="w-5 h-5" /> },
    { label: "Register", path: "/register", icon: <User className="w-5 h-5" /> },
    { label: "Resources", path: "/userReSources", icon: <BookOpen className="w-5 h-5" /> },
    { label: "My Profile", path: "/userProfile", icon: <ShieldAlert className="w-5 h-5" /> },
  ];

  // Define menu items for admin users
  const adminMenuItems = [
    { label: "Subscription", path: "/subscriptions", icon: <Users className="w-5 h-5" /> },
    { label: "Modify Alerts", path: "/adminAlerts", icon: <Bell className="w-5 h-5" /> },
    { label: "Create Alert", path: "/createAlert", icon: <Bell className="w-5 h-5" /> },
    { label: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { label: "Community Reports", path: "/adminCommunityReports", icon: <AlertTriangle className="w-5 h-5" /> },
    { label: "Reports", path: "/adminReport", icon: <FileBox className="w-5 h-5" /> },
    { label: "Subscribed Users", path: "/subscriptionReport", icon: <Users className="w-5 h-5" /> },
    { label: "Flood analytics", path: "/floods", icon: <Users className="w-5 h-5" /> },
    { label: "Demographics", path: "/demographics", icon: <Users className="w-5 h-5" /> },
    { label: "Manage Resources", path: "/adminResources", icon: <Users className="w-5 h-5" /> },
  ];

  // Determine which menu items to display based on user role
  const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  // Filter out the "Register" menu item if the user is logged in
  const filteredMenuItems = user
    ? menuItems.filter((item) => item.label !== "Register")
    : menuItems;

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Send logout request to the server
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      logout(); // Clear user context
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar for small screens */}
      <header className="lg:hidden flex items-center justify-between bg-blue-900 text-white px-4 py-3 shadow-md">
        {/* Application title */}
        <div className="text-xl font-bold">FMAS</div>
        {/* Sidebar toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="focus:outline-none"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-blue-900 text-white shadow-lg transform transition-transform duration-300 z-50`}
        >
          {/* Sidebar header */}
          <div className="hidden lg:flex items-center justify-center h-16 bg-blue-800 shadow-md">
            <span className="text-xl font-bold">FMAS Dashboard</span>
          </div>

          {/* Navigation menu */}
          <nav className="mt-4 flex flex-col h-full justify-between">
            <ul className="space-y-2">
              {/* Render menu items */}
              {filteredMenuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)} // Close sidebar on mobile
                    className={`group flex items-center gap-3 px-6 py-3 text-base font-semibold transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-blue-800 text-white"
                        : "text-white hover:bg-blue-800 hover:text-white"
                    }`}
                  >
                    {/* Icon */}
                    <span className="text-white group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {/* Label */}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              {/* Logout button for logged-in users */}
              {user && (
                <div className="p-6">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg text-base transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet /> {/* Render child routes */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
