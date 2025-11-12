import React, { useState, useEffect, useRef } from 'react';
import videoSource from '../assets/pagevideo.mp4';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle video time to loop at 18 seconds
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 18) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Smooth scroll to products section with offset
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      const headerHeight = 80; // Adjust this based on your header height
      const elementPosition = productsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Video Background with Optimized Zoom */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'sepia(0.5) saturate(1.5) hue-rotate(10deg)',
          transform: isMobile ? 'scale(1.1)' : 'scale(1.3)',
          objectPosition: 'center',
          imageRendering: 'crisp-edges',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      {/* Gold Overlay for readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(197, 160, 40, 0.6) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 
          className="font-serif text-4xl sm:text-5xl md:text-7xl mb-6 text-white"
          style={{
            textShadow: '2px 4px 8px rgba(0, 0, 0, 0.7)',
            letterSpacing: '0.05em'
          }}
        >
          If There Is a Will
          <br />
          There Is a Way
        </h1>
        <p 
          className="text-lg sm:text-xl md:text-2xl text-white mb-8 font-light"
          style={{
            textShadow: '1px 2px 4px rgba(0, 0, 0, 0.6)'
          }}
        >
          Discover refined style for the modern gentleman
        </p>
        
        {/* Shop Now Button - Always Gold */}
        <button
          onClick={scrollToProducts}
          className="px-8 py-4 rounded-full font-medium text-white transition-all duration-300 shadow-lg hover:shadow-2xl hover:transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)'
          }}
        >
          Shop Now
        </button>
      </div>

      {/* Bouncing Arrow */}
      <div 
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce"
      >
        <svg 
          className="w-8 h-8 text-white"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;