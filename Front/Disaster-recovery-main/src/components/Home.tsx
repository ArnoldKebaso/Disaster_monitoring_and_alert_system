import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <div className="min-h-screen flex flex-col">
        {/* Navbar Section */}
        <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="text-2xl font-extrabold tracking-wide">
              Flood Management
            </div>

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
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Links Section */}
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
                  Home
                </Link>
              </li>
              <li className="relative group">
              <span className="cursor-pointer hover:text-yellow-300 transition-all duration-200">
                Who We Are
              </span>
                <ul className="absolute hidden group-hover:flex flex-col bg-blue-900 mt-2 py-2 px-4 text-sm shadow-lg border-t-2 border-yellow-300">
                  <li>
                    <Link to="/about" className="hover:text-yellow-300">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/management" className="hover:text-yellow-300">
                      Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/governance" className="hover:text-yellow-300">
                      Governance
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative group">
              <span className="cursor-pointer hover:text-yellow-300 transition-all duration-200">
                What We Do
              </span>
                <ul className="absolute hidden group-hover:flex flex-col bg-blue-900 mt-2 py-2 px-4 text-sm shadow-lg border-t-2 border-yellow-300">
                  <li>
                    <Link to="/disaster-management" className="hover:text-yellow-300">
                      Disaster Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/research" className="hover:text-yellow-300">
                      Early Warnings
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                    to="/contact"
                    className="hover:text-yellow-300 transition-all duration-200"
                >
                  Contact Us
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
                  "url('https://via.placeholder.com/1920x1080/003a8c/ffffff?text=Flood+Management')"
            }}
        >
          <div className="bg-black bg-opacity-50 p-8 rounded-md">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
              Be Prepared, Stay Safe
            </h1>
            <p className="text-lg lg:text-xl mb-6">
              Comprehensive Flood Monitoring and Disaster Management Solutions.
            </p>
            <Link
                to="/get-involved"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md text-lg transition-all duration-200"
            >
              Get Involved
            </Link>
          </div>
        </section>

        {/* Information Sections */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4">
            {/* Section Block */}
            <div className="text-center p-8 bg-white shadow-md hover:shadow-xl transition-all duration-200 rounded-lg border-t-4 border-yellow-400">
              <img
                  src="https://via.placeholder.com/64"
                  alt="What We Do"
                  className="mx-auto mb-6 w-16 h-16"
              />
              <h2 className="text-xl font-bold text-blue-900 mb-2">What We Do</h2>
              <p className="text-gray-600">
                We provide innovative disaster preparedness and flood monitoring services.
              </p>
            </div>

            {/* Section Block */}
            <div className="text-center p-8 bg-white shadow-md hover:shadow-xl transition-all duration-200 rounded-lg border-t-4 border-yellow-400">
              <img
                  src="https://via.placeholder.com/64"
                  alt="Who We Are"
                  className="mx-auto mb-6 w-16 h-16"
              />
              <h2 className="text-xl font-bold text-blue-900 mb-2">Who We Are</h2>
              <p className="text-gray-600">
                Our team is dedicated to early warning systems, disaster response, and community safety.
              </p>
            </div>

            {/* Section Block */}
            <div className="text-center p-8 bg-white shadow-md hover:shadow-xl transition-all duration-200 rounded-lg border-t-4 border-yellow-400">
              <img
                  src="https://via.placeholder.com/64"
                  alt="Get Involved"
                  className="mx-auto mb-6 w-16 h-16"
              />
              <h2 className="text-xl font-bold text-blue-900 mb-2">Get Involved</h2>
              <p className="text-gray-600">
                Join us as a volunteer or support us through donations to make a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-6 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Flood Management System. All rights
            reserved. | <Link to="/privacy" className="hover:text-yellow-300">Privacy Policy</Link> |
            <Link to="/terms" className="hover:text-yellow-300"> Terms of Service</Link>
          </p>
        </footer>
      </div>
  );
};

export default Home;
