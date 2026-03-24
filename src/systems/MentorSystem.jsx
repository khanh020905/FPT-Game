import { useState, useMemo } from "react";
import { useGame } from "../engine/GameContext";
import { MENTOR_TIPS, MENTOR_CATEGORIES } from "../data/mentorTips";
import { pickRandom } from "../utils/helpers";

export default function MentorSystem() {
  const { closeSystem } = useGame();
  const [activeCategory, setActiveCategory] = useState("all");
  const [highlightedTip, setHighlightedTip] = useState(null);

  const randomTip = useMemo(() => pickRandom(MENTOR_TIPS), []);

  const filteredTips =
    activeCategory === "all"
      ? MENTOR_TIPS
      : MENTOR_TIPS.filter((t) => t.category === activeCategory);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeSystem}
      />

      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1420]"
        style={{ animation: "slide-up 0.4s ease-out" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3b82f6] to-[#2a5298] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧑‍🏫</span>
            <div>
              <h2 className="text-lg font-bold text-white">Cố Vấn Học Tập</h2>
              <p className="text-xs text-white/70">Lời khuyên từ thầy/cô</p>
            </div>
          </div>
          <button
            onClick={closeSystem}
            className="text-white/70 hover:text-white text-xl transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(85vh-80px)]">
          {/* Featured Tip */}
          <div className="glass-card p-4 border border-[#ffd700]/20 bg-[#ffd700]/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💡</span>
              <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                Lời khuyên hôm nay
              </span>
            </div>
            <p className="text-sm text-white font-medium mb-1">
              {randomTip.title}
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              {randomTip.content}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30"
                  : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
              }`}
            >
              📋 Tất cả
            </button>
            {Object.entries(MENTOR_CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === key
                    ? "bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30"
                    : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>

          {/* Tips List */}
          <div className="space-y-2">
            {filteredTips.map((tip) => {
              const cat = MENTOR_CATEGORIES[tip.category];
              return (
                <div
                  key={tip.id}
                  className={`glass-card p-3 cursor-pointer transition-all ${
                    highlightedTip === tip.id
                      ? "bg-white/10 border-white/20"
                      : "hover:bg-white/5"
                  }`}
                  onClick={() =>
                    setHighlightedTip(highlightedTip === tip.id ? null : tip.id)
                  }
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{tip.emoji}</span>
                    <span className="text-xs font-bold text-white">
                      {tip.title}
                    </span>
                    <span
                      className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${cat.color}20`,
                        color: cat.color,
                      }}
                    >
                      {cat.name}
                    </span>
                  </div>
                  {highlightedTip === tip.id && (
                    <p className="text-xs text-gray-300 leading-relaxed mt-2 pl-6 animate-[fade-in_0.2s_ease]">
                      {tip.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
