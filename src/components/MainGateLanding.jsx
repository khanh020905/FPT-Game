import { useState, useEffect, useRef } from "react";
import { BUILDING_DATA } from "../data/buildingData";

export default function MainGateLanding({ onClose }) {
  const [exit, setExit] = useState(false);
  const [sY, setSY] = useState(0);
  const ref = useRef(null);
  const b = BUILDING_DATA["main-gate"];
  const close = () => {
    setExit(true);
    setTimeout(onClose, 400);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => setSY(el.scrollTop);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  const typeColor = (t) =>
    ({
      class: "#2563eb",
      personal: "#64748b",
      meal: "#16a34a",
      activity: "#8b5cf6",
    })[t] || "#f37021";

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflowY: "auto",
        overflowX: "hidden",
        background:
          "linear-gradient(180deg,#f8fafc 0%,#eef2ff 40%,#fff7ed 100%)",
        opacity: exit ? 0 : 1,
        transform: exit ? "scale(.97)" : "scale(1)",
        transition: "all .4s cubic-bezier(.4,0,.2,1)",
        scrollBehavior: "smooth",
        fontFamily: "'Inter',system-ui,sans-serif",
        color: "#1e293b",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@keyframes mgFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes mgFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes mgShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes mgPulse{0%,100%{opacity:.6}50%{opacity:1}}
.mgFade{animation:mgFadeUp .6s ease both}
.mgCard{background:rgba(255,255,255,.85);border:1px solid rgba(0,0,0,.06);border-radius:16px;backdrop-filter:blur(12px);transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.mgCard:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.08);border-color:rgba(243,112,33,.15)}
.mgSec{padding:72px clamp(20px,5vw,48px);max-width:1080px;margin:0 auto}
.mgHeroGrid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.mgStatsGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.mgFeatGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.mgNavText{font-size:14px;font-weight:800;color:#f37021;letter-spacing:.3px}
.mgNavSub{font-size:11px;color:#94a3b8;margin-left:8px;font-weight:500}
@media(max-width:768px){
  .mgHeroGrid{grid-template-columns:1fr!important;gap:28px!important}
  .mgStatsGrid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important}
  .mgFeatGrid{grid-template-columns:1fr!important;gap:12px!important}
  .mgNavText{font-size:12px!important}
  .mgNavSub{display:block!important;margin-left:0!important;font-size:10px!important}
  .mgSec{padding:40px 16px!important}
}
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px,4vw,40px)",
          height: 60,
          background: sY > 40 ? "rgba(255,255,255,.92)" : "transparent",
          backdropFilter: sY > 40 ? "blur(20px) saturate(1.5)" : "none",
          borderBottom: sY > 40 ? "1px solid rgba(0,0,0,.06)" : "none",
          transition: "all .3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg,#f37021,#ff8c42)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              boxShadow: "0 2px 12px rgba(243,112,33,.25)",
              color: "#fff",
            }}
          >
            🏫
          </div>
          <div>
            <span className="mgNavText">FPT UNIVERSITY</span>
            <span className="mgNavSub">Đà Nẵng Campus</span>
          </div>
        </div>
        <button
          onClick={close}
          style={{
            background: "rgba(243,112,33,.08)",
            border: "1px solid rgba(243,112,33,.2)",
            color: "#f37021",
            borderRadius: 10,
            padding: "8px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f37021";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(243,112,33,.08)";
            e.currentTarget.style.color = "#f37021";
          }}
        >
          ← Quay lại Game
        </button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "60px clamp(24px,6vw,80px) 40px",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(243,112,33,.08),transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(37,99,235,.06),transparent 70%)",
          }}
        />

        <div
          className="mgHeroGrid"
          style={{ maxWidth: 1080, margin: "0 auto" }}
        >
          {/* Left — Text */}
          <div className="mgFade">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 16px",
                borderRadius: 100,
                background: "rgba(243,112,33,.08)",
                border: "1px solid rgba(243,112,33,.15)",
                fontSize: 12,
                fontWeight: 700,
                color: "#f37021",
                letterSpacing: 0.8,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              🎓 Chào mừng đến FPT University
            </div>
            <h1
              style={{
                fontSize: "clamp(32px,5vw,52px)",
                fontWeight: 900,
                color: "#0f172a",
                lineHeight: 1.1,
                marginBottom: 16,
                letterSpacing: "-.02em",
              }}
            >
              Cổng Chính
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#f37021,#ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                FPT University
              </span>
            </h1>
            <p
              style={{
                color: "#64748b",
                fontSize: 16,
                lineHeight: 1.8,
                marginBottom: 28,
                maxWidth: 480,
              }}
            >
              {b.description}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="#schedule"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#f37021,#e85d10)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(243,112,33,.3)",
                  transition: "all .25s",
                }}
              >
                📅 Xem Lịch Trình
              </a>
              <a
                href="#features"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 12,
                  color: "#f37021",
                  border: "1.5px solid rgba(243,112,33,.2)",
                  background: "rgba(243,112,33,.04)",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all .25s",
                }}
              >
                🏫 Khám Phá Campus
              </a>
            </div>
          </div>
          {/* Right — Hero Image */}
          <div className="mgFade" style={{ animationDelay: ".2s" }}>
            <div
              style={{
                position: "relative",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,.1),0 0 0 1px rgba(0,0,0,.04)",
                aspectRatio: "4/3",
              }}
            >
              <img
                src="/fpt-campus-gate.png"
                alt="FPT University"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg,transparent 50%,rgba(0,0,0,.4))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  right: 16,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 12,
                    padding: "12px 16px",
                    border: "1px solid rgba(255,255,255,.2)",
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    📍 FPT University — Khu Công nghệ cao Đà Nẵng
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,.7)",
                      fontSize: 11,
                      margin: "4px 0 0",
                    }}
                  >
                    Kiến trúc đạt giải WA Award — Top trường đẹp nhất Việt Nam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      {b.welcomeHighlights && (
        <section style={{ padding: "0 clamp(20px,5vw,48px) 60px" }}>
          <div
            className="mgStatsGrid"
            style={{ maxWidth: 1080, margin: "0 auto" }}
          >
            {b.welcomeHighlights.map((h, i) => (
              <div
                key={i}
                className="mgCard mgFade"
                style={{
                  padding: "28px 20px",
                  textAlign: "center",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    margin: "0 auto 12px",
                    background:
                      "linear-gradient(135deg,rgba(243,112,33,.1),rgba(243,112,33,.04))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {h.icon}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#f37021",
                    marginBottom: 2,
                  }}
                >
                  {h.stat}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: 4,
                  }}
                >
                  {h.label}
                </div>
                <div
                  style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.4 }}
                >
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ SCHEDULE ═══ */}
      <section
        id="schedule"
        style={{
          background: "rgba(255,255,255,.5)",
          borderTop: "1px solid rgba(0,0,0,.04)",
          borderBottom: "1px solid rgba(0,0,0,.04)",
        }}
      >
        <div className="mgSec">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 16px",
                borderRadius: 100,
                background: "rgba(37,99,235,.06)",
                border: "1px solid rgba(37,99,235,.12)",
                fontSize: 11,
                fontWeight: 700,
                color: "#2563eb",
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              📅 Một ngày tại cổng trường
            </div>
            <h2
              style={{
                fontSize: "clamp(24px,4vw,36px)",
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Lịch Trình Tại{" "}
              <span style={{ color: "#f37021" }}>Cổng Chính</span>
            </h2>
            <div
              style={{
                width: 48,
                height: 3,
                borderRadius: 2,
                margin: "0 auto 12px",
                background:
                  "linear-gradient(90deg,transparent,#f37021,transparent)",
              }}
            />
            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Theo chân sinh viên FPT trải nghiệm một ngày tại campus Đà Nẵng
            </p>
          </div>

          <div
            style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}
          >
            <div
              style={{
                position: "absolute",
                left: 27,
                top: 10,
                bottom: 10,
                width: 2,
                background:
                  "linear-gradient(to bottom,rgba(243,112,33,.2),rgba(243,112,33,.06),transparent)",
                borderRadius: 1,
              }}
            />
            {b.dailySchedule.map((s, i) => {
              const c = typeColor(s.type);
              return (
                <div
                  key={i}
                  className="mgFade"
                  style={{
                    display: "flex",
                    gap: 16,
                    marginBottom: 12,
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      flexShrink: 0,
                      zIndex: 1,
                      background: "#fff",
                      border: `2px solid ${c}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                    }}
                  >
                    {s.emoji}
                  </div>
                  <div
                    className="mgCard"
                    style={{
                      flex: 1,
                      padding: "14px 20px",
                      borderLeft: `3px solid ${c}50`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: c,
                        letterSpacing: 0.5,
                        marginBottom: 3,
                      }}
                    >
                      {s.time}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1e293b",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.activity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features">
        <div className="mgSec">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Tiện Ích <span style={{ color: "#f37021" }}>Cổng Chính</span>
            </h2>
            <div
              style={{
                width: 48,
                height: 3,
                borderRadius: 2,
                margin: "0 auto",
                background:
                  "linear-gradient(90deg,transparent,#f37021,transparent)",
              }}
            />
          </div>
          <div className="mgFeatGrid">
            {b.features.map((f, i) => (
              <div
                key={f.title}
                className="mgCard mgFade"
                style={{
                  textAlign: "center",
                  padding: "32px 20px",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    margin: "0 auto 16px",
                    background:
                      "linear-gradient(135deg,rgba(243,112,33,.1),rgba(255,140,66,.06))",
                    border: "1px solid rgba(243,112,33,.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 6,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FUN FACTS ═══ */}
      <section
        style={{
          background: "rgba(255,247,237,.6)",
          borderTop: "1px solid rgba(243,112,33,.06)",
        }}
      >
        <div className="mgSec" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 28,
              textAlign: "center",
            }}
          >
            💡 Bạn Có Biết?
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            {b.funFacts.map((f, i) => (
              <div
                key={i}
                className="mgCard mgFade"
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  borderLeft: "3px solid rgba(243,112,33,.4)",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "linear-gradient(135deg,#f37021,#ff8c42)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  #{i + 1}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section
        style={{
          borderTop: "1px solid rgba(0,0,0,.04)",
          background:
            "linear-gradient(180deg,transparent,rgba(243,112,33,.03))",
        }}
      >
        <div
          className="mgSec"
          style={{ textAlign: "center", paddingTop: 64, paddingBottom: 72 }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              margin: "0 auto 20px",
              background: "linear-gradient(135deg,#f37021,#ff8c42)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              boxShadow: "0 8px 32px rgba(243,112,33,.25)",
              animation: "mgFloat 3s ease-in-out infinite",
              color: "#fff",
            }}
          >
            🎮
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#0f172a",
              marginBottom: 10,
            }}
          >
            Sẵn sàng khám phá?
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 14,
              maxWidth: 400,
              margin: "0 auto 28px",
              lineHeight: 1.7,
            }}
          >
            Quay lại game để tiếp tục hành trình sinh viên FPT University!
          </p>
          <button
            onClick={close}
            style={{
              padding: "16px 48px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg,#f37021,#e85d10)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(243,112,33,.3)",
              transition: "all .25s",
            }}
          >
            🎮 Quay Lại Game
          </button>
          <p style={{ color: "#cbd5e1", fontSize: 11, marginTop: 28 }}>
            © 2026 FPT University Đà Nẵng — Student Life Simulator
          </p>
        </div>
      </section>
    </div>
  );
}
