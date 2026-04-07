import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const isActive = (p) => location.pathname === p;

    const linkStyle = (path) => ({
        fontFamily: "'Jost', sans-serif",
        fontSize: "12px",
        fontWeight: "500",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: isActive(path) ? "#60A5FA" : "rgba(255,255,255,0.72)",
        cursor: "pointer",
        padding: "6px 0",
        position: "relative",
        background: "none",
        border: "none",
        transition: "color 0.25s ease",
        whiteSpace: "nowrap",
    });

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <style>{`
                .nlink::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:#60A5FA;transition:width 0.28s ease;}
                .nlink:hover{color:#60A5FA !important;}
                .nlink:hover::after,.nlink.act::after{width:100%;}
                .nbtn{position:relative;overflow:hidden;transition:all 0.3s ease !important;}
                .nbtn::before{content:'';position:absolute;top:50%;left:50%;width:0;height:0;background:rgba(96,165,250,0.2);border-radius:50%;transform:translate(-50%,-50%);transition:width 0.45s ease,height 0.45s ease;}
                .nbtn:hover::before{width:180px;height:180px;}
                .nbtn:hover{border-color:#60A5FA !important;color:#60A5FA !important;transform:translateY(-1px);}

                /* --- MOBILE FIX --- */
                @media (max-width: 900px) {
                    .nav-links-wrapper { display: none !important; } /* Links hide ho jayenge */
                    .nav-main-container { padding: 0 1rem !important; justify-content: space-between !important; }
                    .center-group { padding-right: 0 !important; gap: 0 !important; }
                    .logo-text { font-size: 20px !important; }
                    .auth-btns-wrapper { position: static !important; }
                    .nbtn { padding: 5px 10px !important; font-size: 10px !important; }
                }
            `}</style>

            <nav className="nav-main-container" style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: "80px",
                display: "flex", alignItems: "center", justifyContent: "center", padding: "0 2.5rem",
                background: "transparent", borderBottom: "none", backdropFilter: "none",
                transition: "all 0.4s ease",
            }}>

                {/* CENTER GROUP */}
                <div className="center-group" style={{ display: "flex", alignItems: "center", gap: "2.5rem", paddingRight: "100px" }}>

                    {/* Left Links */}
                    <div className="nav-links-wrapper" style={{ display: "flex", gap: "2rem" }}>
                        {[{ l: "Home", p: "/" }, { l: "Movies", p: "/movies" }, { l: "TV Shows", p: "/tvshows" }].map(({ l, p }) => (
                            <span key={p} onClick={() => navigate(p)} className={`nlink${isActive(p) ? " act" : ""}`} style={linkStyle(p)}>{l}</span>
                        ))}
                    </div>

                    {/* Logo */}
                    <div className="logo-text" onClick={() => navigate("/")} style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "700",
                        color: "#F8FAFC", cursor: "pointer", letterSpacing: "1.5px", whiteSpace: "nowrap"
                    }}>
                        BINGE<span style={{ color: "#60A5FA" }}> & </span>BOX
                    </div>

                    {/* Right Links */}
                    <div className="nav-links-wrapper" style={{ display: "flex", gap: "2rem" }}>
                        {[{ l: "About", p: "/about" }, { l: "My List", p: "/profile" }].map(({ l, p }) => (
                            <span key={p} onClick={() => navigate(p)} className={`nlink${isActive(p) ? " act" : ""}`} style={linkStyle(p)}>{l}</span>
                        ))}
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="auth-btns-wrapper" style={{ position: "absolute", right: "2.5rem", display: "flex", gap: "10px" }}>
                    <button className="nbtn" onClick={() => navigate("/login")}
                        style={{ background: "transparent", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.25)", padding: "7px 18px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>
                        Sign In
                    </button>
                    <button className="nbtn" onClick={() => navigate("/register")}
                        style={{ background: "rgba(37,99,235,0.85)", color: "#fff", border: "none", padding: "7px 18px", borderRadius: "4px", fontFamily: "'Jost',sans-serif", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>
                        Register
                    </button>
                </div>
            </nav>
        </>
    );
                    }
