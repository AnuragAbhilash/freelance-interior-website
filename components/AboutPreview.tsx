
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Enhanced About Preview Component with Responsive Design
export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll-triggered animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate image from right with scale and blur
            if (imageRef.current) {
              imageRef.current.style.transform = 'translateX(0) scale(1)';
              imageRef.current.style.opacity = '1';
              imageRef.current.style.filter = 'blur(0px)';
              imageRef.current.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
            
            // Animate text from left with delay
            if (textRef.current) {
              setTimeout(() => {
                textRef.current!.style.transform = 'translateY(0)';
                textRef.current!.style.opacity = '1';
                textRef.current!.style.filter = 'blur(0px)';
                textRef.current!.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              }, 300);
            }
          }
        });
      },
      observerOptions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200/50 relative overflow-hidden"
    >
      {/* Responsive textured background */}
      <div className="absolute inset-0 opacity-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('BG About.jpg')`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            animation: 'slowMotion 30s ease-in-out infinite'
          }}
        />
      </div>

      {/* Animated motion overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110"
          style={{
            backgroundImage: `url('BG1.jpg')`,
            animation: 'slowMotion 30s ease-in-out infinite'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          
          {/* Image section with enhanced animations */}
          <div 
            ref={imageRef}
            className="relative transform translate-x-16 opacity-0 order-2 lg:order-1"
            style={{ filter: 'blur(8px)' }}
          >
            <div className="relative group">
              {/* Floating background elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-stone-300/20 to-stone-500/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-700 blur-sm" />
              <div className="absolute -inset-2 bg-gradient-to-l from-stone-400/10 to-stone-600/10 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-700 blur-sm" />
              
              {/* Responsive main portrait */}
              <div className="relative overflow-hidden rounded-2xl">
                

                <Image 
                  src="/Hero.jpg"
                  alt="Portrait of Saurabh Jha, blending interior design and technology"
                  width={800}
                  height={600}
                  className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-1000 object-top"
                  loading="lazy"
                  priority={false}
                />
              </div>
              
              {/* Responsive floating design element */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 cursor-pointer border border-stone-200/50">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-stone-100 to-stone-200 rounded-full flex items-center justify-center">
                    <i className="ri-palette-line text-stone-600 text-xl sm:text-2xl"></i>
                  </div>
                  <div>
                    <p className="font-playfair text-stone-800 text-lg sm:text-xl">Design Philosophy</p>
                    <p className="text-stone-600 text-sm font-great-vibes italic">Perfectly Imperfect</p>
                  </div>
                </div>
              </div>
              
              {/* Responsive decorative elements */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 border-2 border-stone-300/50 rounded-full animate-pulse" />
              <div className="absolute top-8 -right-2 sm:top-10 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-stone-200/50 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
            </div>
          </div>

          {/* Text section with enhanced responsive design */}
          <div 
            ref={textRef}
            className="transform translate-y-12 opacity-0 order-1 lg:order-2"
            style={{ filter: 'blur(5px)' }}
          >
            <div className="mb-8 md:mb-10">
              <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">About Me</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-stone-800 mt-4 md:mt-6 mb-6 md:mb-8 leading-tight">
                Creating Spaces That 
                <span className="block text-stone-600 font-great-vibes text-3xl sm:text-4xl md:text-5xl italic mt-2">Tell Your Story</span>
              </h2>
            </div>

            {/* Responsive text content */}
            <div className="space-y-6 md:space-y-8 text-stone-600 leading-relaxed">
              <p className="text-lg sm:text-xl font-light">
                <b>
                  I am a software professional with over 15 years of experience, 
                  originally from Bihar and now based in Bangalore. My journey from crafting digital
                  solutions in the tech world to designing soulful interiors has been driven by a lifelong passion for arts,
                  crafts, and cultural aesthetics.
                </b>
              </p>
              
              <p className="text-base sm:text-lg">
                At Saurabh Jha Designs, I bring together the precision of technology and the elegance of
                heritage. By integrating artificial intelligence and smart design systems, I create 
                personalized, efficient spaces that echo both global sensibilities and local charm.
              </p>
              
              <p className="text-base sm:text-lg">
                My design approach embraces the richness of Eastern Indian art forms — from the intricate brushwork of Madhubani painting, the spiritual symmetry of Vastu Shastra, to textile and motif inspirations from Bengal’s kantha embroidery, Odisha’s Pattachitra, Assam’s bamboo and cane work, and the earthy tones of Eastern UP’s terracotta elements.
              </p>

              <p className="text-base sm:text-lg">
                I believe design is not just decoration — it&apos;s storytelling. Each space we create together celebrates roots, reinvents tradition, and uses modern tools to deliver timeless beauty. This is where technology meets art to create the perfect design.
              </p>
            </div>

            {/* Responsive CTA section */}
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Link 
                href="/about"
                className="group relative bg-stone-800 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-light tracking-wide hover:bg-stone-700 transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <span className="relative z-10 text-sm sm:text-base">Tech to Tradition</span>
                <div className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              </Link>
              
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="w-px h-10 sm:h-12 bg-stone-300" />
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-stone-500 font-light tracking-wider">IT Experience</p>
                  <p className="text-2xl sm:text-3xl font-playfair text-stone-800 mt-1">15+</p>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          <p className="text-center italic text-stone-500 mt-12 text-base sm:text-lg max-w-3xl mx-auto font-bold">
            “Saurabh’s vision blends cultural soul with digital intelligence — a rare design voice.” – <span className="underline">Sumit Kumar</span>
          </p>
      </div>
      
      <style jsx>{`
        @keyframes slowMotion {
          0%, 100% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(0.5deg); }
        }
      `}</style>
    </section>
  );
}
