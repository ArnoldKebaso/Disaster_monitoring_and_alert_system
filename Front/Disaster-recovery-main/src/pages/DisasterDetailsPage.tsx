import React, { useState } from 'react';
import { updateAlertById } from '../api/alertService';

const DisasterDetailsPage: React.FC = () => {
  const [alertId, setAlertId] = useState('');
  const [alertData, setAlertData] = useState({ description: '', status: '' });

  const handleUpdateAlert = async () => {
    try {
      const updatedAlert = await updateAlertById(alertId, alertData);
      console.log('Alert updated successfully:', updatedAlert);
    } catch (error) {
      console.error('Failed to update alert:', error);
    }
  };

  return (
    <div>
      <h2>Update Alert</h2>
      <input
        type="text"
        placeholder="Alert ID"
        value={alertId}
        onChange={(e) => setAlertId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={alertData.description}
        onChange={(e) => setAlertData({ ...alertData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={alertData.status}
        onChange={(e) => setAlertData({ ...alertData, status: e.target.value })}
      />
      <button onClick={handleUpdateAlert}>Update Alert</button>
    </div>
  );
};

export default DisasterDetailsPage;
