import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/LenAi"); // Redirect to workspace
      } else {
        setError(result.message);
      }
    } else {
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
      );
      if (result.success) {
        setError("Account created! Ask Admin to approve access.");
        setIsLogin(true);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Join the Waitlist"}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-slate-900 rounded-lg border border-slate-700 focus:border-blue-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-slate-900 rounded-lg border border-slate-700 focus:border-blue-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-slate-900 rounded-lg border border-slate-700 focus:border-blue-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-colors">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
