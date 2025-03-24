// src/pages/FAQ.tsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Define FAQ items using translation keys.
  const faqItems = [
    {
      question: t("faq.items.1.question"),
      answer: t("faq.items.1.answer"),
    },
    {
      question: t("faq.items.2.question"),
      answer: t("faq.items.2.answer"),
    },
    {
      question: t("faq.items.3.question"),
      answer: t("faq.items.3.answer"),
    },
    {
      question: t("faq.items.4.question"),
      answer: t("faq.items.4.answer"),
    },
    {
      question: t("faq.items.5.question"),
      answer: t("faq.items.5.answer"),
    },
    {
      question: t("faq.items.6.question"),
      answer: t("faq.items.6.answer"),
    },
    {
      question: t("faq.items.7.question"),
      answer: t("faq.items.7.answer"),
    },
    {
      question: t("faq.items.8.question"),
      answer: t("faq.items.8.answer"),
    },
    {
      question: t("faq.items.9.question"),
      answer: t("faq.items.9.answer"),
    },
    {
      question: t("faq.items.10.question"),
      answer: t("faq.items.10.answer"),
    },
    {
      question: t("faq.items.11.question"),
      answer: t("faq.items.11.answer"),
    },
    {
      question: t("faq.items.12.question"),
      answer: t("faq.items.12.answer"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50 text-gray-800">
      <Navbar />

      <main className="flex-1 w-full px-6 md:px-16 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            {t("faq.pageTitle")}
          </h1>
          <p className="text-lg text-gray-600">{t("faq.pageSubtitle")}</p>
        </div>

        {/* FAQ Container */}
        <div className="w-full flex flex-col gap-4">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* FAQ Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <div className="text-blue-600">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* FAQ Answer (Collapsible) */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 overflow-hidden"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
