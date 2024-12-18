import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Add global or custom CSS file for styling
import "../assets/Home.css"; // Add specific CSS for Home component

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="logo">
          <h1>FMAS</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="dropdown">
            <span>Who We Are</span>
            <ul className="dropdown-content">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/management">Management Team</Link></li>
              <li><Link to="/governance">Governance</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <span>What We Do</span>
            <ul className="dropdown-content">
              <li><Link to="/disaster-management">Disaster Management</Link></li>
              <li><Link to="/tracing">Tracing</Link></li>
              <li><Link to="/refugee-operations">Refugee Operations</Link></li>
              <li><Link to="/livelihoods">Livelihoods</Link></li>
              <li><Link to="/wash">Water, Sanitation & Hygiene</Link></li>
              <li><Link to="/public-health">Public Health Emergencies</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <span>Get Involved</span>
            <ul className="dropdown-content">
              <li><Link to="/volunteer">Become a Volunteer</Link></li>
              <li><Link to="/member">Become a Member</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/tenders">Tenders</Link></li>
              <li><Link to="/opportunities">Opportunities</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <span>Media Center</span>
            <ul className="dropdown-content">
              <li><Link to="/impact-stories">Impact Stories</Link></li>
              <li><Link to="/strategic-plans">Strategic Plans</Link></li>
              <li><Link to="/annual-reports">Annual Reports</Link></li>
              <li><Link to="/reachout-magazine">ReachOut Magazine</Link></li>
              <li><Link to="/media-statements">Media Statements</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to the Flood Monitoring and Alert System</h1>
          <p>
            Ensuring safety through timely disaster management and community support.
          </p>
          <Link to="/get-involved" className="cta-button">
            Get Involved
          </Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights">
        <div className="highlight">
          <img src="https://via.placeholder.com/300" alt="What We Do" />
          <h2>What We Do</h2>
          <p>We provide disaster monitoring, tracing, and critical assistance to affected communities.</p>
        </div>
        <div className="highlight">
          <img src="https://via.placeholder.com/300" alt="Get Involved" />
          <h2>Get Involved</h2>
          <p>Become a volunteer or make a difference through donations and support.</p>
        </div>
        <div className="highlight">
          <img src="https://via.placeholder.com/300" alt="Contact Us" />
          <h2>Contact Us</h2>
          <p>Reach out for information, help, or collaboration opportunities.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Flood Monitoring and Alert System. All Rights Reserved.</p>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
