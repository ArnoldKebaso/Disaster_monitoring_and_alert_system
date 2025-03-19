// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ActiveAlerts from './components/ActiveAlerts';
import CommunityReporting from './components/CommunityReporting';
import SafetyMaps from './components/SafetyMaps';
import DisasterDetails from './components/DisasterDetails';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Location from './components/Location';
import ResourceComponent from './components/ResourceComponent';
import Register from './components/Register';
import DemographicComponent from './components/DemographicComponent';
import HealthcareComponent from './components/HealthcareComponent';
import FloodComponent from './components/FloodComponent';
import DisasterInfo from './components/Infomation';
import Donate from './components/DonateComponent';
import ContactUS from './components/ContactUS';
import Agencies from './components/Agencies';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import CreateAlert from './components/CreateAlert';
import EmailForm from './components/EmailForm';
import SubscriptionList from './components/SubscriptionList';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';
import SmsAlertForm from './components/SmsAlertForm';
import { AuthProvider } from './context/AuthContext';
import AdminReportsDashboard from './components/AdminReports';
import Resources from './components/UserResources';
import AdminAlert from './components/AdminAlerts';
import SubscriptionReportsDashboard from './components/SubscriptionReport';
import UserProfile from './components/UserProfile';
import AdminCommunityReports from './components/AdminCommunityReports';
import FAQ from './components/FAQ';

const App: React.FC = () => {
  return (
    <>
      <Toaster 
        position="top-center"
        theme="light"
        toastOptions={{
          className: 'p-4 rounded-lg text-sm font-medium',
          style: {
            fontSize: '16px',
            borderRadius: '8px',
            padding: '12px 24px'
          },
        }}
      />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUS />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/userReSources" element={<Resources />} />

            {/* Dashboard routes with layout */}
            <Route element={<Layout />}>
              {/* Protected User Dashboard Routes */}
              <Route element={<ProtectedRoute allowedRoles={['viewer', 'reporter']} />}> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/alerts" element={<ActiveAlerts />} />
                <Route path="/report" element={<CommunityReporting />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/maps" element={<SafetyMaps />} />
                <Route path="/disaster/:id" element={<DisasterDetails />} />
                <Route path="/agencies" element={<Agencies />} />
                <Route path="/home" element={<Home />} />
              </Route> 

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/createAlert" element={<CreateAlert />} />
                <Route path="/adminAlerts" element={<AdminAlert />} />
                <Route path="/email" element={<EmailForm />} />
                <Route path="/subscriptions" element={<SubscriptionList />} />
                <Route path="/adminCommunityReports" element={<AdminCommunityReports />} />
                <Route path="/adminReport" element={<AdminReportsDashboard />} />
                <Route path="/subscriptionReport" element={<SubscriptionReportsDashboard />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
