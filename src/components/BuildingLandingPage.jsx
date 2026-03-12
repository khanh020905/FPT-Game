import { useState, useEffect, useRef } from "react";
import { BUILDING_DATA } from "../data/buildingData";
import fptLogo from "../assets/fpt-logo.png";
import MainGateLanding from "./MainGateLanding";

const IMGS = {
  "alpha-tower": [
    {
      url: "/fpt-alpha-building.png",
      cap: "Toà Alpha — FPT University Đà Nẵng",
    },
    {
      url: "/alpha-luk-team.jpg",
      cap: "Sinh viên LUK Global — 21st Century Education",
    },
    { url: "/alpha-luk-activity.jpg", cap: "Hoạt động tương tác LUK Global" },
    {
      url: "/alpha-luk-music.jpg",
      cap: "Sinh viên biểu diễn âm nhạc tại LUK Global",
    },
    {
      url: "/alpha-luk-foreign-teacher.jpg",
      cap: "Học tiếng Anh với giảng viên nước ngoài",
    },
    {
      url: "https://images2.thanhnien.vn/528068263637045248/2024/2/4/fptu-da-nang-02-1707012458234479740570.jpg",
      cap: "Kiến trúc đạt giải WA Award",
    },
  ],
  "beta-tower": [
    {
      url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg",
      cap: "Toàn cảnh campus FPT — Khu Lab Beta",
    },
    {
      url: "https://dnuni.fpt.edu.vn/wp-content/uploads/2024/09/z5825397493887_e21070a16a917dab8de1bbfb8cfca0a6-1024x576.jpg",
      cap: "Phòng Lab máy tính hiện đại",
    },
    {
      url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/z4581854392561_cbde0f0ddd85a2cd4413c6de5cfa58e2.jpg",
      cap: "Sinh viên thực hành tại Lab Beta",
    },
    {
      url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/06/campus-da-nang-3.jpg",
      cap: "Kiến trúc hiện đại Toà Beta",
    },
  ],
  "gamma-tower": [
    { url: "/fpt-gamma-building.png", cap: "Toà nhà FPT University Đà Nẵng" },
    { url: "/gamma-openday.jpg", cap: "Sảnh chính Toà Gamma — Open Day FPT" },
    {
      url: "/gamma-calligraphy.png",
      cap: "Sinh viên trải nghiệm viết chữ Thư Pháp",
    },
    {
      url: "/gamma-traditional-music.jpg",
      cap: "Biểu diễn nhạc cụ dân tộc truyền thống",
    },
    { url: "/gamma-design-class.jpg", cap: "Lớp học Digital Art & Design" },
    {
      url: "/gamma-security-lab.jpg",
      cap: "Lab An Toàn Thông Tin — Cybersecurity",
    },
    {
      url: "/gamma-aerial.png",
      cap: "Toà Gamma — FPT University Đà Nẵng",
    },
    {
      url: "/gamma-music-students.png",
      cap: "Sinh viên FPT với nhạc cụ dân tộc",
    },
  ],
  canteen: [
    {
      url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg",
      cap: "Cantin FPT University — Khu ẩm thực sinh viên",
    },
    {
      url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/campus-dn-1-scaled.jpg",
      cap: "Toàn cảnh campus từ trên cao — Cantin gần hồ nước",
    },
    {
      url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/sinh-vien-fpt-dn.jpg",
      cap: "Sinh viên FPT giao lưu tại khu vực Cantin",
    },
    {
      url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/06/campus-da-nang-3.jpg",
      cap: "Không gian xanh quanh khu Cantin",
    },
  ],
  "dorm-a": [
    {
      url: "/dorm_building.png",
      cap: "Ký Túc Xá FPT University — Thiết kế hiện đại",
    },
    {
      url: "/dorm_room_interior.png",
      cap: "Phòng KTX ấm cúng — bàn học, giường tầng",
    },
    {
      url: "/dorm_campus_aerial.png",
      cap: "Toàn cảnh campus — KTX nằm trong khuôn viên",
    },
    {
      url: "/dorm_student_life.png",
      cap: "Đời sống sinh viên FPT tại KTX",
    },
  ],
  "dorm-b": [
    {
      url: "/dorm_building.png",
      cap: "KTX B — Khu vực yên tĩnh gần sân thể thao",
    },
    {
      url: "/dorm_campus_aerial.png",
      cap: "Khuôn viên FPT University từ trên cao",
    },
    {
      url: "/dorm_room_interior.png",
      cap: "Phòng ở tiện nghi cho sinh viên",
    },
    {
      url: "/dorm_student_life.png",
      cap: "Sinh viên FPT giao lưu tại KTX",
    },
  ],
  "main-gate": [
    {
      url: "https://images2.thanhnien.vn/528068263637045248/2024/2/4/fptu-da-nang-02-1707012458234479740570.jpg",
      cap: "Cổng chính FPT",
    },
  ],
  "event-yard": [
    {
      url: "/event_yard_vovinam.png",
      cap: "Giải vô địch VOVINAM sinh viên FPT",
    },
    {
      url: "/event_yard_campus.png",
      cap: "Khuôn viên Sân Sự Kiện rộng lớn",
    },
    {
      url: "/event_yard_music.png",
      cap: "Đại Nhạc Hội FPT & Hội Làng hoành tráng",
    },
  ],
};

/* ──────── Color palette per building ──────── */
const PALETTES = {
  "alpha-tower": {
    bg: "linear-gradient(180deg,#f8fafc 0%,#eef2ff 40%,#fff7ed 100%)",
    accent: "#f37021",
    accent2: "#2563eb",
    light: "rgba(243,112,33,.08)",
    lightBorder: "rgba(243,112,33,.12)",
  },
  "beta-tower": {
    bg: "linear-gradient(180deg,#f8fafc 0%,#f5f3ff 40%,#faf5ff 100%)",
    accent: "#7c3aed",
    accent2: "#8b5cf6",
    light: "rgba(124,58,237,.08)",
    lightBorder: "rgba(124,58,237,.12)",
  },
  "gamma-tower": {
    bg: "linear-gradient(180deg,#f8fafc 0%,#fff7ed 40%,#fef3c7 100%)",
    accent: "#ea580c",
    accent2: "#f59e0b",
    light: "rgba(234,88,12,.08)",
    lightBorder: "rgba(234,88,12,.12)",
  },
  canteen: {
    bg: "linear-gradient(180deg,#f8fafc 0%,#f0fdf4 40%,#ecfdf5 100%)",
    accent: "#16a34a",
    accent2: "#22c55e",
    light: "rgba(22,163,74,.08)",
    lightBorder: "rgba(22,163,74,.12)",
  },
  "dorm-a": {
    bg: "linear-gradient(180deg,#f8fafc 0%,#fefce8 40%,#fff7ed 100%)",
    accent: "#ca8a04",
    accent2: "#eab308",
    light: "rgba(202,138,4,.08)",
    lightBorder: "rgba(202,138,4,.12)",
  },
  "dorm-b": {
    bg: "linear-gradient(180deg,#f8fafc 0%,#fffbeb 40%,#fff7ed 100%)",
    accent: "#d97706",
    accent2: "#f59e0b",
    light: "rgba(217,119,6,.08)",
    lightBorder: "rgba(217,119,6,.12)",
  },
  "event-yard": {
    bg: "linear-gradient(180deg,#f8fafc 0%,#fff1f2 40%,#ffe4e6 100%)",
    accent: "#e11d48",
    accent2: "#be123c",
    light: "rgba(225,29,72,.08)",
    lightBorder: "rgba(225,29,72,.12)",
  },
};

export default function BuildingLandingPage({ buildingId, onClose }) {
  if (buildingId === "main-gate") return <MainGateLanding onClose={onClose} />;

  const [exit, setExit] = useState(false);
  const [sY, setSY] = useState(0);
  const [imgErr, setImgErr] = useState({});
  const [imgIdx, setImgIdx] = useState(0);
  const [cubeIdx, setCubeIdx] = useState(0);
  const [cubePaused, setCubePaused] = useState(false);
  const [cubeRot, setCubeRot] = useState({ x: 0, y: 0 });
  const [cubeDrag, setCubeDrag] = useState(null);
  const ref = useRef(null);
  const cubeRef = useRef(null);
  const dragRef = useRef({ dragging: false, x: 0, y: 0, rotX: 0, rotY: 0 });
  const b = BUILDING_DATA[buildingId];
  if (!b) return null;
  const imgs = IMGS[buildingId] || [];
  const isG = buildingId === "gamma-tower";
  const isA = buildingId === "alpha-tower";
  const P = PALETTES[buildingId] || PALETTES["alpha-tower"];
  const ac = P.accent;

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

  useEffect(() => {
    if (imgs.length <= 1) return;
    const t = setInterval(() => setImgIdx((i) => (i + 1) % imgs.length), 5000);
    return () => clearInterval(t);
  }, [imgs.length]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("bVisible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const el = ref.current;
    if (!el) return;
    setTimeout(() => {
      el.querySelectorAll(".bReveal").forEach((node) => observer.observe(node));
    }, 100);
    return () => observer.disconnect();
  }, []);

  const typeColor = (t) =>
    ({
      class: "#2563eb",
      lab: "#7c3aed",
      luk: "#ea580c",
      music: "#d97706",
      activity: "#16a34a",
      personal: "#64748b",
      break: "#94a3b8",
      meal: "#16a34a",
      social: "#ea580c",
      study: "#2563eb",
      project: "#7c3aed",
      practice: "#ca8a04",
      english: "#ea580c",
      workshop: "#7c3aed",
      event: "#16a34a",
    })[t] || ac;

  return (
    <div
      ref={ref}
      className="bp"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflowY: "auto",
        overflowX: "hidden",
        background: P.bg,
        opacity: exit ? 0 : 1,
        transform: exit ? "scale(.97)" : "scale(1)",
        transition: "all .4s cubic-bezier(.4,0,.2,1)",
        scrollBehavior: "smooth",
      }}
    >
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
.bp{font-family:'Inter',system-ui,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased}
.bp *{box-sizing:border-box;margin:0;padding:0}
@keyframes bFU{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes bFl{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes bGlow{0%,100%{box-shadow:0 4px 24px ${ac}20}50%{box-shadow:0 8px 40px ${ac}30}}
@keyframes bSlideL{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes bSlideR{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes bScale{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
@keyframes bCubeRotate{0%{transform:rotateY(0deg) rotateX(0deg)}8%{transform:rotateY(-90deg) rotateX(15deg)}16%{transform:rotateY(-90deg) rotateX(0deg)}25%{transform:rotateY(-180deg) rotateX(-10deg)}33%{transform:rotateY(-180deg) rotateX(0deg)}42%{transform:rotateY(-270deg) rotateX(20deg)}50%{transform:rotateY(-270deg) rotateX(0deg)}58%{transform:rotateY(-360deg) rotateX(-15deg)}66%{transform:rotateY(-360deg) rotateX(0deg)}75%{transform:rotateY(-450deg) rotateX(10deg)}83%{transform:rotateY(-450deg) rotateX(0deg)}92%{transform:rotateY(-360deg) rotateX(-10deg)}100%{transform:rotateY(-360deg) rotateX(0deg)}}
.bF{animation:bFU .6s ease both}
.bReveal{opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1)}
.bReveal.bVisible{opacity:1;transform:translateY(0)}
.bReveal[data-delay="1"]{transition-delay:.1s}
.bReveal[data-delay="2"]{transition-delay:.2s}
.bReveal[data-delay="3"]{transition-delay:.3s}
.bReveal[data-delay="4"]{transition-delay:.4s}
.bReveal[data-delay="5"]{transition-delay:.5s}
.bCard{background:rgba(255,255,255,.85);border:1px solid rgba(0,0,0,.06);border-radius:16px;backdrop-filter:blur(12px);transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.bCard:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.08);border-color:${ac}20}
.bSec{padding:72px clamp(16px,4vw,40px);max-width:1280px;margin:0 auto}
.bBdg{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase}
.bDiv{width:48px;height:3px;border-radius:2px;margin:-2px auto 16px;background:linear-gradient(90deg,transparent,${ac},transparent)}
.bIC{position:relative;overflow:hidden;border-radius:14px;border:1px solid rgba(0,0,0,.06);box-shadow:0 2px 8px rgba(0,0,0,.06)}
.bIC img{width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.4,0,.2,1)}
.bIC:hover img{transform:scale(1.04)}
.bpFeatGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.bpRubricFlex{display:flex;align-items:stretch;gap:32px}
.bpCubeWrap{flex:0 0 44%;min-height:440px;display:flex;align-items:center;justify-content:center;perspective:900px;cursor:grab;user-select:none}
.bpCubeInner{width:340px;height:340px}
.bpNavInner{height:80px}
.bpHeroCap{position:absolute;bottom:48px;right:40px;z-index:3}
@media(max-width:768px){
  .bpFeatGrid{grid-template-columns:1fr!important;gap:14px!important}
  .bpRubricFlex{flex-direction:column!important;gap:20px!important}
  .bpCubeWrap{flex:none!important;min-height:280px!important;perspective:600px!important}
  .bpCubeInner{width:220px!important;height:220px!important}
  .bpNavInner{height:56px!important}
  .bpHeroCap{bottom:48px!important;right:12px!important;left:12px!important}
  .bSec{padding:40px 16px!important}
  .bp .bCard{padding:20px 16px!important}
}
      `}</style>
      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: sY > 40 ? "rgba(255,255,255,.95)" : "transparent",
          backdropFilter: sY > 40 ? "blur(20px) saturate(1.5)" : "none",
          borderBottom: sY > 40 ? "1px solid rgba(0,0,0,.06)" : "none",
          transition: "all .3s",
          boxShadow: sY > 40 ? "0 2px 20px rgba(0,0,0,.06)" : "none",
        }}
      >
        <div
          className="bpNavInner"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,3vw,40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={fptLogo}
              alt="FPT Logo"
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                objectFit: "contain",
                boxShadow: `0 2px 12px ${ac}30`,
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: ac,
                letterSpacing: 0.5,
              }}
            >
              {b.name.toUpperCase()}
            </span>
          </div>
          <button
            onClick={close}
            style={{
              background: P.light,
              border: `1px solid ${P.lightBorder}`,
              color: ac,
              borderRadius: 12,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ac;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = P.light;
              e.currentTarget.style.color = ac;
            }}
          >
            ← Quay lại Game
          </button>
        </div>
      </nav>
      {/* ═══ HERO — FULL BLEED EDUKER STYLE ═══ */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          minHeight: 520,
          overflow: "hidden",
        }}
      >
        {/* Background carousel images */}
        {imgs.length > 0 &&
          imgs.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.cap}
              onError={() => setImgErr((p) => ({ ...p, [img.url]: true }))}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === imgIdx && !imgErr[img.url] ? 1 : 0,
                transition: "opacity 1.2s ease",
              }}
            />
          ))}
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg,rgba(15,23,42,0.55) 0%,rgba(15,23,42,0.85) 100%)`,
          }}
        />

        {/* Hero Content — left aligned like Eduker */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(32px,6vw,80px)",
            maxWidth: 1280,
          }}
        >
          <div className="bF">
            <p
              style={{
                color: "rgba(255,255,255,.6)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 2.5,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              {b.subtitle || "FPT UNIVERSITY — ĐÀ NẴNG"}
            </p>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(36px,5.5vw,64px)",
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 20px",
                maxWidth: 650,
                letterSpacing: "-.02em",
              }}
            >
              {b.name.split(" ")[0]}
              <br />
              <span style={{ color: `${ac}` }}>
                {b.name.split(" ").slice(1).join(" ") || b.name}
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(15px,2vw,18px)",
                fontWeight: 600,
                marginBottom: 12,
                color: ac,
              }}
            >
              {b.tagline}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,.7)",
                fontSize: 15,
                lineHeight: 1.8,
                margin: "0 0 32px",
                maxWidth: 520,
              }}
            >
              {b.description}
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="#schedule"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 36px",
                  borderRadius: 10,
                  background: ac,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: `0 4px 24px ${ac}40`,
                  transition: "all .25s",
                }}
              >
                📅 Lịch Trình 1 Ngày
              </a>
              {isG && (
                <a
                  href="#luk"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 36px",
                    borderRadius: 10,
                    background: "transparent",
                    color: "#fff",
                    border: "2px solid rgba(255,255,255,.35)",
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all .25s",
                  }}
                >
                  🌍 LUK Global
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        {imgs.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              display: "flex",
              gap: 8,
            }}
          >
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: i === imgIdx ? 28 : 10,
                  height: 4,
                  borderRadius: 2,
                  border: "none",
                  cursor: "pointer",
                  background: i === imgIdx ? "#fff" : "rgba(255,255,255,.35)",
                  transition: "all .4s",
                }}
              />
            ))}
          </div>
        )}

        {/* Caption bar */}
        <div className="bpHeroCap">
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              backdropFilter: "blur(12px)",
              borderRadius: 10,
              padding: "10px 18px",
              border: "1px solid rgba(255,255,255,.2)",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                margin: 0,
              }}
            >
              {imgs[imgIdx]?.cap}
            </p>
          </div>
        </div>
      </section>
      {/* ═══ FLOATING FEATURE CARDS ═══ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "-80px auto 0",
          padding: "0 clamp(32px,6vw,80px)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div className="bpFeatGrid">
          {[
            {
              icon: "🎓",
              gradient: "linear-gradient(135deg,#3b82f6,#6366f1)",
              title: isG ? "LUK Global" : isA ? "English Advanced" : "Học Tập",
              desc: isG
                ? "Chương trình tiếng Anh nền tảng bắt buộc cho sinh viên năm nhất."
                : isA
                  ? "English Level 5-6 — nâng cao kỹ năng giao tiếp."
                  : "Không gian học tập hiện đại tại FPT University.",
              accent: "#3b82f6",
            },
            {
              icon: isG ? "🎵" : "🏫",
              gradient: `linear-gradient(135deg,${ac},#f97316)`,
              title: isG ? "Nhạc Cụ Dân Tộc" : "Cơ Sở Vật Chất",
              desc: isG
                ? "FPT tiên phong đưa nhạc cụ dân tộc vào giảng dạy từ 2014."
                : "Phòng Lab, hội trường, thư viện chất lượng cao.",
              accent: ac,
            },
            {
              icon: "🏆",
              gradient: "linear-gradient(135deg,#10b981,#059669)",
              title: "Hoạt Động Sinh Viên",
              desc: "Vovinam, Workshop, Debate, Project — trải nghiệm toàn diện.",
              accent: "#10b981",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bReveal"
              data-delay={i + 1}
              style={{
                background: "rgba(15,23,42,.85)",
                backdropFilter: "blur(20px) saturate(1.4)",
                borderRadius: 16,
                padding: "32px 28px 28px",
                textAlign: "center",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.08)",
                transition: "all .4s cubic-bezier(.4,0,.2,1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                borderTop: `3px solid transparent`,
                borderImage: `${f.gradient} 1`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px) scale(1.02)";
                e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,.35), 0 0 40px ${f.accent}25, inset 0 1px 0 rgba(255,255,255,.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 8px 40px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.08)";
              }}
            >
              {/* Subtle gradient glow behind icon */}
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: f.gradient,
                  opacity: 0.08,
                  filter: "blur(30px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: f.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  margin: "0 auto 18px",
                  boxShadow: `0 4px 20px ${f.accent}40`,
                  position: "relative",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  margin: "0 0 10px",
                  color: "#fff",
                  letterSpacing: 0.3,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,.55)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  margin: "0 0 16px",
                }}
              >
                {f.desc}
              </p>
              <a
                href="#schedule"
                style={{
                  color: f.accent,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "gap .3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = "10px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = "6px";
                }}
              >
                Xem thêm <span style={{ fontSize: 16 }}>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* ═══ RUBRIC INFO CARD ═══ */}
      <section
        style={{
          padding: "64px clamp(16px,4vw,40px)",
          background: P.bg,
        }}
      >
        <div
          className="bpRubricFlex"
          style={{
            maxWidth: 1280,
            padding: "0 clamp(20px,3vw,40px)",
            margin: "0 auto",
          }}
        >
          {/* Left — 3D Rotating Cube */}
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              const d = dragRef.current;
              d.dragging = true;
              d.x = e.clientX;
              d.y = e.clientY;
              setCubePaused(true);
              if (cubeRef.current) {
                cubeRef.current.style.animation = "none";
                cubeRef.current.style.transition = "none";
              }
            }}
            onMouseMove={(e) => {
              const d = dragRef.current;
              if (!d.dragging) return;
              const dx = e.clientX - d.x;
              const dy = e.clientY - d.y;
              d.rotY += dx * 0.4;
              d.rotX -= dy * 0.4;
              d.x = e.clientX;
              d.y = e.clientY;
              if (!d.rafId) {
                d.rafId = requestAnimationFrame(() => {
                  if (cubeRef.current) {
                    cubeRef.current.style.transform = `rotateX(${d.rotX}deg) rotateY(${d.rotY}deg)`;
                  }
                  d.rafId = null;
                });
              }
            }}
            onMouseUp={() => {
              dragRef.current.dragging = false;
            }}
            onMouseLeave={() => {
              dragRef.current.dragging = false;
            }}
            className="bpCubeWrap"
          >
            <div
              ref={cubeRef}
              className="bpCubeInner"
              style={{
                position: "relative",
                transformStyle: "preserve-3d",
                animation: cubePaused
                  ? "none"
                  : "bCubeRotate 20s ease-in-out infinite",
                transform: cubePaused
                  ? [
                      "rotateY(0deg) rotateX(0deg)",
                      "rotateY(-90deg) rotateX(0deg)",
                      "rotateY(-180deg) rotateX(0deg)",
                      "rotateY(-270deg) rotateX(0deg)",
                      "rotateX(-90deg) rotateY(0deg)",
                      "rotateX(90deg) rotateY(0deg)",
                    ][cubeIdx]
                  : undefined,
                transition: cubePaused
                  ? "transform .8s cubic-bezier(.4,0,.2,1)"
                  : "none",
                willChange: "transform",
              }}
            >
              {[
                { idx: 0, transform: "translateZ(170px)" },
                { idx: 1, transform: "rotateY(90deg) translateZ(170px)" },
                { idx: 2, transform: "rotateY(180deg) translateZ(170px)" },
                { idx: 3, transform: "rotateY(-90deg) translateZ(170px)" },
                { idx: 4, transform: "rotateX(90deg) translateZ(170px)" },
                { idx: 5, transform: "rotateX(-90deg) translateZ(170px)" },
              ].map((face) => (
                <div
                  key={face.idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    const el = cubeRef.current;
                    if (el) {
                      el.style.animation = "none";
                      el.style.transition =
                        "transform .8s cubic-bezier(.4,0,.2,1)";
                      requestAnimationFrame(() => {
                        const targets = [
                          "rotateY(0deg) rotateX(0deg)",
                          "rotateY(-90deg) rotateX(0deg)",
                          "rotateY(-180deg) rotateX(0deg)",
                          "rotateY(-270deg) rotateX(0deg)",
                          "rotateX(-90deg) rotateY(0deg)",
                          "rotateX(90deg) rotateY(0deg)",
                        ];
                        el.style.transform = targets[face.idx];
                      });
                    }
                    setCubeIdx(face.idx);
                    setCubePaused(true);
                  }}
                  style={{
                    position: "absolute",
                    width: 340,
                    height: 340,
                    borderRadius: 18,
                    overflow: "hidden",
                    backfaceVisibility: "hidden",
                    transform: face.transform,
                    boxShadow: "0 8px 32px rgba(0,0,0,.2)",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={imgs[face.idx % imgs.length]?.url}
                    alt={imgs[face.idx % imgs.length]?.cap || ""}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      background: "rgba(0,0,0,.6)",
                      backdropFilter: "blur(6px)",
                      borderRadius: 8,
                      padding: "5px 12px",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {imgs[face.idx % imgs.length]?.cap}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Info Card */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 20,
              padding: "40px 36px",
              boxShadow: "0 4px 24px rgba(0,0,0,.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent top line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg,${ac},${P.accent2})`,
              }}
            />

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: ac,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              📷 ẢNH {cubeIdx + 1} / {Math.min(imgs.length, 6)}
            </div>

            <h3
              style={{
                fontSize: "clamp(22px,3vw,30px)",
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 14,
                lineHeight: 1.3,
              }}
            >
              {imgs[cubeIdx % imgs.length]?.cap || b.name}
            </h3>

            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              {`Khám phá "${imgs[cubeIdx % imgs.length]?.cap || b.name}" — một trong những hình ảnh nổi bật tại ${b.name}, FPT University Đà Nẵng. Nơi hội tụ không gian học tập, sáng tạo và trải nghiệm đầy ý nghĩa.`}
            </p>

            {/* Feature list */}
            <div
              style={{
                background: `${ac}08`,
                borderRadius: 14,
                padding: "20px 24px",
                marginBottom: 28,
                borderLeft: `3px solid ${ac}30`,
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 10 }}>💡</div>
              {[
                "Không gian hiện đại, thiết kế tinh tế",
                "Trải nghiệm sinh viên đa dạng",
                "Kết nối cộng đồng FPT University",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 13,
                    color: "#334155",
                    padding: "4px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: ac, fontWeight: 700 }}>•</span> {item}
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: ac,
                  letterSpacing: -0.5,
                }}
              >
                {cubeIdx + 1} / {Math.min(imgs.length, 6)}
              </span>
              <button
                onClick={() => {
                  const next = (cubeIdx + 1) % Math.min(imgs.length, 6);
                  const el = cubeRef.current;
                  if (el) {
                    el.style.animation = "none";
                    el.style.transition =
                      "transform .8s cubic-bezier(.4,0,.2,1)";
                    requestAnimationFrame(() => {
                      const targets = [
                        "rotateY(0deg) rotateX(0deg)",
                        "rotateY(-90deg) rotateX(0deg)",
                        "rotateY(-180deg) rotateX(0deg)",
                        "rotateY(-270deg) rotateX(0deg)",
                        "rotateX(-90deg) rotateY(0deg)",
                        "rotateX(90deg) rotateY(0deg)",
                      ];
                      el.style.transform = targets[next];
                    });
                  }
                  setCubeIdx(next);
                  setCubePaused(true);
                }}
                style={{
                  background: `linear-gradient(135deg,${ac},${P.accent2})`,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 28px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: `0 4px 16px ${ac}30`,
                  transition: "all .3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.boxShadow = `0 6px 24px ${ac}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = `0 4px 16px ${ac}30`;
                }}
              >
                Tiếp theo <span style={{ fontSize: 16 }}>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ═══ STATS HIGHLIGHTS ═══ */}
      {b.welcomeHighlights && (
        <section style={{ padding: "0 clamp(16px,4vw,40px) 48px" }}>
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 14,
            }}
          >
            {b.welcomeHighlights.map((h, i) => (
              <div
                key={i}
                className="bCard bReveal"
                data-delay={i + 1}
                style={{ padding: "24px 18px", textAlign: "center" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    margin: "0 auto 10px",
                    background: `linear-gradient(135deg,${ac}12,${ac}04)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {h.icon}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: ac,
                    marginBottom: 2,
                  }}
                >
                  {h.stat}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: 3,
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
      {/* ═══ DAILY SCHEDULE ═══ */}
      <section
        id="schedule"
        style={{
          background: "rgba(255,255,255,.5)",
          borderTop: "1px solid rgba(0,0,0,.04)",
          borderBottom: "1px solid rgba(0,0,0,.04)",
        }}
      >
        <div className="bSec">
          <div
            className="bReveal"
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div
              className="bBdg"
              style={{
                background: P.light,
                color: ac,
                border: `1px solid ${P.lightBorder}`,
                marginBottom: 16,
              }}
            >
              📅 MỘT NGÀY CỦA SINH VIÊN FPT
            </div>
            <h2
              style={{
                fontSize: "clamp(24px,4vw,36px)",
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Lịch Trình Tại <span style={{ color: ac }}>{b.name}</span>
            </h2>
            <div className="bDiv" />
            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Theo chân sinh viên FPT trải nghiệm một ngày học tập tại Đà Nẵng
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
            }}
          >
            {/* Vertical timeline line */}
            <div
              style={{
                position: "absolute",
                left: 25,
                top: 26,
                bottom: 26,
                width: 3,
                background: `linear-gradient(180deg, ${ac}40, ${ac}15)`,
                borderRadius: 2,
                zIndex: 0,
              }}
            />
            {b.dailySchedule.map((s, i) => {
              const c = typeColor(s.type);
              const isLast = i === b.dailySchedule.length - 1;
              return (
                <div
                  key={i}
                  className="bReveal"
                  data-delay={Math.min((i % 4) + 1, 5)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    position: "relative",
                    zIndex: 1,
                    marginBottom: isLast ? 0 : 8,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "#fff",
                      border: `3px solid ${c}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      boxShadow: `0 0 0 4px ${c}15, 0 4px 12px rgba(0,0,0,.08)`,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {s.emoji}
                  </div>

                  {/* Arrow connector */}
                  <div
                    style={{
                      width: 24,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: c,
                      fontSize: 18,
                      fontWeight: 700,
                      opacity: 0.6,
                    }}
                  >
                    →
                  </div>

                  {/* Content card */}
                  <div
                    style={{
                      flex: 1,
                      padding: "16px 22px",
                      background: "#fff",
                      borderRadius: 14,
                      border: `1.5px solid ${c}20`,
                      boxShadow: "0 2px 12px rgba(0,0,0,.05)",
                      transition: "all .3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(6px)";
                      e.currentTarget.style.boxShadow = `0 4px 20px ${c}20`;
                      e.currentTarget.style.borderColor = `${c}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 12px rgba(0,0,0,.05)";
                      e.currentTarget.style.borderColor = `${c}20`;
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: c,
                        letterSpacing: 0.5,
                        marginBottom: 4,
                        textTransform: "uppercase",
                      }}
                    >
                      🕐 {s.time}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
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
      {/* ═══ ALPHA: ENGLISH LV5-6 ═══ */}
      {isA && b.englishLv56 && (
        <section
          id="english"
          style={{ borderTop: "1px solid rgba(0,0,0,.04)" }}
        >
          <div className="bSec">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                className="bBdg"
                style={{
                  background: "rgba(37,99,235,.06)",
                  color: "#2563eb",
                  border: "1px solid rgba(37,99,235,.12)",
                  marginBottom: 16,
                }}
              >
                🇬🇧 ENGLISH WITH NATIVE TEACHERS
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px,4vw,36px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                English <span style={{ color: ac }}>Level 5 & 6</span>
              </h2>
              <div className="bDiv" />
              <p
                style={{
                  color: "#64748b",
                  fontSize: 14,
                  maxWidth: 540,
                  margin: "0 auto",
                  lineHeight: 1.8,
                }}
              >
                {b.englishLv56.description}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 36,
              }}
            >
              {b.englishLv56.levels.map((l, i) => (
                <div
                  key={l.name}
                  className="bCard bF"
                  style={{
                    padding: "32px 24px",
                    borderTop: `4px solid ${l.color}`,
                    animationDelay: `${i * 0.15}s`,
                    background: `linear-gradient(180deg,${l.color}06,rgba(255,255,255,.9))`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${l.color}12`,
                        border: `2px solid ${l.color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 900,
                        color: l.color,
                      }}
                    >
                      L{l.level}
                    </div>
                    <div
                      style={{ fontSize: 18, fontWeight: 800, color: l.color }}
                    >
                      {l.name}
                    </div>
                  </div>
                  <p
                    style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}
                  >
                    {l.desc}
                  </p>
                </div>
              ))}
            </div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              👨‍🏫 Đội Ngũ Giảng Viên Quốc Tế
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
                marginBottom: 36,
              }}
            >
              {b.englishLv56.teachers.map((t, i) => (
                <div
                  key={t.name}
                  className="bCard bF"
                  style={{
                    textAlign: "center",
                    padding: "28px 14px",
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      margin: "0 auto 12px",
                      background: `linear-gradient(135deg,${ac},${P.accent2})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      boxShadow: `0 4px 16px ${ac}25`,
                      color: "#fff",
                    }}
                  >
                    👨‍🏫
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: 4,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: ac,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {t.country}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4 }}
                  >
                    {t.specialty}
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
                    Kinh nghiệm: {t.exp}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {b.englishLv56.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bCard"
                  style={{
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: P.light,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: ac, fontSize: 13, fontWeight: 900 }}>
                      ✓
                    </span>
                  </div>
                  <span
                    style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ═══ ALPHA: EVENTS & WORKSHOPS ═══ */}
      {isA && b.events && (
        <section
          style={{
            background: "rgba(255,255,255,.4)",
            borderTop: "1px solid rgba(0,0,0,.04)",
          }}
        >
          <div className="bSec">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                className="bBdg"
                style={{
                  background: P.light,
                  color: ac,
                  border: `1px solid ${P.lightBorder}`,
                  marginBottom: 16,
                }}
              >
                🏮 HỘI LÀNG & ĐẠI NHẠC HỘI
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px,4vw,36px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                Hội Làng FPT & <span style={{ color: ac }}>Đại Nhạc Hội</span>
              </h2>
              <div className="bDiv" />
              <p
                style={{
                  color: "#64748b",
                  fontSize: 14,
                  maxWidth: 540,
                  margin: "0 auto",
                  lineHeight: 1.8,
                }}
              >
                {b.events.description}
              </p>
            </div>

            {b.events.hoiLang && (
              <div
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,247,237,.8))",
                  border: `2px solid ${ac}20`,
                  borderRadius: 20,
                  padding: "36px 32px",
                  marginBottom: 36,
                  position: "relative",
                  overflow: "hidden",
                  animation: "bGlow 3s ease infinite",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: `${ac}06`,
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 48,
                        animation: "bFl 3s ease-in-out infinite",
                        filter: `drop-shadow(0 4px 12px ${ac}30)`,
                      }}
                    >
                      🏮
                    </div>
                    <div>
                      <div
                        className="bBdg"
                        style={{
                          background: ac,
                          color: "#fff",
                          marginBottom: 8,
                          fontWeight: 800,
                        }}
                      >
                        ★ SỰ KIỆN LỚN NHẤT NĂM
                      </div>
                      <h3
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          color: "#0f172a",
                        }}
                      >
                        Hội Làng FPT — Lễ Hội Huyền Thoại
                      </h3>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#475569",
                      lineHeight: 1.8,
                      marginBottom: 20,
                    }}
                  >
                    {b.events.hoiLang.description}
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: 10,
                    }}
                  >
                    {b.events.hoiLang.activities.map((a, i) => (
                      <div
                        key={a.name}
                        className="bCard bF"
                        style={{
                          textAlign: "center",
                          padding: "16px 12px",
                          animationDelay: `${i * 0.08}s`,
                        }}
                      >
                        <div style={{ fontSize: 28, marginBottom: 6 }}>
                          {a.emoji}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#0f172a",
                            marginBottom: 3,
                          }}
                        >
                          {a.name}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#64748b",
                            lineHeight: 1.4,
                          }}
                        >
                          {a.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              🎤 Sự Kiện & Ca Sĩ Nổi Tiếng
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                marginBottom: 36,
              }}
            >
              {b.events.upcomingEvents.map((ev, i) => (
                <div
                  key={ev.name}
                  className="bCard bF"
                  style={{
                    padding: "20px 18px",
                    borderLeft: `4px solid ${ev.color}`,
                    animationDelay: `${i * 0.1}s`,
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${ev.color}10`,
                      border: `1.5px solid ${ev.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {ev.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: 3,
                      }}
                    >
                      {ev.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: ev.color,
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      📅 {ev.date}
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>
                      {ev.speaker}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
              }}
            >
              {b.events.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bCard"
                  style={{
                    padding: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    textAlign: "center",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ fontSize: 16 }}>⚡</span>
                  <span
                    style={{ fontSize: 12, color: "#475569", lineHeight: 1.4 }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ═══ GAMMA: LUK GLOBAL ═══ */}
      {isG && b.lukGlobal && (
        <section id="luk" style={{ borderTop: "1px solid rgba(0,0,0,.04)" }}>
          <div className="bSec">
            <div
              className="bReveal"
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <div
                className="bBdg"
                style={{
                  background: P.light,
                  color: ac,
                  border: `1px solid ${P.lightBorder}`,
                  marginBottom: 16,
                }}
              >
                🌍 LITTLE UK GLOBAL
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px,4vw,36px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                LUK <span style={{ color: ac }}>GLOBAL</span>
              </h2>
              <div className="bDiv" />
              <p
                style={{
                  color: "#64748b",
                  fontSize: 14,
                  maxWidth: 600,
                  margin: "0 auto",
                  lineHeight: 1.8,
                }}
              >
                {b.lukGlobal.description}
              </p>
            </div>

            {/* Hero Banner */}
            {b.lukGlobal.gallery && b.lukGlobal.gallery.length > 0 && (
              <div
                className="bReveal"
                style={{
                  marginBottom: 36,
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "21/9",
                  boxShadow: "0 12px 40px rgba(0,0,0,.1)",
                }}
              >
                <img
                  src={b.lukGlobal.gallery[0].url}
                  alt={b.lukGlobal.gallery[0].cap}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.parentElement.style.display = "none";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg,transparent 30%,rgba(0,0,0,.6))",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 28,
                    right: 28,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 14px",
                      borderRadius: 100,
                      background: "rgba(243,112,33,.9)",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      marginBottom: 8,
                    }}
                  >
                    🌍 LUK GLOBAL
                  </div>
                  <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>
                    {b.lukGlobal.gallery[0].cap}
                  </h3>
                </div>
              </div>
            )}

            {/* Gallery Grid */}
            {b.lukGlobal.gallery && b.lukGlobal.gallery.length > 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                  gap: 14,
                  marginBottom: 36,
                }}
              >
                {b.lukGlobal.gallery.slice(1).map((g, i) => (
                  <div
                    key={i}
                    className="bReveal"
                    data-delay={Math.min(i + 1, 5)}
                    style={{
                      position: "relative",
                      borderRadius: 16,
                      overflow: "hidden",
                      aspectRatio: "4/3",
                      boxShadow: "0 4px 20px rgba(0,0,0,.08)",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={g.url}
                      alt={g.cap}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform .5s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.06)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                      onError={(e) => {
                        e.target.parentElement.style.background = "#f1f5f9";
                        e.target.style.display = "none";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg,transparent 40%,rgba(0,0,0,.65))",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 100,
                          background: "rgba(255,255,255,.9)",
                          fontSize: 10,
                          fontWeight: 700,
                          color: ac,
                          letterSpacing: 0.5,
                        }}
                      >
                        {g.tag}
                      </span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 14,
                        right: 14,
                        zIndex: 2,
                      }}
                    >
                      <p
                        style={{
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 600,
                          lineHeight: 1.4,
                        }}
                      >
                        {g.cap}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Info Card */}
            <div
              className="bReveal"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,247,237,.6))",
                border: `1px solid ${ac}15`,
                borderRadius: 20,
                padding: "32px 28px",
                marginBottom: 36,
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: `linear-gradient(135deg,${ac},${P.accent2})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  flexShrink: 0,
                  boxShadow: `0 4px 16px ${ac}25`,
                  color: "#fff",
                }}
              >
                🎓
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: "#0f172a",
                    marginBottom: 6,
                  }}
                >
                  100% Sinh Viên Năm Nhất Học LUK Global
                </h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
                  Chương trình tiếng Anh bắt buộc giúp sinh viên FPT tự tin giao
                  tiếp quốc tế.
                </p>
              </div>
            </div>

            <h3
              className="bReveal"
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              🎯 4 Cấp Độ Tiếng Anh
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
                marginBottom: 36,
              }}
            >
              {b.lukGlobal.levels.map((l, i) => (
                <div
                  key={l.name}
                  className="bCard bReveal"
                  data-delay={Math.min(i + 1, 4)}
                  style={{
                    textAlign: "center",
                    padding: "28px 14px",
                    borderTop: `3px solid ${l.color}`,
                    background: `linear-gradient(180deg,${l.color}06,rgba(255,255,255,.9))`,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      margin: "0 auto 12px",
                      background: `${l.color}12`,
                      border: `1.5px solid ${l.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 900,
                      color: l.color,
                    }}
                  >
                    L{l.level}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: l.color,
                      marginBottom: 6,
                    }}
                  >
                    {l.name}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}
                  >
                    {l.desc}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 36,
              }}
            >
              {b.lukGlobal.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bCard bReveal"
                  data-delay={Math.min(i + 1, 5)}
                  style={{
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: P.light,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: ac, fontSize: 13, fontWeight: 900 }}>
                      ✓
                    </span>
                  </div>
                  <span
                    style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {/* ═══ HURRICANE LEVEL 1 ROADMAP — HOVER TO REVEAL ═══ */}
            <div className="bReveal" style={{ marginBottom: 36 }}>
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
                    fontSize: "clamp(18px,3vw,26px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    marginBottom: 6,
                  }}
                >
                  Chương Trình{" "}
                  <span style={{ color: "#3b82f6" }}>Hurricane</span> Chi Tiết
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                    maxWidth: 480,
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
                  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                  gap: 16,
                }}
              >
                {[
                  {
                    title: "Tuần 1 & 2",
                    img: "/hurricane-week1-2.png",
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
                    img: "/hurricane-week5.png",
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
                    className="bReveal"
                    data-delay={Math.min(ci + 1, 5)}
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
            <div className="bReveal" style={{ marginBottom: 36 }}>
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
                    fontSize: "clamp(18px,3vw,26px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    marginBottom: 6,
                  }}
                >
                  Chương Trình{" "}
                  <span style={{ color: "#16a34a" }}>Greenfire</span> Chi Tiết
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                    maxWidth: 480,
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
                  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
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
                    className="bReveal"
                    data-delay={Math.min(ci + 1, 5)}
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
                    {/* Background Image */}
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
                    {/* Base dark overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%)",
                      }}
                    />

                    {/* Top Tag Badge */}
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
                    {/* Color accent dot */}
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

                    {/* Bottom title always visible */}
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

                    {/* Slide-up panel — hidden by default, appears on hover */}
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
            <div className="bReveal" style={{ marginBottom: 36 }}>
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
                    fontSize: "clamp(18px,3vw,26px)",
                    fontWeight: 900,
                    color: "#0f172a",
                    marginBottom: 6,
                  }}
                >
                  Chương Trình{" "}
                  <span style={{ color: "#ea580c" }}>Heatwave</span> Chi Tiết
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                    maxWidth: 480,
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
                  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
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
                    img: "/heatwave-scoring.png",
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
                    className="bReveal"
                    data-delay={Math.min(ci + 1, 5)}
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
            <div className="bReveal" style={{ marginBottom: 36 }}>
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
                    fontSize: "clamp(18px,3vw,26px)",
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
                    fontSize: 12,
                    maxWidth: 480,
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
                  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                  gap: 16,
                }}
              >
                {[
                  {
                    title: "Thuyết Trình News",
                    img: "/thunderbolt-news.png",
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
                    img: "/thunderbolt-solution.png",
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
                    img: "/thunderbolt-structure.png",
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
                    className="bReveal"
                    data-delay={Math.min(ci + 1, 5)}
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
          </div>
        </section>
      )}
      {/* ═══ GAMMA: ĐÀN TỲ BÀ ═══ */}
      {isG && b.tyBa && (
        <section
          style={{
            background: "rgba(255,251,235,.4)",
            borderTop: "1px solid rgba(0,0,0,.04)",
          }}
        >
          <div className="bSec">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                className="bBdg"
                style={{
                  background: "rgba(217,119,6,.08)",
                  color: "#d97706",
                  border: "1px solid rgba(217,119,6,.12)",
                  marginBottom: 16,
                }}
              >
                🎼 NHẠC CỤ DÂN TỘC
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px,4vw,36px)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                Đàn Tỳ Bà &{" "}
                <span style={{ color: "#d97706" }}>Nhạc Cụ Truyền Thống</span>
              </h2>
              <div
                style={{
                  width: 48,
                  height: 3,
                  borderRadius: 2,
                  margin: "0 auto 16px",
                  background:
                    "linear-gradient(90deg,transparent,#d97706,transparent)",
                }}
              />
              <p
                style={{
                  color: "#64748b",
                  fontSize: 14,
                  maxWidth: 540,
                  margin: "0 auto",
                  lineHeight: 1.8,
                }}
              >
                {b.tyBa.description}
              </p>
            </div>

            <div
              className="bReveal"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,255,255,.9),rgba(254,243,199,.5))",
                border: "2px solid rgba(217,119,6,.15)",
                borderRadius: 20,
                padding: "36px 32px",
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 28,
                flexWrap: "wrap",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "rgba(217,119,6,.05)",
                }}
              />
              <div
                style={{
                  width: 160,
                  height: 200,
                  borderRadius: 16,
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                  border: "2px solid rgba(217,119,6,.15)",
                  boxShadow: "0 8px 32px rgba(217,119,6,.15)",
                  animation: "bFl 3s ease-in-out infinite",
                }}
              >
                <img
                  src="/dan-ty-ba.png"
                  alt="Đàn Tỳ Bà"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.parentElement.innerHTML =
                      '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:64px;background:rgba(217,119,6,.04)">🎼</div>';
                  }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 240,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  className="bBdg"
                  style={{
                    background: "#d97706",
                    color: "#fff",
                    marginBottom: 12,
                    fontWeight: 800,
                  }}
                >
                  ★ NỔI BẬT — ĐÀN TỲ BÀ
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  Đàn Tỳ Bà — 4 Dây Truyền Thống
                </h3>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.8 }}>
                  Lute truyền thống Việt Nam với âm thanh trong trẻo, du dương.
                  FPT University tiên phong đưa nhạc cụ dân tộc vào giảng dạy từ
                  2014.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                gap: 14,
                marginBottom: 36,
              }}
            >
              {b.tyBa.instruments
                .filter((x) => !x.featured)
                .map((inst, i) => (
                  <div
                    key={inst.name}
                    className="bCard bReveal"
                    data-delay={Math.min(i + 1, 5)}
                    style={{
                      textAlign: "center",
                      padding: "20px 14px",
                      overflow: "hidden",
                    }}
                  >
                    {inst.img ? (
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          margin: "0 auto 12px",
                          borderRadius: 14,
                          overflow: "hidden",
                          background: "rgba(217,119,6,.04)",
                          border: "1px solid rgba(217,119,6,.1)",
                        }}
                      >
                        <img
                          src={inst.img}
                          alt={inst.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform .4s",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.transform = "scale(1.1)")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.transform = "scale(1)")
                          }
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:48px">${inst.emoji}</div>`;
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{ fontSize: 48, marginBottom: 12 }}>
                        {inst.emoji}
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: 4,
                      }}
                    >
                      {inst.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        lineHeight: 1.5,
                      }}
                    >
                      {inst.desc}
                    </div>
                  </div>
                ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
                marginBottom: 28,
              }}
            >
              {[
                { n: "2014", l: "Năm bắt đầu", c: "#ea580c" },
                { n: "46", l: "Giảng viên", c: "#d97706" },
                { n: "8", l: "Loại nhạc cụ", c: "#ca8a04" },
                { n: "62%", l: "SV tham gia", c: "#b45309" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bCard"
                  style={{ textAlign: "center", padding: 20 }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: s.c,
                      marginBottom: 4,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {b.tyBa.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bCard"
                  style={{
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 16 }}>🎵</span>
                  <span style={{ fontSize: 13, color: "#475569" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ borderTop: "1px solid rgba(0,0,0,.04)" }}>
        <div className="bSec">
          <div
            className="bReveal"
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Tiện Ích <span style={{ color: ac }}>{b.name}</span>
            </h2>
            <div className="bDiv" />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 14,
            }}
          >
            {b.features.map((f, i) => (
              <div
                key={f.title}
                className="bCard bReveal"
                data-delay={Math.min(i + 1, 5)}
                style={{
                  textAlign: "center",
                  padding: f.img ? "0" : "32px 20px",
                  overflow: "hidden",
                }}
              >
                {f.img ? (
                  <div
                    style={{
                      width: "100%",
                      height: 160,
                      overflow: "hidden",
                      borderRadius: "16px 16px 0 0",
                    }}
                  >
                    <img
                      src={f.img}
                      alt={f.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform .5s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.08)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                      onError={(e) => {
                        e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:52px;background:${ac}08">${f.icon}</div>`;
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      margin: "0 auto 14px",
                      background: `linear-gradient(135deg,${ac}12,${ac}04)`,
                      border: `1px solid ${ac}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                  >
                    {f.icon}
                  </div>
                )}
                <div style={{ padding: f.img ? "16px 20px 20px" : "0" }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ═══ FUN FACTS ═══ */}
      <section
        style={{
          background: "rgba(255,247,237,.5)",
          borderTop: "1px solid rgba(0,0,0,.04)",
        }}
      >
        <div className="bSec" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <h3
            className="bReveal"
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            💡 Bạn Có Biết?
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: 12,
            }}
          >
            {b.funFacts.map((f, i) => (
              <div
                key={i}
                className="bCard bReveal"
                data-delay={Math.min(i + 1, 5)}
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  borderLeft: `3px solid ${ac}50`,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: `linear-gradient(135deg,${ac},${P.accent2})`,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  #{i + 1}
                </div>
                <span
                  style={{
                    fontSize: 14,
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
      {/* ═══ PROFESSIONAL FOOTER ═══ */}
      <footer
        style={{
          background: "linear-gradient(180deg,#0f172a 0%,#020617 100%)",
          color: "#94a3b8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient accent line at top */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg,transparent,${ac},${P.accent2},transparent)`,
          }}
        />

        {/* CTA Banner */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "60px clamp(24px,4vw,40px) 48px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px,4vw,32px)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: 12,
              letterSpacing: -0.5,
            }}
          >
            Sẵn sàng khám phá <span style={{ color: ac }}>{b.name}</span>?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.5)",
              fontSize: 15,
              maxWidth: 460,
              margin: "0 auto 28px",
              lineHeight: 1.7,
            }}
          >
            Quay lại game để tiếp tục hành trình sinh viên FPT University!
          </p>
          <button
            onClick={close}
            style={{
              padding: "14px 48px",
              borderRadius: 12,
              border: "none",
              background: `linear-gradient(135deg,${ac},${P.accent2})`,
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 4px 24px ${ac}40`,
              transition: "all .3s",
              letterSpacing: 0.3,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow = `0 8px 32px ${ac}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 24px ${ac}40`;
            }}
          >
            🎮 Quay Lại Game
          </button>
        </div>

        {/* Footer columns */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "48px clamp(24px,4vw,40px) 40px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <img
                src={fptLogo}
                alt="FPT"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: 0.5,
                }}
              >
                {b.name.toUpperCase()}
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.8,
                color: "rgba(255,255,255,.4)",
                maxWidth: 280,
              }}
            >
              Trải nghiệm đời sống sinh viên FPT University Đà Nẵng qua góc nhìn
              tương tác và sáng tạo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              Khám Phá
            </h4>
            {["Tổng quan", "Lịch trình", "Thư viện ảnh", "Hoạt động"].map(
              (item, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,.4)",
                    fontSize: 13,
                    textDecoration: "none",
                    padding: "5px 0",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ac)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,.4)")
                  }
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* Programs */}
          <div>
            <h4
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              Chương Trình
            </h4>
            {["LUK Global", "Nhạc cụ dân tộc", "Vovinam", "Workshop"].map(
              (item, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,.4)",
                    fontSize: 13,
                    textDecoration: "none",
                    padding: "5px 0",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ac)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,.4)")
                  }
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              Liên Hệ
            </h4>
            <div
              style={{
                fontSize: 13,
                lineHeight: 2.2,
                color: "rgba(255,255,255,.4)",
              }}
            >
              <div>📍 FPT University, Đà Nẵng</div>
              <div>📧 info@fpt.edu.vn</div>
              <div>📞 0236 730 0999</div>
            </div>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {["f", "in", "▶", "✕"].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "rgba(255,255,255,.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(255,255,255,.4)",
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = ac;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,.4)";
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.06)",
            padding: "20px clamp(24px,4vw,40px)",
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            color: "rgba(255,255,255,.25)",
          }}
        >
          <span>© 2026 FPT University Đà Nẵng — Student Life Simulator</span>
          <span>Designed with 🧡 by FPT Students</span>
        </div>
      </footer>
    </div>
  );
}
