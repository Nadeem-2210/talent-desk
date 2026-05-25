"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

type LoginProps = {
  onLoginSuccess: () => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Mock Authentication Delay
    setTimeout(() => {
      if (email === "admin@talentdesk.com" && password === "admin123") {
        onLoginSuccess();
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDemoFill = () => {
    setEmail("admin@talentdesk.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-50 to-[#edf1f9] px-4 overflow-hidden">
      {/* Soft Pastel Light Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Login Container */}
      <div className="w-full max-w-md z-10 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-indigo-600 to-cyan-600 rounded-2xl shadow-md shadow-indigo-500/10 mb-3 animate-scale-up">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 mb-1.5">
            Talent<span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Desk</span>
          </h1>
          <p className="text-sm font-semibold text-slate-500">Secure Recruiter Assessment Portal</p>
        </div>

        {/* Light Glassmorphic Card */}
        <div className="glass-effect rounded-3xl p-8 card-shadow border border-slate-200 bg-white/95">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Admin Access</h2>
            <p className="text-xs text-slate-400 font-semibold">Sign in to manage candidates and client shares</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 animate-scale-up">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@talentdesk.com"
                  className="w-full pl-10.5 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 block">Security Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10.5 pr-11 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-indigo-600/15"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-semibold mb-2.5">Testing the application?</p>
            <button
              onClick={handleDemoFill}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-100 rounded-full text-[11px] text-indigo-600 font-bold transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              Click here to Auto-Fill Admin Credentials
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-6 font-semibold">
          TalentDesk Portal Security System © 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
}
