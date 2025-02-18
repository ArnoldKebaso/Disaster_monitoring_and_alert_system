import React from "react";
import { motion } from "framer-motion";
import { Droplet, ShieldAlert, Navigation, HeartHandshake, Globe, AlertCircle } from "lucide-react";

const AboutUs: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      

    <section className="bg-gradient-to-b from-blue-50 to-cyan-50 py-20 px-6 md:px-16">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="max-w-7xl mx-auto mb-24"
      >
        <motion.div
          variants={fadeIn}
          className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100"
        >
          {/* Animated Image Placeholder */}
          <div className="w-full md:w-1/2 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="w-32 h-32 text-white opacity-30 animate-pulse" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-center"
            >
              <Droplet className="w-24 h-24 text-white mb-4" />
              <h2 className="text-4xl font-black text-white tracking-tight">
                FloodWatch System
              </h2>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-10">
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6"
            >
              Protecting Communities Worldwide
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 text-lg leading-relaxed mb-6">
              At the heart of disaster preparedness, our Flood Monitoring and Alert System 
              combines cutting-edge technology with community-driven insights to create 
              safer environments for everyone.
            </motion.p>
            <motion.div variants={fadeIn} className="flex items-center space-x-4">
              <ShieldAlert className="w-8 h-8 text-cyan-600" />
              <span className="text-gray-600 font-medium">24/7 Real-time Monitoring</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center mb-24 px-4"
      >
        <div className="inline-block bg-white rounded-full px-8 py-2 mb-6 shadow-lg">
          <span className="text-blue-600 font-semibold">Our Mission</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Empowering Resilience Through Technology
        </h3>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
          We combine satellite data, community reports, and AI-powered predictions 
          to deliver accurate flood warnings and safety recommendations. Our system 
          has helped protect over 2 million people across 15 countries.
        </p>
      </motion.div>

      {/* Core Values Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4">
        {[
          { icon: HeartHandshake, title: "Community First", text: "We prioritize local knowledge and community partnerships" },
          { icon: Navigation, title: "Precision Mapping", text: "Real-time flood tracking with 95% accuracy" },
          { icon: AlertCircle, title: "Instant Alerts", text: "SMS & app notifications within 30 seconds of detection" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-50"
          >
            <item.icon className="w-12 h-12 text-cyan-600 mb-6" />
            <h4 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h4>
            <p className="text-gray-600 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-900 text-white py-16 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "15M+", label: "Alerts Sent" },
            { number: "2.4K", label: "Communities Served" },
            { number: "98%", label: "Accuracy Rate" },
            { number: "24/7", label: "Monitoring" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3 }}
              className="p-4"
            >
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4">
        {[
          {
            title: "Community Support",
            content: "Localized evacuation plans and resource distribution",
            image: "https://via.placeholder.com/400x250/bfdbfe/1e3a8a?text=Community+Support"
          },
          {
            title: "Safe Routes",
            content: "Dynamic navigation based on real-time flood data",
            image: "https://via.placeholder.com/400x250/bfdbfe/1e3a8a?text=Safe+Routes"
          },
          {
            title: "Early Warnings",
            content: "Predictive analytics for proactive preparation",
            image: "https://via.placeholder.com/400x250/bfdbfe/1e3a8a?text=Early+Warnings"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-2xl shadow-xl"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-blue-100">{item.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center mb-24 px-4">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white p-12 rounded-2xl shadow-2xl border border-blue-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 text-xl mb-8">
            Join thousands of communities already protected by our system
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default AboutUs;