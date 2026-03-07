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

  // ===== LUK GLOBAL EVENTS =====
  "luk-presentation": {
    id: "luk-presentation",
    name: "Thuyết Trình LUK Global!",
    emoji: "🌍",
    type: "fate",
    description:
      "Hôm nay là ngày thuyết trình nhóm tại LUK Global! Bạn phải present bằng tiếng Anh trước cả lớp.",
    isInteractive: true,
    choices: [
      {
        id: "present-well",
        text: "Tự tin thuyết trình 💪",
        effects: { confidence: 15, intelligence: 10, progress: 8, health: -5 },
      },
      {
        id: "nervous",
        text: "Run quá, đọc script 📄",
        effects: { confidence: -5, intelligence: 5, progress: 5 },
      },
      {
        id: "skip-turn",
        text: "Nhờ bạn nhóm nói thay",
        effects: { confidence: -10, progress: 3 },
      },
    ],
    weight: 3,
  },
  "luk-best-team": {
    id: "luk-best-team",
    name: "Best Team LUK Global! 🏆",
    emoji: "🥇",
    type: "fate",
    description:
      "Nhóm của bạn được chọn là Best Team Presentation tại LUK Global Hurricane! Giải thưởng 5,000,000 VNĐ!",
    isInteractive: false,
    effects: { money: 200000, confidence: 25, intelligence: 10, progress: 10 },
    weight: 1,
    minDay: 5,
  },

  // ===== NHẠC CỤ DÂN TỘC EVENTS =====
  "sao-truc": {
    id: "sao-truc",
    name: "Buổi Học Sáo Trúc 🪈",
    emoji: "🪈",
    type: "fate",
    description:
      "Hôm nay có buổi học sáo trúc tại Toà Gamma! Thầy dạy bài 'Trống Cơm' truyền thống.",
    isInteractive: true,
    choices: [
      {
        id: "practice-hard",
        text: "Tập thổi chăm chỉ 🎵",
        effects: { confidence: 12, intelligence: 5, health: -5 },
      },
      {
        id: "enjoy",
        text: "Vui vẻ thổi theo nhóm",
        effects: { confidence: 8, health: 5 },
      },
      {
        id: "skip-music",
        text: "Trốn đi code thay 💻",
        effects: { intelligence: 5, progress: 3, confidence: -8 },
      },
    ],
    weight: 2,
  },
  "dan-bau-nhi": {
    id: "dan-bau-nhi",
    name: "Hòa Tấu Đàn Bầu & Đàn Nhị",
    emoji: "🎵",
    type: "fate",
    description:
      "CLB Âm nhạc dân tộc FPT mời bạn tham gia buổi hòa tấu đàn bầu và đàn nhị tại sảnh Gamma. Tiếng đàn bầu độc huyền cầm hòa cùng đàn nhị du dương!",
    isInteractive: true,
    choices: [
      {
        id: "join-perform",
        text: "Tham gia biểu diễn 🎼",
        effects: { confidence: 15, intelligence: 5, health: 5 },
      },
      {
        id: "watch",
        text: "Ngồi xem thưởng thức",
        effects: { confidence: 5, health: 10 },
      },
      {
        id: "record-video",
        text: "Quay video đăng TikTok 📱",
        effects: { confidence: 8, money: 10000 },
      },
    ],
    weight: 2,
  },
  "dan-tranh": {
    id: "dan-tranh",
    name: "Masterclass Đàn Tranh 🎶",
    emoji: "🎶",
    type: "fate",
    description:
      "Nghệ sĩ đàn tranh nổi tiếng đến FPT Đà Nẵng dạy masterclass! Cơ hội học hỏi từ bậc thầy nhạc cụ 16 dây truyền thống.",
    isInteractive: true,
    choices: [
      {
        id: "attend",
        text: "Tham gia học hỏi 🎓",
        effects: { intelligence: 12, confidence: 10, health: -5 },
      },
      {
        id: "skip",
        text: "Bận ôn thi, không đi",
        effects: { intelligence: 5, progress: 5 },
      },
    ],
    weight: 1,
    minDay: 7,
  },

  // ===== VOVINAM EVENTS =====
  "vovinam-training": {
    id: "vovinam-training",
    name: "Buổi Tập Vovinam! 🥋",
    emoji: "🥋",
    type: "fate",
    description:
      "FPT Đà Nẵng có buổi tập Vovinam hàng tuần! Võ thuật Việt Nam giúp rèn luyện sức khỏe và tinh thần thượng võ.",
    isInteractive: true,
    choices: [
      {
        id: "train-hard",
        text: "Tập luyện hết sức 💪",
        effects: { health: 15, confidence: 12, intelligence: -3 },
      },
      {
        id: "light-train",
        text: "Tập nhẹ nhàng",
        effects: { health: 10, confidence: 5 },
      },
      {
        id: "watch-only",
        text: "Đứng xem không tập",
        effects: { confidence: -3, health: 5 },
      },
    ],
    weight: 3,
  },
  "vovinam-belt": {
    id: "vovinam-belt",
    name: "Thi Đai Vovinam! 🏅",
    emoji: "🏅",
    type: "fate",
    description:
      "Kỳ thi thăng đai Vovinam tại FPT Đà Nẵng! Bạn có cơ hội thi lên đai xanh. Phải biểu diễn bài quyền và đối luyện trước ban giám khảo.",
    isInteractive: true,
    choices: [
      {
        id: "take-exam",
        text: "Thi đai — chiến hết mình! 🔥",
        effects: { confidence: 20, health: -10, progress: 5 },
      },
      {
        id: "not-ready",
        text: "Chưa sẵn sàng, đợi kỳ sau",
        effects: { confidence: -5, health: 5 },
      },
    ],
    weight: 1,
    minDay: 10,
  },
};

export const EVENT_LIST = Object.values(EVENTS);

// Events suitable for morning (new day) trigger
export const MORNING_EVENTS = EVENT_LIST.filter((e) => e.type === "fate");
