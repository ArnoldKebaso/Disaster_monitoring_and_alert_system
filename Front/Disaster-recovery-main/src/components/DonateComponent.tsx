import React from 'react';
import { HeartIcon, HandIcon, HomeIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Donate: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Support Our Mission</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
        Your contributions help us respond swiftly to disasters, provide relief to affected communities, and rebuild lives.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Donate Money */}
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="flex items-center space-x-3">
            <HeartIcon className="h-8 w-8 text-red-500" />
            <CardTitle>Donate Money</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Support us financially via our official paybill number:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-xl font-bold">Paybill Number: <span className="text-blue-600">123456</span></p>
              <p className="text-gray-600">Account Name: Disaster Relief Fund</p>
            </div>
          </CardContent>
        </Card>

        {/* Donate Supplies */}
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="flex items-center space-x-3">
            <HandIcon className="h-8 w-8 text-green-500" />
            <CardTitle>Donate Supplies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">We accept the following essential supplies:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Non-perishable food (canned goods, rice, flour).</li>
              <li>Clothing (clean and in good condition).</li>
              <li>Medical supplies (first-aid kits, gloves, masks).</li>
              <li>Blankets and bedding.</li>
            </ul>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-lg font-bold">Collection Center: Red Cross HQ</p>
              <p className="text-gray-600">Address: [Insert Address]</p>
              <p className="text-gray-600">Contact: +254 700 123 456</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Other Assistance */}
      <Card className="shadow-lg border border-gray-200 mt-6 max-w-4xl w-full">
        <CardHeader className="flex items-center space-x-3">
          <HomeIcon className="h-8 w-8 text-yellow-500" />
          <CardTitle>Other Forms of Assistance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Interested in volunteering or providing other types of assistance? Reach out to us!
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-bold flex items-center justify-center space-x-2">
              <MailIcon className="h-5 w-5 text-blue-500" />
              <span>Email: fmas@disaster.org</span>
            </p>
            <p className="text-lg font-bold flex items-center justify-center space-x-2 mt-2">
              <PhoneIcon className="h-5 w-5 text-blue-500" />
              <span>Phone: +254 700 456 789</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Thank You Message */}
      <div className="bg-blue-100 p-6 rounded-lg text-center mt-8 shadow-md max-w-2xl">
        <p className="text-xl font-bold text-blue-600">Thank you for your generosity!</p>
        <p className="text-gray-600">Every donation makes a difference in saving lives and rebuilding communities.</p>
      </div>
    </div>
  );
};

export default Donate;
