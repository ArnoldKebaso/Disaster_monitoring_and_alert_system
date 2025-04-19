import { motion } from "framer-motion"; // Import motion for animations
import {
  HeartHandshake,
  Package,
  HandCoins,
  Mail,
  Phone,
  Gift,
  ShieldCheck,
} from "lucide-react"; // Import icons for UI
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"; // Card components
import { Button } from "../components/ui/button"; // Button component
import Navbar from "../components/Navbar"; // Site navigation bar
import Footer from "../components/Footer"; // Site footer

// Donate page component
const Donate: React.FC = () => {
  // Animation variant for fade-in effect
  const fadeIn = {
    hidden: { opacity: 0, y: 20 }, // Start hidden with downward offset
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // Fade in and move up
  };

  // Parent variant to stagger children animations
  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } }, // Delay each child by 0.2s
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content section with background gradient */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="flex-1 w-full bg-gradient-to-b from-blue-50 to-cyan-50 py-16 px-6 md:px-16"
      >
        {/* Header section with title and subtitle */}
        <motion.div variants={fadeIn} className="text-center mb-16 w-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }} // Slide from above
            animate={{ opacity: 1, y: 0 }} // Animate to position
            className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4"
          >
            Empower Disaster Response
          </motion.h1>
          <p className="text-xl text-gray-600 w-full">
            Your generosity fuels our mission to provide immediate relief and
            build resilient communities
          </p>
        </motion.div>

        {/* Grid of donation options */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {/* Monetary Donation Card */}
          <motion.div variants={fadeIn} className="flex flex-col">
            <Card className="flex flex-col h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center">
                {/* Icon wrapper */}
                <div className="mx-auto mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-full w-fit">
                  <HandCoins className="h-12 w-12 text-white" />
                </div>
                {/* Card title */}
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Financial Support
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Description and payment details */}
                  <p className="text-gray-600 text-center">
                    Directly fund emergency responses and recovery programs
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="font-bold text-blue-900 mb-2">
                      M-Pesa Payments:
                    </div>
                    <div className="text-2xl font-black text-cyan-600">
                      123456
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Account: DISASTER RELIEF
                    </div>
                  </div>
                </div>
                {/* Call-to-action button */}
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-lg">
                  Give Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Goods Donation Card */}
          <motion.div variants={fadeIn} className="flex flex-col">
            <Card className="flex flex-col h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center">
                {/* Icon wrapper */}
                <div className="mx-auto mb-4 bg-gradient-to-r from-green-600 to-cyan-600 p-4 rounded-full w-fit">
                  <Package className="h-12 w-12 text-white" />
                </div>
                {/* Card title */}
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Essential Goods
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* List of needed items */}
                  <p className="text-gray-600 text-center">
                    We urgently need these life-saving supplies:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    {[
                      "Medical Kits",
                      "Dry Food",
                      "Clean Water",
                      "Blankets",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* Drop-off center details */}
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="font-bold text-green-900">
                      Drop-off Center:
                    </div>
                    <div className="text-gray-600">Red Cross HQ, Nairobi</div>
                    <div className="text-sm text-gray-600">Open 24/7</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Partnership & Volunteering Card */}
          <motion.div variants={fadeIn} className="flex flex-col">
            <Card className="flex flex-col h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center">
                {/* Icon wrapper */}
                <div className="mx-auto mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 p-4 rounded-full w-fit">
                  <HeartHandshake className="h-12 w-12 text-white" />
                </div>
                {/* Card title */}
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Partnership & Volunteering
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Contact info list */}
                  <p className="text-gray-600 text-center">
                    Join our network of change-makers
                  </p>
                  <div className="space-y-2">
                    {/* Email contact */}
                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">partners@fmas.org</span>
                    </div>
                    {/* Phone contact */}
                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">+254 700 112 233</span>
                    </div>
                  </div>
                </div>
                {/* Partnership button */}
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-6 text-lg">
                  Become a Partner
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Impact statement section */}
        <motion.div
          variants={fadeIn}
          className="w-full bg-gradient-to-r from-blue-900 to-cyan-800 rounded-2xl shadow-2xl p-8 text-center text-white"
        >
          <div className="w-full">
            {/* Impact icon */}
            <Gift className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your Impact Matters</h2>
            <p className="text-xl text-cyan-100 mb-6">
              Every contribution helps us maintain 24/7 monitoring systems and
              deploy emergency teams within 30 minutes of disaster alerts
            </p>
            {/* Key statistics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-cyan-100">
              {[
                "5,000+ Lives Saved",
                "200+ Communities",
                "85% Efficiency",
                "24/7 Support",
              ].map((stat, index) => (
                <div key={index} className="p-2 bg-white/10 rounded-lg">
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Donate;
