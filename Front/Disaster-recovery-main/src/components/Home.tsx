import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Select, { MultiValue } from "react-select";
import { FaBell, FaMapMarkerAlt, FaHandHoldingHeart, FaShieldAlt, FaUsers, FaMap } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

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

       {/* Subscribe Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">{t("subscribe.title")}</h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          {/* Subscription Method */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-medium mb-2">{t("subscribe.method")}</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={subscriptionMethod}
              onChange={(e) => setSubscriptionMethod(e.target.value)}
            >
              <option value="">{t("subscribe.selectMethod")}</option>
              <option value="email">{t("subscribe.email")}</option>
              <option value="sms">{t("subscribe.sms")}</option>
            </select>
          </div>

          {/* Contact Input */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-medium mb-2">
              {subscriptionMethod === "email" ? t("subscribe.emailPlaceholder") : t("subscribe.phonePlaceholder")}
            </label>
            <input
              type="text"
              placeholder={subscriptionMethod === "email" ? "Enter your email" : "Enter your phone number"}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Location Selection (Multi-select Dropdown with Checkboxes) */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-medium mb-2">{t("subscribe.selectLocation")}</label>
            <Select
              isMulti
              options={locationOptions}
              value={selectedLocations}
              onChange={handleLocationChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select locations..."
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700">
            {t("subscribe.subscribeButton")}
          </button>

          {/* Status Message */}
          <p className="mt-4 text-green-500">{statusMessage}</p>
        </form>
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















// import React from "react";
// import { Link } from "react-router-dom";
// 

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-red-600 text-white px-6 py-4 shadow-lg">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="text-2xl font-extrabold tracking-wide">
//             Kenya Red Cross
//           </div>
//           <div className="hidden lg:flex gap-8">
//             <Link to="/" className="hover:text-yellow-300 transition-all duration-200">
//               Home
//             </Link>
//             <Link to="/about" className="hover:text-yellow-300 transition-all duration-200">
//               About Us
//             </Link>
//             <Link to="/programs" className="hover:text-yellow-300 transition-all duration-200">
//               Programs
//             </Link>
//             <Link to="/contact" className="hover:text-yellow-300 transition-all duration-200">
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section
//         className="bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-center text-white"
//         style={{
//           backgroundImage: "url('https://via.placeholder.com/1920x1080/003a8c/ffffff?text=Hero+Section')",
//         }}
//       >
//         <div className="bg-black bg-opacity-50 p-8 rounded-md">
//           <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
//             Saving Lives, Changing Lives
//           </h1>
//           <p className="text-lg lg:text-xl mb-6">
//             Join us in our mission to provide humanitarian aid and support to those in need.
//           </p>
//           <Link
//             to="/donate"
//             className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md text-lg transition-all duration-200"
//           >
//             Donate Now
//           </Link>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="py-16 bg-white text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-red-600 mb-4">Our Mission</h2>
//           <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//             The Kenya Red Cross is committed to providing timely, effective, and efficient humanitarian services to those in need. We strive to alleviate human suffering and promote dignity, peace, and sustainable development.
//           </p>
//         </div>
//       </section>

//       {/* Programs Section */}
//       <section className="py-16 bg-gray-100 text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-red-600 mb-8">Our Programs</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Disaster Response",
//                 description: "We provide immediate relief to communities affected by disasters.",
//                 // icon: <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4 text-red-600" />,
//               },
//               {
//                 title: "Health Services",
//                 description: "We offer healthcare services to underserved communities.",
//                 // icon: <FaHandHoldingHeart className="w-12 h-12 mx-auto mb-4 text-red-600" />,
//               },
//               {
//                 title: "Community Development",
//                 description: "We empower communities through sustainable development programs.",
//                 //icon: <FaUsers className="w-12 h-12 mx-auto mb-4 text-red-600" />,
//               },
//             ].map((program, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
//               >
//                 {/* {program.icon} */}
//                 <h3 className="text-xl font-bold text-red-600 mb-2">{program.title}</h3>
//                 <p className="text-gray-600">{program.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-red-600 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             {/* Quick Links */}
//             <div>
//               <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link to="/" className="hover:text-yellow-300 transition-all duration-200">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/about" className="hover:text-yellow-300 transition-all duration-200">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/programs" className="hover:text-yellow-300 transition-all duration-200">
//                     Programs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/contact" className="hover:text-yellow-300 transition-all duration-200">
//                     Contact Us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//               <p>Phone: +254 700 000 000</p>
//               <p>Email: info@redcross.or.ke</p>
//               <p>Address: Nairobi, Kenya</p>
//             </div>

//             {/* Social Media Links */}
//             <div>
//               <h3 className="text-lg font-bold mb-4">Follow Us</h3>
//               <div className="flex gap-4">
//                 <a
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-yellow-300 transition-all duration-200"
//                 >
//                   <FaFacebook className="w-6 h-6" />
//                 </a>
//                 <a
//                   href="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-yellow-300 transition-all duration-200"
//                 >
//                   <FaTwitter className="w-6 h-6" />
//                 </a>
//                 <a
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-yellow-300 transition-all duration-200"
//                 >
//                   <FaInstagram className="w-6 h-6" />
//                 </a>
//                 <a
//                   href="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-yellow-300 transition-all duration-200"
//                 >
//                   <FaYoutube className="w-6 h-6" />
//                 </a>
//               </div>
//             </div>

//             {/* Newsletter Subscription */}
//             <div>
//               <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
//               <form className="flex">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="p-2 rounded-l-md focus:outline-none"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 rounded-r-md"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;