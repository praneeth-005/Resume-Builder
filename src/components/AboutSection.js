import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Visual Representation */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[500px] h-[500px]">
            {/* Background blob */}
            <div className="absolute inset-0 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            
            {/* Center Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full shadow-2xl border border-gray-100 flex items-center justify-center z-20">
              <div className="w-48 h-48 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-inner">
                <Target size={64} className="opacity-90" />
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 animate-[float_5s_ease-in-out_infinite] z-30">
              <Users size={32} className="text-purple-500" />
            </div>
            
            <div className="absolute bottom-[15%] right-[5%] w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-100 animate-[float_6s_ease-in-out_infinite_1s] z-30">
               <TrendingUp size={40} className="text-green-500" />
            </div>
            
            <div className="absolute top-[30%] right-[-5%] w-16 h-16 bg-blue-100 rounded-full shadow-lg flex items-center justify-center animate-[float_4s_ease-in-out_infinite_2s] z-10">
               <div className="w-8 h-8 bg-blue-500 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Descriptive Part */}
        <div className="flex flex-col gap-6 lg:pl-10">
          <div className="inline-block bg-purple-50 text-purple-600 font-bold text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full w-max">
            About Our Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1625] leading-tight tracking-tight">
            Designed to elevate your <span className="text-purple-600">career trajectory</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            ResumeForge was built with a singular objective: to bridge the gap between talented professionals and their dream opportunities. In today's competitive job market, a standard document isn't enough.
          </p>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-blue-600 font-black text-xl">1</span>
              </div>
              <div>
                <h4 className="font-extrabold text-[#1a1625] text-lg">AI-Powered insights</h4>
                <p className="text-gray-500 font-medium text-sm mt-1">Our intelligent algorithms analyze your inputs and suggest powerful action verbs mapping directly to job descriptions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-2">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-purple-600 font-black text-xl">2</span>
              </div>
              <div>
                <h4 className="font-extrabold text-[#1a1625] text-lg">Architected for ATS</h4>
                <p className="text-gray-500 font-medium text-sm mt-1">Every template is verified against rigorous Application Tracking Systems standards to ensure you never get filtered out automatically.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
