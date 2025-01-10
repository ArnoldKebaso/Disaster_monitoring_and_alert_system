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
import  DisasterInfo from './components/Infomation';
import Donate from './components/DonateComponent';
//import AgenciesPage from './components/CommunityReporting';
import AgenciesPage from './components/Agencies';
import Home from './components/Home';
const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alerts" element={<ActiveAlerts />} />
          <Route path="/report" element={<CommunityReporting />} />
          <Route path="/maps" element={<SafetyMaps />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/resources" element={<ResourceComponent />} />
          <Route path="/disaster/:id" element={<DisasterDetails />} />
          <Route path="/demographics" element={<DemographicComponent />} />
          <Route path="/healthcare" element={<HealthcareComponent />} />
          <Route path="/floods" element={<FloodComponent />} />
          <Route path="/disasterinfo" element={<DisasterInfo />} /> 
          <Route path="/donate" element={<Donate />} />  
  
          <Route path='/home' element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;