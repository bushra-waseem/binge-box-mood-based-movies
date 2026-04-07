import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://binge-box-mood-based-movies-production.up.railway.app";

const MOOD_PILLS = [
    { label: "Romance", c: "#E879F9" },
    { label: "Thriller", c: "#FB923C" },
    { label: "Sci-Fi", c: "#38BDF8" },
    { label: "Happy", c: "#FCD34D" },
    { label: "Chill", c: "#34D399" },
    { label: "Emotional", c: "#818CF8" },
];

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError("");
        if (!email.trim() || !password.trim()) { setError("Please fill in both fields."); return; }
        setLoading(true);
        try {
            const res = await axios.post(`${API}/api/users/login`, { email: email.trim(), password });
            localStorage.setItem("bbUser", JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    const INP = {
        width: "100%", padding: "14px 16px", borderRadius: "8px",
        border: "1.5px solid rgba(96,165,250,0.45)", background: "rgba(30,52,110,0.8)",
        fontFamily: "'Jost',sans-serif", fontSize: "15px", color: "#E8F0FE",
        outline: "none", boxSizing: "border-box", transition: "border-color 0.3s", fontWeight: "300",
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <style>{`
        .login-btn:hover:not(:disabled){background:#1D4ED8 !important;transform:translateY(-2px);box-shadow:0 0 35px rgba(37,99,235,0.7) !important;}
        .login-inp:focus{border-color:rgba(96,165,250,0.65) !important;}
        .login-guest:hover{border-color:rgba(96,165,250,0.4) !important;color:#94A3B8 !important;background:rgba(96,165,250,0.08) !important;}
      `}</style>

            <div style={{ fontFamily: "'Jost',sans-serif", background: "#0B1A3E", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "70px" }}>

                {/* LEFT */}
                <div style={{ background: "linear-gradient(160deg,#091633 0%,#0A1A4A 50%,#1238A0 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "4rem", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", width: "350px", height: "350px", borderRadius: "50%", border: "1px solid rgba(96,165,250,0.1)", top: "-100px", right: "-80px" }} />
                    <div style={{ position: "absolute", width: "250px", height: "250px", borderRadius: "50%", border: "1px solid rgba(96,165,250,0.07)", bottom: "100px", left: "-60px" }} />
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", zIndex: 1 }}>
                        BINGE<span style={{ color: "#60A5FA" }}> & </span>BOX
                    </div>
                    <div style={{ zIndex: 1 }}>
                        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,220,255,0.7)", marginBottom: "1.25rem" }}>Welcome Back</p>
                        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "52px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.1", marginBottom: "1.75rem" }}>
                            Your Mood.<br /><em style={{ color: "#60A5FA", fontStyle: "italic" }}>Your Movie.</em>
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(200,220,255,0.75)", fontWeight: "300", lineHeight: "1.8", maxWidth: "320px" }}>
                            Sign in to access your watchlist, favourites, and personalised mood-based recommendations.
                        </p>
                    </div>
                    <div style={{ zIndex: 1, display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {MOOD_PILLS.map(({ label, c }) => (
                            <span key={label} style={{ background: `${c}18`, color: c, border: `1px solid ${c}45`, fontSize: "12px", fontWeight: "500", padding: "6px 14px", borderRadius: "20px", letterSpacing: "0.05em" }}>{label}</span>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "3rem", background: "rgba(13,32,96,0.6)" }}>
                    <div style={{ width: "100%", maxWidth: "420px" }}>
                        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.16em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>Sign In</p>
                        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "46px", fontWeight: "700", color: "#F8FAFC", marginBottom: "0.6rem", lineHeight: "1.1" }}>
                            Welcome <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Back</em>
                        </h1>
                        <p style={{ fontSize: "15px", color: "#A8C4F0", fontWeight: "300", marginBottom: "2.5rem" }}>
                            Don't have an account?{" "}
                            <span onClick={() => navigate("/register")} style={{ color: "#60A5FA", fontWeight: "500", cursor: "pointer", textDecoration: "underline" }}>Register here</span>
                        </p>

                        {error && (
                            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", color: "#FFB3B3", padding: "12px 15px", borderRadius: "8px", fontSize: "14px", marginBottom: "1.5rem" }}>
                                ⚠ {error}
                            </div>
                        )}

                        <div style={{ marginBottom: "1.4rem" }}>
                            <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8C4F0", marginBottom: "9px" }}>Email Address</p>
                            <input
                                className="login-inp"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                                style={INP}
                            />
                        </div>

                        <div style={{ marginBottom: "2rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "9px" }}>
                                <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8C4F0", margin: 0 }}>Password</p>
                                <span style={{ fontSize: "12px", color: "#60A5FA", cursor: "pointer" }}>Forgot password?</span>
                            </div>
                            <input
                                className="login-inp"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                                style={INP}
                            />
                        </div>

                        {/* ── FIX: onClick calls handleSubmit directly, no form needed ── */}
                        <button
                            className="login-btn"
                            onClick={handleSubmit}
                            disabled={loading}
                            style={{ width: "100%", padding: "15px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", fontFamily: "'Jost',sans-serif", fontSize: "15px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 0 22px rgba(37,99,235,0.4)", transition: "all 0.3s", opacity: loading ? 0.7 : 1 }}>
                            {loading ? "Signing In…" : "Sign In →"}
                        </button>

                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.75rem 0" }}>
                            <div style={{ flex: 1, height: "1px", background: "rgba(96,165,250,0.12)" }} />
                            <span style={{ fontSize: "13px", color: "#5B89C0", fontWeight: "300" }}>or</span>
                            <div style={{ flex: 1, height: "1px", background: "rgba(96,165,250,0.12)" }} />
                        </div>

                        <button className="login-guest" onClick={() => navigate("/")}
                            style={{ width: "100%", padding: "14px", background: "transparent", color: "#7BA3D0", border: "1.5px solid rgba(96,165,250,0.15)", borderRadius: "8px", fontFamily: "'Jost',sans-serif", fontSize: "14px", cursor: "pointer", transition: "all 0.3s" }}>
                            Browse as Guest
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}