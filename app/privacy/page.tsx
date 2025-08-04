'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiCheck, FiShield, FiUser, FiDatabase, FiLock, FiGlobe, FiMail } from 'react-icons/fi';

interface WebSection {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function PrivacyPolicy() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('privacyConsent', 'true');
      localStorage.setItem('consentDate', new Date().toISOString());
    }
    router.back();
  };

  const webSections: WebSection[] = [
    {
      title: 'Information Collection',
      icon: <FiUser className="text-amber-600" />,
      content: (
        <>
          <p className="text-stone-700 leading-relaxed">
            We collect the following types of information when you engage with our design services:
          </p>
          <ul className="space-y-2 pl-5 mt-2">
            <li className="flex items-start"><span className="mr-2">•</span><span><strong>Personal Identification:</strong> Full name, email address, phone number, physical address</span></li>
            <li className="flex items-start"><span className="mr-2">•</span><span><strong>Financial Information:</strong> Billing details, payment card information</span></li>
            <li className="flex items-start"><span className="mr-2">•</span><span><strong>Project Specifications:</strong> Architectural plans, design inspirations</span></li>
            <li className="flex items-start"><span className="mr-2">•</span><span><strong>Technical Data:</strong> IP addresses, browser type, operating system</span></li>
          </ul>
        </>
      ),
    },
    {
      title: 'Data Usage',
      icon: <FiDatabase className="text-amber-600" />,
      content: (
        <>
          <p className="text-stone-700 leading-relaxed">Your information is used exclusively for:</p>
          <ul className="space-y-2 pl-5 mt-2">
            {[
              'Creating personalized design concepts',
              'Processing transactions and payments',
              'Communicating project updates',
              'Improving our services through analytics',
              'Complying with legal obligations',
            ].map((item, i) => (
              <li key={i} className="flex items-start"><span className="mr-2">•</span><span>{item}</span></li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: 'Data Protection',
      icon: <FiLock className="text-amber-600" />,
      content: (
        <>
          <h3 className="font-medium text-stone-800 mb-2">Technical Measures</h3>
          <ul className="space-y-2 pl-5">
            {[
              'End-to-end encryption for all data transmissions',
              'Enterprise-grade firewalls and intrusion detection',
              'Regular security audits and penetration testing',
              'Secure data centers with 24/7 monitoring',
            ].map((item, i) => (
              <li key={i} className="flex items-start"><span className="mr-2">•</span><span>{item}</span></li>
            ))}
          </ul>
          <h3 className="font-medium text-stone-800 mt-6 mb-2">Organizational Measures</h3>
          <ul className="space-y-2 pl-5">
            {[
              'Strict access controls on need-to-know basis',
              'Mandatory privacy training for all employees',
              'Secure document disposal protocols',
              '72-hour breach notification policy',
            ].map((item, i) => (
              <li key={i} className="flex items-start"><span className="mr-2">•</span><span>{item}</span></li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: 'Your Rights',
      icon: <FiGlobe className="text-amber-600" />,
      content: (
        <>
          <p className="text-stone-700 leading-relaxed">
            Under applicable laws, you have the right to:
          </p>
          <ul className="space-y-2 pl-5 mt-2">
            {[
              'Request access to your personal data',
              'Rectify inaccurate information',
              'Request deletion of your data',
              'Restrict or object to processing',
              'Withdraw consent at any time',
              'Lodge complaints with authorities',
            ].map((item, i) => (
              <li key={i} className="flex items-start"><span className="mr-2">•</span><span>{item}</span></li>
            ))}
          </ul>
          <div className="mt-4 p-4 border border-stone-200 rounded-lg bg-stone-50 text-sm italic text-stone-600">
            To exercise these rights, please contact us at saurabhjhadesigns@gmail.com
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FiShield className="text-4xl text-amber-600 mx-auto mb-2" />
          <h1 className="text-3xl font-serif text-stone-800">Privacy Policy</h1>
          <p className="text-stone-500 text-sm">Effective {new Date().toLocaleDateString('en-IN')}</p>
        </div>

        <div className="space-y-6">
          {webSections.map((section, index) => (
            <section
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 hover:border-amber-300 transition-all"
            >
              <div className="flex items-start">
                <div className="mr-4">{section.icon}</div>
                <div>
                  <h2 className="text-xl font-serif text-stone-800 mb-2">{section.title}</h2>
                  <div className="text-stone-600 text-sm">{section.content}</div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200 text-center">
          <div className="bg-white p-6 rounded-lg border border-stone-200 max-w-2xl mx-auto">
            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                id="privacy-agreement"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mr-4 h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="privacy-agreement" className="text-stone-700 text-left text-sm">
                I acknowledge that I have read and understood this Privacy Policy and consent to the collection, processing,
                and storage of my personal data as described herein.
              </label>
            </div>
            <button
              onClick={handleAccept}
              disabled={!agreed}
              className={`w-full px-6 py-3 rounded-full font-medium text-base ${
                agreed
                  ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
                  : 'bg-stone-200 text-stone-500 cursor-not-allowed'
              } transition-all duration-300`}
            >
              {agreed ? (
                <>
                  <FiCheck className="inline mr-2" />
                  Accept & Continue
                </>
              ) : (
                'Please Accept Privacy Policy'
              )}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center text-stone-500 text-xs">
            <FiMail className="mr-1" />
            saurabhjhadesigns@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}