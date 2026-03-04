/**
 * canvasMapRenderer.js — Procedural pixel-art FPT University Da Nang campus
 *
 * LAYOUT (768 × 1300, portrait):
 *
 *  ┌──────────┬───────────────────────────────┐
 *  │ GARDEN   │      LARGE  LAKE  / RIVER     │
 *  │ (farm)   │  (blue water, lily pads, huge)│
 *  ├──────────┤────────┬──────────┬───────────┤
 *  │ SPORTS   │ brick  │ BLDG A  │ gray      │
 *  │ b-ball   │ paths  │ (court- │ buildings │
 *  │ tennis   │        │  yard)  │ (right)   │
 *  ├──────────┤        ├─────────┴───────────┤
 *  │ FOOTBALL │        │  HỒ SEN (lotus pond)│
 *  │ (track)  │        ├─────────────────────┤
 *  │          │        │  KHU CAFE           │
 *  ├──────────┴────────┴─────────────────────┤
 *  │     BUILDING B  (large U-courtyard)     │
 *  │     inner courtyard with red roof       │
 *  ├─────────────────┬───────────────────────┤
 *  │                 │  pond + THƯ VIỆN      │
 *  │  GIẢNG ĐƯỜNG B  │  (Library & Admin)    │
 *  │  (courtyard)    │                       │
 *  ├────────┬────────┴────────┬──────────────┤
 *  │        │   CỔNG CHÍNH   │  FPT SIGN    │
 *  └────────┴────────────────┴──────────────┘
 */
import { CANVAS_MAP } from "../data/mapData";

const W = CANVAS_MAP.width;
const H = CANVAS_MAP.height;

/* ── PALETTE ─────────────────────────────── */
const P = {
  grass: "#2d7a20",
  grassL: "#3c9a2c",
  grassD: "#1c5815",
  brick: "#a85a3a",
  brickL: "#c87050",
  brickD: "#7a3e25",
  roofOr: "#d45818",
  roofOrD: "#b04510",
  roofRd: "#c03525",
  roofRdD: "#922018",
  wallBg: "#e8d5b0",
  wallWh: "#dce4e8",
  wallGr: "#a8b0bc",
  wallDk: "#6a7888",
  winBl: "#4488bb",
  winDk: "#2a5577",
  door: "#6b4226",
  tDk: "#1a6010",
  tMd: "#28801a",
  tLt: "#3eaa2a",
  trunk: "#5c3a1e",
  wDeep: "#1870a0",
  wMid: "#2890b8",
  wLt: "#50b8d8",
  wSh: "#80daf0",
  crtBl: "#2266aa",
  crtGn: "#2e8b40",
  trkRd: "#b44430",
  fldGn: "#308830",
  wh: "#ffffff",
  bk: "#000000",
  cyan: "#00fff7",
  bgDk: "#0a0e17",
  grayBld: "#6a7080",
  grayBldL: "#8090a0",
  grayBldD: "#4a5060",
};

let cached = null;

export function getMapCanvas() {
  if (cached) return cached;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = false;

  drawGround(g);
  drawCementPlaza(g);
  drawBrickPaths(g);
  drawLargeRiver(g);
  drawGarden(g);
  drawBuildingA(g);
  drawDormB(g);
  drawSportsArea(g);
  drawFootballField(g);
  drawLotusPond(g);
  drawDormA(g);
  drawBuildingB(g);
  drawLowerPond(g);
  drawToaAlpha(g);
  drawToaGamma(g);
  drawMainGate(g);
  drawTrees(g);
  drawDecorations(g);
  drawMapBanner(g);
  drawBorderGlow(g);

  cached = c;
  return c;
}

/* ── GROUND ─── */
function drawGround(g) {
  g.fillStyle = P.bgDk;
  F(g, 0, 0, W, H);
  g.fillStyle = P.grass;
  F(g, 18, 12, W - 55, H - 45);
  const r = rng(42);
  g.fillStyle = P.grassL;
  for (let i = 0; i < 500; i++)
    F(g, 22 + r() * (W - 65), 15 + r() * (H - 55), 2 + r() * 6, 2 + r() * 6);
  g.fillStyle = P.grassD;
  for (let i = 0; i < 250; i++)
    F(g, 22 + r() * (W - 65), 15 + r() * (H - 55), 2 + r() * 5, 2 + r() * 5);
}

/* ── BRICK PATHS (red/brown like blueprint) ─── */
function drawBrickPaths(g) {
  g.fillStyle = P.brick;
  // Main vertical spine
  F(g, 280, 165, 55, 970);
  // Horizontal connectors
  F(g, 18, 185, 700, 25); // top
  F(g, 18, 495, 700, 25); // middle
  F(g, 18, 840, 700, 25); // lower
  F(g, 250, 1100, 150, 70); // gate approach
  // Branches
  F(g, 240, 495, 25, 340); // left vert
  F(g, 380, 240, 25, 260); // right vert upper
  F(g, 380, 530, 25, 310); // right vert lower
  F(g, 345, 840, 25, 260); // center lower
  // Brick texture lines
  g.fillStyle = P.brickD;
  F(g, 278, 165, 2, 970);
  F(g, 335, 165, 2, 970);
  F(g, 18, 183, 700, 2);
  F(g, 18, 210, 700, 2);
  F(g, 18, 493, 700, 2);
  F(g, 18, 520, 700, 2);
  F(g, 18, 838, 700, 2);
  F(g, 18, 865, 700, 2);
  g.fillStyle = P.brickL;
  F(g, 305, 165, 4, 970);
  F(g, 18, 197, 700, 3);
}

/* ── LARGE RIVER / LAKE (top-right, dominant feature) ─── */
function drawLargeRiver(g) {
  // This is the HUGE water body spanning top-right ~60% of upper map
  g.fillStyle = P.wDeep;
  // Main body — irregular shape
  F(g, 250, 14, 468, 165); // top section
  F(g, 340, 14, 378, 250); // extends down right side
  F(g, 380, 200, 338, 80); // continues right

  // Lighter inner water
  g.fillStyle = P.wMid;
  F(g, 270, 25, 430, 140);
  F(g, 360, 25, 350, 220);
  F(g, 400, 210, 310, 55);

  // Water highlights / reflections
  g.fillStyle = P.wLt;
  F(g, 320, 50, 60, 6);
  F(g, 450, 80, 50, 5);
  F(g, 550, 55, 40, 5);
  F(g, 400, 130, 55, 5);
  F(g, 550, 150, 45, 5);
  F(g, 500, 230, 50, 5);

  g.fillStyle = P.wSh;
  F(g, 330, 52, 12, 4);
  F(g, 460, 82, 10, 3);
  F(g, 555, 57, 8, 3);
  F(g, 410, 132, 10, 3);

  // Lily pads
  g.fillStyle = "#2a8a3a";
  F(g, 350, 60, 10, 7);
  F(g, 420, 90, 10, 7);
  F(g, 500, 70, 9, 6);
  F(g, 380, 120, 10, 7);
  F(g, 550, 110, 9, 6);
  F(g, 480, 140, 10, 7);
  F(g, 600, 90, 8, 6);
  F(g, 450, 50, 9, 7);
  F(g, 520, 200, 9, 6);
  F(g, 450, 230, 10, 7);

  // Lotus flowers (pink dots on lily pads)
  g.fillStyle = "#e85a8a";
  F(g, 352, 58, 5, 4);
  F(g, 502, 68, 5, 4);
  F(g, 382, 118, 5, 4);
  F(g, 605, 88, 4, 4);

  // Small island in lake
  g.fillStyle = P.grass;
  F(g, 470, 100, 30, 20);
  g.fillStyle = P.grassL;
  F(g, 475, 103, 20, 14);

  // Shore vegetation on edges
  g.fillStyle = P.tMd;
  F(g, 245, 14, 12, 10);
  F(g, 245, 100, 12, 10);
  F(g, 245, 160, 12, 10);
  F(g, 335, 175, 12, 8);
  F(g, 375, 265, 12, 8);
  F(g, 710, 14, 8, 10);
  F(g, 710, 80, 8, 10);
  F(g, 710, 160, 8, 10);
}

/* ── GARDEN (top-left) ─── */
function drawGarden(g) {
  const bx = 25,
    by = 18,
    bw = 210,
    bh = 155;
  // Brown soil base
  g.fillStyle = "#5a3a1e";
  F(g, bx, by, bw, bh);
  // Crop rows with varying colors
  const crops = [
    "#2d8a1e",
    "#4aaa30",
    "#6bc048",
    "#228833",
    "#3a9a28",
    "#55bb3a",
  ];
  for (let row = 0; row < 5; row++) {
    g.fillStyle = crops[row % crops.length];
    F(g, bx + 8, by + 10 + row * 24, (bw - 60) * 0.6, 16);
    g.fillStyle = crops[(row + 2) % crops.length];
    F(g, bx + 8 + (bw - 60) * 0.65, by + 10 + row * 24, (bw - 60) * 0.35, 16);
  }
  // Small shed/hut (brown building, top-right of garden)
  g.fillStyle = "#7a5530";
  F(g, bx + bw - 55, by + 5, 45, 40);
  g.fillStyle = P.roofOrD;
  F(g, bx + bw - 60, by, 55, 12);
  // Fence
  g.fillStyle = "#8a7a55";
  F(g, bx, by, bw, 3);
  F(g, bx, by + bh - 3, bw, 3);
  F(g, bx, by, 3, bh);
  F(g, bx + bw - 3, by, 3, bh);
  lbl(g, bx + 60, by + bh - 8, "KHU VƯỜN", 6);
  lbl(g, bx + 60, by + bh, "THỰC NGHIỆM", 5);
}

/* ── BUILDING A (top-right, large courtyard) ─── */
function drawBuildingA(g) {
  const bx = 430,
    by = 150,
    bw = 220,
    bh = 160;
  // Outer walls
  g.fillStyle = P.wallBg;
  F(g, bx, by, bw, bh);
  // Roof edges (all four sides — thick orange border)
  g.fillStyle = P.roofOr;
  F(g, bx - 5, by - 5, bw + 10, 20);
  F(g, bx - 5, by + bh - 14, bw + 10, 20);
  F(g, bx - 5, by, 20, bh);
  F(g, bx + bw - 14, by, 20, bh);
  g.fillStyle = P.roofOrD;
  F(g, bx - 5, by - 5, bw + 10, 6);
  F(g, bx - 5, by, 6, bh);
  // Inner courtyard (red square pattern like blueprint)
  g.fillStyle = P.roofRd;
  F(g, bx + 30, by + 30, bw - 60, bh - 60);
  g.fillStyle = P.roofRdD;
  F(g, bx + 50, by + 50, bw - 100, bh - 100);
  // Center structure
  g.fillStyle = P.wallBg;
  F(g, bx + bw / 2 - 22, by + bh / 2 - 16, 44, 32);
  g.fillStyle = P.roofOr;
  F(g, bx + bw / 2 - 26, by + bh / 2 - 20, 52, 8);
  // Windows on outer edges
  g.fillStyle = P.winBl;
  for (let wy = by + 18; wy < by + bh - 18; wy += 20) {
    F(g, bx + 4, wy, 10, 12);
    F(g, bx + bw - 14, wy, 10, 12);
  }
  for (let wx = bx + 25; wx < bx + bw - 25; wx += 18) {
    F(g, wx, by + 4, 11, 10);
    F(g, wx, by + bh - 14, 11, 10);
  }
  lbl(g, bx + bw / 2, by + bh / 2 - 4, "CANTIN", 8);
  lbl(g, bx + bw / 2, by + bh / 2 + 8, "ĂN UỐNG & GIAO LƯU", 5);
}

/* ── DORM B (behind Toà A, right side) ─── */
function drawDormB(g) {
  const bx = 690,
    by = 155,
    bw = 55,
    bh = 150;
  // Main structure
  g.fillStyle = P.wallBg;
  F(g, bx, by, bw, bh);
  // Roof
  g.fillStyle = P.roofOr;
  F(g, bx - 3, by - 3, bw + 6, 12);
  F(g, bx - 3, by, 12, bh);
  F(g, bx + bw - 8, by, 12, bh);
  g.fillStyle = P.roofOrD;
  F(g, bx - 3, by - 3, bw + 6, 4);
  // Windows (3 floors)
  g.fillStyle = P.winBl;
  for (let wy = by + 15; wy < by + bh - 10; wy += 28) {
    F(g, bx + 6, wy, 16, 18);
    F(g, bx + 30, wy, 16, 18);
  }
  // Door
  g.fillStyle = P.door;
  F(g, bx - 3, by + bh / 2 - 10, 6, 20);
  lbl(g, bx + bw / 2, by + bh + 10, "KÝ TÚC XÁ B", 5);
}

/* ── SPORTS AREA (left side) ─── */
function drawSportsArea(g) {
  const bx = 28,
    by = 215;
  // Basketball court
  g.fillStyle = P.crtBl;
  F(g, bx, by, 100, 100);
  g.fillStyle = P.wh;
  F(g, bx + 48, by, 3, 100);
  F(g, bx, by + 48, 100, 3);
  // Center circle
  F(g, bx + 38, by + 38, 24, 2);
  F(g, bx + 38, by + 58, 24, 2);
  F(g, bx + 36, by + 40, 2, 18);
  F(g, bx + 62, by + 40, 2, 18);
  // Hoops
  F(g, bx + 8, by + 44, 8, 8);
  F(g, bx + 84, by + 44, 8, 8);

  // Tennis court (right of basketball)
  g.fillStyle = P.crtGn;
  F(g, bx + 110, by, 92, 100);
  g.fillStyle = P.wh;
  F(g, bx + 110, by, 92, 2);
  F(g, bx + 110, by + 98, 92, 2);
  F(g, bx + 110, by, 2, 100);
  F(g, bx + 200, by, 2, 100);
  F(g, bx + 155, by, 2, 100); // net

  lbl(g, bx + 100, by - 6, "SÂN THỂ THAO", 6);
}

/* ── FOOTBALL FIELD (left, below sports) ─── */
function drawFootballField(g) {
  const fx = 28,
    fy = 340,
    fw = 205,
    fh = 148;
  // Track
  g.fillStyle = P.trkRd;
  F(g, fx, fy, fw, fh);
  g.fillStyle = "#c55a4a";
  F(g, fx + 10, fy + 8, fw - 20, fh - 16);
  // Field
  g.fillStyle = P.fldGn;
  F(g, fx + 22, fy + 20, fw - 44, fh - 40);
  // Markings
  g.fillStyle = P.wh;
  F(g, fx + 22, fy + 20, fw - 44, 2);
  F(g, fx + 22, fy + fh - 22, fw - 44, 2);
  F(g, fx + 22, fy + 20, 2, fh - 40);
  F(g, fx + fw - 24, fy + 20, 2, fh - 40);
  F(g, fx + 22, fy + fh / 2, fw - 44, 2);
  // Goals
  F(g, fx + 22, fy + fh / 2 - 14, 6, 28);
  F(g, fx + fw - 30, fy + fh / 2 - 14, 6, 28);
}

/* ── HỒ SEN — Lotus Pond (center-right) ─── */
function drawLotusPond(g) {
  const px = 395,
    py = 335,
    pw = 190,
    ph = 110;
  // Water
  g.fillStyle = P.wDeep;
  F(g, px + 10, py, pw - 20, ph);
  F(g, px, py + 10, pw, ph - 20);
  g.fillStyle = P.wMid;
  F(g, px + 20, py + 12, pw - 40, ph - 24);
  // Highlights
  g.fillStyle = P.wLt;
  F(g, px + 40, py + 30, 30, 5);
  F(g, px + 90, py + 50, 25, 4);
  F(g, px + 60, py + 75, 20, 4);
  g.fillStyle = P.wSh;
  F(g, px + 45, py + 32, 8, 3);
  F(g, px + 100, py + 52, 6, 3);
  // Lily pads
  g.fillStyle = "#2a8a3a";
  F(g, px + 35, py + 40, 10, 7);
  F(g, px + 80, py + 55, 10, 7);
  F(g, px + 120, py + 38, 9, 6);
  F(g, px + 140, py + 65, 10, 7);
  g.fillStyle = "#e85a8a";
  F(g, px + 37, py + 38, 5, 4);
  F(g, px + 122, py + 36, 5, 4);
  // Shore
  g.fillStyle = P.tMd;
  F(g, px - 3, py + 5, 10, 8);
  F(g, px + pw - 8, py + 5, 10, 8);
  F(g, px + 5, py + ph - 5, 10, 8);
  F(g, px + pw - 15, py + ph - 5, 10, 8);
  lbl(g, px + pw / 2, py + ph / 2 + 2, "HỒ SEN", 7);
}

/* ── CEMENT PLAZA (between Hồ Sen and Toà Alpha) ─── */
function drawCementPlaza(g) {
  const px = 390,
    py = 700,
    pw = 280,
    ph = 135;
  // Main concrete area
  g.fillStyle = "#9a9590";
  F(g, px, py, pw, ph);
  // Lighter inner area
  g.fillStyle = "#a8a4a0";
  F(g, px + 6, py + 6, pw - 12, ph - 12);
  // Tile grid lines
  g.fillStyle = "#8a8580";
  for (let tx = px + 30; tx < px + pw; tx += 35) F(g, tx, py, 1, ph);
  for (let ty = py + 30; ty < py + ph; ty += 35) F(g, px, ty, pw, 1);
  // Darker edge
  g.fillStyle = "#7a7570";
  F(g, px, py, pw, 2);
  F(g, px, py + ph - 2, pw, 2);
  F(g, px, py, 2, ph);
  F(g, px + pw - 2, py, 2, ph);
}

/* ── DORM A (where Cafe was, center-right) ─── */
function drawDormA(g) {
  const bx = 500,
    by = 440,
    bw = 130,
    bh = 140;
  // Main structure
  g.fillStyle = P.wallBg;
  F(g, bx, by, bw, bh);
  // Roof
  g.fillStyle = P.roofOr;
  F(g, bx - 4, by - 4, bw + 8, 14);
  F(g, bx - 4, by + bh - 8, bw + 8, 14);
  F(g, bx - 4, by, 14, bh);
  F(g, bx + bw - 8, by, 14, bh);
  g.fillStyle = P.roofOrD;
  F(g, bx - 4, by - 4, bw + 8, 5);
  F(g, bx - 4, by, 5, bh);
  // Inner courtyard
  g.fillStyle = P.roofRd;
  F(g, bx + 20, by + 20, bw - 40, bh - 40);
  g.fillStyle = P.roofRdD;
  F(g, bx + 30, by + 28, bw - 60, bh - 56);
  // Windows
  g.fillStyle = P.winBl;
  for (let wx = bx + 14; wx < bx + bw - 14; wx += 20) {
    F(g, wx, by + 4, 12, 10);
    F(g, wx, by + bh - 14, 12, 10);
  }
  // Door
  g.fillStyle = P.door;
  F(g, bx - 4, by + bh / 2 - 10, 8, 20);
  lbl(g, bx + bw / 2, by + bh / 2, "KÝ TÚC XÁ A", 6);
}

/* ── BUILDING B — Large U-courtyard (center) ─── */
function drawBuildingB(g) {
  const bx = 30,
    by = 535,
    bw = 245,
    bh = 280;
  // Outer walls
  g.fillStyle = P.wallBg;
  F(g, bx, by, bw, bh);
  // Thick orange roof edges
  g.fillStyle = P.roofOr;
  F(g, bx - 6, by - 6, bw + 12, 22);
  F(g, bx - 6, by + bh - 14, bw + 12, 22);
  F(g, bx - 6, by, 22, bh);
  F(g, bx + bw - 14, by, 22, bh);
  g.fillStyle = P.roofOrD;
  F(g, bx - 6, by - 6, bw + 12, 7);
  F(g, bx - 6, by, 7, bh);
  // Inner courtyard — nested red squares like blueprint
  g.fillStyle = P.roofRd;
  F(g, bx + 36, by + 36, bw - 72, bh - 72);
  g.fillStyle = P.roofRdD;
  F(g, bx + 60, by + 60, bw - 120, bh - 120);
  // Core center block
  g.fillStyle = P.roofRd;
  F(g, bx + bw / 2 - 25, by + bh / 2 - 18, 50, 36);
  // Windows on all sides
  g.fillStyle = P.winBl;
  for (let wy = by + 22; wy < by + bh - 22; wy += 24) {
    F(g, bx + 5, wy, 12, 15);
    F(g, bx + bw - 17, wy, 12, 15);
  }
  for (let wx = bx + 28; wx < bx + bw - 28; wx += 20) {
    F(g, wx, by + 5, 13, 12);
    F(g, wx, by + bh - 17, 13, 12);
  }
  // Entrance (right)
  g.fillStyle = P.door;
  F(g, bx + bw - 4, by + bh / 2 - 16, 10, 32);
  lbl(g, bx + bw / 2, by + bh / 2 - 2, "TOÀ BETA", 8);
}

/* ── LOWER POND (between Building B and Library) ─── */
function drawLowerPond(g) {
  const px = 420,
    py = 610,
    pw = 165,
    ph = 80;
  g.fillStyle = P.wDeep;
  F(g, px + 8, py, pw - 16, ph);
  F(g, px, py + 8, pw, ph - 16);
  g.fillStyle = P.wMid;
  F(g, px + 16, py + 10, pw - 32, ph - 20);
  g.fillStyle = P.wLt;
  F(g, px + 30, py + 22, 30, 4);
  F(g, px + 80, py + 40, 25, 4);
  // Shore plants
  g.fillStyle = P.tMd;
  F(g, px - 3, py + 10, 8, 6);
  F(g, px + pw - 6, py + 10, 8, 6);
  F(g, px + 20, py + ph - 4, 8, 6);
  F(g, px + pw - 30, py + ph - 4, 8, 6);
}

/* ── TOÀ ALPHA (bottom-right, courtyard — opposite Toà Gamma) ─── */
function drawToaAlpha(g) {
  const bx = 400,
    by = 880,
    bw = 260,
    bh = 240;
  // Outer walls
  g.fillStyle = P.wallBg;
  F(g, bx, by, bw, bh);
  // Thick orange roof edges
  g.fillStyle = P.roofOr;
  F(g, bx - 6, by - 6, bw + 12, 22);
  F(g, bx - 6, by + bh - 14, bw + 12, 22);
  F(g, bx - 6, by, 22, bh);
  F(g, bx + bw - 14, by, 22, bh);
  g.fillStyle = P.roofOrD;
  F(g, bx - 6, by - 6, bw + 12, 7);
  F(g, bx - 6, by, 7, bh);
  // Inner courtyard
  g.fillStyle = P.roofRd;
  F(g, bx + 36, by + 36, bw - 72, bh - 72);
  g.fillStyle = P.roofRdD;
  F(g, bx + 58, by + 58, bw - 116, bh - 116);
  // Center
  g.fillStyle = P.roofRd;
  F(g, bx + bw / 2 - 20, by + bh / 2 - 16, 40, 32);
  // Windows
  g.fillStyle = P.winBl;
  for (let wy = by + 20; wy < by + bh - 20; wy += 22) {
    F(g, bx + 5, wy, 12, 14);
    F(g, bx + bw - 17, wy, 12, 14);
  }
  for (let wx = bx + 25; wx < bx + bw - 25; wx += 18) {
    F(g, wx, by + 5, 11, 12);
    F(g, wx, by + bh - 17, 11, 12);
  }
  // Entrance
  g.fillStyle = P.door;
  F(g, bx - 4, by + bh / 2 - 14, 10, 28);
  lbl(g, bx + bw / 2, by + bh / 2, "TOÀ ALPHA", 8);
}

/* ── TOÀ GAMMA (bottom-left, courtyard) ─── */
function drawToaGamma(g) {
  const bx = 30,
    by = 880,
    bw = 245,
    bh = 240;
  // Outer walls
  g.fillStyle = P.wallBg;
  F(g, bx, by, bw, bh);
  // Thick orange roof
  g.fillStyle = P.roofOr;
  F(g, bx - 6, by - 6, bw + 12, 22);
  F(g, bx - 6, by + bh - 14, bw + 12, 22);
  F(g, bx - 6, by, 22, bh);
  F(g, bx + bw - 14, by, 22, bh);
  g.fillStyle = P.roofOrD;
  F(g, bx - 6, by - 6, bw + 12, 7);
  F(g, bx - 6, by, 7, bh);
  // Inner courtyard — nested
  g.fillStyle = P.roofRd;
  F(g, bx + 36, by + 36, bw - 72, bh - 72);
  g.fillStyle = P.roofRdD;
  F(g, bx + 58, by + 58, bw - 116, bh - 116);
  // Center
  g.fillStyle = P.roofRd;
  F(g, bx + bw / 2 - 20, by + bh / 2 - 16, 40, 32);
  // Windows
  g.fillStyle = P.winBl;
  for (let wy = by + 20; wy < by + bh - 20; wy += 22) {
    F(g, bx + 5, wy, 12, 14);
    F(g, bx + bw - 17, wy, 12, 14);
  }
  for (let wx = bx + 25; wx < bx + bw - 25; wx += 18) {
    F(g, wx, by + 5, 11, 12);
    F(g, wx, by + bh - 17, 11, 12);
  }
  // Entrance
  g.fillStyle = P.door;
  F(g, bx + bw - 4, by + bh / 2 - 14, 10, 28);

  lbl(g, bx + bw / 2, by + bh / 2, "TOÀ GAMMA", 8);
}

/* ── MAIN GATE (bottom-center) ─── */
function drawMainGate(g) {
  const gx = 255,
    gy = 1140,
    gw = 130,
    gh = 55;
  // Pillars
  g.fillStyle = P.wallBg;
  F(g, gx, gy + 15, 24, gh - 15);
  F(g, gx + gw - 24, gy + 15, 24, gh - 15);
  // Roof
  g.fillStyle = P.roofRd;
  F(g, gx - 10, gy, gw + 20, 20);
  g.fillStyle = P.roofRdD;
  F(g, gx - 10, gy, gw + 20, 5);
  g.fillStyle = P.roofOr;
  F(g, gx + 18, gy - 10, gw - 36, 14);
  // Opening
  g.fillStyle = P.brick;
  F(g, gx + 28, gy + 15, gw - 56, gh - 15);
  // Columns
  g.fillStyle = P.wallWh;
  F(g, gx + 24, gy + 10, 7, gh - 10);
  F(g, gx + gw - 31, gy + 10, 7, gh - 10);
  // Road below
  g.fillStyle = P.brick;
  F(g, gx + 28, gy + gh, gw - 56, 70);
  // Parking lots
  g.fillStyle = P.wallDk;
  F(g, gx - 120, gy + 20, 110, 40);
  F(g, gx + gw + 10, gy + 20, 110, 40);
  g.fillStyle = P.wh;
  for (let px = gx - 115; px < gx - 15; px += 12) F(g, px, gy + 25, 1, 30);
  for (let px = gx + gw + 15; px < gx + gw + 115; px += 12)
    F(g, px, gy + 25, 1, 30);

  lbl(g, gx + gw / 2, gy - 16, "CỔNG CHÍNH", 7);
}

/* ── MAP BANNER & FPT SIGN ─── */
function drawMapBanner(g) {
  // FPT University sign (bottom-right, dark box)
  g.fillStyle = "#1a2030";
  F(g, 570, 1135, 145, 80);
  g.fillStyle = "#2a3040";
  F(g, 572, 1137, 141, 76);
  g.fillStyle = P.roofOr;
  lbl(g, 643, 1158, "FPT UNIVERSITY", 6);
  lbl(g, 643, 1172, "DA NANG - GAME", 5);
  lbl(g, 643, 1185, "MAP", 7);

  // Bottom banner "FPTU MAP - Lvl 1"
  g.fillStyle = "#1a2838";
  F(g, 220, H - 28, 300, 22);
  g.fillStyle = P.roofOr;
  F(g, 220, H - 28, 300, 3);
  g.fillStyle = "#ffd700";
  g.font = "bold 8px 'Press Start 2P', monospace";
  g.textAlign = "center";
  g.fillText("⚑ FPTU MAP - Lvl 1 ⚑", 370, H - 12);
}

/* ── TREES ─── */
function drawTrees(g) {
  const r = rng(99);
  // Left border
  for (let ty = 0; ty < H; ty += 11 + r() * 7)
    T(g, 3 + r() * 12, ty, 7 + r() * 5);
  // Right border (dense)
  for (let ty = 0; ty < H; ty += 10 + r() * 6)
    T(g, 724 + r() * 18, ty, 7 + r() * 5);
  // Top border
  for (let tx = 0; tx < 240; tx += 10 + r() * 6)
    T(g, tx, 2 + r() * 8, 7 + r() * 4);
  // Bottom border
  for (let tx = 0; tx < 230; tx += 10 + r() * 6)
    T(g, tx, 1250 + r() * 15, 7 + r() * 4);
  for (let tx = 420; tx < 560; tx += 10 + r() * 6)
    T(g, tx, 1250 + r() * 15, 7 + r() * 4);
  // Between garden and river
  T(g, 240, 20, 12);
  T(g, 240, 60, 11);
  T(g, 240, 110, 10);
  T(g, 240, 145, 11);
  // Right of river
  T(g, 710, 20, 10);
  T(g, 712, 60, 9);
  T(g, 710, 100, 10);
  T(g, 712, 140, 9);
  T(g, 710, 200, 10);
  T(g, 712, 250, 9);
  // Between sports and building A
  T(g, 250, 220, 10);
  T(g, 260, 280, 9);
  T(g, 250, 350, 10);
  T(g, 260, 420, 9);
  T(g, 250, 460, 10);
  // Around ponds
  T(g, 380, 340, 10);
  T(g, 590, 350, 10);
  T(g, 380, 430, 10);
  T(g, 590, 430, 10);
  // Between buildings
  T(g, 380, 550, 10);
  T(g, 380, 620, 9);
  T(g, 380, 700, 10);
  T(g, 380, 770, 9);
  // Near gate
  T(g, 220, 1160, 12);
  T(g, 410, 1160, 12);
  T(g, 200, 1200, 10);
  T(g, 430, 1200, 10);
  // Scattered campus trees
  T(g, 490, 550, 9);
  T(g, 600, 530, 10);
  T(g, 620, 680, 10);
  T(g, 650, 750, 9);
  T(g, 500, 930, 10);
  T(g, 600, 950, 9);
  T(g, 350, 1050, 10);
  T(g, 280, 1080, 9);
}

function T(g, x, y, s) {
  s = Math.max(5, s);
  g.fillStyle = P.trunk;
  F(g, x + s / 2 - 1, y + s - 3, 3, 5);
  g.fillStyle = P.tDk;
  F(g, x, y, s, s);
  g.fillStyle = P.tMd;
  F(g, x + 1, y + 1, s - 2, s - 2);
  g.fillStyle = P.tLt;
  F(g, x + 2, y + 2, s / 2, s / 2);
  g.fillStyle = "#50c838";
  F(g, x + 3, y + 3, 2, 2);
}

/* ── DECORATIONS ─── */
function drawDecorations(g) {
  const lamps = [
    [275, 280],
    [275, 500],
    [275, 700],
    [275, 900],
    [340, 280],
    [340, 500],
    [340, 700],
    [340, 900],
    [150, 200],
    [450, 200],
    [550, 200],
    [150, 510],
    [450, 510],
    [550, 510],
    [150, 855],
    [450, 855],
    [550, 855],
  ];
  for (const [lx, ly] of lamps) {
    g.fillStyle = "#9ca3af";
    F(g, lx, ly, 3, 8);
    g.fillStyle = "#ffd700";
    F(g, lx - 1, ly - 2, 5, 3);
  }
  // Benches
  g.fillStyle = "#6b4226";
  F(g, 262, 360, 12, 5);
  F(g, 340, 360, 12, 5);
  F(g, 262, 760, 12, 5);
  F(g, 340, 760, 12, 5);
}

/* ── BORDER GLOW ─── */
function drawBorderGlow(g) {
  g.strokeStyle = P.cyan;
  g.lineWidth = 2;
  g.globalAlpha = 0.18;
  g.strokeRect(16, 10, W - 52, H - 42);
  g.lineWidth = 4;
  g.globalAlpha = 0.07;
  g.strokeRect(13, 7, W - 46, H - 36);
  g.globalAlpha = 1;
}

/* ── UTILS ─── */
function F(g, x, y, w, h) {
  g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function lbl(g, x, y, t, fs) {
  g.font = `bold ${fs}px 'Press Start 2P', monospace`;
  g.textAlign = "center";
  const tw = g.measureText(t).width;
  g.fillStyle = "rgba(0,0,0,0.55)";
  g.fillRect(
    Math.round(x - tw / 2 - 3),
    Math.round(y - fs + 1),
    tw + 6,
    fs + 3,
  );
  g.fillStyle = "#fff";
  g.fillText(t, Math.round(x), Math.round(y));
}

function rng(s) {
  let t = s | 0;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
