"use client";

import { LayoutDashboard, Eye, LogOut, ShieldAlert, Award } from "lucide-react";

type SidebarProps = {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  adminName?: string;
};

export default function Sidebar({ activeView, onViewChange, onLogout, adminName = "Admin User" }: SidebarProps) {
  const tabs = [
    { id: "admin", label: "Admin Dashboard", icon: LayoutDashboard },
    { id: "customer", label: "Customer View", icon: Eye },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 text-slate-600 flex flex-col shrink-0 h-screen sticky top-0 z-20 shadow-[1px_0_10px_rgba(0,0,0,0.01)] animate-fade-in">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-600/10">
          <Award className="w-4.5 h-4.5" />
        </div>
        <div>
          <span className="font-extrabold text-slate-800 text-base tracking-tight">Talent<span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Desk</span></span>
          <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase leading-none mt-0.5">Recruiter Hub</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
          Navigation
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id || (tab.id === "admin" && activeView === "profile");
          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 border border-indigo-100/50 shadow-sm shadow-indigo-500/5"
                  : "hover:bg-slate-50 hover:text-slate-800 text-slate-400 border border-transparent"
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* User Section / Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/40">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
            {adminName.split(" ").map(n => n[0]).join("").toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate leading-tight">{adminName}</p>
            <p className="text-[10px] text-slate-400 font-bold leading-tight mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Active Admin
            </p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100/60 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-sm shadow-rose-500/5"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out Session
        </button>
      </div>
    </aside>
  );
}
