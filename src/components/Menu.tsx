import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MenuProps {
  onStartGame: () => void;
  onAddToCart: (item: {id: number, name: string, price: string}) => void;
}

const MENU_ITEMS = [
  {
    id: 1,
    name: "The Stack Master",
    description: "Our signature burger with all the fixings - bacon, cheese, lettuce, tomato, onions, and our secret sauce!",
    price: "$12.99",
    rating: 4.9,
    image: "/src/assets/1.jpeg",
    popular: true
  },
  {
    id: 2,
    name: "The Complete Tower",
    description: "All 8 ingredients stacked high - bottom bun, meat, cheese, lettuce, tomato, onions, bacon, and top bun!",
    price: "$15.99",
    rating: 4.7,
    image: "/src/assets/2.jpeg",
    popular: true
  },
  {
    id: 3,
    name: "Cheese Explosion",
    description: "Double cheese, double flavor! Perfect for cheese lovers.",
    price: "$10.99",
    rating: 4.8,
    image: "/src/assets/3.jpeg",
    popular: false
  },
  {
    id: 4,
    name: "Bacon Bliss",
    description: "Crispy bacon strips that'll make your taste buds dance!",
    price: "$11.99",
    rating: 4.9,
    image: "/src/assets/4.jpeg",
    popular: true
  },
  {
    id: 5,
    name: "Fresh & Crispy",
    description: "Garden fresh lettuce, juicy tomatoes, and sweet onions for the perfect crunch!",
    price: "$9.99",
    rating: 4.6,
    image: "/src/assets/5.jpeg",
    popular: false
  },
  {
    id: 6,
    name: "Garden Fresh",
    description: "Fresh lettuce and crispy onions for the health-conscious burger lover.",
    price: "$8.99",
    rating: 4.5,
    image: "/src/assets/6.jpeg",
    popular: false
  },
  {
    id: 7,
    name: "Onion Ring Special",
    description: "Sweet caramelized onions that add the perfect flavor punch!",
    price: "$7.99",
    rating: 4.4,
    image: "/src/assets/3.jpeg",
    popular: false
  },
  {
    id: 8,
    name: "Classic Foundation",
    description: "Our perfectly toasted bun - the foundation of every great burger!",
    price: "$6.99",
    rating: 4.7,
    image: "/src/assets/1.jpeg",
    popular: false
  },
  {
    id: 9,
    name: "Build Your Own",
    description: "Create your perfect burger with our interactive stacking game!",
    price: "$16.99",
    rating: 5.0,
    image: "/src/assets/4.jpeg",
    popular: true
  }
];

export default function Menu({ onStartGame, onAddToCart }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Menu items animation
    const menuItems = itemsRef.current?.children;
    if (menuItems) {
      gsap.fromTo(menuItems,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={menuRef}
      id="menu"
      className="py-20 bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 relative overflow-hidden"
    >
      {/* Comic-style background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-500 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-18 h-18 bg-red-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-6xl font-black text-red-600 mb-4 drop-shadow-lg transform -rotate-1">
            🍔 OUR EPIC MENU 🍔
          </h2>
          <p className="text-2xl text-gray-700 font-bold">
            Stack 'em, eat 'em, love 'em!
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div 
          ref={itemsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:rotate-1 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)',
                border: '4px solid transparent',
                backgroundClip: 'padding-box'
              }}
            >
              {item.popular && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                  🔥 POPULAR
                </div>
              )}

              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-contain mx-auto drop-shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                  />
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-yellow-200 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-gray-800 mb-2 text-center transform group-hover:-rotate-1 transition-transform duration-200">
                {item.name}
              </h3>

              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(item.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-bold text-gray-600 ml-2">
                    {item.rating}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-center mb-4 font-medium">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-red-600 transform -rotate-2">
                  {item.price}
                </span>
                <button 
                  onClick={() => onAddToCart({id: item.id, name: item.name, price: item.price})}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-3 shadow-lg flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={onStartGame}
            className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-black text-xl px-12 py-4 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-2 shadow-2xl transform hover:-translate-y-1"
          >
            🎮 PLAY STACKING GAME FOR DISCOUNTS!
          </button>
        </div>
      </div>
    </section>
  );
}