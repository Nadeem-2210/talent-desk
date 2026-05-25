"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Shield, Zap } from "lucide-react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import AnalyticsPanel from "./components/AnalyticsPanel";
import CandidateCard from "./components/CandidateCard";
import CandidateDetails from "./components/CandidateDetails";
import ShareModal from "./components/ShareModal";

// Initial Candidates Data
const INITIAL_CANDIDATES = [
  {
    id: "c001", name: "Arjun Mehta", role: "Senior Frontend Engineer", experience: "6 years", location: "Bangalore, India",
    status: "Shortlisted", appliedDate: "12 May 2026", email: "arjun.mehta@email.com", phone: "+91 98765 43210",
    resumeUrl: "#", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"], techStack: ["Frontend", "Full Stack"],
    rating: 4, overallScore: 87, strengths: ["System design", "Performance optimization", "Team leadership"],
    summary: [
      { q: "Tell us about your most challenging project.", a: "Led the migration of a legacy AngularJS app to React with TypeScript for 50k daily users. Achieved zero downtime using a micro-frontend approach over 8 months." },
      { q: "How do you handle performance bottlenecks?", a: "I profile using Chrome DevTools. Recently, I identified unnecessary grid re-renders and moved heavy calculations to web workers, achieving sub-100ms interactions." },
    ],
    notes: "Very strong candidate, demonstrated deep architectural expertise. Recommended for final review.",
  },
  {
    id: "c002", name: "Priya Sharma", role: "Backend Engineer", experience: "4 years", location: "Hyderabad, India",
    status: "Under Review", appliedDate: "10 May 2026", email: "priya.sharma@email.com", phone: "+91 87654 32109",
    resumeUrl: "#", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"], techStack: ["Backend", "DevOps"],
    rating: 5, overallScore: 92, strengths: ["Distributed systems", "API design", "Reliability engineering"],
    summary: [
      { q: "Describe a scalable system you built.", a: "Designed a real-time notification system handling 2M events/day. Used Kafka and Redis for deduplication, maintaining a 99.98% delivery rate with under 50ms latency." },
      { q: "How do you approach API design?", a: "RESTful principles combined with consumer-driven design. I write the OpenAPI spec first and iterate with frontend teams before writing any implementation code." },
    ],
    notes: "Exceptional system design skills. Understood reliability concepts incredibly well. Top tier candidate.",
  },
  {
    id: "c003", name: "Rahul Verma", role: "Full Stack Developer", experience: "3 years", location: "Pune, India",
    status: "New", appliedDate: "14 May 2026", email: "rahul.verma@email.com", phone: "+91 76543 21098",
    resumeUrl: "#", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["Vue.js", "Node.js", "MongoDB", "Express", "Firebase"], techStack: ["Full Stack", "Mobile"],
    rating: 3, overallScore: 74, strengths: ["Mobile development", "Rapid prototyping", "Self-starter"],
    summary: [
      { q: "What was your biggest technical challenge?", a: "Implementing offline-first data sync in React Native for rural areas. Built a local SQLite store with a custom reconciliation queue." },
    ],
    notes: "Solid mid-level developer. Quick learner, offline sync project was impressive. Needs some mentorship on enterprise architecture.",
  },
  {
    id: "c005", name: "Kiran Nair", role: "Machine Learning Engineer", experience: "4 years", location: "Chennai, India",
    status: "Shortlisted", appliedDate: "11 May 2026", email: "kiran.nair@email.com", phone: "+91 54321 09876",
    resumeUrl: "#", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["Python", "PyTorch", "TensorFlow", "MLflow", "Spark"], techStack: ["ML/AI", "Data"],
    rating: 5, overallScore: 91, strengths: ["ML infrastructure", "Model optimization", "Stakeholder communication"],
    summary: [
      { q: "Explain your experience with real-time inference.", a: "Built a fraud detection model processing 500 TPS with sub-10ms latency. Used isolation forests and a transformer, reducing false positives by 45%." },
      { q: "How do you handle model drift?", a: "I track PSI scores and holdout set performance. Automated pipelines trigger retraining when significant drift is detected." },
    ],
    notes: "Superb ML candidate, excellent blend of deep engineering capability and high business acumen. Strong recommend.",
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("td_auth") === "true";
    }
    return false;
  });
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [view, setView] = useState("admin");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const [showShareModal, setShowShareModal] = useState(false);
  const [candidateToShare, setCandidateToShare] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sharedId = params.get("shared");
      if (sharedId) {
        const found = candidates.find((c) => c.id === sharedId);
        if (found) {
          setSelectedCandidate(found);
          setView("customer");
        }
      }
    }
  }, [candidates]);

  const handleUpdateCandidate = (updated: any) => {
    setCandidates((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    if (selectedCandidate?.id === updated.id) setSelectedCandidate(updated);
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchTech = techFilter === "All" || c.techStack.includes(techFilter);
    return matchSearch && matchStatus && matchTech;
  });

  const isCustomerViewing = view === "customer" && selectedCandidate;

  if (!isAuthenticated && !isCustomerViewing) {
    return <Login onLoginSuccess={() => { setIsAuthenticated(true); localStorage.setItem("td_auth", "true"); }} />;
  }

  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div style={{ height: "100vh", display: "flex", background: "#f8fafc", overflow: "hidden", fontFamily: font, WebkitFontSmoothing: "antialiased" }}>

      {showShareModal && candidateToShare && (
        <ShareModal candidate={candidateToShare} onClose={() => { setShowShareModal(false); setCandidateToShare(null); }} />
      )}

      {!isCustomerViewing && (
        <Sidebar
          activeView={view}
          onViewChange={(v) => { setView(v); setSelectedCandidate(null); }}
          onLogout={() => { setIsAuthenticated(false); setView("admin"); setSelectedCandidate(null); localStorage.removeItem("td_auth"); }}
        />
      )}

      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%", overflow: "hidden" }}>

        {/* Header */}
        <header
          style={{
            height: "60px",
            padding: "0 32px",
            background: "#fff",
            borderBottom: "1px solid #f4f4f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            zIndex: 10,
            boxShadow: "0 1px 0 #f4f4f5",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {isCustomerViewing ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#6366f1,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap style={{ width: "14px", height: "14px", color: "#fff" }} strokeWidth={2.5} />
                </div>
                <span style={{ fontWeight: 700, fontSize: "15px", color: "#09090b", letterSpacing: "-0.2px" }}>TalentDesk Secure Share</span>
              </div>
            ) : (
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.3px", margin: 0 }}>
                {view === "admin" ? "Candidate Pipeline" : view === "profile" ? "Candidate Profile" : view === "settings" ? "Settings" : "Dashboard"}
              </h2>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {isCustomerViewing ? (
              <span style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "99px", fontSize: "12px", fontWeight: 600, color: "#166534" }}>
                <span style={{ width: "6px", height: "6px", background: "#22c55e", borderRadius: "50%" }} />
                Client Review Session
              </span>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 12px", background: "#fff", border: "1px solid #f4f4f5", borderRadius: "99px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <Shield style={{ width: "13px", height: "13px", color: "#22c55e" }} />
                <span style={{ fontSize: "12px", fontWeight: 500, color: "#71717a" }}>Secure Session</span>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "36px 40px" }}>

            {/* Admin Dashboard View */}
            {view === "admin" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Page Title */}
                <div>
                  <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#09090b", letterSpacing: "-0.5px", margin: 0, marginBottom: "6px" }}>
                    Candidate Board
                  </h1>
                  <p style={{ fontSize: "14px", color: "#71717a", margin: 0 }}>
                    Review applications, watch video screens, and manage your pipeline.
                  </p>
                </div>

                <AnalyticsPanel candidates={candidates} />

                {/* Search & Filter Bar */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    padding: "16px 20px",
                    background: "#fff",
                    border: "1px solid #f4f4f5",
                    borderRadius: "14px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ position: "relative", flex: "1", minWidth: "200px", maxWidth: "360px" }}>
                    <Search style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", width: "15px", height: "15px", color: "#a1a1aa" }} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, role, or skill..."
                      style={{
                        width: "100%",
                        paddingLeft: "38px",
                        paddingRight: "14px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
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

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
                    <Filter style={{ width: "14px", height: "14px", color: "#a1a1aa" }} />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ padding: "9px 12px", border: "1.5px solid #e4e4e7", borderRadius: "10px", background: "#fafafa", fontSize: "13px", fontWeight: 600, color: "#3f3f46", cursor: "pointer", outline: "none", fontFamily: font }}
                    >
                      {["All", "New", "Under Review", "Shortlisted", "Rejected"].map(s => <option key={s} value={s}>{s === "All" ? "All Stages" : s}</option>)}
                    </select>
                    <select
                      value={techFilter}
                      onChange={(e) => setTechFilter(e.target.value)}
                      style={{ padding: "9px 12px", border: "1.5px solid #e4e4e7", borderRadius: "10px", background: "#fafafa", fontSize: "13px", fontWeight: 600, color: "#3f3f46", cursor: "pointer", outline: "none", fontFamily: font }}
                    >
                      {["All", "Frontend", "Backend", "Full Stack", "DevOps", "Data"].map(s => <option key={s} value={s}>{s === "All" ? "All Domains" : s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Candidate List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {filteredCandidates.length} Candidate{filteredCandidates.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {filteredCandidates.map((cand) => (
                    <CandidateCard
                      key={cand.id}
                      candidate={cand}
                      onSelect={(c) => { setSelectedCandidate(c); setView("profile"); }}
                    />
                  ))}

                  {filteredCandidates.length === 0 && (
                    <div style={{ padding: "64px 0", textAlign: "center", border: "2px dashed #e4e4e7", borderRadius: "16px", background: "#fff" }}>
                      <Search style={{ width: "36px", height: "36px", color: "#d4d4d8", margin: "0 auto 16px" }} />
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#09090b", margin: "0 0 4px" }}>No matching candidates</h3>
                      <p style={{ fontSize: "13px", color: "#a1a1aa", margin: 0 }}>Try adjusting your filters or search query.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile View */}
            {view === "profile" && selectedCandidate && (
              <CandidateDetails
                candidate={selectedCandidate}
                onBack={() => { setView("admin"); setSelectedCandidate(null); }}
                onShareClick={() => { setCandidateToShare(selectedCandidate); setShowShareModal(true); }}
                onUpdateCandidate={handleUpdateCandidate}
              />
            )}

            {/* Shared Customer View — accessed via ?shared= URL */}
            {view === "customer" && selectedCandidate && (
              <div>
                {/* Banner */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "16px 20px",
                    background: "#f5f3ff",
                    border: "1px solid #ddd6fe",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    fontFamily: "'Inter', -apple-system, sans-serif",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Shield style={{ width: "16px", height: "16px", color: "#7c3aed" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#4c1d95", margin: "0 0 3px" }}>
                      Candidate Presentation — Secure View
                    </p>
                    <p style={{ fontSize: "13px", color: "#6d28d9", margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
                      This is a private candidate profile shared by your TalentDesk recruiter. Recruiter notes and contact details are not included.
                    </p>
                  </div>
                </div>
                <CandidateDetails
                  candidate={selectedCandidate}
                  onBack={() => { }}
                  isSharedView={true}
                />
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
