/**
 * Clamp a value between min and max
 */
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/**
 * Roll a dice: returns random int between 1 and sides (inclusive)
 */
export const diceRoll = (sides = 6) => Math.floor(Math.random() * sides) + 1;

/**
 * Random chance: returns true with given probability (0-1)
 */
export const chance = (probability) => Math.random() < probability;

/**
 * Pick a random element from an array
 */
export const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Format Vietnamese currency (VND)
 */
export const formatMoney = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
};

/**
 * Format a stat value as percentage
 */
export const formatStat = (value, max = 100) => {
  return `${Math.round((value / max) * 100)}%`;
};

/**
 * Generate a unique ID
 */
export const generateId = () => Math.random().toString(36).substring(2, 9);

/**
 * Delay helper for animations
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get time of day based on game day phase
 */
export const getTimeOfDay = (phase) => {
  const times = {
    morning: "🌅 Buổi sáng",
    afternoon: "☀️ Buổi chiều",
    evening: "🌆 Buổi tối",
    night: "🌙 Đêm khuya",
  };
  return times[phase] || "☀️ Ban ngày";
};
