"use client";

import { Users, Star, Clock, AlertCircle, TrendingUp } from "lucide-react";

type AnalyticsPanelProps = {
  candidates: Array<{
    status: string;
  }>;
};

export default function AnalyticsPanel({ candidates }: AnalyticsPanelProps) {
  const counts = {
    total: candidates.length,
    shortlisted: candidates.filter((c) => c.status === "Shortlisted").length,
    review: candidates.filter((c) => c.status === "Under Review").length,
    new: candidates.filter((c) => c.status === "New").length,
    rejected: candidates.filter((c) => c.status === "Rejected").length,
  };

  // Percentages for the pipeline bar
  const pctShortlisted = counts.total ? Math.round((counts.shortlisted / counts.total) * 100) : 0;
  const pctReview = counts.total ? Math.round((counts.review / counts.total) * 100) : 0;
  const pctNew = counts.total ? Math.round((counts.new / counts.total) * 100) : 0;
  const pctRejected = counts.total ? Math.round((counts.rejected / counts.total) * 100) : 0;

  const metrics = [
    {
      label: "Total Candidates",
      value: counts.total,
      icon: Users,
      color: "from-indigo-500/10 to-indigo-600/10 text-indigo-500 border-indigo-500/10",
      trend: "Overall pipeline",
    },
    {
      label: "Shortlisted",
      value: counts.shortlisted,
      icon: Star,
      color: "from-emerald-500/10 to-emerald-600/10 text-emerald-500 border-emerald-500/10",
      trend: `${pctShortlisted}% of total`,
    },
    {
      label: "Under Review",
      value: counts.review,
      icon: Clock,
      color: "from-amber-500/10 to-amber-600/10 text-amber-500 border-amber-500/10",
      trend: `${pctReview}% of total`,
    },
    {
      label: "New Applications",
      value: counts.new,
      icon: AlertCircle,
      color: "from-cyan-500/10 to-cyan-600/10 text-cyan-500 border-cyan-500/10",
      trend: "Requires screening",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wide uppercase">
                  {m.label}
                </span>
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${m.color} border shrink-0`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                  {m.value}
                </span>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 text-indigo-400" />
                  {m.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recruitment Pipeline Visual Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow animate-fade-in delay-75">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">Recruitment Pipeline Ratios</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Visual distribution of candidate application stages</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Shortlisted ({counts.shortlisted})
            </span>
            <span className="flex items-center gap-1.5 text-amber-500">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Under Review ({counts.review})
            </span>
            <span className="flex items-center gap-1.5 text-cyan-500">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              New ({counts.new})
            </span>
            <span className="flex items-center gap-1.5 text-rose-500">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Rejected ({counts.rejected})
            </span>
          </div>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          {counts.total === 0 ? (
            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
          ) : (
            <>
              <div
                style={{ width: `${pctShortlisted}%` }}
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                title={`Shortlisted: ${pctShortlisted}%`}
              />
              <div
                style={{ width: `${pctReview}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                title={`Under Review: ${pctReview}%`}
              />
              <div
                style={{ width: `${pctNew}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-500"
                title={`New: ${pctNew}%`}
              />
              <div
                style={{ width: `${pctRejected}%` }}
                className="h-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500"
                title={`Rejected: ${pctRejected}%`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
