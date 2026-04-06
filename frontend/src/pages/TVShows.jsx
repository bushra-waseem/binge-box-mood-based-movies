import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TV_SHOWS_LIST } from "./moviesData";

const MOODS = ["All", "Happy", "Romance", "Chill", "Emotional", "Thriller", "Sci-Fi", "Motivated", "Horror"];
const MOOD_C = {
    All: { bg: "#38BDF80F", color: "#38BDF8", border: "#38BDF840" },
    Happy: { bg: "#FCD34D0F", color: "#FCD34D", border: "#FCD34D40" },
    Romance: { bg: "#E879F90F", color: "#E879F9", border: "#E879F940" },
    Chill: { bg: "#34D3990F", color: "#34D399", border: "#34D39940" },
    Emotional: { bg: "#818CF80F", color: "#818CF8", border: "#818CF840" },
    Thriller: { bg: "#FB923C0F", color: "#FB923C", border: "#FB923C40" },
    "Sci-Fi": { bg: "#38BDF80F", color: "#38BDF8", border: "#38BDF840" },
    Motivated: { bg: "#A3E6350F", color: "#A3E635", border: "#A3E63540" },
    Horror: { bg: "#A78BFA0F", color: "#A78BFA", border: "#A78BFA40" },
};
function TVCard({ show, onNavigate }) {
    const [hov, setHov] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    const neon = show.neon || "#60A5FA";

    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            onClick={() => onNavigate(`/movies/${show._id}`)}
            style={{ borderRadius: "12px", overflow: "hidden", background: "rgba(22,40,90,0.75)", border: `1px solid ${hov ? neon : "rgba(96,165,250,0.12)"}`, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transform: hov ? "translateY(-10px) scale(1.02)" : "translateY(0)", boxShadow: hov ? `0 20px 50px ${neon}44, 0 0 20px ${neon}22` : "none", display: "flex", flexDirection: "column", zIndex: hov ? 10 : 1 }}>
            <div style={{ width: "100%", paddingTop: "145%", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0 }}>
                    {show.posterUrl && !imgErr ? (
                        <img src={show.posterUrl} alt={show.title} onError={() => setImgErr(true)}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: show.posterColor }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: hov ? "linear-gradient(to top,rgba(11,26,62,0.95) 0%,transparent 55%)" : "linear-gradient(to top,rgba(11,26,62,0.7) 0%,transparent 60%)", transition: "background 0.3s" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right,transparent,${neon},transparent)`, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
                    <span style={{ position: "absolute", top: "9px", right: "9px", background: "rgba(0,0,0,0.6)", color: "#FCD34D", fontSize: "11px", fontWeight: "600", padding: "3px 8px", borderRadius: "4px" }}>★ {show.rating}</span>
                    <span style={{ position: "absolute", top: "9px", left: "9px", background: show.status === "Ongoing" ? "rgba(52,211,153,0.85)" : "rgba(0,0,0,0.55)", color: "#fff", fontSize: "9px", fontWeight: "600", padding: "3px 7px", borderRadius: "3px", letterSpacing: "0.05em" }}>
                        {show.status === "Ongoing" ? "● LIVE" : "ENDED"}
                    </span>
                </div>
            </div>
            <div style={{ padding: "12px", background: "rgba(10,20,50,0.85)", flex: 1 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", fontWeight: "700", color: "#F1F5F9", marginBottom: "2px", lineHeight: "1.2" }}>{show.title}</p>
                <p style={{ fontSize: "10px", color: "#7BA3D0", fontWeight: "300", marginBottom: hov ? "8px" : "0" }}>{show.year} · {show.seasons} Season{show.seasons > 1 ? "s" : ""}</p>
                {hov && (
                    <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={e => { e.stopPropagation(); onNavigate(`/movies/${show._id}`); }}
                            style={{ flex: 1, background: neon, color: "#0B1A3E", border: "none", padding: "7px 0", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "10px", fontWeight: "600", cursor: "pointer" }}>▶ Watch</button>
                        <button onClick={e => { e.stopPropagation(); alert(`"${show.title}" added to watchlist!`); }}
                            style={{ flex: 1, background: "transparent", color: neon, border: `1px solid ${neon}55`, padding: "7px 0", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "10px", cursor: "pointer" }}>+ Watchlist</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function TVShows() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeMood, setActiveMood] = useState("All");
    const [activeStatus, setActiveStatus] = useState("All");

    const filtered = TV_SHOWS_LIST.filter(s => {
        const ms = s.title.toLowerCase().includes(search.toLowerCase());
        const mo = activeMood === "All" || s.mood?.includes(activeMood);
        const st = activeStatus === "All" || s.status === activeStatus;
        return ms && mo && st;
    });

    const pill = (active, neon) => ({
        padding: "7px 15px", borderRadius: "30px", fontSize: "12px", fontWeight: "500",
        fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
        border: `1px solid ${active ? (neon || "#60A5FA") : "rgba(96,165,250,0.2)"}`,
        background: active ? (neon ? `${neon}20` : "rgba(96,165,250,0.15)") : "transparent",
        color: active ? (neon || "#60A5FA") : "#7BA3D0",
        cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
    });

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <div style={{ fontFamily: "'Jost',sans-serif", background: "#0B1A3E", minHeight: "100vh", color: "#F1F5F9", paddingTop: "70px" }}>

                <div style={{ padding: "3rem 2.5rem 2rem", maxWidth: "1100px", margin: "0 auto", borderBottom: "1px solid rgba(96,165,250,0.1)" }}>
                    <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "8px" }}>✦ TV Shows</p>
                    <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "44px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.1", marginBottom: "0.5rem" }}>
                        Binge-Worthy <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Shows</em>
                    </h1>
                    <p style={{ fontSize: "14px", color: "#7BA3D0", fontWeight: "300" }}>{filtered.length} shows</p>
                </div>

                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem" }}>
                    <div style={{ position: "relative", marginBottom: "1.75rem" }}>
                        <svg style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7BA3D0" strokeWidth="2.5" strokeLinecap="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="Search TV shows..." value={search} onChange={e => setSearch(e.target.value)}
                            style={{ width: "100%", padding: "12px 15px 12px 44px", borderRadius: "8px", border: "1px solid rgba(96,165,250,0.2)", background: "rgba(22,40,90,0.7)", fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "#F1F5F9", outline: "none", boxSizing: "border-box" }}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.45)"} onBlur={e => e.target.style.borderColor = "rgba(96,165,250,0.2)"} />
                    </div>

                    {/* MOOD PILLS */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>Mood</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>

                            {/* All Moods Button */}
                            <span onClick={() => setActiveMood("All")}
                                style={{
                                    ...pill(activeMood === "All"),
                                    color: "#38BDF8",
                                    borderColor: activeMood === "All" ? "#38BDF8" : "#38BDF840",
                                    background: activeMood === "All" ? "#38BDF833" : "#38BDF80F",
                                    boxShadow: activeMood === "All" ? "0 0 15px #38BDF840" : "none"
                                }}>
                                All
                            </span>

                            {/* Other Moods */}
                            {MOODS.filter(m => m !== "All").map(m => {
                                const mc = MOOD_C[m] || {};
                                const isActive = activeMood === m;

                                return (
                                    <span key={m} onClick={() => setActiveMood(m)}
                                        style={{
                                            ...pill(isActive, mc.color),
                                            color: mc.color, // Hamesha colorful text
                                            borderColor: isActive ? mc.color : mc.border, // Colorful borders
                                            background: isActive ? `${mc.color}33` : mc.bg, // Subtle colorful background
                                            boxShadow: isActive ? `0 0 15px ${mc.color}40` : "none", // Neon glow on click
                                            transition: "all 0.3s ease"
                                        }}>
                                        {m}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", borderTop: "1px solid rgba(96,165,250,0.08)", paddingTop: "1.25rem" }}>
                        <div>
                            <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5B89C0", marginBottom: "10px" }}>Status</p>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {["All", "Ongoing", "Ended"].map(s => <span key={s} onClick={() => setActiveStatus(s)} style={pill(activeStatus === s)}>{s}</span>)}
                            </div>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "5rem 0" }}>
                            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", color: "#3B6EA8", marginBottom: "1rem" }}>No shows found</p>
                            <button onClick={() => { setActiveMood("All"); setActiveStatus("All"); setSearch(""); }}
                                style={{ background: "#2563EB", color: "#fff", border: "none", padding: "12px 26px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer" }}>Reset</button>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "18px", alignItems: "start" }}>
                            {filtered.map(s => <TVCard key={s._id} show={s} onNavigate={navigate} />)}
                        </div>
                    )}
                    <div style={{ height: "4rem" }} />
                </div>
            </div>
        </>
    );
}