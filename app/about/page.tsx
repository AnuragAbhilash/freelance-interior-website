'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const philosophyCards = [
    {
      title: "Sahaj Kalā Philosophy",
      description: "Honoring cracked clay, faded dyes, and weathered wood as testaments to time's graceful passage and human touch.",
      icon: "ri-leaf-line",
      color: "from-amber-100 to-amber-200",
      lightColor: "bg-amber-50"
    },
    {
      title: "Emotional Resonance",
      description: "Creating spaces that speak to the soul, where every texture and shadow tells a meaningful story.",
      icon: "ri-heart-3-line",
      color: "from-rose-100 to-rose-200",
      lightColor: "bg-rose-50"
    },
    {
      title: "Sustainable Luxury",
      description: "Curating timeless elegance through responsible sourcing and materials that age beautifully with intention.",
      icon: "ri-recycle-line",
      color: "from-green-100 to-green-200",
      lightColor: "bg-green-50"
    },
    {
      title: "Spatial Narrative",
      description: "Designing environments that unfold like chapters in a book, each room contributing to a larger story.",
      icon: "ri-book-open-line",
      color: "from-blue-100 to-blue-200",
      lightColor: "bg-blue-50"
    }
  ];

  const experienceCards = [
    {
      years: "15+ Years",
      title: "Tech Industry Experience",
      description: "Blending structured thinking with artistic sensitivity",
      icon: "ri-time-line",
      color: "from-purple-400 to-purple-600"
    },
    {
      years: "10+ Concepts",
      title: "Design Mockups Delivered",
      description: "Crafted interiors inspired by Madhubani, terracotta & brass",
      icon: "ri-building-line",
      color: "from-blue-400 to-blue-600"
    },
    {
      years: "5 Cities",
      title: "Pan-India Cultural Research",
      description: "Design cues from Bihar, Bengal, Tamil Nadu, and beyond",
      icon: "ri-heart-line",
      color: "from-rose-400 to-rose-600"
    },
    {
      years: "1 Passion",
      title: "Design with a Soul",
      description: "Driven by heritage, mindfulness, and modernity",
      icon: "ri-award-line",
      color: "from-amber-400 to-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Custom Cursor - Responsive */}
      <div 
        className="fixed pointer-events-none z-50 w-6 h-6 md:w-8 md:h-8 bg-stone-400/30 rounded-full backdrop-blur-sm transition-all duration-300"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: isHovered ? 'scale(2)' : 'scale(1)',
          opacity: isHovered ? 0.8 : 0.4
        }}
      />

      {/* Hero Section - Responsive */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('About BG.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-playfair mb-6 md:mb-8 animate-slideUp">
            About Saurabh Jha Designs
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-great-vibes mb-6 md:mb-8 animate-fadeInUp opacity-90">
            Crafting stories through space and light
          </p>
          <div className="w-16 sm:w-24 h-1 bg-white mx-auto mb-6 md:mb-8 animate-slideUp" />
        </div>
      </section>

      {/* Story Section - Responsive */}
      <section className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="mb-8 md:mb-12">
                <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">My Story</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-stone-800 mt-4 sm:mt-6 mb-6 sm:mb-8">
                  Where Technology 
                  <span className="block text-stone-600 font-great-vibes text-2xl sm:text-3xl md:text-4xl italic">Meets Art to create Perfect Design</span>
                </h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6 text-stone-600 leading-relaxed">
                <p className="text-base sm:text-lg md:text-xl font-light">
                  My journey began in the tech corridors of Bangalore, where I spent 15 years architecting digital systems. Yet the rhythm of algorithms couldn't quiet my deeper pull - the memory of Bihar's terracotta artisans and Old Delhi's brass workshops, where imperfect beauty told richer stories than any flawless code.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg">
                  I discovered design wasn't about replacing tradition with technology, but weaving them together. I apprenticed with master craftsmen - kantha weavers, Warli artists, bamboo workers - learning how their centuries-old techniques could solve modern spatial challenges in ways software never could.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg">
                  Today, my studio speaks two languages fluently: parametric algorithms generate layouts that cradle hand-block printed textiles, AI lighting enhances the dance of shadows through hand-carved jaalis, and 3D modeling preserves the organic imperfections of clay pottery. The tech isn't the star - it's the silent enabler of human craft.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg">
                  Every space I design carries this dual DNA - the precision of my tech past tempering the soulfulness of my artistic roots. Because the best environments, like the best code, aren't just functional - they reveal their deeper intelligence slowly, through lived experience. Your space should work like perfect software: intuitive, elegant, and quietly revelatory in its craftsmanship.
                </p>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-stone-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
                <Image
                  src="/Hero.jpg"
                  alt="Kumar Saurabh"
                  width={600}
                  height={800}
                  className="w-full h-auto sm:h-[500px] md:h-[600px] object-cover rounded-xl sm:rounded-2xl object-top"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent rounded-xl sm:rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Cards - Responsive */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-br from-stone-100 to-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">Design Philosophy</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-stone-800 mt-4 sm:mt-6 mb-6 sm:mb-8">
              Core Beliefs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {philosophyCards.map((card, index) => (
              <div
                key={index}
                className={`group relative ${card.lightColor} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 sm:duration-700 cursor-pointer border border-stone-200/30 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.02] sm:hover:scale-105`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/80 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-white transition-all duration-300 sm:duration-500 shadow-md sm:shadow-lg">
                    <i className={`${card.icon} text-stone-600 text-xl sm:text-2xl`}></i>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-playfair text-stone-800 mb-2 sm:mb-4 group-hover:text-stone-900 transition-colors duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-stone-400 to-stone-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 sm:duration-500 origin-left" />
                
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 sm:duration-700 origin-center opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Responsive */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">Experience</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-stone-800 mt-4 sm:mt-6 mb-6 sm:mb-8">
              Numbers That Matter
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {experienceCards.map((card, index) => (
              <div
                key={index}
                className="group text-center p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-stone-50 transition-all duration-500 sm:duration-700 cursor-pointer transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-[1.02] sm:hover:scale-105 relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 sm:duration-500 rounded-2xl sm:rounded-3xl`} />
                
                <div className="relative z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-stone-200 transition-all duration-300 sm:duration-500 shadow-md sm:shadow-lg">
                    <i className={`${card.icon} text-stone-600 text-lg sm:text-xl md:text-2xl`}></i>
                  </div>
                  
                  <div className="text-2xl sm:text-3xl font-playfair text-stone-800 mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 sm:duration-500 group-hover:text-transparent bg-clip-text bg-gradient-to-r group-hover:from-stone-600 group-hover:to-stone-800">
                    {card.years}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-playfair text-stone-700 mb-2 sm:mb-3 group-hover:text-stone-900 transition-colors duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
                
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${card.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 sm:duration-500 origin-left rounded-b-2xl sm:rounded-b-3xl`} />
                
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-1 sm:w-2 h-1 sm:h-2 bg-stone-400/30 rounded-full group-hover:animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-1 h-1 bg-stone-300/40 rounded-full group-hover:animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '500ms' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}