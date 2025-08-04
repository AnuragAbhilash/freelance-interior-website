
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const heroMedia = [
  { type: 'video', url: 'Video4.mp4' },
  { type: 'image', url: 'image1.jpg' },
  { type: 'video', url: 'Video1.mp4' },
  { type: 'image', url: 'image2.jpg' },
  { type: 'video', url: 'Video2.mp4' },
  { type: 'image', url: 'image3.jpg' },
  { type: 'video', url: 'Video3.mp4' },
  { type: 'image', url: 'image4.jpg' },
  { type: 'video', url: 'Video5.mp4' },
  { type: 'video', url: 'Video6.mp4' },
];


  const taglines = [
    "यत्र विज्ञानं तत्र सौंदर्यम्",
    "Where there is technology, there is beauty",
    "कला विज्ञानं च समन्वयः सृजनस्य मूलम्",
    "The fusion of art and science is the essence of creation",
    "दृष्टिः सौंदर्यस्य दर्पणम्",
    "Vision is the mirror of beauty",
    "सम्वादेन सृजामि सौंदर्यम्",
    "Creating beauty through dialogue",
    "वास्तुरचना एव मानव सुखस्य मूलम्",
    "Architecture is the foundation of human happiness",
    "सौंदर्यं विज्ञानस्य प्रकाशः",
    "Beauty is the light of science",
    "सृजनस्य मार्गे विज्ञानं सहायकम्",
    "Science is the companion on the path of creation",
    "सौंदर्यं विज्ञानस्य उपासना",
    "Beauty is the worship of science",
    "सृजनस्य विज्ञानं च सौंदर्यं च सह वर्धन्ते",
    "Creation, science, and beauty grow together",
    "सौंदर्यं विज्ञानस्य साक्षात्कारः",
    "Beauty is the realization of science",
    "विज्ञानस्य सौंदर्यं च सृजनस्य प्रेरणा",
    "The beauty of science is the inspiration for creation",
    "सृजनस्य विज्ञानं च सौंदर्यं च सह अस्ति",
    "Creation, science, and beauty coexist",
    "सौंदर्यं विज्ञानस्य च सृजनस्य च सह अस्ति",
    "Beauty, science, and creation are intertwined",
    "सृजनस्य विज्ञानं च सौंदर्यं च सह अस्ति",
    "Creation, science, and beauty are in harmony",
    "Designs that breathe personality",
    "Crafting comfort and elegance", 
    "Where technology meets soul",
    "Creating spaces that inspire living",
    "Perfectly imperfect, beautifully yours"
  ];

  const nextSlide = useCallback(() => {
  setIsTransitioning(true);
  setTimeout(() => {
    setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
    setIsTransitioning(false);
  }, 1000);
}, [heroMedia.length]);



  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const slideInterval = setInterval(nextSlide, 6000);
    const taglineInterval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3500);

    return () => {
      clearInterval(slideInterval);
      clearInterval(taglineInterval);
    };
  }, [isClient, nextSlide, taglines.length]);

  if (!isClient) {
    return (
      <section className="relative h-screen overflow-hidden bg-stone-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div className="relative z-20 h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-5xl">
            <h1 className="text-balance text-4xl md:text-6xl lg:text-7xl font-playfair mb-4 leading-tight max-w-[90%] mx-auto">
              Saurabh Jha Designs
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-6 tracking-wide">
              Where technology meets timeless design.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden bg-stone-900">
      {/* Image Carousel with Cinematic Effects */}
      <div className="absolute inset-0">
        {heroMedia.map((media, index) => (
      <div
       key={index}
       className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      {media.type === 'image' ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-15000 ease-out"
          style={{
            backgroundImage: `url('${media.url}')`,
            transform: index === currentSlide ? 'scale(1.15)' : 'scale(1.1)',
            filter: isTransitioning ? 'blur(2px)' : 'blur(0px)',
            animation: index === currentSlide ? 'kenBurns 15s ease-out infinite' : 'none',
          }}
        />
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={media.url}
            autoPlay
            muted
            loop
            playsInline
            style={{
            filter: isTransitioning ? 'blur(2px)' : 'blur(0px)',
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  ))}
</div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <div className="text-center text-white max-w-5xl">
          <div className="overflow-hidden mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair mb-4 transform translate-y-full animate-slideUp leading-tight">
              Saurabh Jha Designs
            </h1>
          </div>
          
          <div className="overflow-hidden mb-6">
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-6 transform translate-y-full animate-slideUp animation-delay-300 tracking-wide">
              Where technology meets timeless design.
            </p>
          </div>
          
          {/* Enhanced tagline with better contrast */}
          <div className="h-20 flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-black/40 blur-lg rounded-lg" />
                <p 
                  key={currentTagline}
                  className="relative text-xl md:text-2xl lg:text-3xl font-great-vibes animate-fadeInUp italic text-white drop-shadow-2xl px-6 py-2 bg-black/20 rounded-lg backdrop-blur-sm"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
             >
                  {taglines[currentTagline]}
                </p>

            </div>
          </div>
          
          <div className="transform translate-y-full animate-slideUp animation-delay-600 space-y-6">
            <Link 
              href="/contact"
              className="group relative bg-white/15 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-light tracking-wide hover:bg-white/25 transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden inline-block"
            >
              <span className="relative z-10 text-lg">Blend Art & Function</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>
      </div>

        

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="particle-1 absolute w-1 h-1 bg-white/20 rounded-full" style={{
          left: '20%',
          top: '30%',
          animation: 'floatParticle 8s ease-in-out infinite'
        }} />
        <div className="particle-2 absolute w-2 h-2 bg-white/10 rounded-full" style={{
          right: '15%',
          top: '60%',
          animation: 'floatParticle 12s ease-in-out infinite 2s'
        }} />
        <div className="particle-3 absolute w-1 h-1 bg-white/15 rounded-full" style={{
          left: '70%',
          bottom: '40%',
          animation: 'floatParticle 10s ease-in-out infinite 4s'
        }} />
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1.15) rotate(0deg); }
          50% { transform: scale(1.25) rotate(0.5deg); }
          100% { transform: scale(1.15) rotate(0deg); }
        }
        
        @keyframes slideUp {
          to { transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        .animate-slideUp {
          animation: slideUp 1.2s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
}
