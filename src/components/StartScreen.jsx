import { useGame } from "../engine/GameContext";
import { useState, useCallback } from "react";
import { startMusic, stopMusic, isMusicPlaying } from "../engine/musicEngine";

const GUIDE_STEPS = [
  {
    emoji: "🎓",
    title: "Chào mừng đến FPT University!",
    desc: "Bạn sẽ đóng vai một sinh viên năm nhất tại FPT University Đà Nẵng. Hãy trải nghiệm cuộc sống đại học tại đây!",
  },
  {
    emoji: "🗺️",
    title: "Di chuyển & Khám phá",
    desc: "Dùng phím W A S D để di chuyển. Nhấn E khi đến gần các toà nhà để tương tác. Khám phá Toà Alpha, Cantin, KTX và nhiều hơn nữa!",
  },
  {
    emoji: "📊",
    title: "Quản lý chỉ số",
    desc: "Theo dõi Sức khỏe ❤️, Trí tuệ 🧠, Tự tin 💪, Tiến độ 📊 và Tài chính 💰. Cân bằng tất cả để sống sót qua đại học!",
  },
  {
    emoji: "🎯",
    title: "Hoàn thành nhiệm vụ",
    desc: "Mỗi ngày có các nhiệm vụ cần hoàn thành. Hãy làm theo hướng dẫn trên màn hình để không bỏ lỡ!",
  },
];

export default function StartScreen() {
  const { newGame, loadGame, hasSave } = useGame();
  const canContinue = hasSave();
  const [musicOn, setMusicOn] = useState(isMusicPlaying());
  const [step, setStep] = useState("menu"); // 'menu' | 'guide' | 'form'
  const [guideIndex, setGuideIndex] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [mssv, setMssv] = useState("");

  const handleMusicToggle = useCallback(() => {
    if (musicOn) {
      stopMusic();
      setMusicOn(false);
    } else {
      startMusic();
      setMusicOn(true);
    }
  }, [musicOn]);

  const handleStartNewGame = () => {
    setStep("guide");
    setGuideIndex(0);
  };

  const handleGuideNext = () => {
    if (guideIndex < GUIDE_STEPS.length - 1) {
      setGuideIndex((i) => i + 1);
    } else {
      setStep("form");
    }
  };

  const handleGuideBack = () => {
    if (guideIndex > 0) {
      setGuideIndex((i) => i - 1);
    }
  };

  const handleSubmitForm = () => {
    if (!playerName.trim() || !mssv.trim()) return;
    newGame({ playerName: playerName.trim(), mssv: mssv.trim() });
  };

  // ── GUIDE VIEW ──
  if (step === "guide") {
    const g = GUIDE_STEPS[guideIndex];
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0e17] via-[#111827] to-[#1a1f2e]">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
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

        <div
          className="relative z-10 glass-card max-w-lg w-full mx-4 p-8 border border-white/10 text-center"
          style={{ animation: "slide-up 0.4s ease-out" }}
        >
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {GUIDE_STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === guideIndex ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background:
                    i === guideIndex ? "#00fff7" : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          <span
            className="text-6xl block mb-4"
            style={{ animation: "float 2s ease-in-out infinite" }}
          >
            {g.emoji}
          </span>
          <h2
            style={{
              color: "#00fff7",
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "'Press Start 2P', monospace",
              marginBottom: 16,
              lineHeight: 1.8,
            }}
          >
            {g.title}
          </h2>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: 14,
              lineHeight: 1.9,
              marginBottom: 32,
            }}
          >
            {g.desc}
          </p>

          <div className="flex gap-3 justify-center">
            {guideIndex > 0 && (
              <button
                onClick={handleGuideBack}
                style={{
                  background: "transparent",
                  color: "#94a3b8",
                  border: "1px solid #334155",
                  borderRadius: 10,
                  padding: "10px 24px",
                  fontSize: 13,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ← Quay lại
              </button>
            )}
            <button
              onClick={handleGuideNext}
              style={{
                background: "linear-gradient(135deg, #f37021, #ff2d95)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 32px",
                fontSize: 13,
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(243,112,33,0.4)",
              }}
            >
              {guideIndex < GUIDE_STEPS.length - 1
                ? "Tiếp theo →"
                : "Bắt đầu! 🚀"}
            </button>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={() => setStep("form")}
          className="relative z-10 mt-4 text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          Bỏ qua hướng dẫn →
        </button>

        <div className="absolute top-0 left-0 w-64 h-64 bg-[#00fff7] opacity-5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff2d95] opacity-5 blur-[100px] rounded-full" />
      </div>
    );
  }

  // ── NAME/MSSV FORM VIEW ──
  if (step === "form") {
    const isValid = playerName.trim().length > 0 && mssv.trim().length > 0;
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0e17] via-[#111827] to-[#1a1f2e]">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
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

        <div
          className="relative z-10 glass-card max-w-md w-full mx-4 p-8 border border-white/10 text-center"
          style={{ animation: "slide-up 0.4s ease-out" }}
        >
          <span
            className="text-5xl block mb-3"
            style={{ animation: "float 2s ease-in-out infinite" }}
          >
            🎮
          </span>
          <h2
            style={{
              color: "#f37021",
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "'Press Start 2P', monospace",
              marginBottom: 8,
              lineHeight: 1.6,
            }}
          >
            TẠO NHÂN VẬT
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 28 }}>
            Nhập thông tin để bắt đầu hành trình sinh viên FPT!
          </p>

          {/* MSSV Input */}
          <div style={{ marginBottom: 16, textAlign: "left" }}>
            <label
              style={{
                color: "#94a3b8",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
                display: "block",
              }}
            >
              🆔 Mã Số Sinh Viên (MSSV)
            </label>
            <input
              type="text"
              value={mssv}
              onChange={(e) => setMssv(e.target.value)}
              placeholder="VD: DE200123"
              maxLength={15}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e2e8f0",
                fontSize: 15,
                fontWeight: 600,
                outline: "none",
                transition: "all 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00fff7";
                e.target.style.boxShadow = "0 0 15px rgba(0,255,247,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Character Name Input */}
          <div style={{ marginBottom: 28, textAlign: "left" }}>
            <label
              style={{
                color: "#94a3b8",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
                display: "block",
              }}
            >
              👤 Tên Nhân Vật
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              maxLength={30}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e2e8f0",
                fontSize: 15,
                fontWeight: 600,
                outline: "none",
                transition: "all 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#f37021";
                e.target.style.boxShadow = "0 0 15px rgba(243,112,33,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                e.target.style.boxShadow = "none";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isValid) handleSubmitForm();
              }}
            />
          </div>

          <button
            onClick={handleSubmitForm}
            disabled={!isValid}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: isValid
                ? "linear-gradient(135deg, #f37021, #ff2d95)"
                : "rgba(255,255,255,0.05)",
              color: isValid ? "#fff" : "#64748b",
              border: "none",
              fontSize: 14,
              fontWeight: "bold",
              cursor: isValid ? "pointer" : "not-allowed",
              fontFamily: "'Press Start 2P', monospace",
              boxShadow: isValid ? "0 4px 20px rgba(243,112,33,0.4)" : "none",
              transition: "all 0.3s",
            }}
          >
            🚀 Vào Game!
          </button>

          <button
            onClick={() => setStep("menu")}
            className="mt-3 text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            ← Quay lại
          </button>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-[#00fff7] opacity-5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff2d95] opacity-5 blur-[100px] rounded-full" />
      </div>
    );
  }

  // ── MAIN MENU VIEW ──
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
          onClick={handleStartNewGame}
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
