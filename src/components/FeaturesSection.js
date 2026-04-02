import React from 'react';
import { PenTool, Layout, Download, ShieldCheck, Zap, LineChart } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <PenTool size={24} className="text-blue-500" />,
      title: "Smart Text Editor",
      desc: "Autocompletes your sentences with industry-specific keywords to maximize your visibility to recruiters."
    },
    {
      icon: <Layout size={24} className="text-purple-500" />,
      title: "Dynamic Templates",
      desc: "Switch between Minimal, Executive, and Creative formats without losing a single character of your data."
    },
    {
      icon: <Download size={24} className="text-green-500" />,
      title: "One-Click Export",
      desc: "Download your beautifully formatted resume instantly as a high-quality, ATS-optimized PDF document."
    },
    {
      icon: <ShieldCheck size={24} className="text-orange-500" />,
      title: "Cloud Synced",
      desc: "Your data is securely saved in the cloud. Access and edit your professional profile from anywhere."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50/50 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Descriptive Part */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 lg:pr-10">
          <div className="inline-block bg-blue-50 text-blue-600 font-bold text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full w-max">
            Core Features
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1625] leading-tight tracking-tight">
            Everything you need to <span className="text-blue-600 line-through decoration-2 decoration-blue-200">write</span> <span className="bg-blue-600 text-white px-2 mt-2 inline-block -rotate-2 transform">forge</span> your resume
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed mb-4">
            Powerful tools disguised under a remarkably simple interface. Our platform handles the formatting, typography, and structure so you can focus entirely on showcasing your accomplishments.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mt-6">
            {features.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h4 className="font-extrabold text-[#1a1625] text-lg mt-2">{item.title}</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Representation */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
           <div className="w-full max-w-[500px] h-[500px] relative">
              
              {/* Central Phone Mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[550px] bg-[#1a1625] rounded-[3rem] shadow-2xl overflow-hidden border-8 border-[#1a1625] z-20">
                 {/* Fake Screen */}
                 <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col relative">
                    <div className="h-6 w-full bg-[#1a1625] absolute top-0 flex items-center justify-center z-30">
                       <div className="w-24 h-4 bg-black rounded-b-xl border border-[#1a1625]"></div>
                    </div>
                    {/* Fake UI Content */}
                    <div className="pt-10 px-4 flex flex-col gap-4">
                       <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mt-4 mb-2 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500 opacity-50"></div>
                       </div>
                       <div className="w-3/4 h-3 bg-gray-200 rounded-full mx-auto"></div>
                       <div className="w-1/2 h-2 bg-gray-100 rounded-full mx-auto"></div>
                       <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="h-20 bg-blue-50 rounded-xl border border-blue-100 p-2 flex flex-col gap-2">
                             <div className="w-6 h-6 bg-white rounded-full"></div>
                             <div className="w-full h-1 bg-blue-200 mt-auto rounded-full"></div>
                          </div>
                          <div className="h-20 bg-purple-50 rounded-xl border border-purple-100 p-2 flex flex-col gap-2">
                             <div className="w-6 h-6 bg-white rounded-full"></div>
                             <div className="w-full h-1 bg-purple-200 mt-auto rounded-full"></div>
                          </div>
                       </div>
                       <div className="mt-4 flex flex-col gap-2">
                          <div className="w-full h-10 bg-gray-50 rounded-lg flex items-center px-3 gap-2">
                             <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                             <div className="w-20 h-1 bg-gray-200 rounded-full"></div>
                          </div>
                          <div className="w-full h-10 bg-gray-50 rounded-lg flex items-center px-3 gap-2">
                             <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                             <div className="w-24 h-1 bg-gray-200 rounded-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Orbiting Feature Icons */}
              <div className="absolute top-[20%] right-[-10%] bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float-delayed-1 z-30 border border-gray-100">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500"><Zap size={20} /></div>
                <div className="pr-2 hidden sm:block">
                  <div className="font-extrabold text-[#1a1625] text-xs">Real-Time Sync</div>
                </div>
              </div>

              <div className="absolute bottom-[20%] left-[-5%] bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-[float_5s_ease-in-out_infinite_2s] z-30 border border-gray-100">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500"><LineChart size={20} /></div>
                <div className="pr-2 hidden sm:block">
                  <div className="font-extrabold text-[#1a1625] text-xs">Smart Prompts</div>
                </div>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
}
