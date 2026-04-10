import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const NAV_LINKS = ["Features", "How It Works", "About", "Contact"];

const FEATURES = [
  {
    icon: "⬡",
    title: "Workflow Recording",
    desc: "Capture tasks through video walkthroughs and documentation so institutional knowledge never gets lost when people leave.",
    accent: "#00C6FF",
  },
  {
    icon: "⬡",
    title: "Solution Logs",
    desc: "\"How I solved this\" logs from real work scenarios — documented, tagged, and ready for the next person facing the same challenge.",
    accent: "#7B61FF",
  },
  {
    icon: "⬡",
    title: "Task-Based Modules",
    desc: "Learning pathways built around actual job tasks, not generic courses. New hires onboard 10× faster.",
    accent: "#00FFB3",
  },
  {
    icon: "⬡",
    title: "AI Knowledge Base",
    desc: "Search your organization's entire knowledge base instantly with AI-powered semantic search.",
    accent: "#FF6B6B",
  },
  {
    icon: "⬡",
    title: "Expert Profiles",
    desc: "Map who knows what inside your org. Find the right expert instantly, even after they've moved on.",
    accent: "#FFD700",
  },
  {
    icon: "⬡",
    title: "Handoff Intelligence",
    desc: "Automated knowledge transfer checklists triggered when someone transitions roles or exits.",
    accent: "#00C6FF",
  },
];

const STATS = [
  { value: "73%", label: "of institutional knowledge is never documented" },
  { value: "42%", label: "productivity loss during employee transitions" },
  { value: "10×", label: "faster onboarding with structured knowledge capture" },
];

const HOW_STEPS = [
  { num: "01", title: "Record", desc: "Employees record their workflows, solutions, and expertise as they work — no extra effort required." },
  { num: "02", title: "Structure", desc: "AI automatically tags, categorizes, and links related knowledge into searchable modules." },
  { num: "03", title: "Transfer", desc: "New hires get instant, contextual access to exactly the knowledge they need, when they need it." },
];

// Reusable scroll-triggered fade + slide up
function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.07 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00C6FF" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
    </div>
  );
}

function Orbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(0,198,255,0.08) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
        animation: "float1 12s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "8%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
        animation: "float2 15s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(0,255,179,0.06) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
        animation: "float3 18s ease-in-out infinite"
      }} />
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  // Scroll progress → springs → top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  // Hero parallax: content drifts up + fades out as user scrolls
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020510",
      color: "#E8EDF5",
      fontFamily: "'Syne', 'DM Sans', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        @keyframes float1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50% { transform: translate(-50%,-50%) scale(1.15); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(0,198,255,0.2); }
          50% { border-color: rgba(0,198,255,0.6); }
        }

        .nav-link {
          color: #8A9BB5;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: color 0.2s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: #00C6FF;
          transition: width 0.3s;
        }
        .nav-link:hover { color: #E8EDF5; }
        .nav-link:hover::after { width: 100%; }

        .feature-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,198,255,0.4), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(0,198,255,0.2);
          transform: translateY(-4px);
        }
        .feature-card:hover::before { opacity: 1; }

        .btn-primary {
          background: linear-gradient(135deg, #00C6FF, #0072FF);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 0 30px rgba(0,198,255,0.25);
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.4s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(0,198,255,0.4); }
        .btn-primary:hover::after { left: 100%; }

        .btn-outline {
          background: transparent;
          color: #8A9BB5;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 14px 32px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-outline:hover { border-color: rgba(0,198,255,0.4); color: #E8EDF5; }

        .gradient-text {
          background: linear-gradient(135deg, #00C6FF 0%, #7B61FF 50%, #00FFB3 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .stat-card {
          background: rgba(0,198,255,0.04);
          border: 1px solid rgba(0,198,255,0.12);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          animation: pulse-border 3s ease-in-out infinite;
        }

        .tag-badge {
          display: inline-block;
          background: rgba(0,198,255,0.08);
          border: 1px solid rgba(0,198,255,0.2);
          color: #00C6FF;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020510; }
        ::-webkit-scrollbar-thumb { background: rgba(0,198,255,0.3); border-radius: 3px; }
      `}</style>

      <GridBackground />
      <Orbs />

      {/* Scroll progress bar */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 2, zIndex: 999,
        background: "linear-gradient(90deg, #00C6FF, #7B61FF, #00FFB3)",
        transformOrigin: "0%",
        scaleX,
      }} />

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, left: 0, right: 0, width: "100%", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 68,
        background: scrolled ? "rgba(2,5,16,0.85)" : "rgba(2,5,16,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(0,198,255,0.1)" : "rgba(255,255,255,0.05)"}`,
        transition: "all 0.4s",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30,
            background: "linear-gradient(135deg, #00C6FF, #7B61FF)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em" }}>
            Shadow<span style={{ color: "#00C6FF" }}>Learn</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="nav-link">{link}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-outline" style={{ padding: "9px 22px", fontSize: 14 }}>Sign In</button>
          <button className="btn-primary" style={{ padding: "9px 22px", fontSize: 14 }}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={{ padding: "100px 48px 80px", maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>

        {/* Parallax wrapper */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="tag-badge">Knowledge Transfer Platform</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.03em", marginBottom: 24,
            }}
          >
            Stop Losing Knowledge<br />
            <span className="gradient-text">When People Leave</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ color: "#607390", maxWidth: 580, margin: "0 auto 48px", fontSize: 18, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            ShadowLearn captures, structures, and transfers real work knowledge — from workflows and solution logs to expert insights — so your organization never loses critical expertise again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
          >
            <button className="btn-primary">Start Capturing Knowledge →</button>
            <button className="btn-outline">Watch Demo</button>
          </motion.div>
        </motion.div>

        {/* Stats — staggered */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 80, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div style={{
                fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800,
                background: "linear-gradient(135deg, #00C6FF, #7B61FF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: 8
              }}>{s.value}</div>
              <div style={{ color: "#607390", fontSize: 13, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag-badge">Features</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Everything You Need to<br /><span className="gradient-text">Preserve Expertise</span>
          </h2>
          <p style={{ color: "#607390", fontSize: 16, maxWidth: 500, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            A complete platform to capture, organize, and transfer knowledge across your entire organization.
          </p>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${f.accent}15`, border: `1px solid ${f.accent}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, marginBottom: 20, color: f.accent,
              }}>⬡</div>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#E8EDF5" }}>{f.title}</h4>
              <p style={{ color: "#607390", fontSize: 14, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{
        padding: "100px 48px", position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(0,198,255,0.02)"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-badge">Process</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              How It <span className="gradient-text">Works</span>
            </h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, position: "relative" }}>
            <div style={{
              position: "absolute", top: 36, left: "16.5%", right: "16.5%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(0,198,255,0.3), rgba(123,97,255,0.3), transparent)"
            }} />
            {HOW_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{ textAlign: "center", padding: "0 20px", position: "relative" }}
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "rgba(0,198,255,0.06)",
                    border: "1px solid rgba(0,198,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px",
                    fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#00C6FF"
                  }}
                >{step.num}</motion.div>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{step.title}</h4>
                <p style={{ color: "#607390", fontSize: 14, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "100px 48px", maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeUp>
          <div className="tag-badge">Why ShadowLearn</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.2 }}>
            Built for the Reality of<br /><span className="gradient-text">Modern Organizations</span>
          </h2>
          <p style={{ color: "#607390", fontSize: 17, lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: 680, margin: "0 auto 48px" }}>
            Every organization loses critical knowledge every single day. Retirements, resignations, role changes — and with each one, years of expertise walks out the door. ShadowLearn makes knowledge transfer systematic, not accidental.
          </p>

          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Reduce knowledge loss", icon: "↓" },
              { label: "Faster onboarding", icon: "⚡" },
              { label: "Expert continuity", icon: "∞" },
              { label: "Team resilience", icon: "◈" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "12px 20px", borderRadius: 100,
                  fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ color: "#00C6FF", fontSize: 16 }}>{item.icon}</span>
                <span style={{ color: "#8A9BB5" }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 48px", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            maxWidth: 860, margin: "0 auto",
            background: "linear-gradient(135deg, rgba(0,198,255,0.06), rgba(123,97,255,0.06))",
            border: "1px solid rgba(0,198,255,0.15)",
            borderRadius: 24, padding: "64px 48px", textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Your Next Expert Exit<br />Doesn't Have to Cost You
          </h2>
          <p style={{ color: "#607390", fontSize: 16, maxWidth: 480, margin: "0 auto 40px", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Start capturing your organization's knowledge before it walks out the door. Free to start, no credit card needed.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button className="btn-primary">Create Free Account →</button>
            <button className="btn-outline">Talk to Sales</button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "40px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 1, flexWrap: "wrap", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 24, height: 24,
            background: "linear-gradient(135deg, #00C6FF, #7B61FF)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>
            Shadow<span style={{ color: "#00C6FF" }}>Learn</span>
          </span>
        </div>
        <p style={{ color: "#3A4A60", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 ShadowLearn. Knowledge that outlasts people.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: "#3A4A60", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
              onMouseOver={e => e.target.style.color = "#607390"}
              onMouseOut={e => e.target.style.color = "#3A4A60"}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}