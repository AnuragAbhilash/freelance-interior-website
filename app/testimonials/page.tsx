'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [pausedCard, setPausedCard] = useState<number | null>(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [expandedTestimonialIndex, setExpandedTestimonialIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sumit",
      role: "Software Architect",
      location: "Bangalore, India",
      projectType: "Modern Duplex with Traditional Motifs",
      content: "Saurabh brings a rare blend of structured thinking and aesthetic sensitivity. He understood our desire to integrate traditional Mithila motifs into a modern duplex and delivered a space that's minimal yet rich in heritage. His ability to turn abstract thoughts into grounded, beautiful realities is inspiring.",
      image: "logo Man.png",
      rating: 5,
    },
    {
      id: 2,
      name: "Puja",
      role: "Cultural Researcher",
      location: "Mumbai, India",
      projectType: "Culturally Rooted Apartment Design",
      content: "What stood out to me was how deeply Saurabh engaged with cultural roots. From Bengal's terracotta patterns to subtle references to Vedic geometry, he infused each element with purpose and soul. It's not just design — it's a narrative woven with heritage and mindfulness.",
      image: "logo Women.png",
      rating: 5,
    },
    {
      id: 3,
      name: "Ravi",
      role: "Entrepreneur",
      location: "Mumbai, India",
      projectType: "Luxury Apartment with Heritage Elements",
      content: "Saurabh's design philosophy goes beyond surface-level beauty. He combined recycled teak wood with brass elements inspired by old Bihari havelis — creating a space that feels luxurious yet grounded. His work mirrors the balance of innovation and rootedness, and that's rare.",
      image: "logo Man.png",
      rating: 5,
    },
    {
      id: 4,
      name: "Neha",
      role: "Visual Artist",
      location: "Bangalore, India",
      projectType: "Artist Studio with Madhubani Influence",
      content: "What captivated me was the poetic subtlety in Saurabh's work — earthy textures, shadow play, and that quiet nod to Madhubani without being literal. He understands space as emotion. My studio feels like an extension of my creative process, thanks to his vision.",
      image: "logo Women.png",
      rating: 5,
    },
  ];

  const blogPosts = [ 
    { 
      title: "Why I Use Vastu as a Design Framework", 
      date: "July 2025", 
      excerpt: "Design isn't just visual — it's energetic. Here's why I incorporate ancient Vastu principles into modern spaces to enhance flow, harmony, and purpose.", 
      fullContent: "Design isn't just visual — it's energetic. I've learned over years that architecture has the power to transform behavior, mental clarity, and even relationships. That's why I began diving deeper into Vastu, not as a rigid rulebook, but as a flow framework — one that emphasizes natural light, orientation, entry points, and energy dynamics. Clients often tell me their homes feel more peaceful — and that's not an accident. My goal is to use ancient principles subtly, artistically, and always in service of the person living in the space. When energy flows, so does creativity and comfort.", 
    },
    { 
      title: "How Technology is Revolutionizing Indian Interiors", 
      date: "June 2025", 
      excerpt: "From 3D mockups to smart lighting — I share how I blend my tech background with design to craft more intuitive and personalized living spaces.", 
      fullContent: "My tech roots taught me systems, precision, and user-first thinking — and I apply that to homes. I use 3D walkthroughs so clients can 'feel' their spaces before a single nail is hit. Smart tech like automated lighting, climate control, and IoT appliances are now part of my toolset. More than gimmicks, these technologies make design responsive. Imagine lights that mimic the sun's warmth or layouts optimized through VR feedback. This merger of form and function is the future of Indian interiors, and I'm excited to lead it.", 
    },
    { 
      title: "Affordable Design: Tips for Your Rented Flat", 
      date: "May 2025", 
      excerpt: "You don't need to own a home to make it beautiful. Explore practical, affordable ways to upgrade your rental with style, comfort, and identity.", 
      fullContent: "Rented flats don't have to feel temporary or bland. Start with layered lighting — lamps, warm LED strips, and natural daylight. Add texture through curtains, jute rugs, and plants. Use peel-and-stick wallpapers or MDF panels that are both renter-friendly and stylish. Art is your best friend — local prints, family photos, and handmade pieces bring identity. I've helped many clients transform cold, white rentals into soulful havens — on a budget. Design is never about price — it's about intention.", 
    } 
  ];

  const stats = [
    {
      number: "15+ Years",
      label: "Tech Industry Experience",
      description: "Blending structured thinking with artistic sensitivity"
    },
    {
      number: "10+ Concepts",
      label: "Design Mockups Delivered",
      description: "Crafted interiors inspired by Madhubani, terracotta & brass"
    },
    {
      number: "5 Cities",
      label: "Pan-India Cultural Research",
      description: "Design cues from Bihar, Bengal, Tamil Nadu, and beyond"
    },
    {
      number: "1 Passion",
      label: "Design with a Soul",
      description: "Driven by heritage, mindfulness, and modernity"
    }
  ];

  useEffect(() => {
    if (isDesktop && pausedCard === null) {
      const interval = setInterval(() => {
        setRotationAngle(prev => prev + (360 / testimonials.length));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isDesktop, pausedCard, testimonials.length]);

  const getCardPosition = (index: number) => {
    const angle = (rotationAngle + (index * 360 / testimonials.length)) * (Math.PI / 180);
    const radius = isDesktop ? (window.innerWidth >= 1280 ? 250 : 200) : 0;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  };

  const handleCardHover = (cardId: number) => {
    if (isDesktop) {
      setHoveredCard(cardId);
      setPausedCard(cardId);
    }
  };

  const handleCardLeave = () => {
    if (isDesktop) {
      setHoveredCard(null);
      setPausedCard(null);
    }
  };

  const toggleTestimonialExpansion = (index: number) => {
    if (!isDesktop) {
      setExpandedTestimonialIndex(expandedTestimonialIndex === index ? null : index);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Custom Cursor - Responsive */}
      <div 
        className="fixed pointer-events-none z-50 w-6 h-6 md:w-8 md:h-8 bg-stone-400/30 rounded-full backdrop-blur-sm transition-all duration-300"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: hoveredCard ? 'scale(2)' : 'scale(1)',
          opacity: hoveredCard ? 0.4 : 0.2
        }}
      />

      {/* Hero Section - Responsive */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('Bg Testimonial.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        
        <motion.div 
          className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Testimonials & Blog
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl font-great-vibes mb-6 md:mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Stories of transformation
          </motion.p>
          <motion.div 
            className="w-16 sm:w-24 h-1 bg-white mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>
      </section>

      {/* Testimonials Section - Responsive */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">Client Stories</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-stone-800 mt-4 sm:mt-6 mb-6 sm:mb-8">
              What They Say
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light">
              {isDesktop ? 
                "Experience the rotating testimonials - hover to pause and read more" : 
                "Tap on testimonials to read the full feedback"}
            </p>
          </motion.div>
          
          {/* Desktop - Rotating Testimonials */}
          {isDesktop && (
            <motion.div 
              className="relative h-[500px] xl:h-[600px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full h-full">
                {testimonials.map((testimonial, index) => {
                  const position = getCardPosition(index);
                  const isFrontCard = hoveredCard === testimonial.id;
                  const isVisibleCard = Math.abs(position.y) < 150;
                  
                  return (
                    <motion.div
                      key={testimonial.id}
                      className={`absolute w-64 md:w-72 lg:w-80 transition-all duration-1000 cursor-pointer ${
                        isFrontCard ? 'z-50 scale-125' : 
                        isVisibleCard ? 'z-10 scale-100' : 'z-0 scale-75 opacity-30'
                      }`}
                      style={{
                        left: `calc(50% + ${position.x}px)`,
                        top: `calc(50% + ${position.y}px)`,
                      }}
                      animate={{
                        transform: `translate(-50%, -50%) scale(${isFrontCard ? 1.2 : isVisibleCard ? 1 : 0.8}) rotate(${isFrontCard ? 0 : position.angle}deg)`
                      }}
                      transition={{ type: "spring", stiffness: 100 }}
                      onMouseEnter={() => handleCardHover(testimonial.id)}
                      onMouseLeave={handleCardLeave}
                    >
                      <motion.div 
                        className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-stone-200/30 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative z-10">
                          <motion.div 
                            className="flex items-center space-x-4 mb-4 lg:mb-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <motion.img 
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover shadow-md border-2 border-white"
                              whileHover={{ rotate: 5, scale: 1.1 }}
                            />
                            <div>
                              <h4 className="font-playfair text-base lg:text-lg text-stone-800">
                                {testimonial.name}
                              </h4>
                              <p className="text-stone-600 text-xs lg:text-sm">{testimonial.role}</p>
                            </div>
                          </motion.div>
                          
                          <motion.p 
                            className={`text-stone-600 leading-relaxed font-light text-sm lg:text-base ${
                              isFrontCard ? '' : 'line-clamp-3'
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            "{isFrontCard ? testimonial.content : testimonial.content.substring(0, 100) + '...'}"
                          </motion.p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Mobile/Tablet - Stacked Testimonials with Expandable Content */}
          {!isDesktop && (
            <motion.div 
              className="grid grid-cols-1 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-stone-200/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onClick={() => toggleTestimonialExpansion(index)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white"
                      whileHover={{ rotate: 5 }}
                    />
                    <div>
                      <h4 className="font-playfair text-base text-stone-800">{testimonial.name}</h4>
                      <p className="text-stone-600 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 'auto' }}
                    animate={{ 
                      height: expandedTestimonialIndex === index ? 'auto' : '4.5rem'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-stone-600 text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </motion.div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="inline-block bg-stone-100 px-2 py-1 rounded-full text-xs font-light text-stone-600">
                      {testimonial.projectType}
                    </span>
                    <button className="text-stone-500 text-xs">
                      {expandedTestimonialIndex === index ? 'Show less' : 'Read more'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Section - Responsive */}
      <section className="py-16 sm:py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">
              Insights & Ideas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-stone-800 mt-4 sm:mt-6 mb-6 sm:mb-8">
              Latest Blog Posts
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light">
              Explore my thoughts on design, culture, and technology
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg p-6 md:p-8 overflow-hidden cursor-pointer transition-all duration-300 ${
                      expandedCardIndex === index ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                    onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative z-10">
                      <motion.h3 
                        className={`font-playfair text-stone-800 mb-3 ${
                          expandedCardIndex === index ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl'
                        }`}
                        layout="position"
                      >
                        {post.title}
                      </motion.h3>

                      <motion.p 
                        className="text-stone-500 text-xs sm:text-sm mb-4"
                        layout="position"
                      >
                        {post.date}
                      </motion.p>

                      <motion.p 
                        className={`text-stone-600 mb-4 ${
                          expandedCardIndex === index ? 
                            'text-base sm:text-lg leading-relaxed' : 
                            'text-sm sm:text-base line-clamp-3'
                        }`}
                        layout="position"
                      >
                        {expandedCardIndex === index ? post.fullContent : post.excerpt}
                      </motion.p>

                      <motion.button 
                        className="text-stone-700 text-sm sm:text-base font-medium hover:text-stone-900 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {expandedCardIndex === index ? 'Read Less' : 'Read More'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Responsive */}
      <section className="py-16 sm:py-24 md:py-32 bg-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-6 sm:mb-8">
              Trusted by Many
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-light opacity-90">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl hover:bg-stone-700/50 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-3xl sm:text-4xl md:text-5xl font-playfair italic font-extrabold text-white mb-2 sm:mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-stone-200 mb-1 sm:mb-2">
                  {stat.label}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}