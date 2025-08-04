
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import HeroSection from '@/components/HeroSection';
import AboutPreview from '@/components/AboutPreview';
import DesignInspirationPreview from '@/components/DesignInspirationPreview';
import TestimonialsPreview from '@/components/TestimonialsPreview';
import ContactPreview from '@/components/ContactPreview';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <HeroSection />
      <AboutPreview />
      <DesignInspirationPreview />
      <TestimonialsPreview />
      <ContactPreview />
      <Footer />
    </div>
  );
}
