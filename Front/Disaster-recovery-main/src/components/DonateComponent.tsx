import React from 'react';

const Donate: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Support Our Mission</h1>
      <p className="text-gray-600 mb-4">
        Your donations help us respond swiftly to emergencies and support affected communities.
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Donate Money</h2>
        <p className="text-gray-600 mb-2">To support our efforts, you can donate directly via the following paybill number:</p>
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <p className="text-lg font-bold">Paybill Number: <span className="text-blue-600">123456</span></p>
          <p className="text-gray-600">Account Name: Disaster Relief Fund</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Donate Supplies</h2>
        <p className="text-gray-600 mb-2">We also accept the following items:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Non-perishable food items (e.g., canned goods, rice, flour).</li>
          <li>Clothing (clean and in good condition).</li>
          <li>Medical supplies (e.g., first-aid kits, gloves, masks).</li>
          <li>Blankets and bedding.</li>
        </ul>
        <p className="text-gray-600">
          You can drop off these items at our collection centers or contact us for more details:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <p className="text-lg font-bold">Collection Center: Red Cross Headquarters</p>
          <p className="text-gray-600">Address: [Insert Address]</p>
          <p className="text-gray-600">Contact Number: +254 700 123 456</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Other Forms of Assistance</h2>
        <p className="text-gray-600 mb-2">If you wish to assist in other ways (e.g., volunteering, logistical support), please reach out to us at:</p>
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <p className="text-lg font-bold">Email: support@disasterrelief.org</p>
          <p className="text-gray-600">Phone: +254 700 456 789</p>
        </div>
      </div>

      <div className="bg-blue-100 p-4 rounded-md text-center">
        <p className="text-lg font-bold text-blue-600">Thank you for your generosity!</p>
        <p className="text-gray-600">Every donation makes a difference in saving lives and rebuilding communities.</p>
      </div>
    </div>
  );
};

export default Donate;
