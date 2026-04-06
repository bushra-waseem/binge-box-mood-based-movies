import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_CONTENT_DB } from "./moviesData";
import axios from "axios";

const API = "http://localhost:5000/api";

const FALLBACK_REVIEWS = [
    { _id: "r1", user: { name: "Sara M." }, rating: 9, comment: "Absolutely breathtaking! One of the best I've ever seen.", createdAt: "2024-01-15" },
    { _id: "r2", user: { name: "Ali Hassan" }, rating: 8, comment: "A masterpiece. The story is gripping and performances outstanding.", createdAt: "2024-02-20" },
];

function CastCard({ person, neon }) {
    const [imgErr, setImgErr] = useState(false);
    const [hov, setHov] = useState(false);
    return (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ background: "rgba(22,40,90,0.75)", border: `1px solid ${hov ? neon + "55" : "rgba(96,165,250,0.1)"}`, borderRadius: "12px", padding: "1.25rem", textAlign: "center", transition: "all 0.3s", transform: hov ? "translateY(-4px)" : "translateY(0)" }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 0.9rem", border: `2px solid ${neon}44`, boxShadow: hov ? `0 0 18px ${neon}55` : "none", transition: "box-shadow 0.3s" }}>
                {person.img && !imgErr ? (
                    <img src={person.img} alt={person.name} onError={() => setImgErr(true)}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1E4DB7,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "24px", fontWeight: "700", color: "#FFFAEF" }}>
                        {person.name?.charAt(0)}
                    </div>
                )}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", fontWeight: "700", color: "#F1F5F9", marginBottom: "2px", lineHeight: "1.2" }}>{person.name}</p>
            <p style={{ fontSize: "10px", color: "#5B89C0", letterSpacing: "0.06em", textTransform: "uppercase" }}>Actor</p>
        </div>
    );
}

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // First load from local DB immediately — guaranteed correct
    const [content, setContent] = useState(ALL_CONTENT_DB[id] || null);
    const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
    const [inWatchlist, setInWatchlist] = useState(false);
    const [inFav, setInFav] = useState(false);
    const [activeTab, setActiveTab] = useState("about");
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [imgErr, setImgErr] = useState(false);

    useEffect(() => {
        setImgErr(false);
        // Always use local DB first — it has all the rich data
        const localContent = ALL_CONTENT_DB[id];
        if (localContent) setContent(localContent);

        // Try backend for extra data
        axios.get(`${API}/movies/${id}`).then(r => {
            if (r.data && r.data.title) setContent(prev => ({ ...prev, ...r.data }));
        }).catch(() => { });

        axios.get(`${API}/reviews/${id}`).then(r => {
            if (r.data && r.data.length > 0) setReviews(r.data);
        }).catch(() => { });
    }, [id]);

    if (!content) {
        return (
            <div style={{ background: "#0B1A3E", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "70px", fontFamily: "'Jost',sans-serif" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", color: "#3B6EA8", marginBottom: "1rem" }}>Content not found</p>
                <button onClick={() => navigate(-1)} style={{ background: "#2563EB", color: "#fff", border: "none", padding: "12px 26px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer" }}>← Go Back</button>
            </div>
        );
    }

    const neon = content.neon || "#60A5FA";
    const isTVShow = content._id?.startsWith("t");
    const avgRating = reviews.length > 0 ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : content.rating;

    const submitReview = () => {
        if (!newReview.rating || !newReview.comment) return;
        const u = JSON.parse(localStorage.getItem("bbUser") || "{}");
        setReviews(p => [{ _id: `r${Date.now()}`, user: { name: u.name || "Anonymous" }, rating: newReview.rating, comment: newReview.comment, createdAt: new Date().toISOString().split("T")[0] }, ...p]);
        axios.post(`${API}/reviews`, { movie: id, user: u._id, ...newReview }).catch(() => { });
        setNewReview({ rating: 0, comment: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <div style={{ fontFamily: "'Jost',sans-serif", background: "#0B1A3E", minHeight: "100vh", color: "#F1F5F9", paddingTop: "0" }}>

                {/* HERO */}
                <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                    {(content.bgUrl || content.posterUrl) && !imgErr ? (
                        <img src={content.bgUrl || content.posterUrl} alt={content.title} onError={() => setImgErr(true)}
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block" }} />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: content.posterColor || "linear-gradient(135deg,#0B1A3E,#0F2460)" }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(11,26,62,0.85) 0%, rgba(11,26,62,0.3) 30%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "220px", background: "linear-gradient(to top,#0B1A3E,transparent)" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right,transparent,${neon},transparent)` }} />

                    <div style={{ position: "absolute", inset: 0, maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem", display: "flex", alignItems: "flex-end", paddingBottom: "3rem" }}>
                        <div style={{ width: "100%" }}>
                            <button onClick={() => navigate(-1)}
                                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.14)", padding: "6px 14px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "12px", cursor: "pointer", marginBottom: "1.5rem", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                ← Back
                            </button>

                            {/* Type badge */}
                            {isTVShow && (
                                <div style={{ marginBottom: "0.75rem" }}>
                                    <span style={{ background: `${neon}22`, color: neon, border: `1px solid ${neon}44`, fontSize: "11px", padding: "3px 12px", borderRadius: "3px", letterSpacing: "0.08em" }}>TV SERIES · {content.seasons} SEASONS</span>
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "0.9rem" }}>
                                {content.genre?.map(g => <span key={g} style={{ background: `${neon}20`, color: neon, border: `1px solid ${neon}44`, fontSize: "11px", padding: "3px 10px", borderRadius: "3px", letterSpacing: "0.05em" }}>{g}</span>)}
                                {content.mood?.map(m => <span key={m} style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "11px", padding: "3px 10px", borderRadius: "3px" }}>{m}</span>)}
                            </div>

                            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "50px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.05", marginBottom: "0.5rem" }}>{content.title}</h1>
                            <p style={{ fontSize: "12px", color: "#7BA3D0", marginBottom: "1.5rem", letterSpacing: "0.06em" }}>{content.year}{content.status ? ` · ${content.status}` : ""}</p>

                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ background: "#F59E0B", color: "#1C0A00", fontSize: "11px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px" }}>IMDb</span>
                                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: "700", color: "#F8FAFC" }}>{content.rating}</span>
                                    <span style={{ fontSize: "12px", color: "#7BA3D0" }}>/10</span>
                                </div>
                                <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)" }} />
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ color: "#FCD34D" }}>★</span>
                                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "20px", fontWeight: "700", color: "#F8FAFC" }}>{avgRating}</span>
                                    <span style={{ fontSize: "11px", color: "#7BA3D0" }}>Users ({reviews.length})</span>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <a href={content.trailerLink || "#"} target="_blank" rel="noreferrer"
                                    style={{ background: neon, color: "#0B1A3E", padding: "11px 26px", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: "0.07em", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "7px", boxShadow: `0 0 22px ${neon}55` }}>
                                    ▶ Watch Trailer
                                </a>
                                <button onClick={() => setInWatchlist(p => !p)}
                                    style={{ background: inWatchlist ? `${neon}18` : "transparent", color: inWatchlist ? neon : "rgba(255,255,255,0.65)", border: `1px solid ${inWatchlist ? neon : "rgba(255,255,255,0.22)"}`, padding: "11px 20px", borderRadius: "5px", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.3s" }}>
                                    {inWatchlist ? "✓ In Watchlist" : "+ Watchlist"}
                                </button>
                                <button onClick={() => setInFav(p => !p)}
                                    style={{ background: inFav ? "rgba(239,68,68,0.14)" : "transparent", color: inFav ? "#F87171" : "rgba(255,255,255,0.45)", border: `1px solid ${inFav ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.18)"}`, padding: "11px 16px", borderRadius: "5px", fontSize: "16px", cursor: "pointer", transition: "all 0.3s" }}>
                                    {inFav ? "♥" : "♡"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABS */}
                <div style={{ borderBottom: "1px solid rgba(96,165,250,0.1)", background: "rgba(17,34,80,0.6)" }}>
                    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem", display: "flex", gap: "2rem" }}>
                        {["about", "cast", "reviews"].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                style={{ background: "transparent", border: "none", borderBottom: activeTab === tab ? `2px solid ${neon}` : "2px solid transparent", padding: "1.2rem 0", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: activeTab === tab ? "600" : "400", color: activeTab === tab ? neon : "#7BA3D0", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
                                {tab === "reviews" ? `Reviews (${reviews.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONTENT */}
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem" }}>

                    {activeTab === "about" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: "4rem" }}>
                            <div>
                                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", marginBottom: "1rem" }}>
                                    About the <em style={{ color: neon, fontStyle: "italic" }}>{isTVShow ? "Show" : "Film"}</em>
                                </h2>
                                <p style={{ fontSize: "15px", color: "#A8C4F0", lineHeight: "1.85", fontWeight: "300" }}>{content.description}</p>
                            </div>
                            <div style={{ background: "rgba(22,40,90,0.75)", border: `1px solid ${neon}20`, borderRadius: "12px", padding: "1.5rem" }}>
                                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "18px", fontWeight: "700", color: "#F1F5F9", marginBottom: "1.2rem" }}>Details</h3>
                                {[
                                    { l: "Year", v: content.year },
                                    { l: "Genre", v: content.genre?.join(", ") },
                                    { l: "Mood", v: content.mood?.join(", ") },
                                    ...(isTVShow ? [{ l: "Seasons", v: content.seasons }, { l: "Status", v: content.status }] : []),
                                    { l: "IMDb", v: `${content.rating} / 10` },
                                ].map(d => (
                                    <div key={d.l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(96,165,250,0.06)" }}>
                                        <span style={{ fontSize: "11px", color: "#3B6EA8", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase" }}>{d.l}</span>
                                        <span style={{ fontSize: "13px", color: "#7BA3D0", textAlign: "right", maxWidth: "160px" }}>{d.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "cast" && (
                        <div>
                            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", marginBottom: "1.5rem" }}>
                                <em style={{ color: neon, fontStyle: "italic" }}>Cast</em> & Crew
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px" }}>
                                {(content.cast || []).map((person, i) => (
                                    <CastCard key={i} person={typeof person === "string" ? { name: person, img: "" } : person} neon={neon} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 370px", gap: "4rem" }}>
                            <div>
                                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", marginBottom: "1.5rem" }}>
                                    User <em style={{ color: neon, fontStyle: "italic" }}>Reviews</em>
                                </h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    {reviews.map(review => (
                                        <div key={review._id} style={{ background: "rgba(22,40,90,0.75)", border: `1px solid ${neon}18`, borderRadius: "12px", padding: "1.4rem" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: content.posterColor || "linear-gradient(135deg,#1E4DB7,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", fontWeight: "700", color: "#FFFAEF" }}>
                                                        {review.user?.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p style={{ fontSize: "13px", fontWeight: "500", color: "#F1F5F9", margin: 0 }}>{review.user?.name}</p>
                                                        <p style={{ fontSize: "10px", color: "#5B89C0", margin: 0, fontWeight: "300" }}>{review.createdAt?.split("T")[0]}</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                                                    {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: review.rating >= s * 2 ? "#FCD34D" : "#3B6EA8", fontSize: "13px" }}>★</span>)}
                                                    <span style={{ fontSize: "11px", color: "#5B89C0", marginLeft: "4px" }}>{review.rating}/10</span>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: "13px", color: "#7BA3D0", lineHeight: "1.7", fontWeight: "300", margin: 0 }}>{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ background: "rgba(22,40,90,0.75)", border: `1px solid ${neon}20`, borderRadius: "12px", padding: "1.75rem", position: "sticky", top: "90px", alignSelf: "start" }}>
                                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: "700", color: "#F8FAFC", marginBottom: "1.4rem" }}>
                                    Write a <em style={{ color: neon, fontStyle: "italic" }}>Review</em>
                                </h3>
                                {submitted && <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34D399", padding: "10px 14px", borderRadius: "6px", fontSize: "13px", marginBottom: "1rem" }}>✓ Review submitted!</div>}
                                <div style={{ marginBottom: "1.2rem" }}>
                                    <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5B89C0", marginBottom: "9px" }}>Your Rating</p>
                                    <div style={{ display: "flex", gap: "4px" }}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <span key={n} onMouseEnter={() => setHoverRating(n)} onMouseLeave={() => setHoverRating(0)} onClick={() => setNewReview({ ...newReview, rating: n })}
                                                style={{ fontSize: "20px", cursor: "pointer", color: (hoverRating || newReview.rating) >= n ? "#FCD34D" : "#3B6EA8", transition: "color 0.1s", lineHeight: 1 }}>★</span>
                                        ))}
                                        {newReview.rating > 0 && <span style={{ fontSize: "12px", color: neon, fontWeight: "600", marginLeft: "5px" }}>{newReview.rating}/10</span>}
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1.2rem" }}>
                                    <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5B89C0", marginBottom: "8px" }}>Your Review</p>
                                    <textarea value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                        placeholder="Share your thoughts…" rows={4}
                                        style={{ width: "100%", padding: "11px 13px", borderRadius: "6px", border: "1px solid rgba(96,165,250,0.18)", background: "rgba(22,40,90,0.7)", fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#E8F0FE", outline: "none", resize: "none", boxSizing: "border-box", fontWeight: "300", lineHeight: "1.6", transition: "border-color 0.3s" }}
                                        onFocus={e => e.target.style.borderColor = neon} onBlur={e => e.target.style.borderColor = "rgba(96,165,250,0.18)"} />
                                </div>
                                <button onClick={submitReview} disabled={!newReview.rating || !newReview.comment}
                                    style={{ width: "100%", padding: "12px", background: newReview.rating && newReview.comment ? neon : "#3B6EA8", color: newReview.rating && newReview.comment ? "#0B1A3E" : "#5B89C0", border: "none", borderRadius: "6px", fontFamily: "'Jost',sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", cursor: newReview.rating && newReview.comment ? "pointer" : "not-allowed", transition: "all 0.3s" }}>
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}