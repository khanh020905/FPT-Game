import { useGame } from "../engine/GameContext";
import { useState, useCallback } from "react";
import { startMusic, stopMusic, isMusicPlaying } from "../engine/musicEngine";

export default function StartScreen() {
  const { newGame, loadGame, hasSave } = useGame();
  const canContinue = hasSave();
  const [musicOn, setMusicOn] = useState(isMusicPlaying());

  const handleMusicToggle = useCallback(() => {
    if (musicOn) {
      stopMusic();
      setMusicOn(false);
    } else {
      startMusic();
      setMusicOn(true);
    }
  }, [musicOn]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0e17] via-[#111827] to-[#1a1f2e]">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ["#00fff7", "#ff2d95", "#39ff14", "#ffd700"][i % 4],
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing Logo Area */}
      <div className="relative z-10 text-center mb-12">
        <div className="text-7xl mb-6 animate-[float_3s_ease-in-out_infinite]">
          🎓
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3 tracking-wider"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            color: "#00fff7",
            textShadow: "0 0 20px #00fff7, 0 0 40px #00fff780",
          }}
        >
          FPT LIFE
        </h1>
        <p
          className="text-lg md:text-xl text-[#ff2d95] tracking-widest uppercase"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            textShadow: "0 0 10px #ff2d95",
          }}
        >
          Simulator
        </p>
        <p className="text-sm text-gray-400 mt-4 max-w-md mx-auto leading-relaxed">
          Trải nghiệm cuộc sống sinh viên năm nhất tại FPT University Da Nang.
          <br />
          Quản lý học tập, sức khỏe, và tài chính để sống sót!
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="relative z-10 flex flex-col gap-4 w-72">
        <button
          onClick={newGame}
          className="group relative px-8 py-4 rounded-xl font-bold text-lg text-white
                     bg-gradient-to-r from-[#f37021] to-[#ff2d95] 
                     hover:from-[#ff2d95] hover:to-[#b026ff]
                     transition-all duration-300 transform hover:scale-105
                     shadow-lg shadow-[#f3702140] hover:shadow-[#ff2d9540]"
        >
          <span className="flex items-center justify-center gap-3">
            🎮 <span>New Game</span>
          </span>
          <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {canContinue && (
          <button
            onClick={loadGame}
            className="group relative px-8 py-4 rounded-xl font-bold text-lg text-white
                       bg-gradient-to-r from-[#1e3a5f] to-[#2a5298]
                       hover:from-[#2a5298] hover:to-[#3b82f6]
                       transition-all duration-300 transform hover:scale-105
                       border border-[#3b82f640]
                       shadow-lg shadow-[#1e3a5f40]"
          >
            <span className="flex items-center justify-center gap-3">
              💾 <span>Continue</span>
            </span>
          </button>
        )}

        {/* Music Toggle Button */}
        <button
          onClick={handleMusicToggle}
          className="group relative px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 border"
          style={{
            background: musicOn
              ? "linear-gradient(135deg, rgba(0, 255, 247, 0.12), rgba(139, 92, 246, 0.12))"
              : "rgba(255, 255, 255, 0.03)",
            borderColor: musicOn
              ? "rgba(0, 255, 247, 0.35)"
              : "rgba(255, 255, 255, 0.08)",
            boxShadow: musicOn ? "0 0 20px rgba(0, 255, 247, 0.15)" : "none",
          }}
        >
          <span className="flex items-center justify-center gap-3">
            <span
              style={{
                animation: musicOn
                  ? "musicBounce 1s ease-in-out infinite"
                  : "none",
                display: "inline-block",
              }}
            >
              {musicOn ? "🎵" : "🔇"}
            </span>
            <span
              style={{
                color: musicOn ? "#00fff7" : "#6b7280",
                textShadow: musicOn ? "0 0 8px rgba(0, 255, 247, 0.4)" : "none",
              }}
            >
              {musicOn ? "Music ON" : "Music OFF"}
            </span>
          </span>
          {musicOn && (
            <span
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                border: "1px solid rgba(0, 255, 247, 0.2)",
                animation: "musicPulse 2s ease-in-out infinite",
              }}
            />
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center z-10">
        <p
          className="text-xs text-gray-600"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          v1.0 — FPT University Da Nang
        </p>
        <p className="text-[10px] text-gray-700 mt-1">
          ⌨️ Nhấn bất kỳ đâu để bắt đầu
        </p>
      </div>

      {/* Decorative Corner Glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00fff7] opacity-5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff2d95] opacity-5 blur-[100px] rounded-full" />
    </div>
  );
}
