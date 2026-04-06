import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function useVisible(ref) {
    const [v, setV] = useState(false);
    useEffect(() => {
        const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
        if (ref.current) o.observe(ref.current);
        return () => o.disconnect();
    }, []);
    return v;
}

function FadeIn({ children, delay = 0, style = {} }) {
    const ref = useRef();
    const v = useVisible(ref);
    return (
        <div ref={ref} style={{
            opacity: v ? 1 : 0,
            transform: v ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            ...style
        }}>
            {children}
        </div>
    );
}

const STATS = [
    { n: "10K+", l: "Movies & Shows", icon: "🎬" },
    { n: "50K+", l: "Happy Users", icon: "👥" },
    { n: "8", l: "Mood Filters", icon: "🎭" },
    { n: "100K+", l: "Reviews", icon: "⭐" },
];

const TEAM = [
    { name: "Bushra Waseem", role: "Founder & CEO", grad: "linear-gradient(135deg,#7C3AED,#C084FC)", initial: "B" },
    { name: "Zain Ahmed", role: "Lead Developer", grad: "linear-gradient(135deg,#1D4ED8,#60A5FA)", initial: "Z" },
    { name: "Sara Malik", role: "UI/UX Designer", grad: "linear-gradient(135deg,#0F766E,#34D399)", initial: "S" },
    { name: "Omar Farooq", role: "Content Lead", grad: "linear-gradient(135deg,#C2410C,#FB923C)", initial: "O" },
];

const VALUES = [
    { icon: "🎯", title: "Mood First", desc: "We put your emotional state at the center of every recommendation. Forget algorithms — feel first." },
    { icon: "🌙", title: "Made for Nights", desc: "Built for lazy evenings, date nights, binge sessions and solo movie marathons. We get the vibe." },
    { icon: "🤝", title: "Community Driven", desc: "Real reviews from real people. Our users shape what gets featured, recommended, and celebrated." },
    { icon: "✨", title: "Always Fresh", desc: "New releases, hidden gems, and classic rediscoveries — your feed evolves with your taste." },
    { icon: "🔒", title: "Private by Design", desc: "Your watch history, reviews and moods are yours alone. We never sell or share your data." },
    { icon: "📱", title: "Works Everywhere", desc: "Desktop, tablet, phone — Binge & Box feels native on every screen you bring it to." },
];

const MOODS = [
    { label: "Romance", color: "#E879F9", bg: "rgba(232,121,249,0.1)", border: "rgba(232,121,249,0.35)" },
    { label: "Thriller", color: "#FB923C", bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.35)" },
    { label: "Sci-Fi", color: "#38BDF8", bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.35)" },
    { label: "Happy", color: "#FCD34D", bg: "rgba(252,211,77,0.1)", border: "rgba(252,211,77,0.35)" },
    { label: "Chill", color: "#34D399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.35)" },
    { label: "Emotional", color: "#818CF8", bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.35)" },
    { label: "Motivated", color: "#A3E635", bg: "rgba(163,230,53,0.1)", border: "rgba(163,230,53,0.35)" },
    { label: "Horror", color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.35)" },
];

export default function About() {
    const navigate = useNavigate();
    const [hovMood, setHovMood] = useState(null);
    const [hovTeam, setHovTeam] = useState(null);
    const [hovVal, setHovVal] = useState(null);

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .about-page { font-family:'Jost',sans-serif; background:#0B1A3E; min-height:100vh; color:#E8F0FE; }
      `}</style>

            <div className="about-page" style={{ paddingTop: "70px" }}>

                {/* ── HERO ── */}
                <div style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
                    {/* Animated background orbs */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0B1A3E 0%,#112250 45%,#1A3470 100%)" }} />
                    <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%)", top: "-200px", right: "-100px", animation: "floatSlow 8s ease-in-out infinite" }} />
                    <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)", bottom: "-100px", left: "-80px", animation: "floatSlow 10s ease-in-out infinite reverse" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right,transparent,#3B82F6,#818CF8,transparent)" }} />

                    <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "4rem 2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                        {/* Left */}
                        <div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(96,165,250,0.3)", padding: "6px 16px", borderRadius: "20px", marginBottom: "2rem" }}>
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#60A5FA", display: "inline-block" }} />
                                <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.16em", textTransform: "uppercase", color: "#93C5FD" }}>Our Story</span>
                            </div>
                            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "58px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.08", marginBottom: "1.5rem" }}>
                                Built for the<br />
                                <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Indecisive</em><br />
                                Movie Lover
                            </h1>
                            <p style={{ fontSize: "16px", color: "#93C5FD", lineHeight: "1.85", fontWeight: "300", marginBottom: "2.5rem", maxWidth: "440px" }}>
                                We built Binge & Box because we were tired of spending 45 minutes choosing what to watch. The solution was simple — start with how you feel, not what's trending.
                            </p>
                            <div style={{ display: "flex", gap: "12px" }}>
                                <button onClick={() => navigate("/movies")}
                                    style={{ background: "#2563EB", color: "#fff", border: "none", padding: "13px 28px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 25px rgba(37,99,235,0.45)", transition: "all 0.3s" }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "translateY(0)"; }}>
                                    Explore Movies →
                                </button>
                                <button onClick={() => navigate("/register")}
                                    style={{ background: "transparent", color: "#93C5FD", border: "1px solid rgba(96,165,250,0.3)", padding: "13px 28px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.3s" }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(96,165,250,0.1)"; e.currentTarget.style.borderColor = "rgba(96,165,250,0.6)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(96,165,250,0.3)"; }}>
                                    Join Free
                                </button>
                            </div>
                        </div>

                        {/* Right — floating stat cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            {STATS.map((s, i) => (
                                <div key={s.l} style={{ background: "rgba(22,40,100,0.6)", border: "1px solid rgba(96,165,250,0.18)", borderRadius: "16px", padding: "1.75rem", backdropFilter: "blur(8px)", animation: `floatSlow ${6 + i * 1.2}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                                    <div style={{ fontSize: "28px", marginBottom: "0.75rem" }}>{s.icon}</div>
                                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "38px", fontWeight: "700", color: "#60A5FA", lineHeight: 1, marginBottom: "4px" }}>{s.n}</div>
                                    <div style={{ fontSize: "11px", color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "400" }}>{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── MOOD SECTION ── */}
                <div style={{ padding: "5rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>✦ How It Works</p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "42px", fontWeight: "700", color: "#F8FAFC", marginBottom: "1rem" }}>
                                Pick a Mood. <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Get Your Movie.</em>
                            </h2>
                            <p style={{ fontSize: "15px", color: "#93C5FD", fontWeight: "300", maxWidth: "500px", margin: "0 auto", lineHeight: "1.75" }}>
                                Eight moods, thousands of perfectly matched titles. No scrolling, no decision fatigue.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
                            {MOODS.map((m, i) => (
                                <div key={m.label}
                                    onMouseEnter={() => setHovMood(i)} onMouseLeave={() => setHovMood(null)}
                                    onClick={() => navigate("/movies")}
                                    style={{
                                        background: hovMood === i ? m.bg : "rgba(22,40,100,0.4)",
                                        border: `1.5px solid ${hovMood === i ? m.color : "rgba(96,165,250,0.15)"}`,
                                        borderRadius: "14px", padding: "1.75rem", cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        transform: hovMood === i ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                                        boxShadow: hovMood === i ? `0 12px 35px ${m.color}30` : "none",
                                    }}>
                                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: m.color, marginBottom: "1rem", boxShadow: `0 0 10px ${m.color}88` }} />
                                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "21px", fontWeight: "700", color: hovMood === i ? m.color : "#E8F0FE", marginBottom: "6px", transition: "color 0.3s" }}>{m.label}</h3>
                                    <p style={{ fontSize: "11px", color: hovMood === i ? m.color : "#5B89C0", fontWeight: "300", transition: "color 0.3s" }}>Explore →</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* ── VALUES ── */}
                <div style={{ background: "rgba(17,34,80,0.5)", borderTop: "1px solid rgba(96,165,250,0.1)", borderBottom: "1px solid rgba(96,165,250,0.1)", padding: "5rem 2.5rem" }}>
                    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                        <FadeIn>
                            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                                <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>✦ What We Stand For</p>
                                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "42px", fontWeight: "700", color: "#F8FAFC" }}>
                                    Our <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Values</em>
                                </h2>
                            </div>
                        </FadeIn>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
                            {VALUES.map((v, i) => (
                                <FadeIn key={v.title} delay={i * 0.08}>
                                    <div
                                        onMouseEnter={() => setHovVal(i)} onMouseLeave={() => setHovVal(null)}
                                        style={{
                                            background: hovVal === i ? "rgba(30,55,120,0.8)" : "rgba(22,40,100,0.5)",
                                            border: `1px solid ${hovVal === i ? "rgba(96,165,250,0.4)" : "rgba(96,165,250,0.12)"}`,
                                            borderRadius: "16px", padding: "2rem",
                                            transition: "all 0.3s",
                                            transform: hovVal === i ? "translateY(-4px)" : "translateY(0)",
                                            boxShadow: hovVal === i ? "0 10px 30px rgba(37,99,235,0.15)" : "none",
                                            height: "100%",
                                        }}>
                                        <div style={{ fontSize: "32px", marginBottom: "1.1rem" }}>{v.icon}</div>
                                        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "20px", fontWeight: "700", color: "#F1F5F9", marginBottom: "0.75rem" }}>{v.title}</h3>
                                        <p style={{ fontSize: "13px", color: "#7BAEE8", lineHeight: "1.8", fontWeight: "300" }}>{v.desc}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── TEAM ── */}
                <div style={{ padding: "5rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>✦ The People</p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "42px", fontWeight: "700", color: "#F8FAFC" }}>
                                Meet the <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Team</em>
                            </h2>
                        </div>
                    </FadeIn>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
                        {TEAM.map((t, i) => (
                            <FadeIn key={t.name} delay={i * 0.1}>
                                <div
                                    onMouseEnter={() => setHovTeam(i)} onMouseLeave={() => setHovTeam(null)}
                                    style={{
                                        background: "rgba(22,40,100,0.5)", border: `1px solid ${hovTeam === i ? "rgba(96,165,250,0.4)" : "rgba(96,165,250,0.12)"}`,
                                        borderRadius: "18px", padding: "2rem", textAlign: "center",
                                        transition: "all 0.35s",
                                        transform: hovTeam === i ? "translateY(-8px)" : "translateY(0)",
                                        boxShadow: hovTeam === i ? "0 16px 40px rgba(37,99,235,0.2)" : "none",
                                    }}>
                                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: t.grad, margin: "0 auto 1.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "30px", fontWeight: "700", color: "#FFFAEF", boxShadow: hovTeam === i ? "0 0 30px rgba(96,165,250,0.3)" : "none", transition: "box-shadow 0.35s", border: "2px solid rgba(255,255,255,0.15)" }}>
                                        {t.initial}
                                    </div>
                                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "20px", fontWeight: "700", color: "#F1F5F9", marginBottom: "6px" }}>{t.name}</h3>
                                    <p style={{ fontSize: "11px", color: "#7BAEE8", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "400" }}>{t.role}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>

                {/* ── CTA BANNER ── */}
                <FadeIn>
                    <div style={{ margin: "0 2.5rem 5rem", borderRadius: "24px", background: "linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#3B82F6 100%)", padding: "4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-100px", right: "-50px" }} />
                        <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: "-80px", left: "-40px" }} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "46px", fontWeight: "700", color: "#fff", marginBottom: "1rem" }}>
                                Ready for Your <em style={{ color: "#FCD34D", fontStyle: "italic" }}>Movie Night?</em>
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", fontWeight: "300", marginBottom: "2.5rem" }}>
                                Join 50,000+ movie lovers already discovering films through their mood.
                            </p>
                            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
                                <button onClick={() => navigate("/register")}
                                    style={{ background: "#fff", color: "#1E3A8A", border: "none", padding: "14px 32px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: "700", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", transition: "all 0.3s" }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}>
                                    Create Free Account
                                </button>
                                <button onClick={() => navigate("/movies")}
                                    style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", padding: "14px 32px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "14px", cursor: "pointer", transition: "all 0.3s" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
                                    Browse as Guest
                                </button>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* FOOTER */}
                <footer style={{ background: "#091633", padding: "2.5rem", textAlign: "center", borderTop: "1px solid rgba(96,165,250,0.08)" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: "700", color: "#F8FAFC", marginBottom: "0.5rem" }}>
                        BINGE<span style={{ color: "#60A5FA" }}> & </span>BOX
                    </div>
                    <p style={{ fontSize: "12px", color: "#3B6EA8", marginTop: "0.5rem" }}>© 2025 Binge & Box. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}