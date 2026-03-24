/**
 * Quest Definitions for FPT University Life Simulator
 *
 * Reachable locations: alpha-tower, canteen, gamma-tower, dorm-a, dorm-b, sports, event-yard, main-gate
 * Available actions: attend_class, study, eat_meal, socialize, sleep, rest,
 *                    access_luk_app, look_around, play_football, play_basketball, play_volleyball
 */

export const QUESTS = {
  // ── Day 1: Explore campus ──
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

  // ── Day 2: Register LUK ──
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

  // ── Day 3: First class & study routine ──
  "study-routine": {
    id: "study-routine",
    name: "Bắt Đầu Học Tập",
    emoji: "📚",
    description: "Tham gia buổi học đầu tiên và ôn bài.",
    objectives: [
      {
        id: "attend-class-1",
        description: "Tham gia lớp học tại Alpha Tower",
        action: "attend_class",
        completed: false,
      },
      {
        id: "study-1",
        description: "Tự học ôn bài",
        action: "study",
        completed: false,
      },
      {
        id: "eat-1",
        description: "Ăn cơm tại Cantin",
        action: "eat_meal",
        completed: false,
      },
    ],
    rewards: { intelligence: 15, confidence: 5, money: 30000 },
    autoStart: true,
    startDay: 3,
  },

  // ── Day 4: Sports & socializing ──
  "active-life": {
    id: "active-life",
    name: "Rèn Luyện Thể Chất",
    emoji: "🏃",
    description: "Tập thể dục và giao lưu bạn bè.",
    objectives: [
      {
        id: "play-sport",
        description: "Chơi 1 môn thể thao bất kỳ",
        action: "play_football",
        completed: false,
      },
      {
        id: "socialize-1",
        description: "Giao lưu với bạn bè tại Cantin",
        action: "socialize",
        completed: false,
      },
      {
        id: "visit-event",
        description: "Tham quan Sân Sự Kiện",
        location: "event-yard",
        completed: false,
      },
    ],
    rewards: { health: 20, confidence: 15, money: 20000 },
    autoStart: true,
    startDay: 4,
  },

  // ── Day 5: Full study day ──
  "full-study": {
    id: "full-study",
    name: "Ngày Học Chăm Chỉ",
    emoji: "✏️",
    description: "Dành trọn ngày cho việc học tại campus.",
    objectives: [
      {
        id: "attend-class-2",
        description: "Đi học buổi sáng",
        action: "attend_class",
        completed: false,
      },
      {
        id: "study-2",
        description: "Ôn bài tại thư viện",
        action: "study",
        completed: false,
      },
      {
        id: "check-luk-1",
        description: "Kiểm tra LUK-App tại Gamma Tower",
        location: "gamma-tower",
        completed: false,
      },
      {
        id: "eat-2",
        description: "Ăn trưa tại Cantin",
        action: "eat_meal",
        completed: false,
      },
    ],
    rewards: { intelligence: 20, progress: 15, money: 25000 },
    autoStart: true,
    startDay: 5,
  },

  // ── Day 6: Sports challenge ──
  "sports-challenge": {
    id: "sports-challenge",
    name: "Thử Thách Thể Thao",
    emoji: "🏆",
    description: "Thử sức với nhiều môn thể thao và nạp năng lượng.",
    objectives: [
      {
        id: "basketball-1",
        description: "Chơi Bóng Rổ",
        action: "play_basketball",
        completed: false,
      },
      {
        id: "volleyball-1",
        description: "Chơi Bóng Chuyền",
        action: "play_volleyball",
        completed: false,
      },
      {
        id: "eat-3",
        description: "Nạp năng lượng tại Cantin",
        action: "eat_meal",
        completed: false,
      },
      {
        id: "socialize-2",
        description: "Tán gẫu với bạn bè",
        action: "socialize",
        completed: false,
      },
    ],
    rewards: { health: 25, confidence: 20, intelligence: 5 },
    autoStart: true,
    startDay: 6,
  },

  // ── Day 7: Balance life ──
  "balanced-life": {
    id: "balanced-life",
    name: "Cân Bằng Cuộc Sống",
    emoji: "⚖️",
    description: "Vừa học vừa chơi — tận hưởng đời sinh viên FPT!",
    objectives: [
      {
        id: "attend-class-4",
        description: "Đi học buổi sáng",
        action: "attend_class",
        completed: false,
      },
      {
        id: "football-1",
        description: "Đá banh cùng bạn bè",
        action: "play_football",
        completed: false,
      },
      {
        id: "eat-4",
        description: "Ăn cơm cùng bạn bè",
        action: "eat_meal",
        completed: false,
      },
      {
        id: "socialize-3",
        description: "Giao lưu tại Cantin",
        action: "socialize",
        completed: false,
      },
      {
        id: "rest-1",
        description: "Nghỉ ngơi tại KTX",
        location: "dorm-b",
        completed: false,
      },
    ],
    rewards: { health: 15, intelligence: 10, confidence: 20, money: 40000 },
    autoStart: true,
    startDay: 7,
  },
};

export const QUEST_LIST = Object.values(QUESTS);
