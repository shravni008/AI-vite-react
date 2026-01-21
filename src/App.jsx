import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  MessageSquare,
  Map,
  Send,
  Sparkles,
  User,
  Bot,
  AlertCircle,
  Menu,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

// 🔴 YOUR API KEY (Keep it safe in env variables in production)
const API_KEY = "AIzaSyA_6kZu4r3IhUCxjrZVInh1ehuW92ozbdI";

function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm your AI Career Coach. Tell me your goals (e.g., 'I want to be a Full Stack Developer') and I'll help you build a path.",
    },
  ]);
  const [input, setInput] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll
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
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
      });

      let prompt = userMsg.text;
      const isRoadmapRequest =
        activeTab === "roadmap" || input.toLowerCase().includes("roadmap");

      if (isRoadmapRequest) {
        prompt = `Create a career roadmap for: "${input}". 
         RETURN ONLY RAW JSON. Do not use Markdown formatting (no \`\`\`json).
         Structure: { "title": "Role Title", "steps": [{ "phase": "Phase Name", "details": "Key topics to learn" }] }`;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (isRoadmapRequest) {
        try {
          // Clean JSON string
          const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          const json = JSON.parse(cleanText);
          setRoadmap(json);
          setMessages((prev) => [
            ...prev,
            {
              role: "model",
              text: `I've generated a roadmap for **${json.title}**! Check the Roadmap tab.`,
            },
          ]);
          setActiveTab("roadmap");
        } catch (e) {
          console.error("JSON Error", e);
          setMessages((prev) => [...prev, { role: "model", text }]); // Fallback to text
        }
      } else {
        setMessages((prev) => [...prev, { role: "model", text }]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect. Please check your API Key.");
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "⚠️ Error connecting to AI." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Animated Background Blob */}
      <div className="background-glow"></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-area">
          <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
            <Sparkles className="text-indigo-400" size={24} />
          </div>
          <h2>CareerAI</h2>
        </div>
        <nav className="flex flex-col gap-2">
          <button
            className={`nav-btn ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare size={20} /> Chat Guidance
          </button>
          <button
            className={`nav-btn ${activeTab === "roadmap" ? "active" : ""}`}
            onClick={() => setActiveTab("roadmap")}
          >
            <Map size={20} /> Career Roadmap
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="chat-container"
            >
              {/* Error Banner */}
              {error && (
                <div className="m-4 p-3 bg-red-500/10 border border-red-500/20 text-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              {/* Messages */}
              <div className="messages-area">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.role}`}>
                    <div className="avatar">
                      {msg.role === "user" ? (
                        <User size={20} className="text-white" />
                      ) : (
                        <Bot size={20} className="text-indigo-400" />
                      )}
                    </div>
                    <div className="bubble">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="message model">
                    <div className="avatar">
                      <Bot size={20} className="text-indigo-400" />
                    </div>
                    <div className="bubble flex gap-2 items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="input-wrapper">
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Ask about your career goals..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={loading}
                  />
                  <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={loading}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="messages-area"
            >
              {!roadmap ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                  <Map size={64} strokeWidth={1} />
                  <p>No roadmap generated yet. Ask for one in the Chat!</p>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className="px-6 py-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors"
                  >
                    Go to Chat
                  </button>
                </div>
              ) : (
                <div className="timeline-container">
                  <h1 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    {roadmap.title}
                  </h1>
                  <div className="timeline">
                    {roadmap.steps?.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="timeline-item"
                      >
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <h4>{step.phase}</h4>
                          <p>{step.details}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
