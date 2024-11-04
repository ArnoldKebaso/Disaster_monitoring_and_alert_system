import React from 'react';
import ActiveAlerts from '../components/ActiveAlerts';

const ActiveAlertsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <ActiveAlerts />
      </div>
    </div>
  );
};

export default ActiveAlertsPage;