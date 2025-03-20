// src/pages/FAQ.tsx

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    question: "1. What is the Flood Monitoring and Alert System (FMAS)?",
    answer: `FMAS is a cutting-edge platform designed for the Budalangi community, 
    historically prone to severe flooding. It provides real-time flood information 
    and actionable alerts so residents can prepare and respond effectively during 
    flood emergencies.`,
  },
  {
    question: "2. What are the mission and vision of FMAS?",
    answer: `Our mission is to reduce the impact of floods by providing timely alerts, 
    facilitating easy incident reporting, and offering educational resources for flood 
    preparedness. We envision a resilient, well-informed community that actively 
    engages in flood management and disaster response.`,
  },
  {
    question: "3. What challenges does the Budalangi community face?",
    answer: `Budalangi has long struggled with recurring floods, displacement, and 
    damaged infrastructure. These hardships motivated the creation of FMAS, which 
    specifically addresses local needs by analyzing historical flood patterns and 
    tailoring solutions to longstanding issues.`,
  },
  {
    question: "4. Which features does FMAS offer?",
    answer: `FMAS provides:
    • Real-time flood alerts (via SMS & email)
    • An intuitive incident reporting system (with images & location data)
    • Predictive analytics (hydrological & meteorological data)
    • Interactive geospatial maps (high-risk zones & safe routes)
    • Educational resources (step-by-step flood preparedness & safety measures)
    Each feature helps users stay safe, informed, and better prepared for flood events.`,
  },
  {
    question: "5. How does FMAS work?",
    answer: `FMAS uses a role-based workflow: when a user reports a flood incident, 
    administrators verify the data before generating alerts. The system supports 
    offline capabilities like SMS alerts for areas with limited internet access, 
    ensuring seamless communication among community members, local responders, 
    and partners such as the Kenya Red Cross.`,
  },
  {
    question: "6. What technology and architecture power FMAS?",
    answer: `FMAS is built with a React.js & TypeScript front-end and a Node.js & Express.js 
    back-end. Data encryption, robust authentication, and third-party geospatial 
    integrations ensure reliability, security, and real-time data access. This modern 
    stack enables continuous improvements and rapid feature updates.`,
  },
  {
    question: "7. Who are the key stakeholders and collaborators?",
    answer: `FMAS is supported by organizations like the National Disaster Management Unit 
    (NDMU) and the Kenya Red Cross. Their collaboration enhances credibility, facilitates 
    rapid emergency response, and fosters deeper community engagement in disaster 
    management initiatives.`,
  },
  {
    question: "8. Does FMAS provide educational resources?",
    answer: `Absolutely! FMAS goes beyond alerts by offering a dedicated educational section 
    with downloadable guides, tutorial videos, and interactive modules on flood preparedness. 
    Empowering the community with knowledge is a cornerstone of our project’s success.`,
  },
  {
    question: "9. Are there future plans for expanding FMAS?",
    answer: `Yes. We aim to incorporate IoT sensors for real-time water monitoring, and possibly 
    extend FMAS to manage other disasters like landslides or droughts. We actively gather user 
    feedback and leverage technological advancements to make the system even more user-centric.`,
  },
  {
    question: "10. How can I get involved?",
    answer: `You can subscribe to FMAS alerts, report flood incidents, and explore educational 
    resources on the platform. Simply sign up for tailored notifications, share your insights 
    with us, and help build a safer, more prepared community.`,
  },
  {
    question: "11. How do I receive flood alerts?",
    answer: `You can receive alerts via SMS, email, or push notifications. Multiple channels 
    ensure you get timely updates, even in low-connectivity situations. You can customize 
    alert settings in your profile or account preferences.`,
  },
  {
    question: "12. Is my data secure on FMAS?",
    answer: `We use data encryption, role-based access controls, and comply with relevant 
    data protection regulations to keep your information safe. Our back-end implements 
    strict security protocols to ensure the highest standards of user data privacy.`,
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full px-6 md:px-16 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about FMAS
          </p>
        </div>

        {/* FAQ Container */}
        <div className="w-full flex flex-col gap-4">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* FAQ Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <div className="text-blue-600">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* FAQ Answer (Collapsible) */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 overflow-hidden"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQ;
