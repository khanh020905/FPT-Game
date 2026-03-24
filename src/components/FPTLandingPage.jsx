import { useState, useEffect } from "react";

/**
 * FPTLandingPage — White-theme website-style landing page
 * introducing the FPT University first-year experience.
 */
export default function FPTLandingPage({ onClose }) {
  const [exiting, setExiting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleStart = () => {
    setExiting(true);
    setTimeout(() => onClose(), 600);
  };

  useEffect(() => {
    const el = document.getElementById("fpt-landing-scroll");
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="fpt-landing-scroll"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflowY: "auto",
        overflowX: "hidden",
        background: "#ffffff",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s ease",
        scrollBehavior: "smooth",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        #fpt-landing-scroll * { box-sizing: border-box; }
        #fpt-landing-scroll { font-family: 'Inter', system-ui, sans-serif; color: #1e293b; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
        @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-12px) } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
        .fpt-section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }
        .fpt-fade { animation: fadeUp 0.8s ease both; }
        .fpt-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .fpt-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .fpt-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
        .fpt-btn { display:inline-block; padding:14px 40px; border-radius:10px; border:none; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.3s ease; text-decoration:none; }
        .fpt-btn:hover { transform:scale(1.05); }
        .fpt-tag { display:inline-block; padding:5px 12px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; }
        .fpt-feature-card { background:#fff; border-radius:12px; padding:32px 24px; text-align:center; box-shadow:0 8px 40px rgba(0,0,0,.1); transition:transform .3s ease, box-shadow .3s ease; cursor:pointer; }
        .fpt-feature-card:hover { transform:translateY(-8px); box-shadow:0 16px 48px rgba(0,0,0,.15); }
        .fpt-feature-card .icon { width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; margin:0 auto 16px; }
        .fpt-stat-card { text-align:center; padding:32px 20px; border:1px solid #e2e8f0; border-radius:16px; transition:all .3s ease; background:#fff; }
        .fpt-stat-card:hover { border-color:#2563eb; box-shadow:0 8px 24px rgba(37,99,235,.1); }
        @media (max-width: 768px) {
          .fpt-section { padding: 48px 16px; }
          .fpt-hero-features { flex-direction: column !important; }
        }
      `}</style>

      {/* ════════════════ TOP BAR ════════════════ */}
      <div
        style={{
          background: "#0f172a",
          color: "#94a3b8",
          fontSize: 12,
          padding: "8px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <span>📧 info@fpt.edu.vn</span>
          <span>📍 FPT University, Đà Nẵng</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button
            onClick={handleStart}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "6px 18px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Bắt Đầu Game
          </button>
        </div>
      </div>

      {/* ════════════════ NAVBAR ════════════════ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: 72,
          background: scrollY > 50 ? "rgba(255,255,255,0.98)" : "#fff",
          boxShadow: scrollY > 50 ? "0 2px 20px rgba(0,0,0,.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🎓</span>
          <span
            style={{
              color: "#0f172a",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            FPT<span style={{ color: "#2563eb" }}> University</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["LUK Global", "Lịch Trình", "Nhạc Cụ"].map((t) => (
            <a
              key={t}
              href={`#${t.toLowerCase().replace(/\s/g, "")}`}
              style={{
                color: "#475569",
                fontSize: 14,
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = "#475569")}
            >
              {t}
            </a>
          ))}
          <button
            onClick={handleStart}
            className="fpt-btn"
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "10px 28px",
              fontSize: 13,
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(37,99,235,.3)",
            }}
          >
            🚀 Khám Phá →
          </button>
        </div>
      </nav>

      {/* ════════════════ HERO — FULL BLEED ════════════════ */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          minHeight: 520,
          overflow: "hidden",
        }}
      >
        <img
          src="/luk-student-learn.jpg"
          alt="FPT University"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.85) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            maxWidth: 1200,
          }}
        >
          <div className="fpt-fade" style={{ animationDelay: "0.2s" }}>
            <p
              style={{
                color: "rgba(255,255,255,.7)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 2,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              FPT UNIVERSITY — ĐÀ NẴNG
            </p>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(36px,5vw,60px)",
                fontWeight: 900,
                lineHeight: 1.15,
                margin: "0 0 20px",
                maxWidth: 650,
              }}
            >
              Trải Nghiệm Ngày Đầu Tiên{" "}
              <span style={{ color: "#60a5fa" }}>Tại FPT University</span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,.75)",
                fontSize: 17,
                lineHeight: 1.8,
                margin: "0 0 32px",
                maxWidth: 520,
              }}
            >
              Khám phá hệ thống học tập LUK Global, rèn luyện Vovinam, chinh
              phục môn DSA, và hòa mình vào âm nhạc dân tộc Việt Nam.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                onClick={handleStart}
                className="fpt-btn"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(37,99,235,0.4)",
                  padding: "16px 40px",
                  fontSize: 16,
                }}
              >
                🚀 Bắt Đầu Trải Nghiệm
              </button>
              <a
                href="#lukglobal"
                className="fpt-btn"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,.4)",
                  padding: "16px 40px",
                  fontSize: 16,
                }}
              >
                Tìm Hiểu Thêm ↓
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 24,
            transform: "translateY(-50%)",
            zIndex: 3,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,.15)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ←
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 24,
            transform: "translateY(-50%)",
            zIndex: 3,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,.15)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          →
        </div>
      </section>

      {/* ════════════════ FLOATING FEATURE CARDS ════════════════ */}
      <div
        style={{
          maxWidth: 1100,
          margin: "-60px auto 0",
          padding: "0 24px",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div className="fpt-hero-features" style={{ display: "flex", gap: 24 }}>
          {[
            {
              icon: "🎓",
              color: "#dbeafe",
              title: "LUK Global",
              desc: "Chương trình tiếng Anh nền tảng bắt buộc cho tất cả sinh viên năm nhất FPT.",
            },
            {
              icon: "🎵",
              color: "#fce7f3",
              title: "Nhạc Cụ Dân Tộc",
              desc: "FPT tiên phong đưa nhạc cụ dân tộc vào giảng dạy chính thức từ 2014.",
            },
            {
              icon: "🏆",
              color: "#dcfce7",
              title: "Hoạt Động Năng Động",
              desc: "Vovinam, Workshop, Debate, Project — trải nghiệm toàn diện cho sinh viên.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="fpt-feature-card fpt-fade"
              style={{ flex: 1, animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="icon" style={{ background: f.color }}>
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "#0f172a",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: "0 0 12px",
                }}
              >
                {f.desc}
              </p>
              <a
                href="#lukglobal"
                style={{
                  color: "#2563eb",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Xem thêm →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════ STATS BAR ════════════════ */}
      <div style={{ maxWidth: 1100, margin: "60px auto 0", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 20,
          }}
        >
          {[
            { icon: "🌐", n: "3+", l: "Cơ Sở Toàn Quốc" },
            { icon: "📚", n: "99+", l: "Khóa Học Đa Dạng" },
            { icon: "👨‍🏫", n: "10+", l: "Giáo Viên Bản Ngữ" },
            { icon: "👥", n: "30,000+", l: "Sinh Viên Đang Học" },
          ].map((s, i) => (
            <div
              key={i}
              className="fpt-stat-card fpt-fade"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: "#2563eb", fontSize: 32, fontWeight: 800 }}>
                {s.n}
              </div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════ LUK GLOBAL ════════════════ */}
      <section id="lukglobal" style={{ background: "#ffffff" }}>
        <div className="fpt-section">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              className="fpt-tag"
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                marginBottom: 16,
              }}
            >
              🌍 LITTLE UK GLOBAL
            </div>
            <h2
              style={{
                color: "#0f172a",
                fontSize: 34,
                fontWeight: 800,
                margin: "0 0 12px",
              }}
            >
              LUK <span style={{ color: "#dc2626" }}>GLOBAL</span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 15,
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              LUK Global (Little UK) là chương trình tiếng Anh nền tảng dành cho
              sinh viên năm nhất FPT University. Chương trình giúp trang bị kiến
              thức ngôn ngữ và kỹ năng mềm, tạo nền tảng vững chắc để sinh viên
              tự tin học các môn chuyên ngành bằng tiếng Anh.
            </p>
          </div>

          {/* 3 Campuses */}
          <h3
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            📍 3 Cơ Sở Trên Toàn Quốc
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginBottom: 48,
            }}
          >
            {[
              {
                city: "Đà Nẵng",
                emoji: "🏖️",
                desc: "Cơ sở chính — Khu CNC Hòa Lạc",
                color: "#2563eb",
              },
              {
                city: "Hà Nội",
                emoji: "🏛️",
                desc: "Thủ đô — Khu Giáo dục & Đào tạo",
                color: "#059669",
              },
              {
                city: "Sài Gòn",
                emoji: "🌆",
                desc: "TP.HCM — Trung tâm kinh tế phía Nam",
                color: "#d97706",
              },
            ].map((c) => (
              <div
                key={c.city}
                className="fpt-card"
                style={{
                  textAlign: "center",
                  borderTop: `4px solid ${c.color}`,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{c.emoji}</div>
                <div
                  style={{
                    color: c.color,
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {c.city}
                </div>
                <div
                  style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}
                >
                  {c.desc}
                </div>
              </div>
            ))}
          </div>

          {/* 4 Levels */}
          <h3
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            🎯 4 Cấp Độ Tiếng Anh
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              {
                lv: "Level 1",
                name: "Hurricane",
                emoji: "🌀",
                color: "#3b82f6",
                bg: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                desc: "Nền tảng — Giao tiếp cơ bản",
              },
              {
                lv: "Level 2",
                name: "Greenfire",
                emoji: "🔥",
                color: "#16a34a",
                bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                desc: "Phát triển — Đọc hiểu & Viết",
              },
              {
                lv: "Level 3",
                name: "Heatwave",
                emoji: "☀️",
                color: "#ea580c",
                bg: "linear-gradient(135deg, #fff7ed, #fed7aa)",
                desc: "Nâng cao — Thuyết trình & Tranh luận",
              },
              {
                lv: "Level 4",
                name: "Thunderbolt",
                emoji: "⚡",
                color: "#7c3aed",
                bg: "linear-gradient(135deg, #faf5ff, #e9d5ff)",
                desc: "Chuyên sâu — Học thuật & Chuyên ngành",
              },
            ].map((l) => (
              <div
                key={l.name}
                className="fpt-card"
                style={{
                  background: l.bg,
                  borderColor: `${l.color}33`,
                  textAlign: "center",
                  padding: "28px 20px",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{l.emoji}</div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {l.lv}
                </div>
                <div
                  style={{
                    color: l.color,
                    fontSize: 18,
                    fontWeight: 800,
                    margin: "4px 0 8px",
                  }}
                >
                  {l.name}
                </div>
                <div
                  style={{ color: "#475569", fontSize: 12, lineHeight: 1.5 }}
                >
                  {l.desc}
                </div>
              </div>
            ))}
          </div>

          {/* ═══ HURRICANE LEVEL 1 ROADMAP — HOVER TO REVEAL ═══ */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#3b82f6",
                  color: "#fff",
                  padding: "6px 18px",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                🌀 HURRICANE — LEVEL 1 ROADMAP
              </div>
              <h3
                style={{
                  fontSize: "clamp(20px,3vw,28px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 6,
                }}
              >
                Chương Trình <span style={{ color: "#3b82f6" }}>Hurricane</span>{" "}
                Chi Tiết
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 13,
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Di chuột vào ảnh để xem chi tiết từng tuần học
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {[
                {
                  title: "Tuần 1 & 2",
                  img: "/hurricane-week1-2.jpg",
                  color: "#3b82f6",
                  items: [
                    "Sinh viên làm quen với các rule của LUK",
                    "English only — chỉ nói tiếng Anh",
                    "Move 10s, Move Fast 1",
                    "Làm quen với thuyết trình",
                  ],
                },
                {
                  title: "Tuần 3 & 4",
                  img: "/hurricane-week3-4.jpg",
                  color: "#8b5cf6",
                  items: [
                    "Bắt đầu dạy Phonics cho sinh viên",
                    "Chú trọng hơn với Project Daily",
                    "Giờ ra chơi giao lưu với TED Team",
                    "Cùng hát AC",
                    "Làm bài Check 1 ở tuần 4",
                  ],
                },
                {
                  title: "Tuần 5",
                  img: "/hurricane-week5.jpg",
                  color: "#f59e0b",
                  items: [
                    "Đổi team mới",
                    "Các thành viên trong lớp phải làm quen với nhau lại từ đầu",
                    "Xây dựng tinh thần đồng đội mới",
                  ],
                },
                {
                  title: "Tuần 6 & 7",
                  img: "/hurricane-week6-7.jpg",
                  color: "#ef4444",
                  items: [
                    "Được học Movie",
                    'Workshop hát "Do You Hear the People Sing"',
                    "Change Gift — trao đổi quà",
                    "Chuẩn bị cho Christmas Gala tuần 7",
                    "Quay Check 2 cá nhân",
                  ],
                },
              ].map((card, ci) => (
                <div
                  key={ci}
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    height: 420,
                    boxShadow: "0 8px 32px rgba(0,0,0,.12)",
                    cursor: "pointer",
                    transition: "transform .35s ease, box-shadow .35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(0,0,0,.25)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(0)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "1";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,.12)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(100%)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "0";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1)";
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform .6s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      zIndex: 3,
                    }}
                  >
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: 100,
                        background: "rgba(255,255,255,.18)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,.25)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {card.title}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      zIndex: 3,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: card.color,
                      boxShadow: `0 0 12px ${card.color}80`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      right: 20,
                      zIndex: 3,
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 800,
                        textShadow: "0 2px 12px rgba(0,0,0,.5)",
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <div
                    data-panel
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 4,
                      background: "rgba(0,0,0,.55)",
                      backdropFilter: "blur(20px)",
                      padding: "20px",
                      transform: "translateY(100%)",
                      opacity: 0,
                      transition:
                        "transform .4s cubic-bezier(.4,0,.2,1), opacity .35s ease",
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 800,
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: card.color,
                          boxShadow: `0 0 8px ${card.color}`,
                        }}
                      />
                      {card.title}
                    </h4>
                    {card.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          padding: "3px 0",
                          fontSize: 12,
                          color: "rgba(255,255,255,.9)",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: card.color,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          •
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ GREENFIRE LEVEL 2 ROADMAP — HOVER TO REVEAL ═══ */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#16a34a",
                  color: "#fff",
                  padding: "6px 18px",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                🔥 GREENFIRE — LEVEL 2 ROADMAP
              </div>
              <h3
                style={{
                  fontSize: "clamp(20px,3vw,28px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 6,
                }}
              >
                Chương Trình <span style={{ color: "#16a34a" }}>Greenfire</span>{" "}
                Chi Tiết
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 13,
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Di chuột vào ảnh để xem chi tiết từng hoạt động
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {[
                {
                  title: "Những Thứ Sẽ Học",
                  img: "/luk-student-learn.jpg",
                  color: "#ef4444",
                  items: [
                    "Nến phải đủ vùng mới có thể thành công",
                    "Cách hoạt động của bộ não",
                    "Nóng lên toàn cầu",
                    "Không có ai là phế cả",
                    "Học tiếng Anh đúng cách",
                    "Hỏi nhiều hơn mỗi ngày",
                    "Phát âm",
                  ],
                },
                {
                  title: "Viết News",
                  img: "/luk-writing-news.jpg",
                  color: "#3b82f6",
                  items: [
                    "3 news/ngày",
                    "Topic theo chủ đề của tuần",
                    "Viết news dùng format: where, when, who, what, how, why, summary, 3 câu hỏi",
                    "Trình bày theo đúng hướng dẫn",
                    "Không đạt đủ yêu cầu sẽ không được stamp",
                  ],
                },
                {
                  title: "Thuyết Trình",
                  img: "/luk-presentation.jpg",
                  color: "#a855f7",
                  items: [
                    "Thuyết trình theo chủ đề của tuần",
                    "Đi quay video phỏng vấn người nước ngoài",
                    "Intro để mở đầu thuyết trình",
                    "Edit video và làm slide",
                    "Làm minh hoạ phía sau để hỗ trợ diễn đạt",
                  ],
                },
                {
                  title: "Hoạt Động Nhóm",
                  img: "/luk-daily-working.jpg",
                  color: "#eab308",
                  items: [
                    "Học phát âm để quay video ngày và nhận stamp",
                    "Quay video cùng nhóm 1 lần 1 tuần",
                  ],
                },
                {
                  title: "Workshop",
                  img: "/luk-workshop.jpg",
                  color: "#16a34a",
                  items: [
                    "Xem phim",
                    "Làm đồ handmade",
                    "Tập nhảy và hát",
                    "Chơi trò chơi",
                  ],
                },
                {
                  title: "Thuyết Trình News",
                  img: "/luk-present-news.jpg",
                  color: "#f37021",
                  items: [
                    "Đứng lên ghế nhanh",
                    "Nói to rõ chuẩn phát âm",
                    "Chỉ có 60s",
                    "Làm tất cả mọi thứ để mọi người hiểu",
                  ],
                },
              ].map((card, ci) => (
                <div
                  key={ci}
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    height: 420,
                    boxShadow: "0 8px 32px rgba(0,0,0,.12)",
                    cursor: "pointer",
                    transition: "transform .35s ease, box-shadow .35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(0,0,0,.25)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(0)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "1";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,.12)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(100%)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "0";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1)";
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform .6s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      zIndex: 3,
                    }}
                  >
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: 100,
                        background: "rgba(255,255,255,.18)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,.25)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {card.title}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      zIndex: 3,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: card.color,
                      boxShadow: `0 0 12px ${card.color}80`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      right: 20,
                      zIndex: 3,
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 800,
                        textShadow: "0 2px 12px rgba(0,0,0,.5)",
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <div
                    data-panel
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 4,
                      background: "rgba(0,0,0,.55)",
                      backdropFilter: "blur(20px)",

                      padding: "20px",
                      transform: "translateY(100%)",
                      opacity: 0,
                      transition:
                        "transform .4s cubic-bezier(.4,0,.2,1), opacity .35s ease",
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 800,
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: card.color,
                          boxShadow: `0 0 8px ${card.color}`,
                        }}
                      />
                      {card.title}
                    </h4>
                    {card.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          padding: "3px 0",
                          fontSize: 12,
                          color: "rgba(255,255,255,.9)",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: card.color,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          •
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ HEATWAVE LEVEL 3 ROADMAP — HOVER TO REVEAL ═══ */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#ea580c",
                  color: "#fff",
                  padding: "6px 18px",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                ☀️ HEATWAVE — LEVEL 3 ROADMAP
              </div>
              <h3
                style={{
                  fontSize: "clamp(20px,3vw,28px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 6,
                }}
              >
                Chương Trình <span style={{ color: "#ea580c" }}>Heatwave</span>{" "}
                Chi Tiết
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 13,
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Di chuột vào ảnh để xem chi tiết từng hoạt động
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {[
                {
                  title: "Thuyết Trình News (Tuần 1-4)",
                  img: "/heatwave-presentation.jpg",
                  color: "#ea580c",
                  items: [
                    "Cấu trúc: When, Where, Who, What, How, Why",
                    "Mỗi ngày 3 news",
                    "Cách thuyết trình: simple word, có drop, body language, eye contact",
                    "Làm việc theo nhóm",
                    "Cuối tuần presentation theo chủ đề LUK đưa",
                    "Chuẩn bị drop, sắp thuyết trình",
                    "Thuyết trình 5-7 phút — phải có hook",
                    "Hoạt động nhóm: Daily Project",
                  ],
                },
                {
                  title: "Debate (Tuần 5-6)",
                  img: "/heatwave-debate.jpg",
                  color: "#7c3aed",
                  items: [
                    "Một trận đấu chia ra hai phe: Affirmative & Negative",
                    "Mỗi lớp chia ra: 4 Speaker, 4-6 QA, 12 Researcher, Logistic: phần còn lại",
                    "Debate 1: Humans are the earth's enemy number one",
                    "Debate 2: Facebook does more harm than good",
                    "Debate 3: Video games make us smarter",
                    "Debate 4: Dating apps destroy the beauty of human love",
                  ],
                },
                {
                  title: "Chuẩn Bị Khi Debate",
                  img: "/heatwave-preparation.jpg",
                  color: "#0891b2",
                  items: [
                    "Evidence phải thật uy tín, biết cách chứng minh",
                    "Chuẩn bị nhiều câu hỏi để suy ra câu tranh luận",
                    "Mang áo sơ mi + giày",
                    "Đừng nên over quá nhiều — khiến đầu óc mệt mỏi",
                    "Cả lớp phải hiểu nội dung debate",
                    "Chuẩn bị drop: in từ ra giấy (có bự) + hình ảnh minh hoạ",
                    "Solution video: 3 phần (vấn đề, giải pháp thế giới → VN, hiệu quả)",
                    "Luyện debate với lớp trước — phân chia công việc cụ thể",
                  ],
                },
                {
                  title: "Cách Đánh Giá Điểm Số",
                  img: "/heatwave-scoring.jpg",
                  color: "#16a34a",
                  items: [
                    "Presentation: 20-30%",
                    "Participation: 20% — không được nghỉ quá 7 buổi",
                    "Mid-term Test: 20-25%",
                    "Project: 25-30%",
                  ],
                },
              ].map((card, ci) => (
                <div
                  key={ci}
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    height: 420,
                    boxShadow: "0 8px 32px rgba(0,0,0,.12)",
                    cursor: "pointer",
                    transition: "transform .35s ease, box-shadow .35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(0,0,0,.25)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(0)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "1";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,.12)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(100%)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "0";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1)";
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform .6s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      zIndex: 3,
                    }}
                  >
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: 100,
                        background: "rgba(255,255,255,.18)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,.25)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {card.title}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      zIndex: 3,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: card.color,
                      boxShadow: `0 0 12px ${card.color}80`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      right: 20,
                      zIndex: 3,
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 800,
                        textShadow: "0 2px 12px rgba(0,0,0,.5)",
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <div
                    data-panel
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 4,
                      background: "rgba(0,0,0,.55)",
                      backdropFilter: "blur(20px)",
                      padding: "20px",
                      transform: "translateY(100%)",
                      opacity: 0,
                      transition:
                        "transform .4s cubic-bezier(.4,0,.2,1), opacity .35s ease",
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 800,
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: card.color,
                          boxShadow: `0 0 8px ${card.color}`,
                        }}
                      />
                      {card.title}
                    </h4>
                    {card.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          padding: "3px 0",
                          fontSize: 12,
                          color: "rgba(255,255,255,.9)",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: card.color,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          •
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ THUNDERBOLT LEVEL 4 ROADMAP — HOVER TO REVEAL ═══ */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#7c3aed",
                  color: "#fff",
                  padding: "6px 18px",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                ⚡ THUNDERBOLT — LEVEL 4 ROADMAP
              </div>
              <h3
                style={{
                  fontSize: "clamp(20px,3vw,28px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 6,
                }}
              >
                Chương Trình{" "}
                <span style={{ color: "#7c3aed" }}>Thunderbolt</span> Chi Tiết
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 13,
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Di chuột vào ảnh để xem chi tiết từng hoạt động
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {[
                {
                  title: "Thuyết Trình News",
                  img: "/thunderbolt-news.jpg",
                  color: "#7c3aed",
                  items: [
                    "Viết news theo chủ đề debate",
                    "1 ngày 3 news",
                    "Nội dung liên quan trực tiếp đến chủ đề tranh luận",
                  ],
                },
                {
                  title: "Debate — Chủ Đề",
                  img: "/thunderbolt-debate.jpg",
                  color: "#ef4444",
                  items: [
                    "Debate 1: Fast fashion is good for society",
                    "Debate 2: Dating Apps Destroy the Beauty of Human Love",
                    "Debate 3: MOOCs mark an end to the traditional university",
                    "Debate 4: AI is smarter than humans",
                  ],
                },
                {
                  title: "Debate — Giải Quyết Vấn Đề",
                  img: "/thunderbolt-solution.jpg",
                  color: "#ea580c",
                  items: [
                    "Debate 5: Solution for MOOCs and the Future of Learning",
                    "Debate 6: Solution — Fast fashion industry is dangerous for workers",
                    "Debate 7: Solution — Video games & game addiction affect mental health",
                    "Debate 8: Solution — Dating apps destroy the beauty of human love",
                    "Debate 9: Solution — Game industry in Vietnam",
                    "Debate 10: Solution — AI replace entry-level worker",
                    "Debate 11: Growing skill gaps after graduation (đề thi bán kết & trung kết)",
                  ],
                },
                {
                  title: "Cấu Trúc Debate",
                  img: "/thunderbolt-structure.jpg",
                  color: "#0891b2",
                  items: [
                    "Debate bình thường: 4 Speaker, 5-6 QsA",
                    "Nói riêng từng speaker nêu vấn đề → ủng hộ/không đồng tình → ảnh hưởng → phản bác (QSA)",
                    "Debate Solution: 6 Speaker + 2 QsA",
                    "Speaker 1: nói về vấn đề",
                    "Speaker 2-3: giải pháp ở thế giới",
                    "Speaker 4-5: giải pháp ở Việt Nam (dựa vào solution thế giới)",
                    "Speaker 6: Conclusion — tin tưởng vào giải pháp lớp đưa ra",
                    "Nếu được duyệt solution VN → QsA tiếp tục",
                  ],
                },
              ].map((card, ci) => (
                <div
                  key={ci}
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    height: 420,
                    boxShadow: "0 8px 32px rgba(0,0,0,.12)",
                    cursor: "pointer",
                    transition: "transform .35s ease, box-shadow .35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(0,0,0,.25)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(0)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "1";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,.12)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.transform = "translateY(100%)";
                    e.currentTarget.querySelector(
                      "[data-panel]",
                    ).style.opacity = "0";
                    e.currentTarget.querySelector("img").style.transform =
                      "scale(1)";
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform .6s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      zIndex: 3,
                    }}
                  >
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: 100,
                        background: "rgba(255,255,255,.18)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,.25)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {card.title}
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      zIndex: 3,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: card.color,
                      boxShadow: `0 0 12px ${card.color}80`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      right: 20,
                      zIndex: 3,
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: 800,
                        textShadow: "0 2px 12px rgba(0,0,0,.5)",
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <div
                    data-panel
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 4,
                      background: "rgba(0,0,0,.55)",
                      backdropFilter: "blur(20px)",
                      padding: "20px",
                      transform: "translateY(100%)",
                      opacity: 0,
                      transition:
                        "transform .4s cubic-bezier(.4,0,.2,1), opacity .35s ease",
                    }}
                  >
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 800,
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: card.color,
                          boxShadow: `0 0 8px ${card.color}`,
                        }}
                      />
                      {card.title}
                    </h4>
                    {card.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          padding: "3px 0",
                          fontSize: 12,
                          color: "rgba(255,255,255,.9)",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: card.color,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          •
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight */}
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 14,
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 28 }}>🎓</span>
            <div>
              <div style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>
                Tất cả sinh viên năm nhất đều học LUK Global
              </div>
              <div style={{ color: "#78716c", fontSize: 13, marginTop: 2 }}>
                Phát triển kỹ năng Nghe, Nói, Đọc, Viết — sẵn sàng trở thành
                công dân toàn cầu.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ VOVINAM ════════════════ */}
      <section id="vovinam" style={{ background: "#fafafa" }}>
        <div className="fpt-section">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              className="fpt-tag"
              style={{
                background: "#fff2e8",
                color: "#ea580c",
                marginBottom: 16,
              }}
            >
              🥋 VÕ THUẬT BẮT BUỘC
            </div>
            <h2
              style={{
                color: "#0f172a",
                fontSize: 34,
                fontWeight: 800,
                margin: "0 0 12px",
              }}
            >
              VOVINAM — <span style={{ color: "#ea580c" }}>Việt Võ Đạo</span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 15,
                maxWidth: 580,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              FPT University tiên phong đưa Vovinam vào chương trình giáo dục
              chính thức. Năm 2023, Vovinam được công nhận là Di sản văn hóa phi
              vật thể quốc gia.
            </p>
          </div>

          <div className="fpt-grid">
            {[
              {
                icon: "⚡",
                title: "3 Trụ Cột",
                desc: "Võ Lực • Võ Thuật • Võ Đạo — Võ Đạo (đạo đức) luôn được đặt lên hàng đầu.",
                color: "#ea580c",
              },
              {
                icon: "🏅",
                title: "Giảng Viên Đẳng Cấp",
                desc: "Các võ sư từng đạt HCV SEA Games và Giải Vovinam Đông Nam Á.",
                color: "#d97706",
              },
              {
                icon: "🎯",
                title: "Kỹ Năng Thực Chiến",
                desc: "Quyền pháp, đối luyện, tự vệ — rèn sức khỏe, tự tin và tinh thần thép.",
                color: "#dc2626",
              },
              {
                icon: "🏆",
                title: "Giải Đấu Hàng Năm",
                desc: "'FPT Edu Khơi Nguồn Võ Việt' & 'Việt Võ Tranh Hùng'.",
                color: "#f97316",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="fpt-card"
                style={{
                  borderLeft: `4px solid ${c.color}`,
                  background: "#fff",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <h3
                  style={{
                    color: "#0f172a",
                    fontSize: 15,
                    fontWeight: 700,
                    margin: "0 0 8px",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 36,
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: 14,
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 28 }}>🥋</span>
            <div>
              <div style={{ color: "#c2410c", fontWeight: 700, fontSize: 14 }}>
                Tất cả sinh viên FPT đều học Vovinam
              </div>
              <div style={{ color: "#78716c", fontSize: 13, marginTop: 2 }}>
                Sinh viên năm nhất sẽ mặc võ phục xanh truyền thống và bắt đầu
                với các quyền cơ bản.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ NHẠC CỤ DÂN TỘC ════════════════ */}
      <section id="nhạccụ" style={{ background: "#fafafa" }}>
        <div className="fpt-section">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              className="fpt-tag"
              style={{
                background: "#fef9c3",
                color: "#a16207",
                marginBottom: 16,
              }}
            >
              🎵 BẢO TỒN VĂN HÓA VIỆT
            </div>
            <h2
              style={{
                color: "#0f172a",
                fontSize: 34,
                fontWeight: 800,
                margin: "0 0 12px",
              }}
            >
              Nhạc Cụ <span style={{ color: "#b45309" }}>Dân Tộc</span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 15,
                maxWidth: 580,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Từ năm 2014, FPT University tiên phong đưa nhạc cụ truyền thống
              vào giảng dạy chính thức. Đến 2022, chương trình mở rộng đến 5 cơ
              sở với hơn 62% sinh viên tham gia.
            </p>
          </div>

          <div
            className="fpt-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                emoji: "🎶",
                name: "Đàn Tranh",
                desc: "16 dây — Zither truyền thống",
              },
              {
                emoji: "🎸",
                name: "Đàn Nguyệt",
                desc: "2 dây — Đàn kìm nguyệt cầm",
              },
              {
                emoji: "🎻",
                name: "Đàn Nhị",
                desc: "2 dây kéo — Fiddle Việt Nam",
              },
              { emoji: "🪈", name: "Sáo Trúc", desc: "Sáo ngang bằng trúc" },
              { emoji: "🎵", name: "Đàn Bầu", desc: "Độc huyền cầm — 1 dây" },
              {
                emoji: "🎼",
                name: "Đàn Tỳ Bà",
                desc: "4 dây — Lute truyền thống",
              },
            ].map((inst) => (
              <div
                key={inst.name}
                className="fpt-card"
                style={{
                  textAlign: "center",
                  background: "#fff",
                  padding: "24px 14px",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>
                  {inst.emoji}
                </div>
                <div
                  style={{
                    color: "#92400e",
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {inst.name}
                </div>
                <div
                  style={{ color: "#94a3b8", fontSize: 11, lineHeight: 1.5 }}
                >
                  {inst.desc}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              marginTop: 48,
              flexWrap: "wrap",
            }}
          >
            {[
              { n: "2014", l: "Năm bắt đầu" },
              { n: "46", l: "Giảng viên" },
              { n: "5", l: "Loại nhạc cụ" },
              { n: "62%", l: "SV tham gia" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div
                  style={{ color: "#b45309", fontSize: 28, fontWeight: 800 }}
                >
                  {s.n}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 4 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FINAL CTA ════════════════ */}
      <section
        style={{
          background: "linear-gradient(180deg, #fff5ed 0%, #ffffff 100%)",
          borderTop: "1px solid #fed7aa",
        }}
      >
        <div
          className="fpt-section"
          style={{ textAlign: "center", paddingTop: 60, paddingBottom: 80 }}
        >
          <div style={{ fontSize: 52, marginBottom: 16 }}>🎓</div>
          <h2
            style={{
              color: "#0f172a",
              fontSize: 30,
              fontWeight: 800,
              margin: "0 0 12px",
            }}
          >
            Bạn đã sẵn sàng chưa?
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 15,
              maxWidth: 460,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Nhấn nút bên dưới để bắt đầu ngày đầu tiên tại FPT University — nơi
            bạn sẽ học tập, rèn luyện và khám phá!
          </p>
          <button
            onClick={handleStart}
            className="fpt-btn"
            style={{
              background: "#f37021",
              color: "#fff",
              fontSize: 16,
              padding: "16px 52px",
              boxShadow: "0 4px 24px rgba(243,112,33,0.3)",
            }}
          >
            🚀 BẮT ĐẦU TRẢI NGHIỆM
          </button>
          <p style={{ color: "#cbd5e1", fontSize: 12, marginTop: 20 }}>
            © 2026 FPT University — Student Life Simulator
          </p>
        </div>
      </section>
    </div>
  );
}
