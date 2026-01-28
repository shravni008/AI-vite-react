const ResumeAnalyzer = ({ onAnalyze, analysis, loading }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
        AI Resume Analyzer
      </h2>

      {!analysis ? (
        <div className="glass-panel p-10 rounded-3xl border-dashed border-2 border-white/20 flex flex-col items-center justify-center text-center gap-6 hover:border-primary/50 transition-all">
          <div className="size-20 bg-white/5 rounded-full flex items-center justify-center">
            <UploadCloud size={40} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Upload your Resume
            </h3>
            <p className="text-slate-400">
              Supports .DOCX and .TXT (PDF coming soon)
            </p>
          </div>

          <input
            type="file"
            accept=".docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl cursor-pointer transition-all shadow-[0_0_20px_rgba(19,91,236,0.3)]"
          >
            {file ? file.name : "Select File"}
          </label>

          {file && (
            <button
              onClick={() => onAnalyze(file)}
              disabled={loading}
              className="mt-4 flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <CheckCircle />}
              {loading ? "Analyzing..." : "Start Analysis"}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="glass-panel p-8 rounded-2xl border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-green-500">
                score
              </span>
              Resume Score
            </h3>
            <div className="text-4xl font-black text-white mb-2">
              {analysis.score}/100
            </div>
            <p className="text-slate-400">{analysis.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-red-500">
              <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertCircle size={18} /> Critical Fixes
              </h4>
              <ul className="space-y-3">
                {analysis.weaknesses.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-red-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-cyan-500">
              <h4 className="font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Sparkles size={18} /> Strengths
              </h4>
              <ul className="space-y-3">
                {analysis.strengths.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-cyan-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => onAnalyze(null)} // Reset
            className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold transition-all"
          >
            Analyze Another Resume
          </button>
        </div>
      )}
    </div>
  );
};
