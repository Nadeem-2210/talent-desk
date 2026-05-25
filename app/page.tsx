"use client";

import { useState, useEffect, useRef } from "react";

const CANDIDATES = [
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
        q: "Tell us about your most challenging project.",
        a: "I led the migration of a legacy AngularJS app to React with TypeScript at my current company — a 200k LOC codebase serving 50k daily users. The biggest challenge was maintaining zero downtime during the transition. I designed a micro-frontend architecture that let us migrate module by module over 8 months. We ended up improving page load time by 40% and reducing bug reports by 60%."
      },
      {
        q: "How do you handle performance bottlenecks?",
        a: "I start with profiling using Chrome DevTools and React Profiler before making any assumptions. In my last role I identified unnecessary re-renders causing a 300ms lag in our data table. I introduced React.memo and useMemo strategically, and moved expensive calculations to web workers. The result was sub-100ms interactions even with 10k rows."
      },
      {
        q: "Where do you see yourself in 3 years?",
        a: "I want to grow into a principal engineer role where I'm setting technical direction and mentoring a team. I'm particularly interested in design systems and developer experience — I believe the tools engineers use every day have a massive impact on what they can build."
      }
    ],
    strengths: ["System design", "Performance optimization", "Team leadership"],
    overallScore: 87,
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
        q: "Tell us about your most challenging project.",
        a: "I built a real-time notification system from scratch handling 2M events per day at my current company. The challenge was guaranteeing delivery while keeping latency under 50ms. I designed a pipeline using Kafka for event streaming, Redis for deduplication, and a custom retry mechanism for failed deliveries. We achieved 99.98% delivery rate."
      },
      {
        q: "How do you approach API design?",
        a: "I follow RESTful principles but I'm pragmatic about it. I start with the consumer — what do they actually need? I write the API contract first as an OpenAPI spec and share it with frontend teams for feedback before writing a single line of implementation. This has saved us from costly refactors multiple times."
      },
      {
        q: "What's your approach to system reliability?",
        a: "I believe reliability is designed in, not bolted on. Every service I build has circuit breakers, structured logging with trace IDs, and health endpoints from day one. I run chaos engineering experiments in staging to find failure modes before they find us in production."
      }
    ],
    strengths: ["Distributed systems", "API design", "Reliability engineering"],
    overallScore: 92,
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
        q: "Tell us about your most challenging project.",
        a: "I built a cross-platform mobile app using React Native for a logistics startup. The hardest part was handling offline-first data sync — drivers in rural areas often lose connectivity mid-delivery. I implemented a local SQLite store with a custom sync queue that reconciles with the server when connectivity returns."
      },
      {
        q: "How do you prioritize tasks when under pressure?",
        a: "I use impact vs effort. I write down everything that needs doing, estimate effort, then rank by business impact. I communicate clearly with stakeholders about what I can realistically deliver and what's being deprioritized. Surprises are worse than disappointing news delivered early."
      },
      {
        q: "What excites you about this role?",
        a: "The scale of the product and the team structure. I've been a solo developer for most of my career and I'm actively looking to be in a collaborative environment where I can learn from senior engineers. I'm excited about structured code reviews and architectural decision-making as a team."
      }
    ],
    strengths: ["Mobile development", "Rapid prototyping", "Self-starter"],
    overallScore: 74,
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
        q: "Tell us about your most challenging project.",
        a: "I migrated a monolithic on-premise infrastructure to a multi-region AWS setup with zero downtime for a fintech company. The challenge was the 8-hour maintenance window restriction from the business side. I designed a blue-green deployment with DNS failover and did the cutover in 4.5 hours."
      },
      {
        q: "How do you manage infrastructure costs?",
        a: "I treat cloud costs as a product metric. I set up cost dashboards with per-team attribution so engineers can see the cost impact of their services. I've reduced cloud spend by 35% in my current role through right-sizing, reserved instances, and spot instances for non-critical workloads."
      },
      {
        q: "How do you handle on-call incidents?",
        a: "Structured runbooks are everything. I believe on-call should never require heroics — if it does, that's a process failure. I write detailed runbooks for every alert, conduct blameless postmortems, and track MTTR as a team KPI."
      }
    ],
    strengths: ["Cloud architecture", "Cost optimization", "Incident management"],
    overallScore: 69,
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
        q: "Tell us about your most challenging project.",
        a: "I built a real-time fraud detection model that processes 500 transactions per second with sub-10ms latency. The challenge was class imbalance — fraud is 0.1% of transactions. I used a combination of isolation forests and a fine-tuned transformer on transaction sequences. The model reduced false positives by 45% compared to the rule-based system it replaced."
      },
      {
        q: "How do you handle model drift in production?",
        a: "I treat models like software — they need monitoring and versioning. I set up feature drift detection using PSI scores and performance monitoring on a holdout set. When drift is detected, I have automated pipelines that trigger retraining with recent data. Every model deployment is A/B tested against the previous version."
      },
      {
        q: "How do you communicate ML results to non-technical stakeholders?",
        a: "I lead with business impact, not metrics. Instead of saying 'the model has 94% precision', I say 'we'll flag 8 additional fraudulent transactions per day while sending 2 fewer false alarms to customers'. I use visual dashboards and avoid jargon in stakeholder presentations."
      }
    ],
    strengths: ["ML infrastructure", "Model optimization", "Stakeholder communication"],
    overallScore: 91,
  },
];

const STATUS_COLORS = {
  "Shortlisted": { bg: "#E1F5EE", text: "#0F6E56", dot: "#1D9E75" },
  "Under Review": { bg: "#FAEEDA", text: "#633806", dot: "#BA7517" },
  "New": { bg: "#E6F1FB", text: "#0C447C", dot: "#378ADD" },
  "Rejected": { bg: "#FCEBEB", text: "#791F1F", dot: "#E24B4A" },
};

const TECH_COLORS = {
  "Frontend": { bg: "#EEEDFE", text: "#3C3489" },
  "Backend": { bg: "#E1F5EE", text: "#0F6E56" },
  "Full Stack": { bg: "#E6F1FB", text: "#0C447C" },
  "DevOps": { bg: "#FAEEDA", text: "#633806" },
  "Cloud": { bg: "#FAEEDA", text: "#633806" },
  "Mobile": { bg: "#FBEAF0", text: "#72243E" },
  "ML/AI": { bg: "#FAECE7", text: "#712B13" },
  "Data": { bg: "#FAECE7", text: "#712B13" },
};

type AvatarProps = {
  name: string;
  size?: number;
  fontSize?: number;
};

function Avatar({ name, size = 40, fontSize = 14 }: AvatarProps) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = [
    { bg: "#EEEDFE", text: "#534AB7" },
    { bg: "#E1F5EE", text: "#0F6E56" },
    { bg: "#FAECE7", text: "#993C1D" },
    { bg: "#E6F1FB", text: "#185FA5" },
    { bg: "#FBEAF0", text: "#993556" },
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color.bg, color: color.text,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 500, fontSize, flexShrink: 0, letterSpacing: "0.5px"
    }}>{initials}</div>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS["New"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.text, borderRadius: 20,
      padding: "3px 10px", fontSize: 12, fontWeight: 500
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function SkillChip({ label, type = "skill" }) {
  const col = type === "tech" ? (TECH_COLORS[label] || { bg: "#F1EFE8", text: "#444441" }) : { bg: "#F1EFE8", text: "#444441" };
  return (
    <span style={{
      background: col.bg, color: col.text,
      borderRadius: 6, padding: "3px 9px", fontSize: 12, fontWeight: 500
    }}>{label}</span>
  );
}

function StarRating({ rating }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <i key={i} className="ti ti-star" style={{
          fontSize: 14,
          color: i <= rating ? "#BA7517" : "var(--color-border-secondary)"
        }} aria-hidden="true" />
      ))}
    </span>
  );
}

function ScoreCircle({ score }) {
  const color = score >= 85 ? "#1D9E75" : score >= 70 ? "#BA7517" : "#E24B4A";
  return (
    <div style={{
      width: 52, height: 52, borderRadius: "50%",
      border: `2px solid ${color}`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
      <span style={{ fontSize: 16, fontWeight: 500, color, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>/ 100</span>
    </div>
  );
}

function VideoPlayer({ url }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const fmt = (s) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setPlaying(!playing);
  };

  return (
    <div style={{ borderRadius: "var(--border-radius-lg)", overflow: "hidden", border: "0.5px solid var(--color-border-tertiary)", background: "#000" }}>
      <div style={{ position: "relative", background: "#111" }}>
        <video
          ref={videoRef}
          src={url}
          style={{ width: "100%", display: "block", maxHeight: 260, objectFit: "cover" }}
          onTimeUpdate={e => { setCurrentTime(e.target.currentTime); setProgress((e.target.currentTime / e.target.duration) * 100 || 0); }}
          onLoadedMetadata={e => setDuration(e.target.duration)}
          onEnded={() => setPlaying(false)}
        />
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          background: playing ? "transparent" : "rgba(0,0,0,0.35)",
          transition: "background 0.2s", cursor: "pointer"
        }} onClick={toggle}>
          {!playing && (
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <i className="ti ti-player-play" style={{ fontSize: 22, color: "#111", marginLeft: 3 }} />
            </div>
          )}
        </div>
      </div>
      <div style={{ background: "var(--color-background-primary)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={toggle} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--color-text-primary)" }}>
          <i className={`ti ti-player-${playing ? "pause" : "play"}`} style={{ fontSize: 18 }} />
        </button>
        <div style={{ flex: 1, height: 4, background: "var(--color-border-tertiary)", borderRadius: 2, cursor: "pointer" }}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            if (videoRef.current) { videoRef.current.currentTime = pct * duration; }
          }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#378ADD", borderRadius: 2, transition: "width 0.1s" }} />
        </div>
        <span style={{ fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
          {fmt(currentTime)} / {fmt(duration)}
        </span>
      </div>
    </div>
  );
}

function ShareModal({ candidate, onClose }) {
  const [copied, setCopied] = useState(false);
  const link = `https://talent.yourcompany.com/shared/${candidate.id}-${Math.random().toString(36).slice(2,8)}`;

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
      padding: 24
    }}>
      <div style={{
        background: "var(--color-background-primary)", borderRadius: "var(--border-radius-lg)",
        border: "0.5px solid var(--color-border-tertiary)", padding: "24px",
        width: "100%", maxWidth: 440
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <p style={{ fontWeight: 500, fontSize: 15, margin: 0 }}>Share candidate profile</p>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "4px 0 0" }}>
              Customer will only see {candidate.name}'s profile
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)", padding: 4 }}>
            <i className="ti ti-x" style={{ fontSize: 18 }} />
          </button>
        </div>

        <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name={candidate.name} size={36} fontSize={12} />
            <div>
              <p style={{ fontWeight: 500, fontSize: 14, margin: 0 }}>{candidate.name}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{candidate.role}</p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <StatusBadge status={candidate.status} />
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 8px" }}>Share link</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            readOnly
            value={link}
            style={{
              flex: 1, fontSize: 12, padding: "8px 10px",
              border: "0.5px solid var(--color-border-secondary)",
              borderRadius: "var(--border-radius-md)",
              background: "var(--color-background-secondary)",
              color: "var(--color-text-secondary)", outline: "none"
            }}
          />
          <button onClick={copy} style={{
            padding: "8px 14px", borderRadius: "var(--border-radius-md)",
            border: "0.5px solid var(--color-border-secondary)",
            background: copied ? "var(--color-background-success)" : "var(--color-background-primary)",
            color: copied ? "var(--color-text-success)" : "var(--color-text-primary)",
            cursor: "pointer", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6,
            transition: "all 0.2s"
          }}>
            <i className={`ti ti-${copied ? "check" : "copy"}`} style={{ fontSize: 14 }} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div style={{
          display: "flex", gap: 8, padding: "10px 12px",
          background: "var(--color-background-info)",
          borderRadius: "var(--border-radius-md)", alignItems: "flex-start"
        }}>
          <i className="ti ti-info-circle" style={{ fontSize: 15, color: "var(--color-text-info)", marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: "var(--color-text-info)", margin: 0, lineHeight: 1.5 }}>
            This link gives access to only this candidate's profile. Admin controls and other candidates remain hidden.
          </p>
        </div>
      </div>
    </div>
  );
}

function CandidateProfile({ candidate, onBack, isSharedView = false }) {
  const [showShare, setShowShare] = useState(false);

  return (
    <div style={{ position: "relative", minHeight: 400 }}>
      {showShare && <ShareModal candidate={candidate} onClose={() => setShowShare(false)} />}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        {!isSharedView && (
          <button onClick={onBack} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)", padding: "6px 12px",
            cursor: "pointer", fontSize: 13, color: "var(--color-text-secondary)"
          }}>
            <i className="ti ti-arrow-left" style={{ fontSize: 14 }} /> Back
          </button>
        )}
        <div style={{ flex: 1 }} />
        {!isSharedView && (
          <button onClick={() => setShowShare(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)", padding: "6px 14px",
            cursor: "pointer", fontSize: 13, color: "var(--color-text-primary)", fontWeight: 500
          }}>
            <i className="ti ti-share" style={{ fontSize: 14 }} /> Share with client
          </button>
        )}
        {isSharedView && (
          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: 5 }}>
            <i className="ti ti-lock" style={{ fontSize: 13 }} /> Shared view
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{
          flex: "1 1 280px", background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: "var(--border-radius-lg)", padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
            <Avatar name={candidate.name} size={52} fontSize={18} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 500, fontSize: 18, margin: 0 }}>{candidate.name}</p>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "3px 0 8px" }}>{candidate.role}</p>
              <StatusBadge status={candidate.status} />
            </div>
            <ScoreCircle score={candidate.overallScore} />
          </div>

          <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "ti-map-pin", label: candidate.location },
              { icon: "ti-briefcase", label: `${candidate.experience} experience` },
              { icon: "ti-calendar", label: `Applied ${candidate.appliedDate}` },
              ...(!isSharedView ? [
                { icon: "ti-mail", label: candidate.email },
                { icon: "ti-phone", label: candidate.phone },
              ] : [])
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <i className={`ti ${icon}`} style={{ fontSize: 14, color: "var(--color-text-tertiary)", width: 16 }} aria-hidden="true" />
                <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14, marginTop: 14 }}>
            <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Tech domains</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {candidate.techStack.map(t => <SkillChip key={t} label={t} type="tech" />)}
            </div>
          </div>

          <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14, marginTop: 14 }}>
            <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Key strengths</p>
            {candidate.strengths.map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <i className="ti ti-check" style={{ fontSize: 13, color: "#1D9E75" }} aria-hidden="true" />
                <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{s}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14, marginTop: 14 }}>
            <a href={candidate.resumeUrl} style={{
              display: "flex", alignItems: "center", gap: 8,
              color: "var(--color-text-info)", fontSize: 13, textDecoration: "none", fontWeight: 500
            }}>
              <i className="ti ti-file-text" style={{ fontSize: 15 }} aria-hidden="true" />
              View resume
              <i className="ti ti-external-link" style={{ fontSize: 12, marginLeft: "auto" }} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div style={{ flex: "2 1 340px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-lg)", padding: 20
          }}>
            <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Screening video</p>
            <VideoPlayer url={candidate.videoUrl} />
          </div>

          <div style={{
            background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-lg)", padding: 20
          }}>
            <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Skill set</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {candidate.skills.map(s => <SkillChip key={s} label={s} />)}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)", padding: 20
      }}>
        <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Interview answers</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {candidate.summary.map((item, i) => (
            <div key={i} style={{
              paddingBottom: i < candidate.summary.length - 1 ? 16 : 0,
              marginBottom: i < candidate.summary.length - 1 ? 16 : 0,
              borderBottom: i < candidate.summary.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none"
            }}>
              <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 6px", color: "var(--color-text-primary)" }}>{item.q}</p>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.65 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onSelectCandidate }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");

  const statuses = ["All", "New", "Under Review", "Shortlisted", "Rejected"];
  const techs = ["All", "Frontend", "Backend", "Full Stack", "DevOps", "Cloud", "Mobile", "ML/AI"];

  const filtered = CANDIDATES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchTech = techFilter === "All" || c.techStack.includes(techFilter);
    return matchSearch && matchStatus && matchTech;
  });

  const counts = {
    total: CANDIDATES.length,
    shortlisted: CANDIDATES.filter(c => c.status === "Shortlisted").length,
    reviewing: CANDIDATES.filter(c => c.status === "Under Review").length,
    new: CANDIDATES.filter(c => c.status === "New").length,
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total candidates", value: counts.total, icon: "ti-users" },
          { label: "Shortlisted", value: counts.shortlisted, icon: "ti-star" },
          { label: "Under review", value: counts.reviewing, icon: "ti-clock" },
          { label: "New applications", value: counts.new, icon: "ti-bell" },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-md)", padding: "14px 16px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <i className={`ti ${icon}`} style={{ fontSize: 14, color: "var(--color-text-tertiary)" }} aria-hidden="true" />
              <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{label}</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <i className="ti ti-search" style={{
            position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
            fontSize: 15, color: "var(--color-text-tertiary)", pointerEvents: "none"
          }} aria-hidden="true" />
          <input
            placeholder="Search by name, role, or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 34, width: "100%", boxSizing: "border-box", fontSize: 13 }}
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ fontSize: 13, minWidth: 130 }}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={techFilter} onChange={e => setTechFilter(e.target.value)} style={{ fontSize: 13, minWidth: 130 }}>
          {techs.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 10 }}>
        Showing {filtered.length} of {CANDIDATES.length} candidates
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(c => (
          <div
            key={c.id}
            onClick={() => onSelectCandidate(c)}
            style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: "var(--border-radius-lg)", padding: "14px 16px",
              cursor: "pointer", transition: "border-color 0.15s",
              display: "flex", alignItems: "center", gap: 14
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-border-secondary)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border-tertiary)"}
          >
            <Avatar name={c.name} size={42} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 500, fontSize: 14 }}>{c.name}</span>
                <StatusBadge status={c.status} />
              </div>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "2px 0 6px" }}>
                {c.role} · {c.experience} · {c.location}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {c.techStack.map(t => <SkillChip key={t} label={t} type="tech" />)}
                {c.skills.slice(0, 3).map(s => <SkillChip key={s} label={s} />)}
                {c.skills.length > 3 && (
                  <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", padding: "3px 0" }}>+{c.skills.length - 3} more</span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
              <ScoreCircle score={c.overallScore} />
              <StarRating rating={c.rating} />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 14 }}>
            No candidates match your filters
          </div>
        )}
      </div>
    </div>
  );
}

function CustomerView({ candidate }) {
  return (
    <div>
      <div style={{
        marginBottom: 20, padding: "12px 16px",
        background: "var(--color-background-info)",
        borderRadius: "var(--border-radius-md)",
        display: "flex", alignItems: "center", gap: 10
      }}>
        <i className="ti ti-shield-check" style={{ fontSize: 16, color: "var(--color-text-info)", flexShrink: 0 }} aria-hidden="true" />
        <p style={{ fontSize: 13, color: "var(--color-text-info)", margin: 0 }}>
          You're viewing a shared candidate profile. Contact the recruiter to discuss next steps.
        </p>
      </div>
      <CandidateProfile candidate={candidate} onBack={() => {}} isSharedView={true} />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("admin");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [sharedCandidate] = useState(CANDIDATES[1]);

  const handleSelectCandidate = (c) => {
    setSelectedCandidate(c);
    setView("profile");
  };

  const handleBack = () => {
    setView("admin");
    setSelectedCandidate(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-tertiary)", fontFamily: "var(--font-sans)" }}>
      <div style={{
        background: "var(--color-background-primary)",
        borderBottom: "0.5px solid var(--color-border-tertiary)",
        padding: "0 24px",
        display: "flex", alignItems: "center", gap: 0, height: 52
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 32 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 6,
            background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <i className="ti ti-users" style={{ fontSize: 14, color: "#fff" }} aria-hidden="true" />
          </div>
          <span style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)" }}>TalentDesk</span>
        </div>
        <div style={{ display: "flex", gap: 2, flex: 1 }}>
          {[
            { id: "admin", label: "Admin dashboard", icon: "ti-layout-dashboard" },
            { id: "customer", label: "Customer view", icon: "ti-eye" },
          ].map(tab => (
            <button key={tab.id} onClick={() => { setView(tab.id); setSelectedCandidate(null); }} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              padding: "6px 12px", borderRadius: "var(--border-radius-md)",
              fontSize: 13, fontWeight: view.startsWith(tab.id) ? 500 : 400,
              color: view.startsWith(tab.id) ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              borderBottom: view.startsWith(tab.id) || (tab.id === "admin" && view === "profile") ? "2px solid #185FA5" : "2px solid transparent",
              borderRadius: 0, paddingTop: 4, paddingBottom: 4
            }}>
              <i className={`ti ${tab.icon}`} style={{ fontSize: 14 }} aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>Admin</span>
          <Avatar name="Admin User" size={28} fontSize={11} />
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>
        {view === "admin" && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 4px" }}>Screened candidates</h1>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>Review and share candidate profiles with clients</p>
            </div>
            <AdminDashboard onSelectCandidate={handleSelectCandidate} />
          </>
        )}
        {view === "profile" && selectedCandidate && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 4px" }}>{selectedCandidate.name}</h1>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>{selectedCandidate.role}</p>
            </div>
            <CandidateProfile candidate={selectedCandidate} onBack={handleBack} />
          </>
        )}
        {view === "customer" && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 4px" }}>Candidate profile</h1>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>Shared by your recruiter</p>
            </div>
            <CustomerView candidate={sharedCandidate} />
          </>
        )}
      </div>
    </div>
  );
}
