"use client";

import { useState } from "react";
import { X, Copy, Check, Mail, Shield, Link2 } from "lucide-react";

type Candidate = { id: string; name: string; role: string };

type ShareModalProps = {
  candidate: Candidate;
  onClose: () => void;
};

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const AVATAR_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function ShareModal({ candidate, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const shareLink = `${typeof window !== "undefined" ? window.location.origin : "https://talentdesk.com"}/?shared=${candidate.id}`;
  const avatarBg = AVATAR_COLORS[candidate.name.charCodeAt(0) % AVATAR_COLORS.length];
  const initials = candidate.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 1500);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        background: "rgba(9,9,11,0.6)",
        backdropFilter: "blur(4px)",
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
          animation: "scaleIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "22px 24px 20px", borderBottom: "1px solid #f4f4f5" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield style={{ width: "18px", height: "18px", color: "#6366f1" }} />
              </div>
              <div>
                <h2 style={{ fontSize: "15px", fontWeight: 800, color: "#09090b", margin: "0 0 2px", letterSpacing: "-0.3px" }}>
                  Share Profile
                </h2>
                <p style={{ fontSize: "12px", color: "#a1a1aa", margin: 0 }}>
                  Generate a secure client viewing link
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #f4f4f5",
                background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f4f4f5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
            >
              <X style={{ width: "15px", height: "15px", color: "#71717a" }} />
            </button>
          </div>
        </div>

        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Candidate badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "#fafafa", border: "1px solid #f4f4f5", borderRadius: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px", background: avatarBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "14px", fontWeight: 800, flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#09090b", margin: "0 0 2px", letterSpacing: "-0.2px" }}>
                {candidate.name}
              </p>
              <p style={{ fontSize: "12px", color: "#71717a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {candidate.role}
              </p>
            </div>
          </div>

          {/* Share link */}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px" }}>
              Secure Link
            </label>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", background: "#fafafa", border: "1.5px solid #e4e4e7", borderRadius: "10px", overflow: "hidden" }}>
                <Link2 style={{ width: "13px", height: "13px", color: "#a1a1aa", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#71717a", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {shareLink}
                </span>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: copied ? "#f0fdf4" : "linear-gradient(135deg, #6366f1, #7c3aed)",
                  color: copied ? "#065f46" : "#fff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: font,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  boxShadow: copied ? "none" : "0 3px 12px rgba(99,102,241,0.35)",
                }}
              >
                {copied
                  ? <><Check style={{ width: "14px", height: "14px" }} /> Copied!</>
                  : <><Copy style={{ width: "14px", height: "14px" }} /> Copy</>}
              </button>
            </div>
            <p style={{ fontSize: "11px", color: "#a1a1aa", margin: 0, lineHeight: 1.6 }}>
              Client will see an isolated read-only profile. Your notes and contact details stay private.
            </p>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, height: "1px", background: "#f4f4f5" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#a1a1aa", whiteSpace: "nowrap" }}>
              or send via email
            </span>
            <div style={{ flex: 1, height: "1px", background: "#f4f4f5" }} />
          </div>

          {/* Email form */}
          <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ position: "relative" }}>
              <Mail style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", color: "#a1a1aa" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                style={{
                  width: "100%",
                  paddingLeft: "38px",
                  paddingRight: "14px",
                  paddingTop: "11px",
                  paddingBottom: "11px",
                  fontSize: "14px",
                  color: "#09090b",
                  background: "#fafafa",
                  border: "1.5px solid #e4e4e7",
                  borderRadius: "10px",
                  outline: "none",
                  fontFamily: font,
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#fafafa"; }}
              />
            </div>
            <button
              type="submit"
              disabled={sent || !email}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1.5px solid #e4e4e7",
                background: sent ? "#f0fdf4" : "#fff",
                color: sent ? "#065f46" : "#3f3f46",
                fontSize: "14px",
                fontWeight: 700,
                cursor: !email || sent ? "not-allowed" : "pointer",
                fontFamily: font,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: !email && !sent ? 0.5 : 1,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (email && !sent) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
                  (e.currentTarget as HTMLElement).style.color = "#6366f1";
                }
              }}
              onMouseLeave={(e) => {
                if (!sent) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e4e4e7";
                  (e.currentTarget as HTMLElement).style.color = "#3f3f46";
                }
              }}
            >
              {sent
                ? <><Check style={{ width: "15px", height: "15px" }} /> Invitation Sent!</>
                : <>Send Invitation →</>}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}
