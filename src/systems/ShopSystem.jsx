import { useState } from "react";
import { useGame } from "../engine/GameContext";
import { ITEM_LIST, ITEM_CATEGORIES } from "../data/items";
import { formatMoney } from "../utils/helpers";

export default function ShopSystem() {
  const { state, closeSystem, buyItem } = useGame();
  const [activeCategory, setActiveCategory] = useState("health");
  const filteredItems = ITEM_LIST.filter(
    (item) => item.category === activeCategory,
  );

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
        <div className="bg-gradient-to-r from-[#22c55e] to-[#10b981] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏪</span>
            <div>
              <h2 className="text-lg font-bold text-white">Cửa Hàng</h2>
              <p className="text-xs text-white/70">Mua sắm vật phẩm</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white bg-white/20 px-3 py-1 rounded-full">
              💰 {formatMoney(state.stats.money)}
            </span>
            <button
              onClick={closeSystem}
              className="text-white/70 hover:text-white text-xl transition-colors"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1 px-4 pt-3 pb-2 overflow-x-auto">
          {Object.entries(ITEM_CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === key
                  ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30"
                  : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(85vh-140px)]">
          {filteredItems.map((item) => {
            const canAfford = state.stats.money >= item.price;
            const inInventory = state.inventory.find((i) => i.id === item.id);
            const isMaxed =
              inInventory &&
              item.stackable &&
              inInventory.quantity >= (item.maxStack || 99);
            const isRetakeBlocked =
              item.requiresLowProgress && state.stats.progress >= 70;

            return (
              <div
                key={item.id}
                className={`glass-card p-4 flex items-center gap-4 transition-all ${
                  !canAfford || isMaxed || isRetakeBlocked
                    ? "opacity-50"
                    : "hover:bg-white/5"
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {Object.entries(item.effects).map(([key, val]) => (
                      <span
                        key={key}
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          val > 0
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {val > 0 ? "+" : ""}
                        {key === "money" ? formatMoney(val) : val}{" "}
                        {key === "health"
                          ? "❤️"
                          : key === "intelligence"
                            ? "🧠"
                            : key === "confidence"
                              ? "💪"
                              : key === "progress"
                                ? "📊"
                                : ""}
                      </span>
                    ))}
                  </div>
                  {inInventory && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      Đang có: x{inInventory.quantity}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p
                    className={`text-sm font-bold ${canAfford ? "text-[#10b981]" : "text-red-400"}`}
                  >
                    {formatMoney(item.price)}
                  </p>
                  <button
                    onClick={() => buyItem(item.id)}
                    disabled={!canAfford || isMaxed || isRetakeBlocked}
                    className={`mt-1 px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      canAfford && !isMaxed && !isRetakeBlocked
                        ? "bg-[#22c55e] text-white hover:bg-[#16a34a] hover:scale-105"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isMaxed
                      ? "Đầy đủ"
                      : isRetakeBlocked
                        ? "Không cần"
                        : !canAfford
                          ? "Thiếu tiền"
                          : "Mua"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
