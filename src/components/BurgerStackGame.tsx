import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Trophy, Gift, Play, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';

interface BurgerStackGameProps {
  onComplete: (discount: number) => void;
  onClose: () => void;
}

const BURGER_COMPONENTS = [
  { id: 'bottom-bun', name: 'Bottom Bun', image: '/src/assets/bottom-bun.png', order: 0 },
  { id: 'meat', name: 'Meat Patty', image: '/src/assets/meat.png', order: 1 },
  { id: 'cheese', name: 'Cheese', image: '/src/assets/cheese.png', order: 2 },
  { id: 'lettuce', name: 'Lettuce', image: '/src/assets/letuce.png', order: 3 },
  { id: 'tomato', name: 'Tomato', image: '/src/assets/tomato.png', order: 4 },
  { id: 'onions', name: 'Onions', image: '/src/assets/onions.png', order: 5 },
  { id: 'bacon', name: 'Bacon', image: '/src/assets/bacon-1.png', order: 6 },
  { id: 'top-bun', name: 'Top Bun', image: '/src/assets/top-bun 1.png', order: 7 },
];

interface StackedItem {
  id: string;
  x: number;
  accuracy: number;
}

export default function BurgerStackGame({ onComplete, onClose }: BurgerStackGameProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [stackedItems, setStackedItems] = useState<StackedItem[]>([]);
  const [movingItemX, setMovingItemX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [score, setScore] = useState(0);
  const [perfectStack, setPerfectStack] = useState(0);
  const [direction, setDirection] = useState(1);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const GAME_WIDTH = 320;
  const ITEM_WIDTH = 80;
  const PERFECT_ZONE = 40;
  const GOOD_ZONE = 80;
  const CENTER_X = (GAME_WIDTH - ITEM_WIDTH) / 2;

  useEffect(() => {
    // Animate game entrance
    if (gameRef.current) {
      gsap.fromTo(gameRef.current, 
        { scale: 0, rotation: 180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const startMoving = useCallback(() => {
    console.log('startMoving function called');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsMoving(true);
    console.log('Movement started');
    let position = 0;
    let currentDirection = 1;
    
    intervalRef.current = setInterval(() => {
      position += currentDirection * 4;
      
      if (position >= GAME_WIDTH - ITEM_WIDTH) {
        currentDirection = -1;
        position = GAME_WIDTH - ITEM_WIDTH;
      } else if (position <= 0) {
        currentDirection = 1;
        position = 0;
      }
      
      setMovingItemX(position);
      setDirection(currentDirection);
    }, 16); // ~60fps
  }, []);

  const stopMoving = useCallback(() => {
    setIsMoving(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const dropItem = useCallback(() => {
    if (!isMoving || currentComponentIndex >= BURGER_COMPONENTS.length) return;
    
    stopMoving();
    
    const currentComponent = BURGER_COMPONENTS[currentComponentIndex];
    const distance = Math.abs(movingItemX - CENTER_X);
    
    let accuracy = 0;
    let points = 0;
    
    if (distance <= PERFECT_ZONE) {
      accuracy = 100;
      points = 100;
      setPerfectStack(prev => prev + 1);
    } else if (distance <= GOOD_ZONE) {
      accuracy = Math.max(50, 100 - ((distance - PERFECT_ZONE) * 2));
      points = Math.round(accuracy);
    } else {
      accuracy = Math.max(10, 100 - distance);
      points = Math.round(accuracy / 2);
    }
    
    const newStackedItem: StackedItem = {
      id: currentComponent.id,
      x: movingItemX,
      accuracy
    };
    
    setStackedItems(prev => [...prev, newStackedItem]);
    setScore(prev => prev + points);
    
    // Move to next component or complete game
    if (currentComponentIndex < BURGER_COMPONENTS.length - 1) {
      setTimeout(() => {
        setCurrentComponentIndex(prev => prev + 1);
        setMovingItemX(0);
        setTimeout(() => startMoving(), 300);
      }, 800);
    } else {
      // Game complete
      setTimeout(() => {
        setGameState('complete');
        calculateFinalDiscount();
      }, 1000);
    }
  }, [isMoving, currentComponentIndex, movingItemX, stopMoving, startMoving]);

  const calculateFinalDiscount = () => {
    const maxScore = BURGER_COMPONENTS.length * 100;
    const scorePercentage = (score / maxScore) * 100;
    const perfectBonus = (perfectStack / BURGER_COMPONENTS.length) * 20;
    
    let discount = Math.round(scorePercentage * 0.3 + perfectBonus);
    discount = Math.max(5, Math.min(50, discount));
    
    setTimeout(() => onComplete(discount), 2000);
  };

  const startGame = () => {
    console.log('startGame function called');
    console.log('Current game state before change:', gameState);
    setGameState('playing');
    console.log('Game state set to playing');
    setCurrentComponentIndex(0);
    setStackedItems([]);
    setScore(0);
    setPerfectStack(0);
    setMovingItemX(0);
    console.log('Starting movement in 500ms...');
    setTimeout(() => startMoving(), 500);
  };

  const resetGame = () => {
    stopMoving();
    setGameState('intro');
    setCurrentComponentIndex(0);
    setStackedItems([]);
    setScore(0);
    setPerfectStack(0);
    setMovingItemX(0);
  };

  // Handle spacebar press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'playing' && isMoving) {
        e.preventDefault();
        dropItem();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dropItem, gameState, isMoving]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentComponent = BURGER_COMPONENTS[currentComponentIndex];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
      style={{ zIndex: 9999 }}
    >
      <div 
        ref={gameRef}
        className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-3xl p-6 max-w-4xl w-full relative overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          zIndex: 10000,
          pointerEvents: 'auto'
        }}
      >
        {/* Comic-style background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
          <div className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute bottom-8 left-12 w-6 h-6 bg-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
          style={{ zIndex: 10001 }}
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg transform -rotate-1">
            🍔 BURGER STACK MASTER! 🍔
          </h2>
          <p className="text-white text-lg font-bold drop-shadow">
            Drop ingredients to build the perfect straight burger!
          </p>
          {gameState === 'playing' && (
            <div className="mt-2 flex justify-center space-x-4 flex-wrap">
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 m-1">
                <span className="text-white font-bold">Score: {score}</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 m-1">
                <span className="text-white font-bold">Perfect: {perfectStack}</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 m-1">
                <span className="text-white font-bold">{currentComponentIndex + 1}/{BURGER_COMPONENTS.length}</span>
              </div>
            </div>
          )}
        </div>

        {gameState === 'intro' && (
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm mb-6">
              <h3 className="text-2xl font-black text-white mb-4">How to Play:</h3>
              <div className="text-white font-bold space-y-2 text-left max-w-md mx-auto">
                <p>🎯 Ingredients move left to right</p>
                <p>⏰ Click DROP or press SPACE to drop them</p>
                <p>📐 Stack them straight for higher scores</p>
                <p>🎁 Perfect alignment = maximum discount!</p>
              </div>
            </div>
            <div className="relative z-50">
              <button
                type="button"
                onMouseEnter={() => console.log('Button hover started')}
                onMouseLeave={() => console.log('Button hover ended')}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Start Game button clicked');
                  console.log('Game state:', gameState);
                  console.log('Starting game...');
                  startGame();
                }}
                className="bg-white text-red-500 font-black text-xl px-8 py-4 rounded-full hover:bg-gray-100 hover:scale-110 hover:rotate-2 hover:shadow-2xl transition-all duration-200 shadow-lg flex items-center space-x-2 mx-auto cursor-pointer active:scale-95"
                style={{ 
                  pointerEvents: 'auto',
                  zIndex: 100,
                  position: 'relative',
                  userSelect: 'none'
                }}
              >
                <Play size={24} />
                <span>START GAME!</span>
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Area */}
            <div className="lg:col-span-2 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div 
                className="relative bg-white bg-opacity-30 rounded-xl p-4 mx-auto"
                style={{ width: `${GAME_WIDTH}px`, height: '450px' }}
              >
                {/* Center guide line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-yellow-300 opacity-50"
                  style={{ left: `${CENTER_X + ITEM_WIDTH/2}px` }}
                ></div>
                
                {/* Perfect zone indicator */}
                <div 
                  className="absolute top-0 bottom-0 bg-green-300 opacity-20 rounded"
                  style={{ 
                    left: `${CENTER_X - PERFECT_ZONE/2 + ITEM_WIDTH/2}px`,
                    width: `${PERFECT_ZONE}px`
                  }}
                ></div>

                {/* Moving ingredient */}
                {currentComponent && isMoving && (
                  <div
                    className="absolute top-4 transition-none z-10"
                    style={{ left: `${movingItemX}px` }}
                  >
                    <img
                      src={currentComponent.image}
                      alt={currentComponent.name}
                      className="w-20 h-auto drop-shadow-lg"
                      style={{ width: `${ITEM_WIDTH}px` }}
                    />
                  </div>
                )}

                {/* Stacked ingredients */}
                <div 
                  ref={stackRef}
                  className="absolute bottom-4 left-0 right-0"
                >
                  {stackedItems.map((item, index) => {
                    const component = BURGER_COMPONENTS.find(c => c.id === item.id);
                    return (
                      <div
                        key={index}
                        className="absolute"
                        style={{ 
                          left: `${item.x}px`,
                          bottom: `${index * 25}px`
                        }}
                      >
                        <img
                          src={component?.image}
                          alt={component?.name}
                          className="drop-shadow-lg"
                          style={{ 
                            width: `${ITEM_WIDTH}px`,
                            filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3)) ${
                              item.accuracy > 80 ? 'brightness(1.2)' : 
                              item.accuracy > 50 ? 'brightness(1)' : 'brightness(0.8)'
                            }`
                          }}
                        />
                        {/* Accuracy indicator */}
                        <div className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.accuracy > 80 ? '🎯' : item.accuracy > 50 ? '👍' : '😅'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={dropItem}
                  disabled={!isMoving}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-black px-8 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg disabled:cursor-not-allowed"
                >
                  DROP IT! (SPACE)
                </button>
              </div>
            </div>

            {/* Instructions & Progress */}
            <div className="space-y-4">
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
                <h3 className="text-white font-bold text-lg mb-3 text-center">Current</h3>
                {currentComponent && (
                  <div className="text-center">
                    <img
                      src={currentComponent.image}
                      alt={currentComponent.name}
                      className="w-16 h-auto mx-auto mb-2 drop-shadow-lg"
                    />
                    <p className="text-white font-bold text-sm">{currentComponent.name}</p>
                  </div>
                )}
              </div>

              <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
                <h3 className="text-white font-bold text-lg mb-3 text-center">Remaining</h3>
                <div className="grid grid-cols-3 gap-2">
                  {BURGER_COMPONENTS.slice(currentComponentIndex + 1).map((component) => (
                    <div key={component.id} className="text-center">
                      <img
                        src={component.image}
                        alt={component.name}
                        className="w-10 h-auto mx-auto opacity-60"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={resetGame}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Restart</span>
              </button>
            </div>
          </div>
        )}

        {gameState === 'complete' && (
          <div className="text-center">
            <div className="mb-6">
              <Trophy className="w-20 h-20 text-yellow-300 mx-auto mb-4 animate-bounce" />
              <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                BURGER MASTER! 🎉
              </h3>
              <p className="text-white text-lg font-bold drop-shadow">
                You've built an amazing burger tower!
              </p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm mb-6">
              <Gift className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <div className="grid grid-cols-2 gap-4 text-white font-bold">
                <div>
                  <p className="text-2xl">{score}</p>
                  <p className="text-sm">Total Score</p>
                </div>
                <div>
                  <p className="text-2xl">{perfectStack}</p>
                  <p className="text-sm">Perfect Drops</p>
                </div>
              </div>
              <p className="text-yellow-300 font-black text-xl mt-4">
                Calculating your discount...
              </p>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-white text-red-500 font-bold px-6 py-3 rounded-full hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2"
              >
                <RotateCcw size={20} />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}