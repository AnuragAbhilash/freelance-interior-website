
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Enhanced Services Page with Responsive Design and Scroll Animations
export default function Services() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Services data
  const services = [
    {
      id: 1,
      title: "New Flat Design",
      slug: "new-flat-design",
      description: "Design your new flat from scratch with personalized layouts, modern aesthetics, and functional spaces that perfectly match your lifestyle and preferences.",
      image: "NFD.jpeg",
      features: ["Complete Layout", "Custom Furniture", "Color Schemes", "Modern Finishes"],
      icon: "ri-home-heart-line",
      color: "from-amber-100 to-amber-200"
    },
    {
      id: 2,
      title: "Flat Renovation",
      slug: "flat-renovation",
      description: "Transform your existing flat with comprehensive renovation services including space optimization, modern upgrades, and stylish makeovers.",
      image: "FR.jpeg",
      features: ["Full Renovation", "Space Upgrade", "Modern Elements", "Quality Materials"],
      icon: "ri-building-2-line",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 3,
      title: "Flat Rearrangement",
      slug: "flat-rearrangement",
      description: "Rearrange your existing flat to maximize space efficiency and improve functionality without major construction or structural changes.",
      image: "F Rearrangement.jpeg",
      features: ["Space Optimization", "Furniture Repositioning", "Flow Improvement", "Storage Solutions"],
      icon: "ri-hotel-line",
      color: "from-purple-100 to-purple-200"
    },
    {
      id: 4,
      title: "Commercial Space Setup",
      slug: "commercial-space-setup",
      description: "Set up your office or retail space with professional design that enhances productivity, reflects your brand, and creates the perfect business environment.",
      image: "CSS.webp",
      features: ["Office Planning", "Brand Integration", "Productivity Focus", "Professional Appeal"],
      icon: "ri-lightbulb-line",
      color: "from-green-100 to-green-200"
    },
    {
      id: 5,
      title: "Builder Partnerships",
      slug: "builder-partnerships",
      description: "Collaborate with builders to offer comprehensive design packages for new flats, providing end-to-end interior solutions for homebuyers.",
      image: "BP.jpeg",
      features: ["Builder Collaboration", "Package Deals", "Bulk Projects", "Streamlined Process"],
      icon: "ri-ruler-2-line",
      color: "from-rose-100 to-rose-200"
    },
    {
      id: 6,
      title: "Housing Society Services",
      slug: "housing-society-services",
      description: "Partner with housing societies to offer affordable yet bespoke interior design services to flat owners with competitive group pricing.",
      image: "HSS.jpg",
      features: ["Society Partnerships", "Group Discounts", "Affordable Design", "Community Focus"],
      icon: "ri-leaf-line",
      color: "from-emerald-100 to-emerald-200"
    }
  ];


  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your vision, needs, and lifestyle through detailed consultation and site analysis.",
      icon: "ri-search-line"
    },
    {
      step: "02",
      title: "Concept",
      description: "Developing creative solutions that align with your goals and translate your vision into actionable plans.",
      icon: "ri-lightbulb-line"
    },
    {
      step: "03",
      title: "Design",
      description: "Creating detailed designs, selecting materials, and coordinating all elements for a cohesive result.",
      icon: "ri-palette-line"
    },
    {
      step: "04",
      title: "Execution",
      description: "Managing the implementation process with skilled craftsmen and suppliers to bring your vision to life.",
      icon: "ri-tools-line"
    }
  ];

  // Enhanced scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card, .process-card');

            cards.forEach((card, index) => {
              const isEven = index % 2 === 0;
              const direction = isEven ? 'translateX(-120px)' : 'translateX(120px)';

              // Initial state - cards appear to "fall" from alternating sides
              (card as HTMLElement).style.transform = `${direction} translateY(-80px) scale(0.8) rotate(${isEven ? '-' : ''}5deg)`;
              (card as HTMLElement).style.opacity = '0';
              (card as HTMLElement).style.filter = 'blur(8px)';

              // Animate with rhythmic timing
              setTimeout(() => {
                (card as HTMLElement).style.transform = 'translateX(0) translateY(0) scale(1) rotate(0deg)';
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.filter = 'blur(0px)';
                (card as HTMLElement).style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
              }, index * 200);
            });
          }
        });
      },
      observerOptions
    );

    if (servicesRef.current) observer.observe(servicesRef.current);
    if (processRef.current) observer.observe(processRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Enhanced custom cursor */}
      <div
        className="fixed pointer-events-none z-50 w-8 h-8 bg-stone-400/30 rounded-full backdrop-blur-sm transition-all duration-300"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: hoveredService ? 'scale(3)' : 'scale(1)',
          opacity: hoveredService ? 0.8 : 0.4
        }}
      />

      {/* Responsive hero section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('BG Services.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />

        <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-playfair mb-6 md:mb-8 animate-slideUp">
            Our Services
          </h1>
          <p className="text-2xl sm:text-3xl font-great-vibes mb-6 md:mb-8 animate-fadeInUp opacity-90">
            Bespoke design at affordable prices.
          </p>
          <div className="w-16 sm:w-24 h-1 bg-white mx-auto animate-slideUp" />
        </div>
      </section>

      {/* Enhanced services grid with reduced card size */}
      <section ref={servicesRef} className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">What We Do</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-stone-800 mt-4 md:mt-6 mb-6 md:mb-8">
              Our Expertise
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed font-light px-4">
              From intimate residential spaces to grand commercial environments, we bring vision to life through thoughtful design and meticulous attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="service-card group block"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 cursor-pointer transform hover:-translate-y-3 border border-stone-200/50 h-auto">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Service icon */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                      <i className={`${service.icon} text-white text-lg sm:text-xl`}></i>
                    </div>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 bg-stone-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-playfair text-stone-800 mb-2 sm:mb-3 group-hover:text-stone-900 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-stone-600 leading-relaxed mb-3 sm:mb-4 group-hover:text-stone-700 transition-colors duration-300 text-sm sm:text-base line-clamp-2">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-stone-400 rounded-full group-hover:bg-stone-600 transition-colors duration-300" />
                          <span className="text-xs sm:text-sm text-stone-500 group-hover:text-stone-700 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-light group-hover:text-stone-700 transition-colors duration-300 text-sm">
                        Learn More
                      </span>
                      <div className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-200 group-hover:scale-110 transition-all duration-300">
                        <i className="ri-arrow-right-line text-stone-600 text-sm"></i>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-stone-400 to-stone-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced process section with meaningful colors */}
      <section ref={processRef} className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-stone-100 to-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">Our Process</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-stone-800 mt-4 md:mt-6 mb-6 md:mb-8">
              How We Work
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed font-light px-4">
              Our proven process ensures every project flows smoothly from initial concept to beautiful completion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[{
              step: "01",
              title: "Discovery",
              description: "Understanding your vision, needs, and lifestyle through detailed consultation and site analysis.",
              icon: "ri-search-line",
              color: "from-yellow-400 to-orange-500", // Vibrant
              bgColor: "bg-yellow-100"
            },
            {
              step: "02",
              title: "Concept",
              description: "Developing creative solutions that align with your goals and translate your vision into actionable plans.",
              icon: "ri-lightbulb-line",
              color: "from-green-400 to-emerald-500", // Collaborative
              bgColor: "bg-green-100"
            },
            {
              step: "03",
              title: "Design",
              description: "Creating detailed designs, selecting materials, and coordinating all elements for a cohesive result.",
              icon: "ri-palette-line",
              color: "from-orange-400 to-red-500", // Creative
              bgColor: "bg-orange-100"
            },
            {
              step: "04",
              title: "Execution",
              description: "Managing the implementation process with skilled craftsmen and suppliers to bring your vision to life.",
              icon: "ri-tools-line",
              color: "from-blue-400 to-indigo-500", // Trustful
              bgColor: "bg-blue-100"
            }
            ].map((step, index) => (
              <div
                key={index}
                className="process-card group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-700 cursor-pointer text-center border border-stone-200/30"
                onMouseEnter={() => setHoveredService(index + 100)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-all duration-500`}>
                    <i className={`${step.icon} text-xl sm:text-2xl`} style={{ color: step.color.includes('yellow') ? '#f59e0b' : step.color.includes('green') ? '#10b981' : step.color.includes('orange') ? '#f97316' : '#3b82f6' }}></i>
                  </div>

                  <div className="text-3xl sm:text-4xl md:text-5xl font-playfair text-stone-300 mb-3 md:mb-4 group-hover:text-stone-400 transition-colors duration-300">
                    {step.step}
                  </div>

                  <h3 className="text-lg sm:text-xl font-playfair text-stone-800 mb-3 md:mb-4 group-hover:text-stone-900 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-300 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>

                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${step.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive call to action */}
      <section className="py-16 md:py-24 lg:py-32 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair mb-6 md:mb-8">
            Ready to Begin?
          </h2>
          <p className="text-lg sm:text-xl font-light mb-8 md:mb-12 opacity-90">
            Let's discuss your vision and create something extraordinary together
          </p>
          <Link
            href="/contact"
            className="group relative inline-block bg-white text-stone-800 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-light tracking-wide hover:bg-stone-100 transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <span className="relative z-10 text-sm sm:text-base">Start Your Project</span>
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
