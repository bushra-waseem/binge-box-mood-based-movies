import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FEATURED, TRENDING, MOVIES_DB } from "./moviesData";

const HERO_IDS = ["2", "5", "8"];

function useVisible(ref) {
    const [v, setV] = useState(false);
    useEffect(() => {
        const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
        if (ref.current) o.observe(ref.current);
        return () => o.disconnect();
    }, []);
    return v;
}

function FeaturedCard({ movie, index, onNavigate }) {
    const ref = useRef();
    const visible = useVisible(ref);
    const isLeft = index % 2 === 0;
    const [imgErr, setImgErr] = useState(false);
    const [hov, setHov] = useState(false);
    const neon = movie.neon || "#60A5FA";
    const nextMovie = FEATURED[index + 1];

    return (
        <>
            <div ref={ref} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0",
                alignItems: "center", direction: isLeft ? "ltr" : "rtl",
                maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem",
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)",
                transition: `opacity 0.8s ease ${index * 0.08}s,transform 0.8s ease ${index * 0.08}s`,
            }}>
                {/* Image */}
                <div
                    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                    onClick={() => onNavigate(`/movies/${movie._id}`)}
                    style={{
                        direction: "ltr", aspectRatio: "16/9", borderRadius: "14px",
                        overflow: "hidden", position: "relative", cursor: "pointer",
                        boxShadow: hov ? `0 0 45px ${neon}99,0 0 90px ${neon}44,0 20px 60px rgba(0,0,0,0.7)` : `0 0 20px ${neon}33,0 10px 40px rgba(0,0,0,0.5)`,
                        transition: "box-shadow 0.4s ease,transform 0.4s ease",
                        transform: hov ? "scale(1.02)" : "scale(1)",
                        border: `1px solid ${neon}44`,
                    }}
                >
                    {movie.posterUrl && !imgErr ? (
                        <img src={movie.bgUrl || movie.posterUrl} alt={movie.title} onError={() => setImgErr(true)}
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform 0.5s ease", transform: hov ? "scale(1.05)" : "scale(1)" }}
                        />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: movie.posterColor }} />
                    )}
                    {/* FIX 1: overlay only on bottom portion — not full dark blanket */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,15,40,0.7) 0%, rgba(5,15,40,0.1) 40%, transparent 100%)" }} />
                    {/* Neon top border */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right,transparent,${neon},transparent)`, opacity: hov ? 1 : 0.5, transition: "opacity 0.4s" }} />
                    <span style={{ position: "absolute", bottom: "12px", left: "14px", background: "rgba(0,0,0,0.55)", color: "#FCD34D", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "4px" }}>★ {movie.rating}</span>
                </div>

                {/* Text */}
                <div style={{ direction: "ltr", padding: isLeft ? "0 0 0 3rem" : "0 3rem 0 0" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
                        {movie.mood?.map(m => (
                            <span key={m} style={{ background: `${neon}18`, color: neon, border: `1px solid ${neon}40`, fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "3px", letterSpacing: "0.06em" }}>{m}</span>
                        ))}
                    </div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "38px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.1", marginBottom: "0.6rem" }}>{movie.title}</h2>
                    <p style={{ fontSize: "12px", color: "#93C5FD", marginBottom: "1.1rem", letterSpacing: "0.06em" }}>{movie.year} · {movie.genre?.join(" · ")}</p>
                    <p style={{ fontSize: "15px", color: "#A8C4F0", lineHeight: "1.8", fontWeight: "300", marginBottom: "2rem" }}>{movie.description}</p>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button onClick={() => onNavigate(`/movies/${movie._id}`)}
                            style={{ background: neon, color: "#0B1A3E", border: "none", padding: "12px 28px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", cursor: "pointer", boxShadow: `0 0 22px ${neon}55`, transition: "all 0.3s ease" }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 38px ${neon}88`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 22px ${neon}55`; e.currentTarget.style.transform = "translateY(0)"; }}>
                            ▶ Watch Now
                        </button>
                        <button
                            style={{ background: "transparent", color: "#A8C4F0", border: "1px solid rgba(148,163,184,0.25)", padding: "12px 22px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.3s ease" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = neon; e.currentTarget.style.color = neon; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(148,163,184,0.25)"; e.currentTarget.style.color = "#94A3B8"; }}>
                            + Add to Watchlist
                        </button>
                    </div>
                </div>
            </div>

            {/* NEON DIVIDER LINE */}
            {index < FEATURED.length - 1 && (
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem" }}>
                    <div style={{ margin: "3.5rem 0", position: "relative" }}>
                        <div style={{ height: "1px", background: `linear-gradient(to right,transparent 0%,${neon}88 25%,${neon} 50%,${nextMovie?.neon || neon}88 75%,transparent 100%)`, boxShadow: `0 0 8px ${neon}66,0 0 16px ${neon}33` }} />
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "10px", height: "10px", borderRadius: "50%", background: neon, boxShadow: `0 0 10px ${neon},0 0 20px ${neon}88,0 0 35px ${neon}55` }} />
                        <div style={{ height: "1px", background: `linear-gradient(to right,transparent,${neon}22,transparent)`, marginTop: "4px", filter: "blur(2px)" }} />
                    </div>
                </div>
            )}
        </>
    );
}

function TrendingCard({ movie, index, onNavigate }) {
    const [imgErr, setImgErr] = useState(false);
    const [hov, setHov] = useState(false);
    const tagC = { HOT: "#EF4444", POPULAR: "#3B82F6", CLASSIC: "#F59E0B" };
    const neon = movie.neon || "#60A5FA";

    return (
        <div onClick={() => onNavigate(`/movies/${movie._id}`)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ borderRadius: "12px", overflow: "hidden", background: "rgba(22,40,90,0.75)", border: `1px solid ${hov ? neon + "55" : "rgba(96,165,250,0.12)"}`, cursor: "pointer", transition: "all 0.3s ease", transform: hov ? "translateY(-6px)" : "translateY(0)", boxShadow: hov ? `0 15px 50px ${neon}99, 0 0 25px ${neon}66` : "none" }}>
            <div style={{ height: "160px", position: "relative", overflow: "hidden" }}>
                {movie.posterUrl && !imgErr ? (
                    <img src={movie.posterUrl} alt={movie.title} onError={() => setImgErr(true)}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hov ? "scale(1.08)" : "scale(1)" }} />
                ) : <div style={{ width: "100%", height: "100%", background: movie.posterColor }} />}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(11,26,62,0.85) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right,transparent,${neon},transparent)`, opacity: hov ? 1 : 0.4, transition: "opacity 0.3s" }} />
                <div style={{ position: "absolute", top: "10px", left: "10px", fontFamily: "'Cormorant Garamond',serif", fontSize: "34px", fontWeight: "700", color: "rgba(255,255,255,0.14)", lineHeight: 1 }}>0{index + 1}</div>
                {movie.tag && <span style={{ position: "absolute", top: "10px", right: "10px", background: tagC[movie.tag], color: "#fff", fontSize: "9px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px", letterSpacing: "0.1em" }}>{movie.tag}</span>}
                <span style={{ position: "absolute", bottom: "8px", right: "10px", background: "rgba(0,0,0,0.55)", color: "#FCD34D", fontSize: "11px", fontWeight: "600", padding: "3px 7px", borderRadius: "4px" }}>★ {movie.rating}</span>
            </div>
            <div style={{ padding: "12px 14px", background: "rgba(17,34,80,0.85)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", fontWeight: "700", color: "#F1F5F9", marginBottom: "3px" }}>{movie.title}</p>
                <p style={{ fontSize: "11px", color: "#7BAEE8", fontWeight: "300" }}>{movie.year} · {movie.genre?.slice(0, 2).join(" · ")}</p>
            </div>
        </div>
    );
}

// ── CONTACT SECTION ──────────────────────────────────────────
const FAQS = [
    { q: "Is Binge & Box free?", a: "Yes! Basic browsing and mood discovery are completely free. Create an account to unlock watchlists and reviews." },
    { q: "How does mood-based discovery work?", a: "Select your current mood — Romance, Thriller, Sci-Fi and more — and we show movies and shows that perfectly match that vibe." },
    { q: "Can I add movies to the database?", a: "Admins can add movies via the admin dashboard. Users can request additions by contacting us." },
];

/* FIX 2: Spinning animated border box component */
function SpinBorderBox({ children, color = "#60A5FA", style = {}, hoverLift = false }) {
    const [hov, setHov] = useState(false);
    const uid = useRef("sb" + Math.random().toString(36).slice(2, 8)).current;
    return (
        <>
            <style>{`
                @property --rot_${uid} { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                @keyframes spin_${uid} { to { --rot_${uid}: 360deg; } }
                .${uid} { position: relative; border-radius: 16px; }
                .${uid}::before {
                    content: ''; position: absolute; inset: -1.5px; border-radius: 17px;
                    background: conic-gradient(
                        from var(--rot_${uid}),
                        transparent 0deg,
                        ${color} 60deg,
                        ${color}dd 90deg,
                        transparent 150deg,
                        transparent 210deg,
                        ${color}88 260deg,
                        ${color} 290deg,
                        transparent 340deg
                    );
                    animation: spin_${uid} 3s linear infinite;
                    z-index: 0;
                }
                .${uid}::after {
                    content: ''; position: absolute; inset: 1px; border-radius: 15px;
                    background: rgba(22,40,90,0.95);
                    z-index: 1;
                }
                .${uid} > * { position: relative; z-index: 2; }
            `}</style>
            <div
                className={uid}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                    ...style,
                    transform: hoverLift && hov ? "translateY(-4px)" : "translateY(0)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: hov ? `0 10px 32px ${color}44` : "none",
                }}
            >
                {children}
            </div>
        </>
    );
}

function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const ref = useRef();
    const visible = useVisible(ref);

    const inputStyle = { width: "100%", padding: "12px 15px", borderRadius: "7px", border: "1px solid rgba(96,165,250,0.2)", background: "rgba(22,40,90,0.75)", fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "#F1F5F9", outline: "none", boxSizing: "border-box", fontWeight: "300", transition: "border-color 0.3s" };

    return (
        <div ref={ref} style={{ background: "linear-gradient(to bottom,#0B1A3E,#091633)", borderTop: "1px solid rgba(96,165,250,0.1)", padding: "6rem 2.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease,transform 0.8s ease" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>✦ Get In Touch</p>
                    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "46px", fontWeight: "700", color: "#F8FAFC", marginBottom: "0" }}>
                        Let's <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Connect</em>
                    </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
                    {/* FIX 2a: FORM with spinning neon border */}
                    <SpinBorderBox color="#60A5FA" style={{ padding: "2.5rem" }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", marginBottom: "1.75rem" }}>
                            Send a <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Message</em>
                        </h3>
                        {sent ? (
                            <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                                <div style={{ fontSize: "40px", marginBottom: "1rem" }}>✉</div>
                                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", color: "#34D399", marginBottom: "0.5rem" }}>Message Sent!</h4>
                                <p style={{ fontSize: "13px", color: "#93C5FD", fontWeight: "300" }}>We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                                    <div>
                                        <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7BAEE8", marginBottom: "7px" }}>Name</p>
                                        <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.55)"} onBlur={e => e.target.style.borderColor = "rgba(96,165,250,0.2)"} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7BAEE8", marginBottom: "7px" }}>Email</p>
                                        <input style={inputStyle} placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.55)"} onBlur={e => e.target.style.borderColor = "rgba(96,165,250,0.2)"} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7BAEE8", marginBottom: "7px" }}>Message</p>
                                    <textarea rows={4} style={{ ...inputStyle, resize: "none", lineHeight: "1.6" }} placeholder="Tell us anything…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                        onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.55)"} onBlur={e => e.target.style.borderColor = "rgba(96,165,250,0.2)"} />
                                </div>
                                <button onClick={() => { if (form.name && form.email && form.message) { setSent(true); setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 4000); } }}
                                    style={{ width: "100%", padding: "13px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "7px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 0 22px rgba(37,99,235,0.4)", transition: "all 0.3s ease" }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.boxShadow = "0 0 38px rgba(37,99,235,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 22px rgba(37,99,235,0.4)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                                    Send Message →
                                </button>
                            </>
                        )}
                    </SpinBorderBox>

                    {/* FAQ */}
                    <div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", marginBottom: "1.75rem" }}>
                            Frequently <em style={{ color: "#818CF8", fontStyle: "italic" }}>Asked</em>
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {FAQS.map((faq, i) => (
                                <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    style={{ background: "rgba(22,40,90,0.75)", border: `1px solid ${openFaq === i ? "rgba(129,140,248,0.35)" : "rgba(96,165,250,0.12)"}`, borderRadius: "10px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.25s" }}>
                                    <div style={{ padding: "1.1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <p style={{ fontSize: "14px", fontWeight: "500", color: "#C8DEFF", margin: 0, paddingRight: "1rem" }}>{faq.q}</p>
                                        <span style={{ color: "#818CF8", fontSize: "18px", flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                                    </div>
                                    {openFaq === i && (
                                        <div style={{ padding: "0 1.4rem 1.1rem", borderTop: "1px solid rgba(129,140,248,0.1)" }}>
                                            <p style={{ fontSize: "13px", color: "#93C5FD", lineHeight: "1.75", fontWeight: "300", margin: "0.9rem 0 0" }}>{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* FIX 2b: Email & Response boxes with spinning border + hover lift */}
                        <div style={{ marginTop: "1.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            <SpinBorderBox color="#60A5FA" hoverLift={true} style={{ padding: "1.25rem", textAlign: "center" }}>
                                <div style={{ fontSize: "22px", marginBottom: "6px" }}>✉</div>
                                <p style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "4px" }}>Email</p>
                                <p style={{ fontSize: "12px", color: "#93C5FD", fontWeight: "300" }}>hello@bingebox.com</p>
                            </SpinBorderBox>
                            <SpinBorderBox color="#34D399" hoverLift={true} style={{ padding: "1.25rem", textAlign: "center" }}>
                                <div style={{ fontSize: "22px", marginBottom: "6px" }}>⏱</div>
                                <p style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#34D399", marginBottom: "4px" }}>Response</p>
                                <p style={{ fontSize: "12px", color: "#93C5FD", fontWeight: "300" }}>Within 24 hours</p>
                            </SpinBorderBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const navigate = useNavigate();
    const [heroIdx, setHeroIdx] = useState(0);
    const [imgErr, setImgErr] = useState(false);

    useEffect(() => {
        const t = setInterval(() => { setHeroIdx(i => (i + 1) % HERO_IDS.length); setImgErr(false); }, 5000);
        return () => clearInterval(t);
    }, []);

    const hero = MOVIES_DB[HERO_IDS[heroIdx]];

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}.hanim{animation:fadeUp 0.85s ease forwards;}`}</style>

            <div style={{ background: "transparent", minHeight: "100vh", color: "#F1F5F9", fontFamily: "'Jost',sans-serif", paddingTop: "0" }}>

                {/* HERO */}
                <div style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
                    {hero.bgUrl && !imgErr ? (
                        <img key={hero._id} src={hero.bgUrl} alt={hero.title} onError={() => setImgErr(true)}
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "opacity 1s ease" }} />
                    ) : <div style={{ position: "absolute", inset: 0, background: hero.posterColor }} />}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(11,26,62,0.85) 0%, rgba(11,26,62,0.3) 30%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top,#0B1A3E,transparent)" }} />

                    <div key={heroIdx} className="hanim" style={{ position: "absolute", bottom: "12%", left: "5%", maxWidth: "540px" }}>
                        <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "1rem" }}>✦ Now Featuring</p>
                        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "62px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.05", marginBottom: "0.75rem" }}>{hero.title}</h1>
                        <p style={{ fontSize: "12px", color: "#93C5FD", marginBottom: "1rem", letterSpacing: "0.06em" }}>{hero.year} · {hero.genre?.join(" · ")}</p>
                        <p style={{ fontSize: "15px", color: "#A8C4F0", lineHeight: "1.75", fontWeight: "300", marginBottom: "2rem", maxWidth: "430px" }}>{hero.description}</p>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <button onClick={() => navigate(`/movies/${hero._id}`)}
                                style={{ background: "#2563EB", color: "#fff", border: "none", padding: "14px 30px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", cursor: "pointer", boxShadow: "0 0 28px rgba(37,99,235,0.5)", transition: "all 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "translateY(0)"; }}>
                                ▶ Watch Now
                            </button>
                            <button onClick={() => navigate("/movies")}
                                style={{ background: "rgba(255,255,255,0.07)", color: "#C8DEFF", border: "1px solid rgba(255,255,255,0.18)", padding: "14px 26px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(96,165,250,0.12)"; e.currentTarget.style.borderColor = "rgba(96,165,250,0.35)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}>
                                Browse All
                            </button>
                        </div>
                    </div>

                    {/* Dots */}
                    <div style={{ position: "absolute", bottom: "5%", left: "5%", display: "flex", gap: "8px" }}>
                        {HERO_IDS.map((_, i) => (
                            <div key={i} onClick={() => setHeroIdx(i)} style={{ width: i === heroIdx ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === heroIdx ? "#60A5FA" : "rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.35s ease" }} />
                        ))}
                    </div>

                    <div style={{ position: "absolute", bottom: "12%", right: "5%", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "44px", fontWeight: "700", color: "#FCD34D", lineHeight: 1 }}>★</div>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC" }}>{hero.rating}</div>
                        <div style={{ fontSize: "10px", color: "#93C5FD", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>IMDb</div>
                    </div>
                </div>

                {/* RECOMMENDED */}
                <div style={{ padding: "6rem 0 4rem" }}>
                    <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 2.5rem" }}>
                        <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>✦ Curated For You</p>
                        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "42px", fontWeight: "700", color: "#F8FAFC" }}>
                            Recommended <em style={{ color: "#60A5FA", fontStyle: "italic" }}>For You</em>
                        </h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
                        {FEATURED.map((movie, i) => <FeaturedCard key={movie._id} movie={movie} index={i} onNavigate={navigate} />)}
                    </div>
                </div>

                {/* TRENDING */}
                <div style={{ padding: "2rem 2.5rem 5rem", maxWidth: "1100px", margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
                        <div>
                            <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "8px" }}>✦ This Week</p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "38px", fontWeight: "700", color: "#F8FAFC" }}>Trending <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Now</em></h2>
                        </div>
                        <button onClick={() => navigate("/movies")}
                            style={{ background: "transparent", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.35)", padding: "9px 20px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.3s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(96,165,250,0.1)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                            See All →
                        </button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))", gap: "16px" }}>
                        {TRENDING.map((m, i) => <TrendingCard key={m._id + "_" + i} movie={m} index={i} onNavigate={navigate} />)}
                    </div>
                </div>

                {/* STATS */}
                <div style={{ borderTop: "1px solid rgba(96,165,250,0.1)", borderBottom: "1px solid rgba(96,165,250,0.1)", background: "rgba(22,40,90,0.5)", padding: "2.5rem" }}>
                    <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", textAlign: "center" }}>
                        {[{ n: "10K+", l: "Titles" }, { n: "50K+", l: "Users" }, { n: "8", l: "Moods" }].map(s => (
                            <div key={s.l}>
                                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "46px", fontWeight: "700", color: "#60A5FA", lineHeight: 1, marginBottom: "6px" }}>{s.n}</div>
                                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#7BAEE8" }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONTACT */}
                <ContactSection />

                {/* FOOTER */}
                <footer style={{ background: "#091633", padding: "2.5rem", textAlign: "center", borderTop: "1px solid rgba(96,165,250,0.06)" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: "700", color: "#F8FAFC", marginBottom: "0.5rem" }}>
                        BINGE<span style={{ color: "#60A5FA" }}> & </span>BOX
                    </div>
                    <p style={{ fontSize: "12px", color: "#60A5FA", marginTop: "0.75rem" }}>© 2025 Binge & Box. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}