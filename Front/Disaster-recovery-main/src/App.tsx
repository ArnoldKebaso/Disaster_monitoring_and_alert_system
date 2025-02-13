import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ActiveAlerts from './components/ActiveAlerts';
import CommunityReporting from './components/CommunityReporting';
import SafetyMaps from './components/SafetyMaps';
import DisasterDetails from './components/DisasterDetails';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
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
import { decodeToken } from './utils/decodeToken';

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  const role = token ? decodeToken(token) : 'viewer'; // Decode the token to get the role

  return (
    <Router>
      <Layout role={role}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alerts" element={<ActiveAlerts />} />
          <Route path="/report" element={<CommunityReporting />} />
          <Route path="/maps" element={<SafetyMaps />} />
          <Route path="/disaster/:id" element={<DisasterDetails />} />
          <Route path="/disasterinfo" element={<DisasterInfo />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agencies" element={<Agencies />} />

          {/* Admin-Only Routes */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/locations" element={<Location />} />
            <Route path="/resources" element={<ResourceComponent />} />
            <Route path="/demographics" element={<DemographicComponent />} />
            <Route path="/healthcare" element={<HealthcareComponent />} />
            <Route path="/floods" element={<FloodComponent />} />
            <Route path="/createAlert" element={<CreateAlert />} />
            <Route path="/email" element={<EmailForm />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;