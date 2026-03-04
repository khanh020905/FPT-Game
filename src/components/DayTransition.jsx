import { useEffect, useState } from "react";
import { useGame } from "../engine/GameContext";

export default function DayTransition() {
  const { state } = useGame();
  const { showDayTransition, day } = state;
  const [visible, setVisible] = useState(false);
  const [animPhase, setAnimPhase] = useState(0);

  useEffect(() => {
    if (showDayTransition) {
      setVisible(true);
      setAnimPhase(0);

      const t1 = setTimeout(() => setAnimPhase(1), 100);
      const t2 = setTimeout(() => setAnimPhase(2), 1500);
      const t3 = setTimeout(() => {
        setAnimPhase(3);
        setTimeout(() => setVisible(false), 500);
      }, 2500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [showDayTransition, day]);

  if (!visible) return null;

  const timeEmoji = day % 3 === 0 ? "🌧️" : day % 2 === 0 ? "☁️" : "☀️";

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center transition-all duration-500 ${
        animPhase >= 3 ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at center, #0a0e17 0%, #000000 100%)",
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `pixel-blink ${1 + Math.random() * 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Moon/Sun icon */}
      <div
        className={`text-6xl mb-6 transition-all duration-700 ${
          animPhase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))" }}
      >
        {day > 1 ? "🌙" : "🌅"}
      </div>

      {/* Day Number */}
      <div
        className={`text-center transition-all duration-500 ${
          animPhase >= 1
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-sm text-[#00fff7] tracking-[0.3em] uppercase mb-2">
          Ngày mới bắt đầu
        </p>
        <h1
          className="text-5xl font-bold text-white mb-3"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            textShadow: "0 0 30px #f37021, 0 0 60px #f3702140",
          }}
        >
          Ngày {day}
        </h1>
        <p className="text-lg text-gray-400">
          {timeEmoji}{" "}
          {day <= 7
            ? "Tuần 1"
            : day <= 14
              ? "Tuần 2"
              : day <= 21
                ? "Tuần 3"
                : "Tuần 4"}
        </p>
      </div>

      {/* Loading bar */}
      <div
        className={`mt-8 w-48 h-1 rounded-full bg-white/10 overflow-hidden transition-all duration-500 ${
          animPhase >= 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#00fff7] to-[#ff2d95] rounded-full"
          style={{
            width: animPhase >= 2 ? "100%" : "0%",
            transition: "width 1s ease-out",
          }}
        />
      </div>
    </div>
  );
}
