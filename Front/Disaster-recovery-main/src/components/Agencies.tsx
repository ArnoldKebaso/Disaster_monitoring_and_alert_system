import React, { useState } from "react";
import { motion } from "framer-motion";

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

const Agencies: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<any>(null);

  const closeModal = () => setSelectedAgency(null);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Emergency Response Partners
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Connect with certified disaster response agencies ready to provide immediate assistance
          </p>
        </motion.header>

        {/* Agency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencyData.map((agency, index) => (
            <motion.div
              key={agency.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all group hover:border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100/50 rounded-lg">
                    <span className="text-2xl">{agency.services[0].icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                      {agency.name}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-3">
                      {agency.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgency(agency)}
                  className="mt-6 w-full px-4 py-2 bg-blue-600/10 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
                >
                  View Services
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedAgency && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-blue-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{selectedAgency.name}</h2>
                  <p className="text-muted-foreground mt-2">{selectedAgency.description}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Key Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAgency.services.map((service: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-blue-50/50 rounded-lg border border-blue-100"
                    >
                      <span className="text-3xl mr-4">{service.icon}</span>
                      <div>
                        <h4 className="font-medium text-foreground">{service.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Available 24/7 emergency response
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Agencies;