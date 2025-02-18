// components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FaBell, FaMapMarkerAlt, FaHandHoldingHeart, FaShieldAlt, FaUsers, FaMap } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();



  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "sw" : "en");
  };
  

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-wide">
          {t("navbar.title")}
        </div>
        <button
          onClick={toggleLanguage}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition"
        >
          {t("languageToggle")}
        </button>

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
                <Link to="/userReSources" className="hover:text-yellow-300">
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
              to="/userReSources"
              className="hover:text-yellow-300 transition-all duration-200"
            >
              Resources
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
  );
};

export default Navbar;