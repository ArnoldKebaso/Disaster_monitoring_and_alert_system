// src/components/SendEmailAlert.tsx
import React, { useState } from 'react';
import axios from 'axios';

const SendEmailAlert: React.FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/subscriptions/send-email', {
        to,
        subject,
        text,
      });

      alert(response.data.message);
      setTo('');
      setSubject('');
      setText('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Send Email Alert</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">To:</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter recipient email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter email subject"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={4}
            placeholder="Enter email message"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default SendEmailAlert;