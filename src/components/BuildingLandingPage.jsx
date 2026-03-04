import { useState, useEffect, useRef } from "react";
import { BUILDING_DATA } from "../data/buildingData";

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
    { url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg", cap: "Khu Lab Beta Tower" },
    { url: "https://dnuni.fpt.edu.vn/wp-content/uploads/2024/09/z5825397493887_e21070a16a917dab8de1bbfb8cfca0a6-1024x576.jpg", cap: "Phòng Lab hiện đại" },
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
  canteen: [{ url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg", cap: "Cantin FPT" }],
  "dorm-a": [{ url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg", cap: "KTX FPT" }],
  "dorm-b": [{ url: "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/03/Dai-hoc-FPT-Da-Nang.jpg", cap: "KTX B" }],
  "main-gate": [{ url: "https://images2.thanhnien.vn/528068263637045248/2024/2/4/fptu-da-nang-02-1707012458234479740570.jpg", cap: "Cổng chính FPT" }],
};

export default function BuildingLandingPage({ buildingId, onClose }) {
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
  const ac = b.accentColor;

  const close = () => { setExit(true); setTimeout(onClose, 450); };

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

  const typeColor = (t) => ({ class:"#3b82f6",lab:"#8b5cf6",luk:"#f37021",music:"#f59e0b",activity:"#22c55e",personal:"#64748b",break:"#475569",meal:"#22c55e",social:"#f37021",study:"#3b82f6",project:"#8b5cf6",practice:"#eab308",english:"#f37021",workshop:"#8b5cf6",event:"#22c55e" })[t] || ac;

  return (
    <div ref={ref} className="gp" style={{
      position:"fixed",inset:0,zIndex:100,overflowY:"auto",overflowX:"hidden",
      background:"#080b12",
      opacity:exit?0:1,transform:exit?"scale(.96)":"scale(1)",
      transition:"all .45s cubic-bezier(.4,0,.2,1)",scrollBehavior:"smooth",
    }}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
.gp{font-family:'Inter',system-ui,sans-serif;color:#e2e8f0;-webkit-font-smoothing:antialiased}
.gp *{box-sizing:border-box;margin:0;padding:0}
@keyframes gFU{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes gFl{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes gSh{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes gPl{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes gGlow{0%,100%{box-shadow:0 0 20px #f3702130}50%{box-shadow:0 0 40px #f3702160}}
@keyframes gSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.gF{animation:gFU .65s ease both}
.gG{background:rgba(243,112,33,.04);border:1px solid rgba(243,112,33,.1);border-radius:16px;backdrop-filter:blur(16px);transition:all .3s cubic-bezier(.4,0,.2,1)}
.gG:hover{background:rgba(243,112,33,.08);border-color:rgba(243,112,33,.2);transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,.25)}
.gS{padding:80px clamp(20px,5vw,48px);max-width:1040px;margin:0 auto}
.gBdg{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase}
.gDiv{width:48px;height:3px;border-radius:2px;margin:0 auto 16px;background:linear-gradient(90deg,transparent,#f37021,transparent)}
.gIC{position:relative;overflow:hidden;border-radius:16px;border:1px solid rgba(255,255,255,.06)}
.gIC img{width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.4,0,.2,1)}
.gIC:hover img{transform:scale(1.04)}
      `}</style>

      {/* NAV */}
      <nav style={{
        position:"sticky",top:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 clamp(16px,4vw,40px)",height:56,
        background:sY>50?"rgba(8,11,18,.94)":"transparent",
        backdropFilter:sY>50?"blur(20px) saturate(1.8)":"none",
        borderBottom:sY>50?"1px solid rgba(243,112,33,.08)":"none",
        transition:"all .35s",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#f37021,#e85d10)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,boxShadow:"0 2px 10px #f3702140"}}>{b.emoji}</div>
          <span style={{fontSize:13,fontWeight:800,color:"#f37021",letterSpacing:.5}}>
            {b.name.toUpperCase()}
          </span>
        </div>
        <button onClick={close} style={{
          background:"rgba(243,112,33,.08)",border:"1px solid rgba(243,112,33,.15)",color:"#f37021",
          borderRadius:8,padding:"7px 18px",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .2s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background="#f37021";e.currentTarget.style.color="#fff"}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(243,112,33,.08)";e.currentTarget.style.color="#f37021"}}
        >← Quay lại Game</button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{position:"relative",minHeight:"92vh",display:"flex",alignItems:"flex-end",overflow:"hidden",paddingBottom:80}}>
        {/* BG Images */}
        {imgs.map((img,i)=>(
          <img key={i} src={img.url} alt={img.cap}
            onError={()=>setImgErr(p=>({...p,[img.url]:true}))}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",
              opacity:i===imgIdx&&!imgErr[img.url]?1:0,transition:"opacity 1.5s cubic-bezier(.4,0,.2,1)",
            }}/>
        ))}
        {/* Gradient overlays */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(8,11,18,.15) 0%,rgba(8,11,18,.5) 35%,rgba(8,11,18,.92) 70%,#080b12 100%)"}}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 90%,rgba(243,112,33,.12),transparent 55%)"}}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 80% 20%,rgba(243,112,33,.06),transparent 50%)"}}/>
        {/* Orange line accents */}
        <div style={{position:"absolute",top:0,left:"10%",width:1,height:"60%",background:"linear-gradient(to bottom,transparent,#f3702120,transparent)",opacity:.6}}/>
        <div style={{position:"absolute",top:"20%",right:"15%",width:1,height:"50%",background:"linear-gradient(to bottom,transparent,#f3702115,transparent)",opacity:.4}}/>

        {/* Content */}
        <div className="gF" style={{position:"relative",zIndex:2,padding:"0 clamp(28px,6vw,80px)",maxWidth:760}}>
          {isG && <div style={{display:"flex",gap:8,marginBottom:20}}>
            <div className="gBdg" style={{background:"rgba(243,112,33,.12)",color:"#f37021",border:"1px solid rgba(243,112,33,.25)"}}>🌍 LUK Global</div>
            <div className="gBdg" style={{background:"rgba(245,158,11,.12)",color:"#f59e0b",border:"1px solid rgba(245,158,11,.25)"}}>🎼 Nhạc Cụ Dân Tộc</div>
          </div>}
          {isA && <div style={{display:"flex",gap:8,marginBottom:20}}>
            <div className="gBdg" style={{background:"rgba(243,112,33,.12)",color:"#f37021",border:"1px solid rgba(243,112,33,.25)"}}>🇬🇧 English Lv5-6</div>
            <div className="gBdg" style={{background:"rgba(139,92,246,.12)",color:"#8b5cf6",border:"1px solid rgba(139,92,246,.25)"}}>🎤 Workshop & Events</div>
          </div>}
          {!isG && !isA && <div className="gBdg" style={{background:`${ac}18`,color:ac,border:`1px solid ${ac}30`,marginBottom:20}}>{b.emoji} {b.subtitle}</div>}

          <h1 style={{fontSize:"clamp(38px,7vw,72px)",fontWeight:900,color:"#fff",lineHeight:1.05,marginBottom:14,letterSpacing:"-.03em"}}>
            {b.name}
          </h1>
          <p style={{
            fontSize:"clamp(16px,2.5vw,22px)",fontWeight:700,marginBottom:20,
            background:"linear-gradient(90deg,#f37021,#ff8c42)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          }}>{b.tagline}</p>
          <p style={{color:"#94a3b8",fontSize:15,lineHeight:1.85,maxWidth:560,marginBottom:36}}>{b.description}</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
            <a href="#schedule" style={{
              display:"inline-flex",alignItems:"center",gap:8,padding:"14px 36px",borderRadius:12,
              background:"linear-gradient(135deg,#f37021,#e85d10)",color:"#fff",
              fontSize:14,fontWeight:700,textDecoration:"none",
              boxShadow:"0 4px 24px rgba(243,112,33,.4),0 0 0 1px rgba(243,112,33,.2)",transition:"all .25s",
            }}>📅 Lịch Trình 1 Ngày</a>
            {isG && <a href="#luk" style={{
              display:"inline-flex",alignItems:"center",gap:8,padding:"14px 36px",borderRadius:12,
              color:"#f37021",border:"1.5px solid rgba(243,112,33,.25)",background:"rgba(243,112,33,.06)",
              fontSize:14,fontWeight:600,textDecoration:"none",transition:"all .25s",
            }}>🌍 LUK Global</a>}
          </div>
          {/* Img dots */}
          {imgs.length>1 && <div style={{display:"flex",gap:6,marginTop:40}}>
            {imgs.map((_,i)=><button key={i} onClick={()=>setImgIdx(i)} style={{
              width:i===imgIdx?28:8,height:3,borderRadius:2,border:"none",cursor:"pointer",
              background:i===imgIdx?"#f37021":"rgba(255,255,255,.15)",transition:"all .4s",
            }}/>)}
          </div>}
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      {imgs.length>1 && <section style={{padding:"0 clamp(16px,4vw,40px) 64px"}}>
        <div style={{maxWidth:1040,margin:"0 auto",display:"grid",gridTemplateColumns:`repeat(${Math.min(imgs.length,4)},1fr)`,gap:10}}>
          {imgs.map((img,i)=>(
            <div key={i} className="gIC" onClick={()=>setImgIdx(i)}
              style={{height:160,cursor:"pointer",outline:i===imgIdx?"2px solid #f37021":"none",outlineOffset:2,borderRadius:14}}>
              {!imgErr[img.url]?<>
                <img src={img.url} alt={img.cap} onError={()=>setImgErr(p=>({...p,[img.url]:true}))}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(0,0,0,.8))"}}/>
                <p style={{position:"absolute",bottom:10,left:12,right:12,fontSize:10,color:"#fff",fontWeight:500,zIndex:2}}>{img.cap}</p>
              </>:<div style={{width:"100%",height:"100%",background:"rgba(243,112,33,.06)",display:"flex",alignItems:"center",justifyContent:"center",color:"#475569",fontSize:12}}>📷 {img.cap}</div>}
            </div>
          ))}
        </div>
      </section>}

      {/* ═══ DAILY SCHEDULE ═══ */}
      <section id="schedule" style={{background:"linear-gradient(180deg,rgba(243,112,33,.02),transparent)"}}>
        <div className="gS">
          <div style={{textAlign:"center",marginBottom:56}}>
            <div className="gBdg" style={{background:"rgba(243,112,33,.1)",color:"#f37021",border:"1px solid rgba(243,112,33,.2)",marginBottom:20}}>📅 MỘT NGÀY CỦA SINH VIÊN FPT</div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:"#fff",marginBottom:8}}>
              Lịch Trình Tại <span style={{color:"#f37021"}}>{b.name}</span>
            </h2>
            <div className="gDiv"/>
            <p style={{color:"#64748b",fontSize:14,maxWidth:460,margin:"0 auto",lineHeight:1.7}}>Theo chân sinh viên FPT trải nghiệm một ngày học tập tại Đà Nẵng</p>
          </div>

          <div style={{position:"relative",maxWidth:700,margin:"0 auto"}}>
            <div style={{position:"absolute",left:25,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,#f3702140,#f3702110,transparent)",borderRadius:1}}/>
            {b.dailySchedule.map((s,i)=>{
              const c=typeColor(s.type);
              return <div key={i} className="gF" style={{display:"flex",gap:16,marginBottom:10,animationDelay:`${i*.05}s`}}>
                <div style={{
                  width:52,height:52,borderRadius:14,flexShrink:0,zIndex:1,
                  background:`linear-gradient(135deg,${c}15,${c}05)`,border:`1.5px solid ${c}30`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                }}>{s.emoji}</div>
                <div className="gG" style={{flex:1,padding:"14px 20px",borderLeft:`3px solid ${c}40`}}>
                  <div style={{fontSize:11,fontWeight:700,color:c,letterSpacing:.5,marginBottom:3}}>{s.time}</div>
                  <div style={{fontSize:13,fontWeight:500,color:"#e2e8f0",lineHeight:1.5}}>{s.activity}</div>
                </div>
              </div>;
            })}
          </div>
        </div>
      </section>

      {/* ═══ ALPHA: ENGLISH LV5-6 ═══ */}
      {isA&&b.englishLv56&&<section id="english" style={{background:"linear-gradient(180deg,rgba(243,112,33,.03),transparent)",borderTop:"1px solid rgba(243,112,33,.06)"}}>
        <div className="gS">
          <div style={{textAlign:"center",marginBottom:56}}>
            <div className="gBdg" style={{background:"rgba(243,112,33,.1)",color:"#f37021",border:"1px solid rgba(243,112,33,.2)",marginBottom:20}}>🇬🇧 ENGLISH WITH NATIVE TEACHERS</div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:"#fff",marginBottom:8}}>
              English <span style={{color:"#f37021"}}>Level 5 & 6</span>
            </h2>
            <div className="gDiv"/>
            <p style={{color:"#94a3b8",fontSize:14,maxWidth:560,margin:"0 auto",lineHeight:1.8}}>{b.englishLv56.description}</p>
          </div>

          {/* 2 Levels */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:40}}>
            {b.englishLv56.levels.map((l,i)=>(
              <div key={l.name} className="gG gF" style={{padding:"36px 24px",borderTop:`4px solid ${l.color}`,animationDelay:`${i*.15}s`,background:`linear-gradient(180deg,${l.color}08,transparent)`}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                  <div style={{width:44,height:44,borderRadius:12,background:`${l.color}20`,border:`2px solid ${l.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:l.color}}>L{l.level}</div>
                  <div style={{fontSize:20,fontWeight:900,color:l.color}}>{l.name}</div>
                </div>
                <p style={{fontSize:13,color:"#94a3b8",lineHeight:1.7}}>{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Teachers */}
          <h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:16,textAlign:"center"}}>👨‍🏫 Đội Ngũ Giảng Viên Quốc Tế</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:40}}>
            {b.englishLv56.teachers.map((t,i)=>(
              <div key={t.name} className="gG gF" style={{textAlign:"center",padding:"28px 14px",animationDelay:`${i*.1}s`}}>
                <div style={{width:52,height:52,borderRadius:"50%",margin:"0 auto 12px",background:"linear-gradient(135deg,#f37021,#e85d10)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 4px 16px #f3702130"}}>👨‍🏫</div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:11,color:"#f37021",fontWeight:600,marginBottom:4}}>{t.country}</div>
                <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.4}}>{t.specialty}</div>
                <div style={{fontSize:10,color:"#64748b",marginTop:4}}>Kinh nghiệm: {t.exp}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {b.englishLv56.highlights.map((h,i)=>(
              <div key={i} className="gG" style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:28,height:28,borderRadius:8,background:"rgba(243,112,33,.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:"#f37021",fontSize:13,fontWeight:900}}>✓</span>
                </div>
                <span style={{fontSize:13,color:"#cbd5e1",lineHeight:1.5}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ ALPHA: EVENTS & WORKSHOPS ═══ */}
      {isA&&b.events&&<section style={{background:"linear-gradient(180deg,rgba(139,92,246,.03),transparent)",borderTop:"1px solid rgba(139,92,246,.06)"}}>
        <div className="gS">
          <div style={{textAlign:"center",marginBottom:56}}>
            <div className="gBdg" style={{background:"rgba(243,112,33,.1)",color:"#f37021",border:"1px solid rgba(243,112,33,.2)",marginBottom:20}}>🏮 HỘI LÀNG & ĐẠI NHẠC HỘI</div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:"#fff",marginBottom:8}}>
              Hội Làng FPT & <span style={{color:"#f37021"}}>Đại Nhạc Hội</span>
            </h2>
            <div className="gDiv"/>
            <p style={{color:"#94a3b8",fontSize:14,maxWidth:560,margin:"0 auto",lineHeight:1.8}}>{b.events.description}</p>
          </div>

          {/* Hội Làng Hero Banner */}
          {b.events.hoiLang && <div style={{
            background:"linear-gradient(135deg,rgba(243,112,33,.1),rgba(220,38,38,.06))",
            border:"1.5px solid rgba(243,112,33,.2)",borderRadius:20,padding:"40px 36px",marginBottom:40,
            position:"relative",overflow:"hidden",animation:"gGlow 3s ease infinite",
          }}>
            <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"rgba(243,112,33,.08)"}}/>
            <div style={{position:"absolute",bottom:-20,left:-20,width:100,height:100,borderRadius:"50%",background:"rgba(220,38,38,.06)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16,flexWrap:"wrap"}}>
                <div style={{fontSize:52,animation:"gFl 3s ease-in-out infinite",filter:"drop-shadow(0 4px 12px rgba(243,112,33,.4))"}}>🏮</div>
                <div>
                  <div className="gBdg" style={{background:"#f37021",color:"#fff",marginBottom:8,fontWeight:800}}>★ SỰ KIỆN LỚN NHẤT NĂM</div>
                  <h3 style={{fontSize:22,fontWeight:900,color:"#fff"}}>Hội Làng FPT — Lễ Hội Huyền Thoại</h3>
                </div>
              </div>
              <p style={{fontSize:13,color:"#cbd5e1",lineHeight:1.8,marginBottom:20}}>{b.events.hoiLang.description}</p>
              
              {/* Activities */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {b.events.hoiLang.activities.map((a,i)=>(
                  <div key={a.name} className="gF" style={{
                    background:"rgba(0,0,0,.2)",borderRadius:12,padding:"16px 14px",textAlign:"center",
                    border:"1px solid rgba(243,112,33,.1)",animationDelay:`${i*.08}s`,
                  }}>
                    <div style={{fontSize:28,marginBottom:6}}>{a.emoji}</div>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:3}}>{a.name}</div>
                    <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.4}}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>}

          {/* Upcoming Events */}
          <h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:16,textAlign:"center"}}>🎤 Sự Kiện & Ca Sĩ Nổi Tiếng</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:40}}>
            {b.events.upcomingEvents.map((ev,i)=>(
              <div key={ev.name} className="gG gF" style={{padding:"24px 20px",borderLeft:`4px solid ${ev.color}`,animationDelay:`${i*.1}s`,display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:48,height:48,borderRadius:14,background:`${ev.color}15`,border:`1.5px solid ${ev.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{ev.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>{ev.name}</div>
                  <div style={{fontSize:11,color:ev.color,fontWeight:600,marginBottom:4}}>📅 {ev.date}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>{ev.speaker}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {b.events.highlights.map((h,i)=>(
              <div key={i} className="gG" style={{padding:"16px 16px",display:"flex",alignItems:"center",gap:10,textAlign:"center",flexDirection:"column"}}>
                <span style={{fontSize:18}}>⚡</span>
                <span style={{fontSize:12,color:"#cbd5e1",lineHeight:1.4}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ GAMMA: LUK GLOBAL ═══ */}
      {isG&&b.lukGlobal&&<section id="luk" style={{background:"linear-gradient(180deg,rgba(243,112,33,.03),transparent)",borderTop:"1px solid rgba(243,112,33,.06)"}}>
        <div className="gS">
          <div style={{textAlign:"center",marginBottom:56}}>
            <div className="gBdg" style={{background:"rgba(243,112,33,.1)",color:"#f37021",border:"1px solid rgba(243,112,33,.2)",marginBottom:20}}>🌍 LITTLE UK GLOBAL</div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:"#fff",marginBottom:8}}>
              LUK <span style={{color:"#f37021"}}>GLOBAL</span>
            </h2>
            <div className="gDiv"/>
            <p style={{color:"#94a3b8",fontSize:14,maxWidth:560,margin:"0 auto",lineHeight:1.8}}>{b.lukGlobal.description}</p>
          </div>

          {/* Big highlight banner */}
          <div style={{
            background:"linear-gradient(135deg,rgba(243,112,33,.1),rgba(243,112,33,.03))",
            border:"1px solid rgba(243,112,33,.15)",borderRadius:20,padding:"36px 32px",marginBottom:40,
            display:"flex",alignItems:"center",gap:24,flexWrap:"wrap",
          }}>
            <div style={{width:64,height:64,borderRadius:16,background:"linear-gradient(135deg,#f37021,#e85d10)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0,boxShadow:"0 4px 20px #f3702140"}}>🎓</div>
            <div style={{flex:1,minWidth:240}}>
              <h3 style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:6}}>100% Sinh Viên Năm Nhất Học LUK Global</h3>
              <p style={{fontSize:13,color:"#94a3b8",lineHeight:1.7}}>Chương trình tiếng Anh bắt buộc giúp sinh viên FPT tự tin giao tiếp quốc tế, sẵn sàng học chuyên ngành bằng tiếng Anh.</p>
            </div>
          </div>

          {/* 4 Levels */}
          <h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:16,textAlign:"center"}}>🎯 4 Cấp Độ Tiếng Anh</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:40}}>
            {b.lukGlobal.levels.map((l,i)=>(
              <div key={l.name} className="gG gF" style={{
                textAlign:"center",padding:"32px 16px",
                borderTop:`3px solid ${l.color}`,animationDelay:`${i*.1}s`,
                background:`linear-gradient(180deg,${l.color}08,transparent)`,
              }}>
                <div style={{
                  width:36,height:36,borderRadius:10,margin:"0 auto 12px",
                  background:`${l.color}20`,border:`1.5px solid ${l.color}40`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:14,fontWeight:900,color:l.color,
                }}>L{l.level}</div>
                <div style={{fontSize:18,fontWeight:900,color:l.color,marginBottom:6}}>{l.name}</div>
                <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.6}}>{l.desc}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {b.lukGlobal.highlights.map((h,i)=>(
              <div key={i} className="gG" style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:28,height:28,borderRadius:8,background:"rgba(243,112,33,.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:"#f37021",fontSize:13,fontWeight:900}}>✓</span>
                </div>
                <span style={{fontSize:13,color:"#cbd5e1",lineHeight:1.5}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ GAMMA: ĐÀN TỲ BÀ ═══ */}
      {isG&&b.tyBa&&<section style={{background:"linear-gradient(180deg,rgba(245,158,11,.03),transparent)",borderTop:"1px solid rgba(245,158,11,.06)"}}>
        <div className="gS">
          <div style={{textAlign:"center",marginBottom:56}}>
            <div className="gBdg" style={{background:"rgba(245,158,11,.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,.2)",marginBottom:20}}>🎼 NHẠC CỤ DÂN TỘC</div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:"#fff",marginBottom:8}}>
              Đàn Tỳ Bà & <span style={{color:"#f59e0b"}}>Nhạc Cụ Truyền Thống</span>
            </h2>
            <div style={{width:48,height:3,borderRadius:2,margin:"0 auto 16px",background:"linear-gradient(90deg,transparent,#f59e0b,transparent)"}}/>
            <p style={{color:"#94a3b8",fontSize:14,maxWidth:560,margin:"0 auto",lineHeight:1.8}}>{b.tyBa.description}</p>
          </div>

          {/* Featured: Đàn Tỳ Bà */}
          <div style={{
            background:"linear-gradient(135deg,rgba(245,158,11,.08),rgba(243,112,33,.04))",
            border:"1.5px solid rgba(245,158,11,.2)",borderRadius:20,padding:"40px 36px",marginBottom:32,
            display:"flex",alignItems:"center",gap:32,flexWrap:"wrap",animation:"gGlow 3s ease infinite",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"rgba(245,158,11,.06)"}}/>
            <div style={{position:"absolute",bottom:-20,left:-20,width:100,height:100,borderRadius:"50%",background:"rgba(243,112,33,.05)"}}/>
            <div style={{fontSize:64,animation:"gFl 3s ease-in-out infinite",position:"relative",zIndex:1,filter:"drop-shadow(0 4px 12px rgba(245,158,11,.3))"}}>🎼</div>
            <div style={{flex:1,minWidth:240,position:"relative",zIndex:1}}>
              <div className="gBdg" style={{background:"#f59e0b",color:"#000",marginBottom:12,fontWeight:800}}>★ NỔI BẬT — ĐÀN TỲ BÀ</div>
              <h3 style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:8}}>Đàn Tỳ Bà — 4 Dây Truyền Thống</h3>
              <p style={{fontSize:13,color:"#cbd5e1",lineHeight:1.8}}>Lute truyền thống Việt Nam với âm thanh trong trẻo, du dương. FPT University là nơi tiên phong đưa nhạc cụ dân tộc vào giảng dạy chính thức từ năm 2014.</p>
            </div>
          </div>

          {/* Other instruments */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:40}}>
            {b.tyBa.instruments.filter(x=>!x.featured).map((inst,i)=>(
              <div key={inst.name} className="gG gF" style={{textAlign:"center",padding:"28px 14px",animationDelay:`${i*.08}s`}}>
                <div style={{fontSize:36,marginBottom:10}}>{inst.emoji}</div>
                <div style={{fontSize:14,fontWeight:700,color:"#e2e8f0",marginBottom:4}}>{inst.name}</div>
                <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.5}}>{inst.desc}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>
            {[{n:"2014",l:"Năm bắt đầu",c:"#f37021"},{n:"46",l:"Giảng viên",c:"#f59e0b"},{n:"8",l:"Loại nhạc cụ",c:"#ea580c"},{n:"62%",l:"SV tham gia",c:"#ef4444"}].map(s=>(
              <div key={s.l} style={{textAlign:"center",padding:20}}>
                <div style={{fontSize:32,fontWeight:900,color:s.c,marginBottom:4}}>{s.n}</div>
                <div style={{fontSize:11,color:"#64748b",fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {b.tyBa.highlights.map((h,i)=>(
              <div key={i} className="gG" style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                <span style={{fontSize:18}}>🎵</span>
                <span style={{fontSize:13,color:"#cbd5e1"}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{borderTop:`1px solid ${ac}08`}}>
        <div className="gS">
          <div style={{textAlign:"center",marginBottom:48}}>
            <h2 style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:8}}>Tiện Ích <span style={{color:ac}}>{b.name}</span></h2>
            <div className="gDiv"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
            {b.features.map((f,i)=>(
              <div key={f.title} className="gG gF" style={{textAlign:"center",padding:"36px 20px",animationDelay:`${i*.1}s`}}>
                <div style={{
                  width:52,height:52,borderRadius:14,margin:"0 auto 16px",
                  background:`linear-gradient(135deg,${ac}15,${ac}05)`,border:`1px solid ${ac}20`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
                }}>{f.icon}</div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.6}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FUN FACTS ═══ */}
      <section style={{background:"rgba(243,112,33,.015)"}}>
        <div className="gS" style={{paddingTop:48,paddingBottom:48}}>
          <h3 style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:24,textAlign:"center"}}>💡 Bạn Có Biết?</h3>
          <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:600,margin:"0 auto"}}>
            {b.funFacts.map((f,i)=>(
              <div key={i} className="gG gF" style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:16,borderLeft:"3px solid rgba(243,112,33,.4)",animationDelay:`${i*.1}s`}}>
                <div style={{width:32,height:32,borderRadius:8,background:"rgba(243,112,33,.1)",color:"#f37021",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,flexShrink:0}}>#{i+1}</div>
                <span style={{fontSize:13,color:"#cbd5e1",lineHeight:1.6}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{borderTop:"1px solid rgba(243,112,33,.08)",background:"linear-gradient(180deg,transparent,rgba(243,112,33,.04))"}}>
        <div className="gS" style={{textAlign:"center",paddingTop:64,paddingBottom:80}}>
          <div style={{
            width:80,height:80,borderRadius:20,margin:"0 auto 24px",
            background:"linear-gradient(135deg,#f37021,#e85d10)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,
            boxShadow:"0 8px 32px rgba(243,112,33,.35)",animation:"gFl 3s ease-in-out infinite",
          }}>{b.emoji}</div>
          <h2 style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:12}}>Sẵn sàng khám phá?</h2>
          <p style={{color:"#64748b",fontSize:14,maxWidth:400,margin:"0 auto 32px",lineHeight:1.7}}>Quay lại game để tiếp tục hành trình sinh viên FPT University!</p>
          <button onClick={close} style={{
            padding:"16px 52px",borderRadius:14,border:"none",
            background:"linear-gradient(135deg,#f37021,#e85d10)",color:"#fff",fontSize:15,fontWeight:700,
            cursor:"pointer",boxShadow:"0 4px 24px rgba(243,112,33,.4),0 0 0 1px rgba(243,112,33,.2)",
            transition:"all .25s",letterSpacing:.3,
          }}>🎮 Quay Lại Game</button>
          <p style={{color:"#1e293b",fontSize:11,marginTop:28}}>© 2026 FPT University Đà Nẵng — Student Life Simulator</p>
        </div>
      </section>
    </div>
  );
}
