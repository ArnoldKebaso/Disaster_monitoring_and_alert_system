// Import necessary libraries and components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Menu,
  X,
  ShieldAlert,
  HeartPulse,
  BookOpen,
  LifeBuoy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Navbar: React.FC = () => {
  // State for toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for tracking which submenu is open
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Translation hook for multi-language support
  const { t, i18n } = useTranslation();

  // Toggle language between English and Swahili
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "sw" : "en");
  };

  // Animation variants for the mobile menu
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  };

  // Define navigation links
  const navLinks = [
    { path: "/", name: t("navbar.home"), key: "home" },
    { path: "/about", name: t("navbar.about"), key: "about" },
    {
      name: t("navbar.getInvolved"),
      key: "get-involved",
      subLinks: [
        {
          path: "/donate",
          name: t("navbar.donate"),
          icon: <HeartPulse className="w-4 h-4" />,
        },
      ],
    },
    { path: "/userReSources", name: t("navbar.Resources"), key: "resources-user" },
    { path: "/contact", name: t("navbar.contact"), key: "contact" },
    { path: "/faq", name: t("navbar.FAQ"), key: "contact" },
  ];

  // Toggle submenu visibility
  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <motion.nav
      initial={{ y: -100 }} // Initial animation state
      animate={{ y: 0 }} // Final animation state
      className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white shadow-xl w-full"
    >
      <div className="w-full px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-200 bg-clip-text text-transparent">
                {t("navbar.title")}
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-6">
            {navLinks.map((link, index) => (
              <div
                key={link.key || link.path || index}
                className="relative group"
                onMouseEnter={() => link.subLinks && setOpenSubmenu(link.key!)} // Open submenu on hover
                onMouseLeave={() => link.subLinks && setOpenSubmenu(null)} // Close submenu on mouse leave
              >
                {link.path ? (
                  <Link
                    to={link.path}
                    className="flex items-center gap-1 px-2 py-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <div className="cursor-pointer px-2 py-2 hover:bg-white/10 rounded-lg flex items-center gap-1">
                    {link.name}
                    <AnimatePresence>
                      {link.subLinks && openSubmenu === link.key && (
                        <motion.ul
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 bg-white shadow-2xl rounded-lg p-2 min-w-[200px] mt-1"
                        >
                          {link.subLinks.map((subLink, subIndex) => (
                            <li key={subLink.name || subIndex}>
                              <Link
                                to={subLink.path}
                                className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-md"
                              >
                                {subLink.icon}
                                {subLink.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Language Toggle and Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }} // Hover animation
              onClick={toggleLanguage}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
            >
              <Globe className="w-5 h-5" />
              {t("languageToggle")}
            </motion.button>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 space-y-2">
                {navLinks.map((link, index) => (
                  <div
                    key={link.key || link.path || index}
                    className="border-b border-white/10"
                  >
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="block px-4 py-3 hover:bg-white/10 rounded-lg"
                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <div className="px-4 py-3">
                        <button
                          className="flex items-center justify-between w-full"
                          onClick={() => toggleSubmenu(link.key!)} // Toggle submenu
                        >
                          <span>{link.name}</span>
                          {openSubmenu === link.key ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                        <AnimatePresence>
                          {openSubmenu === link.key && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4"
                            >
                              {link.subLinks?.map((subLink, subIndex) => (
                                <Link
                                  key={subLink.name || subIndex}
                                  to={subLink.path}
                                  className="block px-4 py-2 text-sm hover:bg-white/10 rounded-lg"
                                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  <Globe className="w-5 h-5" />
                  {t("languageToggle")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
