import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ActiveAlerts from './components/ActiveAlerts';
import CommunityReporting from './components/CommunityReporting';
import SafetyMaps from './components/SafetyMaps';
import DisasterDetails from './components/DisasterDetails';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<ActiveAlerts />} />
          <Route path="/report" element={<CommunityReporting />} />
          <Route path="/maps" element={<SafetyMaps />} />
          <Route path="/disaster/:id" element={<DisasterDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;