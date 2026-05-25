"use client";

import { Users, Star, Clock, Sparkles } from "lucide-react";

type AnalyticsPanelProps = {
  candidates: Array<{ status: string }>;
};

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export default function AnalyticsPanel({ candidates }: AnalyticsPanelProps) {
  const total = candidates.length;
  const shortlisted = candidates.filter((c) => c.status === "Shortlisted").length;
  const review = candidates.filter((c) => c.status === "Under Review").length;
  const newCount = candidates.filter((c) => c.status === "New").length;

  const pctShortlisted = total ? Math.round((shortlisted / total) * 100) : 0;
  const pctReview = total ? Math.round((review / total) * 100) : 0;
  const pctNew = total ? Math.round((newCount / total) * 100) : 0;
  const pctRejected = 100 - pctShortlisted - pctReview - pctNew;

  const metrics = [
    {
      label: "Total Pipeline",
      value: total,
      icon: Users,
      sub: "+2 this week",
      accent: "#6366f1",
      softBg: "#f5f3ff",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      icon: Star,
      sub: `${pctShortlisted}% of total`,
      accent: "#10b981",
      softBg: "#f0fdf4",
    },
    {
      label: "Under Review",
      value: review,
      icon: Clock,
      sub: `${pctReview}% of total`,
      accent: "#f59e0b",
      softBg: "#fffbeb",
    },
    {
      label: "New Applicants",
      value: newCount,
      icon: Sparkles,
      sub: "Needs screening",
      accent: "#8b5cf6",
      softBg: "#f5f3ff",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontFamily: font }}>
      {/* Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "1px solid #f4f4f5",
                borderRadius: "14px",
                padding: "22px 24px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: m.softBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Icon style={{ width: "18px", height: "18px", color: m.accent }} />
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#09090b",
                  letterSpacing: "-1px",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {m.value}
              </div>
              <div style={{ fontSize: "13px", color: "#71717a", fontWeight: 500 }}>{m.label}</div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "11px",
                  color: m.accent,
                  fontWeight: 600,
                  background: m.softBg,
                  display: "inline-block",
                  padding: "2px 8px",
                  borderRadius: "99px",
                }}
              >
                {m.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Bar */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #f4f4f5",
          borderRadius: "14px",
          padding: "20px 24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#09090b", marginBottom: "2px" }}>
              Pipeline Overview
            </p>
            <p style={{ fontSize: "12px", color: "#a1a1aa" }}>Stage distribution across all candidates</p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "Shortlisted", color: "#10b981" },
              { label: "Review", color: "#f59e0b" },
              { label: "New", color: "#8b5cf6" },
              { label: "Rejected", color: "#e4e4e7" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color }} />
                <span style={{ fontSize: "12px", color: "#71717a", fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "#f4f4f5",
            borderRadius: "99px",
            overflow: "hidden",
            display: "flex",
            gap: "2px",
          }}
        >
          {total > 0 ? (
            <>
              <div style={{ width: `${pctShortlisted}%`, height: "100%", background: "#10b981", borderRadius: "99px", transition: "width 0.7s ease" }} />
              <div style={{ width: `${pctReview}%`, height: "100%", background: "#f59e0b", borderRadius: "99px", transition: "width 0.7s ease" }} />
              <div style={{ width: `${pctNew}%`, height: "100%", background: "#8b5cf6", borderRadius: "99px", transition: "width 0.7s ease" }} />
              <div style={{ width: `${Math.max(pctRejected, 0)}%`, height: "100%", background: "#e4e4e7", borderRadius: "99px", transition: "width 0.7s ease" }} />
            </>
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#f4f4f5" }} />
          )}
        </div>
      </div>
    </div>
  );
}
