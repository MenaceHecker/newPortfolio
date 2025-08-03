import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('entering');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase('loaded');
    }, 2500); 

    const timer2 = setTimeout(() => {
      setAnimationPhase('exiting');
    }, 8000); 

    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 9000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black transition-all duration-800 ${
      animationPhase === 'exiting' ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div 
                key={i} 
                className="border border-purple-500/20 aspect-square"
                style={{
                  animationDelay: `${(i % 12) * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating cubes */}
        {[...Array(6)].map((_, i) => ( // Reducing this from 8 to 6 for mobile
          <div
            key={i}
            className="absolute w-6 h-6 sm:w-8 sm:h-8 border border-purple-400/30 transform rotate-45 animate-pulse"
            style={{
              left: `${15 + (i % 3) * 30}%`, 
              top: `${25 + Math.floor(i / 3) * 35}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s'
            }}
          />
        ))}

        {/* Code symbols floating */}
        <div className="absolute inset-0">
          {['</', '{', '}', '()', '[]', '<>', '&&', '=>'].map((symbol, i) => (
            <div
              key={i}
              className={`absolute text-purple-400/20 font-mono text-lg sm:text-xl md:text-2xl transition-all duration-1000 ${
                animationPhase === 'entering' ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
              }`}
              style={{
                left: `${Math.random() * 70 + 15}%`, 
                top: `${Math.random() * 70 + 15}%`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        
        {/* Logo/Brand */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 ${
          animationPhase === 'entering' ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'
        }`}>
          <div className="relative">
            {/* 3D-style logo container */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto relative transform-gpu">
              {/* Back face */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg sm:rounded-xl transform translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 opacity-60"></div>
              {/* Front face */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xl border border-purple-400/30">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono">&lt;/&gt;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className={`px-4 transition-all duration-1000 delay-300 ${
          animationPhase === 'entering' ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
        }`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-wider text-center">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              THE LAST TIME
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
            <div className="w-8 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-purple-400 rounded-full flex items-center justify-center">
              <span className="text-purple-400 font-mono text-xs sm:text-sm">&lt;/&gt;</span>
            </div>
            <div className="w-8 sm:w-12 md:w-16 h-1 bg-gradient-to-l from-transparent to-purple-400 rounded-full"></div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-widest">
            CODE
          </h2>
        </div>

        {/* Subtitle */}
        <div className={`px-4 transition-all duration-1000 delay-500 ${
          animationPhase === 'entering' ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
        }`}>
          <p className="text-gray-300 text-lg sm:text-xl mt-6 sm:mt-8 font-light tracking-wide max-w-xs sm:max-w-md mx-auto text-center">
            CS Graduate from UGA
          </p>
          <p className="text-purple-400/80 text-base sm:text-lg mt-2 font-mono">
            End of an Era
          </p>
        </div>

        {/* Loading animation */}
        <div className={`mt-12 sm:mt-16 px-4 transition-all duration-1000 delay-700 ${
          animationPhase === 'entering' ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <span className="text-gray-400 font-mono text-xs sm:text-sm">Initializing workspace</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-2000 ease-out"
              style={{
                width: animationPhase === 'loaded' ? '100%' : '0%'
              }}
            />
          </div>
        </div>

        {/* Bottom decoration */}
        <div className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          animationPhase === 'entering' ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
        }`}>
          <div className="flex items-center gap-1 sm:gap-2 text-gray-500 text-xs sm:text-sm font-mono px-4">
            <span>$</span>
            <span className="animate-pulse">portfolio --initialize</span>
            <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-purple-400 animate-pulse ml-1"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-purple-400/30"></div>
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-t-2 border-blue-400/30"></div>
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-b-2 border-blue-400/30"></div>
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-purple-400/30"></div>
      
      <div className={`absolute inset-0 bg-black transition-opacity duration-800 ${
        animationPhase === 'exiting' ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default SplashScreen;