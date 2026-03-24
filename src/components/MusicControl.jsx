/**
 * MusicControl.jsx — Floating music toggle button with volume slider
 * Pixel-art styled controls for the chiptune background music
 */

import { useState, useCallback, useEffect } from "react";
import {
  startMusic,
  stopMusic,
  setVolume,
  isMusicPlaying,
} from "../engine/musicEngine";

export default function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVol] = useState(0.5);
  const [showSlider, setShowSlider] = useState(false);

  // Start music on first user interaction (autoplay policy)
  const handleToggle = useCallback(() => {
    if (playing) {
      stopMusic();
      setPlaying(false);
    } else {
      startMusic();
      setPlaying(true);
    }
  }, [playing]);

  const handleVolumeChange = useCallback((e) => {
    const v = parseFloat(e.target.value);
    setVol(v);
    setVolume(v);
  }, []);

  // Sync state if music stops externally
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaying(isMusicPlaying());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      {/* Volume Slider (shows on hover) */}
      {showSlider && (
        <div
          className="px-3 py-2 rounded-xl flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]"
          style={{
            background: "rgba(13, 17, 23, 0.95)",
            border: "1px solid rgba(0, 255, 247, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="text-[10px] text-gray-400">🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 accent-[#00fff7] cursor-pointer"
            style={{
              accentColor: "#00fff7",
            }}
          />
          <span className="text-[10px] text-gray-400">🔊</span>
          <span className="text-[9px] text-[#00fff7] font-mono w-7 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={handleToggle}
        className="group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: playing
            ? "linear-gradient(135deg, rgba(0, 255, 247, 0.15), rgba(243, 112, 33, 0.15))"
            : "rgba(13, 17, 23, 0.9)",
          border: `1.5px solid ${playing ? "rgba(0, 255, 247, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
          backdropFilter: "blur(10px)",
          boxShadow: playing
            ? "0 0 20px rgba(0, 255, 247, 0.2), inset 0 0 12px rgba(0, 255, 247, 0.05)"
            : "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
        title={playing ? "Tắt nhạc" : "Bật nhạc nền 🎵"}
      >
        {/* Music icon */}
        <span
          className="text-lg transition-transform"
          style={{
            animation: playing ? "musicBounce 1s ease-in-out infinite" : "none",
            filter: playing
              ? "drop-shadow(0 0 6px rgba(0, 255, 247, 0.5))"
              : "none",
          }}
        >
          {playing ? "🎵" : "🔇"}
        </span>

        {/* Pulsing ring when playing */}
        {playing && (
          <span
            className="absolute inset-0 rounded-xl"
            style={{
              border: "1.5px solid rgba(0, 255, 247, 0.3)",
              animation: "musicPulse 2s ease-in-out infinite",
            }}
          />
        )}
      </button>

      {/* CSS for animations */}
      <style>{`
        @keyframes musicBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-2px) scale(1.1); }
          50% { transform: translateY(0) scale(1); }
          75% { transform: translateY(1px) scale(0.95); }
        }
        @keyframes musicPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
