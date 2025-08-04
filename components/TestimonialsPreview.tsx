
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Enhanced Testimonials Preview Component with More Interactive Cards
export default function TestimonialsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Expanded testimonials with more diverse content
  const testimonials = [
  {
    id: 1,
    name: "Sumit",
    role: "Software Architect",
    location: "Bangalore, India",
    content:
      "Saurabh brings a rare blend of structured thinking and aesthetic sensitivity. He understood our desire to integrate traditional Mithila motifs into a modern duplex and delivered a space that’s minimal yet rich in heritage. His ability to turn abstract thoughts into grounded, beautiful realities is inspiring.",
    image:
      "logo Man.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Puja",
    role: "Cultural Researcher",
    location: "Mumbai, India",
    content:
      "What stood out to me was how deeply Saurabh engaged with cultural roots. From Bengal’s terracotta patterns to subtle references to Vedic geometry, he infused each element with purpose and soul. It’s not just design — it’s a narrative woven with heritage and mindfulness.",
    image:
      "logo Women.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Ravi",
    role: "Entrepreneur",
    location: "Mumbai, India",
    content:
      "Saurabh’s design philosophy goes beyond surface-level beauty. He combined recycled teak wood with brass elements inspired by old Bihari havelis — creating a space that feels luxurious yet grounded. His work mirrors the balance of innovation and rootedness, and that’s rare.",
    image:
      "logo Man.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Neha",
    role: "Visual Artist",
    location: "Bangalore, India",
    content:
      "What captivated me was the poetic subtlety in Saurabh’s work — earthy textures, shadow play, and that quiet nod to Madhubani without being literal. He understands space as emotion. My studio feels like an extension of my creative process, thanks to his vision.",
    image:
      "logo Women.png",
    rating: 5,
  },
];

  // Enhanced scroll-triggered animation setup
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
            const testimonialCards = entry.target.querySelectorAll('.testimonial-card');
            
            // More dramatic staggered animation
            testimonialCards.forEach((card, index) => {
              const isEven = index % 2 === 0;
              const direction = isEven ? 'translateX(-100px)' : 'translateX(100px)';
              
              // Initial state
              (card as HTMLElement).style.transform = `${direction} translateY(80px) scale(0.8) rotate(${isEven ? '-' : ''}8deg)`;
              (card as HTMLElement).style.opacity = '0';
              (card as HTMLElement).style.filter = 'blur(10px)';
              
              // Animate in with enhanced timing
              setTimeout(() => {
                (card as HTMLElement).style.transform = 'translateX(0) translateY(0) scale(1) rotate(0deg)';
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.filter = 'blur(0px)';
                (card as HTMLElement).style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
              }, index * 300);
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

  // Auto-rotation for featured testimonial
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isClient, testimonials.length]);

  const handleTestimonialChange = (index: number) => {
    setCurrentTestimonial(index);
  };

  if (!isClient) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-stone-800">
              What They Say
            </h2>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl max-w-5xl mx-auto animate-pulse">
            <div className="h-32 bg-stone-200 rounded-lg mb-8" />
            <div className="h-20 bg-stone-200 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200/30 relative overflow-hidden"
    >
      {/* Responsive textured background */}
      <div className="absolute inset-0 opacity-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Subtle%20organic%20paper%20texture%20background%2C%20warm%20neutral%20tones%2C%20natural%20paper%20surface%2C%20elegant%20minimalist%20texture%2C%20soft%20organic%20material%2C%20sophisticated%20background%20texture&width=1920&height=1080&seq=paper-testimonials&orientation=landscape')`
          }}
        />
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-stone-200/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-40 right-4 sm:right-20 w-32 h-32 sm:w-48 sm:h-48 bg-stone-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 right-8 sm:right-40 w-16 h-16 sm:w-20 sm:h-20 bg-stone-400/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Responsive header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">Client Stories</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-stone-800 mt-4 md:mt-6 mb-6 md:mb-8">
            What They Say
          </h2>
          <p className="text-stone-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed font-light px-4">
            The greatest reward is seeing how transformed spaces enhance the lives of those who inhabit them.
          </p>
        </div>

        {/* Enhanced featured testimonial - responsive floating quote card */}
        <div className="mb-16 md:mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl max-w-5xl mx-auto relative border border-stone-200/30">
            
            {/* Responsive quote icon */}
            <div className="absolute -top-6 sm:-top-8 left-8 sm:left-12 w-12 h-12 sm:w-16 sm:h-16 bg-stone-100 rounded-full flex items-center justify-center shadow-lg">
              <i className="ri-double-quotes-l text-2xl sm:text-3xl text-stone-600"></i>
            </div>
            
            {/* Responsive decorative elements */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-stone-200/50 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 border-2 border-stone-300/30 rounded-full animate-pulse" />
            
            <div className="text-center">
              <div className="mb-8 md:mb-10">
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-stone-700 leading-relaxed mb-6 md:mb-8 font-great-vibes italic px-4">
                  "{testimonials[currentTestimonial]?.content || ''}"
                </p>
                
                {/* Responsive rating stars */}
                <div className="flex justify-center space-x-1 mb-4 md:mb-6">
                  {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400 text-lg sm:text-xl"></i>
                  ))}
                </div>
              </div>
              
              {/* Responsive client info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  <img 
                    src={testimonials[currentTestimonial]?.image || ''}
                    alt={testimonials[currentTestimonial]?.name || ''}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-xl border-4 border-white"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-stone-200/20 to-stone-400/20 animate-pulse" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-playfair text-xl sm:text-2xl text-stone-800 mb-1">
                    {testimonials[currentTestimonial]?.name || ''}
                  </h4>
                  <p className="text-stone-600 text-sm font-light">
                    {testimonials[currentTestimonial]?.role || ''}
                  </p>
                  <p className="text-stone-500 text-xs font-light tracking-wider">
                    {testimonials[currentTestimonial]?.location || ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Responsive navigation dots */}
          <div className="flex justify-center mt-8 md:mt-10 space-x-2 sm:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentTestimonial 
                    ? 'bg-stone-600 scale-125 shadow-lg' 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced testimonial grid with more animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card group"
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer border border-stone-200/30 relative overflow-hidden transform hover:-translate-y-4 hover:scale-105">
                
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 to-stone-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute top-4 right-4 w-2 h-2 bg-stone-400/30 rounded-full transition-all duration-1000 ${hoveredCard === testimonial.id ? 'opacity-100 animate-bounce' : 'opacity-0'}`} />
                  <div className={`absolute bottom-6 left-6 w-1 h-1 bg-stone-300/40 rounded-full transition-all duration-1000 ${hoveredCard === testimonial.id ? 'opacity-100 animate-pulse' : 'opacity-0'}`} style={{ animationDelay: '500ms' }} />
                </div>
                
                <div className="relative z-10">
                  {/* Enhanced client info */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="relative">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-stone-200/20 to-stone-400/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-base sm:text-lg text-stone-800 group-hover:text-stone-900 transition-colors duration-300">{testimonial.name}</h4>
                      <p className="text-stone-600 text-sm font-light">{testimonial.role}</p>
                      <p className="text-stone-500 text-xs font-light">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  {/* Enhanced rating stars */}
                  <div className="flex space-x-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }}></i>
                    ))}
                  </div>
                  
                  {/* Enhanced testimonial text */}
                  <p className="text-stone-600 text-sm leading-relaxed font-light group-hover:text-stone-700 transition-colors duration-300">
                    "{testimonial.content.substring(0, 120)}..."
                  </p>
                </div>
                
                {/* Enhanced bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-stone-400 to-stone-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                {/* Ripple effect */}
                <div className={`absolute inset-0 bg-stone-200/20 rounded-full scale-0 transition-all duration-700 ${hoveredCard === testimonial.id ? 'scale-150 opacity-100' : 'opacity-0'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Responsive CTA section */}
        <div className="text-center mt-16 md:mt-20">
          <Link 
            href="/testimonials"
            className="group relative bg-stone-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-light tracking-wide hover:bg-stone-700 transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <span className="relative z-10 text-sm sm:text-base">Read More Stories</span>
            <div className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
          </Link>
        </div>
      </div>
    </section>
  );
}
