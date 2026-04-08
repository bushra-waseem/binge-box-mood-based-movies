import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        const handleResize = () => setIsMobile(window.innerWidth <= 850);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isActive = (p) => location.pathname === p;

    const navLinks = [
        { l: "Home", p: "/" }, { l: "Movies", p: "/movies" },
        { l: "TV Shows", p: "/tvshows" }, { l: "About", p: "/about" },
        { l: "My List", p: "/profile" }
    ];

    const linkStyle = (path) => ({
        fontFamily: "'Jost', sans-serif",
        fontSize: "12px",
        fontWeight: "500",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: isActive(path) ? "#60A5FA" : "rgba(255,255,255,0.72)",
        cursor: "pointer",
        padding: isMobile ? "15px 0" : "6px 0",
        position: "relative",
        background: "none",
        border: "none",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
    });

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <style>{`
                .nlink::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:#60A5FA;transition:width 0.28s ease;}
                .nlink:hover{color:#60A5FA !important;}
                .nlink:hover::after,.nlink.act::after{width:100%;}
                
                /* LAPTOP GLOW EFFECT (Buttons) */
                .nbtn {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease !important;
                }
                .nbtn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(96,165,250,0.25);
                    border-radius: 50%;
                    transform: translate(-50%,-50%);
                    transition: width 0.45s ease, height 0.45s ease;
                }
                .nbtn:hover::before {
                    width: 180px;
                    height: 180px;
                }
                .nbtn:hover {
                    border-color: #60A5FA !important;
                    color: #60A5FA !important;
                    box-shadow: 0 0 15px rgba(96,165,250,0.4);
                    transform: translateY(-1px);
                }

                .mobile-overlay {
                    position: absolute; top: 75px; left: 5%; right: 5%;
                    background: rgba(255, 255, 255, 0.03); 
                    backdrop-filter: blur(25px); 
                    -webkit-backdrop-filter: blur(25px);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 15px;
                    display: ${menuOpen ? "flex" : "none"};
                    flex-direction: column; align-items: center; padding: 30px 0;
                    z-index: 999;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
            `}</style>

            <nav style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Hamesha center rakhen taake logo beech mein rahe
                padding: isMobile ? "0 1.5rem" : "0 2.5rem",
                background: "transparent",
            }}>
                {/* 1. MOBILE HAMBURGER (☰) */}
                {isMobile && (
                    <div
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            position: "absolute", // Ye line zaroori hai
                            left: "1.5rem",       // Ye isay kony mein le jayegi
                            cursor: "pointer",
                            color: "white",
                            fontSize: "24px",
                            zIndex: 1001
                        }}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </div>
                )}

                {/* 2. LOGO & LINKS GROUP (Laptop pe Same) */}
                <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", paddingRight: isMobile ? "0" : "100px" }}>
                    {!isMobile && (
                        <div style={{ display: "flex", gap: "2rem" }}>
                            {navLinks.slice(0,3).map(({ l, p }) => (
                                <span key={p} onClick={() => navigate(p)} className="nlink" style={linkStyle(p)}>{l}</span>
                            ))}
                        </div>
                    )}

                    <div onClick={() => {navigate("/"); setMenuOpen(false);}} style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "22px" : "28px", fontWeight: "700",
                        color: "#F8FAFC", cursor: "pointer", letterSpacing: "1.5px"
                    }}>
                        BINGE<span style={{ color: "#60A5FA" }}> & </span>BOX
                    </div>

                    {!isMobile && (
                        <div style={{ display: "flex", gap: "2rem" }}>
                            {navLinks.slice(3).map(({ l, p }) => (
                                <span key={p} onClick={() => navigate(p)} className="nlink" style={linkStyle(p)}>{l}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3. LAPTOP BUTTONS (Absolute Right) */}
                {!isMobile && (
                    <div style={{ position: "absolute", right: "2.5rem", display: "flex", gap: "10px" }}>
                        <button className="nbtn" onClick={() => navigate("/login")}
                            style={{ background: "transparent", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.25)", padding: "7px 18px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                            Sign In
                        </button>
                        <button className="nbtn" onClick={() => navigate("/register")}
                            style={{ background: "rgba(37,99,235,0.85)", color: "#fff", border: "none", padding: "7px 18px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                            Register
                        </button>
                    </div>
                )}

                {/* 4. MOBILE DROPDOWN BOX (Blur & Sign In inside) */}
                <div className="mobile-overlay">
                    {navLinks.map(({ l, p }) => (
                        <span key={p} onClick={() => {navigate(p); setMenuOpen(false);}} className="nlink" style={linkStyle(p)}>{l}</span>
                    ))}
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px", width: "80%" }}>
                        <button className="nbtn" onClick={() => {navigate("/login"); setMenuOpen(false);}} 
                            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "10px", borderRadius: "6px", fontSize: "13px" }}>
                            Sign In
                        </button>
                        <button className="nbtn" onClick={() => {navigate("/register"); setMenuOpen(false);}} 
                            style={{ background: "#2563EB", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontSize: "13px" }}>
                            Register
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}