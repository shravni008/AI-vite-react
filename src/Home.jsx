import React from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  const { user, login, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md border border-slate-200">
          <div className="flex items-center gap-2">
            <h2 className="text-slate-900 text-xl font-extrabold tracking-tight">
              Pathify<span className="text-blue-600">AI</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link to="/admin" className="text-sm font-bold text-purple-600">
                Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  Hi, {user.displayName || "User"}
                </span>
                <button
                  onClick={logout}
                  className="text-red-500 text-sm font-bold"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/LenAi")}
                  className="bg-blue-600 text-white text-sm font-bold py-2 px-5 rounded-full"
                >
                  Workspace
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="bg-blue-600 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-40 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          The Engineering Approach to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Career Success
          </span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10">
          AI-powered career guidance, roadmap generation, and resume analysis
          built for precision.
        </p>
        <button
          onClick={() => (user ? navigate("/LenAi") : login())}
          className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
        >
          {user ? "Go to Workspace" : "Get Started Now"}
        </button>
      </main>
    </div>
  );
};

export default Home;
