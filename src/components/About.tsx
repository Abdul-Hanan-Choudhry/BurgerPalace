import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Award, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every burger is crafted with passion and the finest ingredients!"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Winner of 'Best Comic-Style Burger Experience' 2024!"
  },
  {
    icon: Users,
    title: "Community Favorite",
    description: "Loved by thousands of burger stackers worldwide!"
  },
  {
    icon: Zap,
    title: "Interactive Fun",
    description: "Play games, win prizes, and stack your way to flavor town!"
  }
];

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0, rotation: 5 },
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

    // Content animation
    gsap.fromTo(contentRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Features animation
    const featureItems = featuresRef.current?.children;
    if (featureItems) {
      gsap.fromTo(featureItems,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={aboutRef}
      id="about"
      className="py-20 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 relative overflow-hidden"
    >
      {/* Comic-style background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-60 right-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-36 h-36 bg-white rounded-full"></div>
        <div className="absolute bottom-60 right-20 w-28 h-28 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-6xl font-black text-white mb-4 drop-shadow-2xl transform -rotate-1">
            🎯 ABOUT BURGER PALACE 🎯
          </h2>
          <p className="text-2xl text-yellow-200 font-bold drop-shadow-lg">
            Where burgers meet comic book fun!
          </p>
          <div className="w-32 h-2 bg-white mx-auto mt-4 rounded-full opacity-80"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div ref={contentRef}>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <h3 className="text-4xl font-black text-white mb-6 drop-shadow-lg transform -rotate-1">
                Our Story 📖
              </h3>
              <p className="text-white text-lg font-medium mb-6 drop-shadow leading-relaxed">
                Born from a love of comics and incredible burgers, Burger Palace brings you 
                an interactive dining experience like no other! Our unique burger stacking 
                game lets you build your perfect meal while having a blast.
              </p>
              <p className="text-yellow-200 text-lg font-medium mb-6 drop-shadow leading-relaxed">
                Every ingredient is carefully selected, every burger is a masterpiece, 
                and every visit is an adventure. Join our community of burger stackers 
                and discover why we're the most fun you can have with food!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white bg-opacity-30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <span className="text-white font-bold">🏆 50+ Awards</span>
                </div>
                <div className="bg-white bg-opacity-30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <span className="text-white font-bold">👥 100K+ Happy Customers</span>
                </div>
                <div className="bg-white bg-opacity-30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <span className="text-white font-bold">🎮 1M+ Games Played</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl">
              <div className="text-8xl mb-6">🍔</div>
              <h3 className="text-3xl font-black text-white mb-4 drop-shadow-lg">
                Burger Palace Experience
              </h3>
              <p className="text-white text-lg font-medium drop-shadow">
                Where every meal is an adventure!
              </p>
            </div>
          </div>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-6 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:rotate-2 group"
            >
              <div className="bg-white bg-opacity-30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <feature.icon size={32} className="text-white drop-shadow-lg" />
              </div>
              <h4 className="text-2xl font-black text-white mb-3 drop-shadow-lg group-hover:-rotate-1 transition-transform duration-200">
                {feature.title}
              </h4>
              <p className="text-yellow-200 font-medium drop-shadow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}