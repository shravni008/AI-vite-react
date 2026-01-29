import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Map,
  Send,
  Sparkles,
  AlertCircle,
  FileText,
  Loader2,
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight,
  Trophy,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import mammoth from "mammoth";
import "./App.css";

// Import your Resume Component
import ResumeAnalyzer from "./ResumeAnalyzer";

// 🔴 YOUR API KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- 1. LANDING PAGE (Kept mostly the same) ---
export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-slate-100 font-display bg-background-dark">
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined font-bold">
                auto_awesome
              </span>
            </div>
            <span className="text-xl font-black tracking-tight uppercase">
              Career<span className="text-primary">AI</span>
            </span>
          </div>
          {/* ... (Navigation links) ... */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/LenAi")}
              className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(19,91,236,0.3)]"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-glow pointer-events-none"></div>
        <div className="relative z-10 space-y-8 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-white">
            Your Career, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              Engineered.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Generative roadmaps, resume intelligence, and instant mentorship.
          </p>
          <button
            onClick={() => navigate("/LenAi")}
            className="px-10 py-5 bg-white text-black font-black text-lg rounded-xl hover:scale-105 transition-transform"
          >
            Launch Workspace
          </button>
        </div>
      </section>
    </div>
  );
};

// --- 2. MAIN APP COMPONENT ---
export const LenAi = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm your AI Career Architect. Tell me your target role (e.g., 'DevOps Engineer') and any specific tech you want to learn (e.g., 'Docker, AWS').",
    },
  ]);
  const [input, setInput] = useState("");

  // Roadmap State
  const [roadmap, setRoadmap] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]); // Track progress IDs

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeResult, setResumeResult] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setError(null);
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (!API_KEY) throw new Error("API Key not found.");
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
      });

      let prompt = userMsg.text;
      const isRoadmapRequest =
        activeTab === "roadmap" ||
        input.toLowerCase().includes("roadmap") ||
        input.toLowerCase().includes("learn");

      if (isRoadmapRequest) {
        // --- UPGRADED PROMPT FOR STRUCTURED CHAPTERS ---
        prompt = `
          Act as a Senior Engineering Manager. Create a detailed, step-by-step career roadmap for: "${input}". 
          
          You MUST return the result in this EXACT JSON format (no markdown formatting, just raw JSON):
          {
            "role": "Target Job Title",
            "description": "A brief, inspiring overview of this path.",
            "chapters": [
              {
                "id": 1,
                "title": "Chapter 1: Foundations",
                "duration": "2 Weeks",
                "description": "What they will learn in this phase.",
                "topics": ["HTML", "CSS", "Git"],
                "key_project": "Build a personal portfolio"
              },
              {
                "id": 2,
                "title": "Chapter 2: ...",
                ...
              }
            ]
          }
          Ensure the chapters logically progress from beginner to advanced. If the user mentioned keywords (like AWS, Docker), ensure they are prominent chapters.
        `;
      }

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      if (isRoadmapRequest) {
        try {
          // Clean the response in case Gemini adds markdown code blocks
          const cleanText = text.replace(/```json|```/g, "").trim();
          const json = JSON.parse(cleanText);

          setRoadmap(json);
          setCompletedChapters([]); // Reset progress for new roadmap

          setMessages((prev) => [
            ...prev,
            {
              role: "model",
              text: `I've generated a detailed roadmap for **${json.role}**. Switch to the **Roadmap Tab** to view your interactive plan!`,
            },
          ]);
          setActiveTab("roadmap"); // Auto-switch to roadmap tab
        } catch (e) {
          console.error("JSON Parse Error", e);
          setMessages((prev) => [
            ...prev,
            {
              role: "model",
              text:
                "I created the plan, but there was a format error. Here is the raw text: \n" +
                text,
            },
          ]);
        }
      } else {
        setMessages((prev) => [...prev, { role: "model", text }]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to AI.");
    }
    setLoading(false);
  };

  const handleResumeAnalysis = async (file) => {
    // ... (Your existing Resume Logic) ...
    if (!file) {
      setResumeResult(null);
      return;
    }
    setLoading(true);
    try {
      // Simple mock for text extraction if mammoth fails or just to keep it simple here
      let textContent = "Resume content placeholder";
      // In real app, use the Mammoth logic you had.
      if (file.name.endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        textContent = result.value;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
      });
      const prompt = `Act as a Recruiter. Analyze this resume: "${textContent.slice(0, 5000)}". Output JSON: { "score": 85, "summary": "...", "strengths": ["..."], "weaknesses": ["..."] }`;

      const result = await model.generateContent(prompt);
      const cleanJson = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();
      setResumeResult(JSON.parse(cleanJson));
    } catch (e) {
      setError("Resume analysis failed");
    }
    setLoading(false);
  };

  // Toggle chapter completion
  const toggleChapter = (id) => {
    if (completedChapters.includes(id)) {
      setCompletedChapters(completedChapters.filter((c) => c !== id));
    } else {
      setCompletedChapters([...completedChapters, id]);
    }
  };

  return (
    <div className="flex h-screen bg-background-dark text-slate-100 overflow-hidden font-display selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col p-6 z-10">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
            <Sparkles className="text-primary" size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Pathify<span className="text-primary">AI</span>
          </h2>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { id: "chat", label: "Career Chat", icon: MessageSquare },
            { id: "roadmap", label: "My Roadmap", icon: Map },
            { id: "resume", label: "Resume Check", icon: FileText },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === item.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden bg-[#0B0F17]">
        {/* Background Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <AnimatePresence mode="wait">
          {/* --- CHAT TAB --- */}
          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-full"
            >
              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 scrollbar-hide">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`size-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary" : "bg-slate-700"}`}
                    >
                      {msg.role === "user" ? (
                        <span className="material-symbols-outlined text-sm">
                          person
                        </span>
                      ) : (
                        <Sparkles size={14} />
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                        msg.role === "user"
                          ? "bg-primary/10 border-primary/20 text-white"
                          : "bg-white/5 border-white/10 text-slate-300"
                      }`}
                    >
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-4">
                    <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                      <Sparkles size={14} />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                      <Loader2
                        className="animate-spin text-primary"
                        size={16}
                      />
                      <span className="text-xs text-slate-400">
                        Thinking...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  <input
                    className="flex-1 bg-transparent border-none text-white px-5 py-3 outline-none placeholder:text-slate-500 text-sm"
                    type="text"
                    placeholder="E.g., 'Plan a roadmap for a React Native Developer focusing on performance...'"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={loading}
                  />
                  <button
                    className="size-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
                    onClick={handleSend}
                    disabled={loading}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- ROADMAP TAB (NEW DESIGN) --- */}
          {activeTab === "roadmap" && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-8 overflow-y-auto scrollbar-hide"
            >
              {!roadmap ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                  <div className="size-20 rounded-full bg-white/5 flex items-center justify-center">
                    <Map size={32} className="opacity-50" />
                  </div>
                  <p>
                    Ask for a specific path in the Chat to generate your
                    roadmap.
                  </p>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className="text-primary text-sm font-bold hover:underline"
                  >
                    Go to Chat
                  </button>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto pb-20">
                  {/* Header */}
                  <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
                      <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                      Live Career Blueprint
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                      {roadmap.role}
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                      {roadmap.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-8 max-w-md mx-auto bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-1000"
                        style={{
                          width: `${(completedChapters.length / roadmap.chapters.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-mono">
                      {Math.round(
                        (completedChapters.length / roadmap.chapters.length) *
                          100,
                      )}
                      % COMPLETE
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="relative pl-4 md:pl-0">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-white/10 to-transparent md:-translate-x-1/2"></div>

                    <div className="space-y-12">
                      {roadmap.chapters?.map((chapter, index) => {
                        const isCompleted = completedChapters.includes(
                          chapter.id,
                        );
                        const isNext =
                          !isCompleted &&
                          (index === 0 ||
                            completedChapters.includes(
                              roadmap.chapters[index - 1].id,
                            ));
                        const isLocked = !isCompleted && !isNext;

                        return (
                          <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                          >
                            {/* Center Node */}
                            <div
                              onClick={() =>
                                !isLocked && toggleChapter(chapter.id)
                              }
                              className={`absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 size-16 rounded-full border-4 z-10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 bg-background-dark
                                    ${
                                      isCompleted
                                        ? "border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                                        : isNext
                                          ? "border-primary text-primary shadow-[0_0_20px_rgba(19,91,236,0.4)] animate-pulse"
                                          : "border-white/10 text-slate-600 grayscale"
                                    }
                                `}
                            >
                              {isCompleted ? (
                                <CheckCircle2 size={24} strokeWidth={3} />
                              ) : isLocked ? (
                                <Lock size={20} />
                              ) : (
                                <span className="text-xl font-bold">
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            {/* Content Card */}
                            <div
                              className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] group ${isLocked ? "opacity-50 blur-[1px]" : "opacity-100"}`}
                            >
                              <div
                                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300
                                    ${
                                      isNext
                                        ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20 shadow-2xl"
                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                    }
                                `}
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase">
                                    <span className="material-symbols-outlined text-sm">
                                      schedule
                                    </span>
                                    {chapter.duration}
                                  </div>
                                  {isNext && (
                                    <span className="text-xs font-bold text-primary animate-pulse">
                                      CURRENT FOCUS
                                    </span>
                                  )}
                                </div>

                                <h3
                                  className={`text-xl font-bold mb-2 ${isNext ? "text-white" : "text-slate-200"}`}
                                >
                                  {chapter.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                  {chapter.description}
                                </p>

                                {/* Topics Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {chapter.topics.map((topic, i) => (
                                    <span
                                      key={i}
                                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/30 border border-white/10 text-slate-300"
                                    >
                                      {topic}
                                    </span>
                                  ))}
                                </div>

                                {/* Project */}
                                {chapter.key_project && (
                                  <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-3">
                                    <div className="p-1.5 bg-accent-violet/10 rounded-md text-accent-violet mt-0.5">
                                      <Trophy size={14} />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Milestone Project
                                      </p>
                                      <p className="text-sm font-medium text-slate-200">
                                        {chapter.key_project}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* End Node */}
                      <div className="flex flex-col items-center justify-center relative z-10 pt-8">
                        <div className="size-20 bg-gradient-to-tr from-primary to-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(19,91,236,0.5)]">
                          <Trophy className="text-white" size={32} />
                        </div>
                        <p className="mt-4 text-primary font-bold tracking-widest text-sm uppercase">
                          Goal Reached
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* --- RESUME TAB (EXISTING) --- */}
          {activeTab === "resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <ResumeAnalyzer
                onAnalyze={handleResumeAnalysis}
                analysis={resumeResult}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
