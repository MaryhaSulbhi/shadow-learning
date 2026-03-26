
// import React, { useState, useRef, useEffect } from "react";
// import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
// import {
//   Video, FileText, Search, BookOpen, Zap, Shield,
//   Users, ArrowRight, CheckCircle2, Star, ChevronRight,
//   Menu, X, Play, Brain, Layers, BarChart3, Sparkles,
//   Clock, Lock, Globe, TrendingUp
// } from "lucide-react";

// /* ─── Tokens ────────────────────────────────────────────────────── */
// const C = {
//   bg:       "#0a0a12",
//   surface:  "#0f0f1a",
//   card:     "#13131f",
//   border:   "rgba(255,255,255,0.07)",
//   borderHover: "rgba(255,255,255,0.14)",
//   dim:      "rgba(220,220,255,0.38)",
//   mid:      "rgba(220,220,255,0.62)",
//   bright:   "#e8e8f8",
//   accent:   "#4f6ef7",
//   accent2:  "#8b5cf6",
//   cyan:     "#06b6d4",
//   pink:     "#e879f9",
//   emerald:  "#10b981",
//   amber:    "#f59e0b",
// };

// /* ─── Reusable motion presets ───────────────────────────────────── */
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 28 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true, margin: "-60px" },
//   transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
// });

// const stagger = {
//   initial: {},
//   whileInView: { transition: { staggerChildren: 0.1 } },
//   viewport: { once: true, margin: "-60px" },
// };

// const child = {
//   initial: { opacity: 0, y: 20 },
//   whileInView: { opacity: 1, y: 0 },
//   transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
// };

// /* ─── Counter ───────────────────────────────────────────────────── */
// function Counter({ to, suffix = "" }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!inView) return;
//     const ctrl = animate(0, to, {
//       duration: 1.6,
//       ease: "easeOut",
//       onUpdate: (v) => setVal(Math.round(v)),
//     });
//     return () => ctrl.stop();
//   }, [inView, to]);
//   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
// }

// /* ─── Tilt Card ─────────────────────────────────────────────────── */
// function TiltCard({ children, className = "" }) {
//   const ref = useRef(null);
//   const mx = useMotionValue(0), my = useMotionValue(0);
//   const rx = useTransform(my, [-50, 50], [5, -5]);
//   const ry = useTransform(mx, [-50, 50], [-5, 5]);
//   return (
//     <motion.div
//       ref={ref}
//       style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
//       onMouseMove={(e) => {
//         const r = ref.current.getBoundingClientRect();
//         mx.set(e.clientX - r.left - r.width / 2);
//         my.set(e.clientY - r.top - r.height / 2);
//       }}
//       onMouseLeave={() => { mx.set(0); my.set(0); }}
//       whileHover={{ scale: 1.025 }}
//       transition={{ type: "spring", stiffness: 260, damping: 28 }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// /* ─── Pill Badge ────────────────────────────────────────────────── */
// function Pill({ children, color = C.accent }) {
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 6,
//       padding: "4px 14px", borderRadius: 999,
//       border: `1px solid ${color}44`,
//       background: `${color}18`,
//       color: color, fontSize: 11, fontWeight: 600,
//       letterSpacing: "0.08em", textTransform: "uppercase",
//     }}>{children}</span>
//   );
// }

// /* ─── Glow Button ───────────────────────────────────────────────── */
// function GlowBtn({ children, ghost = false, onClick, style = {} }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <motion.button
//       whileHover={{ scale: 1.04 }}
//       whileTap={{ scale: 0.97 }}
//       onHoverStart={() => setHov(true)}
//       onHoverEnd={() => setHov(false)}
//       onClick={onClick}
//       style={{
//         display: "inline-flex", alignItems: "center", gap: 8,
//         padding: "13px 28px", borderRadius: 12,
//         fontSize: 14, fontWeight: 600, cursor: "pointer",
//         transition: "box-shadow 0.3s",
//         ...(ghost ? {
//           background: "transparent",
//           border: `1px solid ${C.border}`,
//           color: C.mid,
//         } : {
//           background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accent2} 100%)`,
//           border: "none",
//           color: "#fff",
//           boxShadow: hov
//             ? `0 0 32px ${C.accent}55, 0 0 60px ${C.accent2}33`
//             : `0 0 16px ${C.accent}33`,
//         }),
//         ...style,
//       }}
//     >
//       {children}
//     </motion.button>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    DATA
// ═══════════════════════════════════════════════════════════════ */

// const NAV_LINKS = ["Features", "How It Works", "Pricing", "Testimonials"];

// const STATS = [
//   { value: 10, suffix: "×", label: "Faster onboarding" },
//   { value: 73, suffix: "%", label: "Less knowledge loss" },
//   { value: 4200, suffix: "+", label: "Teams using ShadowLearn" },
//   { value: 99, suffix: ".9%", label: "Platform uptime" },
// ];

// const FEATURES = [
//   {
//     icon: Video,
//     title: "Workflow Recording",
//     desc: "Screen + voice recordings of real tasks, auto-tagged and indexed. Capture exactly how your best people get things done.",
//     color: C.accent,
//     tag: "Core",
//   },
//   {
//     icon: FileText,
//     title: '"How I Solved This" Logs',
//     desc: "Structured problem-solution journals. Employees document decisions, blockers, and breakthroughs in a guided template.",
//     color: C.cyan,
//     tag: "Core",
//   },
//   {
//     icon: BookOpen,
//     title: "Task-Based Learning Modules",
//     desc: "Automatically assembled micro-courses from recordings and logs. New hires learn by watching real colleagues, not slides.",
//     color: C.emerald,
//     tag: "Learning",
//   },
//   {
//     icon: Search,
//     title: "AI Knowledge Search",
//     desc: 'Ask "How did we handle the API outage in March?" and get the exact recording, log, and person who solved it — instantly.',
//     color: C.pink,
//     tag: "AI",
//   },
//   {
//     icon: Brain,
//     title: "Auto Summarisation",
//     desc: "AI extracts key steps, decisions, and gotchas from every recording. No manual documentation required.",
//     color: C.amber,
//     tag: "AI",
//   },
//   {
//     icon: BarChart3,
//     title: "Knowledge Health Dashboard",
//     desc: "See which processes are undocumented, which knowledge is at risk (single-person dependency), and where gaps grow.",
//     color: C.accent2,
//     tag: "Insights",
//   },
// ];

// const STEPS = [
//   { n: "01", title: "Record", desc: "Employees hit Record while working. Our lightweight agent captures video, CLI, and IDE context with one click.", icon: Video },
//   { n: "02", title: "Enrich", desc: 'Post-recording, contributors answer 3 quick AI-generated questions: "What was the goal?", "What almost went wrong?", "What would you do differently?"', icon: Brain },
//   { n: "03", title: "Index", desc: "AI transcribes, tags, and connects the recording to related processes, team members, and past solutions.", icon: Layers },
//   { n: "04", title: "Transfer", desc: "New employees search or browse a personalised learning path built from their role's most critical knowledge.", icon: TrendingUp },
// ];

// const TESTIMONIALS = [
//   {
//     name: "Arjun Mehta", role: "CTO, Finova Technologies",
//     avatar: "AM", avatarColor: "#4f6ef7",
//     quote: "Three senior engineers left in Q4. A year ago, that would have paralysed us. With ShadowLearn, their replacements were productive in week two. I can't overstate how much this changed our risk profile.",
//     stars: 5,
//   },
//   {
//     name: "Sarah Chen", role: "VP Engineering, Vercel",
//     avatar: "SC", avatarColor: "#8b5cf6",
//     quote: 'The "How I Solved This" logs are worth the entire subscription. We have a decade of debugging wisdom that was previously locked in people\'s heads.',
//     stars: 5,
//   },
//   {
//     name: "Marcus Okafor", role: "Head of Operations, NomadHQ",
//     avatar: "MO", avatarColor: "#06b6d4",
//     quote: "Onboarding used to take 6 weeks. It's now 2 weeks and the quality is objectively better. New hires aren't just reading wikis — they're watching their future teammates solve real problems.",
//     stars: 5,
//   },
// ];

// const PLANS = [
//   {
//     name: "Starter", price: "$0", period: "/mo",
//     desc: "For small teams getting started.",
//     features: ["Up to 5 users", "25 recordings / month", "30-day history", "Basic AI search", "Email support"],
//     cta: "Start Free",
//     highlight: false,
//   },
//   {
//     name: "Pro", price: "$79", period: "/mo",
//     desc: "For growing teams that take knowledge seriously.",
//     features: ["Up to 100 users", "Unlimited recordings", "Unlimited history", "Advanced AI + summaries", "Task-based learning paths", "Priority support", "Analytics dashboard"],
//     cta: "Get Started",
//     highlight: true,
//     badge: "Most Popular",
//   },
//   {
//     name: "Enterprise", price: "Custom", period: "",
//     desc: "White-glove for large orgs.",
//     features: ["Unlimited users", "On-premise option", "Custom SSO / SAML", "Dedicated CSM", "SLA guarantee", "Custom AI training", "Compliance pack"],
//     cta: "Contact Sales",
//     highlight: false,
//   },
// ];

// /* ═══════════════════════════════════════════════════════════════
//    SECTIONS
// ═══════════════════════════════════════════════════════════════ */

// /* ── Navbar ──────────────────────────────────────────────────────── */
// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   return (
//     <motion.nav
//       initial={{ y: -56, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//       style={{
//         position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         padding: "0 40px", height: 64,
//         background: scrolled ? "rgba(10,10,18,0.85)" : "transparent",
//         backdropFilter: scrolled ? "blur(20px)" : "none",
//         borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
//         transition: "all 0.4s ease",
//       }}
//     >
//       {/* Logo */}
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div style={{
//           width: 32, height: 32, borderRadius: 9,
//           background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           boxShadow: `0 0 14px ${C.accent}66`,
//         }}>
//           <Sparkles size={15} color="#fff" />
//         </div>
//         <span style={{ fontSize: 17, fontWeight: 700, color: C.bright, letterSpacing: "-0.02em" }}>
//           ShadowLearn
//         </span>
//       </div>

//       {/* Desktop links */}
//       <div style={{ display: "flex", gap: 36 }}>
//         {NAV_LINKS.map((l) => (
//           <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
//             style={{ fontSize: 13, fontWeight: 500, color: C.dim, textDecoration: "none", transition: "color 0.2s" }}
//             onMouseEnter={e => e.target.style.color = C.bright}
//             onMouseLeave={e => e.target.style.color = C.dim}
//           >{l}</a>
//         ))}
//       </div>

//       {/* CTA */}
//       <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//         <button style={{ background: "none", border: "none", color: C.mid, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
//           Log in
//         </button>
//         <GlowBtn style={{ padding: "9px 20px", fontSize: 13 }}>
//           Get Started <ArrowRight size={13} />
//         </GlowBtn>
//       </div>
//     </motion.nav>
//   );
// }

// /* ── Hero ─────────────────────────────────────────────────────────── */
// function Hero() {
//   return (
//     <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
//       {/* Background blobs */}
//       <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
//         <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 800, height: 600, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.accent}22 0%, transparent 70%)` }} />
//         <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.accent2}18 0%, transparent 70%)` }} />
//         <div style={{ position: "absolute", top: "30%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.cyan}14 0%, transparent 70%)` }} />
//         {/* Grid */}
//         <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.035 }}>
//           <defs>
//             <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
//               <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#g)" />
//         </svg>
//       </div>

//       <motion.div {...fadeUp(0)}>
//         <Pill color={C.accent}>
//           <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, display: "inline-block", position: "relative" }}>
//             <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.accent, animation: "ping 1.5s ease-out infinite" }} />
//           </span>
//           Now with AI-powered knowledge extraction
//         </Pill>
//       </motion.div>

//       <motion.h1 {...fadeUp(0.1)} style={{
//         fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.08,
//         letterSpacing: "-0.035em", margin: "28px 0 24px", maxWidth: 900,
//         color: C.bright,
//       }}>
//         The knowledge that leaves{" "}
//         <span style={{
//           background: `linear-gradient(135deg, ${C.accent} 0%, ${C.pink} 50%, ${C.cyan} 100%)`,
//           WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//           backgroundClip: "text",
//         }}>
//           when people do
//         </span>
//         {" "}— captured.
//       </motion.h1>

//       <motion.p {...fadeUp(0.2)} style={{ fontSize: 18, lineHeight: 1.65, color: C.dim, maxWidth: 620, margin: "0 auto 40px", fontWeight: 400 }}>
//         ShadowLearn records real workflows, preserves problem-solving logs, and builds searchable knowledge bases — so your organisation never loses its best thinking.
//       </motion.p>

//       <motion.div {...fadeUp(0.3)} style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
//         <GlowBtn>
//           Start for free <ArrowRight size={15} />
//         </GlowBtn>
//         <GlowBtn ghost>
//           <div style={{
//             width: 22, height: 22, borderRadius: "50%",
//             background: "rgba(255,255,255,0.12)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//           }}>
//             <Play size={9} color={C.bright} fill={C.bright} style={{ marginLeft: 1 }} />
//           </div>
//           Watch 90-second demo
//         </GlowBtn>
//       </motion.div>

//       {/* Trust bar */}
//       <motion.div {...fadeUp(0.45)} style={{ marginTop: 56, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
//         {[
//           { icon: Shield, label: "SOC2 Type II" },
//           { icon: Lock, label: "GDPR Compliant" },
//           { icon: Globe, label: "99.9% uptime" },
//           { icon: Clock, label: "Setup in 10 min" },
//         ].map(({ icon: Icon, label }) => (
//           <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, color: C.dim, fontSize: 12, fontWeight: 500 }}>
//             <Icon size={13} color={C.dim} />
//             {label}
//           </div>
//         ))}
//       </motion.div>

//       {/* Hero product preview */}
//       <motion.div {...fadeUp(0.55)} style={{ marginTop: 72, width: "100%", maxWidth: 900, position: "relative" }}>
//         <div style={{
//           position: "absolute", inset: -2,
//           background: `linear-gradient(135deg, ${C.accent}44, ${C.accent2}33, ${C.cyan}22)`,
//           borderRadius: 20, filter: "blur(18px)",
//         }} />
//         <div style={{
//           position: "relative", borderRadius: 18,
//           border: `1px solid ${C.border}`,
//           background: C.card, overflow: "hidden",
//           boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
//         }}>
//           {/* Browser chrome */}
//           <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}>
//             {["#ff5f57","#febc2e","#28c840"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
//             <div style={{ marginLeft: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "3px 14px", fontSize: 11, color: C.dim }}>
//               app.shadowlearn.io/dashboard
//             </div>
//           </div>
//           {/* Dashboard content */}
//           <div style={{ padding: 24 }}>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
//               {[
//                 { label: "Recordings this week", val: "47", color: C.accent },
//                 { label: "Searches today", val: "283", color: C.cyan },
//                 { label: "Active learners", val: "31", color: C.emerald },
//                 { label: "Knowledge score", val: "84%", color: C.amber },
//               ].map(({ label, val, color }, i) => (
//                 <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.08 }}
//                   style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
//                   <div style={{ fontSize: 22, fontWeight: 700, color }}>{val}</div>
//                   <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>{label}</div>
//                 </motion.div>
//               ))}
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
//               {[
//                 { title: "Q4 Sales Playbook", author: "Priya K.", type: "Recording", time: "2h ago" },
//                 { title: "Fixing the Kafka consumer lag bug", author: "James O.", type: "Solution Log", time: "Yesterday" },
//                 { title: "Customer escalation SOP v3", author: "Lin W.", type: "Module", time: "3 days ago" },
//               ].map(({ title, author, type, time }, i) => (
//                 <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.75 + i * 0.09 }}
//                   style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 9, padding: "10px 14px" }}>
//                   <div style={{ width: 7, height: 7, borderRadius: "50%", background: i === 0 ? C.accent : i === 1 ? C.cyan : C.emerald, flexShrink: 0 }} />
//                   <span style={{ fontSize: 12, color: C.mid, flex: 1 }}>{title}</span>
//                   <span style={{ fontSize: 11, color: C.dim }}>{author}</span>
//                   <span style={{ fontSize: 10, color: C.dim, background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 5 }}>{type}</span>
//                   <span style={{ fontSize: 10, color: C.dim }}>{time}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// /* ── Stats ────────────────────────────────────────────────────────── */
// function Stats() {
//   return (
//     <section style={{ padding: "60px 24px", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
//       <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}
//         style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, textAlign: "center" }}>
//         {STATS.map((s) => (
//           <motion.div key={s.label} variants={child}>
//             <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em",
//               background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
//               WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
//             }}>
//               <Counter to={s.value} suffix={s.suffix} />
//             </div>
//             <div style={{ fontSize: 13, color: C.dim, marginTop: 4 }}>{s.label}</div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// }

// /* ── Features ─────────────────────────────────────────────────────── */
// function Features() {
//   return (
//     <section id="features" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 500, background: `radial-gradient(ellipse, ${C.accent}0f 0%, transparent 70%)`, pointerEvents: "none" }} />
//       <div style={{ maxWidth: 1160, margin: "0 auto" }}>
//         <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 64 }}>
//           <Pill color={C.cyan}>Platform Features</Pill>
//           <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "20px 0 16px", color: C.bright }}>
//             Everything to{" "}
//             <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//               stop knowledge drain
//             </span>
//           </h2>
//           <p style={{ fontSize: 16, color: C.dim, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
//             Six tightly integrated modules that work together to capture, organise, and transfer your organisation's most valuable asset.
//           </p>
//         </motion.div>

//         <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}
//           style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
//           {FEATURES.map((f) => (
//             <motion.div key={f.title} variants={child}>
//               <TiltCard style={{
//                 height: "100%", borderRadius: 16,
//                 border: `1px solid ${C.border}`,
//                 background: C.card,
//                 padding: 28,
//                 cursor: "default",
//               }}>
//                 <div style={{
//                   width: 42, height: 42, borderRadius: 11,
//                   background: `${f.color}22`, border: `1px solid ${f.color}44`,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   marginBottom: 20,
//                 }}>
//                   <f.icon size={19} color={f.color} />
//                 </div>
//                 <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: f.color, marginBottom: 8 }}>{f.tag}</div>
//                 <h3 style={{ fontSize: 16, fontWeight: 700, color: C.bright, marginBottom: 10, letterSpacing: "-0.01em" }}>{f.title}</h3>
//                 <p style={{ fontSize: 13.5, color: C.dim, lineHeight: 1.7 }}>{f.desc}</p>
//               </TiltCard>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ── How It Works ─────────────────────────────────────────────────── */
// function HowItWorks() {
//   return (
//     <section id="how-it-works" style={{ padding: "100px 24px", background: C.surface }}>
//       <div style={{ maxWidth: 1000, margin: "0 auto" }}>
//         <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 64 }}>
//           <Pill color={C.emerald}>How It Works</Pill>
//           <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "20px 0 16px", color: C.bright }}>
//             From{" "}
//             <span style={{ background: `linear-gradient(135deg, ${C.emerald}, ${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//               expert to organisation
//             </span>
//             {" "}in four steps
//           </h2>
//         </motion.div>

//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
//           {STEPS.map((s, i) => (
//             <motion.div key={s.n} {...fadeUp(i * 0.1)}
//               style={{ position: "relative", padding: "36px 28px", background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
//               {i < STEPS.length - 1 && (
//                 <div style={{ position: "absolute", top: "50%", right: -14, transform: "translateY(-50%)", zIndex: 2,
//                   width: 28, height: 28, borderRadius: "50%", background: C.bg, border: `1px solid ${C.border}`,
//                   display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: 12 }}>
//                   →
//                 </div>
//               )}
//               <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: "0.08em", marginBottom: 16 }}>{s.n}</div>
//               <s.icon size={22} color={C.accent2} style={{ marginBottom: 14 }} />
//               <h3 style={{ fontSize: 17, fontWeight: 700, color: C.bright, marginBottom: 10 }}>{s.title}</h3>
//               <p style={{ fontSize: 13, color: C.dim, lineHeight: 1.75 }}>{s.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ── Testimonials ─────────────────────────────────────────────────── */
// function Testimonials() {
//   return (
//     <section id="testimonials" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", bottom: 0, right: 0, width: 600, height: 400, background: `radial-gradient(ellipse, ${C.pink}0e 0%, transparent 70%)`, pointerEvents: "none" }} />
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 64 }}>
//           <Pill color={C.pink}>Testimonials</Pill>
//           <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "20px 0", color: C.bright }}>
//             Teams that trust{" "}
//             <span style={{ background: `linear-gradient(135deg, ${C.pink}, ${C.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//               ShadowLearn
//             </span>
//           </h2>
//         </motion.div>

//         <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}
//           style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
//           {TESTIMONIALS.map((t) => (
//             <motion.div key={t.name} variants={child}>
//               <TiltCard style={{
//                 height: "100%", borderRadius: 18,
//                 border: `1px solid ${C.border}`,
//                 background: C.card, padding: 30,
//                 display: "flex", flexDirection: "column", gap: 20,
//               }}>
//                 <div style={{ display: "flex", gap: 3 }}>
//                   {[...Array(t.stars)].map((_, i) => <Star key={i} size={13} color={C.amber} fill={C.amber} />)}
//                 </div>
//                 <p style={{ fontSize: 14, lineHeight: 1.78, color: C.mid, flex: 1, fontStyle: "italic" }}>
//                   "{t.quote}"
//                 </p>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
//                   <div style={{
//                     width: 38, height: 38, borderRadius: "50%",
//                     background: `${t.avatarColor}33`, border: `2px solid ${t.avatarColor}55`,
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     fontSize: 12, fontWeight: 700, color: t.avatarColor,
//                   }}>{t.avatar}</div>
//                   <div>
//                     <div style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{t.name}</div>
//                     <div style={{ fontSize: 11, color: C.dim }}>{t.role}</div>
//                   </div>
//                 </div>
//               </TiltCard>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ── Pricing ──────────────────────────────────────────────────────── */
// function Pricing() {
//   return (
//     <section id="pricing" style={{ padding: "100px 24px", background: C.surface, position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, background: `radial-gradient(ellipse, ${C.accent2}0f 0%, transparent 70%)`, pointerEvents: "none" }} />
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 64 }}>
//           <Pill color={C.accent2}>Pricing</Pill>
//           <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "20px 0 16px", color: C.bright }}>
//             Simple,{" "}
//             <span style={{ background: `linear-gradient(135deg, ${C.accent2}, ${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//               transparent
//             </span>
//             {" "}pricing
//           </h2>
//           <p style={{ fontSize: 16, color: C.dim }}>Start free. Scale when you're ready. No surprises.</p>
//         </motion.div>

//         <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}
//           style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, alignItems: "stretch" }}>
//           {PLANS.map((p) => (
//             <motion.div key={p.name} variants={child} style={{ position: "relative" }}>
//               {p.highlight && (
//                 <div style={{ position: "absolute", inset: -1, borderRadius: 20,
//                   background: `linear-gradient(135deg, ${C.accent}, ${C.accent2}, ${C.pink})`, zIndex: 0 }} />
//               )}
//               <div style={{
//                 position: "relative", zIndex: 1, height: "100%",
//                 borderRadius: 18, padding: 30,
//                 background: p.highlight ? C.bg : C.card,
//                 border: p.highlight ? "none" : `1px solid ${C.border}`,
//                 display: "flex", flexDirection: "column", gap: 24,
//               }}>
//                 {p.badge && (
//                   <span style={{
//                     alignSelf: "flex-start", fontSize: 10, fontWeight: 700,
//                     letterSpacing: "0.1em", textTransform: "uppercase",
//                     background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
//                     color: "#fff", padding: "4px 12px", borderRadius: 999,
//                   }}>{p.badge}</span>
//                 )}
//                 <div>
//                   <div style={{ fontSize: 16, fontWeight: 600, color: C.bright, marginBottom: 8 }}>{p.name}</div>
//                   <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
//                     <span style={{ fontSize: 40, fontWeight: 800, color: C.bright, letterSpacing: "-0.04em" }}>{p.price}</span>
//                     <span style={{ fontSize: 14, color: C.dim, marginBottom: 6 }}>{p.period}</span>
//                   </div>
//                   <p style={{ fontSize: 13, color: C.dim, marginTop: 6 }}>{p.desc}</p>
//                 </div>

//                 <ul style={{ flex: 1, listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
//                   {p.features.map((f) => (
//                     <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: C.mid }}>
//                       <CheckCircle2 size={15} color={C.accent} style={{ flexShrink: 0, marginTop: 1 }} />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>

//                 {p.highlight
//                   ? <GlowBtn style={{ width: "100%", justifyContent: "center" }}>{p.cta} <ArrowRight size={14} /></GlowBtn>
//                   : <GlowBtn ghost style={{ width: "100%", justifyContent: "center", borderColor: C.borderHover }}>{p.cta}</GlowBtn>
//                 }
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.p {...fadeUp(0.2)} style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: C.dim }}>
//           All plans include 14-day free trial · Cancel anytime · No credit card required
//         </motion.p>
//       </div>
//     </section>
//   );
// }

// /* ── CTA ──────────────────────────────────────────────────────────── */
// function CTA() {
//   return (
//     <section style={{ padding: "100px 24px" }}>
//       <motion.div {...fadeUp()} style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
//         <div style={{ position: "absolute", inset: -3, borderRadius: 26,
//           background: `linear-gradient(135deg, ${C.accent}55, ${C.accent2}44, ${C.pink}33)`,
//           filter: "blur(20px)" }} />
//         <div style={{ position: "relative", borderRadius: 24, padding: "72px 48px",
//           background: C.card, border: `1px solid ${C.border}`,
//           textAlign: "center", overflow: "hidden",
//         }}>
//           <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 200, background: `radial-gradient(ellipse, ${C.accent}20 0%, transparent 70%)`, pointerEvents: "none" }} />
//           <div style={{ position: "relative" }}>
//             <Zap size={36} color={C.accent} style={{ margin: "0 auto 24px" }} />
//             <h2 style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, color: C.bright }}>
//               Stop losing your best thinking.{" "}
//               <span style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//                 Start today.
//               </span>
//             </h2>
//             <p style={{ fontSize: 16, color: C.dim, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>
//               Join 4,200+ teams preserving institutional knowledge with ShadowLearn. Set up in under 10 minutes.
//             </p>
//             <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
//               <GlowBtn style={{ padding: "15px 36px", fontSize: 15 }}>
//                 Create Free Account <ArrowRight size={16} />
//               </GlowBtn>
//               <GlowBtn ghost style={{ padding: "15px 36px", fontSize: 15 }}>
//                 Talk to Sales
//               </GlowBtn>
//             </div>
//             <p style={{ marginTop: 24, fontSize: 12, color: C.dim }}>
//               No credit card · 14-day trial · SOC2 compliant
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// /* ── Footer ───────────────────────────────────────────────────────── */
// function Footer() {
//   const cols = [
//     { head: "Product", links: ["Features", "Pricing", "Security", "Changelog", "Roadmap"] },
//     { head: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
//     { head: "Resources", links: ["Docs", "API", "Community", "Status", "Privacy"] },
//   ];
//   return (
//     <footer style={{ borderTop: `1px solid ${C.border}`, padding: "60px 24px 32px" }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3, 1fr)", gap: 48, marginBottom: 48 }}>
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
//               <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Sparkles size={13} color="#fff" />
//               </div>
//               <span style={{ fontSize: 16, fontWeight: 700, color: C.bright }}>ShadowLearn</span>
//             </div>
//             <p style={{ fontSize: 13, color: C.dim, lineHeight: 1.7, maxWidth: 260 }}>
//               The intelligent knowledge preservation platform for modern teams.
//             </p>
//           </div>
//           {cols.map((col) => (
//             <div key={col.head}>
//               <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, marginBottom: 16 }}>{col.head}</p>
//               {col.links.map((l) => (
//                 <p key={l} style={{ fontSize: 13, color: C.dim, marginBottom: 10, cursor: "pointer" }}
//                   onMouseEnter={e => e.target.style.color = C.bright}
//                   onMouseLeave={e => e.target.style.color = C.dim}
//                 >{l}</p>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
//           <p style={{ fontSize: 12, color: C.dim }}>© 2026 ShadowLearn, Inc. All rights reserved.</p>
//           <p style={{ fontSize: 12, color: C.dim }}>Built for teams that never stop learning.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    ROOT
// ═══════════════════════════════════════════════════════════════ */
// export default function HomePage() {
//   return (
//     <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Syne', system-ui, sans-serif", overflowX: "hidden" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         @keyframes ping { 0%{transform:scale(1);opacity:0.75} 75%,100%{transform:scale(2);opacity:0} }
//         ::-webkit-scrollbar { width: 5px; }
//         ::-webkit-scrollbar-track { background: #0a0a12; }
//         ::-webkit-scrollbar-thumb { background: #1e1e36; border-radius: 999px; }
//         ::selection { background: rgba(79,110,247,0.3); }
//       `}</style>
//       <Navbar />
//       <Hero />
//       <Stats />
//       <Features />
//       <HowItWorks />
//       <Testimonials />
//       <Pricing />
//       <CTA />
//       <Footer />
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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

// Animated grid background
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.07 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00C6FF" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// Floating orbs
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

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

        * { box-sizing: border-box; margin: 0; padding: 0; }

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
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(0,198,255,0.2); }
          50% { border-color: rgba(0,198,255,0.6); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
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

        .step-number {
          font-family: 'Syne', sans-serif;
          font-size: 72px;
          font-weight: 800;
          color: rgba(0,198,255,0.08);
          line-height: 1;
          user-select: none;
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

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 68,
        background: scrolled ? "rgba(2,5,16,0.85)" : "rgba(2,5,16,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(0,198,255,0.1)" : "rgba(255,255,255,0.05)"}`,
        transition: "all 0.4s",
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="tag-badge">Knowledge Transfer Platform</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(42px, 6vw, 76px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Stop Losing Knowledge<br />
          <span className="gradient-text">When People Leave</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ color: "#607390", maxWidth: 580, margin: "0 auto 48px", fontSize: 18, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          ShadowLearn captures, structures, and transfers real work knowledge — from workflows and solution logs to expert insights — so your organization never loses critical expertise again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <button className="btn-primary">Start Capturing Knowledge →</button>
          <button className="btn-outline">Watch Demo</button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 80, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 42, fontWeight: 800,
                background: "linear-gradient(135deg, #00C6FF, #7B61FF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: 8
              }}>{s.value}</div>
              <div style={{ color: "#607390", fontSize: 13, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag-badge">Features</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Everything You Need to<br /><span className="gradient-text">Preserve Expertise</span>
          </h2>
          <p style={{ color: "#607390", fontSize: 16, maxWidth: 500, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            A complete platform to capture, organize, and transfer knowledge across your entire organization.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${f.accent}15`,
                border: `1px solid ${f.accent}30`,
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
        padding: "100px 48px",
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(0,198,255,0.02)"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-badge">Process</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, position: "relative" }}>
            <div style={{
              position: "absolute", top: 36, left: "16.5%", right: "16.5%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(0,198,255,0.3), rgba(123,97,255,0.3), transparent)"
            }} />
            {HOW_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                style={{ textAlign: "center", padding: "0 20px", position: "relative" }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(0,198,255,0.06)",
                  border: "1px solid rgba(0,198,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                  fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800,
                  color: "#00C6FF"
                }}>{step.num}</div>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{step.title}</h4>
                <p style={{ color: "#607390", fontSize: 14, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "100px 48px", maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "12px 20px", borderRadius: 100,
                fontSize: 14, fontFamily: "'DM Sans', sans-serif",
              }}>
                <span style={{ color: "#00C6FF", fontSize: 16 }}>{item.icon}</span>
                <span style={{ color: "#8A9BB5" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 48px", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: 860, margin: "0 auto",
            background: "linear-gradient(135deg, rgba(0,198,255,0.06), rgba(123,97,255,0.06))",
            border: "1px solid rgba(0,198,255,0.15)",
            borderRadius: 24,
            padding: "64px 48px",
            textAlign: "center",
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
        position: "relative", zIndex: 1,
        flexWrap: "wrap", gap: 20,
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
