"use client";

import { useState } from "react";
import { X, Copy, Check, Info, Lock } from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  role: string;
  status: string;
};

type ShareModalProps = {
  candidate: Candidate;
  onClose: () => void;
};

export default function ShareModal({ candidate, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  // Generating a realistic mocked share link
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const shareLink = `${origin}/?shared=${candidate.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4 animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 card-shadow animate-scale-up relative">
        
        {/* Header Title Close */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
              Share Candidate Profile
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Customer will only see {candidate.name}'s assessment profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-100 dark:border-slate-800/80 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Small candidate card preview */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-sm shrink-0">
            {candidate.name.split(" ").map(w => w[0]).join("").toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{candidate.name}</h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 truncate">{candidate.role}</p>
          </div>
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-950/60 rounded-full">
            {candidate.status}
          </span>
        </div>

        {/* Input copy section */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Generated Client Link
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs text-slate-500 dark:text-slate-400 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shrink-0 shadow-sm ${
                copied
                  ? "bg-emerald-500 text-white shadow-emerald-500/15"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/15"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Security Warning box */}
        <div className="flex gap-3 p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-950/40 rounded-2xl text-xs text-amber-700 dark:text-amber-300">
          <Info className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <span className="font-bold flex items-center gap-1 text-[11px]">
              <Lock className="w-3 h-3 text-amber-500" />
              Isolated Client Protection Active
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Recruiter administration stats, candidate ratings, interview comments, and other applications are blocked in this view.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
