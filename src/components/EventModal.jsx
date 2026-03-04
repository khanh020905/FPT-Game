import { useGame } from "../engine/GameContext";

export default function EventModal() {
  const { state, applyEvent, dismissEvent } = useGame();
  const { currentEvent } = state;

  if (!currentEvent) return null;

  const handleChoice = (choice) => {
    applyEvent(choice.effects);
  };

  const handleDismiss = () => {
    if (!currentEvent.isInteractive) {
      applyEvent(currentEvent.effects);
    } else {
      dismissEvent();
    }
  };

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
