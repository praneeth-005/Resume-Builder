import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Executive } from './templates/Executive';
import { Minimal } from './templates/Minimal';
import { Creative } from './templates/Creative';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import { useAuth } from './contexts/AuthContext';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const POWER_VERBS = [
  'led', 'managed', 'orchestrated', 'spearheaded', 'developed', 'designed', 'optimized', 
  'accelerated', 'increased', 'decreased', 'reduced', 'improved', 'implemented', 'created', 
  'launched', 'delivered', 'achieved', 'driven', 'conceptualized', 'mentored', 'resolved'
];

const INDUSTRY_KEYWORDS = [
  'agile', 'scrum', 'ui/ux', 'design system', 'analytics', 'data', 'cloud', 'architecture', 
  'strategy', 'leadership', 'b2b', 'b2c', 'saas', 'enterprise', 'retention', 'conversion', 
  'roi', 'cross-functional', 'stakeholder', 'api', 'react', 'node', 'python', 'marketing', 'sales'
];

export default function App() {
  const { currentUser, logout } = useAuth();
  const [activeTemplate, setActiveTemplate] = useState('executive');
  const [activeSection, setActiveSection] = useState('profile');
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  
  const defaultData = {
    personal: {
      firstName: 'Arjun',
      lastName: 'Sharma',
      jobTitle: 'Senior Product Designer',
      email: 'arjun@email.com',
      location: 'Hyderabad, IN',
      linkedin: 'linkedin.com/in/arjun'
    },
    completedSections: [],
    objective: 'Passionate and detail-oriented Senior Product Designer with 5+ years of experience in creating user-centered digital products. Proven track record of spearheading design systems and boosting user retention.',
    experience: [
      {
        id: 1,
        title: 'Senior Product Designer',
        company: 'Infosys Digital',
        startDate: '2022',
        endDate: 'Present',
        description: 'Led dashboard redesign, boosting retention 34%\nShipped design system across 8 products'
      },
      {
        id: 2,
        title: 'UI/UX Designer',
        company: 'Wipro Technologies',
        startDate: '2019',
        endDate: '2021',
        description: 'Mobile-first UI for 4 enterprise clients\nReduced onboarding drop-off by 22%'
      }
    ],
    education: [
      { id: 1, degree: 'B.Des. Design', school: 'NID Hyderabad', date: '2013 — 2017' }
    ],
    skills: [
      { id: 1, name: 'Figma' },
      { id: 2, name: 'UX Research' },
      { id: 3, name: 'Prototyping' },
      { id: 4, name: 'Design Sys.' },
      { id: 5, name: 'A/B Testing' },
    ],
    projects: [
      { id: 1, name: 'Enterprise Analytics Dashboard', link: 'github.com/arjun/dash', description: 'Designed a comprehensive analytics dashboard for Fortune 500 clients, resulting in a 40% increase in daily active users.' }
    ],
    certificates: [
      { id: 1, name: 'Google UX Design Professional Certificate', issuer: 'Coursera', date: '2021' }
    ]
  };

  const [resumeData, setResumeData] = useState(defaultData);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             const parsed = docSnap.data().resumeData;
             if (parsed) {
               setResumeData({
                 ...defaultData,
                 ...parsed,
                 personal: { ...defaultData.personal, ...(parsed.personal || {}) },
                 projects: parsed.projects || defaultData.projects,
                 certificates: parsed.certificates || defaultData.certificates,
                 objective: parsed.objective !== undefined ? parsed.objective : defaultData.objective,
                 completedSections: parsed.completedSections || []
               });
             }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setIsDataLoaded(true);
      };
      fetchUserData();
    } else {
      setIsDataLoaded(true);
    }
  }, [currentUser]);

  const saveDraft = async () => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        resumeData: resumeData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 3000);
    } catch (e) {
      showWarning("Failed to save to cloud.");
    }
  };

  const showWarning = (msg) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(''), 3000);
  };

  const isProfileComplete = () => {
    const p = resumeData.personal || {};
    return (p.firstName||'').trim() && (p.lastName||'').trim() && (p.jobTitle||'').trim() && (p.email||'').trim() && (p.location||'').trim();
  };

  const handleSectionClick = (section) => {
    // Enforce profile completion before moving anywhere else
    if (section !== 'profile' && !isProfileComplete()) {
      showWarning("⚠ Please complete all required Profile details before proceeding.");
      return;
    }
    setActiveSection(section);
  };

  const handleNext = (currentSection, nextSection) => {
    if (currentSection === 'profile' && !isProfileComplete()) {
      showWarning("⚠ Please complete all required Profile details before proceeding.");
      return;
    }
    
    // Mark current section as completed
    setResumeData(prev => ({
      ...prev,
      completedSections: prev.completedSections?.includes(currentSection) 
        ? prev.completedSections 
        : [...(prev.completedSections || []), currentSection]
    }));
    
    if (nextSection) {
      handleSectionClick(nextSection);
    } else {
      saveDraft(); // Finish button
    }
  };

  const [enhancingField, setEnhancingField] = useState(null);

  const enhanceWithAI = (type, currentText, id = null) => {
    if (!currentText || !currentText.trim()) return;
    const fieldKey = id ? `${type}-${id}` : type;
    setEnhancingField(fieldKey);
    
    setTimeout(() => {
      let coreText = currentText;
      if (type === 'objective') {
        coreText = coreText.replace('Passionate and driven professional with a proven track record of excellence. ', '');
        coreText = coreText.replace(' Committed to delivering innovative solutions and driving organizational success.', '');
        const enhancedText = `Passionate and driven professional with a proven track record of excellence. ${coreText} Committed to delivering innovative solutions and driving organizational success.`;
        setResumeData(prev => ({ ...prev, objective: enhancedText }));
      } else if (type === 'experience') {
        coreText = coreText.replace('Orchestrated key operations: ', '');
        coreText = coreText.replace('. Optimized processes to increase productivity and efficiency by 30%.', '');
        const enhancedText = `Orchestrated key operations: ${coreText}. Optimized processes to increase productivity and efficiency by 30%.`;
        handleArrayChange('experience', id, 'description', enhancedText);
      } else if (type === 'projects') {
        coreText = coreText.replace('Conceptualized and executed: ', '');
        coreText = coreText.replace('. Leveraged cutting-edge methodologies to exceed benchmarks and user expectations.', '');
        const enhancedText = `Conceptualized and executed: ${coreText}. Leveraged cutting-edge methodologies to exceed benchmarks and user expectations.`;
        handleArrayChange('projects', id, 'description', enhancedText);
      }
      setEnhancingField(null);
    }, 1500);
  };

  const calculateATSScore = () => {
    let score = 0;
    const { personal, objective, experience, education, skills, projects } = resumeData;
    
    // 1. Formatting & Completion Base (Max 40 points)
    let completionScore = 0;
    if ((personal.firstName||'').trim() && (personal.lastName||'').trim()) completionScore += 5;
    if ((personal.email||'').trim().includes('@')) completionScore += 5;
    if ((personal.jobTitle||'').trim()) completionScore += 5;
    if ((personal.location||'').trim()) completionScore += 5;
    if ((personal.linkedin||'').trim()) completionScore += 5;

    if (education && education.length > 0 && education[0].degree) completionScore += 5;
    if (skills && skills.length > 0 && skills[0].name) completionScore += 5;
    if (projects && projects.length > 0 && projects[0].name) completionScore += 5;
    
    score += Math.min(40, completionScore);

    // Prepare text corpus for analysis from core sections
    const allText = [
      objective || '',
      ...(experience || []).map(e => e.description || ''),
      ...(projects || []).map(p => p.description || '')
    ].join(' ').toLowerCase();

    // 2. Quantitative Impact (Max 30 points)
    // Matches digits, percentages, financial figures (e.g., 34%, $5M, 8 products)
    const numberMatches = allText.match(/\b\d+%?|\$\d+/g) || [];
    // Give 5 points per quantitative metric found, max 30 points
    const impactScore = Math.min(30, numberMatches.length * 5);
    score += impactScore;

    // 3. Verb Strength (Max 20 points)
    let verbHits = 0;
    POWER_VERBS.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'g');
      if (regex.test(allText)) verbHits += 1;
    });
    // Give 4 points per unique power verb used, max 20 points
    const verbScore = Math.min(20, verbHits * 4);
    score += verbScore;

    // 4. Keyword Density (Max 10 points)
    let keywordHits = 0;
    INDUSTRY_KEYWORDS.forEach(kw => {
      if (allText.includes(kw)) keywordHits += 1;
    });
    // Factor in defined explicit skills
    if (skills && skills.length > 0) {
      keywordHits += skills.length;
    }
    // Give 2 points per valuable keyword/skill, max 10 points
    const keywordScore = Math.min(10, keywordHits * 2);
    score += keywordScore;

    return Math.min(100, Math.round(score));
  };

  const atsScore = calculateATSScore();

  // --- Handlers ---
  const handlePersonalChange = (field, value) => {
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const handleArrayChange = (arrayName, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setResumeData(prev => ({
      ...prev,
      [arrayName]: [{ id: Date.now(), ...template }, ...prev[arrayName]]
    }));
  };

  const removeArrayItem = (arrayName, id) => {
    setResumeData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter(item => item.id !== id)
    }));
  };

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'minimal': return <Minimal data={resumeData} />;
      case 'creative': return <Creative data={resumeData} />;
      default: return <Executive data={resumeData} />;
    }
  };

  const SectionItem = ({ id, icon, title, isComplete }) => {
    const isActive = activeSection === id;
    
    const wrapperClass = isActive 
      ? 'bg-blue-50 border-blue-100 text-blue-700 shadow-sm' 
      : 'border-transparent hover:bg-slate-50 text-gray-500 hover:text-gray-800';
      
    const iconBg = isActive ? 'bg-blue-100/70' : 'bg-gray-100/80';
    const iconText = isActive ? 'text-blue-600' : 'text-gray-500';

    return (
      <div 
        onClick={() => handleSectionClick(id)}
        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${wrapperClass}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${iconBg} ${iconText} transition-colors`}>
            {icon}
          </div>
          <span className={`font-medium tracking-tight ${isActive ? 'font-bold text-blue-700' : ''}`}>{title}</span>
        </div>
        {isComplete ? (
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs shadow-sm shadow-blue-200 shrink-0">✓</div>
        ) : (
          <div className="w-5 h-5 rounded-full border border-gray-200 shrink-0"></div>
        )}
      </div>
    );
  };

  if (!currentUser) {
    if (showAuth) {
      return <Auth onBack={() => setShowAuth(false)} />;
    }
    return <LandingPage onStart={() => setShowAuth(true)} />;
  }

  if (!isDataLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl font-bold text-gray-500">Loading your workspace...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col font-sans text-gray-900 bg-slate-50 overflow-hidden relative">
      {/* Success Toast */}
      {showSaveMessage && (
        <div className="fixed top-24 right-8 bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded-xl shadow-2xl font-medium flex items-center gap-3 z-50">
          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm shadow-[0_0_12px_rgba(34,197,94,0.4)]">✓</div>
          Resume Draft Saved Successfully!
        </div>
      )}

      {/* Warning Toast */}
      {warningMessage && (
        <div className="fixed top-24 right-8 bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded-xl shadow-2xl font-medium flex items-center gap-3 z-50 animate-bounce">
          <div className="w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center text-lg font-bold">!</div>
          {warningMessage}
        </div>
      )}

      {/* Top Nav */}
      <header className="h-[76px] bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 shrink-0 relative z-30 shadow-sm">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 font-black tracking-tight text-xl text-gray-900">
            <div className="w-5 h-5 border-[4px] border-blue-600 rounded-full"></div>
            ResumeForge
          </div>
          

        </div>

        <div className="flex items-center gap-5">
          {currentUser && <span className="text-xs font-bold text-gray-400 mr-2 hidden md:block">{currentUser.email}</span>}
          <button onClick={logout} className="text-gray-400 hover:text-red-500 transition text-[11px] font-bold uppercase tracking-wider cursor-pointer pr-4 border-r border-gray-200">Log Out</button>
          <button onClick={saveDraft} className="px-5 py-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-bold cursor-pointer">Save to Cloud</button>
          <button onClick={() => window.print()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm shadow-blue-500/30 transition flex items-center gap-2 text-sm font-bold cursor-pointer">Download PDF <span>↓</span></button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[320px] bg-white border-r border-gray-100 flex flex-col shrink-0 z-20">
          <div className="px-8 py-10 border-b border-gray-100 flex flex-col items-center justify-center bg-slate-50/50 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-[-20%] w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none -z-10"></div>
            <h3 className="text-[10px] font-bold text-gray-400 mb-6 tracking-widest w-full text-left uppercase">ATS Score</h3>
             <div className="relative w-32 h-32 mb-4 drop-shadow-sm">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke={atsScore > 75 ? "#2563eb" : atsScore > 50 ? "#60a5fa" : "#93c5fd"} strokeWidth="6" strokeDasharray={`${atsScore * 2.51} 251`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-black text-gray-900 tracking-tighter">{atsScore}</span>
                 <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Score</span>
               </div>
             </div>
             <p className="text-[11px] font-medium text-gray-400 text-center leading-relaxed">Score updates automatically as you fill out professional details.</p>
          </div>
          <div className="p-6 overflow-y-auto flex-1 pb-10">
            <h3 className="text-[10px] font-bold text-gray-400 mb-4 tracking-widest pl-2 uppercase">Builder Sections</h3>
            <div className="flex flex-col gap-2">
              <SectionItem id="profile" icon="👤" title="Personal Info" isComplete={resumeData.completedSections?.includes('profile')} />
              <SectionItem id="objective" icon="🎯" title="Objective" isComplete={resumeData.completedSections?.includes('objective')} />
              <SectionItem id="experience" icon="💼" title="Experience" isComplete={resumeData.completedSections?.includes('experience')} />
              <SectionItem id="education" icon="🎓" title="Education" isComplete={resumeData.completedSections?.includes('education')} />
              <SectionItem id="skills" icon="⚡" title="Skills" isComplete={resumeData.completedSections?.includes('skills')} />
              <SectionItem id="projects" icon="🚀" title="Projects" isComplete={resumeData.completedSections?.includes('projects')} />
              <SectionItem id="certificates" icon="🏆" title="Certificates" isComplete={resumeData.completedSections?.includes('certificates')} />
            </div>
          </div>
        </aside>

        {/* Middle Editor */}
        <main className="flex-1 bg-slate-50/50 p-10 overflow-y-auto relative pb-24">
          <div className="max-w-3xl mx-auto flex flex-col min-h-full">

            {activeSection === 'profile' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Personal Info</h1>
                <p className="text-gray-500 mb-8 font-medium">Add your contact details to get started. All fields denoted by * are required.</p>
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100 hover:border-blue-100 transition-colors">
                  <div className="grid grid-cols-2 gap-6 mb-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">First Name *</label>
                      <input type="text" value={resumeData.personal.firstName} onChange={(e) => handlePersonalChange('firstName', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl w-full outline-none transition-all font-medium hover:border-gray-300" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Last Name *</label>
                      <input type="text" value={resumeData.personal.lastName} onChange={(e) => handlePersonalChange('lastName', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl w-full outline-none transition-all font-medium hover:border-gray-300" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Title *</label>
                    <input type="text" value={resumeData.personal.jobTitle} onChange={(e) => handlePersonalChange('jobTitle', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl w-full outline-none transition-all font-medium hover:border-gray-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email *</label>
                      <input type="text" value={resumeData.personal.email} onChange={(e) => handlePersonalChange('email', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl w-full outline-none transition-all font-medium hover:border-gray-300" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Location *</label>
                      <input type="text" value={resumeData.personal.location} onChange={(e) => handlePersonalChange('location', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl w-full outline-none transition-all font-medium hover:border-gray-300" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Linkedin URL</label>
                    <input type="text" value={resumeData.personal.linkedin} onChange={(e) => handlePersonalChange('linkedin', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl w-full outline-none transition-all font-medium hover:border-gray-300" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={() => handleNext('profile', 'objective')} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">Next: Objective →</button>
                </div>
              </div>
            )}

            {activeSection === 'objective' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Career Objective</h1>
                <p className="text-gray-500 mb-8 font-medium">Write a brief summary of your career, success, and goals.</p>
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100 hover:border-blue-100 transition-colors">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Summary</label>
                      <button onClick={() => enhanceWithAI('objective', resumeData.objective)} disabled={!resumeData.objective || enhancingField === 'objective'} className="text-xs flex items-center gap-2 font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition-colors disabled:opacity-50 cursor-pointer">
                        {enhancingField === 'objective' ? '✨ Enhancing...' : '✨ Enhance with AI'}
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">AI will rewrite your objective to sound more impactful and professional.</p>
                    <textarea rows="6" value={resumeData.objective} onChange={(e) => setResumeData(prev => ({...prev, objective: e.target.value}))} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-4 rounded-xl w-full outline-none transition-all font-medium leading-relaxed resize-y hover:border-gray-300"></textarea>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setActiveSection('profile')} className="px-6 py-3.5 text-gray-500 font-bold hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">← Back</button>
                  <button onClick={() => handleNext('objective', 'experience')} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">Next: Experience →</button>
                </div>
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Work Experience</h1>
                <div className="flex items-center justify-between mb-8">
                   <p className="text-gray-500 font-medium">Add your professional history.</p>
                   <button onClick={() => addArrayItem('experience', {title: '', company: '', startDate: '', endDate: '', description: ''})} className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-sm transition-all shadow-sm">+ Add New</button>
                </div>
                <div className="flex flex-col gap-6">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative group hover:border-blue-200 transition-colors">
                      <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all" title="Delete">
                         <Trash2 size={18} />
                      </button>
                      <div className="grid grid-cols-2 gap-6 mb-5 mt-2">
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Job Title</label><input type="text" value={exp.title} onChange={(e) => handleArrayChange('experience', exp.id, 'title', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Company</label><input type="text" value={exp.company} onChange={(e) => handleArrayChange('experience', exp.id, 'company', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Start Date</label><input type="text" value={exp.startDate} onChange={(e) => handleArrayChange('experience', exp.id, 'startDate', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">End Date</label><input type="text" value={exp.endDate} onChange={(e) => handleArrayChange('experience', exp.id, 'endDate', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Description</label>
                          <button onClick={() => enhanceWithAI('experience', exp.description, exp.id)} disabled={!exp.description || enhancingField === `experience-${exp.id}`} className="text-xs flex items-center gap-2 font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition-colors disabled:opacity-50 cursor-pointer">
                            {enhancingField === `experience-${exp.id}` ? '✨ Enhancing...' : '✨ Enhance with AI'}
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">AI will rewrite your description into strong, action-oriented bullet points.</p>
                        <textarea rows="5" value={exp.description} onChange={(e) => handleArrayChange('experience', exp.id, 'description', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-4 rounded-xl outline-none font-medium leading-relaxed hover:border-gray-300 transition-all"></textarea>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setActiveSection('objective')} className="px-6 py-3.5 text-gray-500 font-bold hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">← Back</button>
                  <button onClick={() => handleNext('experience', 'education')} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">Next: Education →</button>
                </div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Education</h1>
                <div className="flex items-center justify-between mb-8">
                   <p className="text-gray-500 font-medium">Add your academic background.</p>
                   <button onClick={() => addArrayItem('education', {degree: '', school: '', date: ''})} className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-sm transition-all shadow-sm">+ Add New</button>
                </div>
                <div className="flex flex-col gap-6">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative group hover:border-blue-200 transition-colors">
                      <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all" title="Delete">
                         <Trash2 size={18} />
                      </button>
                      <div className="grid grid-cols-2 gap-6 mb-2 mt-2">
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Degree / Program</label><input type="text" value={edu.degree} onChange={(e) => handleArrayChange('education', edu.id, 'degree', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">School / University</label><input type="text" value={edu.school} onChange={(e) => handleArrayChange('education', edu.id, 'school', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Date / Year</label><input type="text" value={edu.date} onChange={(e) => handleArrayChange('education', edu.id, 'date', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setActiveSection('experience')} className="px-6 py-3.5 text-gray-500 font-bold hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">← Back</button>
                  <button onClick={() => handleNext('education', 'skills')} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">Next: Skills →</button>
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Skills</h1>
                <div className="flex items-center justify-between mb-8">
                   <p className="text-gray-500 font-medium">Highlight your core skills.</p>
                   <button onClick={() => addArrayItem('skills', {name: ''})} className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-sm transition-all shadow-sm">+ Add New</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 relative flex items-center gap-4 hover:border-blue-200 transition-colors">
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Skill Name</label>
                        <input type="text" value={skill.name} onChange={(e) => handleArrayChange('skills', skill.id, 'name', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3 rounded-lg outline-none font-medium hover:border-gray-300 transition-all" />
                      </div>
                      <button onClick={() => removeArrayItem('skills', skill.id)} className="text-gray-300 hover:text-red-500 p-2 mt-5 rounded-full hover:bg-red-50 transition-colors" title="Delete">
                         <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setActiveSection('education')} className="px-6 py-3.5 text-gray-500 font-bold hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">← Back</button>
                  <button onClick={() => handleNext('skills', 'projects')} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">Next: Projects →</button>
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Projects</h1>
                <div className="flex items-center justify-between mb-8">
                   <p className="text-gray-500 font-medium">Add projects to showcase your practical experience.</p>
                   <button onClick={() => addArrayItem('projects', {name: '', link: '', description: ''})} className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-sm transition-all shadow-sm">+ Add New</button>
                </div>
                <div className="flex flex-col gap-6">
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative group hover:border-blue-200 transition-colors">
                      <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all" title="Delete">
                         <Trash2 size={18} />
                      </button>
                      <div className="grid grid-cols-2 gap-6 mb-5 mt-2">
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Project Name</label><input type="text" value={proj.name} onChange={(e) => handleArrayChange('projects', proj.id, 'name', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Project Link / URL</label><input type="text" value={proj.link} onChange={(e) => handleArrayChange('projects', proj.id, 'link', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Description</label>
                          <button onClick={() => enhanceWithAI('projects', proj.description, proj.id)} disabled={!proj.description || enhancingField === `projects-${proj.id}`} className="text-xs flex items-center gap-2 font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition-colors disabled:opacity-50 cursor-pointer">
                            {enhancingField === `projects-${proj.id}` ? '✨ Enhancing...' : '✨ Enhance with AI'}
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">AI will optimize your project details for maximum impact.</p>
                        <textarea rows="4" value={proj.description} onChange={(e) => handleArrayChange('projects', proj.id, 'description', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-4 rounded-xl outline-none font-medium leading-relaxed hover:border-gray-300 transition-all"></textarea>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setActiveSection('skills')} className="px-6 py-3.5 text-gray-500 font-bold hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">← Back</button>
                  <button onClick={() => handleNext('projects', 'certificates')} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">Next: Certificates →</button>
                </div>
              </div>
            )}

            {activeSection === 'certificates' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Certificates</h1>
                <div className="flex items-center justify-between mb-8">
                   <p className="text-gray-500 font-medium">List down your relevant certifications.</p>
                   <button onClick={() => addArrayItem('certificates', {name: '', issuer: '', date: ''})} className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-sm transition-all shadow-sm">+ Add New</button>
                </div>
                <div className="flex flex-col gap-6">
                  {resumeData.certificates.map((cert) => (
                    <div key={cert.id} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative group hover:border-blue-200 transition-colors">
                      <button onClick={() => removeArrayItem('certificates', cert.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all" title="Delete">
                         <Trash2 size={18} />
                      </button>
                      <div className="grid grid-cols-2 gap-6 mb-2 mt-2">
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Certificate Name</label><input type="text" value={cert.name} onChange={(e) => handleArrayChange('certificates', cert.id, 'name', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Issuer (e.g. Coursera)</label><input type="text" value={cert.issuer} onChange={(e) => handleArrayChange('certificates', cert.id, 'issuer', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                        <div className="flex flex-col gap-2"><label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Date / Year</label><input type="text" value={cert.date} onChange={(e) => handleArrayChange('certificates', cert.id, 'date', e.target.value)} className="bg-slate-50/50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-3.5 rounded-xl outline-none font-medium hover:border-gray-300 transition-all" /></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setActiveSection('projects')} className="px-6 py-3.5 text-gray-500 font-bold hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">← Back</button>
                  <button onClick={() => handleNext('certificates', null)} className="px-10 py-3.5 bg-gray-900 text-white rounded-xl font-bold transition-all shadow-lg shadow-gray-900/30 hover:bg-black hover:-translate-y-0.5">Finish & Save</button>
                </div>
              </div>
            )}

          </div>
        </main>

        {/* Right Preview Sidebar */}
        <aside className="w-[500px] bg-slate-100 flex flex-col shrink-0 z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] border-l border-gray-200">
          <div className="px-8 py-5 border-b border-gray-200 flex items-center justify-between bg-white/70 backdrop-blur-md">
            <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Live Preview</h3>
            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Auto-saving real time</span>
          </div>
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
            
            <div className="flex items-center gap-6 bg-slate-50/80 px-4 py-2 rounded-2xl mb-8 w-full justify-center">
              <span className="text-[11px] font-black text-gray-400 tracking-widest uppercase px-2">Template</span>
              <div className="flex gap-2 text-sm font-bold">
                <button onClick={() => setActiveTemplate('executive')} className={`px-6 py-2.5 rounded-xl transition-all ${activeTemplate === 'executive' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-900 border border-transparent' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'}`}>Executive</button>
                <button onClick={() => setActiveTemplate('minimal')} className={`px-6 py-2.5 rounded-xl transition-all ${activeTemplate === 'minimal' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-900 border border-transparent' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'}`}>Minimal</button>
                <button onClick={() => setActiveTemplate('creative')} className={`px-6 py-2.5 rounded-xl transition-all ${activeTemplate === 'creative' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-900 border border-transparent' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'}`}>Creative</button>
              </div>
            </div>

            <div id="resume-preview" className="w-full shadow-lg ring-1 ring-black/5 relative group">
              {renderTemplate()}
            </div>

            <div className="w-full bg-white/60 text-gray-400 p-4 rounded-xl mt-8 text-xs font-medium text-center border border-gray-200">
              Click <strong className="text-gray-500">Download PDF</strong> to save or print your document.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
