import React from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">
                polyline
              </span>
            </div>
            <h2 className="text-white text-xl font-extrabold tracking-tight">
              Pathify<span className="text-primary">AI</span>
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Platform
            </a>
            <a
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Intelligence
            </a>
            <a
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Case Studies
            </a>
            <a
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              href="#"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-white text-sm font-bold hover:text-primary transition-colors">
              Login
            </button>
            <button className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2 px-5 rounded-full transition-all glow-button">
              Join Waitlist
            </button>
          </div>
        </div>
      </header>

      <main className="relative pt-32 overflow-hidden">
        {/* Radial Glow Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent-violet/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
              v2.0 Engineering Engine Active
            </span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-[-0.04em] mb-6 max-w-5xl mx-auto">
            The Engineering Approach to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-violet neon-text-glow">
              Career Success
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-12">
            Leverage world-class AI to map your trajectory from student to
            industry leader. Build your professional future with surgical
            precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="w-full sm:w-auto min-w-[200px] h-14 bg-primary text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform glow-button flex items-center justify-center gap-2">
              Build Your Roadmap
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="w-full sm:w-auto min-w-[200px] h-14 glass-panel text-white font-bold text-lg rounded-xl hover:bg-white/5 transition-colors">
              View Demo
            </button>
          </div>

          {/* Metallic UI Mockup */}
          <div className="relative max-w-5xl mx-auto mb-32">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent-violet/50 rounded-2xl blur opacity-25"></div>
            <div className="relative aspect-video rounded-2xl glass-panel border border-white/10 p-4 shadow-2xl overflow-hidden">
              <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-white/5 p-6 flex flex-col gap-6 overflow-hidden relative z-10">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm">
                        architecture
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">
                        Career Path
                      </p>
                      <p className="text-white font-bold text-sm">
                        Senior AI Research Engineer @ Google DeepMind
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-12 bg-white/5 rounded-full"></div>
                    <div className="h-2 w-8 bg-white/5 rounded-full"></div>
                  </div>
                </div>
                {/* Mockup Roadmap Visualization */}
                <div className="flex-1 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px roadmap-line opacity-20"></div>
                  </div>
                  <div className="flex justify-between w-full relative z-10 px-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(19,91,236,0.5)]">
                        <span className="material-symbols-outlined text-white">
                          school
                        </span>
                      </div>
                      <span className="text-[10px] text-primary font-bold">
                        CURRENT
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 mt-12">
                      <div className="size-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">
                          code
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">
                        STEP 01
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 -mt-8">
                      <div className="size-14 rounded-full bg-accent-violet/20 border-2 border-accent-violet flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                        <span className="material-symbols-outlined text-white">
                          rocket_launch
                        </span>
                      </div>
                      <span className="text-[10px] text-accent-violet font-bold">
                        ACCELERATOR
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 mt-4 opacity-50">
                      <div className="size-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-500">
                          work
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-600 font-bold">
                        GOAL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt="mockup data visualization"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-10 pointer-events-none"
                data-alt="Dark abstract neural network mesh pattern background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsf9yn410vdfcaq7KwNI3tliBO1c58_z61E7j42wcVtT-ooJD-dBOn5HQ3_bFXNxlo6vVG1XH8klf6IJ1aBCYgr4f3XIwiUIxFjJB7Bh11Cgh1HhlNubg8e5-_cb6gdJF-3XkwmW9ly7GIzCvLCintafaypLT6wZRV1IF46EFoHGrDvhMj0hROv7GYsFzLKIUH1Rc9U7y7illWM_L3niNTpoYqyE0LWjXcgMLWJAbXXr_TYbGsxvhMypBKv7AeY5aibs88Bz2RAho"
              />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <p className="text-center text-slate-500 text-sm font-bold uppercase tracking-[0.3em] mb-10">
            Trusted by students at elite institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            <span className="text-2xl font-black text-white">MIT</span>
            <span className="text-2xl font-black text-white">STANFORD</span>
            <span className="text-2xl font-black text-white">OXFORD</span>
            <span className="text-2xl font-black text-white">CALTECH</span>
            <span className="text-2xl font-black text-white">HARVARD</span>
          </div>
        </section>

        {/* Bento Box Features Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-4">
              Neural Skill Mapping & <br />
              Market Intelligence
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Our bento-box architecture delivers modular AI insights to
              accelerate your professional growth via real-time data ingestion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Large Bento Card */}
            <div className="md:col-span-2 md:row-span-2 glass-panel rounded-2xl p-8 bento-hover flex flex-col justify-between group">
              <div className="relative w-full h-64 bg-slate-900/50 rounded-xl overflow-hidden mb-6 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                <img
                  alt="cybersecurity and data concept"
                  className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                  data-alt="Complex glowing circuit board data stream visualization"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKjRXaTCjEdTC3WhwJqykJthXw1540WATGNx2OeAIl-tXETVF82OZq4IKHiqSCD7MLrwAM67BKtst_PIFWt7D14HdrVG3WcLCyrhkWhn1JYzIOOvGvLOgNzt3EgJffXUOy5_zwxyWqCUtVMLaKBRQNqAVs1ib7i8z9Qma1SnT-PrDWmNR1Zzg1r3GoA3Hp4PWZjyBUSRTLJEaaOP12io5JZcbBoIJJM1aynz1fRdrYB_TjwmqPeo6B8w82GlnoHVyMt2qRkAEufc0"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-4">
                    <div className="size-16 rounded-xl glass-panel flex items-center justify-center border-primary/40 text-primary">
                      <span className="material-symbols-outlined text-4xl">
                        psychology
                      </span>
                    </div>
                    <div className="size-16 rounded-xl glass-panel flex items-center justify-center border-accent-violet/40 text-accent-violet translate-y-4">
                      <span className="material-symbols-outlined text-4xl">
                        database
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold mb-3">
                  Neural Skill Mapping
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Identify every micro-gap between your current profile and your
                  dream role with surgical precision. Our AI analyzes 10M+
                  resumes and job descriptions daily.
                </p>
              </div>
            </div>
            {/* Small Bento Card 1 */}
            <div className="glass-panel rounded-2xl p-8 bento-hover flex flex-col justify-between border-primary/20 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary">
                  query_stats
                </span>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Real-time Pulse
                </h3>
                <p className="text-slate-400 text-sm">
                  Stay ahead of market shifts with AI that tracks hiring trends
                  across 500+ global industries.
                </p>
              </div>
            </div>
            {/* Small Bento Card 2 */}
            <div className="glass-panel rounded-2xl p-8 bento-hover flex flex-col justify-between border-accent-violet/20 group">
              <div className="size-12 rounded-xl bg-accent-violet/10 flex items-center justify-center mb-6 group-hover:bg-accent-violet/20 transition-colors">
                <span className="material-symbols-outlined text-accent-violet">
                  smart_toy
                </span>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Automated Mentor
                </h3>
                <p className="text-slate-400 text-sm">
                  Get instant, high-fidelity feedback on your portfolio and
                  interview performance from synthetic experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-8 border-white/5 backdrop-blur-3xl">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-1">
                    star
                  </span>
                ))}
              </div>
              <p className="text-white font-medium mb-6 italic">
                "Pathify identified the exact certifications I needed to land my
                role at NVIDIA. It felt like having a career engineer by my
                side."
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-full bg-slate-700"
                  data-alt="Portrait of a professional young man"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkPbc0OXrdYauHUDR6FxWz6LjFPUtcNrUBRs88tms4BMGuxNuyrljm5dxADgq8g327g1IlsNgvLVqebYw9WyAupqK63nrh-qw_4_ZOykdFP7mS3b8MES7w5KyVBsydAB8hdGLHXtax2YOg5fplIpYvPoXUoRab-ZmttTUFmJNW87l55ZckYIAFL1EDShGEFmEFKq-uKPjA2kVj4VazU--P36DvawnFbRl0U6AjzL3WOlhvZ_aTbDHufJsOzUX-__-izIBCYPwZaZs')",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div>
                  <p className="text-white text-sm font-bold">Alex Chen</p>
                  <p className="text-slate-500 text-xs">ML Engineer @ NVIDIA</p>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-8 border-white/5 backdrop-blur-3xl">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-1">
                    star
                  </span>
                ))}
              </div>
              <p className="text-white font-medium mb-6 italic">
                "The precision of the roadmap is unmatched. It didn't just tell
                me what to learn, but when and why it mattered for the current
                market."
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-full bg-slate-700"
                  data-alt="Portrait of a smiling professional woman"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrtm2NArR8vt4g075N8XYq9JesY8gxQS7Dx2W5Hk8bJ8kOBfMMKYJJH78BDfR1HZ6lexNyE7ISuT-O9HH4fxDwTbbYxkQvizk5njcP71_b39QtpJJqslAvDV5AdgqOVXBNsydZdP4B2gGOfcngCGCEsickw035TCGYXJcrCjoNOktazePldsResYOzAul7VNI6Md5QmlL0AkUNnFnSFAU_FkJwfdLNHlKN9CV3OEN7GPYhlY3Aawj-JcHy9-PXwyrljuXHY5-P5dk')",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div>
                  <p className="text-white text-sm font-bold">Sarah Jenkins</p>
                  <p className="text-slate-500 text-xs">Product @ Stripe</p>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-8 border-white/5 backdrop-blur-3xl">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-1">
                    star
                  </span>
                ))}
              </div>
              <p className="text-white font-medium mb-6 italic">
                "A serious tool for serious candidates. The interview
                simulations are hauntingly accurate. Worth every penny."
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-full bg-slate-700"
                  data-alt="Portrait of a professional male in a suit"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSVP4uHYaI0ATQGj9PxnmyP20_gulpXDZMHfWY7K8Hpq5rNHcYZH15y6d5o_UhGDIgLLmIi1rDcjUWFCqsMtjb-56RK6qWMlW7yfutwNrgiIRhXRfCCbr_W9tyGEQ3rYam6Jjnf0f27p6NHzyzmbxQPBS3rUB8euWeffZTJ55xGIMyDCZvoFvdw7YFHvIWDJzaHkbxGVKMp0xs1ftq71RjPxryKzY5CAfw31XwQztYOvPmAqpQYNOQeuinJhsihXTS-7vNEh_UbmQ')",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div>
                  <p className="text-white text-sm font-bold">Marcus Thorne</p>
                  <p className="text-slate-500 text-xs">
                    Quant Analyst @ Citadel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-primary/20 p-12 text-center group">
            <div className="absolute inset-0 bg-primary/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            {/* Breathing glow effect */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20 animate-pulse"></div>
            <h2 className="relative z-10 text-white text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to Engineer Your Exit?
            </h2>
            <p className="relative z-10 text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join 15,000+ top-tier students and professionals building their
              futures on Pathify.
            </p>
            <div className="relative z-10">
              <button className="w-full max-w-md h-16 bg-primary text-white text-xl font-black rounded-2xl glow-button hover:scale-[1.02] transition-all flex items-center justify-center gap-3 mx-auto">
                START YOUR ROADMAP TODAY
                <span className="material-symbols-outlined">rocket</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">
                polyline
              </span>
              <h2 className="text-white text-xl font-extrabold tracking-tight">
                Pathify<span className="text-primary">AI</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The professional development operating system for the AI era.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Skill Mapping
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Market Pulse
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Interview Lab
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Engineering Blog
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
              <a
                className="size-10 rounded-lg glass-panel flex items-center justify-center hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
              <a
                className="size-10 rounded-lg glass-panel flex items-center justify-center hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2024 Pathify AI Labs. All rights reserved.
          </p>
          <div className="flex gap-8 text-slate-600 text-xs">
            <a className="hover:text-white transition-colors" href="#">
              Privacy Protocol
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
