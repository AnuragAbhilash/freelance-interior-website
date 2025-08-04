'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [showingBlog, setShowingBlog] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blog/Testimonials toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setShowingBlog(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu-container')) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Services data matching your pages
  const services = [
    { 
      title: 'New Flat Design', 
      description: 'Bespoke interiors for your new home',
      icon: 'ri-home-4-line',
      color: 'from-amber-400 to-orange-500',
      href: '/services/new-flat-design'
    },
    { 
      title: 'Flat Rearrangement', 
      description: 'Refreshing your space without renovation',
      icon: 'ri-restart-line',
      color: 'from-blue-400 to-indigo-500',
      href: '/services/flat-rearrangement'
    },
    { 
      title: 'Flat Renovation', 
      description: 'Transforming your space from tired to inspired',
      icon: 'ri-hammer-line',
      color: 'from-purple-400 to-pink-500',
      href: '/services/flat-renovation'
    },
    { 
      title: 'Commercial Space Setup', 
      description: 'Transforming spaces for business success',
      icon: 'ri-building-line',
      color: 'from-green-400 to-teal-500',
      href: '/services/commercial-space-setup'
    },
    { 
      title: 'Builder Partnership', 
      description: 'Elevating developments through design',
      icon: 'ri-handshake-line',
      color: 'from-red-400 to-pink-500',
      href: '/services/builder-partnerships'
    },
    { 
      title: 'Housing Society Services', 
      description: 'Enhancing community living through design',
      icon: 'ri-community-line',
      color: 'from-emerald-400 to-cyan-500',
      href: '/services/housing-society-services'
    }
  ];

  // Rotate service cards
  useEffect(() => {
    if (isServicesOpen) {
      const interval = setInterval(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % services.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isServicesOpen, services.length]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Inspire', href: '/design-inspiration' },
    { label: 'Services', href: '/services', hasServiceCard: true },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-stone-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo - Responsive sizing */}
          <Link 
            href="/"
            className={`group font-pacifico text-2xl sm:text-3xl transition-all duration-500 hover:scale-105 relative z-50 ${
              isScrolled ? 'text-stone-800' : 'text-white drop-shadow-lg'
            }`}
          >
            <span className="relative">
              <Image
                height={50}
                width={150}
                className="h-10 sm:h-12 md:h-14 object-contain -ml-6 sm:-ml-8"
                src="/logo.png"
                alt="Saurabh Jha Design logo - Interior Designer"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-800 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-2 bg-white/10 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.hasServiceCard ? (
                  <div className="relative">
                    <button
                      className={`group relative px-3 py-2 sm:px-4 sm:py-2 rounded-full font-light tracking-wide transition-all duration-500 hover:scale-105 ${
                        isScrolled 
                          ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-100' 
                          : 'text-white hover:text-stone-200 hover:bg-white/10'
                      }`}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      onClick={() => window.location.href = '/services'}
                    >
                      <span className="relative z-10">
                        {item.label === 'Testimonials' ? (showingBlog ? 'Blog' : 'Testimonials') : item.label}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-400/20 to-stone-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                    </button>

                    {/* Enhanced Service Card - Responsive sizing */}
                    <div 
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 sm:w-80 transition-all duration-700 ${
                        isServicesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
                      }`}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/20 p-4 sm:p-6 relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-r ${services[currentServiceIndex].color} opacity-10 rounded-2xl`} />
                        
                        <div className="relative z-10">
                          <Link href={services[currentServiceIndex].href} className="block">
                            <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${services[currentServiceIndex].color} flex items-center justify-center transform rotate-0 group-hover:rotate-12 transition-transform duration-500`}>
                                <i className={`${services[currentServiceIndex].icon} text-white text-lg sm:text-xl`}></i>
                              </div>
                              <div>
                                <h3 className="font-playfair text-base sm:text-lg text-stone-800">
                                  {services[currentServiceIndex].title}
                                </h3>
                                <p className="text-stone-600 text-xs sm:text-sm">
                                  {services[currentServiceIndex].description}
                                </p>
                              </div>
                            </div>
                          </Link>
                          
                          <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
                            {services.slice(0, 4).map((service, index) => (
                              <Link
                                key={index}
                                href={service.href}
                                className="text-stone-600 hover:text-stone-800 text-xs py-1 px-2 rounded-lg hover:bg-stone-100 transition-colors duration-300 truncate"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                          
                          <Link
                            href="/services"
                            className="block text-center bg-stone-800 text-white py-2 px-4 rounded-lg hover:bg-stone-700 transition-colors duration-300 text-xs sm:text-sm"
                          >
                            View All Services
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`group relative px-3 py-2 sm:px-4 sm:py-2 rounded-full font-light tracking-wide transition-all duration-500 hover:scale-105 ${
                      isScrolled 
                        ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-100' 
                        : 'text-white hover:text-stone-200 hover:bg-white/10'
                    }`}
                  >
                    <span className="relative z-10 inline-block w-[90px] sm:w-[110px] text-center transition-opacity duration-500 ease-in-out">
                      {item.label === 'Testimonials' ? (showingBlog ? 'Blog' : 'Testimonials') : item.label}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-400/20 to-stone-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button - Visible only on mobile */}
          <div className="lg:hidden mobile-menu-container">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-stone-700 hover:bg-stone-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <i className={`text-2xl transition-transform duration-300 ${
                isMobileMenuOpen ? 'ri-close-line rotate-180' : 'ri-menu-line'
              }`}></i>
            </button>

            {/* Mobile Menu - Enhanced for touch devices */}
            <div className={`absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/20 py-2 transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
            }`}>
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors duration-300 font-light"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="inline-block w-full text-left">
                      {item.label === 'Testimonials' ? (showingBlog ? 'Blog' : 'Testimonials') : item.label}
                    </span>
                  </Link>
                  
                  {item.hasServiceCard && (
                    <div className="pl-4 border-l border-stone-200/30 ml-4">
                      {services.map((service) => (
                        <Link
                          key={service.title}
                          href={service.href}
                          className="block px-4 py-2 text-stone-600 hover:text-stone-800 hover:bg-stone-50 transition-colors duration-300 text-sm font-light"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


