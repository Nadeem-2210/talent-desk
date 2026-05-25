"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, Share2, MapPin, Briefcase, Calendar, Mail, Phone,
  CheckCircle, FileText, Play, Pause, Volume2, VolumeX,
  Maximize, Plus, X, Star, Check, Save,
} from "lucide-react";

type Candidate = {
  id: string; name: string; role: string; experience: string; location: string;
  status: string; appliedDate: string; email: string; phone: string;
  resumeUrl: string; videoUrl: string; skills: string[]; techStack: string[];
  rating: number; overallScore: number; summary: Array<{ q: string; a: string }>;
  strengths: string[]; notes?: string;
};

type Props = {
  candidate: Candidate;
  onBack: () => void;
  isSharedView?: boolean;
  onShareClick?: () => void;
  onUpdateCandidate?: (updated: Candidate) => void;
};

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const AVATAR_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const STATUS_CFG: Record<string, { color: string; bg: string }> = {
  "Shortlisted":   { color: "#065f46", bg: "#d1fae5" },
  "Under Review":  { color: "#92400e", bg: "#fef3c7" },
  "New":           { color: "#4c1d95", bg: "#ede9fe" },
  "Rejected":      { color: "#71717a", bg: "#f4f4f5" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #f4f4f5", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div style={{ padding: "18px 24px", borderBottom: "1px solid #f4f4f5" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.1px" }}>{title}</span>
      </div>
      <div style={{ padding: "20px 24px" }}>{children}</div>
    </div>
  );
}

export default function CandidateDetails({ candidate, onBack, isSharedView = false, onShareClick, onUpdateCandidate }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [notes, setNotes] = useState(candidate.notes || "");
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    setPlaying(false); setProgress(0); setCurrentTime(0);
    setNotes(candidate.notes || ""); setNoteSaved(false);
  }, [candidate]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
  };

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const toggleMute = () => { if (!videoRef.current) return; videoRef.current.muted = !muted; setMuted(!muted); };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = parseFloat(e.target.value);
    videoRef.current.volume = v; setVolume(v); setMuted(v === 0); videoRef.current.muted = v === 0;
  };

  const update = (u: Partial<Candidate>) => { if (onUpdateCandidate) onUpdateCandidate({ ...candidate, ...u }); };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || isSharedView) return;
    if (!candidate.skills.includes(newSkill.trim())) update({ skills: [...candidate.skills, newSkill.trim()] });
    setNewSkill("");
  };

  const handleSaveNotes = () => { update({ notes }); setNoteSaved(true); setTimeout(() => setNoteSaved(false), 2000); };

  const initials = candidate.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const avatarBg = AVATAR_COLORS[candidate.name.charCodeAt(0) % AVATAR_COLORS.length];
  const statusCfg = STATUS_CFG[candidate.status] || STATUS_CFG["New"];
  const scoreColor = candidate.overallScore >= 85 ? "#10b981" : candidate.overallScore >= 70 ? "#f59e0b" : "#a1a1aa";
  const r = 28; const circ = 2 * Math.PI * r; const offset = circ - (candidate.overallScore / 100) * circ;

  return (
    <div style={{ fontFamily: font, WebkitFontSmoothing: "antialiased" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        {!isSharedView && (
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 14px", borderRadius: "10px", border: "1px solid #e4e4e7",
              background: "#fff", fontSize: "13px", fontWeight: 600, color: "#3f3f46",
              cursor: "pointer", fontFamily: font, transition: "all 0.15s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
          >
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Back to Dashboard
          </button>
        )}

        {!isSharedView && onShareClick && (
          <button
            onClick={onShareClick}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "9px 18px", borderRadius: "10px", border: "none",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer",
              fontFamily: font, boxShadow: "0 3px 16px rgba(99,102,241,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 5px 20px rgba(99,102,241,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 3px 16px rgba(99,102,241,0.35)";
            }}
          >
            <Share2 style={{ width: "14px", height: "14px" }} />
            Share with Client
          </button>
        )}
      </div>

      {/* Content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px", alignItems: "start" }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Identity card */}
          <div style={{ background: "#fff", border: "1px solid #f4f4f5", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {/* Avatar + name */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "20px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "18px", background: avatarBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "22px", fontWeight: 800, marginBottom: "14px",
                boxShadow: `0 4px 16px ${avatarBg}55`,
              }}>
                {initials}
              </div>
              <h1 style={{ fontSize: "17px", fontWeight: 800, color: "#09090b", letterSpacing: "-0.4px", margin: "0 0 4px" }}>
                {candidate.name}
              </h1>
              <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 12px" }}>{candidate.role}</p>

              {/* Status badge */}
              <span style={{
                padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                background: statusCfg.bg, color: statusCfg.color,
              }}>
                {candidate.status}
              </span>
            </div>

            {/* Score ring */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", background: "#fafafa", borderRadius: "10px", marginBottom: "18px" }}>
              <div style={{ position: "relative", width: "56px", height: "56px", flexShrink: 0 }}>
                <svg width="56" height="56" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="32" cy="32" r={r} fill="none" stroke="#f4f4f5" strokeWidth="5" />
                  <circle cx="32" cy="32" r={r} fill="none" stroke={scoreColor} strokeWidth="5"
                    strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.7s ease" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 800, color: scoreColor }}>
                  {candidate.overallScore}
                </div>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#09090b", margin: "0 0 2px" }}>Match Score</p>
                <p style={{ fontSize: "11px", color: "#a1a1aa", margin: 0 }}>Based on role fit</p>
                {!isSharedView && (
                  <input type="range" min="0" max="100" value={candidate.overallScore}
                    onChange={(e) => update({ overallScore: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%", marginTop: "8px", accentColor: "#6366f1", cursor: "pointer" }} />
                )}
              </div>
            </div>

            {/* Star rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "18px" }}>
              <span style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 500, marginRight: "4px" }}>Rating</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => !isSharedView && update({ rating: s })}
                  style={{ background: "none", border: "none", padding: "2px", cursor: isSharedView ? "default" : "pointer" }}>
                  <Star style={{ width: "16px", height: "16px", color: s <= candidate.rating ? "#f59e0b" : "#e4e4e7", fill: s <= candidate.rating ? "#f59e0b" : "#e4e4e7" }} />
                </button>
              ))}
            </div>

            {/* Stage selector */}
            {!isSharedView && (
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>
                  Stage
                </label>
                <select value={candidate.status} onChange={(e) => update({ status: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e4e4e7", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#09090b", background: "#fff", cursor: "pointer", outline: "none", fontFamily: font }}>
                  {["New", "Under Review", "Shortlisted", "Rejected"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid #f4f4f5", paddingTop: "16px", marginBottom: "16px" }}>
              {[
                { icon: MapPin, text: candidate.location },
                { icon: Briefcase, text: candidate.experience },
                { icon: Calendar, text: `Applied ${candidate.appliedDate}` },
                ...(!isSharedView ? [
                  { icon: Mail, text: candidate.email },
                  { icon: Phone, text: candidate.phone },
                ] : []),
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#52525b" }}>
                  <Icon style={{ width: "14px", height: "14px", color: "#a1a1aa", flexShrink: 0 }} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Resume link */}
            <a href={candidate.resumeUrl}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "9px 14px", border: "1.5px solid #e4e4e7", borderRadius: "8px",
                fontSize: "13px", fontWeight: 600, color: "#3f3f46", textDecoration: "none",
                background: "#fafafa", transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#6366f1"; (e.currentTarget as HTMLElement).style.color = "#6366f1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e4e4e7"; (e.currentTarget as HTMLElement).style.color = "#3f3f46"; }}
            >
              <FileText style={{ width: "13px", height: "13px" }} />
              View Resume
            </a>
          </div>

          {/* Strengths */}
          <Section title="Key Strengths">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {candidate.strengths.map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <CheckCircle style={{ width: "15px", height: "15px", color: "#10b981", flexShrink: 0, marginTop: "1px" }} />
                  <span style={{ fontSize: "13px", color: "#3f3f46", lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Video player */}
          <div style={{ background: "#fff", border: "1px solid #f4f4f5", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #f4f4f5" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#09090b", margin: "0 0 2px" }}>Screening Video</p>
              <p style={{ fontSize: "12px", color: "#a1a1aa", margin: 0 }}>Candidate introduction & assessment recording</p>
            </div>
            <div style={{ position: "relative", background: "#09090b", aspectRatio: "16/9" }}
              className="group/v">
              <video ref={videoRef} src={candidate.videoUrl} onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                onEnded={() => setPlaying(false)}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

              {!playing && (
                <div onClick={togglePlay}
                  style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)", cursor: "pointer" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transition: "transform 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                    <Play style={{ width: "22px", height: "22px", fill: "#09090b", color: "#09090b", marginLeft: "3px" }} />
                  </div>
                </div>
              )}

              {/* Controls overlay */}
              <div className="opacity-0 group-hover/v:opacity-100"
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px", background: "linear-gradient(transparent, rgba(0,0,0,0.75))", transition: "opacity 0.2s" }}>
                {/* Progress bar */}
                <div onClick={onSeek}
                  style={{ height: "4px", background: "rgba(255,255,255,0.25)", borderRadius: "99px", marginBottom: "10px", cursor: "pointer", position: "relative" }}>
                  <div style={{ position: "absolute", inset: "0", left: 0, width: `${progress}%`, background: "#818cf8", borderRadius: "99px" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <button onClick={togglePlay} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 0, display: "flex" }}>
                      {playing ? <Pause style={{ width: "18px", height: "18px", fill: "#fff" }} /> : <Play style={{ width: "18px", height: "18px", fill: "#fff" }} />}
                    </button>
                    <button onClick={toggleMute} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 0, display: "flex" }}>
                      {muted || volume === 0 ? <VolumeX style={{ width: "16px", height: "16px" }} /> : <Volume2 style={{ width: "16px", height: "16px" }} />}
                    </button>
                    <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={onVolumeChange}
                      style={{ width: "60px", accentColor: "#818cf8", cursor: "pointer" }} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>
                      {fmt(currentTime)} / {fmt(duration)}
                    </span>
                  </div>
                  <button onClick={() => videoRef.current?.requestFullscreen?.()}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 0, display: "flex" }}>
                    <Maximize style={{ width: "16px", height: "16px" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Skills + Notes row */}
          <div style={{ display: "grid", gridTemplateColumns: isSharedView ? "1fr" : "1fr 1fr", gap: "16px" }}>
            {/* Skills */}
            <Section title={`Skills (${candidate.skills.length})`}>
              {!isSharedView && (
                <form onSubmit={handleAddSkill} style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                  <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    style={{ flex: 1, padding: "8px 12px", border: "1.5px solid #e4e4e7", borderRadius: "8px", fontSize: "13px", color: "#09090b", outline: "none", fontFamily: font, background: "#fafafa" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "#fff"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#fafafa"; }}
                  />
                  <button type="submit" style={{ padding: "8px 12px", background: "#6366f1", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <Plus style={{ width: "15px", height: "15px", color: "#fff" }} />
                  </button>
                </form>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {candidate.skills.map((skill) => (
                  <span key={skill} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "8px", fontSize: "12px", fontWeight: 500, color: "#3f3f46" }}>
                    {skill}
                    {!isSharedView && (
                      <button type="button" onClick={() => update({ skills: candidate.skills.filter((s) => s !== skill) })}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#a1a1aa", display: "flex" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a1a1aa"; }}>
                        <X style={{ width: "11px", height: "11px" }} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </Section>

            {/* Notes */}
            {!isSharedView && (
              <Section title="Private Notes">
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your private assessment observations..."
                  style={{ width: "100%", minHeight: "110px", padding: "10px 12px", border: "1.5px solid #e4e4e7", borderRadius: "8px", fontSize: "13px", color: "#09090b", background: "#fafafa", fontFamily: font, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#fafafa"; }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                  <button onClick={handleSaveNotes}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px",
                      borderRadius: "8px", border: noteSaved ? "1px solid #a7f3d0" : "1px solid #e4e4e7",
                      background: noteSaved ? "#f0fdf4" : "#fff",
                      color: noteSaved ? "#065f46" : "#3f3f46",
                      fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: font, transition: "all 0.2s",
                    }}>
                    {noteSaved ? <><Check style={{ width: "13px", height: "13px" }} /> Saved</> : <><Save style={{ width: "13px", height: "13px" }} /> Save Notes</>}
                  </button>
                </div>
              </Section>
            )}
          </div>

          {/* Q&A */}
          <Section title="Interview Responses">
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {candidate.summary.map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ padding: "3px 8px", background: "#eef2ff", color: "#4338ca", fontSize: "11px", fontWeight: 700, borderRadius: "6px", flexShrink: 0, marginTop: "1px" }}>
                      Q{idx + 1}
                    </span>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#09090b", margin: 0, lineHeight: 1.5 }}>{item.q}</p>
                  </div>
                  <p style={{ fontSize: "13px", color: "#52525b", lineHeight: 1.7, margin: 0, paddingLeft: "36px", borderLeft: "2px solid #f4f4f5", marginLeft: "18px" }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
