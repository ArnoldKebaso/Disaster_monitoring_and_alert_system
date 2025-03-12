// components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube,
  ShieldAlert, HeartHandshake, BookOpen, LifeBuoy 
} from "lucide-react";

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="bg-gradient-to-br from-blue-900 to-cyan-800 text-white pt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <ShieldAlert className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold">Quick Access</h3>
            <nav className="grid grid-cols-2 gap-2">
              {[
                // { path: "/login", name: "Admin Portal", icon: <ShieldAlert className="w-4 h-4" /> },
                { path: "/login", name: "User Dashboard", icon: <HeartHandshake className="w-4 h-4" /> },
                { path: "/publications", name: "Publications", icon: <BookOpen className="w-4 h-4" /> },
                { path: "/donate", name: "Donate", icon: <LifeBuoy className="w-4 h-4" /> },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center gap-2 text-sm hover:text-cyan-300 transition-colors"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>123 FMAS Street, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>+254 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>info@fmas.com</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold">Stay Connected</h3>
            <div className="flex gap-4">
              {[
                { icon: <Facebook />, link: "#" },
                { icon: <Twitter />, link: "#" },
                { icon: <Instagram />, link: "#" },
                { icon: <Youtube />, link: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ y: -3 }}
                  className="p-2 bg-white/10 rounded-full hover:bg-cyan-500 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="border-t border-white/10 py-8 mt-8">
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-white/80"
          >
            © {new Date().getFullYear()} FMAS - Flood Monitoring & Alert System
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;