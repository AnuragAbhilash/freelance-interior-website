
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Create enhanced floating particles
    const createParticles = () => {
      const container = loaderRef.current;
      if (!container) return;

      // Clear any existing particles
      const existingParticles = container.querySelectorAll('.particle');
      existingParticles.forEach(particle => particle.remove());

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        const opacity = Math.random() * 0.4 + 0.2;
        const duration = Math.random() * 10 + 8;
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, rgba(161, 128, 91, ${opacity}) 0%, transparent 70%);
          border-radius: 50%;
          animation: enhancedFloat ${duration}s infinite linear;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 8}s;
          filter: blur(${Math.random() * 0.5}px);
          pointer-events: none;
        `;
        container.appendChild(particle);
      }
    };

    createParticles();

    // Enhanced animation sequence
    const animateElements = () => {
      if (logoRef.current && textRef.current) {
        // Logo animation
        logoRef.current.style.transform = 'scale(1) rotate(0deg)';
        logoRef.current.style.opacity = '1';
        logoRef.current.style.filter = 'blur(0px)';
        
        // Text animation with delay
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.style.transform = 'translateY(0)';
            textRef.current.style.opacity = '1';
            textRef.current.style.filter = 'blur(0px)';
          }
        }, 1000);
      }
    };

    const timer = setTimeout(animateElements, 800);

    return () => {
      clearTimeout(timer);
      const container = loaderRef.current;
      if (container) {
        const particles = container.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 flex items-center justify-center overflow-hidden">
        <div className="text-center relative">
          <div className="mb-10">
            <div className="relative">
              <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-playfair text-stone-800 mb-6 tracking-wide">
              Saurabh Jha Designs
            </h1>
            <p className="text-lg text-stone-600 font-light tracking-widest uppercase">
              Interior Designer
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 flex items-center justify-center overflow-hidden"
    >
      <style jsx>{`
        @keyframes enhancedFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translateY(-80px) translateX(20px) rotate(90deg) scale(1.2); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-120px) translateX(-10px) rotate(180deg) scale(0.8); 
            opacity: 0.6; 
          }
          75% { 
            transform: translateY(-60px) translateX(30px) rotate(270deg) scale(1.1); 
            opacity: 0.9; 
          }
        }
        
        @keyframes rippleWave {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.8); opacity: 0.4; }
          100% { transform: scale(3); opacity: 0; }
        }
        
        @keyframes ambientGlow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(161, 128, 91, 0.3), 0 0 60px rgba(161, 128, 91, 0.1); 
            filter: drop-shadow(0 0 20px rgba(161, 128, 91, 0.2));
          }
          50% { 
            box-shadow: 0 0 50px rgba(161, 128, 91, 0.6), 0 0 100px rgba(161, 128, 91, 0.2); 
            filter: drop-shadow(0 0 40px rgba(161, 128, 91, 0.4));
          }
        }
        
        @keyframes sketchDraw {
          0% { stroke-dashoffset: 400; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(161, 128, 91, 0.3); }
          50% { text-shadow: 0 0 40px rgba(161, 128, 91, 0.6), 0 0 60px rgba(161, 128, 91, 0.2); }
        }
        
        .sketch-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: sketchDraw 2.5s ease-in-out forwards;
        }
      `}</style>
      
      <div className="text-center relative">
        {/* Logo with Enhanced Animations */}
        <div 
          ref={logoRef}
          className="mb-10 transform scale-0 opacity-0 transition-all duration-1500 ease-out"
          style={{
            animation: 'ambientGlow 4s ease-in-out infinite',
            filter: 'blur(5px)'
          }}
        >
          <div className="relative">
            <svg 
              width="140" 
              height="140" 
              viewBox="0 0 140 140" 
              className="mx-auto relative z-10"
            >
              {/* Outer decorative circle */}
              <circle 
                cx="70" 
                cy="70" 
                r="65" 
                fill="none" 
                stroke="#d4af7a" 
                strokeWidth="1" 
                className="sketch-line"
                style={{ animationDelay: '0.3s' }}
              />
              
              {/* Main circle */}
              <circle 
                cx="70" 
                cy="70" 
                r="55" 
                fill="none" 
                stroke="#a1805b" 
                strokeWidth="2.5" 
                className="sketch-line"
                style={{ animationDelay: '0.8s' }}
              />
              
              {/* House structure */}
              <path 
                d="M35 75 L70 45 L105 75 L95 75 L95 95 L45 95 L45 75 Z" 
                fill="none" 
                stroke="#a1805b" 
                strokeWidth="2.5" 
                className="sketch-line"
                style={{ animationDelay: '1.3s' }}
              />
              
              {/* Door */}
              <rect 
                x="60" 
                y="82" 
                width="20" 
                height="13" 
                fill="none" 
                stroke="#a1805b" 
                strokeWidth="2" 
                className="sketch-line"
                style={{ animationDelay: '1.8s' }}
              />
              
              {/* Window */}
              <rect 
                x="52" 
                y="65" 
                width="12" 
                height="10" 
                fill="none" 
                stroke="#a1805b" 
                strokeWidth="1.5" 
                className="sketch-line"
                style={{ animationDelay: '2s' }}
              />
              
              {/* Decorative elements */}
              <circle 
                cx="70" 
                cy="60" 
                r="2" 
                fill="#a1805b" 
                opacity="0"
                style={{ animation: 'fadeInScale 0.8s ease-in-out 2.5s forwards' }}
              />
              
              <path 
                d="M70 45 L70 38" 
                stroke="#a1805b" 
                strokeWidth="2" 
                className="sketch-line"
                style={{ animationDelay: '2.2s' }}
              />
            </svg>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border border-stone-300 rounded-full opacity-30 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border border-stone-400 rounded-full opacity-40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          </div>
        </div>
        
        {/* Enhanced Text */}
        <div 
          ref={textRef}
          className="transform translate-y-12 opacity-0 transition-all duration-1500 ease-out"
          style={{ filter: 'blur(3px)' }}
        >
          <h1 className="text-7xl font-playfair text-stone-800 mb-6 tracking-wide relative" style={{ animation: 'textGlow 3s ease-in-out infinite 3s' }}>
            Saurabh Jha Designs
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-20 animate-pulse" />
          </h1>
          
          <div className="space-y-2">
            <p className="text-xl text-stone-600 font-light tracking-widest uppercase">
              Interior Designer
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto" />
            <p className="text-base text-stone-500 font-great-vibes italic">
              Where technology meets timeless design.
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Ripple Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-stone-300/40"
          style={{ animation: 'rippleWave 4s ease-out infinite' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-stone-400/30"
          style={{ animation: 'rippleWave 4s ease-out infinite 1.5s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-stone-500/20"
          style={{ animation: 'rippleWave 4s ease-out infinite 3s' }}
        />
      </div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('BackLoader.jpg')`
          }}
        />
      </div>
    </div>
  );
}
