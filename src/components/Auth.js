import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import FloatingResumeGraphic from './FloatingResumeGraphic';

export default function Auth({ onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name, dob);
      }
    } catch (err) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      } else {
        errorMessage = err.message ? err.message.replace(/Firebase:\s*Error\s*\(auth\/[^)]+\)\.?/i, '').trim() : '';
        if (!errorMessage) {
          errorMessage = 'Authentication failed. Please check your details and try again.';
        }
      }
      
      setError(errorMessage);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white relative">
      {onBack && (
        <button 
          onClick={onBack} 
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 font-medium hover:text-blue-600 transition-colors cursor-pointer bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-100 z-50"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>
      )}

      {/* Left side: Hero Graphic */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-slate-50 relative overflow-hidden border-r border-gray-100 pt-20 pb-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="text-center z-10 mb-8 max-w-lg px-8 mt-12">
          <h1 className="text-4xl xl:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">Craft a <span className="text-blue-600">standout</span> resume</h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">Join thousands of professionals landing their dream jobs with our AI-powered intelligent builder.</p>
        </div>
        
        <div className="flex-1 w-full flex items-center justify-center transform scale-90 xl:scale-100">
          <FloatingResumeGraphic />
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 font-bold text-2xl mb-12 text-gray-900 justify-center">
            <div className="w-6 h-6 border-[5px] border-blue-600 rounded-full shadow-sm"></div>
            ResumeForge
          </div>
          
          <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 text-center border border-red-100 items-center justify-center flex flex-col gap-1 shadow-sm">
              <span className="block">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50/50 border border-gray-200 text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-4 rounded-xl outline-none transition-all font-medium w-full shadow-sm hover:border-gray-300" 
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Date of Birth</label>
                  <input 
                    type="date" 
                    required={!isLogin}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="bg-gray-50/50 border border-gray-200 focus:bg-white text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-4 rounded-xl outline-none transition-all font-medium w-full shadow-sm hover:border-gray-300" 
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-4 rounded-xl outline-none transition-all font-medium w-full text-gray-800 shadow-sm hover:border-gray-300" 
                placeholder="you@example.com"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center pr-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
                {isLogin && <a href="#" className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline">Forgot?</a>}
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-4 rounded-xl outline-none transition-all font-medium w-full text-gray-800 shadow-sm hover:border-gray-300" 
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all mt-2 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : isLogin ? 'Sign In to Dashboard' : 'Create Free Account'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center text-sm font-medium text-gray-500">
            {isLogin ? "New to ResumeForge? " : "Already have an account? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="text-blue-600 font-bold hover:underline transition-colors"
            >
              {isLogin ? 'Sign up for free' : 'Sign in to your account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
