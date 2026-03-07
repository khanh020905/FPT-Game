/**
 * Fate Engine — RNG event generator
 * Generates random scenarios at the start of each day
 */

import { MORNING_EVENTS } from "./events";
import { chance, pickRandom } from "../utils/helpers";

/**
 * Weighted random event selection
 */
const weightedPick = (events) => {
  const totalWeight = events.reduce((sum, e) => sum + (e.weight || 1), 0);
  let random = Math.random() * totalWeight;

  for (const event of events) {
    random -= event.weight || 1;
    if (random <= 0) return event;
  }

  return events[events.length - 1];
};

/**
 * Generate a morning event for the start of a new day
 * @param {number} day - Current game day
 * @param {object} stats - Current player stats
 * @returns {object|null} - Event object or null if no event
 */
export const generateMorningEvent = (day, stats) => {
  // 60% chance of a morning event
  if (!chance(0.6)) return null;

  // Filter events by day requirement
  const availableEvents = MORNING_EVENTS.filter((e) => {
    if (e.minDay && day < e.minDay) return false;
    return true;
  });

  if (availableEvents.length === 0) return null;

  // Weight adjustments based on player state
  const adjustedEvents = availableEvents.map((event) => {
    let adjustedWeight = event.weight || 1;

    // If player health is low, increase chance of health-related positive events
    if (stats.health < 30 && event.effects?.health > 0) {
      adjustedWeight *= 1.5;
    }

    // If player progress is low, increase chance of academic events
    if (stats.progress < 50 && event.id === "kiem-tra-dot-xuat") {
      adjustedWeight *= 2;
    }

    // Late events more likely on school days
    if (event.id === "di-tre" && stats.health < 50) {
      adjustedWeight *= 1.8;
    }

    return { ...event, weight: adjustedWeight };
  });

  return weightedPick(adjustedEvents);
};

/**
 * Generate a random encounter event at a specific location
 * @param {string} locationId - Current location
 * @param {number} day - Current game day
 * @returns {object|null} - Event object or null
 */
export const generateLocationEvent = (locationId, day) => {
  // 20% chance of a random encounter when moving
  if (!chance(0.2)) return null;

  const locationEvents = {
    canteen: ["free-food", "tien-roi"],
    "alpha-tower": ["kiem-tra-dot-xuat", "gap-senior", "luk-presentation"],
    "beta-tower": ["bug-code", "gap-senior"],
    "dorm-a": ["mat-dien"],
    "dorm-b": ["mat-dien"],
    "gamma-tower": [
      "scholarship",
      "luk-presentation",
      "luk-best-team",
      "sao-truc",
      "dan-bau-nhi",
      "dan-tranh",
    ],
    "main-gate": ["vovinam-training", "vovinam-belt"],
  };

  const eventIds = locationEvents[locationId];
  if (!eventIds) return null;

  const eventId = pickRandom(eventIds);
  const event = MORNING_EVENTS.find((e) => e.id === eventId);

  if (event?.minDay && day < event.minDay) return null;

  return event || null;
};

/**
 * Check for game over conditions
 * @param {object} stats - Current player stats
 * @returns {string|null} - Game over reason or null
 */
export const checkGameOver = (stats) => {
  if (stats.health <= 0) {
    return "Sức khỏe của bạn đã cạn kiệt! Bạn phải nghỉ học vì kiệt sức. 💀";
  }
  if (stats.progress <= 0) {
    return "Tiến độ học tập = 0! Bạn bị đuổi học vì không đạt yêu cầu. 📉";
  }
  if (stats.money < -500000) {
    return "Bạn nợ quá nhiều và không thể tiếp tục theo học! 💸";
  }
  return null;
};

/**
 * Check if player needs to pay retake fee
 * @param {object} stats - Current player stats
 * @returns {boolean}
 */
export const needsRetakeFee = (stats) => {
  return stats.progress < 70;
};
