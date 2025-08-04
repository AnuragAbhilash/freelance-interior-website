'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const inspirations = [
  {
    id: 1,
    title: 'Madhubani Inspirations',
    image: '/madhubani.jpg',
    description: 'Vibrant traditional patterns blending ancient artistry with contemporary interiors.',
    href: '/design-inspiration?card=1',
    category: 'Traditional'
  },
  {
    id: 2,
    title: 'Kantha Textures',
    image: '/kantha.jpg',
    description: 'Hand-stitched textures that echo cultural warmth and tactile richness.',
    href: '/design-inspiration?card=2',
    category: 'Textiles'
  },
  {
    id: 3,
    title: 'Terracotta Warmth',
    image: '/Terracotta.jpg',
    description: 'Earthen hues and materials that ground modern spaces in natural tones.',
    href: '/design-inspiration?card=3',
    category: 'Materials'
  },
  {
    id: 4,
    title: 'Vastu Harmony',
    image: '/Vastu.jpg',
    description: 'Designs aligned with energy principles for balance, flow, and positivity.',
    href: '/design-inspiration?card=4',
    category: 'Philosophy'
  },
  {
    id: 5,
    title: 'Sustainable Touches',
    image: '/Eco-Friendly.jpg',
    description: 'Eco-conscious choices that merge aesthetic with environmental mindfulness.',
    href: '/design-inspiration?card=5',
    category: 'Sustainable'
  },
  {
    id: 6,
    title: 'AI-Powered Design Tools',
    image: '/AI.webp',
    description: 'Smart tools that empower creators to blend function, beauty, and innovation.',
    href: '/design-inspiration?card=6',
    category: 'Technology'
  },
  {
    id: 7,
    title: 'Jali Patterns',
    image: '/jali.webp',
    description: 'Intricate perforated screens for light, privacy, and traditional elegance.',
    href: '/design-inspiration?card=7',
    category: 'Architectural'
  },
  {
    id: 8,
    title: 'Warli Art',
    image: '/warli.jpeg',
    description: 'Tribal motifs and storytelling through minimal, geometric forms.',
    href: '/design-inspiration?card=8',
    category: 'Cultural'
  },
  {
    id: 9,
    title: 'Blue Pottery',
    image: '/Blue Pottery.jpeg',
    description: "Jaipur's iconic blue pottery for vibrant, artisanal accents.",
    href: '/design-inspiration?card=9',
    category: 'Crafts'
  },
  {
    id: 10,
    title: 'Bamboo Craft',
    image: '/Bamboo crafting.jpg',
    description: 'Sustainable, flexible, and earthy elements from North-East India.',
    href: '/design-inspiration?card=10',
    category: 'Natural'
  },
  {
    id: 11,
    title: 'Sheesham Woodwork',
    image: '/Wood work.avif',
    description: 'Rich, durable woodwork that brings warmth and tradition to modern interiors.',
    href: '/design-inspiration?card=11',
    category: 'Woodwork'
  },
  {
    id: 12,
    title: 'Jaali Lattice',
    image: '/Jaali.jpeg',
    description: 'Traditional Indian latticework for light play and privacy in contemporary spaces.',
    href: '/design-inspiration?card=12',
    category: 'Architectural'
  },
  {
    id: 13,
    title: 'Block Printing',
    image: '/Block Printing.jpeg',
    description: 'Hand-block printed textiles for a touch of artisanal heritage.',
    href: '/design-inspiration?card=13',
    category: 'Textiles'
  },
  {
    id: 14,
    title: 'Brass Accents',
    image: '/BrassAccents.webp',
    description: 'Elegant brass decor and fixtures inspired by Indian craftsmanship.',
    href: '/design-inspiration?card=14',
    category: 'Metalwork'
  },
];

export default function DesignInspirationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const inspirationCards = entry.target.querySelectorAll('.inspiration-card');
            
            inspirationCards.forEach((card, index) => {
              const isEven = index % 2 === 0;
              const direction = isEven ? 'translateX(-100px)' : 'translateX(100px)';
              
              (card as HTMLElement).style.transform = `${direction} translateY(50px) scale(0.8)`;
              (card as HTMLElement).style.opacity = '0';
              (card as HTMLElement).style.filter = 'brightness(0.8) contrast(0.8)';
              
              setTimeout(() => {
                (card as HTMLElement).style.transform = 'translateX(0) translateY(0) scale(1)';
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.filter = 'brightness(1) contrast(1)';
                (card as HTMLElement).style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              }, index * 150);
            });
          }
        });
      },
      observerOptions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isClient]);

  if (!isClient) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-stone-800">
              Signature Style Highlights
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-stone-200 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Subtle%20stone%20texture%20background%2C%20natural%20travertine%20stone%20surface%2C%20warm%20beige%20stone%20pattern%2C%20organic%20material%20texture%2C%20elegant%20stone%20background%2C%20soft%20natural%20lighting&width=1920&height=1080&seq=stone-inspiration&orientation=landscape')`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">Design Elements</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-stone-800 mt-4 md:mt-6 mb-6 md:mb-8">
            Signature Style Highlights
          </h2>
          <p className="text-stone-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed font-light px-4">
            Explore elements that define our design ethos—crafted for modern living with cultural depth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {inspirations.map((item) => (  
            <Link
              key={item.id}
              href={item.href}
              className="inspiration-card group relative cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
                <div className="absolute -inset-2 bg-gradient-to-r from-stone-200/20 to-stone-400/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-700 blur-sm" />
                
                <div className="relative">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={500}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover transform group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110 transition-transform duration-1000 object-center rounded-2xl"
                      loading="lazy"
                    />

                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-700 ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-70'
                    }`} />
                    
                    <div className={`absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-150 transition-all duration-1000 origin-center ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>
              
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                    <div className={`transform transition-all duration-700 ${
                      hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-90'
                    }`}>
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <span className="text-stone-300 text-xs sm:text-sm font-light tracking-[0.2em] uppercase">
                          {item.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-playfair mb-2 md:mb-3 leading-tight">{item.title}</h3>
                      
                      <p className={`text-stone-200 text-sm leading-relaxed transition-all duration-700 ${
                        hoveredItem === item.id ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-700 ${
                    hoveredItem === item.id ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-45'
                  }`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 md:mt-20">
          <Link 
            href="/design-inspiration"
            className="group relative inline-block border-2 border-stone-800 text-stone-800 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-light tracking-wide hover:bg-stone-800 hover:text-white transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <span className="relative z-10 text-sm sm:text-base">View All Design Inspirations</span>
            <div className="absolute inset-0 bg-stone-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-600/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
          </Link>
        </div>
      </div>
    </section>
  );
}