"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

type LoginProps = {
  onLoginSuccess: () => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (email === "admin@talentdesk.com" && password === "admin123") {
        onLoginSuccess();
      } else {
        setError("Wrong credentials. Click the demo button above to auto-fill.");
        setIsLoading(false);
      }
    }, 900);
  };

  const handleDemo = () => {
    setEmail("admin@talentdesk.com");
    setPassword("admin123");
    setError("");
  };

  const checks = [
    "Video screening & candidate dossiers",
    "Real-time pipeline analytics",
    "Encrypted secure client sharing",
  ];

  // Shared font stack
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ─── LEFT — Brand Panel ─── */}
      <div
        style={{
          display: "none",
          width: "50%",
          background: "#0f0f11",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 72px",
          position: "relative",
          overflow: "hidden",
        }}
        className="lg:flex"
      >
        {/* Glow blobs only — no grid noise */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "80px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(99,102,241,0.5)",
            }}
          >
            <Zap style={{ width: "18px", height: "18px", color: "#fff" }} strokeWidth={2.5} />
          </div>
          <span
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.4px",
            }}
          >
            TalentDesk
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              color: "#6366f1",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Recruiter Platform
          </p>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-2px",
              color: "#ffffff",
              marginBottom: "28px",
            }}
          >
            Hire smarter.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Move faster.
            </span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "#71717a",
              maxWidth: "360px",
              marginBottom: "48px",
            }}
          >
            The modern ATS built for recruiters who care about quality — not just speed.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "64px" }}>
            {checks.map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateX(-10px)",
                  transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 style={{ width: "13px", height: "13px", color: "#818cf8" }} />
                </div>
                <span style={{ fontSize: "15px", color: "#a1a1aa", fontWeight: 450 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              paddingTop: "40px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.55s",
            }}
          >
            {[
              { n: "12k+", l: "Screened" },
              { n: "98%", l: "Satisfaction" },
              { n: "3×", l: "Faster" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "26px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{s.n}</div>
                <div style={{ fontSize: "12px", color: "#52525b", marginTop: "2px", fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RIGHT — Login Form ─── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: "48px 32px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
          }}
        >
          {/* Mobile logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "48px",
            }}
            className="lg:hidden"
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap style={{ width: "16px", height: "16px", color: "#fff" }} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: "17px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.3px" }}>
              TalentDesk
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#09090b",
                letterSpacing: "-0.8px",
                marginBottom: "8px",
                lineHeight: 1.2,
              }}
            >
              Welcome back
            </h2>
            <p style={{ fontSize: "15px", color: "#71717a", lineHeight: 1.6 }}>
              Sign in to your recruiter workspace
            </p>
          </div>

          {/* Demo banner */}
          <button
            type="button"
            onClick={handleDemo}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1.5px dashed #c7d2fe",
              background: "#f5f3ff",
              cursor: "pointer",
              marginBottom: "28px",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#ede9fe")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#f5f3ff")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "#6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Zap style={{ width: "15px", height: "15px", color: "#fff" }} strokeWidth={2.5} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#3730a3" }}>Try demo account</div>
                <div style={{ fontSize: "12px", color: "#6366f1", marginTop: "1px" }}>
                  admin@talentdesk.com · admin123
                </div>
              </div>
            </div>
            <ArrowRight style={{ width: "16px", height: "16px", color: "#818cf8" }} />
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#e4e4e7" }} />
            <span style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 500, whiteSpace: "nowrap" }}>
              or continue with email
            </span>
            <div style={{ flex: 1, height: "1px", background: "#e4e4e7" }} />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#dc2626",
                fontWeight: 500,
                marginBottom: "20px",
                animation: "slideIn 0.25s ease",
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#18181b",
                  marginBottom: "8px",
                }}
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  fontSize: "15px",
                  color: "#09090b",
                  background: "#fafafa",
                  border: "1.5px solid #e4e4e7",
                  borderRadius: "10px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: font,
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.1)";
                  e.currentTarget.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e4e4e7";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "#fafafa";
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "#18181b" }}>Password</label>
                <button
                  type="button"
                  style={{
                    fontSize: "13px",
                    color: "#6366f1",
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: font,
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width: "100%",
                    padding: "13px 48px 13px 16px",
                    fontSize: "15px",
                    color: "#09090b",
                    background: "#fafafa",
                    border: "1.5px solid #e4e4e7",
                    borderRadius: "10px",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: font,
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#6366f1";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.1)";
                    e.currentTarget.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e4e4e7";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#fafafa";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#a1a1aa",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword
                    ? <EyeOff style={{ width: "17px", height: "17px" }} />
                    : <Eye style={{ width: "17px", height: "17px" }} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit-btn"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: isLoading
                  ? "#a5b4fc"
                  : "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: font,
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                transition: "transform 0.15s, box-shadow 0.15s",
                letterSpacing: "-0.1px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(99,102,241,0.5)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)";
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2.5px solid rgba(255,255,255,0.3)",
                    borderTop: "2.5px solid #fff",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              ) : (
                <>
                  Sign in to Dashboard
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p
            style={{
              marginTop: "32px",
              textAlign: "center",
              fontSize: "12px",
              color: "#a1a1aa",
              lineHeight: 1.6,
            }}
          >
            By signing in you agree to our{" "}
            <span style={{ color: "#71717a", fontWeight: 500, cursor: "pointer" }}>Terms of Service</span>
            {" and "}
            <span style={{ color: "#71717a", fontWeight: 500, cursor: "pointer" }}>Privacy Policy</span>.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800;900&display=swap');
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: #a1a1aa;
        }
      `}</style>
    </div>
  );
}
