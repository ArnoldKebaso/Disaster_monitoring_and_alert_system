// src/pages/ContactUs.tsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  Mail, MapPin, Phone, Send, AlertCircle, CheckCircle, 
  UserCircle, ArrowRight, BookOpenText 
} from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * ContactUs Component - Provides a multilingual contact page with form submission
 * 
 * Features:
 * - Localized content using react-i18next
 * - Animated contact form with validation
 * - Email submission functionality
 * - Contact information section
 * - Responsive design
 * - Loading states and submission feedback
 */
const ContactUs: React.FC = () => {
  // Translation hook for multilingual support
  const { t } = useTranslation();

  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  /**
   * Handle form input changes
   * @param e - Change event from input or textarea
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send email via API with translated labels
      await axios.post("http://localhost:3000/subscriptions/send-email", {
        to: "shikukudenno@gmail.com",
        subject: `${t("contact.form.subjectLabel")}: ${formData.subject}`,
        text: `
          ${t("contact.form.nameLabel")}: ${formData.name}
          ${t("contact.form.emailLabel")}: ${formData.email}
          ${t("contact.form.subjectLabel")}: ${formData.subject}
          ${t("contact.form.messageLabel")}: ${formData.message}
        `,
      });

      // On success: reset form and show success message
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-cyan-50">
      <Navbar />
      
      {/* Main Content Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="w-full px-6 md:px-16 py-16"
      >
        {/* ===================== HEADER SECTION ===================== */}
        <motion.div variants={fadeIn} className="w-full text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4"
          >
            {t("contact.heroTitle")}
          </motion.h1>
          <p className="text-xl text-gray-600 w-full mx-auto">
            {t("contact.heroSubtitle")}
          </p>
        </motion.div>

        {/* ===================== CONTACT CONTAINER ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ========== CONTACT FORM SECTION ========== */}
          <motion.div
            variants={fadeIn}
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Input Field */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  {t("contact.form.nameLabel")}
                </label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>
              </motion.div>

              {/* Email Input Field */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  {t("contact.form.emailLabel")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
              </motion.div>

              {/* Subject Input Field */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  {t("contact.form.subjectLabel")}
                </label>
                <div className="relative">
                  <BookOpenText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder={t("contact.form.subjectPlaceholder")}
                  />
                </div>
              </motion.div>

              {/* Message Textarea Field */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  {t("contact.form.messageLabel")}
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeIn} className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-4 px-8 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      {/* Loading Spinner */}
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      {t("contact.form.sendButton")}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Status Messages */}
              <motion.div variants={fadeIn} className="text-center">
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center bg-green-50 text-green-800 px-4 py-2 rounded-full"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t("contact.status.success")}
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center bg-red-50 text-red-800 px-4 py-2 rounded-full"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {t("contact.status.error")}
                  </motion.div>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* ========== CONTACT INFORMATION SECTION ========== */}
          <motion.div
            variants={fadeIn}
            className="bg-gradient-to-br from-blue-900 to-cyan-800 rounded-3xl shadow-2xl p-8 lg:p-12 text-white"
          >
            <div className="space-y-10">
              {/* Contact Info Header */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {t("contact.info.title")}
                </h2>
                <p className="text-lg text-cyan-100">
                  {t("contact.info.description")}
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-8">
                {/* Location Information */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t("contact.info.locationTitle")}
                    </h3>
                    <p className="text-cyan-100">
                      {t("contact.info.locationText")}
                    </p>
                  </div>
                </div>

                {/* Phone Information */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t("contact.info.phoneTitle")}
                    </h3>
                    <p className="text-cyan-100">
                      {t("contact.info.phoneText")}
                    </p>
                  </div>
                </div>

                {/* Email Information */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <Send className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t("contact.info.emailTitle")}
                    </h3>
                    <p className="text-cyan-100">
                      {t("contact.info.emailText")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Support Section */}
              <div className="mt-12 relative">
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />
                
                {/* Emergency Content */}
                <div className="border-t border-cyan-400/30 pt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    {t("contact.emergency.supportTitle")}
                  </h3>
                  <p className="text-cyan-100">
                    {t("contact.emergency.supportText")}
                    <span className="block text-xl font-bold mt-2">
                      {t("contact.emergency.hotline")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ContactUs;