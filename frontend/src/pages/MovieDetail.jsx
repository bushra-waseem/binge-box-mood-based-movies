import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_CONTENT_DB } from "./moviesData";
import axios from "axios";

const API = "http://localhost:5000/api";

const FALLBACK_REVIEWS = [
    { _id: "r1", user: { name: "Sara M." }, rating: 9, comment: "Absolutely breathtaking! One of the best I've ever seen.", createdAt: "2024-01-15" },
    { _id: "r2", user: { name: "Ali Hassan" }, rating: 8, comment: "A masterpiece. The story is gripping and performances outstanding.", createdAt: "2024-02-20" },
];

function CastCard({ person, neon, isMobile }) {
    const [imgErr, setImgErr] = useState(false);
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ background: "rgba(22,40,90,0.75)", border: `1px solid ${hov || isMobile ? neon + "55" : "rgba(96,165,250,0.1)"}`, borderRadius: "12px", padding: isMobile ? "0.8rem" : "1.25rem", textAlign: "center", transition: "all 0.3s", transform: hov ? "translateY(-4px)" : "translateY(0)" }}>
            <div style={{ width: isMobile ? "55px" : "70px", height: isMobile ? "55px" : "70px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 0.9rem", border: `2px solid ${neon}44`, boxShadow: (hov || isMobile) ? `0 0 15px ${neon}44` : "none" }}>
                {person.img && !imgErr ? (
                    <img src={person.img} alt={person.name} onError={() => setImgErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1E4DB7,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "18px" : "24px", color: "#FFFAEF", fontWeight: "700" }}>{person.name?.charAt(0)}</div>
                )}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "13px" : "15px", color: "#F1F5F9", marginBottom: "2px" }}>{person.name}</p>
            <p style={{ fontSize: "9px", color: "#5B89C0", textTransform: "uppercase" }}>Actor</p>
        </div>
    );
}

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState(ALL_CONTENT_DB[id] || null);
    const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
    const [inWatchlist, setInWatchlist] = useState(false);
    const [inFav, setInFav] = useState(false);
    const [activeTab, setActiveTab] = useState("about");
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    // 1. State define karein (Review text ke liye)
    const [newComment, setNewComment] = useState("");

    // 2. Review add karne ka function define karein
    const handleAddReview = () => {
        if (!newComment.trim()) return alert("PLEASE WRITE SOMETHING FIRST!");

        const reviewObj = {
            _id: Date.now().toString(),
            user: { name: "Guest User" },
            rating: 10,
            comment: newComment,
            createdAt: new Date().toISOString().split('T')[0]
        };

        setReviews([reviewObj, ...reviews]);
        setNewComment(""); // Input clear karne ke liye
    };
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        const localContent = ALL_CONTENT_DB[id];
        if (localContent) setContent(localContent);

        // Backend calls (if any)
        axios.get(`${API}/movies/${id}`).then(r => r.data && setContent(prev => ({ ...prev, ...r.data }))).catch(() => { });
        axios.get(`${API}/reviews/${id}`).then(r => r.data?.length > 0 && setReviews(r.data)).catch(() => { });

        return () => window.removeEventListener('resize', handleResize);
    }, [id]);

    if (!content) return null;

    const neon = content.neon || "#60A5FA";
    const watchListStyle = {
        background: inWatchlist ? "transparent" : "rgba(255,255,255,0.05)",
        border: inWatchlist ? "1px solid #FFAD14" : "1px solid rgba(255,255,255,0.2)",
        color: inWatchlist ? "#FFAD14" : "#fff",
        // Jab inWatchlist true hoga, tab glow aayega
        boxShadow: inWatchlist ? "0 0 15px rgba(255, 173, 20, 0.5)" : "none",
        padding: "12px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.3s ease", // Taki glow smooth nazar aaye
        fontSize: "14px",
        fontWeight: "500"
    };
    const isTVShow = content._id?.startsWith("t");


    return (
        <div style={{ fontFamily: "'Jost',sans-serif", background: "#0B1A3E", minHeight: "100vh", color: "#F1F5F9" }}>
            {/* HERO SECTION */}
            <div style={{ position: "relative", height: isMobile ? "450px" : "550px", overflow: "hidden" }}>
                <img src={content.bgUrl || content.posterUrl} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} alt="" />
                <div style={{ position: "absolute", inset: 0, background: isMobile ? "linear-gradient(to top, #0B1A3E 15%, transparent 100%)" : "linear-gradient(to right, #0B1A3E 20%, transparent 80%)" }} />

                <div style={{ position: "absolute", inset: 0, maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "1.2rem" : "2.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <button onClick={() => navigate(-1)} style={{ width: "fit-content", background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 15px", borderRadius: "5px", marginBottom: "1.5rem", cursor: "pointer" }}>← Back</button>

                    {isTVShow && (
                        <div style={{ border: `1px solid ${neon}44`, color: neon, padding: "3px 10px", borderRadius: "4px", fontSize: "11px", width: "fit-content", marginBottom: "10px" }}>TV SERIES · {content.seasons} SEASONS</div>
                    )}

                    {/* GENRE & MOOD BADGES (Wapsi add kar diye) */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1rem" }}>
                        {content.genre?.map(g => (
                            <span key={g} style={{ background: `${neon}22`, color: neon, border: `1px solid ${neon}44`, fontSize: "11px", padding: "3px 10px", borderRadius: "3px" }}>{g}</span>
                        ))}
                        {content.mood?.map(m => (
                            <span key={m} style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "11px", padding: "3px 10px", borderRadius: "3px" }}>{m}</span>
                        ))}
                    </div>

                    <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? "36px" : "55px", margin: "0 0 10px 0" }}>{content.title}</h1>
                    <p style={{ color: "#7BA3D0", fontSize: "13px", marginBottom: "1.5rem" }}>{content.year} • {content.rating} IMDb</p>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", position: "relative", zIndex: 10 }}>

                        <button
                            onClick={() => {
        // Yahan 'trailerUrl' ko badal kar 'trailerLink' kar dein
        if (content.trailerLink) {
            window.open(content.trailerLink, "_blank");
        } else {
            // Backup search logic (agar link phir bhi na mile)
            const query = encodeURIComponent(`${content.title} official trailer`);
            window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        }
    }}
                            style={{
                                background: neon,
                                color: "#0B1A3E",
                                padding: "12px 25px",
                                borderRadius: "6px",
                                border: "none",
                                fontWeight: "700",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: `0 0 20px ${neon}44`,
                                cursor: "pointer" // Pointer lazmi hai
                            }}
                        >
                            ▶ Watch Now
                        </button>
                        <button
                            onClick={() => setInWatchlist(!inWatchlist)}
                            style={{
                                // Conditional Styles (Click par badalne wali cheezein)
                                background: inWatchlist ? "transparent" : "rgba(255,255,255,0.05)",
                                border: inWatchlist ? "1px solid #FFAD14" : "1px solid rgba(255,255,255,0.2)",
                                color: inWatchlist ? "#FFAD14" : "#fff",
                                boxShadow: inWatchlist ? "0 0 20px rgba(255, 173, 20, 0.4)" : "none",

                                // Fixed Styles (Jo hamesha same rahengi)
                                padding: "12px 20px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                fontSize: "14px",
                                fontWeight: "500",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            {inWatchlist ? "✓ In Watchlist" : "+ Watchlist"}
                        </button>

                        {/* HEART OPTION (Wapsi add kar diya) */}
                        <button onClick={() => setInFav(!inFav)} style={{ background: inFav ? "rgba(239,68,68,0.15)" : "transparent", border: `1px solid ${inFav ? "#F87171" : "rgba(255,255,255,0.2)"}`, color: inFav ? "#F87171" : "#fff", padding: "12px 18px", borderRadius: "6px", fontSize: "18px", cursor: "pointer", transition: "0.3s" }}>
                            {inFav ? "♥" : "♡"}
                        </button>
                    </div>
                </div>
            </div>


            
            {/* TABS & MAIN CONTENT (Wohi logic jo pehle tha) */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#0B1A3E" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", display: "flex", gap: "2rem" }}>
                    {["about", "cast", "reviews"].map(t => (
                        <button key={t} onClick={() => setActiveTab(t)} style={{ background: "none", border: "none", borderBottom: activeTab === t ? `2px solid ${neon}` : "2px solid transparent", padding: "1.2rem 0", color: activeTab === t ? neon : "#5B89C0", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px", cursor: "pointer" }}>{t}</button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "2rem 1.2rem" : "3rem 2.5rem" }}>
                {activeTab === "about" && (
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: "3rem" }}>
                        <div>
                            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "28px", marginBottom: "1rem" }}>About the <span style={{ color: neon }}>Film</span></h2>
                            <p style={{ lineHeight: "1.8", color: "#A8C4F0" }}>{content.description}</p>
                        </div>
                        <div style={{ background: "rgba(22,40,90,0.5)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "1rem" }}>Quick Details</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5B89C0" }}>YEAR</span><span>{content.year}</span></div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5B89C0" }}>GENRE</span><span>{content.genre?.join(", ")}</span></div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5B89C0" }}>IMDB</span><span>{content.rating}/10</span></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "cast" && (
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "15px" }}>
                        {content.cast?.map((p, i) => <CastCard key={i} person={typeof p === "string" ? { name: p } : p} neon={neon} isMobile={isMobile} />)}
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 350px", gap: "3rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            {reviews.map(r => (
                                <div key={r._id} style={{ background: "rgba(22,40,90,0.5)", padding: "1.5rem", borderRadius: "12px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                        <span style={{ fontWeight: "600" }}>{r.user?.name}</span>
                                        <span style={{ color: "#FCD34D" }}>★ {r.rating}/10</span>
                                    </div>
                                    <p style={{ color: "#7BA3D0", fontSize: "14px", margin: 0 }}>{r.comment}</p>
                                </div>
                            ))}
                        </div>
                        {/* Review Form */}
                        <div style={{ background: "rgba(22,40,90,0.5)", padding: "1.5rem", borderRadius: "12px", height: "fit-content", border: `1px solid ${neon}33` }}>
                            <h3 style={{ fontSize: "18px", marginBottom: "1rem" }}>Write a Review</h3>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Your thoughts..."
                                style={{ width: "100%", background: "#0B1A3E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "10px", color: "#fff", height: "100px", resize: "none", outline: "none" }}
                            />
                            <button
                                onClick={handleAddReview}
                                style={{ width: "100%", background: neon, border: "none", padding: "12px", borderRadius: "6px", marginTop: "10px", fontWeight: "700", color: "#0B1A3E", cursor: "pointer" }}>
                                Submit Review
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}