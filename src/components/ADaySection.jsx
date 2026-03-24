import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Activity Data ─── */
const activities = [
  {
    id: "luk-global",
    title: "LUK Global",
    role: "Chương trình trao đổi quốc tế",
    tags: ["English", "Global", "Exchange", "LUK", "Campus"],
    image: "/alpha-luk-team.jpg",
  },
  {
    id: "vovinam",
    title: "Vovinam",
    role: "Võ thuật truyền thống Việt Nam",
    tags: ["Martial Arts", "Discipline", "Health", "Tradition", "Spirit"],
    image: "/vovinam-card.png",
  },
  {
    id: "nhac-cu",
    title: "Nhạc Cụ Dân Tộc",
    role: "Âm nhạc truyền thống Việt Nam",
    tags: ["Music", "Culture", "Đàn Tranh", "Sáo Trúc", "Heritage"],
    image: "/gamma-traditional-music.jpg",
  },
];

/* Arch shape: rounded top, straight bottom */
const ARCH_CLIP = "inset(0 0 0 0 round 180px 180px 12px 12px)";
/* Square shape: regular rounded rect */
const SQUARE_CLIP = "inset(0 0 0 0 round 12px)";

export default function ADaySection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "80px clamp(20px, 5vw, 48px)",
        background: "#f5f5f5",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 48,
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 900,
            color: "#0f172a",
            margin: "0 0 12px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Một Ngày Tại FPT
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: 15,
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Không chỉ là học tập — mỗi ngày tại FPT là một hành trình khám phá văn
          hoá, rèn luyện bản thân và kết nối cộng đồng.
        </p>
      </div>

      {/* Team Clippath Cards */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          maxWidth: 960,
          margin: "0 auto",
          height: 480,
          position: "relative",
        }}
      >
        {activities.map((activity, index) => {
          const isActive = activeIndex === index;
          const hasActive = activeIndex !== null;
          const isInactive = hasActive && !isActive;

          return (
            <motion.div
              key={activity.id}
              onClick={() => handleClick(index)}
              animate={{
                flex: isActive ? 4 : 1,
                filter: isInactive
                  ? "blur(4px) brightness(0.7)"
                  : "blur(0px) brightness(1)",
                opacity: isInactive ? 0.5 : 1,
              }}
              transition={{
                flex: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                filter: { duration: 0.4 },
                opacity: { duration: 0.4 },
              }}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
                /* Key animation: arch → square on active */
                clipPath: isActive ? SQUARE_CLIP : ARCH_CLIP,
                transition: "clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive
                  ? "0 24px 64px rgba(0,0,0,0.18)"
                  : "0 4px 16px rgba(0,0,0,0.06)",
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Background Image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${activity.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  backgroundColor: "#d1d5db",
                }}
              />

              {/* Bottom gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isActive
                    ? "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.8) 100%)"
                    : "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)",
                  zIndex: 1,
                  transition: "background 0.5s ease",
                }}
              />

              {/* Active Card Content — name, role, tags */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "28px 28px",
                      zIndex: 2,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: "#fff",
                        margin: "0 0 4px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {activity.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.65)",
                        margin: "0 0 14px",
                      }}
                    >
                      {activity.role}
                    </p>
                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {activity.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "4px 12px",
                            borderRadius: 100,
                            fontSize: 11,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.85)",
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inactive: small centered label at bottom */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 0,
                      right: 0,
                      zIndex: 2,
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#fff",
                        textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                        margin: 0,
                      }}
                    >
                      {activity.title}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
