import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { motion } from "framer-motion";
import Select, { MultiValue } from "react-select";
import { FaBell, FaMapMarkerAlt, FaHandHoldingHeart, FaShieldAlt, FaUsers, FaMap } from "react-icons/fa";
import { 
  Bell, MapPin, HeartHandshake, Shield, Users, Map, AlertTriangle, 
  DownloadCloud, Mail, Smartphone, ChevronDown 
} from "lucide-react";

import HeroUrl from '../assets/sig.jpg';
import ReportImage from "../assets/report.jpg";
import floodImage from "../assets/floodResponse.png";
import reourceImage from "../assets/resourceAllocation.png";
import alertIcon from "../assets/alert.png";
import monitorIcon from "../assets/floodMonitoring.png";
import county from "../assets/county.png";
import regional from "../assets/regi.png";
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
    { value: "Musoma", label: "Musoma" },    { value: "Sibuka", label: "Sibuka" },
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
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
        <Navbar />
   <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="relative h-[80vh] flex flex-col justify-center items-center text-center text-white"
      >
        <div className="absolute inset-0 w-full h-full">
          <img src={HeroUrl} alt="Hero" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-cyan-900/40" />
        </div>
        
        <motion.div 
          variants={fadeIn}
          className="relative z-10 w-full max-w-7xl px-4"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100"
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

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-cyan-800">
        <div className="max-w-2xl mx-auto px-4">
    <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">{t("subscribe.title")}</h2>
    <form
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      onSubmit={handleSubmit}
    >
      {/* Subscription Method */}
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

      {/* Contact Input */}
      <div className="mb-6">
        <label className="block text-left text-blue-900 font-semibold mb-2">
          {subscriptionMethod === "email" ? t("subscribe.emailPlaceholder") : t("subscribe.phonePlaceholder")}
        </label>
        <input
          type="text"
          placeholder={subscriptionMethod === "email" ? "Enter your email" : "Enter your phone number"}
          className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 appearance-none"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      {/* Location Selection */}
      <div className="mb-6">
        <label className="block text-left text-blue-900 font-semibold mb-2">
          {t("subscribe.selectLocation")}
        </label>
        <Select
        
          isMulti
          options={locationOptions}
          value={selectedLocations}
          onChange={handleLocationChange}
          className="basic-multi-select w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 appearance-none "
          classNamePrefix="select"
          placeholder="Select locations..."
          styles={{
            control: (base) => ({
              ...base,
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#3b82f6",
              },
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#dbeafe",
              borderRadius: "0.375rem",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#1e40af",
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
            
            
      
      {/* Submit Button */}
      <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-4 px-8 rounded-xl font-bold shadow-lg transition-all"
                type="submit"
              >
                {t("subscribe.subscribeButton")}
        </motion.button>

      {/* Status Message */}
      <p className="mt-4 text-green-600 font-medium">{statusMessage}</p>
    </form>
  </div>
  </section>
      
{/* What We Do Section */}
<section className="py-16 bg-white text-center">
  <h2 className="text-4xl font-bold text-blue-900 mb-12">{t("whatWeDo.title")}</h2>
  <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
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
      <div
        key={index}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      >
        <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
        <div className="p-6">
          {item.icon}
          <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
          <p className="text-gray-600">{t("whatWeDo.description")}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      
      {/* Report Now Section */}
<section className="relative py-32 overflow-hidden">
        <img 
          src={ReportImage} 
          alt="Report Background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
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
<section className="py-16 bg-blue-900 text-white text-center p-8 mt-4 mb-6 ">
  <h2 className="text-4xl font-bold mb-12">{t("analytics.title")}</h2>
  <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
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
      <div
        key={index}
        className="bg-blue-800 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      >
        <img src={stat.image} alt={stat.label} className="w-full h-70 object-cover p-5" />
        <div className="p-6">
          {stat.icon}
          <h3 className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</h3>
          <p className="text-lg mt-2">{stat.label}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;




















