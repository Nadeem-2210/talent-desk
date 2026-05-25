"use client";

import { LayoutDashboard, LogOut, Zap } from "lucide-react";

type SidebarProps = {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
};

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export default function Sidebar({ activeView, onViewChange, onLogout }: SidebarProps) {
  const navItems = [
    { id: "admin", label: "Dashboard", icon: LayoutDashboard },
  ];

  const isActive = (id: string) =>
    activeView === id || (activeView === "profile" && id === "admin");

  return (
    <aside
      style={{
        width: "240px",
        background: "#09090b",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexShrink: 0,
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
        zIndex: 20,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 12px rgba(99,102,241,0.45)",
              flexShrink: 0,
            }}
          >
            <Zap style={{ width: "15px", height: "15px", color: "#fff" }} strokeWidth={2.5} />
          </div>
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "-0.3px",
            }}
          >
            TalentDesk
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#52525b",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: "8px",
          }}
        >
          Menu
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: font,
                  fontSize: "14px",
                  fontWeight: active ? 600 : 500,
                  letterSpacing: "-0.1px",
                  background: active ? "rgba(99,102,241,0.15)" : "transparent",
                  color: active ? "#a5b4fc" : "#71717a",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color = "#d4d4d8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#71717a";
                  }
                }}
              >
                <Icon
                  style={{
                    width: "16px",
                    height: "16px",
                    color: active ? "#818cf8" : "#52525b",
                    flexShrink: 0,
                  }}
                />
                {item.label}
                {active && (
                  <div
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#818cf8",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

      </nav>

      {/* User block */}
      <div
        style={{
          padding: "16px 12px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* User info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            AU
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#e4e4e7", marginBottom: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Admin User
            </p>
            <p style={{ fontSize: "11px", color: "#52525b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              admin@talentdesk.com
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "9px 12px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent",
            color: "#71717a",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: font,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
            (e.currentTarget as HTMLElement).style.color = "#f87171";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#71717a";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <LogOut style={{ width: "13px", height: "13px" }} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
