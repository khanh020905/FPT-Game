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
    description: "Đăng ký tài khoản LUK Global để quản lý học tập.",
    objectives: [
      {
        id: "goto-gamma",
        description: "Đến Gamma Tower",
        location: "gamma-tower",
        completed: false,
      },
      {
        id: "access-luk",
        description: "Truy cập LUK-App tầng 5",
        action: "access_luk_app",
        completed: false,
      },
    ],
    rewards: { intelligence: 10, progress: 10 },
    autoStart: true,
    startDay: 2,
  },
  "first-assignment": {
    id: "first-assignment",
    name: "Bài Tập Đầu Tay",
    emoji: "📝",
    description: "Hoàn thành bài tập lập trình đầu tiên tại phòng Lab.",
    objectives: [
      {
        id: "attend-class",
        description: "Đi học ở Alpha Tower",
        action: "attend_class",
        completed: false,
      },
      {
        id: "do-lab",
        description: "Thực hành tại Beta Tower",
        action: "lab_practice",
        completed: false,
      },
    ],
    rewards: { progress: 15, intelligence: 10, money: 30000 },
    autoStart: true,
    startDay: 3,
  },
  "make-friends": {
    id: "make-friends",
    name: "Kết Bạn Mới",
    emoji: "🤝",
    description: "Giao lưu tại Cantin và làm quen bạn bè mới.",
    objectives: [
      {
        id: "socialize-1",
        description: "Giao lưu lần 1",
        action: "socialize",
        completed: false,
      },
      {
        id: "socialize-2",
        description: "Giao lưu lần 2",
        action: "socialize",
        completed: false,
      },
    ],
    rewards: { confidence: 20, health: 10 },
    autoStart: true,
    startDay: 4,
  },
  "group-project": {
    id: "group-project",
    name: "Đồ Án Nhóm",
    emoji: "👨‍💻",
    description: "Phối hợp nhóm hoàn thành project đầu tiên.",
    objectives: [
      {
        id: "project-work-1",
        description: "Làm project (lần 1)",
        action: "work_on_project",
        completed: false,
      },
      {
        id: "project-work-2",
        description: "Làm project (lần 2)",
        action: "work_on_project",
        completed: false,
      },
      {
        id: "project-work-3",
        description: "Làm project (lần 3)",
        action: "work_on_project",
        completed: false,
      },
    ],
    rewards: { progress: 25, intelligence: 15, confidence: 10, money: 100000 },
    autoStart: true,
    startDay: 7,
  },
  "survival-week": {
    id: "survival-week",
    name: "Tuần Sinh Tồn",
    emoji: "🔥",
    description: "Sống sót qua tuần thi giữa kỳ!",
    objectives: [
      {
        id: "study-hard",
        description: "Tự học 3 lần",
        action: "study",
        count: 3,
        current: 0,
        completed: false,
      },
      {
        id: "pass-quiz",
        description: "Đạt điểm kiểm tra đột xuất",
        special: true,
        completed: false,
      },
    ],
    rewards: { progress: 30, confidence: 25, money: 200000 },
    autoStart: true,
    startDay: 14,
  },
};

export const QUEST_LIST = Object.values(QUESTS);
