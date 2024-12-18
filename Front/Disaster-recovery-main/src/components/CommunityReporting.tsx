import React, { useState } from "react";

const agencyData = [
    {
      "id": 1,
      "name": "Kenya Red Cross",
      "description": "Providing emergency response and disaster relief services across Kenya.",
      "services": [
        { "name": "Emergency Response", "icon": "🚑" },
        { "name": "First Aid Training", "icon": "🩹" },
        { "name": "Disaster Preparedness", "icon": "📦" }
      ]
    },
    {
      "id": 2,
      "name": "National Disaster Management Unit (NDMU)",
      "description": "Specialized in managing national emergencies and disaster response.",
      "services": [
        { "name": "Flood Management", "icon": "🌊" },
        { "name": "Fire Rescue", "icon": "🔥" },
        { "name": "Earthquake Relief", "icon": "🏚️" }
      ]
    },
    {
      "id": 3,
      "name": "Kenya Meteorological Department",
      "description": "Providing weather and climate information to mitigate natural disasters.",
      "services": [
        { "name": "Weather Forecasting", "icon": "🌦️" },
        { "name": "Climate Risk Analysis", "icon": "📊" },
        { "name": "Early Warnings", "icon": "⚠️" }
      ]
    },
    {
      "id": 4,
      "name": "St. John Ambulance Kenya",
      "description": "Delivering lifesaving support and ambulance services nationwide.",
      "services": [
        { "name": "Ambulance Services", "icon": "🚑" },
        { "name": "Emergency Medical Response", "icon": "💉" },
        { "name": "Health Education", "icon": "📚" }
      ]
    },
    {
      "id": 5,
      "name": "Kenya Wildlife Service (KWS)",
      "description": "Specialized in wildlife-related disaster response.",
      "services": [
        { "name": "Wildlife Rescue", "icon": "🐘" },
        { "name": "Conflict Mitigation", "icon": "⚔️" },
        { "name": "Environmental Conservation", "icon": "🌍" }
      ]
    },
    {
      "id": 6,
      "name": "Kenya Defense Forces (KDF)",
      "description": "Assisting in disaster recovery and national security during emergencies.",
      "services": [
        { "name": "Search and Rescue", "icon": "🔍" },
        { "name": "Flood Relief", "icon": "🏞️" },
        { "name": "Logistical Support", "icon": "🚛" }
      ]
    },
    {
      "id": 7,
      "name": "World Health Organization (Kenya)",
      "description": "Supporting public health efforts during disasters and pandemics.",
      "services": [
        { "name": "Disease Control", "icon": "🦠" },
        { "name": "Emergency Healthcare", "icon": "🏥" },
        { "name": "Vaccination Drives", "icon": "💉" }
      ]
    },
    {
      "id": 8,
      "name": "Kenya Forest Service",
      "description": "Managing forest fires and environmental disasters.",
      "services": [
        { "name": "Firefighting", "icon": "🔥" },
        { "name": "Forest Conservation", "icon": "🌲" },
        { "name": "Climate Monitoring", "icon": "🌡️" }
      ]
    },
    {
      "id": 9,
      "name": "UNHCR Kenya",
      "description": "Protecting and assisting refugees during crises.",
      "services": [
        { "name": "Refugee Protection", "icon": "🛡️" },
        { "name": "Shelter Provision", "icon": "🏠" },
        { "name": "Humanitarian Aid", "icon": "🤝" }
      ]
    },
    {
      "id": 10,
      "name": "Kenya Maritime Authority",
      "description": "Managing marine disasters and enhancing water safety.",
      "services": [
        { "name": "Maritime Rescue", "icon": "🚤" },
        { "name": "Oil Spill Response", "icon": "🛢️" },
        { "name": "Water Safety Training", "icon": "💧" }
      ]
    }
  ]
  ;

const AgenciesPage: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<any>(null);

  const closeModal = () => setSelectedAgency(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Connect with Agencies</h1>
          <p className="text-gray-600 mt-2">
            Our partners will be on the ground ready to provide you with the aid you require.
          </p>
        </header>

        {/* Agency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencyData.map((agency) => (
            <div
              key={agency.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">{agency.name}</h3>
              <p className="text-gray-600 mt-2">{agency.description}</p>
              <button
                onClick={() => setSelectedAgency(agency)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedAgency && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800">{selectedAgency.name}</h2>
            <p className="text-gray-600 mt-2">{selectedAgency.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Services Offered:</h3>
              <ul className="mt-2 space-y-2">
                {selectedAgency.services.map((service: any, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-2xl mr-2">{service.icon}</span>
                    <span>{service.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenciesPage;
