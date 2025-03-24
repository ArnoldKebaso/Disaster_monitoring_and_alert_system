import { motion } from "framer-motion";
import { HeartHandshake, Package, HandCoins, Mail, Phone, Gift, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const Donate: React.FC = () => {
  const { t } = useTranslation();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  // Supplies for goods donation – each element is translated
  const supplies = [
    t("donate.cards.goods.supplies.0"),
    t("donate.cards.goods.supplies.1"),
    t("donate.cards.goods.supplies.2"),
    t("donate.cards.goods.supplies.3")
  ];

  // Impact stats array
  const impactStats = [
    t("donate.impact.stats.0"),
    t("donate.impact.stats.1"),
    t("donate.impact.stats.2"),
    t("donate.impact.stats.3")
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div variants={fadeIn} className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4"
            >
              {t("donate.hero.title")}
            </motion.h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("donate.hero.subtitle")}
            </p>
          </motion.div>

          {/* Donation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Monetary Donation */}
            <motion.div variants={fadeIn}>
              <Card className="h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-full w-fit">
                    <HandCoins className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {t("donate.cards.financialSupport.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 text-center">
                      {t("donate.cards.financialSupport.description")}
                    </p>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="font-bold text-blue-900 mb-2">
                        {t("donate.cards.financialSupport.paymentTitle")}
                      </div>
                      <div className="text-2xl font-black text-cyan-600">
                        {t("donate.cards.financialSupport.number")}
                      </div>
                      <div className="text-2xl font-black text-cyan-600">
                        {t("donate.cards.financialSupport.paybill")}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {t("donate.cards.financialSupport.account")}
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-lg">
                      {t("donate.cards.financialSupport.button")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Goods Donation */}
            <motion.div variants={fadeIn}>
              <Card className="h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 bg-gradient-to-r from-green-600 to-cyan-600 p-4 rounded-full w-fit">
                    <Package className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {t("donate.cards.goods.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 text-center">
                      {t("donate.cards.goods.description")}
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      {supplies.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="font-bold text-green-900">
                        {t("donate.cards.goods.dropOff.title")}
                      </div>
                      <div className="text-gray-600">
                        {t("donate.cards.goods.dropOff.address")}
                      </div>
                      <div className="text-sm text-gray-600">
                        {t("donate.cards.goods.dropOff.hours")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Other Support */}
            <motion.div variants={fadeIn}>
              <Card className="h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 p-4 rounded-full w-fit">
                    <HeartHandshake className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {t("donate.cards.partnership.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 text-center">
                      {t("donate.cards.partnership.description")}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                        <Mail className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">
                          {t("donate.cards.partnership.email")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">
                          {t("donate.cards.partnership.phone")}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-6 text-lg">
                      {t("donate.cards.partnership.button")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Impact Statement */}
          <motion.div
            variants={fadeIn}
            className="bg-gradient-to-r from-blue-900 to-cyan-800 rounded-2xl shadow-2xl p-8 text-center text-white"
          >
            <div className="max-w-3xl mx-auto">
              <Gift className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                {t("donate.impact.title")}
              </h2>
              <p className="text-xl text-cyan-100 mb-6">
                {t("donate.impact.description")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-cyan-100">
                {impactStats.map((stat, index) => (
                  <div key={index} className="p-2 bg-white/10 rounded-lg">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Donate;
