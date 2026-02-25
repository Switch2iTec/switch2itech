import React from "react";
import { User, Mail, Lock, Phone, Building, MapPin, Camera, ArrowRight } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="w-full max-w-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="p-8 pb-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Create an account</h2>
          <p className="text-slate-500 dark:text-zinc-500 mt-2">
            Enter your details below to set up your admin profile
          </p>
        </div>

        <div className="p-8 pt-0">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full border-2 border-dashed border-slate-300 dark:border-zinc-800 flex items-center justify-center bg-slate-50 dark:bg-zinc-950 overflow-hidden transition-all group-hover:border-indigo-500">
                  <Camera className="text-slate-400 group-hover:text-indigo-500 transition-colors" size={32} />
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-indigo-600 p-1.5 rounded-full text-white shadow-lg">
                  <Camera size={14} />
                </div>
              </div>
              <span className="mt-2 text-[10px] uppercase font-bold tracking-widest text-slate-400">Profile Picture</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                  <User size={14} className="text-indigo-500" /> Username
                </label>
                <input 
                  type="text"
                  placeholder="johndoe" 
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                  <Mail size={14} className="text-indigo-500" /> Email Address
                </label>
                <input 
                  type="email"
                  placeholder="name@example.com" 
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                  <Phone size={14} className="text-indigo-500" /> Phone Number
                </label>
                <input 
                  type="tel"
                  placeholder="+1 (555) 000-0000" 
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                  <Lock size={14} className="text-indigo-500" /> Password
                </label>
                <input 
                  type="password"
                  placeholder="••••••••" 
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                  <Building size={14} className="text-indigo-500" /> Company <span className="text-[10px] text-slate-400 font-normal ml-1">(Optional)</span>
                </label>
                <input 
                  type="text"
                  placeholder="Acme Inc." 
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                  <MapPin size={14} className="text-indigo-500" /> Address <span className="text-[10px] text-slate-400 font-normal ml-1">(Optional)</span>
                </label>
                <input 
                  type="text"
                  placeholder="123 Street, City" 
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
              </div>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20 dark:shadow-none mt-4 flex items-center justify-center cursor-pointer">
              Sign Up <ArrowRight className="ml-2" size={18} />
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-zinc-500">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline font-semibold">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;