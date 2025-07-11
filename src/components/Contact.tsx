import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0, rotation: -5 },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Form animation
    gsap.fromTo(formRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Info animation
    gsap.fromTo(infoRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section 
      ref={contactRef}
      id="contact"
      className="py-20 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 relative overflow-hidden"
    >
      {/* Comic-style background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-24 h-24 bg-red-500 rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-orange-500 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-22 h-22 bg-red-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-6xl font-black text-red-600 mb-4 drop-shadow-lg transform -rotate-1">
            📞 GET IN TOUCH 📞
          </h2>
          <p className="text-2xl text-gray-700 font-bold">
            Ready to stack some burgers? Let's talk!
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div ref={formRef}>
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:rotate-1">
              <h3 className="text-3xl font-black text-gray-800 mb-6 transform -rotate-1">
                Send us a Message! 💌
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-4 border-gray-200 focus:border-red-500 focus:outline-none transition-colors duration-200 font-medium"
                    placeholder="Your awesome name..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border-4 border-gray-200 focus:border-red-500 focus:outline-none transition-colors duration-200 font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-4 border-gray-200 focus:border-red-500 focus:outline-none transition-colors duration-200 font-medium resize-none"
                    placeholder="Tell us about your burger dreams..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black text-xl py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:rotate-1 shadow-lg transform hover:-translate-y-1"
                >
                  🚀 Send Message!
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-rotate-1">
              <h3 className="text-3xl font-black text-gray-800 mb-6 transform rotate-1">
                Visit Our Burger Palace HQ! 🏢
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-red-500 text-white rounded-full p-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Address</h4>
                    <p className="text-gray-600">123 Harley Street, Burger City, BC 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-orange-500 text-white rounded-full p-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Phone</h4>
                    <p className="text-gray-600">(555) BURGER-1 / (555) 287-4371</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-yellow-500 text-white rounded-full p-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Email</h4>
                    <p className="text-gray-600">hello@burgerPalace.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="bg-green-500 text-white rounded-full p-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Hours</h4>
                    <div className="text-gray-600">
                      <p>Mon-Thu: 11AM - 10PM</p>
                      <p>Fri-Sat: 11AM - 11PM</p>
                      <p>Sunday: 12PM - 9PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:rotate-1">
              <h3 className="text-2xl font-black mb-4 drop-shadow-lg transform -rotate-1">
                🎮 Play & Win!
              </h3>
              <p className="font-bold drop-shadow mb-4">
                Don't forget to try our burger stacking game for amazing discounts!
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-red-500 font-black px-6 py-3 rounded-full hover:scale-110 hover:rotate-2 transition-all duration-200 shadow-lg"
              >
                Start Game Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}