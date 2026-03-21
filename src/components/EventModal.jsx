import { useState } from "react";
import { useGame } from "../engine/GameContext";

export default function EventModal() {
  const { state, applyEvent, dismissEvent } = useGame();
  const { currentEvent } = state;
  const [consequence, setConsequence] = useState(null);

  if (!currentEvent) return null;

  const handleChoice = (choice) => {
    if (choice.consequence) {
      // Show consequence first, store effects to apply later
      setConsequence({ ...choice.consequence, effects: choice.effects });
    } else {
      applyEvent(choice.effects);
    }
  };

  const handleConsequenceDismiss = () => {
    applyEvent(consequence.effects);
    setConsequence(null);
  };

  const handleDismiss = () => {
    if (!currentEvent.isInteractive) {
      applyEvent(currentEvent.effects);
    } else {
      dismissEvent();
    }
  };

  // ──── CONSEQUENCE CARD ────
  if (consequence) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ animation: "fade-in 0.3s ease-out" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <div
          className="relative max-w-md w-full overflow-hidden"
          style={{
            animation: "slide-up 0.4s ease-out",
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(15,23,42,.95), rgba(30,41,59,.95))",
            border: "1px solid rgba(255,255,255,.12)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.1)",
          }}
        >
          {/* Top Glow Bar */}
          <div
            style={{
              height: 4,
              background: "linear-gradient(90deg, #f37021, #ff2d95, #00fff7)",
              borderRadius: "20px 20px 0 0",
            }}
          />

          {/* Header Badge */}
          <div style={{ textAlign: "center", padding: "28px 24px 0" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(243,112,33,.15)",
                border: "1px solid rgba(243,112,33,.3)",
                padding: "4px 14px",
                borderRadius: 100,
                fontSize: 10,
                fontWeight: 700,
                color: "#f37021",
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ⚡ HẬU QUẢ LỰA CHỌN
            </div>
          </div>

          {/* Consequence Emoji */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span
              style={{
                fontSize: 56,
                display: "block",
                animation: "float 2s ease-in-out infinite",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,.3))",
              }}
            >
              {consequence.emoji}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              margin: "0 24px 8px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 14,
              lineHeight: 1.6,
              textShadow: "0 2px 8px rgba(0,0,0,.3)",
            }}
          >
            {consequence.title}
          </h2>

          {/* Description */}
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,.75)",
              fontSize: 14,
              lineHeight: 1.7,
              margin: "0 28px 20px",
            }}
          >
            {consequence.description}
          </p>

          {/* Effects Applied */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              padding: "0 24px 20px",
            }}
          >
            {Object.entries(consequence.effects).map(([key, val]) => (
              <span
                key={key}
                style={{
                  padding: "5px 12px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 600,
                  background: val > 0 ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)",
                  color: val > 0 ? "#22c55e" : "#ef4444",
                  border: `1px solid ${val > 0 ? "rgba(34,197,94,.25)" : "rgba(239,68,68,.25)"}`,
                }}
              >
                {key === "health" && "❤️"}
                {key === "intelligence" && "🧠"}
                {key === "confidence" && "💪"}
                {key === "progress" && "📊"}
                {key === "money" && "💰"} {val > 0 ? "+" : ""}
                {key === "money" ? `${val / 1000}K` : val}
              </span>
            ))}
          </div>

          {/* OK Button */}
          <div style={{ padding: "0 24px 24px" }}>
            <button
              onClick={handleConsequenceDismiss}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 14,
                border: "none",
                fontWeight: 700,
                fontSize: 14,
                color: "#fff",
                cursor: "pointer",
                background: "linear-gradient(135deg, #f37021, #ff2d95)",
                boxShadow: "0 4px 20px rgba(243,112,33,.35)",
                transition: "all .2s ease",
                letterSpacing: 0.5,
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.filter = "brightness(1)";
              }}
            >
              OK — Tiếp tục
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──── ORIGINAL EVENT MODAL ────
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={!currentEvent.isInteractive ? handleDismiss : undefined}
      />

      {/* Modal */}
      <div
        className="relative glass-card max-w-md w-full p-6 border border-white/10"
        style={{ animation: "slide-up 0.4s ease-out" }}
      >
        {/* Event Icon */}
        <div className="text-center mb-4">
          <span className="text-5xl block mb-3 animate-[float_2s_ease-in-out_infinite]">
            {currentEvent.emoji}
          </span>
          <h2
            className="text-xl font-bold text-white"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "14px",
            }}
          >
            {currentEvent.name}
          </h2>
          {currentEvent.type && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-[#f37021]/20 text-[#f37021] border border-[#f37021]/30">
              {currentEvent.type === "fate"
                ? "🎲 Sự kiện ngẫu nhiên"
                : "📋 Sự kiện"}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 text-center leading-relaxed mb-5">
          {currentEvent.description}
        </p>

        {/* Non-interactive: Show effects and OK button */}
        {!currentEvent.isInteractive && (
          <div>
            {/* Effects Preview */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {Object.entries(currentEvent.effects).map(([key, val]) => (
                <span
                  key={key}
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    val > 0
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {key === "health" && "❤️"}
                  {key === "intelligence" && "🧠"}
                  {key === "confidence" && "💪"}
                  {key === "progress" && "📊"}
                  {key === "money" && "💰"} {val > 0 ? "+" : ""}
                  {key === "money" ? `${val / 1000}K` : val}
                </span>
              ))}
            </div>

            <button
              onClick={handleDismiss}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#f37021] to-[#ff2d95] hover:brightness-110 transition-all transform hover:scale-[1.02]"
            >
              OK — Chấp nhận
            </button>
          </div>
        )}

        {/* Interactive: Show choices */}
        {currentEvent.isInteractive && currentEvent.choices && (
          <div className="space-y-2">
            {currentEvent.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00fff740] transition-all text-left group"
              >
                <p className="text-sm font-medium text-white group-hover:text-[#00fff7] transition-colors">
                  {choice.text}
                </p>
                <div className="flex gap-2 mt-1.5">
                  {Object.entries(choice.effects).map(([key, val]) => (
                    <span
                      key={key}
                      className={`text-[10px] ${val > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {key === "health" && "❤️"}
                      {key === "intelligence" && "🧠"}
                      {key === "confidence" && "💪"}
                      {key === "progress" && "📊"}
                      {key === "money" && "💰"}
                      {val > 0 ? "+" : ""}
                      {key === "money" ? `${val / 1000}K` : val}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
