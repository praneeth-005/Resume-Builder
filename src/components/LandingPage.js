import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import FloatingResumeGraphic from './FloatingResumeGraphic';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-[1400px] mx-auto z-50 relative">
        <div className="flex items-center gap-2 font-bold text-2xl text-[#1a1625]">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
             <span className="w-2.5 h-2.5 bg-white rounded-sm transform rotate-45"></span>
          </div>
          ResumeForge
        </div>
        <div className="hidden md:flex gap-10 text-sm font-bold text-gray-500">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Home</a>
          <a href="#about" className="hover:text-blue-600 transition tracking-wide">About</a>
          <a href="#features" className="hover:text-blue-600 transition tracking-wide">Features</a>
          <a href="#" className="hover:text-blue-600 transition tracking-wide">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onStart} className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 transition cursor-pointer">Login</button>
          <button onClick={onStart} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 cursor-pointer">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Background decorative soft glowing spots */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none -z-10"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[80px] opacity-60 pointer-events-none -z-10"></div>
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6 z-10 mt-8 lg:mt-0 lg:pr-10">
          <div className="inline-block bg-blue-50/80 border border-blue-100 text-blue-600 font-bold text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full w-max backdrop-blur-sm">
            ONLINE RESUME BUILDER
          </div>
          <h1 className="text-5xl lg:text-[4.5rem] font-extrabold text-[#1a1625] leading-[1.05] tracking-tight">
            Mastering the <br />
            <span className="text-blue-600 relative inline-block">
               Dream Job
               <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/40 -z-10 rounded-full"></span>
            </span> Hunt: <br />
            Your Ultimate <br />
            Guide
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-lg leading-relaxed mt-2">
            ResumeForge: Ace your career goals. Expert guidance, tailored templates, and insider tips for professionals targeting top positions at great companies.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,99,235,0.5)] transition-all duration-300 flex items-center justify-center gap-3 group w-max cursor-pointer"
            >
              Build my resume now 
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>

        {/* Right Column: Visuals */}
        <div className="relative z-10 flex justify-center lg:justify-end mt-16 lg:mt-0 w-full">
           <FloatingResumeGraphic />
        </div>
      </main>
      
      {/* Logos Section */}
      <section className="relative z-20 pt-10 pb-16 mt-8 border-t border-gray-50 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">Trusted by great companies</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 items-center">
            {/* Matching brand logo styles visually using text */}
            <div className="text-2xl font-extrabold tracking-tighter text-[#1a1625]">theguardian</div>
            <div className="text-2xl font-bold italic text-[#1a1625]">lifehacker</div>
            <div className="text-2xl font-black text-[#1a1625]">business.com</div>
            <div className="text-2xl font-serif font-bold text-[#1a1625]">Forbes</div>
            <div className="text-2xl font-black tracking-tighter text-[#1a1625]">HUFFPOST</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Features Section */}
      <FeaturesSection />

    </div>
  );
}
