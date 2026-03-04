import { useState } from "react";
import { useGame } from "../engine/GameContext";
import { LOCATIONS } from "../data/mapData";
import { formatMoney } from "../utils/helpers";
import { needsRetakeFee } from "../engine/fateEngine";

const StatBar = ({ label, value, maxValue = 100, color, emoji, warning }) => {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  const isLow = percentage < 30;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{emoji}</span>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
            {label}
          </span>
        </div>
        <span
          className={`text-[10px] font-bold tabular-nums ${isLow ? "text-red-400 animate-pulse" : "text-gray-300"}`}
        >
          {value}/{maxValue}
        </span>
      </div>
      <div className="stat-bar h-2 rounded">
        <div
          className={`stat-bar-fill ${isLow ? "animate-pulse" : ""}`}
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}90, ${color})`,
            boxShadow: `0 0 10px ${color}50`,
          }}
        />
      </div>
      {warning && (
        <p className="text-[9px] text-red-400 animate-pulse mt-0.5">
          ⚠️ Cần chú ý!
        </p>
      )}
    </div>
  );
};

export default function PlayerHUD() {
  const { state, saveGame, openSystem, useItem } = useGame();
  const {
    stats,
    day,
    location,
    actionsTakenToday,
    maxActionsPerDay,
    activeQuests,
    completedQuests,
    inventory,
    log,
  } = state;
  const currentLocation = LOCATIONS[location];
  const showRetakeWarning = needsRetakeFee(stats);
  const [showLog, setShowLog] = useState(false);

  return (
    <div className="w-72 xl:w-80 h-full bg-[#0d1117] border-r border-[#00fff7]/10 flex flex-col overflow-hidden flex-shrink-0">
      {/* Logo Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#f37021]/20 to-[#ff2d95]/10 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <div>
            <h1
              className="text-sm font-bold text-[#00fff7]"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "10px",
                textShadow: "0 0 10px #00fff740",
              }}
            >
              FPT LIFE SIM
            </h1>
            <p className="text-[9px] text-gray-500">University Da Nang</p>
          </div>
        </div>
      </div>

      {/* Day & Actions Counter */}
      <div className="px-4 py-2.5 bg-[#111827]/50 border-b border-white/5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">📅</span>
          <div>
            <p
              className="text-xs font-bold text-white"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "11px",
              }}
            >
              Ngày {day}
              <span className="text-gray-500 font-normal">/30</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded-lg">
          <span className="text-[#ffd700]">⚡</span>
          <span className="font-bold text-white">
            {maxActionsPerDay - actionsTakenToday}
          </span>
          <span className="text-gray-500">lượt còn</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Stats Section */}
        <div className="space-y-3">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5">
            <span className="w-3 h-px bg-gray-600" />
            Chỉ Số
            <span className="flex-1 h-px bg-gray-600/30" />
          </h3>
          <StatBar
            label="Tiến Độ"
            value={stats.progress}
            color="#f97316"
            emoji="📊"
            warning={showRetakeWarning}
          />
          <StatBar
            label="Sức Khỏe"
            value={stats.health}
            color="#22c55e"
            emoji="❤️"
          />
          <StatBar
            label="Trí Tuệ"
            value={stats.intelligence}
            color="#3b82f6"
            emoji="🧠"
          />
          <StatBar
            label="Tự Tin"
            value={stats.confidence}
            color="#eab308"
            emoji="💪"
          />
        </div>

        {/* Money */}
        <div className="glass-card p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">💰</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              Tài chính
            </span>
          </div>
          <span
            className={`text-sm font-bold ${stats.money < 50000 ? "text-red-400 animate-pulse" : "text-[#10b981]"}`}
          >
            {formatMoney(stats.money)}
          </span>
        </div>

        {showRetakeWarning && (
          <div className="text-[10px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2 animate-pulse flex items-center gap-1.5">
            <span>⚠️</span>
            <span>Progress &lt; 70% — Phí học lại!</span>
          </div>
        )}

        {/* Current Location */}
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5 mb-2">
            <span className="w-3 h-px bg-gray-600" />
            Vị Trí
            <span className="flex-1 h-px bg-gray-600/30" />
          </h3>
          <div className="glass-card p-3 flex items-center gap-3">
            <span className="text-2xl">{currentLocation?.emoji}</span>
            <div>
              <p className="text-xs font-bold text-white">
                {currentLocation?.name}
              </p>
              <p className="text-[9px] text-gray-500">
                {currentLocation?.nameEn}
              </p>
            </div>
          </div>
        </div>

        {/* Active Quests */}
        {activeQuests.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5 mb-2">
              <span className="w-3 h-px bg-gray-600" />
              Nhiệm Vụ ({activeQuests.length})
              <span className="flex-1 h-px bg-gray-600/30" />
            </h3>
            <div className="space-y-2">
              {activeQuests.map((quest) => {
                const completed = quest.objectives.filter(
                  (o) => o.completed,
                ).length;
                const total = quest.objectives.length;
                const pct = (completed / total) * 100;
                return (
                  <div key={quest.id} className="glass-card p-2.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">{quest.emoji}</span>
                      <span className="text-[10px] font-bold text-white flex-1 truncate">
                        {quest.name}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {completed}/{total}
                      </span>
                    </div>
                    <div className="stat-bar h-1">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background:
                            "linear-gradient(90deg, #ffd700, #f97316)",
                        }}
                      />
                    </div>
                    <div className="mt-1.5 space-y-0.5">
                      {quest.objectives.map((obj) => (
                        <p
                          key={obj.id}
                          className={`text-[9px] flex items-center gap-1 ${obj.completed ? "text-green-400 line-through opacity-60" : "text-gray-400"}`}
                        >
                          <span>{obj.completed ? "✅" : "⬜"}</span>
                          <span>{obj.description}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Inventory */}
        {inventory.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5 mb-2">
              <span className="w-3 h-px bg-gray-600" />
              Túi Đồ ({inventory.length})
              <span className="flex-1 h-px bg-gray-600/30" />
            </h3>
            <div className="grid grid-cols-4 gap-1.5">
              {inventory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => useItem(item.id)}
                  className="glass-card p-2 flex flex-col items-center gap-0.5 hover:bg-white/10 transition-all group relative"
                  title={`Sử dụng ${item.name}`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </span>
                  {item.quantity > 1 && (
                    <span className="absolute -top-1 -right-1 text-[8px] bg-[#f37021] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  )}
                  <span className="text-[7px] text-gray-500 truncate w-full text-center">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity Log */}
        <div>
          <button
            onClick={() => setShowLog(!showLog)}
            className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5 mb-2 w-full hover:text-gray-300 transition-colors"
          >
            <span className="w-3 h-px bg-gray-600" />
            Nhật Ký {showLog ? "▼" : "▶"}
            <span className="flex-1 h-px bg-gray-600/30" />
          </button>
          {showLog && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {log
                .slice(-8)
                .reverse()
                .map((entry, i) => (
                  <p key={i} className="text-[9px] text-gray-500 flex gap-1.5">
                    <span className="text-gray-600 flex-shrink-0">
                      D{entry.day}
                    </span>
                    <span className="truncate">{entry.message}</span>
                  </p>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Quick Actions */}
      <div className="px-3 py-2.5 border-t border-white/5 flex gap-1.5 flex-shrink-0 bg-[#0d1117]">
        <button
          onClick={() => openSystem("mentor")}
          className="flex-1 py-2 rounded-lg text-[10px] font-bold bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 hover:bg-[#3b82f6]/20 transition-all flex items-center justify-center gap-1"
        >
          🧑‍🏫 Cố Vấn
        </button>
        <button
          onClick={() => openSystem("shop")}
          className="flex-1 py-2 rounded-lg text-[10px] font-bold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 hover:bg-[#22c55e]/20 transition-all flex items-center justify-center gap-1"
        >
          🏪 Shop
        </button>
        <button
          onClick={saveGame}
          className="py-2 px-3 rounded-lg text-[10px] font-bold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition-all"
          title="Lưu Game"
        >
          💾
        </button>
      </div>
    </div>
  );
}
