import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom"; // Added for navigation
import {
  MessageSquare,
  Map,
  Send,
  Sparkles,
  User,
  Bot,
  AlertCircle,
  FileText,
  UploadCloud,
  CheckCircle,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import mammoth from "mammoth";
import "./App.css";

// 🔴 YOUR API KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- 1. LANDING PAGE (Exported) ---
export const LandingPage = () => {
  const navigate = useNavigate(); // Hook to change pages

  return (
    <div className="min-h-screen text-slate-100 font-display bg-background-dark">
      {/* Sticky Navigation */}
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
          <div className="hidden md:flex items-center gap-10">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Platform
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Solutions
            </a>
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Resources
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold px-5 py-2 hover:text-primary transition-colors">
              Log In
            </button>
            <button
              onClick={() => navigate("/LenAi")} // CHANGED: Navigates to /LenAi route
              className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-[0_0_20px_rgba(19,91,236,0.3)] hover:scale-105 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-glow pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              <span className="size-2 bg-primary rounded-full animate-pulse"></span>
              Next-Gen Career Intelligence
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-white">
              Architect Your Future with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Precision AI
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              From student to specialist—data-driven career paths tailored to
              your unique potential. Leverage world-class AI to navigate your
              professional journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/LenAi")} // CHANGED: Navigates to /LenAi
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/40 transition-all flex items-center gap-2"
              >
                Start Free Analysis
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
              <button className="px-8 py-4 glass-panel text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                View Demo
              </button>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-700 flex items-center justify-center text-xs">
                  U1
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-600 flex items-center justify-center text-xs">
                  U2
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-500 flex items-center justify-center text-xs">
                  U3
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Trusted by 12,000+ early professionals
              </p>
            </div>
          </div>
          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative glass-panel p-12 rounded-[3rem] border-white/10 shadow-2xl flex items-center justify-center">
              <div className="size-80 rounded-full bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center ai-sphere-glow animate-pulse">
                <div className="size-64 rounded-full bg-background-dark flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,#135bec,transparent_70%)]"></div>
                  <span className="material-symbols-outlined text-8xl text-white opacity-90">
                    psychology
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The Career Maze vs. The AI Advantage
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-panel p-10 rounded-3xl border-red-500/10 hover:border-red-500/30 transition-all group">
              <h3 className="text-2xl font-bold text-white mb-4">
                The Problem: Choice Paralysis
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Outdated counseling and generic advice leave students
                overwhelmed.
              </p>
            </div>
            <div className="glass-panel p-10 rounded-3xl border-primary/20 hover:border-primary/50 transition-all group relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-4">
                The Solution: AI Clarity
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                We transform raw data into a bespoke roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- RESUME COMPONENT (Internal) ---
const ResumeAnalyzer = ({ onAnalyze, analysis, loading }) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
        AI Resume Analyzer
      </h2>
      {!analysis ? (
        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border-dashed border-2 border-white/20 flex flex-col items-center justify-center text-center gap-6">
          <UploadCloud size={40} className="text-primary" />
          <h3 className="text-xl font-bold text-white">Upload your Resume</h3>
          <input
            type="file"
            accept=".docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl cursor-pointer"
          >
            {file ? file.name : "Select File"}
          </label>
          {file && (
            <button
              onClick={() => onAnalyze(file)}
              disabled={loading}
              className="mt-4 flex items-center gap-2 text-cyan-400"
            >
              {loading ? "Analyzing..." : "Start Analysis"}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/5 p-8 rounded-2xl border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-white mb-2">
              Score: {analysis.score}/100
            </h3>
            <p className="text-slate-400">{analysis.summary}</p>
          </div>
          <button
            onClick={() => onAnalyze(null)}
            className="w-full py-4 rounded-xl bg-white/5 text-slate-300"
          >
            Analyze Another
          </button>
        </div>
      )}
    </div>
  );
};

// --- 2. MAIN APP COMPONENT (Renamed & Exported) ---
export const LenAi = () => {
  // CHANGED: Renamed App to LenAi and Exported
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm your AI Career Coach. Tell me your goals!",
    },
  ]);
  const [input, setInput] = useState("");
  const [roadmap, setRoadmap] = useState(null);
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
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let prompt = userMsg.text;
      const isRoadmapRequest =
        activeTab === "roadmap" || input.toLowerCase().includes("roadmap");

      if (isRoadmapRequest) {
        prompt = `Create a career roadmap for: "${input}". RETURN ONLY RAW JSON. { "title": "Role Title", "steps": [{ "phase": "Phase Name", "details": "Topics" }] }`;
      }

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      if (isRoadmapRequest) {
        try {
          const cleanText = text.replace(/```json|```/g, "").trim();
          const json = JSON.parse(cleanText);
          setRoadmap(json);
          setMessages((prev) => [
            ...prev,
            { role: "model", text: `Roadmap generated for **${json.title}**!` },
          ]);
          setActiveTab("roadmap");
        } catch (e) {
          setMessages((prev) => [...prev, { role: "model", text }]);
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
    if (!file) {
      setResumeResult(null);
      return;
    }
    setLoading(true);
    try {
      let textContent = "";
      if (file.name.endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        textContent = result.value;
      } else if (file.name.endsWith(".txt")) {
        textContent = await file.text();
      } else {
        alert("Upload .docx only");
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Act as a Recruiter. Analyze this resume: "${textContent.slice(0, 5000)}". Output JSON: { "score": 85, "summary": "...", "strengths": [], "weaknesses": [] }`;

      const result = await model.generateContent(prompt);
      const cleanJson = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();
      setResumeResult(JSON.parse(cleanJson));
    } catch (err) {
      setError("Analysis failed.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-background-dark text-slate-100 overflow-hidden font-display">
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-primary blur-[150px] opacity-15 rounded-full pointer-events-none z-0"></div>

      <aside className="w-[280px] bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col p-8 z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
            <Sparkles className="text-primary" size={24} />
          </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CareerAI
          </h2>
        </div>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-3 w-full p-3.5 rounded-xl transition-all ${activeTab === "chat" ? "bg-primary/10 text-primary border-l-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
          >
            <MessageSquare size={20} /> Chat Guidance
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-3 w-full p-3.5 rounded-xl transition-all ${activeTab === "roadmap" ? "bg-primary/10 text-primary border-l-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
          >
            <Map size={20} /> Career Roadmap
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`flex items-center gap-3 w-full p-3.5 rounded-xl transition-all ${activeTab === "resume" ? "bg-primary/10 text-primary border-l-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
          >
            <FileText size={20} /> Resume Analyzer
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-full"
            >
              {error && (
                <div className="m-4 p-3 bg-red-500/10 text-red-200 rounded-lg flex gap-2">
                  <AlertCircle size={18} /> {error}
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 scrollbar-thin">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`p-5 rounded-2xl text-base leading-relaxed border ${msg.role === "user" ? "bg-primary text-white" : "bg-white/5"}`}
                    >
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="p-5 rounded-2xl bg-white/5 w-20 flex justify-center">
                    <Loader2 className="animate-spin text-primary" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center">
                  <input
                    className="flex-1 bg-transparent border-none text-white px-5 py-3 outline-none"
                    type="text"
                    placeholder="Ask about your career..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={loading}
                  />
                  <button
                    className="size-12 bg-primary text-white rounded-xl flex items-center justify-center"
                    onClick={handleSend}
                    disabled={loading}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeTab === "roadmap" ? (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 p-8 overflow-y-auto"
            >
              {!roadmap ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Map size={64} className="opacity-50 mb-4" />
                  <p>Ask for a roadmap in Chat!</p>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-12 text-primary">
                    {roadmap.title}
                  </h1>
                  <div className="space-y-12 pl-8 border-l-2 border-white/10">
                    {roadmap.steps?.map((step, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[41px] top-0 size-5 rounded-full bg-background-dark border-2 border-primary"></div>
                        <h4 className="text-xl font-bold text-primary mb-2">
                          {step.phase}
                        </h4>
                        <p className="text-slate-400 bg-white/5 p-4 rounded-xl">
                          {step.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
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
