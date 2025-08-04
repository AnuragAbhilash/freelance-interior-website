'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FlatRearrangement() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      title: "Furniture Optimization",
      description: "Strategic repositioning of your existing furniture for better flow and functionality",
      image: "/FRR.jpeg",
      features: ["Traffic Flow", "Space Utilization", "Focal Points", "Conversation Areas"]
    },
    {
      title: "Storage Solutions",
      description: "Creative ways to organize and maximize your existing storage spaces",
      image: "/FRR1.avif",
      features: ["Closet Organization", "Multi-purpose Furniture", "Vertical Space", "Decluttering"]
    },
    {
      title: "Lighting Enhancement",
      description: "Improving ambiance through better lighting placement and fixtures",
      image: "/FRR2.jpeg",
      features: ["Task Lighting", "Ambient Lighting", "Fixture Placement", "Natural Light"]
    },
    {
      title: "Decor Refresh",
      description: "Reimagining your existing decor items for a fresh new look",
      image: "/FRR3.jpg",
      features: ["Art Placement", "Textile Rearrangement", "Accessory Styling", "Color Balancing"]
    }
  ];

  const process = [
    {
      icon: "ri-home-line",
      title: "Assessment",
      description: "We evaluate your current layout and identify improvement opportunities"
    },
    {
      icon: "ri-ruler-line",
      title: "Space Analysis",
      description: "Detailed measurement and assessment of your existing furniture"
    },
    {
      icon: "ri-lightbulb-line",
      title: "Solution Design",
      description: "Creating new layout options using your current furnishings"
    },
    {
      icon: "ri-check-line",
      title: "Implementation",
      description: "Guiding you through the rearrangement process step-by-step"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-50 w-8 h-8 bg-stone-400/30 rounded-full backdrop-blur-sm transition-all duration-300"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: hoveredElement ? 'scale(3)' : 'scale(1)',
          opacity: hoveredElement ? 0.8 : 0.4
        }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/FRR BG.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-8">
          <h1 className="text-6xl font-playfair mb-8 animate-slideUp">
            Flat Rearrangement
          </h1>
          <p className="text-3xl font-great-vibes mb-8 animate-fadeInUp opacity-90">
            Refreshing your space without renovation
          </p>
          <div className="w-24 h-1 bg-white mx-auto animate-slideUp" />
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-stone-500 font-light tracking-[0.3em] text-sm uppercase">Our Services</span>
            <h2 className="text-5xl font-playfair text-stone-800 mt-6 mb-8">
              Smart Space Transformation
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-xl leading-relaxed font-light">
              We help you rediscover your space by creatively rearranging what you already own for better functionality and aesthetics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-4 border border-stone-200/50"
                onMouseEnter={() => setHoveredElement(`service-${index}`)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-stone-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-playfair text-stone-800 mb-4 group-hover:text-stone-900 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-stone-600 leading-relaxed mb-6 group-hover:text-stone-700 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-colors duration-300" />
                        <span className="text-sm text-stone-500 group-hover:text-stone-700 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gradient-to-br from-stone-100 to-stone-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-stone-500 font-light tracking-[0.3em] text-sm uppercase">Our Approach</span>
            <h2 className="text-5xl font-playfair text-stone-800 mt-6 mb-8">
              Simple Rearrangement Process
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-xl leading-relaxed font-light">
              Our methodical approach ensures your space gets transformed with minimal disruption.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer border border-stone-200/30"
                onMouseEnter={() => setHoveredElement(`process-${index}`)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-500">
                  <i className={`${step.icon} text-amber-600 text-3xl`}></i>
                </div>
                
                <h3 className="text-xl font-playfair text-stone-800 mb-4 group-hover:text-stone-900 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-playfair text-stone-800 mb-12">
            Why Rearrange Instead of Renovate?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            <div className="group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-500">
                <i className="ri-money-dollar-circle-line text-amber-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-playfair text-stone-800 mb-4">Cost-Effective</h3>
              <p className="text-stone-600">Achieve dramatic changes without expensive renovations</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-500">
                <i className="ri-time-line text-amber-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-playfair text-stone-800 mb-4">Quick Results</h3>
              <p className="text-stone-600">See immediate improvements in just one day</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-500">
                <i className="ri-leaf-line text-amber-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-playfair text-stone-800 mb-4">Sustainable</h3>
              <p className="text-stone-600">Make the most of what you already own</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-playfair mb-8">
            Ready to Rediscover Your Space?
          </h2>
          <p className="text-xl font-light mb-12 opacity-90">
            Let's transform your flat without buying new furniture
          </p>
          <Link 
            href="/contact"
            className="group relative inline-block bg-white text-stone-800 px-12 py-5 rounded-full font-light tracking-wide hover:bg-stone-100 transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <span className="relative z-10">Schedule Rearrangement Consultation</span>
            <div className="absolute inset-0 bg-stone-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
          </Link>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slideUp {
          animation: slideUp 1.2s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}