import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

const RMOOD_COLORS = {
    Romance: { bg: "rgba(232,121,249,0.12)", color: "#E879F9", border: "rgba(232,121,249,0.3)" },
    Thriller: { bg: "rgba(251,146,60,0.12)", color: "#FB923C", border: "rgba(251,146,60,0.3)" },
    "Sci-Fi": { bg: "rgba(56,189,248,0.12)", color: "#38BDF8", border: "rgba(56,189,248,0.3)" },
    Happy: { bg: "rgba(251,191,36,0.12)", color: "#FCD34D", border: "rgba(251,191,36,0.3)" },
    Chill: { bg: "rgba(52,211,153,0.12)", color: "#34D399", border: "rgba(52,211,153,0.3)" },
    Emotional: { bg: "rgba(99,102,241,0.12)", color: "#818CF8", border: "rgba(99,102,241,0.3)" },
    Motivated: { bg: "rgba(163,230,53,0.12)", color: "#A3E635", border: "rgba(163,230,53,0.3)" },
    Horror: { bg: "rgba(167,139,250,0.12)", color: "#A78BFA", border: "rgba(167,139,250,0.3)" },
};

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const goStep2 = () => {
        setError("");
        if (!name.trim() || !email.trim() || !password || !confirm) { setError("Please fill all fields."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
        if (password !== confirm) { setError("Passwords don't match."); return; }
        setStep(2);
    };

    /* ── FIX: axios is already imported at top, call directly ── */
    const submit = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(`${API}/users/register`, {
                name: name.trim(),
                email: email.trim(),
                password,
                favouriteMoods: selectedMoods,
            });
            localStorage.setItem("bbUser", JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Please try again.");
            setStep(1);
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
        .reg-btn:hover:not(:disabled){background:#1D4ED8 !important;transform:translateY(-2px);box-shadow:0 0 35px rgba(37,99,235,0.7) !important;}
        .reg-inp:focus{border-color:rgba(96,165,250,0.65) !important;}
      `}</style>

            <div style={{ fontFamily: "'Jost',sans-serif", background: "#0B1A3E", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "70px" }}>

                {/* LEFT */}
                <div style={{ background: "linear-gradient(160deg,#091633,#0A1A4A,#1238A0)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "4rem", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", width: "350px", height: "350px", borderRadius: "50%", border: "1px solid rgba(96,165,250,0.09)", top: "-100px", right: "-80px" }} />
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "26px", fontWeight: "700", color: "#F8FAFC", zIndex: 1 }}>
                        BINGE<span style={{ color: "#60A5FA" }}> & </span>BOX
                    </div>
                    <div style={{ zIndex: 1 }}>
                        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,220,255,0.7)", marginBottom: "1.25rem" }}>Join Us</p>
                        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "52px", fontWeight: "700", color: "#F8FAFC", lineHeight: "1.1", marginBottom: "1.75rem" }}>
                            Your Mood.<br /><em style={{ color: "#60A5FA", fontStyle: "italic" }}>Your Night.</em>
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(200,220,255,0.7)", fontWeight: "300", lineHeight: "1.8", maxWidth: "300px" }}>
                            Create your free account and start discovering movies matched to your mood.
                        </p>
                    </div>
                    <div style={{ zIndex: 1 }}>
                        <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(160,195,255,0.5)", marginBottom: "14px" }}>Steps</p>
                        {[{ n: 1, l: "Your Details" }, { n: 2, l: "Pick Moods" }].map(s => (
                            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600", background: step >= s.n ? "#F8FAFC" : "rgba(255,255,255,0.1)", color: step >= s.n ? "#1238A0" : "rgba(255,255,255,0.35)" }}>
                                    {step > s.n ? "✓" : s.n}
                                </div>
                                <span style={{ fontSize: "14px", fontWeight: step === s.n ? "500" : "300", color: step >= s.n ? "#F8FAFC" : "rgba(255,255,255,0.35)" }}>{s.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "3rem", background: "rgba(13,32,96,0.6)" }}>
                    <div style={{ width: "100%", maxWidth: "440px" }}>

                        {step === 1 && (
                            <>
                                <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.16em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>Step 1 of 2</p>
                                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "44px", fontWeight: "700", color: "#F8FAFC", marginBottom: "0.6rem", lineHeight: "1.1" }}>
                                    Create <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Account</em>
                                </h1>
                                <p style={{ fontSize: "15px", color: "#A8C4F0", fontWeight: "300", marginBottom: "2rem" }}>
                                    Already have one?{" "}
                                    <span onClick={() => navigate("/login")} style={{ color: "#60A5FA", fontWeight: "500", cursor: "pointer", textDecoration: "underline" }}>Sign in</span>
                                </p>
                                {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", color: "#FFB3B3", padding: "12px 15px", borderRadius: "8px", fontSize: "14px", marginBottom: "1.25rem" }}>⚠ {error}</div>}

                                {[
                                    { label: "Full Name", val: name, set: setName, type: "text", ph: "Your name" },
                                    { label: "Email Address", val: email, set: setEmail, type: "email", ph: "your@email.com" },
                                    { label: "Password", val: password, set: setPassword, type: "password", ph: "Min 6 characters" },
                                    { label: "Confirm Password", val: confirm, set: setConfirm, type: "password", ph: "Repeat password" },
                                ].map(f => (
                                    <div key={f.label} style={{ marginBottom: "1.2rem" }}>
                                        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8C4F0", marginBottom: "8px" }}>{f.label}</p>
                                        <input className="reg-inp" type={f.type} placeholder={f.ph} value={f.val}
                                            onChange={e => f.set(e.target.value)} onKeyDown={e => e.key === "Enter" && goStep2()} style={INP} />
                                    </div>
                                ))}

                                <button className="reg-btn" onClick={goStep2}
                                    style={{ width: "100%", padding: "15px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", fontFamily: "'Jost',sans-serif", fontSize: "15px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 0 22px rgba(37,99,235,0.4)", marginTop: "0.75rem", transition: "all 0.3s" }}>
                                    Continue →
                                </button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.16em", textTransform: "uppercase", color: "#60A5FA", marginBottom: "10px" }}>Step 2 of 2</p>
                                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "44px", fontWeight: "700", color: "#F8FAFC", marginBottom: "0.6rem", lineHeight: "1.1" }}>
                                    Pick Your <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Moods</em>
                                </h1>
                                <p style={{ fontSize: "15px", color: "#A8C4F0", fontWeight: "300", marginBottom: "2rem" }}>Select moods you love — we'll personalise your picks.</p>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "1.75rem" }}>
                                    {Object.entries(RMOOD_COLORS).map(([mood, mc]) => {
                                        const sel = selectedMoods.includes(mood);
                                        return (
                                            <div key={mood} onClick={() => setSelectedMoods(p => sel ? p.filter(m => m !== mood) : [...p, mood])}
                                                style={{ padding: "14px 16px", borderRadius: "8px", border: `2px solid ${sel ? mc.color : mc.border}`, background: sel ? mc.color : mc.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s" }}>
                                                <span style={{ fontSize: "14px", fontWeight: "500", color: sel ? "#FFFAEF" : mc.color }}>{mood}</span>
                                                <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `1.5px solid ${sel ? "rgba(255,255,255,0.5)" : mc.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: sel ? "#FFFAEF" : mc.color }}>
                                                    {sel ? "✓" : ""}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {selectedMoods.length > 0 && (
                                    <p style={{ fontSize: "13px", color: "#60A5FA", fontWeight: "500", marginBottom: "1.25rem" }}>
                                        {selectedMoods.length} mood{selectedMoods.length > 1 ? "s" : ""} selected ✓
                                    </p>
                                )}
                                {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", color: "#FFB3B3", padding: "10px 14px", borderRadius: "8px", fontSize: "14px", marginBottom: "1rem" }}>⚠ {error}</div>}

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button onClick={() => setStep(1)}
                                        style={{ flex: 1, padding: "14px", background: "transparent", color: "#A8C4F0", border: "1.5px solid rgba(96,165,250,0.2)", borderRadius: "8px", fontFamily: "'Jost',sans-serif", fontSize: "14px", cursor: "pointer", transition: "all 0.3s" }}>
                                        ← Back
                                    </button>
                                    {/* ── FIX: onClick calls submit directly ── */}
                                    <button className="reg-btn" onClick={submit} disabled={loading}
                                        style={{ flex: 2, padding: "14px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", fontFamily: "'Jost',sans-serif", fontSize: "14px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 0 22px rgba(37,99,235,0.4)", transition: "all 0.3s", opacity: loading ? 0.7 : 1 }}>
                                        {loading ? "Creating…" : "Create Account →"}
                                    </button>
                                </div>
                                <button onClick={submit}
                                    style={{ width: "100%", marginTop: "10px", padding: "10px", background: "transparent", color: "#7BA3D0", border: "none", fontFamily: "'Jost',sans-serif", fontSize: "13px", cursor: "pointer" }}>
                                    Skip mood selection
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}