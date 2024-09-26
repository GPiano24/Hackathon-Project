import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div
        className="container mx-auto grid grid-cols-1 
            md:grid-cols-4 gap-8 w-11/12"
      >
        <div className="flex items-center">
          <img
            src={require("../assets/white-logo.png")}
            alt="Logo"
            className="h-8"
          />{" "}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contacts</h3>
          <p>Phone: +1 234 567 890</p>
          <p>Email: info@example.com</p>
          <p>Address: 123 Main Street, City</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Social Media</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                className="text-white text-2xl 
                            hover:text-gray-300"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                className="text-white text-2xl
                            hover:text-gray-300"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="text-white text-2xl
                            hover:text-gray-300"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className="text-white text-2xl
                            hover:text-gray-300"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                App Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                SEO Optimization
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
