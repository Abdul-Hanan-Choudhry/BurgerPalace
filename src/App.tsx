import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BurgerStackGame from './components/BurgerStackGame';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showGame, setShowGame] = useState(false); // Don't show game on load
  const [discount, setDiscount] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<Array<{id: number, name: string, price: string, quantity: number}>>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGameComplete = (discountAmount: number) => {
    setDiscount(discountAmount);
    setShowGame(false);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div class="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 font-bold">
        🎉 Congratulations! You earned ${discountAmount}% discount!
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  };

  const handleGameClose = () => {
    setShowGame(false);
  };

  const handleStartGame = () => {
    console.log('handleStartGame called in App.tsx');
    setShowGame(true);
    console.log('showGame set to true');
  };

  const handleAddToCart = (item: {id: number, name: string, price: string}) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    
    // Show success notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div class="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 font-bold">
        ✅ ${item.name} added to cart!
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header onStartGame={handleStartGame} cartCount={getTotalItems()} onShowCart={() => setShowCart(true)} />
      <Hero onStartGame={handleStartGame} />
      <Menu onStartGame={handleStartGame} onAddToCart={handleAddToCart} />
      <About />
      <Contact />
      <Footer />
      
      {showGame && (
        <BurgerStackGame 
          onComplete={handleGameComplete}
          onClose={handleGameClose}
        />
      )}
      
      {discount && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg z-40">
          🎁 {discount}% Discount Active!
        </div>
      )}
      
      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-800">🛒 Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                      <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">{item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setCartItems(prev => prev.map(cartItem => 
                              cartItem.id === item.id && cartItem.quantity > 1
                                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                : cartItem
                            ).filter(cartItem => cartItem.quantity > 0));
                          }}
                          className="bg-red-500 text-white w-8 h-8 rounded-full font-bold hover:bg-red-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold text-lg">{item.quantity}</span>
                        <button
                          onClick={() => {
                            setCartItems(prev => prev.map(cartItem => 
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                            ));
                          }}
                          className="bg-green-500 text-white w-8 h-8 rounded-full font-bold hover:bg-green-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-black text-gray-800">Total:</span>
                    <span className="text-2xl font-black text-red-600">
                      ${discount ? (parseFloat(getTotalPrice()) * (1 - discount / 100)).toFixed(2) : getTotalPrice()}
                    </span>
                  </div>
                  {discount && (
                    <div className="text-center mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                        🎉 {discount}% Discount Applied!
                      </span>
                    </div>
                  )}
                  <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-black py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                    🚀 Checkout Now!
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;