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

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await axios.post("http://localhost:3000/subscriptions/send-email", {
        to: "shikukudenno@gmail.com",
        subject: `New Contact Form Submission: ${formData.subject}`,
        text: `
          Name: ${formData.name}
          Email: ${formData.email}
          Subject: ${formData.subject}
          Message: ${formData.message}
        `,
      });

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
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="w-full px-6 md:px-16 py-16"
      >
        {/* Header Section */}
        <motion.div variants={fadeIn} className="w-full text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4"
          >
            Get in Touch
          </motion.h1>
          <p className="text-xl text-gray-600 w-full mx-auto">
            Have questions or need assistance? Our team is here to help you 24/7.
          </p>
        </motion.div>

        {/* Contact Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={fadeIn}
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Input */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  Your Name
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
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  Email Address
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
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>

              {/* Subject Input */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  Subject
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
                    placeholder="How can we help?"
                  />
                </div>
              </motion.div>

              {/* Message Input */}
              <motion.div variants={fadeIn}>
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    placeholder="Write your message here..."
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
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
                    Message sent successfully!
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center bg-red-50 text-red-800 px-4 py-2 rounded-full"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Failed to send message. Please try again.
                  </motion.div>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={fadeIn}
            className="bg-gradient-to-br from-blue-900 to-cyan-800 rounded-3xl shadow-2xl p-8 lg:p-12 text-white"
          >
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-lg text-cyan-100">
                  Reach out to us through any of these channels. Our support team typically responds within 2 business hours.
                </p>
              </div>

              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Our Location</h3>
                    <p className="text-cyan-100">Njoro, Kenya</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-cyan-100">+254 123 456 789</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <Send className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Address</h3>
                    <p className="text-cyan-100">fmas@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="mt-12 relative">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />
                <div className="border-t border-cyan-400/30 pt-8">
                  <h3 className="text-lg font-semibold mb-4">24/7 Emergency Support</h3>
                  <p className="text-cyan-100">
                    For urgent flood-related emergencies, call our hotline:
                    <span className="block text-xl font-bold mt-2">+254 789 123 456</span>
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
