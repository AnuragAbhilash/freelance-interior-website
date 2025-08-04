'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@react-pdf/renderer';

export default function HousingSocietyServices() {
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
      title: "Common Area Design",
      description: "Creating welcoming and functional shared spaces for all residents",
      image: "/HSS1.jpg",
      features: ["Lobby Design", "Corridor Planning", "Landscaping", "Lighting Solutions"]
    },
    {
      title: "Facility Planning",
      description: "Strategic layout of amenities for optimal accessibility and usage",
      image: "/HSS.jpg",
      features: ["Gym Layout", "Swimming Pool Area", "Clubhouse Design", "Play Zones"]
    },
    {
      title: "Maintenance Solutions",
      description: "Durable designs that are easy to maintain for long-term appeal",
      image: "/HSS4.jpg",
      features: ["Material Selection", "Cleaning Access", "Wear Resistance", "Cost Efficiency"]
    },
    {
      title: "Security Integration",
      description: "Designing spaces with safety and surveillance in mind",
      image: "/HSS3.jpg",
      features: ["CCTV Placement", "Access Control", "Lighting for Safety", "Emergency Planning"]
    }
  ];

  const process = [
    {
      icon: "ri-community-line",
      title: "Needs Assessment",
      description: "Understanding the unique requirements of your housing society"
    },
    {
      icon: "ri-survey-line",
      title: "Space Evaluation",
      description: "Comprehensive analysis of all common areas and facilities"
    },
    {
      icon: "ri-layout-3-line",
      title: "Community Design",
      description: "Creating designs that serve all resident demographics"
    },
    {
      icon: "ri-home-gear-line",
      title: "Implementation",
      description: "Professional execution with minimal resident disruption"
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
            backgroundImage: `url('/HSS BG.webp')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-8">
          <h1 className="text-6xl font-playfair mb-8 animate-slideUp">
            Housing Society Services
          </h1>
          <p className="text-3xl font-great-vibes mb-8 animate-fadeInUp opacity-90">
            Enhancing community living through thoughtful design
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
              Comprehensive Community Solutions
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-xl leading-relaxed font-light">
              We specialize in creating harmonious living environments that cater to all residents while maintaining aesthetic appeal and functionality.
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
              Community-Centric Process
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-xl leading-relaxed font-light">
              Our collaborative approach ensures designs that meet the needs of all residents while maintaining the society's unique character.
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
            Advantages for Housing Societies
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            <div className="group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-500">
                <i className="ri-team-line text-amber-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-playfair text-stone-800 mb-4">Community Harmony</h3>
              <p className="text-stone-600">Spaces designed to foster interaction and inclusivity</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-500">
                <i className="ri-shield-check-line text-amber-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-playfair text-stone-800 mb-4">Long-Term Value</h3>
              <p className="text-stone-600">Durable designs that maintain property values</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-500">
                <i className="ri-money-dollar-circle-line text-amber-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-playfair text-stone-800 mb-4">Cost Efficiency</h3>
              <p className="text-stone-600">Smart solutions that optimize maintenance budgets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-playfair mb-8">
            Ready to Enhance Your Housing Society?
          </h2>
          <p className="text-xl font-light mb-12 opacity-90">
            Let's create spaces that bring your community together
          </p>
          <Link 
            href="/contact"
            className="group relative inline-block bg-white text-stone-800 px-12 py-5 rounded-full font-light tracking-wide hover:bg-stone-100 transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <span className="relative z-10">Request Society Consultation</span>
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