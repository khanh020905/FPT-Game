import { useState } from "react";
import { useGame } from "../engine/GameContext";
import { LOCATIONS, ACTIONS } from "../data/mapData";

/**
 * Map Node — A clickable location on the campus map.
 * Positioned absolutely over the background map image.
 */
function MapNode({ loc, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(loc.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        absolute flex flex-col items-center justify-center gap-1
        rounded-xl border-2 transition-all duration-300 cursor-pointer
        group select-none z-10
        ${
          isActive
            ? "border-[#00fff7] bg-[#00fff7]/15 shadow-[0_0_24px_#00fff780,0_0_48px_#00fff730] scale-110"
            : hovered
              ? "border-white/40 bg-white/10 shadow-[0_0_16px_rgba(255,255,255,0.15)] scale-105"
              : "border-white/15 bg-black/50 hover:bg-black/40"
        }
      `}
      style={{
        left: `${loc.x}%`,
        top: `${loc.y}%`,
        transform: "translate(-50%, -50%)",
        width: `${loc.width}%`,
        height: `${loc.height}%`,
        minWidth: "80px",
        minHeight: "60px",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Current Location Pulse Ring */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-xl border-2 border-[#00fff7] animate-ping opacity-30"
          style={{ animationDuration: "2s" }}
        />
      )}

      {/* Emoji */}
      <span
        className={`text-2xl md:text-3xl transition-transform duration-300 ${
          isActive ? "animate-[float_2s_ease-in-out_infinite]" : ""
        } ${hovered && !isActive ? "scale-110" : ""}`}
        style={{
          filter: isActive ? `drop-shadow(0 0 8px ${loc.color})` : "none",
        }}
      >
        {loc.emoji}
      </span>

      {/* Name */}
      <span
        className={`text-[9px] md:text-[11px] font-bold tracking-wide text-center leading-tight px-1 ${
          isActive ? "text-[#00fff7]" : "text-white/80 group-hover:text-white"
        }`}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          textShadow: isActive
            ? "0 0 10px #00fff7"
            : "0 1px 3px rgba(0,0,0,0.8)",
          fontSize: "clamp(7px, 1vw, 11px)",
        }}
      >
        {loc.name}
      </span>

      {/* Hover Tooltip */}
      {hovered && !isActive && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl
                     bg-gray-900/95 border border-gray-600/50 backdrop-blur-md shadow-2xl z-30
                     pointer-events-none"
          style={{ animation: "slide-up 0.2s ease-out" }}
        >
          <p className="text-[10px] text-white font-bold mb-0.5">{loc.name}</p>
          <p className="text-[9px] text-gray-400 leading-relaxed">
            {loc.description}
          </p>
          <p className="text-[9px] text-[#00fff7] mt-1 font-medium">
            ▶ Click để di chuyển
          </p>
        </div>
      )}

      {/* Active Location Label */}
      {isActive && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[8px] bg-[#00fff7] text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            📍 Đang ở đây
          </span>
        </div>
      )}
    </button>
  );
}

/**
 * CampusMap — The main game view.
 * Background image of campus with absolutely positioned clickable MapNodes.
 */
export default function CampusMap() {
  const { state, moveTo, performAction } = useGame();
  const { location } = state;
  const currentLoc = LOCATIONS[location];
  const availableActions =
    currentLoc?.actions?.map((id) => ACTIONS[id]).filter(Boolean) || [];

  const handleNodeClick = (locId) => {
    if (locId !== location) {
      moveTo(locId);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Map Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/campus-map.png)",
            filter: "brightness(0.35) saturate(0.8)",
          }}
        />

        {/* Grid overlay for game feel */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,247,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,247,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#00fff7] opacity-[0.03] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff2d95] opacity-[0.03] blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f37021] opacity-[0.02] blur-[100px] rounded-full" />
        </div>

        {/* Campus Title Watermark */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
          <h2
            className="text-sm md:text-base tracking-[0.4em] uppercase text-white/8"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            FPT University Da Nang
          </h2>
        </div>

        {/* Map Nodes */}
        {Object.values(LOCATIONS).map((loc) => (
          <MapNode
            key={loc.id}
            loc={loc}
            isActive={loc.id === location}
            onClick={handleNodeClick}
          />
        ))}

        {/* Connection Lines (decorative paths between nodes) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          {Object.values(LOCATIONS).map((loc) =>
            (loc.connections || []).map((connId) => {
              const conn = LOCATIONS[connId];
              if (!conn) return null;
              // Only draw if this loc id < conn id to avoid duplicates
              if (loc.id > connId) return null;
              const isActive = loc.id === location || connId === location;
              return (
                <line
                  key={`${loc.id}-${connId}`}
                  x1={`${loc.x}%`}
                  y1={`${loc.y}%`}
                  x2={`${conn.x}%`}
                  y2={`${conn.y}%`}
                  stroke={isActive ? "#00fff730" : "#ffffff08"}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  strokeDasharray={isActive ? "6 3" : "3 6"}
                />
              );
            }),
          )}
        </svg>
      </div>

      {/* Action Bar — Bottom Panel */}
      <div className="bg-[#0d1117]/95 border-t border-[#00fff7]/10 px-4 py-3 flex-shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3 overflow-x-auto">
          {/* Location Context */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/10 flex-shrink-0">
            <span className="text-xl">{currentLoc?.emoji}</span>
            <div className="min-w-0">
              <p
                className="text-xs font-bold text-[#00fff7] truncate"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "9px",
                }}
              >
                {currentLoc?.name}
              </p>
              <p className="text-[9px] text-gray-500 truncate">
                {currentLoc?.nameEn}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {availableActions.map((action) => (
            <button
              key={action.id}
              onClick={() => performAction(action.id)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
                         bg-gradient-to-r from-white/5 to-white/[0.02]
                         border border-white/10 hover:border-[#00fff7]/40
                         hover:bg-[#00fff7]/10 hover:shadow-[0_0_12px_#00fff720]
                         transition-all duration-200 hover:scale-[1.03] active:scale-95 group"
            >
              <span className="text-base group-hover:scale-110 transition-transform">
                {action.emoji}
              </span>
              <div className="text-left">
                <span className="text-gray-200 block">{action.name}</span>
                {action.effects &&
                  Object.entries(action.effects).length > 0 && (
                    <span className="text-[9px] text-gray-500 flex gap-1 mt-0.5">
                      {Object.entries(action.effects).map(([key, val]) => (
                        <span
                          key={key}
                          className={
                            val > 0 ? "text-green-400/80" : "text-red-400/80"
                          }
                        >
                          {val > 0 ? "+" : ""}
                          {key === "money" ? `${val / 1000}K` : val}
                        </span>
                      ))}
                    </span>
                  )}
              </div>
            </button>
          ))}

          {availableActions.length === 0 && (
            <p className="text-xs text-gray-600 italic">
              Không có hành động tại đây.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
