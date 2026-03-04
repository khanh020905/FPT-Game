import { useState, useEffect, useRef } from "react";
import { BUILDING_DATA } from "../data/buildingData";
import MainGateLanding from "./MainGateLanding";

const IMGS = {
  "alpha-tower": [
    { url: "/fpt-alpha-building.png", cap: "Toà Alpha — FPT University Đà Nẵng" },
    { url: "/alpha-luk-team.jpg", cap: "Sinh viên LUK Global — 21st Century Education" },
    { url: "/alpha-luk-activity.jpg", cap: "Hoạt động tương tác LUK Global" },
    { url: "/alpha-luk-music.jpg", cap: "Sinh viên biểu diễn âm nhạc tại LUK Global" },
    { url: "/alpha-luk-foreign-teacher.jpg", cap: "Học tiếng Anh với giảng viên nước ngoài" },
    { url: "https://images2.thanhnien.vn/528068263637045248/2024/2/4/fptu-da-nang-02-1707012458234479740570.jpg", cap: "Kiến trúc đạt giải WA Award" },
  ],
  "beta-tower": [
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg", cap: "Toàn cảnh campus FPT — Khu Lab Beta" },
    { url: "https://dnuni.fpt.edu.vn/wp-content/uploads/2024/09/z5825397493887_e21070a16a917dab8de1bbfb8cfca0a6-1024x576.jpg", cap: "Phòng Lab máy tính hiện đại" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/z4581854392561_cbde0f0ddd85a2cd4413c6de5cfa58e2.jpg", cap: "Sinh viên thực hành tại Lab Beta" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/06/campus-da-nang-3.jpg", cap: "Kiến trúc hiện đại Toà Beta" },
  ],
  "gamma-tower": [
    { url: "/fpt-gamma-building.png", cap: "Toà nhà FPT University Đà Nẵng" },
    { url: "/gamma-openday.jpg", cap: "Sảnh chính Toà Gamma — Open Day FPT" },
    { url: "/gamma-calligraphy.png", cap: "Sinh viên trải nghiệm viết chữ Thư Pháp" },
    { url: "/gamma-traditional-music.jpg", cap: "Biểu diễn nhạc cụ dân tộc truyền thống" },
    { url: "/gamma-design-class.jpg", cap: "Lớp học Digital Art & Design" },
    { url: "/gamma-security-lab.jpg", cap: "Lab An Toàn Thông Tin — Cybersecurity" },
    { url: "https://images2.thanhnien.vn/528068263637045248/2024/2/4/fptu-da-nang-02-1707012458234479740570.jpg", cap: "Toà Gamma — FPT University Đà Nẵng" },
    { url: "https://chungta.vn/uploaded/nguyennhung/2023_08_18/3_CTMG.jpg", cap: "Sinh viên FPT với nhạc cụ dân tộc" },
  ],
  canteen: [
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg", cap: "Cantin FPT University — Khu ẩm thực sinh viên" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/campus-dn-1-scaled.jpg", cap: "Toàn cảnh campus từ trên cao — Cantin gần hồ nước" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/sinh-vien-fpt-dn.jpg", cap: "Sinh viên FPT giao lưu tại khu vực Cantin" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/06/campus-da-nang-3.jpg", cap: "Không gian xanh quanh khu Cantin" },
  ],
  "dorm-a": [
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/ktx-dn-scaled.jpg", cap: "Ký Túc Xá FPT University — Thiết kế hiện đại" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg", cap: "Toàn cảnh campus — KTX nằm trong khuôn viên" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/campus-dn-1-scaled.jpg", cap: "Aerial view campus FPT Đà Nẵng" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/sinh-vien-fpt-dn.jpg", cap: "Đời sống sinh viên FPT tại KTX" },
  ],
  "dorm-b": [
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/ktx-dn-scaled.jpg", cap: "KTX B — Khu vực yên tĩnh gần sân thể thao" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/06/vovinam-fpt-1.jpg", cap: "Sân thể thao ngay cạnh KTX B" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/campus-dn-1-scaled.jpg", cap: "Khuôn viên FPT University từ trên cao" },
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2024/01/sinh-vien-fpt-dn.jpg", cap: "Sinh viên FPT hoạt động thể thao" },
  ],
  "main-gate": [{ url: "https://images2.thanhnien.vn/528068263637045248/2024/2/4/fptu-da-nang-02-1707012458234479740570.jpg", cap: "Cổng chính FPT" }],
};

/* ──────── Color palette per building ──────── */
const PALETTES = {
  "alpha-tower":  { bg: "linear-gradient(180deg,#f8fafc 0%,#eef2ff 40%,#fff7ed 100%)", accent: "#f37021", accent2: "#2563eb", light: "rgba(243,112,33,.08)", lightBorder: "rgba(243,112,33,.12)" },
  "beta-tower":   { bg: "linear-gradient(180deg,#f8fafc 0%,#f5f3ff 40%,#faf5ff 100%)", accent: "#7c3aed", accent2: "#8b5cf6", light: "rgba(124,58,237,.08)", lightBorder: "rgba(124,58,237,.12)" },
  "gamma-tower":  { bg: "linear-gradient(180deg,#f8fafc 0%,#fff7ed 40%,#fef3c7 100%)", accent: "#ea580c", accent2: "#f59e0b", light: "rgba(234,88,12,.08)", lightBorder: "rgba(234,88,12,.12)" },
  canteen:        { bg: "linear-gradient(180deg,#f8fafc 0%,#f0fdf4 40%,#ecfdf5 100%)", accent: "#16a34a", accent2: "#22c55e", light: "rgba(22,163,74,.08)", lightBorder: "rgba(22,163,74,.12)" },
  "dorm-a":       { bg: "linear-gradient(180deg,#f8fafc 0%,#fefce8 40%,#fff7ed 100%)", accent: "#ca8a04", accent2: "#eab308", light: "rgba(202,138,4,.08)", lightBorder: "rgba(202,138,4,.12)" },
  "dorm-b":       { bg: "linear-gradient(180deg,#f8fafc 0%,#fffbeb 40%,#fff7ed 100%)", accent: "#d97706", accent2: "#f59e0b", light: "rgba(217,119,6,.08)", lightBorder: "rgba(217,119,6,.12)" },
};

export default function BuildingLandingPage({ buildingId, onClose }) {
  if (buildingId === "main-gate") return <MainGateLanding onClose={onClose} />;

  const [exit, setExit] = useState(false);
  const [sY, setSY] = useState(0);
  const [imgErr, setImgErr] = useState({});
  const [imgIdx, setImgIdx] = useState(0);
  const ref = useRef(null);
  const b = BUILDING_DATA[buildingId];
  if (!b) return null;
  const imgs = IMGS[buildingId] || [];
  const isG = buildingId === "gamma-tower";
  const isA = buildingId === "alpha-tower";
  const P = PALETTES[buildingId] || PALETTES["alpha-tower"];
  const ac = P.accent;

  const close = () => { setExit(true); setTimeout(onClose, 400); };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => setSY(el.scrollTop);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (imgs.length <= 1) return;
    const t = setInterval(() => setImgIdx(i => (i + 1) % imgs.length), 5000);
    return () => clearInterval(t);
  }, [imgs.length]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('bVisible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    const el = ref.current;
    if (!el) return;
    setTimeout(() => {
      el.querySelectorAll('.bReveal').forEach(node => observer.observe(node));
    }, 100);
    return () => observer.disconnect();
  }, []);

  const typeColor = (t) => ({class:"#2563eb",lab:"#7c3aed",luk:"#ea580c",music:"#d97706",activity:"#16a34a",personal:"#64748b",break:"#94a3b8",meal:"#16a34a",social:"#ea580c",study:"#2563eb",project:"#7c3aed",practice:"#ca8a04",english:"#ea580c",workshop:"#7c3aed",event:"#16a34a"})[t] || ac;

  return (
    <div ref={ref} className="bp" style={{
      position:"fixed",inset:0,zIndex:100,overflowY:"auto",overflowX:"hidden",
      background:P.bg,
      opacity:exit?0:1,transform:exit?"scale(.97)":"scale(1)",
      transition:"all .4s cubic-bezier(.4,0,.2,1)",scrollBehavior:"smooth",
    }}>
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
.bDiv{width:48px;height:3px;border-radius:2px;margin:0 auto 16px;background:linear-gradient(90deg,transparent,${ac},transparent)}
.bIC{position:relative;overflow:hidden;border-radius:14px;border:1px solid rgba(0,0,0,.06);box-shadow:0 2px 8px rgba(0,0,0,.06)}
.bIC img{width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.4,0,.2,1)}
.bIC:hover img{transform:scale(1.04)}
      `}</style>

      {/* NAV */}
      <nav style={{
        position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 clamp(16px,4vw,40px)",height:60,
        background:sY>40?"rgba(255,255,255,.92)":"transparent",
        backdropFilter:sY>40?"blur(20px) saturate(1.5)":"none",
        borderBottom:sY>40?"1px solid rgba(0,0,0,.06)":"none",transition:"all .3s",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${ac},${P.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:`0 2px 12px ${ac}30`,color:"#fff"}}>{b.emoji}</div>
          <span style={{fontSize:14,fontWeight:800,color:ac,letterSpacing:.3}}>{b.name.toUpperCase()}</span>
        </div>
        <button onClick={close} style={{
          background:P.light,border:`1px solid ${P.lightBorder}`,color:ac,
          borderRadius:10,padding:"8px 20px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .25s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background=ac;e.currentTarget.style.color="#fff"}}
          onMouseLeave={e=>{e.currentTarget.style.background=P.light;e.currentTarget.style.color=ac}}
        >← Quay lại Game</button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{position:"relative",overflow:"hidden",padding:"48px clamp(24px,6vw,80px) 40px"}}>
        <div style={{position:"absolute",top:-80,right:-80,width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${ac}08,transparent 70%)`}}/>
        <div style={{position:"absolute",bottom:-60,left:-60,width:220,height:220,borderRadius:"50%",background:`radial-gradient(circle,${P.accent2}06,transparent 70%)`}}/>

        <div style={{maxWidth:1080,margin:"0 auto",display:"grid",gridTemplateColumns:imgs.length>0?"1fr 1fr":"1fr",gap:48,alignItems:"center"}}>
          <div className="bF">
            {isG && <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
              <div className="bBdg" style={{background:P.light,color:ac,border:`1px solid ${P.lightBorder}`}}>🌍 LUK Global</div>
              <div className="bBdg" style={{background:"rgba(217,119,6,.08)",color:"#d97706",border:"1px solid rgba(217,119,6,.15)"}}>🎼 Nhạc Cụ Dân Tộc</div>
            </div>}
            {isA && <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
              <div className="bBdg" style={{background:P.light,color:ac,border:`1px solid ${P.lightBorder}`}}>🇬🇧 English Lv5-6</div>
              <div className="bBdg" style={{background:"rgba(124,58,237,.08)",color:"#7c3aed",border:"1px solid rgba(124,58,237,.15)"}}>🎤 Workshop & Events</div>
            </div>}
            {!isG && !isA && <div className="bBdg" style={{background:P.light,color:ac,border:`1px solid ${P.lightBorder}`,marginBottom:20}}>{b.emoji} {b.subtitle}</div>}

            <h1 style={{fontSize:"clamp(32px,5vw,52px)",fontWeight:900,color:"#0f172a",lineHeight:1.1,marginBottom:14,letterSpacing:"-.02em"}}>
              {b.name.split(" ")[0]}<br/>
              <span style={{background:`linear-gradient(135deg,${ac},${P.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{b.name.split(" ").slice(1).join(" ") || b.name}</span>
            </h1>
            <p style={{fontSize:"clamp(15px,2vw,18px)",fontWeight:700,marginBottom:16,color:ac}}>{b.tagline}</p>
            <p style={{color:"#64748b",fontSize:15,lineHeight:1.8,maxWidth:520,marginBottom:28}}>{b.description}</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a href="#schedule" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 32px",borderRadius:12,background:`linear-gradient(135deg,${ac},${P.accent2})`,color:"#fff",fontSize:14,fontWeight:700,textDecoration:"none",boxShadow:`0 4px 20px ${ac}30`,transition:"all .25s"}}>📅 Lịch Trình 1 Ngày</a>
              {isG && <a href="#luk" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 32px",borderRadius:12,color:ac,border:`1.5px solid ${P.lightBorder}`,background:P.light,fontSize:14,fontWeight:600,textDecoration:"none",transition:"all .25s"}}>🌍 LUK Global</a>}
            </div>
          </div>

          {imgs.length>0 && <div className="bF" style={{animationDelay:".2s"}}>
            <div style={{position:"relative",borderRadius:20,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,.1)",aspectRatio:"4/3"}}>
              {imgs.map((img,i)=>(
                <img key={i} src={img.url} alt={img.cap}
                  onError={()=>setImgErr(p=>({...p,[img.url]:true}))}
                  style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",
                    opacity:i===imgIdx&&!imgErr[img.url]?1:0,transition:"opacity 1.2s ease",
                  }}/>
              ))}
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 50%,rgba(0,0,0,.4))"}}/>
              <div style={{position:"absolute",bottom:14,left:14,right:14}}>
                <div style={{background:"rgba(255,255,255,.15)",backdropFilter:"blur(12px)",borderRadius:10,padding:"10px 14px",border:"1px solid rgba(255,255,255,.2)"}}>
                  <p style={{color:"#fff",fontSize:12,fontWeight:600,margin:0}}>{imgs[imgIdx]?.cap}</p>
                </div>
              </div>
            </div>
            {imgs.length>1 && <div style={{display:"flex",gap:6,marginTop:14,justifyContent:"center"}}>
              {imgs.map((_,i)=><button key={i} onClick={()=>setImgIdx(i)} style={{
                width:i===imgIdx?28:8,height:4,borderRadius:2,border:"none",cursor:"pointer",
                background:i===imgIdx?ac:"rgba(0,0,0,.12)",transition:"all .4s",
              }}/>)}
            </div>}
          </div>}
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      {imgs.length>2 && <section style={{padding:"0 clamp(16px,4vw,40px) 48px"}}>
        <div style={{maxWidth:1080,margin:"0 auto",display:"grid",gridTemplateColumns:`repeat(${Math.min(imgs.length,4)},1fr)`,gap:10}}>
          {imgs.map((img,i)=>(
            <div key={i} className="bIC" onClick={()=>setImgIdx(i)}
              style={{height:140,cursor:"pointer",outline:i===imgIdx?`2px solid ${ac}`:"none",outlineOffset:2,borderRadius:12}}>
              {!imgErr[img.url]?<>
                <img src={img.url} alt={img.cap} onError={()=>setImgErr(p=>({...p,[img.url]:true}))}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(0,0,0,.7))"}}/>
                <p style={{position:"absolute",bottom:8,left:10,right:10,fontSize:10,color:"#fff",fontWeight:500,zIndex:2}}>{img.cap}</p>
              </>:<div style={{width:"100%",height:"100%",background:P.light,display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",fontSize:11}}>📷 {img.cap}</div>}
            </div>
          ))}
        </div>
      </section>}

      {/* ═══ STATS HIGHLIGHTS ═══ */}
      {b.welcomeHighlights && <section style={{padding:"0 clamp(16px,4vw,40px) 48px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {b.welcomeHighlights.map((h,i) => (
            <div key={i} className="bCard bReveal" data-delay={i+1} style={{padding:"24px 18px",textAlign:"center"}}>
              <div style={{width:44,height:44,borderRadius:12,margin:"0 auto 10px",background:`linear-gradient(135deg,${ac}12,${ac}04)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{h.icon}</div>
              <div style={{fontSize:26,fontWeight:900,color:ac,marginBottom:2}}>{h.stat}</div>
              <div style={{fontSize:12,fontWeight:700,color:"#1e293b",marginBottom:3}}>{h.label}</div>
              <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.4}}>{h.desc}</div>
            </div>
          ))}
        </div>
      </section>}

      {/* ═══ DAILY SCHEDULE ═══ */}
      <section id="schedule" style={{background:"rgba(255,255,255,.5)",borderTop:"1px solid rgba(0,0,0,.04)",borderBottom:"1px solid rgba(0,0,0,.04)"}}>
        <div className="bSec">
          <div className="bReveal" style={{textAlign:"center",marginBottom:48}}>
            <div className="bBdg" style={{background:P.light,color:ac,border:`1px solid ${P.lightBorder}`,marginBottom:16}}>📅 MỘT NGÀY CỦA SINH VIÊN FPT</div>
            <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:8}}>
              Lịch Trình Tại <span style={{color:ac}}>{b.name}</span>
            </h2>
            <div className="bDiv"/>
            <p style={{color:"#64748b",fontSize:14,maxWidth:560,margin:"0 auto",lineHeight:1.7}}>Theo chân sinh viên FPT trải nghiệm một ngày học tập tại Đà Nẵng</p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:12}}>
            {b.dailySchedule.map((s,i)=>{
              const c=typeColor(s.type);
              return <div key={i} className="bReveal" data-delay={Math.min(i%4+1,5)} style={{display:"flex",gap:14}}>
                <div style={{width:52,height:52,borderRadius:14,flexShrink:0,background:"#fff",border:`2px solid ${c}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>{s.emoji}</div>
                <div className="bCard" style={{flex:1,padding:"14px 20px",borderLeft:`3px solid ${c}50`}}>
                  <div style={{fontSize:11,fontWeight:700,color:c,letterSpacing:.5,marginBottom:3}}>{s.time}</div>
                  <div style={{fontSize:14,fontWeight:600,color:"#1e293b",lineHeight:1.5}}>{s.activity}</div>
                </div>
              </div>;
            })}
          </div>
        </div>
      </section>

      {/* ═══ ALPHA: ENGLISH LV5-6 ═══ */}
      {isA&&b.englishLv56&&<section id="english" style={{borderTop:"1px solid rgba(0,0,0,.04)"}}>
        <div className="bSec">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="bBdg" style={{background:"rgba(37,99,235,.06)",color:"#2563eb",border:"1px solid rgba(37,99,235,.12)",marginBottom:16}}>🇬🇧 ENGLISH WITH NATIVE TEACHERS</div>
            <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:8}}>
              English <span style={{color:ac}}>Level 5 & 6</span>
            </h2>
            <div className="bDiv"/>
            <p style={{color:"#64748b",fontSize:14,maxWidth:540,margin:"0 auto",lineHeight:1.8}}>{b.englishLv56.description}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:36}}>
            {b.englishLv56.levels.map((l,i)=>(
              <div key={l.name} className="bCard bF" style={{padding:"32px 24px",borderTop:`4px solid ${l.color}`,animationDelay:`${i*.15}s`,background:`linear-gradient(180deg,${l.color}06,rgba(255,255,255,.9))`}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <div style={{width:44,height:44,borderRadius:12,background:`${l.color}12`,border:`2px solid ${l.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:l.color}}>L{l.level}</div>
                  <div style={{fontSize:18,fontWeight:800,color:l.color}}>{l.name}</div>
                </div>
                <p style={{fontSize:13,color:"#64748b",lineHeight:1.7}}>{l.desc}</p>
              </div>
            ))}
          </div>
          <h3 style={{fontSize:16,fontWeight:700,color:"#0f172a",marginBottom:16,textAlign:"center"}}>👨‍🏫 Đội Ngũ Giảng Viên Quốc Tế</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:36}}>
            {b.englishLv56.teachers.map((t,i)=>(
              <div key={t.name} className="bCard bF" style={{textAlign:"center",padding:"28px 14px",animationDelay:`${i*.1}s`}}>
                <div style={{width:52,height:52,borderRadius:"50%",margin:"0 auto 12px",background:`linear-gradient(135deg,${ac},${P.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:`0 4px 16px ${ac}25`,color:"#fff"}}>👨‍🏫</div>
                <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:11,color:ac,fontWeight:600,marginBottom:4}}>{t.country}</div>
                <div style={{fontSize:11,color:"#64748b",lineHeight:1.4}}>{t.specialty}</div>
                <div style={{fontSize:10,color:"#94a3b8",marginTop:4}}>Kinh nghiệm: {t.exp}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {b.englishLv56.highlights.map((h,i)=>(
              <div key={i} className="bCard" style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:28,height:28,borderRadius:8,background:P.light,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:ac,fontSize:13,fontWeight:900}}>✓</span>
                </div>
                <span style={{fontSize:13,color:"#475569",lineHeight:1.5}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ ALPHA: EVENTS & WORKSHOPS ═══ */}
      {isA&&b.events&&<section style={{background:"rgba(255,255,255,.4)",borderTop:"1px solid rgba(0,0,0,.04)"}}>
        <div className="bSec">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="bBdg" style={{background:P.light,color:ac,border:`1px solid ${P.lightBorder}`,marginBottom:16}}>🏮 HỘI LÀNG & ĐẠI NHẠC HỘI</div>
            <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:8}}>
              Hội Làng FPT & <span style={{color:ac}}>Đại Nhạc Hội</span>
            </h2>
            <div className="bDiv"/>
            <p style={{color:"#64748b",fontSize:14,maxWidth:540,margin:"0 auto",lineHeight:1.8}}>{b.events.description}</p>
          </div>

          {b.events.hoiLang && <div style={{
            background:"linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,247,237,.8))",
            border:`2px solid ${ac}20`,borderRadius:20,padding:"36px 32px",marginBottom:36,
            position:"relative",overflow:"hidden",animation:"bGlow 3s ease infinite",
          }}>
            <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:`${ac}06`}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16,flexWrap:"wrap"}}>
                <div style={{fontSize:48,animation:"bFl 3s ease-in-out infinite",filter:`drop-shadow(0 4px 12px ${ac}30)`}}>🏮</div>
                <div>
                  <div className="bBdg" style={{background:ac,color:"#fff",marginBottom:8,fontWeight:800}}>★ SỰ KIỆN LỚN NHẤT NĂM</div>
                  <h3 style={{fontSize:20,fontWeight:900,color:"#0f172a"}}>Hội Làng FPT — Lễ Hội Huyền Thoại</h3>
                </div>
              </div>
              <p style={{fontSize:13,color:"#475569",lineHeight:1.8,marginBottom:20}}>{b.events.hoiLang.description}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {b.events.hoiLang.activities.map((a,i)=>(
                  <div key={a.name} className="bCard bF" style={{textAlign:"center",padding:"16px 12px",animationDelay:`${i*.08}s`}}>
                    <div style={{fontSize:28,marginBottom:6}}>{a.emoji}</div>
                    <div style={{fontSize:12,fontWeight:700,color:"#0f172a",marginBottom:3}}>{a.name}</div>
                    <div style={{fontSize:10,color:"#64748b",lineHeight:1.4}}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>}

          <h3 style={{fontSize:16,fontWeight:700,color:"#0f172a",marginBottom:16,textAlign:"center"}}>🎤 Sự Kiện & Ca Sĩ Nổi Tiếng</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:36}}>
            {b.events.upcomingEvents.map((ev,i)=>(
              <div key={ev.name} className="bCard bF" style={{padding:"20px 18px",borderLeft:`4px solid ${ev.color}`,animationDelay:`${i*.1}s`,display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:44,height:44,borderRadius:12,background:`${ev.color}10`,border:`1.5px solid ${ev.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{ev.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:3}}>{ev.name}</div>
                  <div style={{fontSize:11,color:ev.color,fontWeight:600,marginBottom:3}}>📅 {ev.date}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>{ev.speaker}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {b.events.highlights.map((h,i)=>(
              <div key={i} className="bCard" style={{padding:"14px",display:"flex",alignItems:"center",gap:8,textAlign:"center",flexDirection:"column"}}>
                <span style={{fontSize:16}}>⚡</span>
                <span style={{fontSize:12,color:"#475569",lineHeight:1.4}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ GAMMA: LUK GLOBAL ═══ */}
      {isG&&b.lukGlobal&&<section id="luk" style={{borderTop:"1px solid rgba(0,0,0,.04)"}}>
        <div className="bSec">
          <div className="bReveal" style={{textAlign:"center",marginBottom:48}}>
            <div className="bBdg" style={{background:P.light,color:ac,border:`1px solid ${P.lightBorder}`,marginBottom:16}}>🌍 LITTLE UK GLOBAL</div>
            <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:8}}>
              LUK <span style={{color:ac}}>GLOBAL</span>
            </h2>
            <div className="bDiv"/>
            <p style={{color:"#64748b",fontSize:14,maxWidth:600,margin:"0 auto",lineHeight:1.8}}>{b.lukGlobal.description}</p>
          </div>

          {/* Hero Banner */}
          {b.lukGlobal.gallery && b.lukGlobal.gallery.length > 0 && (
            <div className="bReveal" style={{marginBottom:36,borderRadius:20,overflow:"hidden",position:"relative",aspectRatio:"21/9",boxShadow:"0 12px 40px rgba(0,0,0,.1)"}}>
              <img src={b.lukGlobal.gallery[0].url} alt={b.lukGlobal.gallery[0].cap}
                style={{width:"100%",height:"100%",objectFit:"cover"}}
                onError={e=>{e.target.parentElement.style.display="none"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 30%,rgba(0,0,0,.6))"}}/>
              <div style={{position:"absolute",bottom:24,left:28,right:28,zIndex:2}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:100,background:"rgba(243,112,33,.9)",color:"#fff",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:8}}>🌍 LUK GLOBAL</div>
                <h3 style={{color:"#fff",fontSize:22,fontWeight:800}}>{b.lukGlobal.gallery[0].cap}</h3>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          {b.lukGlobal.gallery && b.lukGlobal.gallery.length > 1 && (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14,marginBottom:36}}>
              {b.lukGlobal.gallery.slice(1).map((g,i) => (
                <div key={i} className="bReveal" data-delay={Math.min(i+1,5)} style={{position:"relative",borderRadius:16,overflow:"hidden",aspectRatio:"4/3",boxShadow:"0 4px 20px rgba(0,0,0,.08)",cursor:"pointer"}}>
                  <img src={g.url} alt={g.cap}
                    style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s"}}
                    onMouseOver={e=>e.target.style.transform="scale(1.06)"}
                    onMouseOut={e=>e.target.style.transform="scale(1)"}
                    onError={e=>{e.target.parentElement.style.background="#f1f5f9";e.target.style.display="none"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(0,0,0,.65))"}}/>
                  <div style={{position:"absolute",top:12,left:12,zIndex:2}}>
                    <span style={{padding:"3px 10px",borderRadius:100,background:"rgba(255,255,255,.9)",fontSize:10,fontWeight:700,color:ac,letterSpacing:.5}}>{g.tag}</span>
                  </div>
                  <div style={{position:"absolute",bottom:12,left:14,right:14,zIndex:2}}>
                    <p style={{color:"#fff",fontSize:12,fontWeight:600,lineHeight:1.4}}>{g.cap}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Card */}
          <div className="bReveal" style={{
            background:"linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,247,237,.6))",
            border:`1px solid ${ac}15`,borderRadius:20,padding:"32px 28px",marginBottom:36,
            display:"flex",alignItems:"center",gap:24,flexWrap:"wrap",
          }}>
            <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(135deg,${ac},${P.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,boxShadow:`0 4px 16px ${ac}25`,color:"#fff"}}>🎓</div>
            <div style={{flex:1,minWidth:240}}>
              <h3 style={{fontSize:17,fontWeight:800,color:"#0f172a",marginBottom:6}}>100% Sinh Viên Năm Nhất Học LUK Global</h3>
              <p style={{fontSize:13,color:"#64748b",lineHeight:1.7}}>Chương trình tiếng Anh bắt buộc giúp sinh viên FPT tự tin giao tiếp quốc tế.</p>
            </div>
          </div>

          <h3 className="bReveal" style={{fontSize:16,fontWeight:700,color:"#0f172a",marginBottom:16,textAlign:"center"}}>🎯 4 Cấp Độ Tiếng Anh</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:36}}>
            {b.lukGlobal.levels.map((l,i)=>(
              <div key={l.name} className="bCard bReveal" data-delay={Math.min(i+1,4)} style={{textAlign:"center",padding:"28px 14px",borderTop:`3px solid ${l.color}`,background:`linear-gradient(180deg,${l.color}06,rgba(255,255,255,.9))`}}>
                <div style={{width:36,height:36,borderRadius:10,margin:"0 auto 12px",background:`${l.color}12`,border:`1.5px solid ${l.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:l.color}}>L{l.level}</div>
                <div style={{fontSize:16,fontWeight:900,color:l.color,marginBottom:6}}>{l.name}</div>
                <div style={{fontSize:11,color:"#64748b",lineHeight:1.6}}>{l.desc}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {b.lukGlobal.highlights.map((h,i)=>(
              <div key={i} className="bCard bReveal" data-delay={Math.min(i+1,5)} style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:28,height:28,borderRadius:8,background:P.light,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:ac,fontSize:13,fontWeight:900}}>✓</span>
                </div>
                <span style={{fontSize:13,color:"#475569",lineHeight:1.5}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ GAMMA: ĐÀN TỲ BÀ ═══ */}
      {isG&&b.tyBa&&<section style={{background:"rgba(255,251,235,.4)",borderTop:"1px solid rgba(0,0,0,.04)"}}>
        <div className="bSec">
          <div style={{textAlign:"center",marginBottom:48}}>
            <div className="bBdg" style={{background:"rgba(217,119,6,.08)",color:"#d97706",border:"1px solid rgba(217,119,6,.12)",marginBottom:16}}>🎼 NHẠC CỤ DÂN TỘC</div>
            <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:8}}>
              Đàn Tỳ Bà & <span style={{color:"#d97706"}}>Nhạc Cụ Truyền Thống</span>
            </h2>
            <div style={{width:48,height:3,borderRadius:2,margin:"0 auto 16px",background:"linear-gradient(90deg,transparent,#d97706,transparent)"}}/>
            <p style={{color:"#64748b",fontSize:14,maxWidth:540,margin:"0 auto",lineHeight:1.8}}>{b.tyBa.description}</p>
          </div>

          <div className="bReveal" style={{
            background:"linear-gradient(135deg,rgba(255,255,255,.9),rgba(254,243,199,.5))",
            border:"2px solid rgba(217,119,6,.15)",borderRadius:20,padding:"36px 32px",marginBottom:32,
            display:"flex",alignItems:"center",gap:28,flexWrap:"wrap",position:"relative",overflow:"hidden",
          }}>
            <div style={{position:"absolute",top:-40,right:-40,width:150,height:150,borderRadius:"50%",background:"rgba(217,119,6,.05)"}}/>
            <div style={{width:160,height:200,borderRadius:16,overflow:"hidden",flexShrink:0,position:"relative",zIndex:1,border:"2px solid rgba(217,119,6,.15)",boxShadow:"0 8px 32px rgba(217,119,6,.15)",animation:"bFl 3s ease-in-out infinite"}}>
              <img src="/dan-ty-ba.png" alt="Đàn Tỳ Bà" style={{width:"100%",height:"100%",objectFit:"cover"}}
                onError={e=>{e.target.parentElement.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:64px;background:rgba(217,119,6,.04)">🎼</div>'}}/>
            </div>
            <div style={{flex:1,minWidth:240,position:"relative",zIndex:1}}>
              <div className="bBdg" style={{background:"#d97706",color:"#fff",marginBottom:12,fontWeight:800}}>★ NỔI BẬT — ĐÀN TỲ BÀ</div>
              <h3 style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:8}}>Đàn Tỳ Bà — 4 Dây Truyền Thống</h3>
              <p style={{fontSize:13,color:"#475569",lineHeight:1.8}}>Lute truyền thống Việt Nam với âm thanh trong trẻo, du dương. FPT University tiên phong đưa nhạc cụ dân tộc vào giảng dạy từ 2014.</p>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:36}}>
            {b.tyBa.instruments.filter(x=>!x.featured).map((inst,i)=>(
              <div key={inst.name} className="bCard bReveal" data-delay={Math.min(i+1,5)} style={{textAlign:"center",padding:"20px 14px",overflow:"hidden"}}>
                {inst.img ? (
                  <div style={{width:120,height:120,margin:"0 auto 12px",borderRadius:14,overflow:"hidden",background:"rgba(217,119,6,.04)",border:"1px solid rgba(217,119,6,.1)"}}>
                    <img src={inst.img} alt={inst.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s"}}
                      onMouseOver={e=>e.target.style.transform="scale(1.1)"}
                      onMouseOut={e=>e.target.style.transform="scale(1)"}
                      onError={e=>{e.target.style.display="none";e.target.parentElement.innerHTML=`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:48px">${inst.emoji}</div>`}}/>
                  </div>
                ) : <div style={{fontSize:48,marginBottom:12}}>{inst.emoji}</div>}
                <div style={{fontSize:14,fontWeight:700,color:"#0f172a",marginBottom:4}}>{inst.name}</div>
                <div style={{fontSize:12,color:"#64748b",lineHeight:1.5}}>{inst.desc}</div>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
            {[{n:"2014",l:"Năm bắt đầu",c:"#ea580c"},{n:"46",l:"Giảng viên",c:"#d97706"},{n:"8",l:"Loại nhạc cụ",c:"#ca8a04"},{n:"62%",l:"SV tham gia",c:"#b45309"}].map(s=>(
              <div key={s.l} className="bCard" style={{textAlign:"center",padding:20}}>
                <div style={{fontSize:28,fontWeight:900,color:s.c,marginBottom:4}}>{s.n}</div>
                <div style={{fontSize:11,color:"#64748b",fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {b.tyBa.highlights.map((h,i)=>(
              <div key={i} className="bCard" style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:16}}>🎵</span>
                <span style={{fontSize:13,color:"#475569"}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{borderTop:"1px solid rgba(0,0,0,.04)"}}>
        <div className="bSec">
          <div className="bReveal" style={{textAlign:"center",marginBottom:48}}>
            <h2 style={{fontSize:28,fontWeight:900,color:"#0f172a",marginBottom:8}}>Tiện Ích <span style={{color:ac}}>{b.name}</span></h2>
            <div className="bDiv"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
            {b.features.map((f,i)=>(
              <div key={f.title} className="bCard bReveal" data-delay={Math.min(i+1,5)} style={{textAlign:"center",padding:f.img?"0":"32px 20px",overflow:"hidden"}}>
                {f.img ? (
                  <div style={{width:"100%",height:160,overflow:"hidden",borderRadius:"16px 16px 0 0"}}>
                    <img src={f.img} alt={f.title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s"}}
                      onMouseOver={e=>e.target.style.transform="scale(1.08)"}
                      onMouseOut={e=>e.target.style.transform="scale(1)"}
                      onError={e=>{e.target.parentElement.innerHTML=`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:52px;background:${ac}08">${f.icon}</div>`}}/>
                  </div>
                ) : (
                  <div style={{width:52,height:52,borderRadius:14,margin:"0 auto 14px",background:`linear-gradient(135deg,${ac}12,${ac}04)`,border:`1px solid ${ac}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{f.icon}</div>
                )}
                <div style={{padding:f.img?"16px 20px 20px":"0"}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:6}}>{f.title}</div>
                  <div style={{fontSize:13,color:"#64748b",lineHeight:1.6}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FUN FACTS ═══ */}
      <section style={{background:"rgba(255,247,237,.5)",borderTop:"1px solid rgba(0,0,0,.04)"}}>
        <div className="bSec" style={{paddingTop:48,paddingBottom:48}}>
          <h3 className="bReveal" style={{fontSize:22,fontWeight:800,color:"#0f172a",marginBottom:24,textAlign:"center"}}>💡 Bạn Có Biết?</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:12}}>
            {b.funFacts.map((f,i)=>(
              <div key={i} className="bCard bReveal" data-delay={Math.min(i+1,5)} style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14,borderLeft:`3px solid ${ac}50`}}>
                <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${ac},${P.accent2})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,flexShrink:0}}>#{i+1}</div>
                <span style={{fontSize:14,color:"#475569",lineHeight:1.6,fontWeight:500}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{borderTop:"1px solid rgba(0,0,0,.04)",background:"linear-gradient(180deg,transparent,rgba(243,112,33,.03))"}}>
        <div className="bSec" style={{textAlign:"center",paddingTop:64,paddingBottom:72}}>
          <div style={{width:72,height:72,borderRadius:18,margin:"0 auto 20px",background:`linear-gradient(135deg,${ac},${P.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,boxShadow:`0 8px 32px ${ac}25`,animation:"bFl 3s ease-in-out infinite",color:"#fff"}}>{b.emoji}</div>
          <h2 style={{fontSize:28,fontWeight:900,color:"#0f172a",marginBottom:10}}>Sẵn sàng khám phá?</h2>
          <p style={{color:"#64748b",fontSize:14,maxWidth:400,margin:"0 auto 28px",lineHeight:1.7}}>Quay lại game để tiếp tục hành trình sinh viên FPT University!</p>
          <button onClick={close} style={{
            padding:"16px 48px",borderRadius:14,border:"none",
            background:`linear-gradient(135deg,${ac},${P.accent2})`,color:"#fff",fontSize:15,fontWeight:700,
            cursor:"pointer",boxShadow:`0 4px 24px ${ac}30`,transition:"all .25s",
          }}>🎮 Quay Lại Game</button>
          <p style={{color:"#cbd5e1",fontSize:11,marginTop:28}}>© 2026 FPT University Đà Nẵng — Student Life Simulator</p>
        </div>
      </section>
    </div>
  );
}
