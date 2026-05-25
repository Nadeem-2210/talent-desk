"use client";

import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, LogIn, Award, Users, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import AnalyticsPanel from "./components/AnalyticsPanel";
import CandidateCard from "./components/CandidateCard";
import CandidateDetails from "./components/CandidateDetails";
import ShareModal from "./components/ShareModal";

// Initial Candidates Data
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
        a: "I led the migration of a AngularJS app to React with TypeScript at my current company — a 200k LOC codebase serving 50k daily users. The biggest challenge was maintaining zero downtime. I designed a micro-frontend architecture migrating module by module over 8 months, improving page load by 40%."
      },
      {
        q: "How do you handle performance bottlenecks?",
        a: "I start with profiling using Chrome DevTools. In my last role, I identified unnecessary re-renders in a grid. I introduced React.memo and useMemo, and moved heavy calculations to web workers, achieving sub-100ms interactions with 10k rows."
      },
      {
        q: "Where do you see yourself in 3 years?",
        a: "I want to grow into a principal engineer role setting tech direction and mentoring. I'm highly interested in design systems and developer experience — the tools engineers use have a massive impact."
      }
    ],
    strengths: ["System design", "Performance optimization", "Team leadership"],
    overallScore: 87,
    notes: "Very strong candidate, demonstrated deep architectural expertise and excellent communication skills. Recommended for final review.",
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
        a: "I built a real-time notification system from scratch handling 2M events per day. The challenge was guaranteeing delivery while keeping latency under 50ms. I designed a pipeline using Kafka, Redis deduplication, and a custom retry queue, achieving a 99.98% delivery rate."
      },
      {
        q: "How do you approach API design?",
        a: "I follow RESTful principles but remain pragmatic. I start with the consumer — what do they need? I write the API contract as an OpenAPI spec first and share it with frontend teams for feedback before writing code."
      },
      {
        q: "What's your approach to system reliability?",
        a: "I believe reliability is designed in. Every service I build has circuit breakers, structured logging with trace IDs, and health endpoints from day one. I run chaos engineering experiments in staging."
      }
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
        a: "I built a cross-platform mobile app using React Native. The hardest part was handling offline-first data sync for drivers in rural areas. I implemented a local SQLite store with a custom sync queue that reconciles with the server when connectivity returns."
      },
      {
        q: "How do you prioritize tasks when under pressure?",
        a: "I use impact vs effort. I rank tasks by business value and communicate clearly with stakeholders about what is realistic. Surprises are worse than disappointing news delivered early."
      },
      {
        q: "What excites you about this role?",
        a: "The scale of the product and collaborative structure. I've been a solo developer and look forward to being in an environment where I can learn from senior engineers and participate in code reviews."
      }
    ],
    strengths: ["Mobile development", "Rapid prototyping", "Self-starter"],
    overallScore: 74,
    notes: "Solid mid-level developer. Quick learner, offline sync project was impressive. Needs some mentorship on enterprise architecture.",
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
        a: "I migrated a monolithic on-premise infrastructure to a multi-region AWS setup with zero downtime for a fintech company. The challenge was the 8-hour maintenance window restriction. I designed a blue-green deployment with DNS failover and did the cutover in 4.5 hours."
      },
      {
        q: "How do you manage infrastructure costs?",
        a: "I treat cloud costs as a product metric. I set up cost dashboards with per-team attribution, and reduced cloud spend by 35% through right-sizing, reserved instances, and spot instances for non-critical workloads."
      },
      {
        q: "How do you handle on-call incidents?",
        a: "Structured runbooks are everything. I believe on-call should never require heroics — if it does, that's a process failure. I write detailed runbooks for every alert, conduct blameless postmortems, and track MTTR."
      }
    ],
    strengths: ["Cloud architecture", "Cost optimization", "Incident management"],
    overallScore: 69,
    notes: "Candidate was technically skilled, but team felt communication style was too defensive. Decided not to move forward.",
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
        a: "I built a real-time fraud detection model that processes 500 transactions per second with sub-10ms latency. The challenge was class imbalance — fraud is 0.1% of transactions. I used isolation forests and a transformer on transaction sequences, reducing false positives by 45%."
      },
      {
        q: "How do you handle model drift in production?",
        a: "I treat models like software. I set up feature drift detection using PSI scores and performance monitoring on a holdout set. When drift is detected, I have automated pipelines that trigger retraining with recent data."
      },
      {
        q: "How do you communicate ML results to non-technical stakeholders?",
        a: "I lead with business impact, not metrics. Instead of saying 'precision is 94%', I say 'we'll flag 8 additional fraud cases while sending 2 fewer false alarms to customers'. I use visual dashboards and avoid jargon."
      }
    ],
    strengths: ["ML infrastructure", "Model optimization", "Stakeholder communication"],
    overallScore: 91,
    notes: "Superb ML candidate, excellent blend of deep engineering capability and high business acumen. Strong recommend.",
  },
];

export default function App() {
  // Application Session States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [view, setView] = useState("admin"); // 'admin' | 'profile' | 'customer'
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  
  // Modals state
  const [showShareModal, setShowShareModal] = useState(false);
  const [candidateToShare, setCandidateToShare] = useState<any>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");

  // Route URL queries watcher (simulates shared profile entry bypass)
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

  // Sync state helpers
  const handleUpdateCandidate = (updated: any) => {
    setCandidates((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    if (selectedCandidate && selectedCandidate.id === updated.id) {
      setSelectedCandidate(updated);
    }
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

  // Filtered Candidates logic
  const filteredCandidates = candidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchTech = techFilter === "All" || c.techStack.includes(techFilter);

    return matchSearch && matchStatus && matchTech;
  });

  const statusesList = ["All", "New", "Under Review", "Shortlisted", "Rejected"];
  const techList = ["All", "Frontend", "Backend", "Full Stack", "DevOps", "Cloud", "Mobile", "ML/AI"];

  // Customer Shared link bypass check
  const isCustomerViewing = view === "customer" && selectedCandidate;

  // Unauthenticated view
  if (!isAuthenticated && !isCustomerViewing) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-100">
      
      {/* Modals rendering */}
      {showShareModal && candidateToShare && (
        <ShareModal
          candidate={candidateToShare}
          onClose={() => {
            setShowShareModal(false);
            setCandidateToShare(null);
          }}
        />
      )}

      {/* Navigation Sidebar (Hidden in Customer Shared View) */}
      {!isCustomerViewing && (
        <Sidebar
          activeView={view}
          onViewChange={(v) => {
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

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Header Navigation Glass Bar */}
        <header className="h-16 px-6 glass-effect border-b border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            {isCustomerViewing ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                  T
                </div>
                <span className="font-bold text-sm text-slate-800 dark:text-white">TalentDesk Secure Share</span>
              </div>
            ) : (
              <h2 className="text-sm font-bold text-slate-800 dark:text-white capitalize">
                {view === "admin" ? "Recruiter Dashboard" : view === "profile" ? "Candidate Workspace" : "Recruitment Portal"}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            {isCustomerViewing ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-full">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                Reviewing Shared Link
              </span>
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>Authorized Recruiter Session</span>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Pages Area */}
        <div className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
          
          {/* 1. Admin candidates list view */}
          {view === "admin" && (
            <>
              {/* Introduction Title block */}
              <div className="animate-fade-in">
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
                  Candidate Screening Board
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                </h1>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                  Manage applications, screen introduction profiles, and securely share evaluations with clients.
                </p>
              </div>

              {/* Recruitment statistics cards grid */}
              <AnalyticsPanel candidates={candidates} />

              {/* Filtering Controls */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 card-shadow flex flex-col md:flex-row gap-3 items-center justify-between animate-fade-in delay-75">
                {/* Search bar */}
                <div className="relative w-full md:w-96 shrink-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, role, or skill tag..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Dropdowns filters row */}
                <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center justify-end">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold shrink-0">
                    <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                    <span>Filters:</span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-2 px-3 border border-slate-200 dark:border-slate-800/80 rounded-xl bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold text-slate-600 dark:text-slate-300 focus:outline-none"
                  >
                    {statusesList.map((stat) => (
                      <option key={stat} value={stat}>
                        {stat === "All" ? "All Stages" : stat}
                      </option>
                    ))}
                  </select>

                  {/* Domain dropdown */}
                  <select
                    value={techFilter}
                    onChange={(e) => setTechFilter(e.target.value)}
                    className="py-2 px-3 border border-slate-200 dark:border-slate-800/80 rounded-xl bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold text-slate-600 dark:text-slate-300 focus:outline-none"
                  >
                    {techList.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech === "All" ? "All Domains" : tech}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Candidates Grid lists */}
              <div className="space-y-3 animate-fade-in delay-100">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400 dark:text-slate-500 px-1">
                  <span>Filtered Candidate Pool ({filteredCandidates.length})</span>
                  <span>Sort: Best Match</span>
                </div>

                {filteredCandidates.map((cand) => (
                  <CandidateCard
                    key={cand.id}
                    candidate={cand}
                    onSelect={handleSelectCandidate}
                  />
                ))}

                {filteredCandidates.length === 0 && (
                  <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 rounded-2xl p-8 card-shadow">
                    <Users className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">No Matching Candidates</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                      Adjust your search keyword or selection filters to find additional profiles.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 2. Deep Dive Candidate profile details workspace */}
          {view === "profile" && selectedCandidate && (
            <CandidateDetails
              candidate={selectedCandidate}
              onBack={handleBackToDashboard}
              onShareClick={() => handleTriggerShare(selectedCandidate)}
              onUpdateCandidate={handleUpdateCandidate}
            />
          )}

          {/* 3. Customer Shared candidate view */}
          {view === "customer" && selectedCandidate && (
            <div className="space-y-6">
              {/* Informative Safety Banner for clients */}
              <div className="flex gap-3.5 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-950/30 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 animate-fade-in">
                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shrink-0">
                  <Award className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="space-y-1 leading-relaxed">
                  <span className="font-bold text-[13px] flex items-center gap-1">
                    Screened Candidate Profile Available
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    You are reviewing an isolated candidate assessment package shared by your TalentDesk recruiter. Review their portfolio highlights, technical strengths, and introduction screening answers below.
                  </p>
                </div>
              </div>

              {/* Profile Details (Isolated view for client review) */}
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
