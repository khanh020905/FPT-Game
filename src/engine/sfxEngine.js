/**
 * SFX Engine — Programmatic sound effects using Web Audio API
 * No external files needed — 100% generated in browser
 */

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = "sine", volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently fail if audio not available
  }
}

// ── Click / Button press ──
export function sfxClick() {
  playTone(800, 0.08, "square", 0.08);
  setTimeout(() => playTone(1000, 0.06, "square", 0.06), 30);
}

// ── Open panel / tab ──
export function sfxOpen() {
  playTone(400, 0.1, "sine", 0.12);
  setTimeout(() => playTone(600, 0.1, "sine", 0.1), 60);
  setTimeout(() => playTone(800, 0.15, "sine", 0.08), 120);
}

// ── Close panel ──
export function sfxClose() {
  playTone(800, 0.1, "sine", 0.1);
  setTimeout(() => playTone(500, 0.12, "sine", 0.08), 60);
  setTimeout(() => playTone(300, 0.15, "sine", 0.06), 120);
}

// ── Success / Complete ──
export function sfxSuccess() {
  playTone(523, 0.12, "sine", 0.12);
  setTimeout(() => playTone(659, 0.12, "sine", 0.12), 100);
  setTimeout(() => playTone(784, 0.2, "sine", 0.15), 200);
  setTimeout(() => playTone(1047, 0.3, "sine", 0.1), 300);
}

// ── Error / Fail ──
export function sfxError() {
  playTone(300, 0.15, "square", 0.1);
  setTimeout(() => playTone(200, 0.25, "square", 0.08), 120);
}

// ── Interact (E key near zone) ──
export function sfxInteract() {
  playTone(600, 0.06, "triangle", 0.1);
  setTimeout(() => playTone(900, 0.1, "triangle", 0.08), 50);
}

// ── Navigate / Move to location ──
export function sfxNavigate() {
  playTone(440, 0.08, "sine", 0.08);
  setTimeout(() => playTone(660, 0.1, "sine", 0.06), 70);
}

// ── Notification pop ──
export function sfxNotify() {
  playTone(880, 0.06, "sine", 0.1);
  setTimeout(() => playTone(1100, 0.08, "sine", 0.08), 50);
}

// ── Purchase / Buy item ──
export function sfxPurchase() {
  playTone(500, 0.08, "triangle", 0.1);
  setTimeout(() => playTone(700, 0.08, "triangle", 0.1), 80);
  setTimeout(() => playTone(900, 0.15, "triangle", 0.12), 160);
}

// ── Mini-game correct answer ──
export function sfxCorrect() {
  playTone(700, 0.1, "sine", 0.12);
  setTimeout(() => playTone(900, 0.15, "sine", 0.1), 80);
}

// ── Mini-game wrong answer ──
export function sfxWrong() {
  playTone(250, 0.2, "sawtooth", 0.06);
  setTimeout(() => playTone(200, 0.25, "sawtooth", 0.05), 100);
}

// ── Day transition ──
export function sfxDayTransition() {
  playTone(330, 0.15, "sine", 0.1);
  setTimeout(() => playTone(440, 0.15, "sine", 0.1), 150);
  setTimeout(() => playTone(550, 0.15, "sine", 0.1), 300);
  setTimeout(() => playTone(660, 0.25, "sine", 0.12), 450);
}

// ── Sports selection ──
export function sfxSport() {
  playTone(500, 0.06, "triangle", 0.1);
  setTimeout(() => playTone(800, 0.1, "triangle", 0.12), 60);
}
