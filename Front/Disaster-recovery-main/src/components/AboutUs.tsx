import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      {/* Main Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Left Section: Image Placeholder */}
        <div className="w-full md:w-1/2 h-96 bg-blue-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-900">Image Placeholder</span>
        </div>

        {/* Right Section: Content */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-6">
            About Us
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Welcome to our Disaster Monitoring and Alert System! We are a team
            dedicated to making a meaningful difference by providing tools to
            enhance disaster preparedness and community safety.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mt-4">
            Our platform offers cutting-edge technology and real-time alerts to
            keep you informed during emergencies. Whether it’s monitoring
            high-risk zones, finding safe routes, or accessing critical
            resources, our goal is to empower communities around the world.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mt-4">
            Let’s work together towards creating a safer today and a more
            resilient tomorrow!
          </p>
        </div>
      </div>

      {/* Additional Section: Highlights */}
      <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
        {/* Highlight 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-48 bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-bold text-blue-900">Community Support</span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-900">
              Community Support
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Empowering communities with resources and real-time disaster
              alerts to stay informed and protected.
            </p>
          </div>
        </div>

        {/* Highlight 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-48 bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-bold text-blue-900">Safe Routes</span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-900">Safe Routes</h3>
            <p className="text-gray-600 text-sm mt-2">
              Navigate through crises with real-time updates and safe route
              recommendations to avoid danger zones.
            </p>
          </div>
        </div>

        {/* Highlight 3 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-48 bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-bold text-blue-900">Real-time Alerts</span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-900">
              Real-time Alerts
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Stay ahead of emergencies with instant notifications designed to
              keep you and your loved ones safe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;