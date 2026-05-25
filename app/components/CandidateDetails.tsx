"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Share2,
  Lock,
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  FileText,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Plus,
  Trash2,
  Star,
} from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  status: string;
  appliedDate: string;
  email: string;
  phone: string;
  resumeUrl: string;
  videoUrl: string;
  skills: string[];
  techStack: string[];
  rating: number;
  overallScore: number;
  summary: Array<{ q: string; a: string }>;
  strengths: string[];
  notes?: string;
};

type CandidateDetailsProps = {
  candidate: Candidate;
  onBack: () => void;
  isSharedView?: boolean;
  onShareClick?: () => void;
  onUpdateCandidate?: (updated: Candidate) => void;
};

export default function CandidateDetails({
  candidate,
  onBack,
  isSharedView = false,
  onShareClick,
  onUpdateCandidate,
}: CandidateDetailsProps) {
  // Video Player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  // Skill Editor state
  const [newSkill, setNewSkill] = useState("");

  // Recruiter Notes state
  const [notes, setNotes] = useState(candidate.notes || "");
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    // Reset video state when candidate changes
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setNotes(candidate.notes || "");
    setNoteSaved(false);
  }, [candidate]);

  // Video Formatting
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = clickPct * duration;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !muted;
    videoRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    videoRef.current.volume = val;
    setVolume(val);
    setMuted(val === 0);
    videoRef.current.muted = val === 0;
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Recruiter triggers updates back to parent state
  const triggerUpdate = (updates: Partial<Candidate>) => {
    if (onUpdateCandidate) {
      onUpdateCandidate({
        ...candidate,
        ...updates,
      });
    }
  };

  // Actions
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    triggerUpdate({ status: e.target.value });
  };

  const handleRatingChange = (newRating: number) => {
    if (isSharedView) return;
    triggerUpdate({ rating: newRating });
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    triggerUpdate({ overallScore: parseInt(e.target.value) || 0 });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || isSharedView) return;
    if (!candidate.skills.includes(newSkill.trim())) {
      triggerUpdate({ skills: [...candidate.skills, newSkill.trim()] });
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (isSharedView) return;
    triggerUpdate({ skills: candidate.skills.filter((s) => s !== skillToRemove) });
  };

  const handleSaveNotes = () => {
    triggerUpdate({ notes: notes });
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const scoreColor =
    candidate.overallScore >= 85
      ? "text-emerald-500 border-emerald-500/30"
      : candidate.overallScore >= 70
      ? "text-amber-500 border-amber-500/30"
      : "text-rose-500 border-rose-500/30";

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Detail Headers */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 card-shadow">
        <div className="flex items-center gap-3">
          {!isSharedView && (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
              {candidate.name}
              {isSharedView && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/40 dark:border-slate-800">
                  <Lock className="w-3 h-3 text-slate-400" />
                  Shared View
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">Recruitment Profile & Video screening</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isSharedView && onShareClick && (
            <button
              onClick={onShareClick}
              className="flex items-center gap-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share Profile with Client
            </button>
          )}
        </div>
      </div>

      {/* Main Core Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Workspace */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow flex flex-col gap-5">
            {/* Initials & Status Badge */}
            <div className="flex justify-between items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500/15 to-indigo-600/5 border border-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-xl shrink-0">
                {candidate.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </div>

              {/* Assessment score display */}
              <div className={`w-14 h-14 border-2 rounded-full flex flex-col items-center justify-center font-bold text-sm ${scoreColor}`}>
                {candidate.overallScore}
                <span className="text-[7px] text-slate-400 dark:text-slate-500 font-semibold leading-none uppercase">Score</span>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white leading-tight">{candidate.name}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">{candidate.role}</p>
            </div>

            {/* Recruiter Evaluation Panel (Disabled in Client View) */}
            {!isSharedView && (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Recruiter Actions</p>
                
                {/* Pipelines Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Application Stage</label>
                  <select
                    value={candidate.status}
                    onChange={handleStatusChange}
                    className="w-full text-xs font-semibold py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Score Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>Overall Score</span>
                    <span className="font-bold text-indigo-500 dark:text-indigo-400">{candidate.overallScore} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={candidate.overallScore}
                    onChange={handleScoreChange}
                    className="w-full accent-indigo-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Star rating setter */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Recruiter Rating</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="text-slate-300 dark:text-slate-700 hover:scale-110 active:scale-95 transition-all"
                      >
                        <Star
                          className={`w-5.5 h-5.5 ${
                            star <= candidate.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-slate-200 dark:text-slate-800"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Info Details List */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{candidate.experience} experience</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Applied {candidate.appliedDate}</span>
              </div>
              {!isSharedView && (
                <>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{candidate.phone}</span>
                  </div>
                </>
              )}
            </div>

            {/* Tech Stack Area */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Tech Domains</span>
              <div className="flex flex-wrap gap-1.5">
                {candidate.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-950/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Strengths */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2.5">Key Strengths</span>
              <div className="space-y-2">
                {candidate.strengths.map((str) => (
                  <div key={str} className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Link */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <a
                href={candidate.resumeUrl}
                className="w-full flex items-center justify-between p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5" />
                  View Original Resume PDF
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Video Screening & Skills Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom video screening component */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3">Assessment Screening Video</span>

            {/* Premium custom HTML5 Video Player */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-slate-200/20 dark:border-slate-800/80 shadow-md group/video">
              <video
                ref={videoRef}
                src={candidate.videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setPlaying(false)}
                className="w-full h-full object-cover max-h-[350px]"
              />

              {/* Big Glass Center Play Button */}
              {!playing && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/25 cursor-pointer transition-all duration-300 hover:bg-black/35"
                >
                  <button className="w-14 h-14 rounded-full flex items-center justify-center bg-white/90 dark:bg-white text-slate-900 shadow-xl scale-95 hover:scale-100 transition-all">
                    <Play className="w-6 h-6 fill-slate-900 ml-1" />
                  </button>
                </div>
              )}

              {/* Custom Controls Bar overlay */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col gap-2.5 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                {/* Styled progress bar */}
                <div className="w-full flex items-center gap-2 group/timeline">
                  <div
                    onClick={handleProgressBarClick}
                    className="flex-1 h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer transition-all relative overflow-hidden"
                  >
                    <div
                      style={{ width: `${progress}%` }}
                      className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Visual Buttons Controls Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-4">
                    {/* Play / Pause Toggle */}
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-indigo-400 transition-colors p-1"
                    >
                      {playing ? <Pause className="w-4.5 h-4.5 fill-white" /> : <Play className="w-4.5 h-4.5 fill-white" />}
                    </button>

                    {/* Mute button */}
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-indigo-400 transition-colors p-1"
                    >
                      {muted || volume === 0 ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                    </button>

                    {/* Volume slider */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={muted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 accent-indigo-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hidden sm:block"
                    />

                    {/* Timestamp */}
                    <span className="font-semibold text-slate-300 text-[11px] font-mono leading-none pt-0.5">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Fullscreen button */}
                  <button
                    onClick={handleFullscreen}
                    className="text-white hover:text-indigo-400 transition-colors p-1"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Skill chips with custom editor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow">
            <div className="flex items-center justify-between mb-3.5 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Candidate Technical Skills</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Select tags to review or filter domains</p>
              </div>

              {/* Tag Insertion Field (Disabled for customer) */}
              {!isSharedView && (
                <form onSubmit={handleAddSkill} className="flex gap-1">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill..."
                    className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 w-24 sm:w-28 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="group/tag inline-flex items-center gap-1 px-3 py-1 bg-slate-50 dark:bg-slate-950/20 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl border border-slate-200/40 dark:border-slate-800/60"
                >
                  {skill}
                  {!isSharedView && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-500 rounded-full hover:bg-rose-500/5 transition-colors p-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {candidate.skills.length === 0 && (
                <span className="text-xs text-slate-400 italic">No skills registered. Add one above!</span>
              )}
            </div>
          </div>

          {/* Notes Area (Disabled in customer view) */}
          {!isSharedView && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2.5">Recruiter Assessment Notepad</span>
              
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Leave assessment comments, interview feedback, or screening observations. These are preserved locally for recruiter teams..."
                  className="w-full min-h-[90px] text-xs py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none resize-y leading-relaxed"
                />

                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] text-slate-400">Notes are synced dynamically with the active workspace session.</p>
                  <button
                    onClick={handleSaveNotes}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] shrink-0 shadow-sm ${
                      noteSaved
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400"
                        : "bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400"
                    }`}
                  >
                    {noteSaved ? "Notes Saved!" : "Save Comments"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Q&A interview answers bubbles */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 card-shadow">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-4">Screening Interview Answers</span>
            <div className="space-y-4">
              {candidate.summary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200/40 dark:border-slate-800/60 space-y-2.5 text-xs text-slate-600 dark:text-slate-300"
                >
                  <p className="font-bold text-slate-800 dark:text-white flex gap-2">
                    <span className="text-indigo-500 dark:text-indigo-400 font-extrabold shrink-0">Q{idx + 1}:</span>
                    {item.q}
                  </p>
                  <p className="leading-relaxed border-l-2 border-slate-200 dark:border-slate-800 pl-3 italic">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
