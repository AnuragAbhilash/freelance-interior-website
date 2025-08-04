'use client';

import React from 'react';
import { 
  FiPenTool,
  FiShield,
  FiDollarSign,
  FiLayers,
  FiCheckCircle,
  FiFileText,
  FiMail
} from 'react-icons/fi';

interface Section {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function TermsOfService() {
  const sections: Section[] = [
    {
      title: "Design Services",
      icon: <FiPenTool className="text-amber-600" />,
      content: (
        <>
          <p className="text-stone-700 leading-relaxed">
            Our bespoke design solutions combine traditional craftsmanship with contemporary 
            methodologies. All intellectual property remains with the studio until final payment.
          </p>
          <div className="mt-4 p-4 border border-stone-200 rounded-lg bg-stone-50">
            <p className="text-sm text-stone-600 italic font-serif">
              "Each design carries our signature aesthetic, carefully tailored for your unique space."
            </p>
          </div>
        </>
      )
    },
    {
      title: "Client Responsibilities", 
      icon: <FiCheckCircle className="text-amber-600" />,
      content: (
        <ul className="space-y-3">
          {[
            "Accurate site measurements and specifications",
            "Timely feedback during review cycles",
            "Adherence to agreed design parameters"
          ].map((item, i) => (
            <li key={i} className="flex items-start text-stone-700">
              <FiCheckCircle className="mt-0.5 mr-2 flex-shrink-0 text-amber-500 text-sm" />
              {item}
            </li>
          ))}
        </ul>
      )
    },
    {
      title: "Material Specifications",
      icon: <FiLayers className="text-amber-600" />,
      content: (
        <>
          <p className="text-stone-700 leading-relaxed">
            Handcrafted elements may exhibit natural variations in texture and finish, 
            which we consider inherent to their authentic character.
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            {[
              { name: "Terracotta", icon: "🟤" },
              { name: "Reclaimed Wood", icon: "🪵" }, 
              { name: "Handloom", icon: "🧵" }
            ].map((material) => (
              <div key={material.name} className="p-2 bg-stone-100 rounded">
                <div className="text-xs font-medium text-stone-600">{material.name}</div>
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      title: "Payment Terms",
      icon: <FiDollarSign className="text-amber-600" />,
      content: (
        <div className="space-y-2 text-stone-700">
          <div className="flex justify-between items-center py-2 border-b border-stone-200">
            <span>Initial Deposit</span>
            <span className="font-medium">50%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-stone-200">
            <span>Balance Payment</span>
            <span className="font-medium">Upon Completion</span>
          </div>
          <div className="pt-2 text-sm text-stone-500">
            All payments processed in INR via secure payment gateways
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <FiFileText className="text-3xl sm:text-4xl text-amber-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-800 mb-2">
            Terms of Service
          </h1>
          <p className="text-stone-500 font-light text-sm sm:text-base">
            Effective {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {sections.map((section, index) => (
            <section 
              key={index}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-sm border border-stone-200 hover:border-amber-300 transition-all"
            >
              <div className="flex items-start">
                <div className="mr-3 sm:mr-4 mt-0.5">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl md:text-xl font-serif text-stone-800 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span>{section.title}</span>
                    <span className="text-stone-400 text-xs sm:text-sm font-sans mt-1 sm:mt-0">
                      {index + 1}/{sections.length}
                    </span>
                  </h2>
                  <div className="text-stone-600 text-sm sm:text-base">
                    {section.content}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-stone-200 text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <FiShield className="text-amber-600" />
          </div>
          <p className="text-stone-600 mb-3 sm:mb-4 text-sm sm:text-base">
            By engaging our services, you agree to these terms
          </p>
          <div className="flex items-center justify-center text-stone-500 text-xs sm:text-sm">
            <FiMail className="mr-1 sm:mr-2" />
            For any queries, please contact us at saurabhjhadesigns@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}