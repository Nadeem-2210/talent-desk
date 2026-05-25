"use client";

import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
  Sparkles,
  Award,
} from "lucide-react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import AnalyticsPanel from "./components/AnalyticsPanel";
import CandidateCard from "./components/CandidateCard";
import CandidateDetails from "./components/CandidateDetails";
import ShareModal from "./components/ShareModal";

/* ─────────────────────────────────────────────────────────── */
/*  Candidate Data                                             */
/* ─────────────────────────────────────────────────────────── */
const INITIAL_CANDIDATES = [
  {
    id: "c001",
    name: "Arjun Mehta",
    role: "Senior Frontend Engineer",
    experience: "6 years",
    location: "Bangalore, India",
    status: "Shortlisted",
    appliedDate: "12 May 2026",
    email: "arjun.mehta@email.com",
    phone: "+91 98765 43210",
    resumeUrl: "#",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS", "Node.js", "AWS"],
    techStack: ["Frontend", "Full Stack"],
    rating: 4,
    summary: [
      {
        q: "Tell us about your challenging project.",
        a: "I led the migration of a AngularJS app to React with TypeScript at my current company — a 200k LOC codebase serving 50k daily users. The biggest challenge was maintaining zero downtime. I designed a micro-frontend architecture migrating module by module over 8 months, improving page load by 40%.",
      },
      {
        q: "How do you handle performance bottlenecks?",
        a: "I start with profiling using Chrome DevTools. In my last role, I identified unnecessary re-renders in a grid. I introduced React.memo and useMemo, and moved heavy calculations to web workers, achieving sub-100ms interactions with 10k rows.",
      },
      {
        q: "Where do you see yourself in 3 years?",
        a: "I want to grow into a principal engineer role setting tech direction and mentoring. I'm highly interested in design systems and developer experience — the tools engineers use have a massive impact.",
      },
    ],
    strengths: ["System design", "Performance optimization", "Team leadership"],
    overallScore: 87,
    notes:
      "Very strong candidate, demonstrated deep architectural expertise and excellent communication skills. Recommended for final review.",
  },
  {
    id: "c002",
    name: "Priya Sharma",
    role: "Backend Engineer",
    experience: "4 years",
    location: "Hyderabad, India",
    status: "Under Review",
    appliedDate: "10 May 2026",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    resumeUrl: "#",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker", "Kubernetes", "FastAPI"],
    techStack: ["Backend", "DevOps"],
    rating: 5,
    summary: [
      {
        q: "Tell us about your challenging project.",
        a: "I built a real-time notification system from scratch handling 2M events per day. The challenge was guaranteeing delivery while keeping latency under 50ms. I designed a pipeline using Kafka, Redis deduplication, and a custom retry queue, achieving a 99.98% delivery rate.",
      },
      {
        q: "How do you approach API design?",
        a: "I follow RESTful principles but remain pragmatic. I start with the consumer — what do they need? I write the API contract as an OpenAPI spec first and share it with frontend teams for feedback before writing code.",
      },
      {
        q: "What's your approach to system reliability?",
        a: "I believe reliability is designed in. Every service I build has circuit breakers, structured logging with trace IDs, and health endpoints from day one. I run chaos engineering experiments in staging.",
      },
    ],
    strengths: ["Distributed systems", "API design", "Reliability engineering"],
    overallScore: 92,
    notes: "Exceptional system design skills. Understood reliability concepts incredibly well. Top tier candidate.",
  },
  {
    id: "c003",
    name: "Rahul Verma",
    role: "Full Stack Developer",
    experience: "3 years",
    location: "Pune, India",
    status: "New",
    appliedDate: "14 May 2026",
    email: "rahul.verma@email.com",
    phone: "+91 76543 21098",
    resumeUrl: "#",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["Vue.js", "Node.js", "MongoDB", "Express", "Firebase", "React Native"],
    techStack: ["Full Stack", "Mobile"],
    rating: 3,
    summary: [
      {
        q: "Tell us about your challenging project.",
        a: "I built a cross-platform mobile app using React Native. The hardest part was handling offline-first data sync for drivers in rural areas. I implemented a local SQLite store with a custom sync queue that reconciles with the server when connectivity returns.",
      },
      {
        q: "How do you prioritize tasks when under pressure?",
        a: "I use impact vs effort. I rank tasks by business value and communicate clearly with stakeholders about what is realistic. Surprises are worse than disappointing news delivered early.",
      },
      {
        q: "What excites you about this role?",
        a: "The scale of the product and collaborative structure. I've been a solo developer and look forward to being in an environment where I can learn from senior engineers and participate in code reviews.",
      },
    ],
    strengths: ["Mobile development", "Rapid prototyping", "Self-starter"],
    overallScore: 74,
    notes:
      "Solid mid-level developer. Quick learner, offline sync project was impressive. Needs some mentorship on enterprise architecture.",
  },
  {
    id: "c004",
    name: "Sneha Kulkarni",
    role: "DevOps Engineer",
    experience: "5 years",
    location: "Mumbai, India",
    status: "Rejected",
    appliedDate: "8 May 2026",
    email: "sneha.kulkarni@email.com",
    phone: "+91 65432 10987",
    resumeUrl: "#",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["Terraform", "AWS", "GCP", "Ansible", "Jenkins", "Prometheus", "Grafana"],
    techStack: ["DevOps", "Cloud"],
    rating: 3,
    summary: [
      {
        q: "Tell us about your challenging project.",
        a: "I migrated a monolithic on-premise infrastructure to a multi-region AWS setup with zero downtime for a fintech company. The challenge was the 8-hour maintenance window restriction. I designed a blue-green deployment with DNS failover and did the cutover in 4.5 hours.",
      },
      {
        q: "How do you manage infrastructure costs?",
        a: "I treat cloud costs as a product metric. I set up cost dashboards with per-team attribution, and reduced cloud spend by 35% through right-sizing, reserved instances, and spot instances for non-critical workloads.",
      },
      {
        q: "How do you handle on-call incidents?",
        a: "Structured runbooks are everything. I believe on-call should never require heroics — if it does, that's a process failure. I write detailed runbooks for every alert, conduct blameless postmortems, and track MTTR.",
      },
    ],
    strengths: ["Cloud architecture", "Cost optimization", "Incident management"],
    overallScore: 69,
    notes:
      "Candidate was technically skilled, but team felt communication style was too defensive. Decided not to move forward.",
  },
  {
    id: "c005",
    name: "Kiran Nair",
    role: "Machine Learning Engineer",
    experience: "4 years",
    location: "Chennai, India",
    status: "Shortlisted",
    appliedDate: "11 May 2026",
    email: "kiran.nair@email.com",
    phone: "+91 54321 09876",
    resumeUrl: "#",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    skills: ["Python", "PyTorch", "TensorFlow", "MLflow", "SQL", "Spark", "Hugging Face"],
    techStack: ["ML/AI", "Data"],
    rating: 5,
    summary: [
      {
        q: "Tell us about your challenging project.",
        a: "I built a real-time fraud detection model that processes 500 transactions per second with sub-10ms latency. The challenge was class imbalance — fraud is 0.1% of transactions. I used isolation forests and a transformer on transaction sequences, reducing false positives by 45%.",
      },
      {
        q: "How do you handle model drift in production?",
        a: "I treat models like software. I set up feature drift detection using PSI scores and performance monitoring on a holdout set. When drift is detected, I have automated pipelines that trigger retraining with recent data.",
      },
      {
        q: "How do you communicate ML results to non-technical stakeholders?",
        a: "I lead with business impact, not metrics. Instead of saying 'precision is 94%', I say 'we'll flag 8 additional fraud cases while sending 2 fewer false alarms to customers'. I use visual dashboards and avoid jargon.",
      },
    ],
    strengths: ["ML infrastructure", "Model optimization", "Stakeholder communication"],
    overallScore: 91,
    notes:
      "Superb ML candidate, excellent blend of deep engineering capability and high business acumen. Strong recommend.",
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  Helpers                                                    */
/* ─────────────────────────────────────────────────────────── */
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStatusClass(status: string) {
  switch (status) {
    case "Shortlisted":  return "status-shortlisted";
    case "Under Review": return "status-review";
    case "New":          return "status-new";
    case "Rejected":     return "status-rejected";
    default:             return "status-new";
  }
}

function getScoreClass(score: number) {
  if (score >= 85) return "score-high";
  if (score >= 70) return "score-mid";
  return "score-low";
}

/* ─────────────────────────────────────────────────────────── */
/*  Main App Component                                         */
/* ─────────────────────────────────────────────────────────── */
export default function App() {
  const [isAuthenticated, setIsAuthenticated]   = useState(false);
  const [candidates, setCandidates]             = useState(INITIAL_CANDIDATES);
  const [view, setView]                         = useState("admin");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showShareModal, setShowShareModal]     = useState(false);
  const [candidateToShare, setCandidateToShare] = useState<any>(null);
  const [searchQuery, setSearchQuery]           = useState("");
  const [statusFilter, setStatusFilter]         = useState("All");
  const [techFilter, setTechFilter]             = useState("All");

  /* Shared-link deep-link handling */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params   = new URLSearchParams(window.location.search);
    const sharedId = params.get("shared");
    if (sharedId) {
      const found = candidates.find((c) => c.id === sharedId);
      if (found) {
        setSelectedCandidate(found);
        setView("customer");
      }
    }
  }, [candidates]);

  const handleUpdateCandidate = (updated: any) => {
    setCandidates((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    if (selectedCandidate?.id === updated.id) setSelectedCandidate(updated);
  };

  const handleSelectCandidate = (c: any) => {
    setSelectedCandidate(c);
    setView("profile");
  };

  const handleBackToDashboard = () => {
    setView("admin");
    setSelectedCandidate(null);
  };

  const handleTriggerShare = (c: any) => {
    setCandidateToShare(c);
    setShowShareModal(true);
  };

  const filteredCandidates = candidates.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q));
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchTech   = techFilter   === "All" || c.techStack.includes(techFilter);
    return matchSearch && matchStatus && matchTech;
  });

  const statusesList = ["All", "New", "Under Review", "Shortlisted", "Rejected"];
  const techList     = ["All", "Frontend", "Backend", "Full Stack", "DevOps", "Cloud", "Mobile", "ML/AI"];
  const isCustomerViewing = view === "customer" && selectedCandidate;

  /* ── Unauthenticated ───────────────────────────────────── */
  if (!isAuthenticated && !isCustomerViewing) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  /* ── Authenticated Shell ───────────────────────────────── */
  return (
    <div
      className="min-h-screen flex text-[#1a1614]"
      style={{ background: "var(--background)" }}
    >
      {/* ── Share Modal ────────────────────────────────── */}
      {showShareModal && candidateToShare && (
        <ShareModal
          candidate={candidateToShare}
          onClose={() => {
            setShowShareModal(false);
            setCandidateToShare(null);
          }}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────── */}
      {!isCustomerViewing && (
        <Sidebar
          activeView={view}
          onViewChange={(v: string) => {
            setView(v);
            setSelectedCandidate(null);
          }}
          onLogout={() => {
            setIsAuthenticated(false);
            setView("admin");
            setSelectedCandidate(null);
          }}
        />
      )}

      {/* ── Main Workspace ─────────────────────────────── */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">

        {/* ─── Top Header ─────────────────────────────── */}
        <header
          className="h-14 px-6 flex items-center justify-between sticky top-0 z-10 shrink-0 glass-effect"
          style={{ borderBottom: "1px solid var(--rule)" }}
        >
          <div className="flex items-center gap-3">
            {isCustomerViewing ? (
              <div className="flex items-center gap-2.5">
                <div className="monogram">T</div>
                <div>
                  <div
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "var(--foreground)", letterSpacing: "0.1em" }}
                  >
                    TalentDesk
                  </div>
                  <div
                    className="text-[10px] tracking-widest uppercase"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    Secure Assessment Share
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Decorative rule */}
                <div
                  style={{
                    width: 3,
                    height: 18,
                    background: "linear-gradient(180deg, var(--gold), transparent)",
                    borderRadius: 2,
                  }}
                />
                <h2
                  className="text-sm font-bold capitalize tracking-wide"
                  style={{ color: "var(--foreground)" }}
                >
                  {view === "admin"
                    ? "Recruiter Dashboard"
                    : view === "profile"
                    ? "Candidate Workspace"
                    : "Recruitment Portal"}
                </h2>
              </div>
            )}
          </div>

          {/* Session indicator */}
          <div
            className="flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase"
            style={{ color: "var(--foreground-muted)" }}
          >
            {isCustomerViewing ? (
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-sm"
                style={{
                  background: "rgba(201,169,110,0.08)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  color: "var(--gold)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gold)", animation: "gold-pulse 2s infinite" }}
                />
                Reviewing Shared Profile
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#2d6a4f" }}
                />
                Authorized Session
              </div>
            )}
          </div>
        </header>

        {/* ─── Page Content ───────────────────────────── */}
        <div className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">

          {/* ── 1. Admin Dashboard ─────────────────────── */}
          {view === "admin" && (
            <>
              {/* Page heading */}
              <div className="page-header animate-fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="section-label mb-1">Assessment Board</p>
                    <h1
                      className="flex items-center gap-2.5"
                      style={{ color: "var(--foreground)" }}
                    >
                      Candidate Screening
                      <Sparkles
                        className="w-5 h-5"
                        style={{ color: "var(--gold)" }}
                      />
                    </h1>
                    <p
                      className="mt-1.5 text-sm leading-relaxed"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      Manage applications, review recorded introductions, and share
                      evaluations securely with your clients.
                    </p>
                  </div>

                  {/* Decorative date stamp */}
                  <div
                    className="text-right hidden md:block"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <div className="text-[10px] font-bold tracking-widest uppercase">
                      Session Date
                    </div>
                    <div className="text-xs mt-0.5">
                      {new Date().toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <AnalyticsPanel candidates={candidates} />

              {/* ── Filters ────────────────────────────── */}
              <div className="filter-bar flex flex-col md:flex-row gap-3 items-center justify-between animate-fade-in delay-75">
                {/* Search */}
                <div className="relative w-full md:w-96 shrink-0">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                    style={{ color: "var(--foreground-muted)" }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, role, or skill…"
                    className="w-full pl-9 pr-4 py-2 text-[13px]"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--rule-strong)",
                      borderRadius: 3,
                      color: "var(--foreground)",
                    }}
                  />
                </div>

                {/* Dropdowns */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
                  <div
                    className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase shrink-0"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filter
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-2 px-3 text-[12px] font-semibold"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--rule-strong)",
                      borderRadius: 3,
                      color: "var(--foreground)",
                    }}
                  >
                    {statusesList.map((s) => (
                      <option key={s} value={s}>
                        {s === "All" ? "All Stages" : s}
                      </option>
                    ))}
                  </select>

                  <select
                    value={techFilter}
                    onChange={(e) => setTechFilter(e.target.value)}
                    className="py-2 px-3 text-[12px] font-semibold"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--rule-strong)",
                      borderRadius: 3,
                      color: "var(--foreground)",
                    }}
                  >
                    {techList.map((t) => (
                      <option key={t} value={t}>
                        {t === "All" ? "All Domains" : t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ── Candidate Cards ─────────────────────── */}
              <div className="space-y-3 animate-fade-in delay-100">
                {/* Pool label */}
                <div className="flex justify-between items-center px-1">
                  <span
                    className="text-[11px] font-bold tracking-widest uppercase"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    Candidate Pool — {filteredCandidates.length} record
                    {filteredCandidates.length !== 1 ? "s" : ""}
                  </span>
                  <span
                    className="text-[11px] font-bold tracking-widest uppercase"
                    style={{ color: "var(--gold)" }}
                  >
                    Ranked · Best Match
                  </span>
                </div>

                {/* Horizontal gold rule */}
                <div className="gold-rule" />

                {/* Cards */}
                {filteredCandidates.map((cand, idx) => (
                  <div
                    key={cand.id}
                    className="animate-rise"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <CandidateCard
                      candidate={cand}
                      onSelect={handleSelectCandidate}
                    />
                  </div>
                ))}

                {/* Empty state */}
                {filteredCandidates.length === 0 && (
                  <div className="empty-state animate-fade-in">
                    <Users
                      className="w-9 h-9 mx-auto mb-3"
                      style={{ color: "var(--rule-strong)" }}
                    />
                    <h3
                      className="text-sm font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      No Matching Candidates
                    </h3>
                    <p
                      className="text-xs mt-1.5 max-w-xs mx-auto leading-relaxed"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      Adjust your search keyword or selection filters to find
                      additional profiles in the talent pool.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── 2. Candidate Detail Profile ─────────────── */}
          {view === "profile" && selectedCandidate && (
            <CandidateDetails
              candidate={selectedCandidate}
              onBack={handleBackToDashboard}
              onShareClick={() => handleTriggerShare(selectedCandidate)}
              onUpdateCandidate={handleUpdateCandidate}
            />
          )}

          {/* ── 3. Customer / Shared View ───────────────── */}
          {view === "customer" && selectedCandidate && (
            <div className="space-y-5">
              {/* Safety banner */}
              <div className="alert-gold flex gap-3.5 animate-fade-in">
                <div
                  className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-sm"
                  style={{
                    background: "rgba(201,169,110,0.12)",
                    border: "1px solid rgba(201,169,110,0.3)",
                  }}
                >
                  <Award className="w-4.5 h-4.5" style={{ color: "var(--gold)" }} />
                </div>
                <div className="space-y-0.5">
                  <p
                    className="text-[13px] font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    Screened Candidate Profile — Confidential
                  </p>
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    You are reviewing an isolated candidate assessment package
                    shared by your TalentDesk recruiter. Review their portfolio
                    highlights, technical strengths, and introduction screening
                    answers below.
                  </p>
                </div>
              </div>

              {/* Profile read-only */}
              <CandidateDetails
                candidate={selectedCandidate}
                onBack={() => {}}
                isSharedView={true}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
