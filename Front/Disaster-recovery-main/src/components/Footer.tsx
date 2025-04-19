// src/components/Footer.tsx
// This component renders the footer section of the application.
// Features include:
// - Quick access links to important pages.
// - Social media links for staying connected.
// - A newsletter subscription form with validation.
// - Responsive design and animations using Framer Motion.

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShieldAlert,
  HeartHandshake,
  BookOpen,
  Loader2,
  LifeBuoy,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

// Zod schema for validating newsletter subscription email
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const Footer: React.FC = () => {
  // Translation hook for multi-language support
  const { t } = useTranslation();

  // State to manage the loading state of the newsletter subscription
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // Animation variants for Framer Motion
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  /**
   * Handle newsletter subscription form submission
   * @param e - Form submission event
   */
  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;

    setNewsletterLoading(true);
    try {
      // Validate email using Zod schema
      newsletterSchema.parse({ email });

      // Send subscription request to the backend
      await axios.post(
        "http://localhost:3000/newsletter-subscriptions",
        { email },
        { withCredentials: true }
      );

      // Show success message and reset the form
      toast.success("Subscription successful! Thank you for subscribing.");
      if (form instanceof HTMLFormElement) {
        form.reset();
      }
    } catch (error: any) {
      // Handle validation or server errors
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error("Subscription failed", {
          description: error.response?.data?.error || error.message,
        });
      }
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="bg-gradient-to-br from-blue-900 to-cyan-800 text-white pt-20 w-full"
    >
      <div className="w-full px-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 pb-12">
          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="flex-1 space-y-6">
            {/* Icon and Title */}
            <ShieldAlert className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold">{t("footer.quickAccess")}</h3>
            {/* Navigation Links */}
            <nav className="flex flex-col gap-3">
              {[
                {
                  path: "/login",
                  name: t("footer.userDashboard"),
                  icon: <HeartHandshake className="w-5 h-5" />,
                },
                {
                  path: "/userResources",
                  name: t("footer.resources"),
                  icon: <BookOpen className="w-5 h-5" />,
                },
                {
                  path: "/faq",
                  name: t("footer.faq"),
                  icon: <BookOpen className="w-5 h-5" />,
                },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center gap-2 text-lg hover:text-cyan-300 transition-colors duration-300"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Social Media Links Section */}
          <motion.div variants={itemVariants} className="flex-1 space-y-6">
            <h3 className="text-xl font-bold">{t("footer.stayConnected")}</h3>
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
                  className="p-3 bg-white/10 rounded-full hover:bg-cyan-500 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Subscription Section */}
          <motion.div variants={itemVariants} className="flex-1 space-y-6">
            <h3 className="text-xl font-bold">{t("footer.newsletter")}</h3>
            <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
              {/* Email Input */}
              <input
                name="email"
                type="email"
                placeholder={t("footer.newsletterInput")}
                className="w-full px-4 py-3 bg-white/10 rounded-lg placeholder-white/60 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                disabled={newsletterLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-lg font-semibold text-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {newsletterLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="w-6 h-6" />
                    {t("footer.subscribeButton")}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-white/10 py-8 mt-8">
          <motion.div variants={itemVariants} className="text-center text-xl text-white/80">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
