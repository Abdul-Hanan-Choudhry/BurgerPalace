import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-red-900 to-orange-900 text-white py-12 relative overflow-hidden">
      {/* Comic-style background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-4 left-8 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-8 right-4 w-14 h-14 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <div className="text-2xl">🍔</div>
              </div>
              <div>
                <h3 className="text-3xl font-black drop-shadow-lg transform -rotate-1">
                  COMIC BURGER
                </h3>
                <p className="text-yellow-300 font-bold">Stack 'em High!</p>
              </div>
            </div>
            <p className="text-gray-300 font-medium mb-6 leading-relaxed">
              The most fun you can have with food! Play our interactive burger stacking game, 
              win amazing discounts, and enjoy the best burgers in town. Join our comic book 
              adventure today!
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <button
                  key={index}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 hover:rotate-12 shadow-lg backdrop-blur-sm"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black mb-4 text-yellow-300 transform -rotate-1">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About', 'Contact', 'Game', 'Rewards'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-yellow-300 font-medium transition-colors duration-200 hover:translate-x-2 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-black mb-4 text-yellow-300 transform rotate-1">
              Contact Info
            </h4>
            <div className="space-y-3 text-gray-300 font-medium">
              <p>📍 123 Comic Street<br />Burger City, BC 12345</p>
              <p>📞 (555) BURGER-1</p>
              <p>✉️ hello@comicburger.com</p>
              <p>🕒 Mon-Sun: 11AM - 10PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 font-medium">
              © 2024 Comic Burger. All rights reserved. Made with ❤️ and lots of 🍔
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}