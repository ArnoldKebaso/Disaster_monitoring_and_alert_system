import { motion } from "framer-motion";
import Navbar from './Navbar';
import Footer from './Footer';
import { BookOpen, Video, Download, AlertCircle, LifeBuoy, Map, FileText, Globe } from 'lucide-react';

const Resources: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const resources = [
    {
      category: "Guides",
      items: [
       { 
          title: "Flood Preparedness Handbook", 
          icon: BookOpen,
          link: "#",
          type: "PDF",
          difficulty: "Beginner"
        },
        { 
          title: "Emergency Response Protocols", 
          icon: AlertCircle,
          link: "#",
          type: "Article",
          difficulty: "Advanced"
        }
      ]
    },
    {
      category: "Multimedia",
      items: [
        { 
          title: "Flood Reporting Tutorial", 
          icon: Video,
          link: "#",
          type: "Video",
          duration: "12:30"
        },
        { 
          title: "Rescue Techniques Demo", 
          icon: Video,
          link: "#",
          type: "Video",
          duration: "8:45"
        }
      ]
    },
    {
      category: "Tools",
      items: [
        { 
          title: "Flood Risk Assessment Tool", 
          icon: Map,
          link: "#",
          type: "Web App"
        },
        { 
          title: "Evacuation Route Planner", 
          icon: Globe,
          link: "#",
          type: "Interactive Map"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="px-6 md:px-16 py-20"
      >
        {/* Hero Section */}
        <motion.div
          variants={fadeIn}
          className="max-w-7xl mx-auto text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Flood Preparedness Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower yourself with knowledge, tools, and strategies to stay safe during flood events.
          </p>
        </motion.div>

        {/* Featured Video Section */}
        <motion.div
          variants={fadeIn}
          className="max-w-7xl mx-auto mb-20 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="aspect-video bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="w-24 h-24 text-white opacity-20" />
            </div>
            <div className="relative z-10 text-center">
              <button className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:scale-105 transition-transform">
                <Video className="w-12 h-12 text-white" />
              </button>
              <h3 className="text-2xl font-bold text-white mt-4">
                How to Report Flood Alerts
              </h3>
              <p className="text-blue-100">12:30 min tutorial</p>
            </div>
          </div>
        </motion.div>

        {/* Resource Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {resources.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 border border-blue-50"
            >
              {/*  Icon Conditional Rendering */}
                    <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                    {section.category === "Guides" ? (
                        <FileText />
                    ) : section.category === "Multimedia" ? (
                        <Video />
                    ) : (
                        <LifeBuoy />
                    )}
                    {section.category}
                    </h2>
              
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    whileHover={{ x: 5 }}
                    className="p-4 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <item.icon className="w-6 h-6 text-cyan-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          {item.type && (
                            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {item.type}
                            </span>
                          )}
                          {item.difficulty && (
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              item.difficulty === "Beginner" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-orange-100 text-orange-800"
                            }`}>
                              {item.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-cyan-600 p-2">
                        <Download className="w-5 h-5" />
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
          className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-10 mb-20"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Interactive Learning Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Video className="w-12 h-12 text-white mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white">Video Library</h3>
                <p className="text-blue-100">50+ educational videos</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  Essential Reading
                </h3>
                <ul className="space-y-2">
                  {['Flood First Aid Guide', 'Home Protection Checklist', 'Evacuation Planning'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-blue-800">
                      <BookOpen className="w-4 h-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-cyan-50 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-900 mb-3">
                  Interactive Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Risk Assessment', 'Flood Simulator', 'Preparation Quiz'].map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          variants={fadeIn}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-center text-white mb-20"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Prepared</h2>
          <p className="text-blue-100 mb-8">
            Get monthly updates with new resources and flood safety tips
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-6 py-3 text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Subscribe
            </button>
          </div>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Resources;