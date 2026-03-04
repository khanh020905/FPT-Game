/**
 * Event/Scenario Data Definitions
 * Interactive and non-interactive events that occur during gameplay
 */

export const EVENTS = {
  // ===== FATE ENGINE EVENTS =====
  "di-tre": {
    id: "di-tre",
    name: "Đi Trễ!",
    emoji: "⏰",
    type: "fate",
    description: "Bạn ngủ quên và đến lớp trễ 15 phút! Thầy/cô không vui...",
    isInteractive: false,
    effects: { confidence: -10, progress: -5 },
    weight: 3,
  },
  "thien-tai": {
    id: "thien-tai",
    name: "Thiên Tai — Mưa Lớn!",
    emoji: "🌧️",
    type: "fate",
    description: "Trời mưa to bất ngờ! Bạn bị ướt sũng trên đường đi học.",
    isInteractive: true,
    choices: [
      {
        id: "wait",
        text: "Đợi tạnh mưa (-1 tiết học)",
        effects: { progress: -3 },
      },
      {
        id: "run",
        text: "Chạy dưới mưa!",
        effects: { health: -15, confidence: 5 },
      },
    ],
    weight: 2,
  },
  "viec-gia-dinh": {
    id: "viec-gia-dinh",
    name: "Việc Gia Đình",
    emoji: "📞",
    type: "fate",
    description: "Ba mẹ gọi điện, có việc gia đình cần giải quyết.",
    isInteractive: true,
    choices: [
      {
        id: "skip-class",
        text: "Nghỉ học về quê",
        effects: { progress: -10, health: 10, confidence: -5 },
      },
      {
        id: "stay",
        text: "Ở lại trường, gọi lại sau",
        effects: { confidence: -8, health: -5 },
      },
    ],
    weight: 1,
  },
  "kiem-tra-dot-xuat": {
    id: "kiem-tra-dot-xuat",
    name: "Kiểm Tra Đột Xuất!",
    emoji: "📝",
    type: "fate",
    description: "Thầy/cô bất ngờ cho kiểm tra! Bạn có sẵn sàng không?",
    isInteractive: true,
    choices: [
      {
        id: "try-hard",
        text: "Tập trung làm bài",
        effects: { intelligence: 8, progress: 10, health: -10 },
      },
      {
        id: "cheat",
        text: "Nhìn bài bạn (rủi ro cao!)",
        effects: { progress: 5, confidence: -15 },
      },
      {
        id: "skip",
        text: "Nộp giấy trắng",
        effects: { progress: -15, confidence: -10 },
      },
    ],
    weight: 2,
  },
  "tien-roi": {
    id: "tien-roi",
    name: "Rớt Tiền!",
    emoji: "💸",
    type: "fate",
    description: "Bạn phát hiện mất ví khi đi Cantin...",
    isInteractive: false,
    effects: { money: -50000, confidence: -5 },
    weight: 1,
  },
  "gap-senior": {
    id: "gap-senior",
    name: "Gặp Anh/Chị Khóa Trên",
    emoji: "🎓",
    type: "fate",
    description: "Một anh/chị khóa trên tốt bụng cho bạn tài liệu ôn thi!",
    isInteractive: false,
    effects: { intelligence: 10, confidence: 8 },
    weight: 2,
  },
  "bug-code": {
    id: "bug-code",
    name: "Bug Không Chịu Fix!",
    emoji: "🐛",
    type: "fate",
    description: "Code chạy lỗi liên tục, bạn debug cả đêm...",
    isInteractive: true,
    choices: [
      {
        id: "debug-more",
        text: "Tiếp tục debug",
        effects: { intelligence: 12, health: -20, progress: 8 },
      },
      {
        id: "ask-help",
        text: "Nhờ bạn bè giúp",
        effects: { intelligence: 5, confidence: 5, progress: 5 },
      },
      {
        id: "give-up",
        text: "Bỏ cuộc, ngủ đi",
        effects: { health: 15, progress: -5 },
      },
    ],
    weight: 3,
  },
  "free-food": {
    id: "free-food",
    name: "Event Ăn Miễn Phí!",
    emoji: "🎉",
    type: "fate",
    description: "CLB tổ chức event có đồ ăn miễn phí ở sân trường!",
    isInteractive: false,
    effects: { health: 20, confidence: 10, money: 25000 },
    weight: 1,
  },
  "mat-dien": {
    id: "mat-dien",
    name: "Mất Điện KTX!",
    emoji: "🔌",
    type: "fate",
    description: "Ký túc xá mất điện cả tối, không thể làm bài!",
    isInteractive: true,
    choices: [
      {
        id: "candle-study",
        text: "Học bằng đèn pin",
        effects: { intelligence: 5, health: -10 },
      },
      { id: "sleep-early", text: "Đi ngủ sớm", effects: { health: 20 } },
    ],
    weight: 1,
  },
  scholarship: {
    id: "scholarship",
    name: "Học Bổng Bất Ngờ!",
    emoji: "🏆",
    type: "fate",
    description: "Bạn nhận được thông báo đạt học bổng khuyến khích!",
    isInteractive: false,
    effects: { money: 500000, confidence: 20, progress: 5 },
    weight: 1,
    minDay: 10,
  },
};

export const EVENT_LIST = Object.values(EVENTS);

// Events suitable for morning (new day) trigger
export const MORNING_EVENTS = EVENT_LIST.filter((e) => e.type === "fate");
