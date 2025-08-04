'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [showingBlog, setShowingBlog] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowingBlog(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Inspire', href: '/design-inspiration' },
    { label: 'Services', href: '/services' },
    { label: showingBlog ? 'Blog' : 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' }
  ];

  const services = [
    { label: 'New Flat Design', href: '/services/new-flat-design' },
    { label: 'Flat Rearrangement', href: '/services/flat-rearrangement' },
    { label: 'Flat Renovation', href: '/services/flat-renovation' },
    { label: 'Commercial Space Setup', href: '/services/commercial-space-setup' },
    { label: 'Builder Partnership', href: '/services/builder-partnership' },
    { label: 'Housing Society Services', href: '/services/housing-society-services' }
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/saurabh_jha_designs/',
      icon: 'ri-instagram-line',
      color: 'from-pink-500 to-purple-600',
      username: 'saurabh_jha_designs'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/kumar-saurabh-design',
      icon: 'ri-linkedin-line',
      color: 'from-blue-500 to-blue-700',
      username: 'Kumar Saurabh Design'
    },
    { 
      name: 'Facebook', 
      href: 'https://www.facebook.com/profile.php?id=61578668492659',
      icon: 'ri-facebook-line',
      color: 'from-blue-600 to-blue-800',
      username: 'Saurabh Jha Designs'
    },
    { 
      name: 'Pinterest', 
      href: 'https://in.pinterest.com/saurabhjhadesigns/',
      icon: 'ri-pinterest-line',
      color: 'from-red-500 to-red-700',
      username: 'Saurabh Jha'
    },
    { 
      name: 'Behance', 
      href: 'https://www.behance.net/saurabhjhadesigns',
      icon: 'ri-behance-line',
      color: 'from-blue-400 to-blue-600',
      username: 'Saurabh Jha Designs'
    }
  ];

  return (
    <footer className="bg-stone-900 text-white relative overflow-hidden">
      {/* Background texture - responsive scaling */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('BG Footer.jpg')`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            animation: 'slowMotion 30s ease-in-out infinite'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content - responsive grid */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section - full width on mobile, spans 2 cols on desktop */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="-ml-2 sm:-ml-4">
                  <Image
                    height={50}
                    width={150}
                    className="h-10 sm:h-12 md:h-16 object-contain -ml-4 sm:-ml-8"
                    src="/logo.png"
                    alt="Saurabh Jha Design logo - Interior Designer"
                    priority
                  />
                </div>
                <p className="text-stone-300 leading-relaxed text-xs sm:text-sm md:text-base max-w-md">
                  Creating spaces that breathe with personality through the perfectly imperfect philosophy. 
                  Each design tells a unique story of transformation and authentic beauty.
                </p>
              </div>
              
              {/* Social Media Links - responsive spacing */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-playfair text-stone-200">Follow Our Journey</h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                        <i className={`${social.icon} text-white text-lg sm:text-xl`}></i>
                      </div>
                      
                      {/* Tooltip - hidden on touch devices */}
                      <div className={`hidden sm:block absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs whitespace-nowrap transition-all duration-300 ${
                        hoveredSocial === social.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}>
                        {social.username}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links - responsive text sizing */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-base sm:text-lg font-playfair text-stone-200">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-stone-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm group relative"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute inset-0 bg-stone-700/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -mx-1 sm:-mx-2 -my-0.5 sm:-my-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services - responsive text sizing */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-base sm:text-lg font-playfair text-stone-200">Services</h4>
              <ul className="space-y-2 sm:space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className="text-stone-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm group relative"
                    >
                      <span className="relative z-10">{service.label}</span>
                      <div className="absolute inset-0 bg-stone-700/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -mx-1 sm:-mx-2 -my-0.5 sm:-my-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar - stacked on mobile, row on desktop */}
        <div className="py-4 sm:py-6 md:py-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 text-stone-400 text-xs sm:text-sm">
              <p>&copy; 2024 Saurabh Jha Design. All rights reserved.</p>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <span className="text-stone-600">|</span>
                <Link href="/terms" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 text-stone-400 text-xs sm:text-sm">
              <i className="ri-heart-line text-red-400 text-sm sm:text-base"></i>
              <span>Crafted with passion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - responsive scaling */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-stone-800/30 rounded-full blur-xl sm:blur-3xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-stone-700/20 rounded-full blur-lg sm:blur-2xl" />
    </footer>
  );
}