"use client";

import { MapPin, Briefcase, ChevronRight, Star } from "lucide-react";

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

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const AVATAR_COLORS = [
  { bg: "#6366f1", light: "#eef2ff" },
  { bg: "#10b981", light: "#f0fdf4" },
  { bg: "#f59e0b", light: "#fffbeb" },
  { bg: "#8b5cf6", light: "#f5f3ff" },
  { bg: "#ec4899", light: "#fdf2f8" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  Shortlisted: { label: "Shortlisted", color: "#065f46", bg: "#d1fae5", dot: "#10b981" },
  "Under Review": { label: "Under Review", color: "#92400e", bg: "#fef3c7", dot: "#f59e0b" },
  New: { label: "New", color: "#4c1d95", bg: "#ede9fe", dot: "#8b5cf6" },
  Rejected: { label: "Rejected", color: "#71717a", bg: "#f4f4f5", dot: "#a1a1aa" },
};

export default function CandidateCard({ candidate, onSelect }: CandidateCardProps) {
  const initials = candidate.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const avatarColor = AVATAR_COLORS[candidate.name.charCodeAt(0) % AVATAR_COLORS.length];
  const status = STATUS_CONFIG[candidate.status] || STATUS_CONFIG["New"];

  const scoreColor =
    candidate.overallScore >= 85
      ? { text: "#065f46", bg: "#d1fae5", border: "#a7f3d0" }
      : candidate.overallScore >= 70
      ? { text: "#92400e", bg: "#fef3c7", border: "#fcd34d" }
      : { text: "#71717a", bg: "#f4f4f5", border: "#e4e4e7" };

  return (
    <div
      onClick={() => onSelect(candidate)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "20px 24px",
        background: "#fff",
        border: "1px solid #f4f4f5",
        borderRadius: "14px",
        cursor: "pointer",
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
        transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#c7d2fe";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.1)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#f4f4f5";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: avatarColor.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 700,
          flexShrink: 0,
          letterSpacing: "0.5px",
        }}
      >
        {initials}
      </div>

      {/* Main info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#09090b",
              letterSpacing: "-0.2px",
            }}
          >
            {candidate.name}
          </span>

          {/* Status badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 9px",
              borderRadius: "99px",
              background: status.bg,
              fontSize: "11px",
              fontWeight: 600,
              color: status.color,
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: status.dot,
                display: "inline-block",
              }}
            />
            {status.label}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "13px",
            color: "#71717a",
            marginBottom: "10px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 600, color: "#3f3f46" }}>{candidate.role}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Briefcase style={{ width: "12px", height: "12px", color: "#a1a1aa" }} />
            {candidate.experience}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin style={{ width: "12px", height: "12px", color: "#a1a1aa" }} />
            {candidate.location}
          </span>
        </div>

        {/* Skill tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {candidate.techStack.map((t) => (
            <span
              key={t}
              style={{
                padding: "3px 10px",
                background: "#eef2ff",
                color: "#4338ca",
                fontSize: "11px",
                fontWeight: 600,
                borderRadius: "6px",
              }}
            >
              {t}
            </span>
          ))}
          {candidate.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              style={{
                padding: "3px 10px",
                background: "#fafafa",
                color: "#52525b",
                fontSize: "11px",
                fontWeight: 500,
                borderRadius: "6px",
                border: "1px solid #e4e4e7",
              }}
            >
              {s}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span style={{ fontSize: "11px", color: "#a1a1aa", alignSelf: "center" }}>
              +{candidate.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Right — Score & Rating */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px", flexShrink: 0 }}>
        {/* Stars */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <div style={{ display: "flex", gap: "2px" }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                style={{
                  width: "13px",
                  height: "13px",
                  color: s <= candidate.rating ? "#f59e0b" : "#e4e4e7",
                  fill: s <= candidate.rating ? "#f59e0b" : "#e4e4e7",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "10px", color: "#a1a1aa", fontWeight: 500 }}>Rating</span>
        </div>

        {/* Score */}
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            border: `1.5px solid ${scoreColor.border}`,
            background: scoreColor.bg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: 800, color: scoreColor.text, lineHeight: 1, letterSpacing: "-0.5px" }}>
            {candidate.overallScore}
          </span>
          <span style={{ fontSize: "8px", fontWeight: 700, color: scoreColor.text, opacity: 0.6, letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Score
          </span>
        </div>

        <ChevronRight style={{ width: "18px", height: "18px", color: "#d4d4d8" }} />
      </div>
    </div>
  );
}
