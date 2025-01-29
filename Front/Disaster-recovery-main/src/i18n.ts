import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // Load translations from public/locales
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Initialize i18next
  .init({
    fallbackLng: "en", // Default language
    debug: true,
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18n;
