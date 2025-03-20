// src/pages/Home.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Select, { MultiValue } from "react-select";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Icons & Assets
import {
  FaMapMarkerAlt,
  FaBell,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaUsers,
  FaMap,
} from "react-icons/fa";
import {
  AlertTriangle,
  HeartHandshake,
  ShieldCheck,
  Mail,
  Phone,
  Download,
  Video,
  Plus,
  Minus,
} from "lucide-react";

import Hero1 from "../assets/Budalangi1.jpeg";
import Hero2 from "../assets/Budalangi3.jpg";
import Hero3 from "../assets/floodResponse.png";
import Hero4 from "../assets/Budalangi8.jpeg";
import Hero5 from "../assets/Budalangi9.jpeg";
import Hero6 from "../assets/Budalangi6.jpeg";
import monitorIcon from "../assets/floodMonitoring.png";
import alertIcon from "../assets/alert.png";
import reourceImage from "../assets/resourceAllocation.png";
import floodImage from "../assets/floodResponse.png";
import county from "../assets/regional.png";
import regional from "../assets/volunti.png";
import volunteer from "../assets/volunteer.png";
import beneficiary from "../assets/beneficiary.png";

// Example PDF/Video Thumbnails
import PdfThumb from "../assets/Budalangi3.jpg";
import Pdf from "../assets/flood.png";
import VideoThumb from "../assets/alert.png";
import ContactComponent from "./ContactComponent";

const Home: React.FC = () => {
  const { t } = useTranslation();

  // 
  // Carousel / Hero Section State
  //
  const heroImages = [Hero1, Hero2, Hero4, Hero5,Hero6];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Slide changes every 5 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // For the Ken Burns effect, we can simply animate scale from 1 to 1.1
  // or use motion.div with a key per image

  // ==============================
  // Subscription Form
  // ==============================
  const [subscriptionMethod, setSubscriptionMethod] = useState("");
  const [contact, setContact] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<
    { value: string; label: string }[]
  >([]);
  const [statusMessage, setStatusMessage] = useState("");

  const locationOptions = [
    { value: "Bumadeya", label: "Bumadeya" },
    { value: "Budalangi Central", label: "Budalangi Central" },
    { value: "Budubusi", label: "Budubusi" },
    { value: "Mundere", label: "Mundere" },
    { value: "Musoma", label: "Musoma" },
    { value: "Sibuka", label: "Sibuka" },
    { value: "Sio Port", label: "Sio Port" },
    { value: "Rukala", label: "Rukala" },
    { value: "Mukhweya", label: "Mukhweya" },
    { value: "Sigulu Island", label: "Sigulu Island" },
    { value: "Siyaya", label: "Siyaya" },
    { value: "Nambuku", label: "Nambuku" },
    { value: "West Bunyala", label: "West Bunyala" },
    { value: "East Bunyala", label: "East Bunyala" },
    { value: "South Bunyala", label: "South Bunyala" },
  ];

  const handleLocationChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    setSelectedLocations(selectedOptions as { value: string; label: string }[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionMethod || !contact || selectedLocations.length === 0) {
      setStatusMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/subscriptions", {
        method: subscriptionMethod,
        contact: contact,
        locations: selectedLocations.map((loc) => loc.value),
      });
      alert("Subscription submitted successfully!");
      setStatusMessage(response.data.message);
      setSubscriptionMethod("");
      setContact("");
      setSelectedLocations([]);
    } catch (error) {
      setStatusMessage("Subscription failed. Try again.");
    }
  };

  // ==============================
  // Short FAQ Section
  // ==============================
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const shortFAQ = [
    {
      question: "How can I report a flood incident?",
      answer:
        "You can submit a detailed report with images and location data through our Report page. The system verifies your report before generating alerts to the community.",
    },
    {
      question: "How do I receive alerts?",
      answer:
        "Flood alerts are delivered through SMS, email, or push notifications. You can customize your preferences and choose multiple channels to ensure you never miss an important update.",
    },
    {
      question: "Is my data secure?",
      answer:
        "We prioritize data security with encryption, role-based access, and compliance with data protection regulations. Your personal information remains confidential and protected.",
    },
  ];

  // ==============================
  // Animation Variants
  // ==============================
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50">
      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION with Carousel */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            {heroImages.map((img, index) =>
              index === currentSlide ? (
                <motion.div
                  key={index}
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${img})` }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 2 }}
                />
              ) : null
            )}
          </AnimatePresence>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Flood Monitoring & Alert System
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-8"
          >
            Empowering the Budalangi community with real-time flood alerts,
            intuitive reporting, and comprehensive resources for safer, more
            resilient living.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
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
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="py-16 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Flood Monitoring",
                icon: <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
                image: monitorIcon,
                text: "Our system tracks water levels & weather patterns in real-time.",
              },
              {
                title: "Flood Alerts",
                icon: <FaBell className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
                image: alertIcon,
                text: "Receive instant alerts via SMS, email, or push notifications.",
              },
              {
                title: "Resource Allocation",
                icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
                image: reourceImage,
                text: "We coordinate supplies & volunteers to areas most in need.",
              },
              {
                title: "Flood Response",
                icon: <FaShieldAlt className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
                image: floodImage,
                text: "Collaborate with local agencies for quick & efficient response.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-contain p-4"
                />
                <div className="p-4 text-center">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-cyan-800 text-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Help Us Save Lives
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
          >
            Your donation fuels real-time monitoring, emergency responses, and
            community training—ensuring that those most vulnerable are protected
            when floods strike.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/donate"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
            >
              Donate Now
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-center text-blue-900">
            Subscribe for Alerts
          </h2>
          <form
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
            onSubmit={handleSubmit}
          >
            {subscriptionMethod === "sms" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300"
              >
                <p className="text-yellow-800 font-bold animate-pulse">
                  ⚠️ Remember to dial <span className="underline">*456*9*5#</span> on your phone to enable promotional messages!
                </p>
              </motion.div>
            )}

            <div className="mb-6">
              <label className="block text-left text-blue-900 font-semibold mb-2">
                Select Subscription Method
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 appearance-none"
                value={subscriptionMethod}
                onChange={(e) => setSubscriptionMethod(e.target.value)}
              >
                <option value="">-- Choose Method --</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-left text-blue-900 font-semibold mb-2">
                {subscriptionMethod === "email"
                  ? "Enter your Email"
                  : "Enter your Phone Number"}
              </label>
              <input
                type="text"
                placeholder={
                  subscriptionMethod === "email"
                    ? "jane@example.com"
                    : "+254 700 000 000"
                }
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-left text-blue-900 font-semibold mb-2">
                Select Locations
              </label>
              <Select
                isMulti
                options={locationOptions}
                value={selectedLocations}
                onChange={handleLocationChange}
                classNamePrefix="select"
                placeholder="Select locations..."
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "8px",
                    boxShadow: "none",
                    "&:hover": { borderColor: "#06b6d4" },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#dbeafe",
                    borderRadius: "8px",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#1e40af",
                    fontWeight: "600",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "#1e40af",
                    "&:hover": {
                      backgroundColor: "#93c5fd",
                    },
                  }),
                }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-4 px-8 rounded-xl font-bold shadow-lg transition-all"
              type="submit"
            >
              Subscribe
            </motion.button>

            <p className="mt-4 text-green-600 font-medium text-center">
              {statusMessage}
            </p>
          </form>
        </div>
      </section>

      {/* REPORT NOW SECTION */}
      <section className="relative py-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${Hero2})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-800/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Report Flood Incidents
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Submit detailed reports with images and locations to help us verify
            and alert the community faster.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/report"
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
            >
              <AlertTriangle className="w-6 h-6 mr-2" />
              Report Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PUBLICATIONS & VIDEOS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center">
            Publications & Videos
          </h2>
          <p className="text-center text-gray-700 mb-12">
            Browse a selection of our most popular guides and tutorials. For
            more resources, click below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample PDF */}
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition"
              whileHover={{ y: -5 }}
            >
              <img
                src={Pdf}
                alt="Flood Preparedness PDF"
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Flood Preparedness Handbook
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                A comprehensive guide to preparing for floods.
              </p>
              <a
                href="/pdfs/EmergencyPlan.pdf"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full font-medium"
                download
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </motion.div>
            {/* Sample Video */}
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition"
              whileHover={{ y: -5 }}
            >
              <img
                src={VideoThumb}
                alt="Flood Reporting Tutorial"
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Flood Reporting Tutorial
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Step-by-step video on how to submit flood reports.
              </p>
              <a
                href="https://www.youtube.com/watch?v=i906ouUW-hw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full font-medium"
              >
                <Video className="w-4 h-4 mr-2" />
                Watch Video
              </a>
            </motion.div>
            {/* Another PDF or Video */}
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition"
              whileHover={{ y: -5 }}
            >
              <img
                src={PdfThumb}
                alt="Emergency Response Protocol"
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Emergency Response Protocol
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Official guidelines for local emergency response teams.
              </p>
              <a
                href="https://reliefweb.int/report/kenya/kenya-el-nino-floods-2023-emergency-appeal-mdrke058"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                View
              </a>
            </motion.div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/userResources"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:from-cyan-600 hover:to-blue-700 transition"
            >
              View More Resources
            </Link>
          </div>
        </div>
      </section>

      {/* SHORT FAQ SECTION */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {shortFAQ.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {item.question}
                  </span>
                  <div className="text-blue-600">
                    {openFAQ === index ? <Minus /> : <Plus />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 overflow-hidden"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/faq"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:from-cyan-600 hover:to-blue-700 transition"
            >
              View Full FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* OUR IMPACT SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "County Branches",
                value: "12",
                icon: <FaMap className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
                image: county,
              },
              {
                label: "Regional Offices",
                value: "20",
                icon: (
                  <FaUsers className="w-12 h-12 mx-auto mb-4 text-blue-900" />
                ),
                image: regional,
              },
              {
                label: "Members & Volunteers",
                value: "5k+",
                icon: (
                  <FaUsers className="w-12 h-12 mx-auto mb-4 text-blue-900" />
                ),
                image: volunteer,
              },
              {
                label: "Beneficiaries Supported",
                value: "1k+",
                icon: (
                  <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-blue-900" />
                ),
                image: beneficiary,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={stat.image}
                  alt={stat.label}
                  className="w-full h-40 object-contain p-4"
                />
                <div className="p-4 text-center">
                  {stat.icon}
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US SNIPPET */}
      <section className="py-16 bg-blue-50">
        {/* <ContactComponent /> */}
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Have questions, need assistance, or want to learn more? Reach out to
            us anytime—we’re here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:from-cyan-600 hover:to-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>
        
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import axios from "axios";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Select, { MultiValue } from "react-select";
// import { FaBell, FaMapMarkerAlt, FaHandHoldingHeart, FaShieldAlt, FaUsers, FaMap } from "react-icons/fa";
// import { 
//   Bell, MapPin, HeartHandshake, Shield, Users, Map, AlertTriangle, 
//   DownloadCloud, Mail, Smartphone, ChevronDown 
// } from "lucide-react";

// import HeroUrl from '../assets/sig.jpg';
// import ReportImage from "../assets/Budalangi1.jpeg";
// import floodImage from "../assets/floodResponse.png";
// import reourceImage from "../assets/resourceAllocation.png";
// import alertIcon from "../assets/alert.png";
// import monitorIcon from "../assets/floodMonitoring.png";
// import county from "../assets/regional.png";
// import regional from "../assets/volunti.png";
// import Hero from "../assets/Budalangi3.jpg";
// import beneficiary from "../assets/beneficiary.png";
// import volunteer from "../assets/volunteer.png";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Home: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { t, i18n } = useTranslation();
//   const [subscriptionMethod, setSubscriptionMethod] = useState("");
//   const [contact, setContact] = useState("");
//   const [selectedLocations, setSelectedLocations] = useState<{ value: string; label: string }[]>([]);
//   const [statusMessage, setStatusMessage] = useState("");
//   const [scrollY, setScrollY] = useState(0);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//   };

//   const staggerChildren = {
//     visible: { transition: { staggerChildren: 0.1 } }
//   };

//   const locationOptions = [
//     { value: "Bumadeya", label: "Bumadeya" },
//     { value: "Budalangi Central", label: "Budalangi Central" },
//     { value: "Budubusi", label: "Budubusi" },
//     { value: "Mundere", label: "Mundere" },
//     { value: "Musoma", label: "Musoma" },
//     { value: "Sibuka", label: "Sibuka" },
//     { value: "Sio Port", label: "Sio Port" },
//     { value: "Rukala", label: "Rukala" },
//     { value: "Mukhweya", label: "Mukhweya" },
//     { value: "Sigulu Island", label: "Sigulu Island" },
//     { value: "Siyaya", label: "Siyaya" },
//     { value: "Nambuku", label: "Nambuku" },
//     { value: "West Bunyala", label: "West Bunyala" },
//     { value: "East Bunyala", label: "East Bunyala" },
//     { value: "South Bunyala", label: "South Bunyala" },
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!subscriptionMethod || !contact || selectedLocations.length === 0) {
//       setStatusMessage("All fields are required!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/subscriptions", {
//         method: subscriptionMethod,
//         contact: contact,
//         locations: selectedLocations.map((loc) => loc.value),
//       });
//       alert("Report submitted successfully!");
//       setStatusMessage(response.data.message);
//       setSubscriptionMethod("");
//       setContact("");
//       setSelectedLocations([]);
//     } catch (error) {
//       setStatusMessage("Subscription failed. Try again.");
//     }
//   };

//   const handleLocationChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
//     setSelectedLocations(selectedOptions as { value: string; label: string }[]);
//   };

//   return (
//     <div className="min-h-screen flex flex-col relative">
//       {/* Parallax Background Layers with Overlay */}
//       <div className="fixed inset-0 -z-10">
//         <motion.div 
//           className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
//           style={{ 
//             opacity: 1 - Math.min(scrollY / 1000, 1),
//             backgroundImage: `url(${Hero})`,
//             filter: `blur(${Math.min(scrollY / 100, 4)}px)`
//           }}
//         />
//         <motion.div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ 
//             opacity: Math.min(scrollY / 1000, 1),
//             backgroundImage: `url(${ReportImage})`,
//             filter: `blur(${Math.min(scrollY / 100, 4)}px)`
//           }}
//         />
//         {/* Overlay Layer */}
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-cyan-800/60"></div>
//       </div>

//       {/* Navbar */}
//       <div className="relative z-50"><Navbar /></div>

//       {/* Hero Section */}
//       <motion.section 
//         style={{ opacity }}
//         className="relative h-screen flex flex-col justify-center items-center text-center text-white"
//       >
//         <motion.div 
//           initial="hidden"
//           animate="visible"
//           variants={staggerChildren}
//           className="relative z-10 w-full max-w-7xl px-4"
//         >
//           <motion.h1 
//             variants={fadeIn}
//             className="text-4xl md:text-6xl font-black mb-6 text-white"
//           >
//             {t("hero.title")}
//           </motion.h1>
//           <motion.p 
//             variants={fadeIn}
//             className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white"
//           >
//             {t("hero.description")}
//           </motion.p>
//           <motion.div 
//             variants={fadeIn}
//             className="flex gap-4 justify-center"
//           >
//             <Link
//               to="/donate"
//               className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg flex items-center gap-2"
//             >
//               <HeartHandshake className="w-5 h-5" />
//               {t("navbar.donate")}
//             </Link>
//             <Link
//               to="/alerts"
//               className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg flex items-center gap-2"
//             >
//               <AlertTriangle className="w-5 h-5" />
//               {t("navbar.alerts")}
//             </Link>
//           </motion.div>
//         </motion.div>
//       </motion.section>

//       {/* What We Do Section */}
//       <motion.section 
//         className="py-16 bg-white/90 backdrop-blur-sm relative"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">{t("whatWeDo.title")}</h2>
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
//           {[
//             {
//               title: t("whatWeDo.floodMonitoring"),
//               icon: <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: monitorIcon,
//             },
//             {
//               title: t("whatWeDo.floodAlert"),
//               icon: <FaBell className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: alertIcon,
//             },
//             {
//               title: t("whatWeDo.resourceAllocation"),
//               icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: reourceImage,
//             },
//             {
//               title: t("whatWeDo.floodResponse"),
//               icon: <FaShieldAlt className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: floodImage,
//             },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
//               whileHover={{ y: -5 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <img 
//                 src={item.image} 
//                 alt={item.title} 
//                 className="w-full h-30 object-cover object-center" 
//               />
//               <div className="p-4">
//                 {item.icon}
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
//                 <p className="text-gray-600 text-sm">{t("whatWeDo.description")}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Subscribe Section */}
//       <section className="py-20 relative bg-gradient-to-br from-blue-900/95 to-cyan-800/95 backdrop-blur-sm">
//         <div className="max-w-2xl mx-auto px-4">
//           <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-center">
//             {t("subscribe.title")}
//           </h2>
//           <form
//             className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
//             onSubmit={handleSubmit}
//           >
//             {subscriptionMethod === "sms" && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300"
//               >
//                 <p className="text-yellow-800 font-bold animate-pulse">
//                   ⚠️ {t("subscribe.smsWarning")} <span className="underline">*456*9*5#</span>
//                 </p>
//               </motion.div>
//             )}

//             <div className="mb-6">
//               <label className="block text-left text-blue-900 font-semibold mb-2">
//                 {t("subscribe.method")}
//               </label>
//               <select
//                 className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 appearance-none"
//                 value={subscriptionMethod}
//                 onChange={(e) => setSubscriptionMethod(e.target.value)}
//               >
//                 <option value="">{t("subscribe.selectMethod")}</option>
//                 <option value="email">{t("subscribe.email")}</option>
//                 <option value="sms">{t("subscribe.sms")}</option>
//               </select>
//             </div>
//             <div className="mb-6">
//               <label className="block text-left text-blue-900 font-semibold mb-2">
//                 {subscriptionMethod === "email" ? t("subscribe.emailPlaceholder") : t("subscribe.phonePlaceholder")}
//               </label>
//               <input
//                 type="text"
//                 placeholder={subscriptionMethod === "email" ? "Enter your email" : "Enter your phone number"}
//                 className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
//                 value={contact}
//                 onChange={(e) => setContact(e.target.value)}
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-left text-blue-900 font-semibold mb-2">
//                 {t("subscribe.selectLocation")}
//               </label>
//               <Select
//                 isMulti
//                 options={locationOptions}
//                 value={selectedLocations}
//                 onChange={handleLocationChange}
//                 classNamePrefix="select"
//                 placeholder="Select locations..."
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "12px",
//                     padding: "8px",
//                     boxShadow: "none",
//                     "&:hover": { borderColor: "#06b6d4" }
//                   }),
//                   multiValue: (base) => ({
//                     ...base,
//                     backgroundColor: "#dbeafe",
//                     borderRadius: "8px",
//                   }),
//                   multiValueLabel: (base) => ({
//                     ...base,
//                     color: "#1e40af",
//                     fontWeight: "600",
//                   }),
//                   multiValueRemove: (base) => ({
//                     ...base,
//                     color: "#1e40af",
//                     "&:hover": {
//                       backgroundColor: "#93c5fd",
//                     },
//                   }),
//                 }}
//               />
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-4 px-8 rounded-xl font-bold shadow-lg transition-all"
//               type="submit"
//             >
//               {t("subscribe.subscribeButton")}
//             </motion.button>

//             <p className="mt-4 text-green-600 font-medium text-center">{statusMessage}</p>
//           </form>
//         </div>
//       </section>

//       {/* Report Now Section */}
//       <section className="relative py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-800/60" />
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 max-w-4xl mx-auto text-center px-4"
//         >
//           <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
//             {t("reportFlood.title")}
//           </h2>
//           <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
//             {t("reportFlood.description")}
//           </p>
//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Link
//               to="/report"
//               className="inline-flex items-center bg-white text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-cyan-50 transition-all"
//             >
//               <AlertTriangle className="w-6 h-6 mr-2" />
//               {t("reportFlood.button")}
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Our Impact Section */}
//       <section className="py-16 bg-blue-900/95 backdrop-blur-sm relative">
//         <h2 className="text-4xl font-bold text-white mb-12 text-center">{t("analytics.title")}</h2>
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
//           {[
//             {
//               label: "County Branches",
//               value: "12",
//               icon: <FaMap className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: county,
//             },
//             {
//               label: "Regional Offices",
//               value: "20",
//               icon: <FaUsers className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: regional,
//             },
//             {
//               label: "Members & Volunteers",
//               value: "5k+",
//               icon: <FaUsers className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: volunteer,
//             },
//             {
//               label: "Beneficiaries Supported",
//               value: "1k+",
//               icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
//               image: beneficiary,
//             },
//           ].map((stat, index) => (
//             <motion.div
//               key={index}
//               className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <img 
//                 src={stat.image} 
//                 alt={stat.label} 
//                 className="w-full h-40 object-contain p-4" 
//               />
//               <div className="p-4 text-center">
//                 {stat.icon}
//                 <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
//                 <p className="text-gray-600">{stat.label}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
      


//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;
