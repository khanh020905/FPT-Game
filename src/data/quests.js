/**
 * Quest Definitions for FPT University Life Simulator
 */

export const QUESTS = {
  "first-day": {
    id: "first-day",
    name: "Ngày Đầu Tiên",
    emoji: "🎒",
    description: "Khám phá campus FPT trong ngày đầu nhập học.",
    objectives: [
      {
        id: "visit-alpha",
        description: "Đến Alpha Tower",
        location: "alpha-tower",
        completed: false,
      },
      {
        id: "visit-canteen",
        description: "Ghé Cantin ăn trưa",
        location: "canteen",
        completed: false,
      },
      {
        id: "visit-dorm",
        description: "Tìm phòng ở KTX",
        location: "dorm-a",
        completed: false,
      },
    ],
    rewards: { intelligence: 5, confidence: 10, money: 50000 },
    autoStart: true,
    startDay: 1,
  },
  "luk-registration": {
    id: "luk-registration",
    name: "Đăng Ký LUK-App",
    emoji: "📱",
    description: "Đến Gamma Tower để đăng ký LUK Global.",
    objectives: [
      {
        id: "goto-gamma",
        description: "Đến Gamma Tower",
        location: "gamma-tower",
        completed: false,
      },
    ],
    rewards: { intelligence: 10, progress: 10 },
    autoStart: true,
    startDay: 2,
  },
};

export const QUEST_LIST = Object.values(QUESTS);
