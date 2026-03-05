import { useRef, useEffect, useCallback, useState } from "react";
import { useGame } from "../engine/GameContext";
import {
  LOCATIONS,
  ACTIONS,
  CANVAS_MAP,
  BUILDING_COLLISIONS,
  INTERACTION_ZONES,
} from "../data/mapData";
import { getMapCanvas } from "../engine/canvasMapRenderer";
import FPTLandingPage from "./FPTLandingPage";
import BuildingLandingPage from "./BuildingLandingPage";

/**
 * GameCanvas — HTML5 Canvas component with:
 *  - Campus map background rendering with camera follow
 *  - Pixel-art player character with WASD movement
 *  - AABB collision detection against buildings
 *  - Interaction zones (press E near doors)
 *  - Minimap + building labels drawn on canvas
 */
export default function GameCanvas() {
  const canvasRef = useRef(null);
  const mapImgRef = useRef(null);
  const keysRef = useRef(new Set());
  const playerRef = useRef({
    x: CANVAS_MAP.spawnX,
    y: CANVAS_MAP.spawnY,
    dir: "down", // facing direction
    frame: 0,
    frameTick: 0,
  });
  const cameraRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  const { state, updatePlayerPos, canvasInteract, performAction } = useGame();
  const [gammaDialog, setGammaDialog] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [showBuilding, setShowBuilding] = useState(null); // building ID or null

  const { nearInteraction, location } = state;
  const nearInteractionRef = useRef(nearInteraction);
  nearInteractionRef.current = nearInteraction;

  const locationRef = useRef(location);
  locationRef.current = location;

  // ───── Generate procedural map (cached offscreen canvas) ─────
  useEffect(() => {
    mapImgRef.current = getMapCanvas();
  }, []);

  // ───── Load Gamma Tower floating image ─────
  const gammaImgRef = useRef(null);
  const gammaImgLoaded = useRef(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => { gammaImgLoaded.current = true; };
    img.src = "/fpt-gamma-building.png";
    gammaImgRef.current = img;
  }, []);

  // ───── Load Alpha Tower floating image ─────
  const alphaImgRef = useRef(null);
  const alphaImgLoaded = useRef(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => { alphaImgLoaded.current = true; };
    img.src = "/fpt-alpha-building.png";
    alphaImgRef.current = img;
  }, []);

  // ───── Load Event Convocation floating image ─────
  const eventImgRef = useRef(null);
  const eventImgLoaded = useRef(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => { eventImgLoaded.current = true; };
    img.src = "/event-convocation.png";
    eventImgRef.current = img;
  }, []);

  // ───── Keyboard listeners ─────
  useEffect(() => {
    const onDown = (e) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);

      // E key — interact
      if (key === "e") {
        e.preventDefault();
        const curZone = nearInteractionRef.current;
        if (!curZone) return;
        // Show special dialog for Toà Gamma
        if (curZone.id === "toa-gamma-door") {
          setGammaDialog(true);
          return;
        }
        // Show building landing page for building zones
        const buildingZones = {
          "toa-alpha-door": "alpha-tower",
          "building-b-door": "beta-tower",
          "cantin-door": "canteen",
          "dorm-a-door": "dorm-a",
          "dorm-b-door": "dorm-b",
          "dorm-door": "dorm-b",
          "main-gate-zone": "main-gate",
          "sports-door": "canteen",
          "fpt-sign-zone": "main-gate",
          "event-plaza-zone": "alpha-tower",
        };
        if (buildingZones[curZone.id]) {
          setShowBuilding(buildingZones[curZone.id]);
          canvasInteract();
          return;
        }
        canvasInteract();
      }
    };
    const onUp = (e) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [canvasInteract]);

  // ───── AABB collision check ─────
  const checkCollision = useCallback((px, py) => {
    const ps = CANVAS_MAP.playerSize;
    for (const b of BUILDING_COLLISIONS) {
      if (px + ps > b.x && px < b.x + b.w && py + ps > b.y && py < b.y + b.h) {
        return true;
      }
    }
    return false;
  }, []);

  // ───── Game Loop ─────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const gameLoop = () => {
      const {
        width: MAP_W,
        height: MAP_H,
        playerSize: PS,
        playerSpeed: SPEED,
      } = CANVAS_MAP;

      // ── Resize canvas to fill container ──
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const cw = parent.clientWidth;
        const ch = parent.clientHeight;
        if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
          canvas.width = cw * dpr;
          canvas.height = ch * dpr;
          canvas.style.width = `${cw}px`;
          canvas.style.height = `${ch}px`;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      }

      const viewW = canvas.width / (window.devicePixelRatio || 1);
      const viewH = canvas.height / (window.devicePixelRatio || 1);

      const player = playerRef.current;
      const keys = keysRef.current;

      // ── Movement ──
      let dx = 0,
        dy = 0;
      if (keys.has("w") || keys.has("arrowup")) {
        dy = -SPEED;
        player.dir = "up";
      }
      if (keys.has("s") || keys.has("arrowdown")) {
        dy = SPEED;
        player.dir = "down";
      }
      if (keys.has("a") || keys.has("arrowleft")) {
        dx = -SPEED;
        player.dir = "left";
      }
      if (keys.has("d") || keys.has("arrowright")) {
        dx = SPEED;
        player.dir = "right";
      }

      // Normalize diagonal
      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      // Apply with collision
      let newX = player.x + dx;
      let newY = player.y + dy;

      // Clamp to map
      newX = Math.max(0, Math.min(MAP_W - PS, newX));
      newY = Math.max(0, Math.min(MAP_H - PS, newY));

      // Separate axis collision for sliding along walls
      if (dx !== 0 && !checkCollision(newX, player.y)) {
        player.x = newX;
      }
      if (dy !== 0 && !checkCollision(player.x, newY)) {
        player.y = newY;
      }

      // Animation frame counter
      if (dx !== 0 || dy !== 0) {
        player.frameTick++;
        if (player.frameTick > 8) {
          player.frame = (player.frame + 1) % 4;
          player.frameTick = 0;
        }
      } else {
        player.frame = 0;
        player.frameTick = 0;
      }

      // Update state (throttled — every other frame)
      if (player.frameTick % 2 === 0) {
        updatePlayerPos(player.x, player.y);
      }

      // ── Camera ──
      const cam = cameraRef.current;
      cam.x = player.x + PS / 2 - viewW / 2;
      cam.y = player.y + PS / 2 - viewH / 2;
      // Center map when viewport is larger than map
      if (viewW >= MAP_W) {
        cam.x = -(viewW - MAP_W) / 2;
      } else {
        cam.x = Math.max(0, Math.min(MAP_W - viewW, cam.x));
      }
      if (viewH >= MAP_H) {
        cam.y = -(viewH - MAP_H) / 2;
      } else {
        cam.y = Math.max(0, Math.min(MAP_H - viewH, cam.y));
      }

      // ── Clear ──
      ctx.fillStyle = "#0a0e17";
      ctx.fillRect(0, 0, viewW, viewH);

      // ── Draw map (from procedural offscreen canvas) ──
      if (mapImgRef.current) {
        ctx.drawImage(
          mapImgRef.current,
          cam.x,
          cam.y,
          viewW,
          viewH, // source crop from 1024×1024 map
          0,
          0,
          viewW,
          viewH, // destination (fill viewport)
        );
      }

      // ── Draw interaction zones (subtle highlights) ──
      for (const zone of INTERACTION_ZONES) {
        const zx = zone.x - cam.x;
        const zy = zone.y - cam.y;
        // Only draw if visible
        if (zx + zone.w > 0 && zx < viewW && zy + zone.h > 0 && zy < viewH) {
          ctx.fillStyle = "rgba(0, 255, 247, 0.12)";
          ctx.strokeStyle = "rgba(0, 255, 247, 0.35)";
          ctx.lineWidth = 1.5;
          ctx.fillRect(zx, zy, zone.w, zone.h);
          ctx.strokeRect(zx, zy, zone.w, zone.h);
        }
      }

      // ── Draw building labels ──
      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.textAlign = "center";
      for (const b of BUILDING_COLLISIONS) {
        if (!b.label) continue;
        const bx = b.x + b.w / 2 - cam.x;
        const by = b.y + b.h / 2 - cam.y;
        if (bx > -50 && bx < viewW + 50 && by > -20 && by < viewH + 20) {
          // Background pill
          const textWidth = ctx.measureText(b.label).width;
          ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
          ctx.beginPath();
          const pillX = bx - textWidth / 2 - 8;
          const pillY = by - 8;
          const pillW = textWidth + 16;
          const pillH = 18;
          ctx.roundRect(pillX, pillY, pillW, pillH, 6);
          ctx.fill();
          // Text
          ctx.fillStyle = "#ffffff";
          ctx.fillText(b.label, bx, by + 4);
        }
      }

      // ── Draw Gamma Tower floating photo ──
      if (gammaImgLoaded.current && gammaImgRef.current) {
        // Toà Gamma is at (30, 880, 245, 240) in map coords
        const gimgW = 120;
        const gimgH = 80;
        const gimgX = 30 + 245 / 2 - gimgW / 2 - cam.x;
        const gimgY = 880 - gimgH - 18 + Math.sin(Date.now() / 600) * 4 - cam.y;
        
        if (gimgX + gimgW > -20 && gimgX < viewW + 20 && gimgY + gimgH > -20 && gimgY < viewH + 20) {
          ctx.save();
          // Orange glow shadow
          ctx.shadowColor = "rgba(243, 112, 33, 0.5)";
          ctx.shadowBlur = 12;
          // Rounded rect clip
          ctx.beginPath();
          ctx.roundRect(gimgX, gimgY, gimgW, gimgH, 8);
          ctx.clip();
          ctx.drawImage(gammaImgRef.current, gimgX, gimgY, gimgW, gimgH);
          ctx.restore();
          // Orange border
          ctx.strokeStyle = "rgba(243, 112, 33, 0.7)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(gimgX, gimgY, gimgW, gimgH, 8);
          ctx.stroke();
          // Label below
          ctx.font = "bold 7px 'Press Start 2P', monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(0,0,0,0.7)";
          const lblW = ctx.measureText("FPT UNIVERSITY").width + 8;
          ctx.fillRect(gimgX + gimgW / 2 - lblW / 2, gimgY + gimgH + 3, lblW, 12);
          ctx.fillStyle = "#f37021";
          ctx.fillText("FPT UNIVERSITY", gimgX + gimgW / 2, gimgY + gimgH + 12);
        }
      }

      // ── Draw Alpha Tower floating photo ──
      if (alphaImgLoaded.current && alphaImgRef.current) {
        // Toà Alpha is at (400, 880, 260, 240) in map coords
        const aimgW = 100;
        const aimgH = 110;
        const aimgX = 400 + 260 / 2 - aimgW / 2 - cam.x;
        const aimgY = 880 - aimgH - 18 + Math.sin(Date.now() / 700 + 1) * 4 - cam.y;
        
        if (aimgX + aimgW > -20 && aimgX < viewW + 20 && aimgY + aimgH > -20 && aimgY < viewH + 20) {
          ctx.save();
          ctx.shadowColor = "rgba(243, 112, 33, 0.5)";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.roundRect(aimgX, aimgY, aimgW, aimgH, 8);
          ctx.clip();
          ctx.drawImage(alphaImgRef.current, aimgX, aimgY, aimgW, aimgH);
          ctx.restore();
          // Orange border
          ctx.strokeStyle = "rgba(243, 112, 33, 0.7)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(aimgX, aimgY, aimgW, aimgH, 8);
          ctx.stroke();
          // Label below
          ctx.font = "bold 7px 'Press Start 2P', monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(0,0,0,0.7)";
          const lblWa = ctx.measureText("TOÀ ALPHA").width + 8;
          ctx.fillRect(aimgX + aimgW / 2 - lblWa / 2, aimgY + aimgH + 3, lblWa, 12);
          ctx.fillStyle = "#f37021";
          ctx.fillText("TOÀ ALPHA", aimgX + aimgW / 2, aimgY + aimgH + 12);
        }
      }

      // ── Draw Event Convocation 3D floating photo ──
      if (eventImgLoaded.current && eventImgRef.current) {
        // Event plaza zone is at (395, 705, 270, 125) in map coords
        const eimgW = 150;
        const eimgH = 95;
        const t = Date.now();
        const floatY = Math.sin(t / 800) * 5;
        const tiltX = Math.sin(t / 2000) * 0.06; // subtle 3D tilt
        const eimgCenterX = 395 + 270 / 2 - cam.x;
        const eimgCenterY = 705 - eimgH - 25 + floatY - cam.y;
        const eimgX = eimgCenterX - eimgW / 2;
        const eimgY = eimgCenterY;
        
        if (eimgX + eimgW > -40 && eimgX < viewW + 40 && eimgY + eimgH > -40 && eimgY < viewH + 40) {
          ctx.save();
          
          // 3D perspective transform — translate to center, apply skew, translate back
          ctx.translate(eimgCenterX, eimgCenterY + eimgH / 2);
          ctx.transform(1, tiltX, -tiltX * 0.5, 1, 0, 0);
          ctx.translate(-eimgCenterX, -(eimgCenterY + eimgH / 2));
          
          // Outer glow — festive golden/orange
          ctx.shadowColor = "rgba(255, 165, 0, 0.6)";
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 4;
          
          // Draw rounded image
          ctx.beginPath();
          ctx.roundRect(eimgX, eimgY, eimgW, eimgH, 10);
          ctx.clip();
          ctx.drawImage(eventImgRef.current, eimgX, eimgY, eimgW, eimgH);
          ctx.restore();
          
          // 3D border with same transform
          ctx.save();
          ctx.translate(eimgCenterX, eimgCenterY + eimgH / 2);
          ctx.transform(1, tiltX, -tiltX * 0.5, 1, 0, 0);
          ctx.translate(-eimgCenterX, -(eimgCenterY + eimgH / 2));
          
          // Animated border glow
          const glowIntensity = 0.5 + Math.sin(t / 400) * 0.3;
          ctx.strokeStyle = `rgba(255, 165, 0, ${glowIntensity})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(eimgX, eimgY, eimgW, eimgH, 10);
          ctx.stroke();
          
          // Second glow layer for depth
          ctx.strokeStyle = `rgba(255, 200, 50, ${glowIntensity * 0.4})`;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.roundRect(eimgX - 1, eimgY - 1, eimgW + 2, eimgH + 2, 11);
          ctx.stroke();
          
          // Label below with 3D transform
          const labelText = "🎓 CONVOCATION DAY";
          ctx.font = "bold 7px 'Press Start 2P', monospace";
          ctx.textAlign = "center";
          const lblW = ctx.measureText(labelText).width + 12;
          
          // Label background pill
          ctx.fillStyle = "rgba(0,0,0,0.8)";
          ctx.beginPath();
          ctx.roundRect(eimgCenterX - lblW / 2, eimgY + eimgH + 5, lblW, 14, 4);
          ctx.fill();
          
          // Label border
          ctx.strokeStyle = "rgba(255, 165, 0, 0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(eimgCenterX - lblW / 2, eimgY + eimgH + 5, lblW, 14, 4);
          ctx.stroke();
          
          // Label text
          ctx.fillStyle = "#ffa500";
          ctx.fillText(labelText, eimgCenterX, eimgY + eimgH + 15);
          
          ctx.restore();
          
          // 3D shadow on ground
          ctx.save();
          ctx.globalAlpha = 0.15 + Math.sin(t / 800) * 0.05;
          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.beginPath();
          ctx.ellipse(eimgCenterX, eimgY + eimgH + 28, eimgW / 2.5, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Draw player character ──
      const px = player.x - cam.x;
      const py = player.y - cam.y;
      drawPlayer(ctx, px, py, PS, player.dir, player.frame);

      // ── Draw interaction prompt ──
      const nearZone = nearInteractionRef.current;
      if (nearZone) {
        const promptText = `⮐  [E]  ${nearZone.label} — ${nearZone.prompt}`;
        ctx.font = "bold 13px 'Inter', sans-serif";
        const tw = ctx.measureText(promptText).width;
        const promptX = viewW / 2 - tw / 2 - 16;
        const promptY = viewH - 60;

        // Background
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.beginPath();
        ctx.roundRect(promptX, promptY, tw + 32, 36, 10);
        ctx.fill();

        // Border glow
        ctx.strokeStyle = "#00fff7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(promptX, promptY, tw + 32, 36, 10);
        ctx.stroke();

        // Text
        ctx.fillStyle = "#00fff7";
        ctx.textAlign = "center";
        ctx.fillText(promptText, viewW / 2, promptY + 23);
      }

      // ── Minimap ──
      drawMinimap(ctx, viewW, viewH, player, cam, PS);

      // ── WASD controls hint (top-left) ──
      ctx.font = "10px 'Press Start 2P', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.textAlign = "left";
      ctx.fillText("WASD to move  |  E to interact", 12, 20);

      animRef.current = requestAnimationFrame(gameLoop);
    };

    animRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [checkCollision, updatePlayerPos]);

  // ── Current location actions bar ──
  const currentLoc = LOCATIONS[location];
  const availableActions =
    currentLoc?.actions?.map((id) => ACTIONS[id]).filter(Boolean) || [];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Canvas Container */}
      <div className="flex-1 relative overflow-hidden game-canvas-container">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pixel-art"
          tabIndex={0}
          style={{ outline: "none", cursor: "none" }}
        />
      </div>

      {/* Action Bar — Bottom Panel with LED Border & Game Guide */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        {/* LED Running Border */}
        <div style={{
          position: "absolute", inset: -2, borderRadius: 0, overflow: "hidden", zIndex: 0,
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute", inset: -2,
            background: "conic-gradient(from var(--led-angle, 0deg), #00fff7, #f37021, #ff2d95, #7c3aed, #22c55e, #eab308, #00fff7)",
            animation: "ledSpin 3s linear infinite",
            opacity: 0.8,
          }} />
          <div style={{
            position: "absolute", inset: 2,
            background: "rgba(13,17,23,0.97)",
          }} />
        </div>
        <style>{`
          @property --led-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
          @keyframes ledSpin { to { --led-angle: 360deg; } }
          @keyframes ledPulse { 0%,100%{opacity:.6}50%{opacity:1} }
          @keyframes keyBounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)} }
        `}</style>

        <div className="px-4 py-3" style={{
          position: "relative", zIndex: 1,
          background: "rgba(13,17,23,0.97)",
          backdropFilter: "blur(12px)",
        }}>
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
                Di chuyển đến một toà nhà và nhấn [E] để tương tác.
              </p>
            )}
          </div>

          {/* Game Guide — Centered */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, marginTop: 6, paddingTop: 6,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "4px 12px", borderRadius: 10,
                background: "linear-gradient(135deg, rgba(0,255,247,0.06), rgba(243,112,33,0.04))",
                border: "1px solid rgba(0,255,247,0.1)",
              }}>
                <span style={{ fontSize: 14, animation: "ledPulse 2s ease infinite" }}>🎮</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#00fff7", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Press Start 2P', monospace" }}>GUIDE</span>
              </div>
              {[
                { keys: "W A S D", label: "Di chuyển", icon: "🕹️" },
                { keys: "E", label: "Tương tác", icon: "⚡" },
                { keys: "M", label: "Bản đồ", icon: "🗺️" },
              ].map((g, i) => (
                <div key={g.keys} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "4px 10px", borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{ fontSize: 12 }}>{g.icon}</span>
                  <div style={{ display: "flex", gap: 3 }}>
                    {g.keys.split(" ").map(k => (
                      <span key={k} style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        minWidth: 20, height: 20, padding: "0 4px",
                        borderRadius: 4,
                        background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                        border: "1px solid rgba(255,255,255,0.15)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                        fontSize: 8, fontWeight: 800, color: "#e2e8f0",
                        fontFamily: "'Press Start 2P', monospace",
                        letterSpacing: 0.5,
                        animation: `keyBounce ${2 + i * 0.3}s ease-in-out infinite`,
                      }}>{k}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{g.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ── Toà Gamma Welcome Dialog ── */}
      {gammaDialog && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.65)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              border: "2px solid #f37021",
              borderRadius: 16,
              padding: "32px 36px",
              maxWidth: 420,
              textAlign: "center",
              boxShadow:
                "0 0 40px rgba(243,112,33,0.3), 0 0 80px rgba(0,255,247,0.1)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
            <h2
              style={{
                color: "#f37021",
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "'Press Start 2P', monospace",
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              FPT UNIVERSITY
            </h2>
            <p
              style={{
                color: "#e2e8f0",
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              Bạn đã sẵn sàng để trải nghiệm 1 ngày là{" "}
              <span style={{ color: "#f37021", fontWeight: "bold" }}>
                sinh viên năm nhất
              </span>{" "}
              tại{" "}
              <span style={{ color: "#00fff7", fontWeight: "bold" }}>
                Đại học FPT
              </span>{" "}
              chưa? 🚀
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => {
                  setGammaDialog(false);
                  setShowBuilding("gamma-tower");
                }}
                style={{
                  background: "linear-gradient(135deg, #f37021, #e85d10)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 28px",
                  fontSize: 14,
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontFamily: "'Press Start 2P', monospace",
                  boxShadow: "0 4px 15px rgba(243,112,33,0.4)",
                }}
              >
                🔥 Sẵn Sàng!
              </button>
              <button
                onClick={() => setGammaDialog(false)}
                style={{
                  background: "transparent",
                  color: "#94a3b8",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  padding: "10px 28px",
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "'Press Start 2P', monospace",
                }}
              >
                Chưa...
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FPT Landing Page ── */}
      {showLanding && (
        <FPTLandingPage
          onClose={() => {
            setShowLanding(false);
            canvasInteract();
          }}
        />
      )}

      {/* ── Building Landing Page ── */}
      {showBuilding && (
        <BuildingLandingPage
          buildingId={showBuilding}
          onClose={() => setShowBuilding(null)}
        />
      )}
    </div>
  );
}

/* ======================================================================
 * DRAWING HELPERS
 * ====================================================================== */

/**
 * Draw a pixel-art style player character
 */
function drawPlayer(ctx, x, y, size, dir, frame) {
  const s = size;
  const bobY = frame % 2 === 0 ? 0 : -1; // walk bob

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(x + s / 2, y + s + 1, s / 2.5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = "#f37021"; // FPT orange
  ctx.fillRect(x + 3, y + 6 + bobY, s - 6, s - 8);

  // Head
  ctx.fillStyle = "#ffd6a5";
  ctx.fillRect(x + 4, y + bobY, s - 8, 8);

  // Hair
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(x + 4, y - 1 + bobY, s - 8, 3);

  // Eyes — direction indicator
  ctx.fillStyle = "#000";
  const eyeY = y + 3 + bobY;
  switch (dir) {
    case "left":
      ctx.fillRect(x + 4, eyeY, 2, 2);
      ctx.fillRect(x + 8, eyeY, 2, 2);
      break;
    case "right":
      ctx.fillRect(x + s - 6, eyeY, 2, 2);
      ctx.fillRect(x + s - 10, eyeY, 2, 2);
      break;
    case "up":
      // Show back of head, no eyes
      break;
    default: // down
      ctx.fillRect(x + 6, eyeY, 2, 2);
      ctx.fillRect(x + s - 8, eyeY, 2, 2);
      break;
  }

  // ── Player marker glow ──
  ctx.strokeStyle = "#00fff7";
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 300) * 0.3;
  ctx.beginPath();
  ctx.arc(x + s / 2, y + s / 2 + bobY, s / 2 + 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Direction arrow
  ctx.fillStyle = "#00fff7";
  ctx.globalAlpha = 0.6;
  const arrowSize = 4;
  const cx = x + s / 2;
  const cy = y + s / 2 + bobY;
  ctx.beginPath();
  switch (dir) {
    case "up":
      ctx.moveTo(cx, cy - s / 2 - 8);
      ctx.lineTo(cx - arrowSize, cy - s / 2 - 3);
      ctx.lineTo(cx + arrowSize, cy - s / 2 - 3);
      break;
    case "down":
      ctx.moveTo(cx, cy + s / 2 + 8);
      ctx.lineTo(cx - arrowSize, cy + s / 2 + 3);
      ctx.lineTo(cx + arrowSize, cy + s / 2 + 3);
      break;
    case "left":
      ctx.moveTo(cx - s / 2 - 8, cy);
      ctx.lineTo(cx - s / 2 - 3, cy - arrowSize);
      ctx.lineTo(cx - s / 2 - 3, cy + arrowSize);
      break;
    case "right":
      ctx.moveTo(cx + s / 2 + 8, cy);
      ctx.lineTo(cx + s / 2 + 3, cy - arrowSize);
      ctx.lineTo(cx + s / 2 + 3, cy + arrowSize);
      break;
  }
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

/**
 * Draw a minimap in the bottom-right corner
 */
function drawMinimap(ctx, viewW, viewH, player, cam, playerSize) {
  const mmW = 90;
  const mmH = Math.round(mmW * (CANVAS_MAP.height / CANVAS_MAP.width));
  const mmX = viewW - mmW - 12;
  const mmY = 12; // top-right corner
  const scale = mmW / CANVAS_MAP.width;

  // Background
  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.beginPath();
  ctx.roundRect(mmX - 4, mmY - 4, mmW + 8, mmH + 8, 8);
  ctx.fill();

  // Border
  ctx.strokeStyle = "rgba(0, 255, 247, 0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(mmX - 4, mmY - 4, mmW + 8, mmH + 8, 8);
  ctx.stroke();

  // Buildings
  for (const b of BUILDING_COLLISIONS) {
    if (!b.label) {
      ctx.fillStyle = "rgba(50, 60, 80, 0.5)";
    } else {
      ctx.fillStyle = "rgba(243, 112, 33, 0.4)";
    }
    ctx.fillRect(
      mmX + b.x * scale,
      mmY + b.y * scale,
      b.w * scale,
      b.h * scale,
    );
  }

  // Interaction zones
  for (const z of INTERACTION_ZONES) {
    ctx.fillStyle = "rgba(0, 255, 247, 0.3)";
    ctx.fillRect(
      mmX + z.x * scale,
      mmY + z.y * scale,
      z.w * scale,
      z.h * scale,
    );
  }

  // Viewport rect
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    mmX + cam.x * scale,
    mmY + cam.y * scale,
    viewW * scale,
    viewH * scale,
  );

  // Player dot
  ctx.fillStyle = "#00fff7";
  ctx.beginPath();
  ctx.arc(
    mmX + (player.x + playerSize / 2) * scale,
    mmY + (player.y + playerSize / 2) * scale,
    3,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  // Label
  ctx.font = "8px 'Press Start 2P', monospace";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.textAlign = "right";
  ctx.fillText("MAP", mmX + mmW, mmY - 8);
}
