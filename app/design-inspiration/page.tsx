'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Create a separate component for the search params logic
function InspireContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const cardId = searchParams.get('card');
  const [isMobile, setIsMobile] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    // Only run client-side code after initial mount
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      // Set initial mobile state
      checkIfMobile();

      // Add event listeners
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', checkIfMobile);
      
      // Handle card expansion from URL param
      if (cardId && !hasMounted.current) {
        const id = parseInt(cardId);
        if (!isNaN(id)) {
          setExpandedCard(id);
          // Scroll to the card after a short delay to allow rendering
          setTimeout(() => {
            const element = document.getElementById(`card-${id}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 500);
        }
      }

      hasMounted.current = true;

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', checkIfMobile);
      };
    }
  }, [cardId]);

  const categories = [
    { 
      id: 'all', 
      name: 'All Inspirations', 
      count: 14,
      hoverColor: 'hover:bg-stone-800 hover:text-white'
    },
    { 
      id: 'traditional', 
      name: 'Traditional', 
      count: 4,
      hoverColor: 'hover:bg-amber-600 hover:text-white'
    },
    { 
      id: 'materials', 
      name: 'Materials', 
      count: 3,
      hoverColor: 'hover:bg-blue-700 hover:text-white'
    },
    { 
      id: 'cultural', 
      name: 'Cultural', 
      count: 4,
      hoverColor: 'hover:bg-purple-600 hover:text-white'
    },
    { 
      id: 'sustainable', 
      name: 'Sustainable', 
      count: 3,
      hoverColor: 'hover:bg-green-600 hover:text-white'
    }
  ];

  const inspirations = [
    {
      id: 1,
      title: 'Madhubani Inspirations',
      image: '/madhubani.jpg',
      description: 'Vibrant traditional patterns blending ancient artistry with contemporary interiors.',
      category: 'traditional',
      fullContent: {
        introduction: 'Madhubani art, originating from the Mithila region of Bihar, represents one of India\'s most vibrant and expressive folk art traditions. This ancient art form, traditionally practiced by women, has found its way into contemporary interior design, bringing stories, mythology, and cultural heritage into modern living spaces.',
        history: 'Dating back over 2,500 years, Madhubani paintings were originally created on the walls of homes during festivals and special occasions. The art form uses natural pigments and depicts themes from Hindu mythology, nature, and daily life. Each motif carries deep symbolic meaning, from peacocks representing love to fish symbolizing fertility.',
        modernApplication: 'In contemporary interiors, Madhubani patterns can be incorporated through wall murals, textiles, ceramic tiles, and decorative panels. The bold geometric patterns and vibrant colors create stunning focal points while maintaining cultural authenticity. Consider using these patterns in accent walls, cushion covers, or as artistic installations.',
        designTips: [
          'Use Madhubani patterns as accent walls in living rooms or bedrooms',
          'Incorporate the traditional color palette of red, yellow, blue, and green',
          'Balance bold patterns with neutral furniture and decor',
          'Consider hand-painted furniture pieces featuring Madhubani motifs',
          'Use natural materials like jute and cotton to complement the earthy aesthetic'
        ],
        culturalSignificance: 'Each Madhubani design tells a story and carries cultural significance. The tree of life represents growth and prosperity, while the lotus symbolizes purity and divine beauty. By incorporating these elements, you\'re not just decorating but preserving and celebrating cultural heritage.'
      }
    },
    {
      id: 2,
      title: 'Kantha Textures',
      image: '/kantha.jpg',
      description: 'Hand-stitched textures that echo cultural warmth and tactile richness.',
      category: 'traditional',
      fullContent: {
        introduction: 'Kantha embroidery, a traditional craft from Bengal, transforms discarded fabrics into beautiful, layered textiles through simple running stitches. This sustainable art form brings warmth, texture, and cultural depth to contemporary interiors.',
        history: 'Historically, Kantha was born from necessity - women would layer old saris and dhotis, stitching them together with colorful threads to create quilts, covers, and wraps. The word "Kantha" comes from the Sanskrit word "kontha," meaning rags.',
        modernApplication: 'Today, Kantha textiles add instant character to modern spaces. Use them as throws, cushion covers, wall hangings, or upholstery fabric. The irregular stitching patterns and layered textures create visual interest while the recycled nature aligns with sustainable design principles.',
        designTips: [
          'Layer Kantha throws on modern sofas for textural contrast',
          'Use as table runners or placemats for dining spaces',
          'Frame small Kantha pieces as wall art',
          'Mix with contemporary fabrics for eclectic styling',
          'Choose pieces with complementary color stories for cohesive design'
        ],
        culturalSignificance: 'Each Kantha piece is unique, carrying the maker\'s personal touch and stories. The imperfect, hand-stitched quality embodies the Japanese concept of wabi-sabi, finding beauty in imperfection and impermanence.'
      }
    },
    {
      id: 3,
      title: 'Terracotta Warmth',
      image: '/Terracotta.jpg',
      description: 'Earthen hues and materials that ground modern spaces in natural tones.',
      category: 'materials',
      fullContent: {
        introduction: 'Terracotta, literally meaning "baked earth," brings the raw beauty of clay and earth tones into contemporary design. This versatile material connects us to ancient building traditions while offering modern aesthetic appeal.',
        history: 'Used for millennia across cultures, terracotta has been fundamental in architecture and pottery. From the Terracotta Army of China to the temples of ancient Greece, this material has stood the test of time, proving its durability and timeless appeal.',
        modernApplication: 'In modern interiors, terracotta appears as flooring tiles, decorative vessels, sculptural elements, and accent walls. Its warm, earthy tones create cozy atmospheres while its natural variations add organic texture to minimalist spaces.',
        designTips: [
          'Use terracotta tiles for flooring in kitchens and bathrooms',
          'Incorporate terracotta planters for indoor gardens',
          'Choose handmade pieces for unique character and imperfections',
          'Pair with natural materials like wood and stone',
          'Use in both rustic and contemporary settings for versatility'
        ],
        culturalSignificance: 'Terracotta represents our connection to the earth and traditional craftsmanship. Each piece carries the maker\'s touch and the story of the clay from which it was formed, bringing authenticity to mass-produced modern environments.'
      }
    },
    {
      id: 4,
      title: 'Vastu Harmony',
      image: '/Vastu.jpg',
      description: 'Designs aligned with energy principles for balance, flow, and positivity.',
      category: 'cultural',
      fullContent: {
        introduction: 'Vastu Shastra, the ancient Indian science of architecture, offers timeless principles for creating harmonious living spaces. By aligning design with natural energies and cosmic forces, Vastu creates environments that promote well-being, prosperity, and peace.',
        history: 'Dating back over 5,000 years, Vastu Shastra was developed by ancient sages who understood the relationship between human dwellings and cosmic energies. The principles are based on the five elements (earth, water, fire, air, space) and their directional associations.',
        modernApplication: 'Modern Vastu application focuses on space planning, furniture placement, color selection, and material choices. Key principles include keeping the center of the home open, placing the kitchen in the southeast, and ensuring proper ventilation and natural light.',
        designTips: [
          'Keep the center of your home (Brahmasthan) free of heavy furniture',
          'Place mirrors on north or east walls to enhance positive energy',
          'Use water elements in the northeast for prosperity',
          'Avoid clutter, especially in corners and entryways',
          'Choose colors based on room direction and function'
        ],
        culturalSignificance: 'Vastu represents the harmony between human habitation and natural forces. By following these principles, we create spaces that not only look beautiful but also feel energetically balanced and supportive of human well-being.'
      }
    },
    {
      id: 5,
      title: 'Sustainable Touches',
      image: '/Eco-Friendly.jpg',
      description: 'Eco-conscious choices that merge aesthetic with environmental mindfulness.',
      category: 'sustainable',
      fullContent: {
        introduction: 'Sustainable design goes beyond trendy green materials - it\'s about creating beautiful spaces that respect our planet\'s resources. This approach combines environmental responsibility with aesthetic excellence, proving that eco-friendly can be effortlessly elegant.',
        history: 'The modern sustainability movement in design emerged from growing environmental awareness in the 1960s and 70s. However, traditional building practices worldwide have always emphasized working with local materials and climate-responsive design.',
        modernApplication: 'Sustainable design today includes reclaimed materials, energy-efficient systems, non-toxic finishes, and locally sourced elements. It\'s about reducing environmental impact while creating healthy, beautiful living spaces.',
        designTips: [
          'Choose furniture made from reclaimed or certified sustainable wood',
          'Use low-VOC paints and finishes for better indoor air quality',
          'Incorporate vintage and antique pieces to reduce waste',
          'Select local artisans and materials to reduce transportation impact',
          'Invest in quality pieces that will last decades rather than trends'
        ],
        culturalSignificance: 'Sustainable design reflects our responsibility to future generations. By making conscious choices, we create homes that tell stories of environmental stewardship while maintaining beauty and functionality.'
      }
    },
    {
      id: 6,
      title: 'AI-Powered Design Tools',
      image: '/AI.webp',
      description: 'Smart tools that empower creators to blend function, beauty, and innovation.',
      category: 'sustainable',
      fullContent: {
        introduction: 'Artificial Intelligence is revolutionizing interior design, offering unprecedented capabilities for visualization, optimization, and personalization. These tools enhance creativity rather than replace it, empowering designers to explore new possibilities.',
        history: 'AI in design emerged from computer-aided design (CAD) systems of the 1980s, evolving through 3D modeling, virtual reality, and now machine learning algorithms that can generate, optimize, and visualize design solutions.',
        modernApplication: 'AI tools now offer real-time rendering, automatic space planning, style matching, and material optimization. They can analyze user preferences, predict trends, and even suggest sustainable alternatives.',
        designTips: [
          'Use AI for quick concept visualization and client presentations',
          'Leverage predictive analytics for trend forecasting',
          'Employ AI for optimizing lighting and energy efficiency',
          'Utilize machine learning for personalized design recommendations',
          'Combine AI insights with human creativity for best results'
        ],
        culturalSignificance: 'AI represents the fusion of technology and creativity, democratizing design tools and making professional-quality visualization accessible to more people while preserving the human element in design decision-making.'
      }
    },
    {
      id: 7,
      title: 'Jali Patterns',
      image: '/jali.webp',
      description: 'Intricate perforated screens for light, privacy, and traditional elegance.',
      category: 'cultural',
      fullContent: {
        introduction: 'Jali, the art of perforated stone or wood screening, represents one of the most sophisticated architectural elements in Indian design. These intricate lattice works create poetry with light and shadow while serving practical functions.',
        history: 'Jali work reached its zenith during the Mughal period, adorning palaces and tombs with geometric and floral patterns. The technique combines Islamic geometric principles with Indian decorative traditions, creating stunning architectural features.',
        modernApplication: 'Contemporary Jali applications include room dividers, privacy screens, facade elements, and decorative panels. Modern materials like metal, composite materials, and 3D printing have expanded design possibilities while maintaining traditional aesthetics.',
        designTips: [
          'Use as room dividers to maintain visual connection while defining spaces',
          'Install as window screens for privacy without blocking light',
          'Create dramatic lighting effects with backlit installations',
          'Combine traditional patterns with modern materials for contemporary appeal',
          'Scale patterns appropriately for the space and viewing distance'
        ],
        culturalSignificance: 'Jali represents the Islamic concept of divine geometry and the Indian love of intricate craftsmanship. Each pattern carries symbolic meaning, from floral motifs representing paradise to geometric forms symbolizing cosmic order.'
      }
    },
    {
      id: 8,
      title: 'Warli Art',
      image: '/warli.jpeg',
      description: 'Tribal motifs and storytelling through minimal, geometric forms.',
      category: 'cultural',
      fullContent: {
        introduction: 'Warli art, one of India\'s oldest tribal art forms, tells stories through simple geometric shapes and figures. This minimalist approach to storytelling creates powerful visual narratives that translate beautifully into contemporary design.',
        history: 'Practiced by the Warli tribe of Maharashtra for over 2,500 years, this art form was traditionally painted on hut walls using white pigment made from rice paste. The art depicts daily life, festivals, and spiritual beliefs through basic geometric forms.',
        modernApplication: 'In modern interiors, Warli motifs work as wall murals, textile patterns, ceramic designs, and artistic installations. The simple, linear quality makes it perfect for minimalist and contemporary spaces.',
        designTips: [
          'Use as accent walls in modern, minimalist spaces',
          'Incorporate into textiles and upholstery for subtle pattern',
          'Create custom ceramic tiles with Warli motifs',
          'Use the monochromatic palette for sophisticated appeal',
          'Scale designs appropriately for different applications'
        ],
        culturalSignificance: 'Warli art embodies the tribal philosophy of living in harmony with nature. Each figure and symbol represents the interconnectedness of life, making it perfect for spaces that celebrate simplicity and mindfulness.'
      }
    },
    {
      id: 9,
      title: 'Blue Pottery',
      image: '/Blue Pottery.jpeg',
      description: 'Jaipur\'s iconic blue pottery for vibrant, artisanal accents.',
      category: 'traditional',
      fullContent: {
        introduction: 'Blue Pottery of Jaipur represents a unique ceramic tradition that combines Persian techniques with Indian aesthetics. The distinctive blue and white palette creates timeless appeal while the handcrafted quality adds authenticity to modern spaces.',
        history: 'Introduced to Jaipur in the 18th century, Blue Pottery was influenced by Turko-Persian traditions. Unlike traditional pottery, it doesn\'t use clay but is made from a mixture of quartz, raw glaze, and multani mitti, giving it a unique texture and appearance.',
        modernApplication: 'Blue pottery works beautifully as decorative objects, dinnerware, tiles, and accent pieces. The blue and white color scheme complements both traditional and contemporary interiors, adding artisanal character to modern spaces.',
        designTips: [
          'Use as statement pieces on dining tables and shelves',
          'Incorporate tiles for backsplashes and accent walls',
          'Mix with modern ceramics for eclectic collections',
          'Use the blue and white palette as inspiration for entire room schemes',
          'Choose handmade pieces for authentic character and slight imperfections'
        ],
        culturalSignificance: 'Blue pottery represents the synthesis of different cultural traditions, showing how art forms evolve through cultural exchange. Each piece carries the legacy of master craftsmen and the story of Jaipur\'s rich artistic heritage.'
      }
    },
    {
      id: 10,
      title: 'Bamboo Craft',
      image: '/Bamboo crafting.jpg',
      description: 'Sustainable, flexible, and earthy elements from North-East India.',
      category: 'sustainable',
      fullContent: {
        introduction: 'Bamboo, the "green gold" of North-East India, offers unlimited possibilities for sustainable design. This rapidly renewable resource combines strength, flexibility, and natural beauty, making it perfect for contemporary eco-conscious interiors.',
        history: 'Bamboo crafting has been integral to North-Eastern Indian culture for millennia. Different tribes have developed unique techniques for working with various bamboo species, creating everything from homes to intricate baskets.',
        modernApplication: 'Modern bamboo applications include furniture, flooring, wall panels, decorative screens, and lighting fixtures. Its natural antimicrobial properties and rapid growth make it an ideal sustainable material for contemporary design.',
        designTips: [
          'Use bamboo flooring for a warm, natural foundation',
          'Incorporate bamboo furniture for lightweight, flexible seating',
          'Create room dividers with bamboo screens',
          'Use bamboo lighting for soft, filtered illumination',
          'Combine with other natural materials for cohesive biophilic design'
        ],
        culturalSignificance: 'Bamboo represents sustainability, flexibility, and resilience - qualities essential for modern living. Its use connects us to traditional wisdom about living in harmony with nature while meeting contemporary design needs.'
      }
    },
    {
      id: 11,
      title: 'Sheesham Woodwork',
      image: '/Wood work.avif',
      description: 'Rich, durable woodwork that brings warmth and tradition to modern interiors.',
      category: 'materials',
      fullContent: {
        introduction: 'Sheesham (Indian Rosewood) represents the pinnacle of Indian woodworking tradition. This hardwood\'s rich grain patterns, durability, and workability make it perfect for creating furniture and architectural elements that last generations.',
        history: 'Sheesham has been prized in Indian woodworking for centuries, used in everything from royal furniture to architectural elements. The wood\'s natural oils and dense grain make it naturally resistant to insects and decay.',
        modernApplication: 'Contemporary Sheesham applications include furniture, flooring, decorative panels, and sculptural elements. Its rich brown tones and distinctive grain patterns add warmth and character to modern interiors.',
        designTips: [
          'Use for statement furniture pieces like dining tables and bed frames',
          'Incorporate carved panels as architectural features',
          'Pair with lighter woods for visual balance',
          'Use oil finishes to enhance natural grain patterns',
          'Choose handcrafted pieces for unique character and traditional joinery'
        ],
        culturalSignificance: 'Sheesham represents the mastery of traditional Indian woodworking, where craftsmen passed down techniques through generations. Each piece embodies centuries of knowledge about working with this noble wood.'
      }
    },
    {
      id: 12,
      title: 'Jaali Lattice',
      image: '/Jaali.jpeg',
      description: 'Traditional Indian latticework for light play and privacy in contemporary spaces.',
      category: 'cultural',
      fullContent: {
        introduction: 'Jaali latticework represents the sophisticated understanding of light, air, and privacy in traditional Indian architecture. These perforated screens create dynamic interplays of light and shadow while maintaining connection between spaces.',
        history: 'Jaali work evolved from practical needs in hot climates, allowing air circulation while providing privacy and security. The geometric patterns reflect Islamic mathematical principles combined with Indian decorative sensibilities.',
        modernApplication: 'Modern Jaali applications extend beyond traditional stone to include metal, wood, and composite materials. They serve as room dividers, facade elements, privacy screens, and decorative features in contemporary architecture.',
        designTips: [
          'Use as floating room dividers to maintain spatial flow',
          'Install as window treatments for privacy with light',
          'Create focal walls with backlit Jaali panels',
          'Use different scales of patterns for various applications',
          'Combine traditional patterns with modern materials for contemporary appeal'
        ],
        culturalSignificance: 'Jaali represents the harmony between function and beauty, showing how practical architectural elements can become art. Each pattern tells a story of cultural exchange and mathematical sophistication.'
      }
    },
    {
      id: 13,
      title: 'Block Printing',
      image: '/Block Printing.jpeg',
      description: 'Hand-block printed textiles for a touch of artisanal heritage.',
      category: 'traditional',
      fullContent: {
        introduction: 'Block printing, one of India\'s oldest textile traditions, brings the beauty of handcrafted patterns into contemporary interiors. Each printed piece carries the mark of human hands and the story of ancient techniques.',
        history: 'Block printing in India dates back over 1,000 years, with major centers in Rajasthan, Gujarat, and Uttar Pradesh. The technique involves hand-carved wooden blocks dipped in natural dyes to create intricate patterns on fabric.',
        modernApplication: 'Block-printed textiles add instant character to modern spaces through curtains, upholstery, cushions, and wall hangings. The slight imperfections and color variations create visual interest impossible to achieve with machine printing.',
        designTips: [
          'Use block-printed curtains for windows to filter light beautifully',
          'Incorporate as throw pillows for pops of pattern and color',
          'Choose coordinating but not matching patterns for eclectic appeal',
          'Frame textile pieces as wall art',
          'Layer different patterns for rich, textural environments'
        ],
        culturalSignificance: 'Block printing preserves traditional craftsmanship while providing livelihoods for artisan communities. Each piece represents hours of skilled labor and centuries of inherited knowledge.'
      }
    },
    {
      id: 14,
      title: 'Brass Accents',
      image: '/BrassAccents.webp',
      description: 'Elegant brass decor and fixtures inspired by Indian craftsmanship.',
      category: 'materials',
      fullContent: {
        introduction: 'Brass has been fundamental to Indian decorative arts for millennia, prized for its golden luster, malleability, and symbolic significance. In contemporary design, brass accents add warmth, sophistication, and cultural depth to modern interiors.',
        history: 'Indian brass work reached extraordinary heights during the Mughal period, with craftsmen creating intricate vessels, architectural elements, and decorative objects. Different regions developed distinctive styles, from the delicate work of Moradabad to the bold designs of Rajasthan.',
        modernApplication: 'Modern brass applications include lighting fixtures, cabinet hardware, decorative objects, and architectural details. The metal\'s warm tone complements both minimalist and maximalist interiors, adding richness without overwhelming.',
        designTips: [
          'Use brass fixtures for warm, flattering lighting',
          'Incorporate vintage brass objects as decorative accents',
          'Mix brass with other metals for layered metallics',
          'Choose handcrafted pieces for unique patina and character',
          'Use brass hardware to elevate simple furniture pieces'
        ],
        culturalSignificance: 'Brass represents prosperity, purity, and artistic excellence in Indian culture. Its use in contemporary design connects modern spaces to traditional values while supporting artisan communities.'
      }
    }
  ];

  const filteredInspirations = activeCategory === 'all' 
    ? inspirations 
    : inspirations.filter(inspiration => inspiration.category === activeCategory);

  const handleCardClick = (id: number) => {
    if (isMobile) {
      if (expandedCard !== id) {
        const element = document.getElementById(`card-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getExpandedCardContent = () => {
    if (!expandedCard) return null;
    return inspirations.find(item => item.id === expandedCard);
  };

  const expandedContent = getExpandedCardContent();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Custom cursor effect - only on desktop */}
      {!isMobile && (
        <div 
          className="fixed pointer-events-none z-50 w-8 h-8 bg-stone-400/30 rounded-full backdrop-blur-sm transition-all duration-300"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            transform: hoveredItem ? 'scale(3)' : 'scale(1)',
            opacity: hoveredItem ? 0.8 : 0.4
          }}
        />
      )}

      {/* Hero section */}
      <section className="relative h-[50vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('Inspiration BG.jpeg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mb-4 md:mb-8">
            Inspire
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8 opacity-90">
            Where tradition meets innovation
          </p>
          <div className="w-24 h-1 bg-white mx-auto" />
        </div>
      </section>

      {/* Category filter */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-10 lg:mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full font-light tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden text-xs sm:text-sm md:text-base ${
                  activeCategory === category.id 
                    ? (category.id === 'traditional' ? 'bg-amber-600 text-white' :
                      category.id === 'materials' ? 'bg-blue-700 text-white' :
                      category.id === 'cultural' ? 'bg-purple-600 text-white' :
                      category.id === 'sustainable' ? 'bg-green-600 text-white' :
                      'bg-stone-800 text-white')
                    : `bg-stone-100 text-stone-700 ${category.hoverColor}`
                }`}
              >
                <span className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                  <span>{category.name}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm opacity-70">({category.count})</span>
                </span>
                {activeCategory !== category.id && (
                  <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full ${
                    category.id === 'traditional' ? 'bg-amber-600' :
                    category.id === 'materials' ? 'bg-blue-700' :
                    category.id === 'cultural' ? 'bg-purple-600' :
                    category.id === 'sustainable' ? 'bg-green-600' :
                    'bg-stone-800'
                  }`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration grid */}
      <section className="py-6 md:py-10 lg:py-14 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-4 sm:gap-5 md:gap-6 transition-all duration-700 ${
            expandedCard && !isMobile ? 'lg:grid-cols-2' : 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
          }`}>
            <div className={`${expandedCard && !isMobile ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
              <div className={`grid gap-4 sm:gap-5 md:gap-6 ${
                expandedCard && !isMobile 
                  ? 'grid-cols-1' 
                  : 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
              }`}>
                {filteredInspirations.map((item) => {
                  const isExpanded = expandedCard === item.id;
                  
                  return (
                    <div
                      key={item.id}
                      id={`card-${item.id}`}
                      className={`transition-all duration-700 ${
                        expandedCard && !isMobile && !isExpanded 
                          ? 'opacity-60 scale-95' 
                          : 'opacity-100 scale-100'
                      }`}
                    >
                      <div
                        className={`group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer transform hover:-translate-y-1 md:hover:-translate-y-2 ${
                          isExpanded ? 'ring-2 md:ring-3 ring-stone-300 shadow-lg' : ''
                        }`}
                        onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                        onMouseLeave={() => !isMobile && setHoveredItem(null)}
                        onClick={() => handleCardClick(item.id)}
                      >
                        <div className="relative overflow-hidden">
                          <div className="aspect-[4/3]">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                            />
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 text-white">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-light tracking-wide uppercase ${
                                item.category === 'traditional' ? 'text-amber-300' :
                                item.category === 'materials' ? 'text-blue-300' :
                                item.category === 'cultural' ? 'text-purple-300' :
                                item.category === 'sustainable' ? 'text-green-300' :
                                'text-stone-300'
                              }`}>
                                {item.category}
                              </span>
                            </div>
                            
                            <h3 className="text-base sm:text-lg md:text-xl font-serif mb-1 group-hover:text-stone-100 transition-colors duration-300">
                              {item.title}
                            </h3>
                            
                            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="absolute top-2 right-2">
                            <div className={`w-6 h-6 sm:w-7 sm:h-7 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isExpanded ? 'rotate-45' : 'rotate-0'
                            }`}>
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
                              </svg>
                            </div>
                          </div>
                          
                          <div className={`absolute bottom-0 left-0 w-full h-1 transform ${isExpanded ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform duration-500 origin-left ${
                            item.category === 'traditional' ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                            item.category === 'materials' ? 'bg-gradient-to-r from-blue-400 to-blue-700' :
                            item.category === 'cultural' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                            item.category === 'sustainable' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                            'bg-gradient-to-r from-stone-400 to-stone-600'
                          }`} />
                        </div>
                      </div>

                      {/* Mobile Expanded Content */}
                      {isMobile && isExpanded && (
                        <div className="mt-3 sm:mt-4 bg-white rounded-xl shadow-md overflow-hidden">
                          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                            <div>
                              <h3 className="text-base sm:text-lg font-serif text-stone-700 mb-1 sm:mb-2">Introduction</h3>
                              <p className="text-stone-600 text-sm leading-relaxed">
                                {item.fullContent.introduction}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-base sm:text-lg font-serif text-stone-700 mb-1 sm:mb-2">Historical Background</h3>
                              <p className="text-stone-600 text-sm leading-relaxed">
                                {item.fullContent.history}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-base sm:text-lg font-serif text-stone-700 mb-1 sm:mb-2">Modern Application</h3>
                              <p className="text-stone-600 text-sm leading-relaxed">
                                {item.fullContent.modernApplication}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-base sm:text-lg font-serif text-stone-700 mb-1 sm:mb-2">Design Tips</h3>
                              <ul className="space-y-2">
                                {item.fullContent.designTips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start space-x-2">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                      item.category === 'traditional' ? 'bg-amber-500' :
                                      item.category === 'materials' ? 'bg-blue-500' :
                                      item.category === 'cultural' ? 'bg-purple-500' :
                                      item.category === 'sustainable' ? 'bg-green-500' :
                                      'bg-stone-500'
                                    }`} />
                                    <p className="text-stone-600 leading-relaxed text-sm">{tip}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-base sm:text-lg font-serif text-stone-700 mb-1 sm:mb-2">Cultural Significance</h3>
                              <p className="text-stone-600 text-sm leading-relaxed">
                                {item.fullContent.culturalSignificance}
                              </p>
                            </div>

                            <div className="bg-stone-50 rounded-lg p-3 sm:p-4 mt-3">
                              <h4 className="text-sm sm:text-base font-serif text-stone-800 mb-1">Ready to Incorporate This Style?</h4>
                              <p className="text-stone-600 mb-2 text-xs">
                                Let our design experts help you integrate these traditional elements into your modern space.
                              </p>
                              <Link href="/contact">
                                <div className="inline-block bg-stone-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-light tracking-wide hover:bg-stone-700 transition-colors duration-300 cursor-pointer text-xs">
                                  Get Design Consultation
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Expanded Content */}
            {expandedContent && !isMobile && (
              <div className="lg:col-span-1">
                <div className={`sticky top-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ${
                  expandedCard ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}>
                  <div className="relative">
                    <div className="bg-gradient-to-r from-stone-100 to-stone-50 p-4 sm:p-5 md:p-6 border-b border-stone-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className={`text-xs sm:text-sm font-light tracking-wide uppercase mb-1 sm:mb-2 block ${
                            expandedContent.category === 'traditional' ? 'text-amber-600' :
                            expandedContent.category === 'materials' ? 'text-blue-600' :
                            expandedContent.category === 'cultural' ? 'text-purple-600' :
                            expandedContent.category === 'sustainable' ? 'text-green-600' :
                            'text-stone-600'
                          }`}>
                            {expandedContent.category}
                          </span>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-stone-800">{expandedContent.title}</h2>
                        </div>
                        <button 
                          onClick={() => setExpandedCard(null)}
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-stone-200 hover:bg-stone-300 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="h-[400px] sm:h-[500px] md:h-[600px] overflow-y-auto custom-scrollbar">
                      <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 md:space-y-5">
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-serif text-stone-700 mb-1 sm:mb-2 md:mb-3">Introduction</h3>
                          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                            {expandedContent.fullContent.introduction}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-serif text-stone-700 mb-1 sm:mb-2 md:mb-3">Historical Background</h3>
                          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                            {expandedContent.fullContent.history}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-serif text-stone-700 mb-1 sm:mb-2 md:mb-3">Modern Application</h3>
                          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                            {expandedContent.fullContent.modernApplication}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-serif text-stone-700 mb-1 sm:mb-2 md:mb-3">Design Tips</h3>
                          <ul className="space-y-2 sm:space-y-3">
                            {expandedContent.fullContent.designTips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start space-x-2 sm:space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 ${
                                  expandedContent.category === 'traditional' ? 'bg-amber-500' :
                                  expandedContent.category === 'materials' ? 'bg-blue-500' :
                                  expandedContent.category === 'cultural' ? 'bg-purple-500' :
                                  expandedContent.category === 'sustainable' ? 'bg-green-500' :
                                  'bg-stone-500'
                                }`} />
                                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{tip}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-serif text-stone-700 mb-1 sm:mb-2 md:mb-3">Cultural Significance</h3>
                          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                            {expandedContent.fullContent.culturalSignificance}
                          </p>
                        </div>

                        <div className="bg-stone-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 mt-3 sm:mt-4 md:mt-5">
                          <h4 className="text-sm sm:text-base md:text-lg font-serif text-stone-800 mb-1">Ready to Incorporate This Style?</h4>
                          <p className="text-stone-600 mb-2 sm:mb-3 text-xs sm:text-sm">
                            Let our design experts help you integrate these traditional elements into your modern space.
                          </p>
                          <Link href="/contact">
                            <div className="inline-block bg-stone-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-light tracking-wide hover:bg-stone-700 transition-colors duration-300 cursor-pointer text-xs sm:text-sm">
                              Get Design Consultation
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-24 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light mb-6 sm:mb-8 md:mb-10 opacity-90">
            Let's create something extraordinary together
          </p>
          <Link href="/contact">
            <div className="group relative inline-block bg-white text-stone-800 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-light tracking-wide hover:bg-stone-100 transition-all duration-500 cursor-pointer whitespace-nowrap overflow-hidden text-sm sm:text-base">
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-stone-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
            </div>
          </Link>
        </div>
      </section>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
}

// Loading component
function InspireLoading() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-stone-600 font-light">Loading inspirations...</p>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function Inspire() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <Suspense fallback={<InspireLoading />}>
        <InspireContent />
      </Suspense>
      <Footer />
    </div>
  );
}