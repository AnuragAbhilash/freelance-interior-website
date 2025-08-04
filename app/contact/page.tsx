'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  submit?: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isSubmitted && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSubmitted]);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.projectType) newErrors.projectType = 'Project type is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);
    setErrors({});

    try {
      const response = await fetch('/.netlify/functions/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'main-form'
        })
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('API Error:', responseData);
        throw new Error(responseData.error || 'Failed to send message. Please try again later.');
      }
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to send. Please try again.' 
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/BGA Contact.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />

        <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair mb-6 md:mb-8">
            Let&apos;s Create
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-great-vibes mb-6 md:mb-8 opacity-90">
            Something extraordinary together
          </p>
          <div className="w-16 sm:w-24 h-1 bg-white mx-auto" />
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="space-y-6 md:space-y-8">
              <div className="mb-8 md:mb-12">
                <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">
                  Get In Touch
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-stone-800 mt-4 sm:mt-6 mb-6 sm:mb-8">
                  Start Your
                  <span className="block text-stone-600 font-great-vibes text-2xl sm:text-3xl md:text-4xl italic">
                    Design Journey
                  </span>
                </h2>
                <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                  Ready to transform your space? Let&apos;s discuss your vision and create something
                  extraordinary together.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="group relative">
                    <input
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 border rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 ${
                        errors.name
                          ? 'border-red-400'
                          : 'border-stone-200 focus:ring-2 focus:ring-stone-400 focus:border-transparent'
                      }`}
                      placeholder="Your Name"
                      disabled={isSending || isSubmitted}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.name}</p>
                    )}
                  </div>

                  <div className="group relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 border rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 ${
                        errors.email
                          ? 'border-red-400'
                          : 'border-stone-200 focus:ring-2 focus:ring-stone-400 focus:border-transparent'
                      }`}
                      placeholder="Email Address"
                      disabled={isSending || isSubmitted}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="group relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 border rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 ${
                        errors.phone
                          ? 'border-red-400'
                          : 'border-stone-200 focus:ring-2 focus:ring-stone-400 focus:border-transparent'
                      }`}
                      placeholder="Phone Number (optional)"
                      disabled={isSending || isSubmitted}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.phone}</p>
                    )}
                  </div>

                  <div className="group relative">
                    <select
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 border rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 appearance-none ${
                        errors.projectType
                          ? 'border-red-400'
                          : 'border-stone-200 focus:ring-2 focus:ring-stone-400 focus:border-transparent'
                      }`}
                      disabled={isSending || isSubmitted}
                    >
                      <option value="" disabled>
                        Project Type
                      </option>
                      <option value="residential">Residential Design</option>
                      <option value="commercial">Commercial Spaces</option>
                      <option value="hospitality">Hospitality Design</option>
                      <option value="consultation">Design Consultation</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <i className="ri-arrow-down-s-line text-stone-400"></i>
                    </div>
                    {errors.projectType && (
                      <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.projectType}</p>
                    )}
                  </div>
                </div>

                <div className="group relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 border border-stone-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all duration-300 appearance-none"
                    disabled={isSending || isSubmitted}
                  >
                    <option value="">Budget Range (optional)</option>
                    <option value="50k-200k">₹50k - ₹2 Lakh</option>
                    <option value="200k-500k">₹2 Lakh - ₹5 Lakh</option>
                    <option value="500k-1m">₹5 Lakh - ₹10 Lakh</option>
                    <option value="1m+">₹10 Lakh+</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <i className="ri-arrow-down-s-line text-stone-400"></i>
                  </div>
                </div>

                <div className="group relative">
                  <textarea
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-stone-50 border rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? 'border-red-400'
                        : 'border-stone-200 focus:ring-2 focus:ring-stone-400 focus:border-transparent'
                    }`}
                    placeholder="Tell us about your project vision..."
                    maxLength={500}
                    disabled={isSending || isSubmitted}
                  />
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs text-stone-400">
                    {formData.message.length}/500
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.message}</p>
                  )}
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                    <p className="font-medium">Submission Error</p>
                    <p className="text-sm">{errors.submit}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending || isSubmitted}
                  className={`w-full bg-stone-800 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-medium tracking-wide transition-all duration-500 ${
                    isSending || isSubmitted ? 'opacity-70 cursor-not-allowed' : 'hover:bg-stone-700 hover:shadow-lg'
                  }`}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSubmitted ? (
                    'Thank You! We will contact you soon'
                  ) : (
                    'Start Your Project'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8">
              <div className="grid gap-4 sm:gap-6">
                {[
                  {
                    icon: 'ri-phone-line',
                    title: 'Phone',
                    detail: '+91 12345-54321',
                    description: 'Call us for immediate assistance',
                  },
                  {
                    icon: 'ri-mail-line',
                    title: 'Email',
                    detail: 'saurabhjhadesigns@gmail.com',
                    description: 'Send us your project details',
                  },
                  {
                    icon: 'ri-map-pin-line',
                    title: 'Studio',
                    detail: 'Bangalore, India',
                    description: 'Visit our design studio',
                  },
                  {
                    icon: 'ri-time-line',
                    title: 'Hours',
                    detail: 'Mon - Sat: 9AM - 7PM',
                    description: 'We are available to help',
                  },
                ].map((info, index) => (
                  <div
                    key={index}
                    className="bg-stone-50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer border border-stone-200/50"
                  >
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-stone-200 rounded-full flex items-center justify-center">
                        <i className={`${info.icon} text-stone-600 text-xl sm:text-2xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-playfair text-stone-800 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-stone-600 font-medium text-sm sm:text-base mb-1">
                          {info.detail}
                        </p>
                        <p className="text-stone-500 text-xs sm:text-sm">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="bg-stone-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-playfair text-stone-800 mb-4 sm:mb-6">
                  Connect With Us
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      name: 'Instagram',
                      icon: 'ri-instagram-line',
                      handle: 'saurabh_jha_designs',
                      url: 'https://www.instagram.com/saurabh_jha_designs/',
                      color: 'from-pink-500 to-purple-600',
                    },
                    {
                      name: 'LinkedIn',
                      icon: 'ri-linkedin-line',
                      handle: 'Kumar Saurabh Design',
                      url: 'https://linkedin.com/in/kumarsaurabh-design',
                      color: 'from-blue-500 to-blue-700',
                    },
                    {
                      name: 'Facebook',
                      icon: 'ri-facebook-line',
                      handle: 'Saurabh Jha Designs',
                      url: 'https://www.facebook.com/profile.php?id=61578668492659',
                      color: 'from-blue-600 to-blue-800',
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl hover:shadow-md transition-all duration-300"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center`}
                      >
                        <i className={`${social.icon} text-white text-lg sm:text-xl`}></i>
                      </div>
                      <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                        <h4 className="font-playfair text-stone-800 text-sm sm:text-base truncate">
                          {social.name}
                        </h4>
                        <p className="text-stone-600 text-xs sm:text-sm truncate">{social.handle}</p>
                      </div>
                      <i className="ri-arrow-right-up-line text-stone-400 ml-2"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-24 md:py-32 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="text-stone-500 font-light tracking-[0.3em] text-xs sm:text-sm uppercase">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-stone-800 mt-4 sm:mt-6 mb-6 sm:mb-8">
              How We Can Help
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: 'Residential Design',
                description: 'Creating beautiful homes that reflect your personality',
                icon: 'ri-home-4-line',
              },
              {
                title: 'Commercial Spaces',
                description: 'Functional and inspiring work environments',
                icon: 'ri-building-line',
              },
              {
                title: 'Hospitality Design',
                description: 'Memorable experiences through thoughtful design',
                icon: 'ri-hotel-line',
              },
              {
                title: 'Design Consultation',
                description: 'Expert guidance for your design journey',
                icon: 'ri-lightbulb-line',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer text-center border border-stone-200/50"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <i className={`${service.icon} text-stone-600 text-xl sm:text-2xl`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-playfair text-stone-800 mb-2 sm:mb-4">
                  {service.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-stone-800 mb-4 sm:mb-6">
              Visit Our Studio
            </h2>
            <p className="text-stone-600 text-base sm:text-lg">
              Located in the heart of Bangalore, our studio is where creativity comes to life
            </p>
          </div>

          <div className="bg-stone-100 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.77490448696!2d77.30125374670206!3d12.954459543640922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1753481093841!5m2!1sen!2sin"
              width="100%"
              height="300"
              className="min-h-[300px] sm:min-h-[400px]"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}