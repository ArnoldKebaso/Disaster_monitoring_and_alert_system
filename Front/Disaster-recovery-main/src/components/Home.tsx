import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Select, { MultiValue } from "react-select";
import { FaBell, FaMapMarkerAlt, FaHandHoldingHeart, FaShieldAlt, FaUsers, FaMap } from "react-icons/fa";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [subscriptionMethod, setSubscriptionMethod] = useState("");
  const [contact, setContact] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<{ value: string; label: string }[]>([]);
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

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "sw" : "en");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-wide">
            {t("navbar.title")}
          </div>
          <button
            onClick={toggleLanguage}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition"
          >
            {t("languageToggle")}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-center text-white"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x1080/003a8c/ffffff?text=Flood+Management')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-md">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-lg lg:text-xl mb-6">
            {t("hero.description")}
          </p>
          <div className="flex gap-4">
            <Link
              to="/donate"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md text-lg transition-all duration-200"
            >
              {t("navbar.donate")}
            </Link>
            <Link
              to="/alerts"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md text-lg transition-all duration-200"
            >
              {t("navbar.alerts")}
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">What We Do</h2>
        <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
          {[
            { title: "Flood Monitoring", icon: <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4" /> },
            { title: "Flood Alert", icon: <FaBell className="w-12 h-12 mx-auto mb-4" /> },
            { title: "Resource Allocation", icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4" /> },
            { title: "Flood Response", icon: <FaShieldAlt className="w-12 h-12 mx-auto mb-4" /> },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-blue-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              {item.icon}
              <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">Learn more about our {item.title} efforts.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-16 bg-blue-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t("analytics.title")}</h2>
        <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
          {[
            { label: "County Branches", value: "12", icon: <FaMap className="w-12 h-12 mx-auto mb-4" /> },
            { label: "Regional Offices", value: "20", icon: <FaUsers className="w-12 h-12 mx-auto mb-4" /> },
            { label: "Members & Volunteers", value: "5k+", icon: <FaUsers className="w-12 h-12 mx-auto mb-4" /> },
            { label: "Beneficiaries Supported", value: "1k+", icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4" /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-blue-800 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              {stat.icon}
              <h3 className="text-4xl font-bold text-yellow-400">{stat.value}</h3>
              <p className="text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-sm text-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="text-gray-300">
              {[
                "Admin Portal",
                "Responder Portal",
                "User Dashboard",
                "Publications",
                "Impact Stories",
                "Donate",
                "About Us",
                "Contact Us",
              ].map((link, index) => (
                <li key={index} className="hover:text-yellow-300">
                  <Link to={`/${link.replace(" ", "-").toLowerCase()}`}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">{t("footer.contactTitle")}</h3>
            <p>{t("footer.phone")}</p>
            <p>{t("footer.email")}</p>
            <p>{t("footer.address")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;