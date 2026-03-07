/**
 * musicEngine.js — Procedural chiptune / 8-bit background music
 * Generates a cheerful retro campus-life melody using Web Audio API
 * No external files needed!
 */

let audioCtx = null;
let isPlaying = false;
let masterGain = null;
let schedulerTimer = null;
let nextNoteTime = 0;
let currentStep = 0;

// ── Musical Data ──────────────────────────────────────────────
// Pentatonic scale notes (Hz) — always sounds pleasant
const NOTE_MAP = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  G4: 392.0,
  A4: 440.0,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
  A5: 880.0,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  G3: 196.0,
  A3: 220.0,
};

// Main melody — cheerful campus vibes (16 steps, loops)
const MELODY = [
  "E4",
  "G4",
  "A4",
  "G4",
  "C5",
  "A4",
  "G4",
  "E4",
  "D4",
  "E4",
  "G4",
  "A4",
  "G4",
  "E4",
  "D4",
  "C4",
  "E4",
  "A4",
  "C5",
  "A4",
  "G4",
  "E4",
  "G4",
  "A4",
  "C5",
  "D5",
  "C5",
  "A4",
  "G4",
  "E4",
  "D4",
  "E4",
];

// Harmony layer — softer background chords
const HARMONY = [
  "C4",
  null,
  "E4",
  null,
  "G4",
  null,
  "E4",
  null,
  "D4",
  null,
  "G4",
  null,
  "E4",
  null,
  "C4",
  null,
  "C4",
  null,
  "E4",
  null,
  "A4",
  null,
  "G4",
  null,
  "E4",
  null,
  "C5",
  null,
  "A4",
  null,
  "G4",
  null,
];

// Bass line — simple root notes
const BASS = [
  "C3",
  null,
  null,
  null,
  "G3",
  null,
  null,
  null,
  "D3",
  null,
  null,
  null,
  "E3",
  null,
  null,
  null,
  "C3",
  null,
  null,
  null,
  "A3",
  null,
  null,
  null,
  "E3",
  null,
  null,
  null,
  "G3",
  null,
  null,
  null,
];

// Drum pattern (kick/snare emulation)
const DRUMS = [
  "k",
  null,
  "h",
  null,
  "s",
  null,
  "h",
  null,
  "k",
  null,
  "h",
  "h",
  "s",
  null,
  "h",
  null,
  "k",
  null,
  "h",
  null,
  "s",
  null,
  "h",
  "h",
  "k",
  "k",
  "h",
  null,
  "s",
  null,
  "h",
  null,
];

const BPM = 140;
const STEP_DURATION = 60 / BPM / 2; // 16th notes

// ── Sound Generators ──────────────────────────────────────────

function playTone(freq, startTime, duration, type = "square", volume = 0.12) {
  if (!audioCtx || !masterGain) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  // Envelope: quick attack, sustain, fade out
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.setValueAtTime(volume * 0.8, startTime + duration * 0.6);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playDrum(type, startTime) {
  if (!audioCtx || !masterGain) return;

  if (type === "k") {
    // Kick drum — low frequency sweep
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.12);
    gain.gain.setValueAtTime(0.25, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(startTime);
    osc.stop(startTime + 0.15);
  } else if (type === "s") {
    // Snare — noise burst
    const bufferSize = audioCtx.sampleRate * 0.1;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    // Bandpass filter for snare character
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3000;
    filter.Q.value = 1;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start(startTime);
    noise.stop(startTime + 0.1);
  } else if (type === "h") {
    // Hi-hat — short noise
    const bufferSize = audioCtx.sampleRate * 0.04;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.06, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 8000;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start(startTime);
    noise.stop(startTime + 0.04);
  }
}

// ── Scheduler ─────────────────────────────────────────────────

function scheduleNote() {
  const totalSteps = MELODY.length;
  const step = currentStep % totalSteps;

  // Melody (square wave — classic chiptune)
  const melodyNote = MELODY[step];
  if (melodyNote && NOTE_MAP[melodyNote]) {
    playTone(
      NOTE_MAP[melodyNote],
      nextNoteTime,
      STEP_DURATION * 0.8,
      "square",
      0.08,
    );
  }

  // Harmony (triangle wave — softer)
  const harmonyNote = HARMONY[step];
  if (harmonyNote && NOTE_MAP[harmonyNote]) {
    playTone(
      NOTE_MAP[harmonyNote],
      nextNoteTime,
      STEP_DURATION * 1.5,
      "triangle",
      0.06,
    );
  }

  // Bass (triangle wave — deep)
  const bassNote = BASS[step];
  if (bassNote && NOTE_MAP[bassNote]) {
    playTone(
      NOTE_MAP[bassNote],
      nextNoteTime,
      STEP_DURATION * 2,
      "triangle",
      0.1,
    );
  }

  // Drums
  const drum = DRUMS[step];
  if (drum) {
    playDrum(drum, nextNoteTime);
  }

  nextNoteTime += STEP_DURATION;
  currentStep++;
}

function scheduler() {
  if (!audioCtx || !isPlaying) return;
  // Schedule notes ahead of time for smooth playback
  while (nextNoteTime < audioCtx.currentTime + 0.1) {
    scheduleNote();
  }
  schedulerTimer = setTimeout(scheduler, 25);
}

// ── Public API ────────────────────────────────────────────────

export function startMusic() {
  if (isPlaying) return;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);

  isPlaying = true;
  nextNoteTime = audioCtx.currentTime;
  currentStep = 0;
  scheduler();
}

export function stopMusic() {
  isPlaying = false;
  if (schedulerTimer) {
    clearTimeout(schedulerTimer);
    schedulerTimer = null;
  }
}

export function toggleMusic() {
  if (isPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
  return isPlaying;
}

export function setVolume(vol) {
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(
      Math.max(0, Math.min(1, vol)),
      audioCtx.currentTime,
    );
  }
}

export function isMusicPlaying() {
  return isPlaying;
}
