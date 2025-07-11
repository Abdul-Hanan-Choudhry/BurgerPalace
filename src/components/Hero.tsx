import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onStartGame: () => void;
}

export default function Hero({ onStartGame }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(burgerRef.current,
      { x: 200, opacity: 0, rotation: 180 },
      { x: 0, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" },
      "-=0.3"
    );

    // Floating animation for burger
    gsap.to(burgerRef.current, {
      y: -20,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Parallax effect
    // gsap.to(heroRef.current, {
    //   yPercent: -50,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: heroRef.current,
    //     start: "top bottom",
    //     end: "bottom top",
    //     scrub: true
    //   }
    // });

  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="min-h-screen relative overflow-hidden pt-header"
      style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)',
      }}
    >
      {/* Comic-style background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-white rounded-full"></div>
      </div>

      {/* Floating burger ingredients */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className="text-4xl opacity-30">
              {['🍅', '🥬', '🧀', '🥓', '🍖', '🍞'][i]}
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div ref={textRef} className="text-center lg:text-left">
          <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl">
            <span className="block transform -rotate-2">STACK</span>
            <span className="block transform rotate-1 text-yellow-300">THE</span>
            <span className="block transform -rotate-1">FLAVOR!</span>
          </h1>
          <p className="text-2xl text-white font-bold mb-8 drop-shadow-lg">
            Build your perfect burger with our comic-style stacking game!
            <br />
            <span className="text-yellow-300">Win discounts & have fun!</span>
          </p>
          
          <div ref={ctaRef} className="space-y-4">
            <button 
              onClick={onStartGame}
              className="bg-white text-red-500 font-black text-xl px-8 py-4 rounded-full hover:scale-110 hover:rotate-2 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              🎮 PLAY BURGER STACK GAME!
            </button>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollToSection('menu')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Order Now
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="bg-transparent border-4 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-red-500 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>

        {/* 3D Burger Stack */}
        <div ref={burgerRef} className="relative">
          <div className="relative transform perspective-1000 hover:scale-105 transition-transform duration-300 max-w-sm mx-auto">
            {/* Burger components stacked */}
            <div className="relative flex flex-col items-center">
              <img
                src="/assets/top-bun 1.png"
                alt="Top Bun"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform hover:rotate-3 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
              <img
                src="/assets/bacon-1.png"
                alt="Bacon"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform -mt-3 sm:-mt-4 hover:rotate-2 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
              <img
                src="/assets/onions.png"
                alt="Onions"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform -mt-3 sm:-mt-4 hover:-rotate-1 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
              <img
                src="/assets/tomato.png"
                alt="Tomato"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform -mt-3 sm:-mt-4 hover:rotate-1 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
              <img
                src="/assets/letuce.png"
                alt="Lettuce"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform -mt-3 sm:-mt-4 hover:-rotate-2 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
              <img
                src="/assets/cheese.png"
                alt="Cheese"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform -mt-3 sm:-mt-4 hover:rotate-1 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
              <img
                src="/assets/meat.png"
                alt="Meat"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform -mt-3 sm:-mt-4 hover:-rotate-1 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
              <img
                src="/assets/bottom-bun.png"
                alt="Bottom Bun"
                className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl transform -mt-3 sm:-mt-4 hover:rotate-2 transition-transform duration-200"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}