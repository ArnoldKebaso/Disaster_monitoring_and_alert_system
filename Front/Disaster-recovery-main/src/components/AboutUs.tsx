import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Select, { MultiValue } from "react-select";



import {
  FaMapMarkerAlt,
  FaBell,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaUsers,
  FaMap,
} from "react-icons/fa";


import {
  Droplet,
  ShieldAlert,
  Navigation,
  AlertTriangle,
  HeartHandshake,
  ShieldCheck,
  Globe,
  AlertCircle,
  BookOpen,
  LifeBuoy,
  Mail,
  CloudRain,
  Satellite,
  RadioTower,
  Users,
  MapPin
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Full-width Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-900 to-cyan-800 text-white py-24 px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="w-full max-w-8xl mx-auto"
        >
          <motion.div
            variants={fadeIn}
            className="flex flex-col lg:flex-row items-center bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Hero Content */}
            <div className="w-full lg:w-1/2 p-12">
              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Flood Monitoring & Alert System
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Empowering Budalangi Community with Real-Time Flood Protection
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex items-center gap-4 text-cyan-300"
              >
                <ShieldAlert className="w-8 h-8" />
                <span className="font-semibold">24/7 Community Protection</span>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <div className="w-full lg:w-1/2 h-96 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center relative">
              <Globe className="absolute w-48 h-48 text-white/10 animate-pulse" />
              <Droplet className="w-24 h-24 text-white animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Full-width Content Sections */}
      <main className="flex-1 w-full bg-gradient-to-b from-blue-50 to-cyan-50 py-16 px-4 md:px-8 lg:px-16">
        {/* Mission Section */}
        <section className="w-full max-w-8xl mx-auto mb-20 grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-xl h-full"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Reduce flood impact through timely alerts, community reporting, and 
              educational resources. Building a resilient, proactive Budalangi 
              through technology and collaboration.
            </p>
            <div className="flex items-center gap-4 text-cyan-600">
              <CloudRain className="w-8 h-8" />
              <span className="font-semibold">15+ Years Flood History Analyzed</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="bg-gradient-to-br from-blue-900 to-cyan-800 text-white p-8 rounded-2xl shadow-2xl h-full"
          >
        <div className="bg-gradient-to-br from-blue-900 to-cyan-800 text-white p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <ShieldCheck className="w-12 h-12 text-cyan-400" />
                  <h3 className="text-2xl font-bold">Security & Reliability</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-400 text-blue-900 px-3 py-1 rounded-full">Uptime</span>
                    99.9% System Availability
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-400 text-blue-900 px-3 py-1 rounded-full">Encryption</span>
                    Military-Grade Data Protection
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-400 text-blue-900 px-3 py-1 rounded-full">Certified</span>
                    ISO 27001 Compliant
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-400 text-blue-900 px-3 py-1 rounded-full">Alerts</span>
                    3-Second Notification Delivery
                  </div>
                </div>
                <p className="mt-6 text-cyan-100 text-sm">
                  Our infrastructure undergoes regular security audits and stress tests to ensure uninterrupted service.
                </p>
          </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="w-full max-w-8xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Key Features & Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: AlertCircle,
                title: "Real-Time Monitoring",
                content: "24/7 surveillance of water levels and weather patterns"
              },
              { 
                icon: RadioTower,
                title: "Community Reporting",
                content: "Image-based incident reports with GPS tagging"
              },
              { 
                icon: BookOpen,
                title: "Educational Hub",
                content: "Interactive flood preparedness resources"
              },
              { 
                icon: Users,
                title: "Role-Based Access",
                content: "Dedicated portals for different user types"
              },
              { 
                icon: MapPin,
                title: "Risk Mapping",
                content: "Interactive flood zone visualization"
              },
              { 
                icon: ShieldAlert,
                title: "Predictive Analytics",
                content: "AI-powered flood prediction models"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                className="bg-white p-6 rounded-xl shadow-lg h-full hover:shadow-xl transition-all"
              >
                <item.icon className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Full-width Impact Section */}
        <section className="w-full bg-gradient-to-r from-blue-900 to-cyan-800 text-white py-20 mb-20">
          <div className="max-w-8xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Community Impact</h2>
              <p className="text-lg opacity-90 mb-6">
                Since implementation, FMAS has transformed flood management in Budalangi:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "95%", label: "Alert Accuracy" },
                  { value: "30min", label: "Response Time" },
                  { value: "10k+", label: "Lives Protected" },
                  { value: "24/7", label: "Monitoring" },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">User Testimonial</h3>
                <p className="opacity-90 italic mb-4">
                  "FMAS warnings helped us evacuate safely last season. We're now better prepared."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-400 rounded-full" />
                  <div>
                    <div className="font-semibold">Local Farmer</div>
                    <div className="text-sm opacity-75">Budalangi Community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width CTA */}
        <section className="w-full max-w-8xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white p-12 rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Flood Protection Network</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Get real-time alerts, contribute reports, and access life-saving resources
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center max-h-dvh"
                    >
                      <Link
                        to="/donate"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg flex items-center gap-2"
                      >
                        <HeartHandshake className="w-5 h-5" />
                        Donate
                      </Link>
                      <Link
                        to="/alerts"
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg flex items-center gap-2"
                      >
                        <AlertTriangle className="w-5 h-5" />
                        View Alerts
                      </Link>
                    </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;