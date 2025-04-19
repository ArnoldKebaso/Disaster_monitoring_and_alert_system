// src/pages/Resources.tsx

// Import necessary libraries and components
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  BookOpen,
  Video,
  Download,
  AlertCircle,
  LifeBuoy,
  Map,
  FileText,
  Globe,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Resources: React.FC = () => {
  const { t } = useTranslation(); // Translation hook for multi-language support

  // Animation variants for fade-in effect
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  // Animation variants for staggering child animations
  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const [selectedTool, setSelectedTool] = useState<string | null>(null); // State for selected interactive tool
  const YT_PLAYLIST_ID = "PLigZgrpPbvnvB2Qn4GZVaiSjhsJJa3KXx"; // YouTube playlist ID

  // Define resource sections with categories and items
  const resources = [
    {
      category: "guides", // Translation key for guides category
      items: [
        {
          title: "resources.guides.floodPreparednessHandbook", // Translation key for title
          icon: BookOpen, // Icon for the resource
          link: "/pdfs/EmergencyPlan.pdf", // Link to the resource
          type: "PDF", // Resource type
          difficulty: "resources.difficulty.beginner", // Difficulty level
          action: "download", // Action type (download or external link)
        },
        {
          title: "resources.guides.emergencyPlanHandbook",
          icon: BookOpen,
          link: "/pdfs/subscriptionReport.pdf",
          type: "PDF",
          difficulty: "resources.difficulty.beginner",
          action: "download",
        },
        {
          title: "resources.guides.subscriptionReportsHandbook",
          icon: BookOpen,
          link: "/pdfs/DisasterRiskReduction.pdf",
          type: "PDF",
          difficulty: "resources.difficulty.beginner",
          action: "download",
        },
        {
          title: "resources.guides.elninoResponseProtocols",
          icon: AlertCircle,
          link: "https://reliefweb.int/report/kenya/kenya-el-nino-floods-2023-emergency-appeal-mdrke058",
          type: "Article",
          difficulty: "resources.difficulty.advanced",
          action: "external",
        },
      ],
    },
    {
      category: "multimedia", // Translation key for multimedia category
      items: [
        {
          title: "resources.multimedia.floodReportingTutorial",
          icon: Video,
          link: "/videos/Reporting.mp4",
          type: "Video",
          duration: "12:30", // Duration of the video
          action: "download",
        },
        {
          title: "resources.multimedia.elninoPreparednessNews",
          icon: Video,
          link: "https://www.youtube.com/embed/RggrefIckoY?enablejsapi=1&wmode=opaque",
          type: "Video",
          duration: "8:45",
          action: "external",
        },
        {
          title: "resources.multimedia.floodResponseBudalangi",
          icon: Video,
          link: "https://www.youtube.com/watch?v=i906ouUW-hw",
          type: "Video",
          duration: "8:45",
          action: "external",
        },
        {
          title: "resources.multimedia.kenyaRapidResponse",
          icon: Video,
          link: "https://www.youtube.com/watch?v=YtCPEjHamHA&list=PLigZgrpPbvnvB2Qn4GZVaiSjhsJJa3KXx&index=4",
          type: "Video",
          duration: "8:45",
          action: "external",
        },
      ],
    },
    {
      category: "tools", // Translation key for tools category
      items: [
        {
          title: "resources.tools.floodRiskAssessmentTool",
          icon: Map,
          link: "https://orbital.co.ke/use-of-gis-in-flood-hazard-assessment-and-mitigation-in-kenya/#:~:text=Flood%20Risk%20Assessment%3A%20This%20process,hazards%20occurring%20in%20the%20area.",
          type: "Web App",
          action: "external",
        },
        {
          title: "resources.tools.evacuationRoutePlanner",
          icon: Globe,
          link: "https://www.floodmap.net/?ct=KE",
          type: "Interactive Map",
          action: "external",
        },
      ],
    },
  ];

  // Define essential readings with translation keys for titles
  const essentialReadings = [
    {
      title: t("resources.essentialReadings.floodFirstAidGuide"),
      url: "https://www.redcross.org/take-a-class/first-aid",
    },
    {
      title: t("resources.essentialReadings.adultFirstAidCprAedCourse"),
      url: "https://www.redcross.org/take-a-class/classes/adult-first-aid%2Fcpr%2Faed/LP-00014200.html?csrmater=true",
    },
    {
      title: t("resources.essentialReadings.evacuationPlanning"),
      url: "https://ready.gov/evacuation",
    },
  ];

  // Define interactive tools with translation keys for labels
  const interactiveTools = [
    { key: "riskAssessment", label: t("resources.toolsInteractive.riskAssessment") },
    { key: "floodSimulator", label: t("resources.toolsInteractive.floodSimulator") },
    { key: "preparationQuiz", label: t("resources.toolsInteractive.preparationQuiz") },
  ];

  // Handle resource actions (download or open external link)
  const handleResourceAction = (item: any) => {
    if (item.action === "download") {
      const link = document.createElement("a");
      link.href = item.link;
      link.download = t(item.title); // Use translated title as filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (item.action === "external") {
      window.open(item.link, "_blank"); // Open external link in a new tab
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-cyan-50">
      <Navbar /> {/* Render Navbar component */}

      {/* Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="flex-1 w-full px-6 md:px-16 py-20"
      >
        {/* Hero Section */}
        <motion.div variants={fadeIn} className="w-full text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            {t("resources.hero.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("resources.hero.subtitle")}
          </p>
        </motion.div>

        {/* Featured Video Section */}
        <motion.div
          variants={fadeIn}
          className="w-full mb-20 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="aspect-video bg-gray-900 relative">
            <video controls className="w-full h-full object-cover">
              <source src="/videos/Reporting.mp4" type="video/mp4" />
              {t("resources.hero.videoNotSupported")}
            </video>
          </div>
        </motion.div>

        {/* Resource Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {resources.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border border-blue-50"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                {section.category === "guides" ? (
                  <FileText />
                ) : section.category === "multimedia" ? (
                  <Video />
                ) : (
                  <LifeBuoy />
                )}
                {t(`resources.categories.${section.category}`)}
              </h2>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    whileHover={{ x: 5 }}
                    className="p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => handleResourceAction(item)}
                  >
                    <div className="flex items-start gap-3">
                      <item.icon className="w-6 h-6 text-cyan-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {t(item.title)}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          {item.type && (
                            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {item.type}
                            </span>
                          )}
                          {item.difficulty && (
                            <span
                              className={`text-sm px-2 py-1 rounded-full ${
                                item.difficulty === t("resources.difficulty.beginner")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {t(item.difficulty)}
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-cyan-600 p-2">
                        {item.action === "external" ? (
                          <ExternalLink className="w-5 h-5" />
                        ) : (
                          <Download className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Hub */}
        <motion.div
          variants={fadeIn}
          className="w-full bg-white rounded-2xl shadow-xl p-10 mb-20"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            {t("resources.learningHub.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/videoseries?list=${YT_PLAYLIST_ID}`}
                title={t("resources.learningHub.iframeTitle")}
                allowFullScreen
              />
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  {t("resources.learningHub.essentialReading.title")}
                </h3>
                <ul className="space-y-2">
                  {essentialReadings.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-blue-800 hover:text-blue-600 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-cyan-50 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-900 mb-3">
                  {t("resources.learningHub.interactiveTools.title")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interactiveTools.map((tool, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm cursor-pointer"
                      onClick={() => setSelectedTool(tool.key)}
                    >
                      {tool.label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tool Modal */}
        {selectedTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedTool(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">
                {t(`resources.toolsInteractive.${selectedTool}.title`)}
              </h3>
              <p className="mb-4 text-gray-600">
                {t(`resources.toolsInteractive.${selectedTool}.description`)}
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  window.open(
                    selectedTool === "riskAssessment"
                      ? "https://orbital.co.ke/use-of-gis-in-flood-hazard-assessment-and-mitigation-in-kenya/#:~:text=Flood%20Risk%20Assessment%3A%20This%20process,hazards%20occurring%20in%20the%20area."
                      : selectedTool === "floodSimulator"
                      ? "https://quizizz.com/admin/quiz/5e7c969f49f5d0001bef1520/floods"
                      : "https://quizizz.com/admin/quiz/5e7c969f49f5d0001bef1520/floods",
                    "_blank"
                  );
                }}
              >
                {t("resources.toolsInteractive.launchButton")}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Newsletter Section */}
        <motion.div
          variants={fadeIn}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-center text-white mb-20"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t("resources.newsletter.title")}
          </h2>
          <p className="text-blue-100 mb-8">
            {t("resources.newsletter.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("resources.newsletter.inputPlaceholder")}
              className="flex-1 rounded-full px-6 py-3 text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              {t("resources.newsletter.button")}
            </button>
          </div>
        </motion.div>
      </motion.main>

      <Footer /> {/* Render Footer component */}
    </div>
  );
};

export default Resources;
