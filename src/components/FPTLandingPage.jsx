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
        .fpt-section { padding: 80px 24px; max-width: 960px; margin: 0 auto; }
        .fpt-fade { animation: fadeUp 0.8s ease both; }
        .fpt-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .fpt-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .fpt-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
        .fpt-btn { display:inline-block; padding:14px 40px; border-radius:10px; border:none; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.3s ease; text-decoration:none; }
        .fpt-btn:hover { transform:scale(1.05); }
        .fpt-tag { display:inline-block; padding:5px 12px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; }
      `}</style>

      {/* ════════════════ NAVBAR ════════════════ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "0 40px",
          height: 80,
          background: scrollY > 50 ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(12px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid #e2e8f0" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🎓</span>
          <span
            style={{
              color: "#f37021",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            FPT UNIVERSITY
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {["LUK Global", "Vovinam", "Nhạc Cụ"].map((t) => (
            <a
              key={t}
              href={`#${t.toLowerCase().replace(/\s/g, "")}`}
              style={{
                color: "#475569",
                fontSize: 15,
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f37021")}
              onMouseLeave={(e) => (e.target.style.color = "#475569")}
            >
              {t}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleStart}
            className="fpt-btn"
            style={{
              background: "#f37021",
              color: "#fff",
              padding: "10px 24px",
              fontSize: 13,
              borderRadius: 8,
            }}
          >
            Bắt Đầu →
          </button>
        </div>
      </nav>

      {/* ════════════════ HERO ════════════════ */}
      <section
        style={{
          position: "relative",
          height: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "0 24px",
          background: "linear-gradient(180deg, #fff5ed 0%, #ffffff 60%)",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(243,112,33,0.08) 0%, transparent 70%)",
            top: "5%",
            left: "15%",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
            animation: "float 8s ease-in-out infinite 1s",
          }}
        />

        <div
          className="fpt-fade"
          style={{ position: "relative", zIndex: 2, maxWidth: 700 }}
        >
          <div
            className="fpt-tag"
            style={{
              background: "#fff2e8",
              color: "#f37021",
              marginBottom: 24,
            }}
          >
            🎓 Chào Mừng Tân Sinh Viên K2026
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.2,
              margin: "0 0 20px",
            }}
          >
            Trải Nghiệm Ngày Đầu Tiên
            <br />
            <span style={{ color: "#f37021" }}>Tại FPT University</span>
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              lineHeight: 1.8,
              margin: "0 0 28px",
              maxWidth: 540,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Khám phá hệ thống học tập LUK Global, rèn luyện Vovinam, chinh phục
            môn DSA, và hòa mình vào âm nhạc dân tộc Việt Nam.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleStart}
              className="fpt-btn"
              style={{
                background: "#f37021",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(243,112,33,0.3)",
              }}
            >
              🚀 Bắt Đầu Trải Nghiệm
            </button>
            <a
              href="#lukglobal"
              className="fpt-btn"
              style={{
                background: "#fff",
                color: "#f37021",
                border: "2px solid #f37021",
              }}
            >
              Tìm Hiểu Thêm ↓
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { n: "30,000+", l: "Sinh Viên" },
              { n: "5", l: "Cơ Sở Toàn Quốc" },
              { n: "62%", l: "Học Nhạc Cụ" },
              { n: "Top 5", l: "ĐH Công Nghệ VN" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div
                  style={{ color: "#f37021", fontSize: 28, fontWeight: 800 }}
                >
                  {s.n}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#94a3b8",
            fontSize: 12,
            textAlign: "center",
            animation: "pulse 2s ease infinite",
          }}
        >
          <div style={{ marginBottom: 8 }}>↓ Cuộn xuống</div>
          <div
            style={{
              width: 20,
              height: 32,
              border: "2px solid #cbd5e1",
              borderRadius: 10,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 4,
                height: 8,
                background: "#f37021",
                borderRadius: 2,
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                animation: "float 1.5s ease infinite",
              }}
            />
          </div>
        </div>
      </section>

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
              { n: "8", l: "Loại nhạc cụ" },
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
