import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MOVIES_LIST, MOVIES_DB } from "./moviesData";
import axios from "axios";

const API = "http://localhost:5000/api";

const MOOD_C = {
    Romance: { bg: "rgba(232,121,249,0.12)", color: "#E879F9", border: "rgba(232,121,249,0.3)" },
    Thriller: { bg: "rgba(251,146,60,0.12)", color: "#FB923C", border: "rgba(251,146,60,0.3)" },
    "Sci-Fi": { bg: "rgba(56,189,248,0.12)", color: "#38BDF8", border: "rgba(56,189,248,0.3)" },
    Happy: { bg: "rgba(252,211,77,0.12)", color: "#FCD34D", border: "rgba(252,211,77,0.3)" },
    Chill: { bg: "rgba(52,211,153,0.12)", color: "#34D399", border: "rgba(52,211,153,0.3)" },
    Emotional: { bg: "rgba(129,140,248,0.12)", color: "#818CF8", border: "rgba(129,140,248,0.3)" },
    Motivated: { bg: "rgba(163,230,53,0.12)", color: "#A3E635", border: "rgba(163,230,53,0.3)" },
    Horror: { bg: "rgba(167,139,250,0.12)", color: "#A78BFA", border: "rgba(167,139,250,0.3)" },
};

function MovieCard({ movie, onNavigate, onRemove, showWatchedBtn, onMarkWatched, onFavourite, isFav }) {
    const [hov, setHov] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    const neon = movie.neon || "#60A5FA";

    return (
        <div
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                borderRadius: "14px", overflow: "hidden",
                background: "rgba(22,40,100,0.55)",
                border: `1px solid ${hov ? neon + "60" : "rgba(96,165,250,0.14)"}`,
                transition: "all 0.32s ease",
                transform: hov ? "translateY(-7px)" : "translateY(0)",
                boxShadow: hov ? `0 14px 40px ${neon}22` : "none",
                display: "flex", flexDirection: "column",
            }}>

            {/* Poster */}
            <div style={{ width: "100%", paddingTop: "148%", position: "relative", overflow: "hidden", flexShrink: 0, cursor: "pointer" }}
                onClick={() => onNavigate(`/movies/${movie._id}`)}>
                <div style={{ position: "absolute", inset: 0 }}>
                    {movie.posterUrl && !imgErr ? (
                        <img src={movie.posterUrl} alt={movie.title} onError={() => setImgErr(true)}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.45s ease", transform: hov ? "scale(1.07)" : "scale(1)" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: movie.posterColor || "linear-gradient(135deg,#1E3A8A,#3B82F6)" }} />
                    )}
                    {/* Gradient overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(11,26,62,0.92) 0%,rgba(11,26,62,0.3) 45%,transparent 100%)" }} />
                    {/* Top neon line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right,transparent,${neon},transparent)`, opacity: hov ? 1 : 0.2, transition: "opacity 0.32s" }} />

                    {/* Rating badge */}
                    <span style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.65)", color: "#FCD34D", fontSize: "11px", fontWeight: "700", padding: "4px 9px", borderRadius: "5px", letterSpacing: "0.03em" }}>★ {movie.rating}</span>

                    {/* Remove button */}
                    {onRemove && (
                        <button onClick={e => { e.stopPropagation(); onRemove(movie._id); }}
                            style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(239,68,68,0.75)", color: "#fff", border: "none", borderRadius: "5px", fontSize: "10px", fontWeight: "600", padding: "4px 9px", cursor: "pointer", letterSpacing: "0.04em", opacity: hov ? 1 : 0, transition: "opacity 0.25s", fontFamily: "'Jost',sans-serif" }}>
                            ✕ Remove
                        </button>
                    )}

                    {/* Fav button */}
                    {onFavourite && (
                        <button onClick={e => { e.stopPropagation(); onFavourite(movie); }}
                            style={{ position: "absolute", bottom: "48px", right: "10px", background: isFav ? "rgba(239,68,68,0.8)" : "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", opacity: hov ? 1 : 0, transition: "opacity 0.25s,background 0.25s" }}>
                            {isFav ? "♥" : "♡"}
                        </button>
                    )}

                    {/* Title on image bottom */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.75rem" }}>
                        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "16px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.2", margin: 0 }}>{movie.title}</p>
                        <p style={{ fontSize: "10px", color: "rgba(200,222,255,0.65)", margin: "3px 0 0", fontWeight: "300", letterSpacing: "0.04em" }}>{movie.year} · {movie.genre?.[0]}</p>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div style={{ padding: "10px", background: "rgba(15,30,75,0.9)", display: "flex", gap: "7px" }}>
                <button onClick={() => onNavigate(`/movies/${movie._id}`)}
                    style={{ flex: 1, background: neon, color: "#0B1A3E", border: "none", padding: "9px 0", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.04em" }}>
                    ▶ Watch
                </button>
                {showWatchedBtn && (
                    <button onClick={() => onMarkWatched(movie)}
                        style={{ flex: 1, background: "transparent", color: "#34D399", border: "1px solid rgba(52,211,153,0.4)", padding: "9px 0", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: "500", cursor: "pointer" }}>
                        ✓ Watched
                    </button>
                )}
            </div>
        </div>
    );
}

const TABS = [
    { id: "Watchlist", icon: "🎬", label: "Watchlist" },
    { id: "Watched", icon: "✅", label: "Watched" },
    { id: "Favourites", icon: "❤️", label: "Favourites" },
];

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "Movie Lover", email: "user@email.com", favouriteMoods: ["Romance", "Sci-Fi", "Thriller"] });
    const [activeTab, setActiveTab] = useState("Watchlist");
    const [watchlist, setWatchlist] = useState(MOVIES_LIST.slice(0, 3));
    const [watched, setWatched] = useState(MOVIES_LIST.slice(2, 5));
    const [favourites, setFavourites] = useState(MOVIES_LIST.slice(4, 7));
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const s = localStorage.getItem("bbUser");
        if (s) {
            const u = JSON.parse(s);
            setUser(u);
            setEditName(u.name);
            // Try to load from backend
            if (u._id) {
                setLoading(true);
                axios.get(`${API}/users/${u._id}`)
                    .then(res => {
                        const data = res.data;
                        if (data.watchlist?.length) setWatchlist(data.watchlist.map(m => MOVIES_DB[m._id || m] || m).filter(Boolean));
                        if (data.watched?.length) setWatched(data.watched.map(m => MOVIES_DB[m._id || m] || m).filter(Boolean));
                        if (data.favourites?.length) setFavourites(data.favourites.map(m => MOVIES_DB[m._id || m] || m).filter(Boolean));
                    })
                    .catch(() => { })
                    .finally(() => setLoading(false));
            }
        }
    }, []);

    const saveEdit = () => {
        const updated = { ...user, name: editName };
        setUser(updated);
        localStorage.setItem("bbUser", JSON.stringify(updated));
        setEditMode(false);
    };

    const removeFrom = (list, setList, id) => setList(p => p.filter(m => m._id !== id));
    const markWatched = movie => {
        setWatched(p => p.find(m => m._id === movie._id) ? p : [...p, movie]);
        setWatchlist(p => p.filter(m => m._id !== movie._id));
    };
    const toggleFav = movie => setFavourites(p => p.find(m => m._id === movie._id) ? p.filter(m => m._id !== movie._id) : [...p, movie]);

    const lists = { Watchlist: watchlist, Watched: watched, Favourites: favourites };
    const setters = { Watchlist: setWatchlist, Watched: setWatched, Favourites: setFavourites };
    const cur = lists[activeTab];

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <style>{`
        @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(96,165,250,0.4)} 50%{box-shadow:0 0 0 8px rgba(96,165,250,0)} }
        .profile-page { font-family:'Jost',sans-serif; background:#0B1A3E; min-height:100vh; color:#E8F0FE; padding-top:70px; }
      `}</style>

            <div className="profile-page">

                {/* ── HERO HEADER ── */}
                <div style={{ background: "linear-gradient(160deg,#091633 0%,#112250 50%,#1A3470 100%)", position: "relative", overflow: "hidden", paddingBottom: 0 }}>
                    {/* bg orbs */}
                    <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 70%)", top: "-200px", right: "-100px", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right,transparent,#3B82F6,#818CF8,transparent)" }} />

                    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem 0" }}>

                        {/* Top row — avatar + name + logout */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
                                {/* Avatar with pulse ring */}
                                <div style={{ position: "relative" }}>
                                    <div style={{ width: "84px", height: "84px", borderRadius: "50%", background: "linear-gradient(135deg,#1E3A8A,#3B82F6,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "32px", fontWeight: "700", color: "#fff", border: "3px solid rgba(96,165,250,0.4)", animation: "pulseRing 3s ease-in-out infinite" }}>
                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    {/* Online dot */}
                                    <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "14px", height: "14px", borderRadius: "50%", background: "#34D399", border: "2px solid #091633" }} />
                                </div>

                                <div>
                                    <p style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.18em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "6px" }}>✦ My Collection</p>
                                    {editMode ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <input value={editName} onChange={e => setEditName(e.target.value)}
                                                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", background: "rgba(30,55,120,0.7)", border: "1.5px solid rgba(96,165,250,0.45)", borderRadius: "6px", padding: "5px 12px", outline: "none", minWidth: "200px" }} />
                                            <button onClick={saveEdit} style={{ background: "#2563EB", color: "#fff", border: "none", padding: "7px 16px", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Save</button>
                                            <button onClick={() => setEditMode(false)} style={{ background: "transparent", color: "#7BAEE8", border: "1px solid rgba(96,165,250,0.2)", padding: "7px 14px", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "12px", cursor: "pointer" }}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "30px", fontWeight: "700", color: "#F8FAFC", margin: 0, lineHeight: 1 }}>{user.name}</h1>
                                            <button onClick={() => { setEditMode(true); setEditName(user.name); }}
                                                style={{ background: "rgba(96,165,250,0.1)", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.2)", padding: "4px 12px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "11px", fontWeight: "500", cursor: "pointer", letterSpacing: "0.06em" }}>
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                    <p style={{ fontSize: "13px", color: "#7BAEE8", margin: "5px 0 0", fontWeight: "300" }}>{user.email}</p>
                                </div>
                            </div>

                            <button onClick={() => { localStorage.removeItem("bbUser"); navigate("/login"); }}
                                style={{ background: "transparent", color: "#7BAEE8", border: "1px solid rgba(96,165,250,0.15)", padding: "9px 20px", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; e.currentTarget.style.color = "#F87171"; e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(96,165,250,0.15)"; e.currentTarget.style.color = "#7BAEE8"; e.currentTarget.style.background = "transparent"; }}>
                                Sign Out
                            </button>
                        </div>

                        {/* Stat pills row */}
                        <div style={{ display: "flex", gap: "12px", marginBottom: "2rem", flexWrap: "wrap" }}>
                            {TABS.map(t => (
                                <div key={t.id} style={{ background: activeTab === t.id ? "rgba(37,99,235,0.25)" : "rgba(22,40,100,0.5)", border: `1px solid ${activeTab === t.id ? "rgba(96,165,250,0.5)" : "rgba(96,165,250,0.15)"}`, borderRadius: "10px", padding: "0.9rem 1.4rem", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "all 0.25s" }}
                                    onClick={() => setActiveTab(t.id)}>
                                    <span style={{ fontSize: "18px" }}>{t.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "24px", fontWeight: "700", color: activeTab === t.id ? "#60A5FA" : "#93C5FD", lineHeight: 1 }}>{lists[t.id].length}</div>
                                        <div style={{ fontSize: "10px", color: activeTab === t.id ? "#60A5FA" : "#5B89C0", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>{t.label}</div>
                                    </div>
                                </div>
                            ))}

                            {/* Favourite moods */}
                            {user.favouriteMoods?.length > 0 && (
                                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginLeft: "auto", flexWrap: "wrap" }}>
                                    {user.favouriteMoods.map(mood => {
                                        const mc = MOOD_C[mood] || MOOD_C["Chill"];
                                        return <span key={mood} style={{ background: mc.bg, color: mc.color, border: `1px solid ${mc.border}`, fontSize: "11px", fontWeight: "500", padding: "5px 14px", borderRadius: "20px" }}>{mood}</span>;
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Tabs */}
                        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(96,165,250,0.15)" }}>
                            {TABS.map(t => (
                                <button key={t.id} onClick={() => setActiveTab(t.id)}
                                    style={{ background: "transparent", border: "none", borderBottom: activeTab === t.id ? "2.5px solid #60A5FA" : "2.5px solid transparent", padding: "1rem 1.5rem", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: activeTab === t.id ? "600" : "400", color: activeTab === t.id ? "#60A5FA" : "#5B89C0", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontSize: "14px" }}>{t.icon}</span>
                                    {t.label}
                                    <span style={{ background: activeTab === t.id ? "rgba(96,165,250,0.2)" : "rgba(255,255,255,0.05)", color: activeTab === t.id ? "#60A5FA" : "#475569", fontSize: "10px", fontWeight: "600", padding: "2px 8px", borderRadius: "10px" }}>
                                        {lists[t.id].length}
                                    </span>
                                </button>
                            ))}
                            <div style={{ marginLeft: "auto", padding: "0.75rem 0", display: "flex", alignItems: "center" }}>
                                <button onClick={() => navigate("/movies")}
                                    style={{ background: "#2563EB", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", cursor: "pointer", boxShadow: "0 0 15px rgba(37,99,235,0.4)" }}>
                                    + Add More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── CONTENT ── */}
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem" }}>
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "5rem 0", color: "#7BAEE8", fontSize: "14px", fontWeight: "300" }}>Loading your collection…</div>
                    ) : cur.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "6rem 0" }}>
                            <div style={{ fontSize: "60px", marginBottom: "1.5rem", opacity: 0.4 }}>
                                {activeTab === "Watchlist" ? "🎬" : activeTab === "Watched" ? "✅" : "❤️"}
                            </div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "30px", color: "#60A5FA", marginBottom: "1rem" }}>
                                {activeTab === "Watchlist" ? "Your watchlist is empty" : activeTab === "Watched" ? "Nothing watched yet" : "No favourites yet"}
                            </h3>
                            <p style={{ fontSize: "14px", color: "#7BAEE8", fontWeight: "300", marginBottom: "2rem", maxWidth: "380px", margin: "0 auto 2rem" }}>
                                {activeTab === "Watchlist" ? "Save movies you want to watch later." : activeTab === "Watched" ? "Mark movies as watched after you see them." : "Heart the movies you love."}
                            </p>
                            <button onClick={() => navigate("/movies")}
                                style={{ background: "#2563EB", color: "#fff", border: "none", padding: "13px 28px", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: "0 0 20px rgba(37,99,235,0.4)" }}>
                                Browse Movies
                            </button>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <p style={{ fontSize: "13px", color: "#7BAEE8", fontWeight: "300" }}>
                                    <span style={{ color: "#60A5FA", fontWeight: "600" }}>{cur.length}</span> {activeTab === "Watchlist" ? "movie" : activeTab === "Watched" ? "movie" : "favourite"}{cur.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "18px", alignItems: "start" }}>
                                {cur.map(movie => (
                                    <MovieCard
                                        key={movie._id}
                                        movie={movie}
                                        onNavigate={navigate}
                                        onRemove={id => removeFrom(lists[activeTab], setters[activeTab], id)}
                                        showWatchedBtn={activeTab === "Watchlist"}
                                        onMarkWatched={markWatched}
                                        onFavourite={toggleFav}
                                        isFav={favourites.some(m => m._id === movie._id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}