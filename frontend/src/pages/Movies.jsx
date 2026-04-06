import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOVIES_LIST } from "./moviesData";

const MOODS = ["All", "Happy", "Romance", "Chill", "Emotional", "Thriller", "Sci-Fi", "Motivated", "Horror"];

const MOOD_C = {
    // Isko "All" kar dein taake aapke MOODS array se match kare
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
function MovieCard({ movie, onNavigate }) {
    const [hov, setHov] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    const neon = movie.neon || "#60A5FA";

    return (
        <div
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            onClick={() => onNavigate(`/movies/${movie._id}`)}
            style={{ borderRadius: "12px", overflow: "hidden", background: "rgba(22,40,90,0.75)", border: `1px solid ${hov ? neon : "rgba(96,165,250,0.12)"}`, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transform: hov ? "translateY(-10px) scale(1.02)" : "translateY(0)", boxShadow: hov ? `0 20px 50px ${neon}44, 0 0 20px ${neon}22` : "none", display: "flex", flexDirection: "column", zIndex: hov ? 10 : 1 }}
        >
            {/* Poster — fixed 3:4 ratio using padding trick to avoid flicker */}
            <div style={{ width: "100%", paddingTop: "145%", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0 }}>
                    {movie.posterUrl && !imgErr ? (
                        <img src={movie.posterUrl} alt={movie.title} onError={() => setImgErr(true)}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease", transform: hov ? "scale(1.06)" : "scale(1)" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: movie.posterColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "36px", color: "rgba(255,255,255,0.2)" }}>🎬</span>
                        </div>
                    )}
                    <div style={{ position: "absolute", inset: 0, background: hov ? "linear-gradient(to top,rgba(11,26,62,0.9) 0%,transparent 55%)" : "linear-gradient(to top,rgba(11,26,62,0.9) 0%,transparent 60%)", transition: "background 0.3s ease" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right,transparent,${neon},transparent)`, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
                    <span style={{ position: "absolute", top: "9px", right: "9px", background: "rgba(0,0,0,0.6)", color: "#FCD34D", fontSize: "11px", fontWeight: "600", padding: "3px 8px", borderRadius: "4px" }}>★ {movie.rating}</span>
                    <div style={{ position: "absolute", bottom: "9px", left: "9px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {movie.mood?.slice(0, 2).map(m => {
                            const mc = MOOD_C[m] || {};
                            return <span key={m} style={{ background: mc.bg || "rgba(255,255,255,0.12)", color: mc.color || "#fff", fontSize: "9px", fontWeight: "500", padding: "2px 7px", borderRadius: "3px" }}>{m}</span>;
                        })}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "13px", background: "rgba(17,34,80,0.9)", flex: 1 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", fontWeight: "700", color: "#F1F5F9", marginBottom: "3px", lineHeight: "1.2" }}>{movie.title}</p>
                <p style={{ fontSize: "10px", color: "#7BAEE8", fontWeight: "300", marginBottom: hov ? "9px" : "0", letterSpacing: "0.04em" }}>{movie.year} · {movie.genre?.slice(0, 2).join(" · ")}</p>
                {hov && (
                    <>
                        <p style={{ fontSize: "11px", color: "#93C5FD", lineHeight: "1.6", fontWeight: "300", marginBottom: "10px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{movie.description}</p>
                        <div style={{ display: "flex", gap: "7px" }}>
                            <button onClick={e => { e.stopPropagation(); onNavigate(`/movies/${movie._id}`); }}
                                style={{ flex: 1, background: neon, color: "#0B1A3E", border: "none", padding: "8px 0", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "10px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.05em" }}>▶ Watch</button>
                            <button onClick={e => { e.stopPropagation(); alert(`Added "${movie.title}" to watchlist!`); }}
                                style={{ flex: 1, background: "transparent", color: neon, border: `1px solid ${neon}55`, padding: "8px 0", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "10px", fontWeight: "500", cursor: "pointer" }}>+ Watchlist</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Movies() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeMood, setActiveMood] = useState("All");
    const [activeRating, setActiveRating] = useState("All");
    const [sortBy, setSortBy] = useState("latest");

    const filtered = MOVIES_LIST.filter(m => {
        const s = m.title.toLowerCase().includes(search.toLowerCase());
        const mo = activeMood === "All" || m.mood?.includes(activeMood);
        const r = activeRating === "All" ? true : activeRating === "9+" ? m.rating >= 9 : activeRating === "8+" ? m.rating >= 8 : m.rating >= 7;
        return s && mo && r;
    }).sort((a, b) => sortBy === "rating" ? b.rating - a.rating : sortBy === "title" ? a.title.localeCompare(b.title) : b.year - a.year);

    const pill = (active, neon) => ({
        padding: "7px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: "500",
        fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
        border: `1px solid ${active ? (neon || "#60A5FA") : "rgba(96,165,250,0.18)"}`,
        background: active ? (neon ? `${neon}20` : "rgba(96,165,250,0.15)") : "transparent",
        color: active ? (neon || "#60A5FA") : "#7BA3D0",
        cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
    });

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <div style={{ fontFamily: "'Jost',sans-serif", background: "#0B1A3E", minHeight: "100vh", color: "#F1F5F9", paddingTop: "70px" }}>

                <div style={{ padding: "3rem 2.5rem 2rem", maxWidth: "1100px", margin: "0 auto", borderBottom: "1px solid rgba(96,165,250,0.1)" }}>
                    <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "8px" }}>✦ Browse</p>
                    <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "44px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.1", marginBottom: "0.5rem" }}>
                        Find Your <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Perfect Watch</em>
                    </h1>
                    <p style={{ fontSize: "14px", color: "#7BAEE8", fontWeight: "300" }}>{filtered.length} titles</p>
                </div>

                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem" }}>

                    {/* SEARCH */}
                    <div style={{ position: "relative", marginBottom: "2rem" }}>
                        <svg style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7BA3D0" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input type="text" placeholder="Search movies..." value={search} onChange={e => setSearch(e.target.value)}
                            style={{ width: "100%", padding: "13px 15px 13px 44px", borderRadius: "8px", border: "1px solid rgba(96,165,250,0.18)", background: "rgba(22,40,90,0.7)", fontFamily: "'Jost',sans-serif", fontSize: "14px", color: "#F1F5F9", outline: "none", boxSizing: "border-box" }}
                            onFocus={e => e.target.style.borderColor = "rgba(96,165,250,0.45)"} onBlur={e => e.target.style.borderColor = "rgba(96,165,250,0.18)"} />
                        {search && <span onClick={() => setSearch("")} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#93C5FD", fontSize: "20px" }}>×</span>}
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
                                All Moods
                            </span>

                            {/* Other Moods */}
                            {MOODS.filter(m => m !== "All").map(m => {
                                const mc = MOOD_C[m] || {};
                                const isActive = activeMood === m;

                                return (
                                    <span key={m} onClick={() => setActiveMood(m)}
                                        style={{
                                            ...pill(isActive, mc.color),
                                            // Hamesha colorful rakhne ke liye mc.color use kiya hai
                                            color: mc.color,
                                            // Border hamesha colorful rahegi
                                            borderColor: isActive ? mc.color : mc.border,
                                            // Background hamesha halka colorful rahega
                                            background: isActive ? `${mc.color}33` : mc.bg,
                                            // Click karne par Neon Glow effect
                                            boxShadow: isActive ? `0 0 15px ${mc.color}40` : "none",
                                            transition: "all 0.3s ease"
                                        }}>
                                        {m}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* RATING + SORT */}
                    <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", borderTop: "1px solid rgba(96,165,250,0.08)", paddingTop: "1.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>Rating</p>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {["All", "9+", "8+", "7+"].map(r => <span key={r} onClick={() => setActiveRating(r)} style={pill(activeRating === r)}>{r}</span>)}
                            </div>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                            <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>Sort By</p>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                                style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid rgba(96,165,250,0.18)", background: "rgba(22,40,90,0.85)", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#A8C4F0", cursor: "pointer", outline: "none" }}>
                                <option value="latest">Latest First</option>
                                <option value="rating">Highest Rated</option>
                                <option value="title">A to Z</option>
                            </select>
                        </div>
                    </div>

                    {/* GRID */}
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "5rem 0" }}>
                            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", color: "#60A5FA", marginBottom: "1rem" }}>No movies found</p>
                            <button onClick={() => { setActiveMood("All"); setActiveRating("All"); setSearch(""); }}
                                style={{ background: "#2563EB", color: "#fff", border: "none", padding: "12px 26px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer" }}>Reset</button>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "18px", alignItems: "start" }}>
                            {filtered.map(m => <MovieCard key={m._id} movie={m} onNavigate={navigate} />)}
                        </div>
                    )}
                    <div style={{ height: "4rem" }} />
                </div>
            </div>
        </>
    );
}