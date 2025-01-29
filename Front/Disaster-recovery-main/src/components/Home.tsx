import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n} = useTranslation() as any;//
  //  ✅ Correct way to use `t()`
const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "sw" : "en");
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-extrabold tracking-wide">
            {t("navbar.title")}
          </div>
           <button
            onClick={toggleLanguage}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition"
          >
            {t("languageToggle")}
          </button>

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden focus:outline-none text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Links */}
          <ul
            className={`lg:flex lg:items-center lg:gap-8 ${
              isMenuOpen ? "flex flex-col mt-4 gap-4" : "hidden"
            }`}
          >
            <li>
              <Link
                to="/"
                className="hover:text-yellow-300 transition-all duration-200"
              >
                {t("navbar.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-300 transition-all duration-200"
              >
                {t("navbar.about")}
              </Link>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-yellow-300 transition-all duration-200">
                {t("navbar.getInvolved")}
              </span>
              <ul className="absolute hidden group-hover:flex flex-col bg-blue-900 mt-2 py-2 px-4 text-sm shadow-lg border-t-2 border-yellow-300">
                <li>
                  <Link to="/donate" className="hover:text-yellow-300">
                    {t("navbar.donate")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-yellow-300 transition-all duration-200">
                {t("navbar.resources")}
              </span>
              <ul className="absolute hidden group-hover:flex flex-col bg-blue-900 mt-2 py-2 px-4 text-sm shadow-lg border-t-2 border-yellow-300">
                <li>
                  <Link to="/impact-stories" className="hover:text-yellow-300">
                    {t("navbar.impactStories")}
                  </Link>
                </li>
                <li>
                  <Link to="/annual-reports" className="hover:text-yellow-300">
                   {t("navbar.annualReports")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/agencies"
                className="hover:text-yellow-300 transition-all duration-200"
              >
                {t("navbar.agencies")}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-300 transition-all duration-200"
              >
                {t("navbar.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1920x1080/003a8c/ffffff?text=Flood+Management')",
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

      {/* Subscribe Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          {t("subscribe.title")}
        </h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-medium mb-2">
               {t("subscribe.method")}
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>
               {t("subscribe.selectMethod")}
              </option>
              <option value="email">{t("subscribe.email")}</option>
              <option value="sms">{t("subscribe.sms")}</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your email or phone number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            {t("subscribe.subscribeButton")}
          </button>
        </form>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">What We Do</h2>
        <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
          {["Flood Monitoring", "Flood Alert", "Resource Allocation", "Flood Response"].map(
            (item, index) => (
              <div
                key={index}
                className="p-6 bg-blue-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={`https://via.placeholder.com/64?text=${item}`}
                  alt={item}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-blue-900 mb-2">{item}</h3>
                <p className="text-gray-600">Learn more about our {item} efforts.</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-16 bg-blue-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t("analytics.title")}</h2>
        <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
          {[
            { label: "County Branches", value: "12" },
            { label: "Regional Offices", value: "20" },
            { label: "Members & Volunteers", value: "5k+" },
            { label: "Beneficiaries Supported", value: "1k+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-blue-800 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-4xl font-bold text-yellow-400">{stat.value}</h3>
              <p className="text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Report Now Section */}
      <section
        className="bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1920x1080/003a8c/ffffff?text=Report+Flood+Now')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-md">
          <h2 className="text-3xl font-bold mb-4">Report Flood Incidents</h2>
          <Link
            to="/report"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md text-lg transition-all duration-200"
          >
            Report Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-sm text-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
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
