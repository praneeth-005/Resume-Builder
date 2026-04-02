import React from 'react';
import { User, FileText, Briefcase, Mail, Phone, Layout, ChevronRight, CheckCircle, BarChart3, PieChart, Star } from 'lucide-react';

export default function FloatingResumeGraphic() {
  return (
    <div className="relative w-full max-w-[650px] h-[650px] flex items-center justify-center pointer-events-none">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-dashed border-blue-200/50 rounded-full animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-dashed border-blue-200/40 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

      {/* Main Resume Document */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[480px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col overflow-hidden animate-float z-20">
        
        {/* Header */}
        <div className="bg-blue-600 h-28 w-full p-6 flex items-start justify-between relative overflow-hidden">
          <div className="absolute right-[-20%] top-[-50%] w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="flex gap-4 items-center z-10 w-full">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <User size={30} className="text-gray-300" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="w-3/4 h-3.5 bg-white/90 rounded-full"></div>
              <div className="w-1/2 h-2.5 bg-blue-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Form Details */}
        <div className="flex-1 p-6 flex flex-col gap-5 bg-white">
          <div className="flex gap-3 items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Briefcase size={12} /></div>
            <div className="w-full h-2 bg-gray-100 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-1/3 h-2 bg-gray-200 rounded-full mb-1"></div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
            <div className="w-5/6 h-1.5 bg-gray-100 rounded-full"></div>
            <div className="w-4/5 h-1.5 bg-gray-100 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col gap-2 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
               <div className="w-2/3 h-2 bg-gray-200 rounded-full mb-1"></div>
               <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
               <div className="w-4/5 h-1.5 bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-2 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
               <div className="w-2/3 h-2 bg-gray-200 rounded-full mb-1"></div>
               <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
               <div className="w-4/5 h-1.5 bg-gray-100 rounded-full"></div>
            </div>
          </div>

          <div className="mt-auto w-full h-6 bg-blue-50 rounded-md border border-blue-100 flex items-center px-4">
             <div className="w-1/3 h-1.5 bg-blue-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements (Smaller App-like cards) */}

      {/* Top Right: ATS Score */}
      <div className="absolute top-[10%] right-[15%] w-44 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 text-sm animate-float-delayed-1 z-30 flex items-center gap-3">
        <div className="relative w-10 h-10">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
             <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
             <path className="text-green-500" strokeDasharray="90, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-[#1a1625] text-xs">90</div>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[#1a1625] text-xs">ATS Score</span>
          <span className="text-[10px] text-green-500 font-bold">Excellent</span>
        </div>
      </div>

      {/* Top Left: Graph */}
      <div className="absolute top-[25%] left-[5%] bg-white p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 animate-[float_7s_ease-in-out_infinite_1s] z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={14} className="text-blue-500" />
          <span className="text-xs font-bold text-gray-500">Profile Views</span>
        </div>
        <div className="flex items-end gap-1 h-12 mt-1">
          <div className="w-3 bg-blue-100 rounded-t-sm h-1/3"></div>
          <div className="w-3 bg-blue-200 rounded-t-sm h-1/2"></div>
          <div className="w-3 bg-blue-300 rounded-t-sm h-2/3"></div>
          <div className="w-3 bg-blue-400 rounded-t-sm h-[80%]"></div>
          <div className="w-3 bg-blue-600 rounded-t-sm h-full relative">
            <span className="absolute -top-4 -left-2 text-[8px] font-bold text-blue-600">+45%</span>
          </div>
        </div>
      </div>

      {/* Bottom Right: Interview Invite */}
      <div className="absolute bottom-[20%] right-[5%] bg-[#1a1625] p-4 rounded-2xl shadow-xl border border-gray-800 animate-float-delayed-2 z-30 max-w-[200px] flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
          <Mail size={14} className="text-green-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-xs mb-0.5">Interview Invite</span>
          <span className="text-[10px] text-gray-400 leading-tight">Google has requested an interview based on your resume.</span>
        </div>
      </div>

      {/* Bottom Left: Templates */}
      <div className="absolute bottom-[10%] left-[10%] bg-white p-3 rounded-xl shadow-xl border border-gray-100 animate-[float_6s_ease-in-out_infinite_2.5s] z-30 flex items-center gap-3">
         <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center"><Layout size={14} className="text-gray-400"/></div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center translate-y-2"><Layout size={14} className="text-blue-400"/></div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 border-2 border-white shadow-sm flex items-center justify-center"><Layout size={14} className="text-purple-400"/></div>
         </div>
      </div>

    </div>
  );
}
