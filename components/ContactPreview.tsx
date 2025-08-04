'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type FormData = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  submit?: string;
};

export default function ContactPreview() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isSubmitted && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSubmitted]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
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
          type: 'preview-form' 
        })
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('API Error:', responseData);
        throw new Error(responseData.error || 'Failed to send message. Please try again later.');
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', projectType: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to send. Please try again.' 
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="py-32 bg-stone-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('/BG Contact.jpg')` }} />
      </div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/BG Texture.jpg')` }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="transform translate-y-0 opacity-100 transition-all duration-1000 ease-out">
              <span className="text-stone-400 font-light tracking-[0.3em] text-sm uppercase">Let&apos;s Create Together</span>
              <h2 className="text-6xl font-playfair mt-6 mb-8 leading-tight">
                Ready to Transform 
                <span className="block text-stone-300 font-great-vibes text-5xl italic mt-2">Your Space?</span>
              </h2>
              <p className="text-stone-300 text-xl leading-relaxed mb-10 font-light">
                Every great design begins with a conversation. Let&apos;s discuss your vision, 
                explore possibilities, and create something extraordinary together.
              </p>
            </div>

            {/* Contact Information */}
            <div className="transform translate-y-0 opacity-100 transition-all duration-1000 ease-out delay-200">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-stone-700 rounded-full flex items-center justify-center group-hover:bg-stone-600 transition-colors duration-300">
                    <i className="ri-mail-line text-stone-300 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm font-light tracking-wide">Email</p>
                    <p className="text-white text-lg">saurabhjhadesigns@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-stone-700 rounded-full flex items-center justify-center group-hover:bg-stone-600 transition-colors duration-300">
                    <i className="ri-phone-line text-stone-300 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm font-light tracking-wide">Phone</p>
                    <p className="text-white text-lg">+91 12345-54321</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 mb-10">
                {[
                  { icon: 'ri-instagram-line', href: 'https://www.instagram.com/saurabh_jha_designs/', label: 'Instagram' },
                  { icon: 'ri-pinterest-line', href: 'https://in.pinterest.com/saurabhjhadesigns/', label: 'Pinterest' },
                  { icon: 'ri-linkedin-line', href: 'https://www.facebook.com/profile.php?id=61578668492659', label: 'LinkedIn' },
                  { icon: 'ri-behance-line', href: 'https://www.behance.net/saurabhjhadesigns', label: 'Behance' },
                  { icon: 'ri-facebook-line', href: 'https://www.facebook.com/profile.php?id=61578668492659', label: 'Facebook' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 bg-stone-700 rounded-full flex items-center justify-center hover:bg-stone-600 transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    <i className={`${social.icon} text-stone-300 text-xl group-hover:text-white transition-colors duration-300`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="transform translate-y-0 opacity-100 transition-all duration-1000 ease-out delay-400">
              <Link 
                href="/contact"
                className="group relative bg-white text-stone-800 px-12 py-5 rounded-full font-light tracking-wide hover:bg-stone-100 transition-all duration-700 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <span className="relative z-10">Start Your Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-stone-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
              </Link>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="transform translate-y-0 opacity-100 transition-all duration-1000 ease-out delay-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-playfair text-white mb-8">Quick Inquiry</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name*"
                      className={`w-full bg-white/10 border-2 rounded-xl px-6 py-4 text-white placeholder-stone-300 focus:outline-none transition-all duration-500 ${
                        errors.name ? 'border-red-400 animate-pulse' : 'border-white/20'
                      }`}
                      disabled={isSending || isSubmitted}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email*"
                      className={`w-full bg-white/10 border-2 rounded-xl px-6 py-4 text-white placeholder-stone-300 focus:outline-none transition-all duration-500 ${
                        errors.email ? 'border-red-400 animate-pulse' : 'border-white/20'
                      }`}
                      disabled={isSending || isSubmitted}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className={`w-full bg-white/10 border-2 rounded-xl px-6 py-4 text-white focus:outline-none transition-all duration-500 pr-12 ${
                      errors.projectType ? 'border-red-400 animate-pulse' : 'border-white/20'
                    }`}
                    disabled={isSending || isSubmitted}
                    required
                  >
                    <option value="">Select Project Type*</option>
                    <option value="residential" className="bg-stone-800 text-white">Residential</option>
                    <option value="commercial" className="bg-stone-800 text-white">Commercial</option>
                    <option value="hospitality" className="bg-stone-800 text-white">Hospitality</option>
                    <option value="consultation" className="bg-stone-800 text-white">Consultation</option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none"></i>
                  {errors.projectType && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.projectType}</p>
                  )}
                </div>
                
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project...*"
                    rows={5}
                    maxLength={500}
                    className={`w-full bg-white/10 border-2 rounded-xl px-6 py-4 text-white placeholder-stone-300 focus:outline-none transition-all duration-500 resize-none ${
                      errors.message ? 'border-red-400 animate-pulse' : 'border-white/20'
                    }`}
                    disabled={isSending || isSubmitted}
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-stone-400 text-xs">
                    {formData.message.length}/500
                  </div>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.message}</p>
                  )}
                </div>
                
                {errors.submit && (
                  <div className="bg-red-900/20 border border-red-400 text-red-200 px-4 py-3 rounded-xl">
                    <p className="font-medium">Submission Error</p>
                    <p className="text-sm">{errors.submit}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending || isSubmitted}
                  className={`group relative w-full bg-white text-stone-800 py-5 rounded-xl font-medium transition-all duration-500 cursor-pointer whitespace-nowrap overflow-hidden ${
                    isSending || isSubmitted ? 'opacity-70 cursor-not-allowed' : 'hover:bg-stone-100'
                  }`}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    <span className="relative z-10 text-lg">Thank You! We'll be in touch</span>
                  ) : (
                    <>
                      <span className="relative z-10 text-lg">Send Message</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-stone-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-xl" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}