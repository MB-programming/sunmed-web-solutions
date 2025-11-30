import React, { useState, useEffect } from 'react';
import "./Loader.css"
const LoadingPage = () => {
  const [currentLoader, setCurrentLoader] = useState(0);
  
  // Rotate through different loader styles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLoader((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Custom color style for dynamic usage
  const customColorStyle = {
    '--main-color': '#54EECC',
  };

  return (
    <div 
      className="h-screen z-50 fixed top-0 left-0 w-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4"
      style={customColorStyle}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Loading
          <span className="loading-dots">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </h1>
        <p className="text-gray-400 text-lg">Please wait while we prepare your experience</p>
      </div>

      <div className="w-full max-w-md h-64 flex items-center justify-center">
        {currentLoader === 0 && <PulseLoader />}
        {currentLoader === 1 && <SpinningOrbLoader />}
        {currentLoader === 2 && <WaveLoader />}
        {currentLoader === 3 && <BouncingDotsLoader />}
      </div>

      <div className="mt-12 text-center">
        <div className="flex space-x-2 justify-center mb-4">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentLoader(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentLoader === index ? 'bg-[#54EECC] scale-125' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm">Click dots to switch animations</p>
      </div>
    </div>
  );
};

// Pulse Loader - Main central animation
const PulseLoader = () => (
  <div className="relative">
    <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-pulse"></div>
    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#54EECC] rounded-full animate-ping"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#54EECC] rounded-full animate-pulse"></div>
  </div>
);

// Spinning Orb Loader
const SpinningOrbLoader = () => (
  <div className="relative w-32 h-32">
    <div className="absolute inset-0 border-4 border-transparent border-t-[#54EECC] border-r-[#54EECC] rounded-full animate-spin"></div>
    <div className="absolute inset-2 border-4 border-transparent border-b-[#54EECC] border-l-[#54EECC] rounded-full animate-spin-slow"></div>
    <div className="absolute inset-4 border-4 border-transparent border-t-[#54EECC] border-r-[#54EECC] rounded-full animate-spin-reverse"></div>
  </div>
);

// Wave Loader
const WaveLoader = () => (
  <div className="flex space-x-2 items-end">
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="w-4 bg-[#54EECC] rounded-t-lg animate-wave"
        style={{
          height: `${20 + i * 8}px`,
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
  </div>
);

// Bouncing Dots Loader
const BouncingDotsLoader = () => (
  <div className="flex space-x-3">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-6 h-6 bg-[#54EECC] rounded-full animate-bounce"
        style={{
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

export default LoadingPage;