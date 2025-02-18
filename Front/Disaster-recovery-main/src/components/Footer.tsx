// components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

import { Input } from './ui/input';
import { Button } from './ui/button';
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Admin Portal",
                "Responder Portal",
                "User Dashboard",                "Publications",
                "Impact Stories",
                "Donate",
                "About Us",
                "Contact Us",
              ].map((link, index) => {
                let path = `/${link.replace(" ", "-").toLowerCase()}`;
                if (link === "Admin Portal") {
                  path = "/login";
                } else if (link === "User Dashboard") {
                  path = "/dashboard";
                }
                return (
                  <li key={index} className="hover:text-yellow-300">
                    <Link to={path}>{link}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <p>Phone: +123 456 7890</p>
            <p>Email: info@fmas.com</p>
            <p>Address: 123 FMAS Street, Nairobi, Kenya</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/travis.nonini/" className="text-white hover:text-yellow-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; FMAS( Flood Alert & Monitoring System.)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;