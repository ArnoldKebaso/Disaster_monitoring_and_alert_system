import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import Select, { MultiValue } from "react-select";
import { FaBell, FaMapMarkerAlt, FaHandHoldingHeart, FaShieldAlt, FaUsers, FaMap } from "react-icons/fa";
import { 
  Bell, MapPin, HeartHandshake, Shield, Users, Map, AlertTriangle, 
  DownloadCloud, Mail, Smartphone, ChevronDown 
} from "lucide-react";

import HeroUrl from '../assets/sig.jpg';
import ReportImage from "../assets/Budalangi1.jpeg";
import floodImage from "../assets/floodResponse.png";
import reourceImage from "../assets/resourceAllocation.png";
import alertIcon from "../assets/alert.png";
import monitorIcon from "../assets/floodMonitoring.png";
import county from "../assets/regional.png";
import regional from "../assets/volunti.png";
import Hero from "../assets/Budalangi3.jpg";
import beneficiary from "../assets/beneficiary.png";
import volunteer from "../assets/volunteer.png";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [subscriptionMethod, setSubscriptionMethod] = useState("");
  const [contact, setContact] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<{ value: string; label: string }[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

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
      alert("Report submitted successfully!");
      setStatusMessage(response.data.message);
      setSubscriptionMethod("");
      setContact("");
      setSelectedLocations([]);
    } catch (error) {
      setStatusMessage("Subscription failed. Try again.");
    }
  };

  const handleLocationChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    setSelectedLocations(selectedOptions as { value: string; label: string }[]);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            opacity: 1 - Math.min(scrollY / 1000, 1),
            backgroundImage: `url(${Hero})`,
            filter: `blur(${Math.min(scrollY / 100, 4)}px)`
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            opacity: Math.min(scrollY / 1000, 1),
            backgroundImage: `url(${ReportImage})`,
            filter: `blur(${Math.min(scrollY / 100, 4)}px)`
          }}
        />
      </div>

      {/* Navbar */}
      <div className="relative z-50"><Navbar /></div>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity }}
        className="relative h-screen flex flex-col justify-center items-center text-center text-white"
      >
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative z-10 w-full max-w-7xl px-4"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-black mb-6 text-white-500"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white-500"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div 
            variants={fadeIn}
            className="flex gap-4 justify-center"
          >
            <Link
              to="/donate"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <HeartHandshake className="w-5 h-5" />
              {t("navbar.donate")}
            </Link>
            <Link
              to="/alerts"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              {t("navbar.alerts")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* What We Do Section */}
      <motion.section 
        className="py-16 bg-white/90 backdrop-blur-sm relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">{t("whatWeDo.title")}</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            {
              title: t("whatWeDo.floodMonitoring"),
              icon: <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
              image: monitorIcon,
            },
            {
              title: t("whatWeDo.floodAlert"),
              icon: <FaBell className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
              image: alertIcon,
            },
            {
              title: t("whatWeDo.resourceAllocation"),
              icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
              image: reourceImage,
            },
            {
              title: t("whatWeDo.floodResponse"),
              icon: <FaShieldAlt className="w-12 h-12 mx-auto mb-4 text-blue-900" />,
              image: floodImage,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-30 object-cover object-center" 
              />
              <div className="p-4">
                {item.icon}
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{t("whatWeDo.description")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Subscribe Section */}
      <section className="py-20 relative bg-gradient-to-br from-blue-900/95 to-cyan-800/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-center">
            {t("subscribe.title")}
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
                  ⚠️ {t("subscribe.smsWarning")} <span className="underline">*456*9*5#</span>
                </p>
              </motion.div>
            )}

            <div className="mb-6">
              <label className="block text-left text-blue-900 font-semibold mb-2">
                {t("subscribe.method")}
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 appearance-none"
                value={subscriptionMethod}
                onChange={(e) => setSubscriptionMethod(e.target.value)}
              >
                <option value="">{t("subscribe.selectMethod")}</option>
                <option value="email">{t("subscribe.email")}</option>
                <option value="sms">{t("subscribe.sms")}</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-left text-blue-900 font-semibold mb-2">
                {subscriptionMethod === "email" ? t("subscribe.emailPlaceholder") : t("subscribe.phonePlaceholder")}
              </label>
              <input
                type="text"
                placeholder={subscriptionMethod === "email" ? "Enter your email" : "Enter your phone number"}
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-left text-blue-900 font-semibold mb-2">
                {t("subscribe.selectLocation")}
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
                    "&:hover": { borderColor: "#06b6d4" }
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
              {t("subscribe.subscribeButton")}
            </motion.button>

            <p className="mt-4 text-green-600 font-medium text-center">{statusMessage}</p>
          </form>
        </div>
      </section>

      {/* Report Now Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-800/60" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {t("reportFlood.title")}
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            {t("reportFlood.description")}
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/report"
              className="inline-flex items-center bg-white text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-cyan-50 transition-all"
            >
              <AlertTriangle className="w-6 h-6 mr-2" />
              {t("reportFlood.button")}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Impact Section */}
      <section className="py-16 bg-blue-900/95 backdrop-blur-sm relative">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">{t("analytics.title")}</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            {
              label: "County Branches",
              value: "12",
              icon: <FaMap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />,
              image: county,
            },
            {
              label: "Regional Offices",
              value: "20",
              icon: <FaUsers className="w-12 h-12 mx-auto mb-4 text-yellow-400" />,
              image: regional,
            },
            {
              label: "Members & Volunteers",
              value: "5k+",
              icon: <FaUsers className="w-12 h-12 mx-auto mb-4 text-yellow-400" />,
              image: volunteer,
            },
            {
              label: "Beneficiaries Supported",
              value: "1k+",
              icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-yellow-400" />,
              image: beneficiary,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-blue-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-blue-700"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={stat.image} 
                alt={stat.label} 
                className="w-full h-40 object-contain p-4" 
              />
              <div className="p-4 text-center">
                {stat.icon}
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">{stat.value}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;