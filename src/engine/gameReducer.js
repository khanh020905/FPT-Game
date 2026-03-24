/**
 * Game Reducer — Central state transitions
 */

import { clamp } from "../utils/helpers";
import { generateMorningEvent, checkGameOver } from "./fateEngine";
import {
  ACTIONS,
  LOCATIONS,
  CANVAS_MAP,
  INTERACTION_ZONES,
} from "../data/mapData";
import { ITEMS } from "../data/items";
import { QUESTS } from "../data/quests";

export const initialState = {
  gamePhase: "start", // 'start' | 'playing' | 'gameover' | 'day-transition'
  day: 1,
  playerName: "",
  mssv: "",
  stats: {
    progress: 30,
    health: 100,
    intelligence: 50,
    confidence: 50,
    money: 500000,
  },
  inventory: [],
  completedQuests: [],
  activeQuests: [],
  currentEvent: null,
  location: "main-gate",
  previousLocation: null,
  gameOverReason: null,
  activeSystem: null, // 'luk-app' | 'shop' | 'mentor' | 'submission'
  showDayTransition: false,
  dayTransitionEvent: null,
  actionsTakenToday: 0,
  maxActionsPerDay: 4,
  log: [],
  notifications: [],
  // Canvas state
  playerPos: { x: CANVAS_MAP.spawnX, y: CANVAS_MAP.spawnY },
  nearInteraction: null, // { id, locationId, label, prompt } or null
};

/**
 * Apply stat effects safely with clamping
 */
const applyEffects = (stats, effects) => {
  const newStats = { ...stats };
  if (effects.health)
    newStats.health = clamp(newStats.health + effects.health, 0, 100);
  if (effects.intelligence)
    newStats.intelligence = clamp(
      newStats.intelligence + effects.intelligence,
      0,
      100,
    );
  if (effects.confidence)
    newStats.confidence = clamp(
      newStats.confidence + effects.confidence,
      0,
      100,
    );
  if (effects.progress)
    newStats.progress = clamp(newStats.progress + effects.progress, 0, 100);
  if (effects.money) newStats.money = newStats.money + effects.money;
  return newStats;
};

/**
 * Check and update quests based on action/location
 */
const updateQuests = (state, action, locationId) => {
  const activeQuests = state.activeQuests.map((quest) => {
    const updatedObjectives = quest.objectives.map((obj) => {
      if (obj.completed) return obj;

      // Location-based objective
      if (obj.location && obj.location === locationId) {
        return { ...obj, completed: true };
      }

      // Action-based objective
      if (obj.action && obj.action === action) {
        if (obj.count) {
          const newCurrent = (obj.current || 0) + 1;
          return {
            ...obj,
            current: newCurrent,
            completed: newCurrent >= obj.count,
          };
        }
        return { ...obj, completed: true };
      }

      return obj;
    });

    return { ...quest, objectives: updatedObjectives };
  });

  // Check for completed quests
  const newlyCompleted = [];
  const stillActive = [];

  activeQuests.forEach((quest) => {
    const allDone = quest.objectives.every((obj) => obj.completed);
    if (allDone) {
      newlyCompleted.push(quest);
    } else {
      stillActive.push(quest);
    }
  });

  return { activeQuests: stillActive, newlyCompleted };
};

/**
 * Activate auto-start quests for the current day
 */
const activateNewQuests = (day, completedQuestIds, activeQuestIds) => {
  const newQuests = [];
  Object.values(QUESTS).forEach((quest) => {
    if (
      quest.autoStart &&
      quest.startDay === day &&
      !completedQuestIds.includes(quest.id) &&
      !activeQuestIds.includes(quest.id)
    ) {
      newQuests.push({
        ...quest,
        objectives: quest.objectives.map((obj) => ({
          ...obj,
          completed: false,
          current: 0,
        })),
      });
    }
  });
  return newQuests;
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "NEW_GAME": {
      const newQuests = activateNewQuests(1, [], []);
      return {
        ...initialState,
        gamePhase: "playing",
        playerName: action.payload?.playerName || "",
        mssv: action.payload?.mssv || "",
        activeQuests: newQuests,
        log: [
          {
            day: 1,
            message: `🎒 Chào mừng ${action.payload?.playerName || "bạn"} đến FPT University! Hành trình bắt đầu tại Cổng Chính.`,
          },
        ],
      };
    }

    case "LOAD_GAME": {
      return { ...action.payload, gamePhase: "playing" };
    }

    case "SAVE_GAME": {
      const saveData = { ...state, currentEvent: null, activeSystem: null };
      localStorage.setItem("fpt-game-save", JSON.stringify(saveData));
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), message: "💾 Game đã được lưu!", type: "success" },
        ],
      };
    }

    case "MOVE_TO": {
      const targetLocation = action.payload;
      if (!LOCATIONS[targetLocation]) return state;

      const { activeQuests, newlyCompleted } = updateQuests(
        state,
        null,
        targetLocation,
      );
      let newStats = { ...state.stats };
      const newLog = [...state.log];
      const newNotifications = [...state.notifications];
      const newCompletedQuests = [...state.completedQuests];

      // Apply quest rewards
      newlyCompleted.forEach((quest) => {
        newStats = applyEffects(newStats, quest.rewards);
        newCompletedQuests.push(quest.id);
        newLog.push({
          day: state.day,
          message: `🏆 Quest hoàn thành: ${quest.name}!`,
        });
        newNotifications.push({
          id: Date.now() + Math.random(),
          message: `🏆 Hoàn thành: ${quest.emoji} ${quest.name}!`,
          type: "quest",
        });
      });

      newLog.push({
        day: state.day,
        message: `📍 Di chuyển đến ${LOCATIONS[targetLocation].emoji} ${LOCATIONS[targetLocation].name}`,
      });

      return {
        ...state,
        location: targetLocation,
        previousLocation: state.location,
        stats: newStats,
        activeQuests,
        completedQuests: newCompletedQuests,
        log: newLog,
        notifications: newNotifications,
      };
    }

    case "PERFORM_ACTION": {
      const actionData = ACTIONS[action.payload];
      if (!actionData) return state;

      // Sleep is always allowed regardless of action limit
      if (
        action.payload !== "sleep" &&
        state.actionsTakenToday >= state.maxActionsPerDay
      ) {
        return {
          ...state,
          notifications: [
            ...state.notifications,
            {
              id: Date.now(),
              message: "⚠️ Bạn đã hết lượt hành động hôm nay! Hãy về KTX ngủ.",
              type: "warning",
            },
          ],
        };
      }

      // Check if action opens a system
      if (actionData.opensSystem) {
        return { ...state, activeSystem: actionData.opensSystem };
      }

      let newStats = applyEffects(state.stats, actionData.effects);
      const { activeQuests, newlyCompleted } = updateQuests(
        state,
        action.payload,
        state.location,
      );
      const newLog = [...state.log];
      const newNotifications = [...state.notifications];
      const newCompletedQuests = [...state.completedQuests];

      // Apply quest rewards
      newlyCompleted.forEach((quest) => {
        newStats = applyEffects(newStats, quest.rewards);
        newCompletedQuests.push(quest.id);
        newLog.push({
          day: state.day,
          message: `🏆 Quest hoàn thành: ${quest.name}!`,
        });
        newNotifications.push({
          id: Date.now() + Math.random(),
          message: `🏆 Hoàn thành: ${quest.emoji} ${quest.name}!`,
          type: "quest",
        });
      });

      newLog.push({
        day: state.day,
        message: `${actionData.emoji} ${actionData.name}`,
      });

      // Check for game over
      const gameOverReason = checkGameOver(newStats);
      if (gameOverReason) {
        return {
          ...state,
          stats: newStats,
          gamePhase: "gameover",
          gameOverReason,
          log: newLog,
        };
      }

      // If action triggers next day (sleep)
      if (actionData.triggersNextDay) {
        const nextDay = state.day + 1;

        // Auto-complete all remaining active quests for this day
        let finalStats = newStats;
        const allCompletedQuests = [...newCompletedQuests];
        for (const quest of activeQuests) {
          const allDone = quest.objectives.every((o) => o.completed);
          if (!allDone) {
            // Force-complete remaining objectives
            finalStats = applyEffects(finalStats, quest.rewards);
            allCompletedQuests.push(quest.id);
            newLog.push({
              day: state.day,
              message: `🏆 Quest hoàn thành (tự động): ${quest.name}!`,
            });
            newNotifications.push({
              id: Date.now() + Math.random(),
              message: `🏆 Hoàn thành: ${quest.emoji} ${quest.name}!`,
              type: "quest",
            });
          }
        }

        const morningEvent = generateMorningEvent(nextDay, finalStats);
        const newDayQuests = activateNewQuests(
          nextDay,
          allCompletedQuests,
          [], // all active quests are now completed
        );

        // Win condition: survive 30 days
        if (nextDay > 30) {
          return {
            ...state,
            stats: finalStats,
            gamePhase: "gameover",
            gameOverReason:
              "🎉 Chúc mừng! Bạn đã sống sót qua kỳ học đầu tiên tại FPT University! 🎓",
            day: nextDay,
            log: [
              ...newLog,
              { day: nextDay, message: "🎓 Kết thúc kỳ học đầu tiên!" },
            ],
          };
        }

        return {
          ...state,
          day: nextDay,
          stats: finalStats,
          activeQuests: [...newDayQuests],
          completedQuests: allCompletedQuests,
          actionsTakenToday: 0,
          showDayTransition: true,
          dayTransitionEvent: morningEvent,
          currentEvent: morningEvent,
          log: [
            ...newLog,
            { day: nextDay, message: `🌅 Ngày ${nextDay} bắt đầu!` },
          ],
          notifications: newNotifications,
        };
      }

      return {
        ...state,
        stats: newStats,
        activeQuests,
        completedQuests: newCompletedQuests,
        actionsTakenToday: state.actionsTakenToday + 1,
        log: newLog,
        notifications: newNotifications,
      };
    }

    case "APPLY_EVENT": {
      const effects = action.payload;
      const newStats = applyEffects(state.stats, effects);

      const gameOverReason = checkGameOver(newStats);
      if (gameOverReason) {
        return {
          ...state,
          stats: newStats,
          currentEvent: null,
          gamePhase: "gameover",
          gameOverReason,
        };
      }

      return {
        ...state,
        stats: newStats,
        currentEvent: null,
        showDayTransition: false,
      };
    }

    case "DISMISS_EVENT": {
      return {
        ...state,
        currentEvent: null,
        showDayTransition: false,
      };
    }

    case "BUY_ITEM": {
      const item = ITEMS[action.payload];
      if (!item) return state;
      if (state.stats.money < item.price) {
        return {
          ...state,
          notifications: [
            ...state.notifications,
            {
              id: Date.now(),
              message: "❌ Không đủ tiền!",
              type: "error",
            },
          ],
        };
      }

      // Check retake requirement
      if (item.requiresLowProgress && state.stats.progress >= 70) {
        return {
          ...state,
          notifications: [
            ...state.notifications,
            {
              id: Date.now(),
              message: "✅ Progress ≥ 70%, không cần học lại!",
              type: "info",
            },
          ],
        };
      }

      const newStats = applyEffects(state.stats, {
        ...item.effects,
        money: -item.price,
      });
      const newInventory = [...state.inventory];

      if (item.category !== "retake") {
        const existingIdx = newInventory.findIndex((i) => i.id === item.id);
        if (existingIdx >= 0 && item.stackable) {
          if (newInventory[existingIdx].quantity < (item.maxStack || 99)) {
            newInventory[existingIdx] = {
              ...newInventory[existingIdx],
              quantity: newInventory[existingIdx].quantity + 1,
            };
          }
        } else {
          newInventory.push({ ...item, quantity: 1 });
        }
      }

      return {
        ...state,
        stats: newStats,
        inventory: newInventory,
        log: [
          ...state.log,
          { day: state.day, message: `🛒 Đã mua: ${item.emoji} ${item.name}` },
        ],
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            message: `🛒 Đã mua ${item.emoji} ${item.name}!`,
            type: "success",
          },
        ],
      };
    }

    case "USE_ITEM": {
      const itemIdx = state.inventory.findIndex((i) => i.id === action.payload);
      if (itemIdx < 0) return state;

      const item = state.inventory[itemIdx];
      const newStats = applyEffects(state.stats, item.effects || {});
      const newInventory = [...state.inventory];

      if (item.quantity > 1) {
        newInventory[itemIdx] = { ...item, quantity: item.quantity - 1 };
      } else {
        newInventory.splice(itemIdx, 1);
      }

      return {
        ...state,
        stats: newStats,
        inventory: newInventory,
        log: [
          ...state.log,
          {
            day: state.day,
            message: `✨ Đã sử dụng: ${item.emoji} ${item.name}`,
          },
        ],
      };
    }

    case "OPEN_SYSTEM": {
      return { ...state, activeSystem: action.payload };
    }

    case "CLOSE_SYSTEM": {
      return { ...state, activeSystem: null };
    }

    case "CLEAR_NOTIFICATION": {
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };
    }

    case "GAME_OVER": {
      return {
        ...state,
        gamePhase: "gameover",
        gameOverReason: action.payload,
      };
    }

    case "UPDATE_PLAYER_POS": {
      const { x, y } = action.payload;
      // Check which interaction zone the player is near
      const pSize = CANVAS_MAP.playerSize;
      let nearZone = null;
      for (const zone of INTERACTION_ZONES) {
        if (
          x + pSize > zone.x &&
          x < zone.x + zone.w &&
          y + pSize > zone.y &&
          y < zone.y + zone.h
        ) {
          nearZone = zone;
          break;
        }
      }

      // Auto-update location when player enters a zone
      let newLocation = state.location;
      if (
        nearZone &&
        nearZone.locationId &&
        nearZone.locationId !== state.location
      ) {
        newLocation = nearZone.locationId;

        // Update quests when entering a new location zone
        const { activeQuests: updatedQuests, newlyCompleted } = updateQuests(
          state,
          null,
          newLocation,
        );
        let newStats = { ...state.stats };
        const newLog = [...state.log];
        const newNotifications = [...state.notifications];
        const newCompletedQuests = [...state.completedQuests];

        newlyCompleted.forEach((quest) => {
          newStats = applyEffects(newStats, quest.rewards);
          newCompletedQuests.push(quest.id);
          newLog.push({
            day: state.day,
            message: `🏆 Quest hoàn thành: ${quest.name}!`,
          });
          newNotifications.push({
            id: Date.now() + Math.random(),
            message: `🏆 Hoàn thành: ${quest.emoji} ${quest.name}!`,
            type: "quest",
          });
        });

        return {
          ...state,
          playerPos: { x, y },
          nearInteraction: nearZone,
          location: newLocation,
          stats: newStats,
          activeQuests: updatedQuests,
          completedQuests: newCompletedQuests,
          log: newLog,
          notifications: newNotifications,
        };
      }

      return {
        ...state,
        playerPos: { x, y },
        nearInteraction: nearZone,
        location: newLocation,
      };
    }

    case "CANVAS_INTERACT": {
      // Player pressed E near an interaction zone
      const zone = state.nearInteraction;
      if (!zone) return state;
      const targetLoc = zone.locationId;
      if (!LOCATIONS[targetLoc]) return state;

      // Update quests for entering this location
      const {
        activeQuests: interactQuests,
        newlyCompleted: interactCompleted,
      } = updateQuests(state, null, targetLoc);
      let interactStats = { ...state.stats };
      const interactLog = [...state.log];
      const interactNotifications = [...state.notifications];
      const interactCompletedQuests = [...state.completedQuests];

      interactCompleted.forEach((quest) => {
        interactStats = applyEffects(interactStats, quest.rewards);
        interactCompletedQuests.push(quest.id);
        interactLog.push({
          day: state.day,
          message: `🏆 Quest hoàn thành: ${quest.name}!`,
        });
        interactNotifications.push({
          id: Date.now() + Math.random(),
          message: `🏆 Hoàn thành: ${quest.emoji} ${quest.name}!`,
          type: "quest",
        });
      });

      interactLog.push({
        day: state.day,
        message: `📍 Đã vào ${LOCATIONS[targetLoc].emoji} ${LOCATIONS[targetLoc].name}`,
      });

      return {
        ...state,
        location: targetLoc,
        previousLocation: state.location,
        stats: interactStats,
        activeQuests: interactQuests,
        completedQuests: interactCompletedQuests,
        log: interactLog,
        notifications: interactNotifications,
      };
    }

    default:
      return state;
  }
}
