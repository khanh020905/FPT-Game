import { useState, useMemo } from "react";
import { useGame } from "../engine/GameContext";
import { formatMoney } from "../utils/helpers";

// Mock NPC students with FIXED pre-computed values (no Math.random on render)
const NPC_STUDENTS = [
  {
    name: "Nguyễn Minh Tuấn",
    emoji: "😎",
    money: 720000,
    confidence: 65,
    intelligence: 58,
  },
  {
    name: "Trần Thị Hương",
    emoji: "🧠",
    money: 380000,
    confidence: 52,
    intelligence: 82,
  },
  {
    name: "Lê Văn Khoa",
    emoji: "💪",
    money: 550000,
    confidence: 78,
    intelligence: 45,
  },
  {
    name: "Phạm Ngọc Anh",
    emoji: "📚",
    money: 620000,
    confidence: 60,
    intelligence: 75,
  },
  {
    name: "Hoàng Đức Mạnh",
    emoji: "🎯",
    money: 430000,
    confidence: 70,
    intelligence: 62,
  },
  {
    name: "Vũ Thị Mai",
    emoji: "⭐",
    money: 810000,
    confidence: 55,
    intelligence: 68,
  },
  {
    name: "Đặng Quốc Huy",
    emoji: "🔥",
    money: 290000,
    confidence: 85,
    intelligence: 40,
  },
  {
    name: "Bùi Thị Lan",
    emoji: "💎",
    money: 950000,
    confidence: 48,
    intelligence: 72,
  },
  {
    name: "Ngô Văn Phong",
    emoji: "🏆",
    money: 670000,
    confidence: 42,
    intelligence: 88,
  },
];

function buildLeaderboard(playerStats, category) {
  let entries = NPC_STUDENTS.map((npc) => {
    const value = npc[category];
    return { name: npc.name, emoji: npc.emoji, value, isPlayer: false };
  });

  // Add player
  const playerValue =
    category === "money" ? playerStats.money : playerStats[category];
  entries.push({ name: "🎮 Bạn (Player)", value: playerValue, isPlayer: true });

  // Sort descending
  entries.sort((a, b) => b.value - a.value);

  // Add rank
  return entries.map((e, i) => ({ ...e, rank: i + 1 }));
}

const CATEGORIES = [
  {
    id: "money",
    label: "💰 Nhiều Tiền Nhất",
    icon: "💰",
    format: (v) => formatMoney(v),
  },
  {
    id: "confidence",
    label: "💪 Tự Tin Nhất",
    icon: "💪",
    format: (v) => `${v}/100`,
  },
  {
    id: "intelligence",
    label: "🧠 Trí Tuệ Cao Nhất",
    icon: "🧠",
    format: (v) => `${v}/100`,
  },
];

export default function Leaderboard({ onClose }) {
  const { state } = useGame();
  const { stats } = state;
  const [activeCategory, setActiveCategory] = useState("money");

  const category = CATEGORIES.find((c) => c.id === activeCategory);
  const leaderboard = useMemo(
    () => buildLeaderboard(stats, activeCategory),
    [stats.money, stats.confidence, stats.intelligence, activeCategory],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1420]"
        style={{ animation: "slide-up 0.4s ease-out" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ffd700]/20 to-[#f37021]/20 px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h2
                className="text-lg font-bold text-[#ffd700]"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "12px",
                }}
              >
                BẢNG XẾP HẠNG
              </h2>
              <p className="text-[10px] text-gray-400 mt-0.5">
                FPT University Da Nang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-4 py-3 flex gap-2 border-b border-white/5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#ffd700]/15 text-[#ffd700] border border-[#ffd700]/30"
                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
              }`}
            >
              {cat.icon}{" "}
              {cat.id === "money"
                ? "Tiền"
                : cat.id === "confidence"
                  ? "Tự Tin"
                  : "Trí Tuệ"}
            </button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="px-4 py-3 space-y-1.5 overflow-y-auto max-h-[calc(85vh-180px)]">
          <p className="text-[10px] text-gray-500 mb-2 text-center">
            {category.label}
          </p>
          {leaderboard.map((entry) => {
            const isTop3 = entry.rank <= 3;
            const medalEmoji =
              entry.rank === 1
                ? "🥇"
                : entry.rank === 2
                  ? "🥈"
                  : entry.rank === 3
                    ? "🥉"
                    : "";

            return (
              <div
                key={entry.name}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                  entry.isPlayer
                    ? "bg-[#00fff7]/10 border border-[#00fff7]/25 shadow-lg shadow-[#00fff7]/5"
                    : isTop3
                      ? "bg-[#ffd700]/5 border border-[#ffd700]/10"
                      : "bg-white/3 border border-white/5"
                }`}
              >
                {/* Rank */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    entry.rank === 1
                      ? "bg-[#ffd700]/20 text-[#ffd700]"
                      : entry.rank === 2
                        ? "bg-gray-300/20 text-gray-300"
                        : entry.rank === 3
                          ? "bg-[#cd7f32]/20 text-[#cd7f32]"
                          : "bg-white/5 text-gray-500"
                  }`}
                >
                  {medalEmoji || `#${entry.rank}`}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-medium truncate ${
                      entry.isPlayer ? "text-[#00fff7]" : "text-white"
                    }`}
                  >
                    {entry.isPlayer ? "🎮 Bạn" : `${entry.emoji} ${entry.name}`}
                  </p>
                  {entry.isPlayer && (
                    <p className="text-[9px] text-[#00fff7]/60">Player</p>
                  )}
                </div>

                {/* Value */}
                <span
                  className={`text-xs font-bold tabular-nums ${
                    entry.isPlayer
                      ? "text-[#00fff7]"
                      : isTop3
                        ? "text-[#ffd700]"
                        : "text-gray-300"
                  }`}
                >
                  {category.format(entry.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
