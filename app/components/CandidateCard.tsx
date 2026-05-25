"use client";

import { MapPin, Briefcase, Star, ArrowRight } from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  status: string;
  rating: number;
  skills: string[];
  techStack: string[];
  overallScore: number;
};

type CandidateCardProps = {
  candidate: Candidate;
  onSelect: (c: Candidate) => void;
};

const STATUS_THEME: Record<string, { text: string; bg: string; dot: string }> = {
  "Shortlisted": { text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20", dot: "bg-emerald-500" },
  "Under Review": { text: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20", dot: "bg-amber-500" },
  "New": { text: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20", dot: "bg-indigo-500" },
  "Rejected": { text: "text-rose-700 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20", dot: "bg-rose-500" },
};

export default function CandidateCard({ candidate, onSelect }: CandidateCardProps) {
  const statusInfo = STATUS_THEME[candidate.status] || STATUS_THEME["New"];
  
  // Score indicator configurations
  const scoreColorClass =
    candidate.overallScore >= 85
      ? "stroke-emerald-500"
      : candidate.overallScore >= 70
      ? "stroke-amber-500"
      : "stroke-rose-500";

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (candidate.overallScore / 100) * circumference;

  // Programmatic Avatar Color
  const initials = candidate.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = [
    { bg: "bg-indigo-500/10 dark:bg-indigo-500/15", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/20" },
    { bg: "bg-emerald-500/10 dark:bg-emerald-500/15", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20" },
    { bg: "bg-cyan-500/10 dark:bg-cyan-500/15", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/20" },
    { bg: "bg-amber-500/10 dark:bg-amber-500/15", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20" },
    { bg: "bg-rose-500/10 dark:bg-rose-500/15", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500/20" },
  ];
  const avatarTheme = colors[candidate.name.charCodeAt(0) % colors.length];

  return (
    <div
      onClick={() => onSelect(candidate)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow card-shadow-hover transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 animate-fade-in"
    >
      <div className="flex items-start md:items-center gap-4 min-w-0 flex-1">
        {/* Initials Avatar */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${avatarTheme.bg} ${avatarTheme.text} ${avatarTheme.border}`}>
          {initials}
        </div>

        {/* Profile Details */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-base">
              {candidate.name}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.bg} ${statusInfo.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
              {candidate.status}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap mb-3.5">
            <span className="text-slate-800 dark:text-slate-200">{candidate.role}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              {candidate.experience}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {candidate.location}
            </span>
          </p>

          {/* Technical Skills Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {candidate.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-950/60"
              >
                {tech}
              </span>
            ))}
            {candidate.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-slate-800"
              >
                {skill}
              </span>
            ))}
            {candidate.skills.length > 3 && (
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium pl-1">
                +{candidate.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ratings & Score Rings */}
      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0 shrink-0">
        <div className="flex flex-col items-start md:items-end gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Assessment Score
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= candidate.rating
                    ? "text-amber-500 fill-amber-500"
                    : "text-slate-200 dark:text-slate-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Circular SVG Rating */}
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-full h-full -rotate-90">
            {/* Background Trail Circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800 fill-none"
              strokeWidth="3.5"
            />
            {/* Value Progress Circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              className={`fill-none transition-all duration-500 ${scoreColorClass}`}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-[13px] text-slate-800 dark:text-white leading-none">
            {candidate.overallScore}
            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-medium">/100</span>
          </div>
        </div>

        {/* Hover Arrow (Desktop) */}
        <div className="hidden md:flex w-8 h-8 rounded-full border border-slate-200/60 dark:border-slate-800 items-center justify-center text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/5 transition-all duration-300">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
