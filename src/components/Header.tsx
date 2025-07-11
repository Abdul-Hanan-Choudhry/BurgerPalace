import React, { useEffect, useRef } from 'react';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { gsap } from 'gsap';

interface HeaderProps {
  onStartGame: () => void;
  cartCount: number;
  onShowCart: () => void;
}

export default function Header({ onStartGame, cartCount, onShowCart }: HeaderProps) {
  const headerRef = useRef<HTMLHeaderElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header entrance
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
      );
    }

    // Animate logo
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.3 }
      );
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shadow-2xl"
      style={{
        background: 'linear-gradient(90deg, #ef4444 0%, #f97316 50%, #eab308 100%)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            ref={logoRef}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-white rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
              <div className="text-3xl">🍔</div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white drop-shadow-lg transform -rotate-1">
                BURGER PALACE
              </h1>
              <p className="text-yellow-200 font-bold text-sm">
                Stack 'em High!
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Menu', 'About', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                className="text-white font-bold text-lg hover:text-yellow-200 transition-colors duration-200 hover:scale-110 transform hover:-rotate-1 drop-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onShowCart}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 hover:rotate-12 shadow-lg backdrop-blur-sm relative"
              title="View Cart"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 hover:-rotate-12 shadow-lg backdrop-blur-sm"
              title="Profile"
            >
              <User size={24} />
            </button>
            <button 
              onClick={() => {
                // Toggle mobile menu (you can implement this later)
                console.log('Mobile menu toggle');
              }}
              className="md:hidden bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg backdrop-blur-sm"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}