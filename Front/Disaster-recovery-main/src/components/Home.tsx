import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Section */}
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h1>Flood Monitoring and Alert System</h1>
        </div>
        <ul className="flex gap-6 items-center">
          <li>
            <Link to="/" className="hover:text-red-500">
              Home
            </Link>
          </li>
          <li className="relative group">
            <span className="hover:text-red-500 cursor-pointer">Who We Are</span>
            <ul className="absolute hidden group-hover:flex flex-col bg-blue-900 text-sm mt-2 py-2 px-4 shadow-md border-t-2 border-red-500 z-10">
              <li>
                <Link to="/about" className="hover:text-red-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/management" className="hover:text-red-500">
                  Management Team
                </Link>
              </li>
              <li>
                <Link to="/governance" className="hover:text-red-500">
                  Governance
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="hover:text-red-500 cursor-pointer">What We Do</span>
            <ul className="absolute hidden group-hover:flex flex-col bg-blue-900 text-sm mt-2 py-2 px-4 shadow-md border-t-2 border-red-500 z-10">
              <li>
                <Link to="/disaster-management" className="hover:text-red-500">
                  Disaster Management
                </Link>
              </li>
              <li>
                <Link to="/tracing" className="hover:text-red-500">
                  Tracing
                </Link>
              </li>
              <li>
                <Link to="/refugee-operations" className="hover:text-red-500">
                  Refugee Operations
                </Link>
              </li>
              <li>
                <Link to="/livelihoods" className="hover:text-red-500">
                  Livelihoods
                </Link>
              </li>
              <li>
                <Link to="/wash" className="hover:text-red-500">
                  Water, Sanitation & Hygiene
                </Link>
              </li>
              <li>
                <Link to="/public-health" className="hover:text-red-500">
                  Public Health Emergencies
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <span className="hover:text-red-500 cursor-pointer">Get Involved</span>
            <ul className="absolute hidden group-hover:flex flex-col bg-blue-900 text-sm mt-2 py-2 px-4 shadow-md border-t-2 border-red-500 z-10">
              <li>
                <Link to="/volunteer" className="hover:text-red-500">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/member" className="hover:text-red-500">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-red-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-red-500">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-red-500">
                  Events
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="bg-cover bg-center h-[600px] flex flex-col justify-center items-center text-center text-white" style={{ backgroundImage: "url('./src/assets/sigonella-81772_1920.jpg')" }}>
        <h1 className="text-4xl font-bold mb-4">Welcome to the Flood Monitoring and Alert System</h1>
        <p className="text-lg mb-6">
          Ensuring safety through timely disaster management and community support.
        </p>
        <Link to="/get-involved" className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600">
          Get Involved
        </Link>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="highlight text-center">
            <img src="https://via.placeholder.com/300" alt="What We Do" className="mx-auto mb-4 w-24 h-24" />
            <h2 className="text-xl font-bold text-blue-900 mb-2">What We Do</h2>
            <p className="text-gray-600">We provide disaster monitoring, tracing, and critical assistance to affected communities.</p>
          </div>
          <div className="highlight text-center">
            <img src="https://via.placeholder.com/300" alt="Get Involved" className="mx-auto mb-4 w-24 h-24" />
            <h2 className="text-xl font-bold text-blue-900 mb-2">Get Involved</h2>
            <p className="text-gray-600">Become a volunteer or make a difference through donations and support.</p>
          </div>
          <div className="highlight text-center">
            <img src="https://via.placeholder.com/300" alt="Contact Us" className="mx-auto mb-4 w-24 h-24" />
            <h2 className="text-xl font-bold text-blue-900 mb-2">Contact Us</h2>
            <p className="text-gray-600">Reach out for information, help, or collaboration opportunities.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-4 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Flood Monitoring and Alert System. All Rights Reserved.</p>
        <ul className="flex justify-center gap-4">
          <li>
            <Link to="/privacy-policy" className="hover:text-red-500">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-red-500">
              Terms of Service
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
